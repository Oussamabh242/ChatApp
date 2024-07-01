-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'confirmed');

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'pending';
