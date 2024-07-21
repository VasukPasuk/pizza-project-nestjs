-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Flour" AS ENUM ('THIN', 'THICK');

-- CreateEnum
CREATE TYPE "HotStage" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'INPROCESS', 'FULFILED');

-- CreateEnum
CREATE TYPE "CaloriesStage" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "first_surname" TEXT,
    "second_surname" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "disctrict" TEXT,
    "phone" TEXT,
    "house_number" INTEGER,
    "city" TEXT,
    "street" TEXT,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "activation_link" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "country" TEXT NOT NULL,
    "flour" "Flour" NOT NULL DEFAULT 'THICK',
    "average_cooking_speed" INTEGER NOT NULL DEFAULT 0,
    "hot_stage" "HotStage" NOT NULL DEFAULT 'MEDIUM',

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "additional_options" (
    "id" SERIAL NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'MEDIUM',
    "weight" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "calories_stage" "CaloriesStage" NOT NULL,

    CONSTRAINT "additional_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "total_price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "size" "Size" NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "total_price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "size" "Size" NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_review__liked" (
    "id" SERIAL NOT NULL,
    "review_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_review__liked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pizza__likes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "added_like" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pizza__likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pizza__favourite" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "pizzaName" TEXT NOT NULL,

    CONSTRAINT "user_pizza__favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_activation_link_key" ON "user"("activation_link");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "pizza" ADD CONSTRAINT "pizza_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additional_options" ADD CONSTRAINT "additional_options_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_review__liked" ADD CONSTRAINT "user_review__liked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_review__liked" ADD CONSTRAINT "user_review__liked_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__likes" ADD CONSTRAINT "user_pizza__likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__likes" ADD CONSTRAINT "user_pizza__likes_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__favourite" ADD CONSTRAINT "user_pizza__favourite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__favourite" ADD CONSTRAINT "user_pizza__favourite_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
