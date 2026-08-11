-- AlterTable
ALTER TABLE "products" ADD COLUMN     "available_packs" TEXT[] DEFAULT ARRAY[]::TEXT[];
