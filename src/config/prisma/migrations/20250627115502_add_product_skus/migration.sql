-- CreateTable
CREATE TABLE "ProductSkus" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sizeAttributeId" TEXT NOT NULL,
    "colorAttributeId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductSkus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSkus_sku_key" ON "ProductSkus"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSkus_productId_sizeAttributeId_colorAttributeId_key" ON "ProductSkus"("productId", "sizeAttributeId", "colorAttributeId");

-- AddForeignKey
ALTER TABLE "ProductSkus" ADD CONSTRAINT "ProductSkus_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSkus" ADD CONSTRAINT "ProductSkus_sizeAttributeId_fkey" FOREIGN KEY ("sizeAttributeId") REFERENCES "ProductAttributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSkus" ADD CONSTRAINT "ProductSkus_colorAttributeId_fkey" FOREIGN KEY ("colorAttributeId") REFERENCES "ProductAttributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
