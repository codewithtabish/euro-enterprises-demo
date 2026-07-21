-- CreateTable
CREATE TABLE "SaleCarSEO" (
    "id" TEXT NOT NULL,
    "saleCarId" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "canonicalUrl" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "noFollow" BOOLEAN NOT NULL DEFAULT false,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "schemaType" TEXT NOT NULL DEFAULT 'Article',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleCarSEO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaleCarSEO_saleCarId_key" ON "SaleCarSEO"("saleCarId");

-- AddForeignKey
ALTER TABLE "SaleCarSEO" ADD CONSTRAINT "SaleCarSEO_saleCarId_fkey" FOREIGN KEY ("saleCarId") REFERENCES "SaleCar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
