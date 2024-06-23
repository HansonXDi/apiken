/*
  Warnings:

  - The primary key for the `Direcciones_Bloqueadas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Direcciones_Bloqueadas` table. All the data in the column will be lost.
  - The primary key for the `Direcciones_Favoritas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Direcciones_Favoritas` table. All the data in the column will be lost.
  - You are about to drop the `_Direcciones_BloqueadasToUsuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Direcciones_FavoritasToUsuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuario_bloqueadoId` to the `Direcciones_Bloqueadas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_bloqueadorId` to the `Direcciones_Bloqueadas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_favoritadoId` to the `Direcciones_Favoritas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_favoritadorId` to the `Direcciones_Favoritas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Direcciones_BloqueadasToUsuarios" DROP CONSTRAINT "_Direcciones_BloqueadasToUsuarios_A_fkey";

-- DropForeignKey
ALTER TABLE "_Direcciones_BloqueadasToUsuarios" DROP CONSTRAINT "_Direcciones_BloqueadasToUsuarios_B_fkey";

-- DropForeignKey
ALTER TABLE "_Direcciones_FavoritasToUsuarios" DROP CONSTRAINT "_Direcciones_FavoritasToUsuarios_A_fkey";

-- DropForeignKey
ALTER TABLE "_Direcciones_FavoritasToUsuarios" DROP CONSTRAINT "_Direcciones_FavoritasToUsuarios_B_fkey";

-- AlterTable
ALTER TABLE "Direcciones_Bloqueadas" DROP CONSTRAINT "Direcciones_Bloqueadas_pkey",
DROP COLUMN "id",
ADD COLUMN     "usuario_bloqueadoId" INTEGER NOT NULL,
ADD COLUMN     "usuario_bloqueadorId" INTEGER NOT NULL,
ADD CONSTRAINT "Direcciones_Bloqueadas_pkey" PRIMARY KEY ("usuario_bloqueadorId", "usuario_bloqueadoId");

-- AlterTable
ALTER TABLE "Direcciones_Favoritas" DROP CONSTRAINT "Direcciones_Favoritas_pkey",
DROP COLUMN "id",
ADD COLUMN     "usuario_favoritadoId" INTEGER NOT NULL,
ADD COLUMN     "usuario_favoritadorId" INTEGER NOT NULL,
ADD CONSTRAINT "Direcciones_Favoritas_pkey" PRIMARY KEY ("usuario_favoritadorId", "usuario_favoritadoId");

-- AlterTable
ALTER TABLE "Usuarios" ALTER COLUMN "descripcion" DROP NOT NULL;

-- DropTable
DROP TABLE "_Direcciones_BloqueadasToUsuarios";

-- DropTable
DROP TABLE "_Direcciones_FavoritasToUsuarios";

-- AddForeignKey
ALTER TABLE "Direcciones_Bloqueadas" ADD CONSTRAINT "Direcciones_Bloqueadas_usuario_bloqueadorId_fkey" FOREIGN KEY ("usuario_bloqueadorId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direcciones_Bloqueadas" ADD CONSTRAINT "Direcciones_Bloqueadas_usuario_bloqueadoId_fkey" FOREIGN KEY ("usuario_bloqueadoId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direcciones_Favoritas" ADD CONSTRAINT "Direcciones_Favoritas_usuario_favoritadorId_fkey" FOREIGN KEY ("usuario_favoritadorId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direcciones_Favoritas" ADD CONSTRAINT "Direcciones_Favoritas_usuario_favoritadoId_fkey" FOREIGN KEY ("usuario_favoritadoId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
