import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function registrar() {
    const Nuevo_Usuario = await prisma.usuarios.create({
        data: {
            nombre: "Emilio",
            direccion_correo: "EmilioValdebenito@gmail.com",
            contrasena: "1234",
            descripcion: "fan n°1 de juegos gacha"
        }
    })
}