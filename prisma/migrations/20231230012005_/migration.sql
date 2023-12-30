/*
  Warnings:

  - The primary key for the `Garpi` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Garpi" DROP CONSTRAINT "Garpi_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Garpi_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Garpi_id_seq";
