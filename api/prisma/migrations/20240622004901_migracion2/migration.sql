/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `Direcciones_Favoritas` table. All the data in the column will be lost.
  - You are about to drop the `Correos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios_Que_Bloquean` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios_Que_Hacen_Favorito` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Correos" DROP CONSTRAINT "Correos_destinatario_id_fkey";

-- DropForeignKey
ALTER TABLE "Correos" DROP CONSTRAINT "Correos_remitente_id_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios_Que_Bloquean" DROP CONSTRAINT "Usuarios_Que_Bloquean_direccion_bloqueada_id_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios_Que_Bloquean" DROP CONSTRAINT "Usuarios_Que_Bloquean_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios_Que_Hacen_Favorito" DROP CONSTRAINT "Usuarios_Que_Hacen_Favorito_direccion_favorita_id_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios_Que_Hacen_Favorito" DROP CONSTRAINT "Usuarios_Que_Hacen_Favorito_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Direcciones_Favoritas" DROP COLUMN "usuario_id";

-- DropTable
DROP TABLE "Correos";

-- DropTable
DROP TABLE "Usuarios_Que_Bloquean";

-- DropTable
DROP TABLE "Usuarios_Que_Hacen_Favorito";

-- CreateTable
CREATE TABLE "_Direcciones_BloqueadasToUsuarios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Direcciones_FavoritasToUsuarios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Direcciones_BloqueadasToUsuarios_AB_unique" ON "_Direcciones_BloqueadasToUsuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_Direcciones_BloqueadasToUsuarios_B_index" ON "_Direcciones_BloqueadasToUsuarios"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Direcciones_FavoritasToUsuarios_AB_unique" ON "_Direcciones_FavoritasToUsuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_Direcciones_FavoritasToUsuarios_B_index" ON "_Direcciones_FavoritasToUsuarios"("B");

-- AddForeignKey
ALTER TABLE "_Direcciones_BloqueadasToUsuarios" ADD CONSTRAINT "_Direcciones_BloqueadasToUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "Direcciones_Bloqueadas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Direcciones_BloqueadasToUsuarios" ADD CONSTRAINT "_Direcciones_BloqueadasToUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Direcciones_FavoritasToUsuarios" ADD CONSTRAINT "_Direcciones_FavoritasToUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "Direcciones_Favoritas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Direcciones_FavoritasToUsuarios" ADD CONSTRAINT "_Direcciones_FavoritasToUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
