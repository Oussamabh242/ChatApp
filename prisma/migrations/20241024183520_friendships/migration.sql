-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "user1" TEXT NOT NULL,
    "user2" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user1_fkey" FOREIGN KEY ("user1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user2_fkey" FOREIGN KEY ("user2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
