module betting::betting {
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::clock::{Self, Clock};
    use std::vector;

    // エラーコード
    const ERROR_NOT_ADMIN: u64 = 0;
    const ERROR_INVALID_STATUS: u64 = 1;
    const ERROR_BETTING_NOT_ACTIVE: u64 = 2;
    const ERROR_INSUFFICIENT_BALANCE: u64 = 3;
    const ERROR_MAX_BET_EXCEEDED: u64 = 4;

    // ステータス定義
    const STATUS_ACTIVE: u8 = 0;
    const STATUS_COMPLETED: u8 = 1;
    const STATUS_CANCELLED: u8 = 2;
    const STATUS_DRAW: u8 = 3;

    // 手数料率（5%）
    const FEE_RATE: u64 = 500; // basis points (5%)

    struct BettingPool has key {
        id: UID,
        admin: address,
        yes_pool_sui: Balance<SUI>,
        yes_pool_usdc: Balance<USDC>,
        no_pool_sui: Balance<SUI>,
        no_pool_usdc: Balance<USDC>,
        fee_balance_sui: Balance<SUI>,
        fee_balance_usdc: Balance<USDC>,
        status: u8,
        start_time: u64,
        end_time: u64,
        bets: vector<Bet>
    }

    struct Bet has store {
        user: address,
        amount: u64,
        token_type: bool, // true: SUI, false: USDC
        bet_type: bool,   // true: yes, false: no
    }

    // プール作成
    public entry fun create_pool(
        admin: address,
        start_time: u64,
        end_time: u64,
        ctx: &mut TxContext
    ) {
        let pool = BettingPool {
            id: object::new(ctx),
            admin,
            yes_pool_sui: balance::zero(),
            yes_pool_usdc: balance::zero(),
            no_pool_sui: balance::zero(),
            no_pool_usdc: balance::zero(),
            fee_balance_sui: balance::zero(),
            fee_balance_usdc: balance::zero(),
            status: STATUS_ACTIVE,
            start_time,
            end_time,
            bets: vector::empty()
        };
        transfer::share_object(pool);
    }

    // ベット実行
    public entry fun place_bet(
        pool: &mut BettingPool,
        bet_type: bool,
        amount: u64,
        token_type: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // 時間チェック
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time >= pool.start_time && current_time <= pool.end_time, ERROR_BETTING_NOT_ACTIVE);
        assert!(pool.status == STATUS_ACTIVE, ERROR_BETTING_NOT_ACTIVE);

        // 最大ベット額チェック
        if (token_type) {
            let opposite_pool = if (bet_type) balance::value(&pool.no_pool_sui) else balance::value(&pool.yes_pool_sui);
            assert!(amount <= opposite_pool, ERROR_MAX_BET_EXCEEDED);
        } else {
            let opposite_pool = if (bet_type) balance::value(&pool.no_pool_usdc) else balance::value(&pool.yes_pool_usdc);
            assert!(amount <= opposite_pool, ERROR_MAX_BET_EXCEEDED);
        };

        // ベット記録
        let bet = Bet {
            user: tx_context::sender(ctx),
            amount,
            token_type,
            bet_type
        };
        vector::push_back(&mut pool.bets, bet);

