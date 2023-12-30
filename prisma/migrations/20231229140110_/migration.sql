/*
  Warnings:

  - Added the required column `type` to the `Garpi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garpi" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
