/*
  Warnings:

  - You are about to drop the column `favorites` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favorites` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favorites` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favorites",
ADD COLUMN     "favoritesId" TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favorites",
ADD COLUMN     "favoritesId" TEXT;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favorites",
ADD COLUMN     "favoritesId" TEXT;

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
