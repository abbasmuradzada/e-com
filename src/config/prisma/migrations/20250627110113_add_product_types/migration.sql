-- CreateEnum
CREATE TYPE "ProductAttributeTypes" AS ENUM ('COLOR', 'SIZE');

-- CreateTable
CREATE TABLE "ProductAttributes" (
    "id" TEXT NOT NULL,
    "type" "ProductAttributeTypes" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductAttributes_pkey" PRIMARY KEY ("id")
);
