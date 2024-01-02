/*
  Warnings:

  - You are about to drop the column `origin` on the `Garpi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Garpi" DROP COLUMN "origin",
ADD COLUMN     "hnId" INTEGER;