        // プールに追加
        if (token_type) {
            if (bet_type) {
                balance::join(&mut pool.yes_pool_sui, coin::into_balance(coin::split(payment, amount, ctx)));
            } else {
                balance::join(&mut pool.no_pool_sui, coin::into_balance(coin::split(payment, amount, ctx)));
            }
        } else {
            if (bet_type) {
                balance::join(&mut pool.yes_pool_usdc, coin::into_balance(coin::split(payment, amount, ctx)));
            } else {
                balance::join(&mut pool.no_pool_usdc, coin::into_balance(coin::split(payment, amount, ctx)));
            }
        };
    }

    // 結果確定・払い出し
    public entry fun settle_result(
        pool: &mut BettingPool,
        result: bool, // true: yes win, false: no win
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == pool.admin, ERROR_NOT_ADMIN);
        assert!(pool.status == STATUS_ACTIVE, ERROR_INVALID_STATUS);

        pool.status = STATUS_COMPLETED;

        // 手数料計算と控除
        let fee_rate_adjusted = FEE_RATE;
        
        if (result) {
            // Yes勝利の場合
            let total_sui = balance::value(&pool.yes_pool_sui) + balance::value(&pool.no_pool_sui);
            let total_usdc = balance::value(&pool.yes_pool_usdc) + balance::value(&pool.no_pool_usdc);
            
            let fee_sui = (total_sui * fee_rate_adjusted) / 10000;
            let fee_usdc = (total_usdc * fee_rate_adjusted) / 10000;
            
            // 手数料を控除
            balance::join(&mut pool.fee_balance_sui, balance::split(&mut pool.yes_pool_sui, fee_sui));
            balance::join(&mut pool.fee_balance_usdc, balance::split(&mut pool.yes_pool_usdc, fee_usdc));
            
            // Yes側に払い出し
            let i = 0;
            while (i < vector::length(&pool.bets)) {
                let bet = vector::borrow(&pool.bets, i);
                if (bet.bet_type) {
                    if (bet.token_type) {
                        let payout = (bet.amount * total_sui * (10000 - fee_rate_adjusted)) / (10000 * balance::value(&pool.yes_pool_sui));
                        transfer::transfer(coin::from_balance(balance::split(&mut pool.yes_pool_sui, payout), ctx), bet.user);
                    } else {
                        let payout = (bet.amount * total_usdc * (10000 - fee_rate_adjusted)) / (10000 * balance::value(&pool.yes_pool_usdc));
                        transfer::transfer(coin::from_balance(balance::split(&mut pool.yes_pool_usdc, payout), ctx), bet.user);
                    }
                };
                i = i + 1;
            };
        } else {
            // No勝利の場合（同様の処理）
            let total_sui = balance::value(&pool.yes_pool_sui) + balance::value(&pool.no_pool_sui);
            let total_usdc = balance::value(&pool.yes_pool_usdc) + balance::value(&pool.no_pool_usdc);
            
            let fee_sui = (total_sui * fee_rate_adjusted) / 10000;
            let fee_usdc = (total_usdc * fee_rate_adjusted) / 10000;
            
            balance::join(&mut pool.fee_balance_sui, balance::split(&mut pool.no_pool_sui, fee_sui));
            balance::join(&mut pool.fee_balance_usdc, balance::split(&mut pool.no_pool_usdc, fee_usdc));
            
            let i = 0;
            while (i < vector::length(&pool.bets)) {
                let bet = vector::borrow(&pool.bets, i);
                if (!bet.bet_type) {
                    if (bet.token_type) {
                        let payout = (bet.amount * total_sui * (10000 - fee_rate_adjusted)) / (10000 * balance::value(&pool.no_pool_sui));
                        transfer::transfer(coin::from_balance(balance::split(&mut pool.no_pool_sui, payout), ctx), bet.user);
                    } else {
                        let payout = (bet.amount * total_usdc * (10000 - fee_rate_adjusted)) / (10000 * balance::value(&pool.no_pool_usdc));
                        transfer::transfer(coin::from_balance(balance::split(&mut pool.no_pool_usdc, payout), ctx), bet.user);
                    }
                };
                i = i + 1;
            };
        };
    }

    // 引き分け・キャンセル時の返金
    public entry fun refund_all(
        pool: &mut BettingPool,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == pool.admin, ERROR_NOT_ADMIN);
        assert!(pool.status == STATUS_ACTIVE, ERROR_INVALID_STATUS);

        pool.status = if (tx_context::sender(ctx) == pool.admin) STATUS_CANCELLED else STATUS_DRAW;

        let i = 0;
        while (i < vector::length(&pool.bets)) {
            let bet = vector::borrow(&pool.bets, i);
            if (bet.token_type) {
                if (bet.bet_type) {
                    transfer::transfer(
                        coin::from_balance(balance::split(&mut pool.yes_pool_sui, bet.amount), ctx),
                        bet.user
                    );
                } else {
                    transfer::transfer(
                        coin::from_balance(balance::split(&mut pool.no_pool_sui, bet.amount), ctx),
                        bet.user
                    );
                }
            } else {
                if (bet.bet_type) {
                    transfer::transfer(
                        coin::from_balance(balance::split(&mut pool.yes_pool_usdc, bet.amount), ctx),
                        bet.user
                    );
                } else {
                    transfer::transfer(
                        coin::from_balance(balance::split(&mut pool.no_pool_usdc, bet.amount), ctx),
                        bet.user
                    );
                }
            };
            i = i + 1;
        };
    }

    // 手数料の引き出し（管理者のみ）
    public entry fun withdraw_fees(
        pool: &mut BettingPool,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == pool.admin, ERROR_NOT_ADMIN);

        let fee_sui = balance::value(&pool.fee_balance_sui);
        let fee_usdc = balance::value(&pool.fee_balance_usdc);

        if (fee_sui > 0) {
            transfer::transfer(
                coin::from_balance(balance::split(&mut pool.fee_balance_sui, fee_sui), ctx),
                pool.admin
            );
        };

        if (fee_usdc > 0) {
            transfer::transfer(
                coin::from_balance(balance::split(&mut pool.fee_balance_usdc, fee_usdc), ctx),
                pool.admin
            );
        };
    }
} 