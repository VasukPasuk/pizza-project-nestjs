/*
  Warnings:

  - Added the required column `pizza_name` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "pizza_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
