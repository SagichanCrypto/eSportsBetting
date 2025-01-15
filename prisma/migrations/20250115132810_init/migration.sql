-- CreateTable
CREATE TABLE "BettingPool" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BettingPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "tokenType" TEXT NOT NULL,
    "betType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "payout" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "survivorCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bet_userAddress_idx" ON "Bet"("userAddress");

-- CreateIndex
CREATE INDEX "Bet_poolId_idx" ON "Bet"("poolId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_poolId_matchNumber_key" ON "MatchResult"("poolId", "matchNumber");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "BettingPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "BettingPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
