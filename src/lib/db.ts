import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBettingPool(data: {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}) {
  return prisma.bettingPool.create({
    data: {
      ...data,
      status: 'active',
    },
  });
}

export async function createBet(data: {
  poolId: string;
  userAddress: string;
  amount: number;
  tokenType: 'sui' | 'usdc';
  betType: 'yes' | 'no';
}) {
  return prisma.bet.create({
    data: {
      ...data,
      status: 'active',
    },
  });
}

export async function updateBetStatus(
  betId: string,
  status: 'won' | 'lost' | 'refunded',
  payout?: number
) {
  return prisma.bet.update({
    where: { id: betId },
    data: {
      status,
      payout,
    },
  });
}

export async function createMatchResult(data: {
  poolId: string;
  matchNumber: number;
  survivorCount: number;
}) {
  return prisma.matchResult.create({
    data,
  });
}

export async function updatePoolStatus(
  poolId: string,
  status: 'completed' | 'cancelled' | 'draw'
) {
  return prisma.bettingPool.update({
    where: { id: poolId },
    data: { status },
  });
}

export async function getBettingHistory(userAddress: string) {
  return prisma.bet.findMany({
    where: {
      userAddress,
    },
    include: {
      pool: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getActivePools() {
  return prisma.bettingPool.findMany({
    where: {
      status: 'active',
      endTime: {
        gt: new Date(),
      },
    },
    include: {
      bets: true,
      matchResults: true,
    },
  });
}

export async function getPoolDetails(poolId: string) {
  return prisma.bettingPool.findUnique({
    where: {
      id: poolId,
    },
    include: {
      bets: true,
      matchResults: {
        orderBy: {
          matchNumber: 'asc',
        },
      },
    },
  });
} 