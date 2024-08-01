/*
  Warnings:

  - You are about to drop the column `created_at` on the `pizza` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `pizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "category" ADD CONSTRAINT "category_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pizza" DROP COLUMN "created_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "added_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
CREATE SEQUENCE review_id_seq;
ALTER TABLE "review" ALTER COLUMN "id" SET DEFAULT nextval('review_id_seq');
ALTER SEQUENCE review_id_seq OWNED BY "review"."id";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_pizza__favourite" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_review__liked" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
