-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "direccion_correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correos" (
    "id" SERIAL NOT NULL,
    "remitente_id" INTEGER NOT NULL,
    "destinatario_id" INTEGER NOT NULL,
    "asunto" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "es_favorito" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Correos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direcciones_Bloqueadas" (
    "id" SERIAL NOT NULL,
    "direccion_bloqueada" TEXT NOT NULL,

    CONSTRAINT "Direcciones_Bloqueadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios_Que_Bloquean" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_bloqueada_id" INTEGER NOT NULL,
    "fecha_bloqueo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuarios_Que_Bloquean_pkey" PRIMARY KEY ("usuario_id","direccion_bloqueada_id")
);

-- CreateTable
CREATE TABLE "Direcciones_Favoritas" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "direccion_favorita" TEXT NOT NULL,

    CONSTRAINT "Direcciones_Favoritas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios_Que_Hacen_Favorito" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_favorita_id" INTEGER NOT NULL,
    "fecha_favorito" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Usuarios_Que_Hacen_Favorito_pkey" PRIMARY KEY ("usuario_id","direccion_favorita_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_direccion_correo_key" ON "Usuarios"("direccion_correo");

-- AddForeignKey
ALTER TABLE "Correos" ADD CONSTRAINT "Correos_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correos" ADD CONSTRAINT "Correos_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios_Que_Bloquean" ADD CONSTRAINT "Usuarios_Que_Bloquean_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios_Que_Bloquean" ADD CONSTRAINT "Usuarios_Que_Bloquean_direccion_bloqueada_id_fkey" FOREIGN KEY ("direccion_bloqueada_id") REFERENCES "Direcciones_Bloqueadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios_Que_Hacen_Favorito" ADD CONSTRAINT "Usuarios_Que_Hacen_Favorito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios_Que_Hacen_Favorito" ADD CONSTRAINT "Usuarios_Que_Hacen_Favorito_direccion_favorita_id_fkey" FOREIGN KEY ("direccion_favorita_id") REFERENCES "Direcciones_Favoritas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
