-- CreateTable
CREATE TABLE "collegeprediction" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "dream" JSONB NOT NULL,
    "target" JSONB NOT NULL,
    "safe" JSONB NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collegeprediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collegeprediction" ADD CONSTRAINT "collegeprediction_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
