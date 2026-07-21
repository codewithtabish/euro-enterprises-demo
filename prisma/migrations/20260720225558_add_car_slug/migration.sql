/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `SaleCar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `SaleCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleCar" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SaleCar_slug_key" ON "SaleCar"("slug");
