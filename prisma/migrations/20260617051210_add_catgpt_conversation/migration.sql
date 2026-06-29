-- CreateTable
CREATE TABLE "catgptconversation" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catgptconversation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "catgptconversation" ADD CONSTRAINT "catgptconversation_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
