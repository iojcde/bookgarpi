/*
  Warnings:

  - You are about to drop the column `favicon` on the `Garpi` table. All the data in the column will be lost.
  - Added the required column `image` to the `Garpi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garpi" DROP COLUMN "favicon",
ADD COLUMN     "image" TEXT NOT NULL;
