-- DropForeignKey
ALTER TABLE "pizza" DROP CONSTRAINT "pizza_category_name_fkey";

-- AddForeignKey
ALTER TABLE "pizza" ADD CONSTRAINT "pizza_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
