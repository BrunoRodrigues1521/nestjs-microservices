/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "deleted_at",
DROP COLUMN "updatedAt";
