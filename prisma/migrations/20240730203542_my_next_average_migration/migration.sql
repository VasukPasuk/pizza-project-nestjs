/*
  Warnings:

  - Added the required column `description` to the `pizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pizza" ADD COLUMN     "description" TEXT NOT NULL;
