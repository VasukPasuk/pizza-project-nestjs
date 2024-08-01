/*
  Warnings:

  - You are about to drop the column `flour` on the `pizza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "flour" "Flour" NOT NULL DEFAULT 'THICK',
ALTER COLUMN "size" SET DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "flour" "Flour" NOT NULL DEFAULT 'THICK',
ALTER COLUMN "size" SET DEFAULT 'MEDIUM';

-- AlterTable
CREATE SEQUENCE pizza_id_seq;
ALTER TABLE "pizza" DROP COLUMN "flour",
ALTER COLUMN "id" SET DEFAULT nextval('pizza_id_seq');
ALTER SEQUENCE pizza_id_seq OWNED BY "pizza"."id";
