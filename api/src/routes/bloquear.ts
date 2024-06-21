import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bloquear(correo_bloqueador, correo_bloqueado){
    const usuario_bloqueador = await prisma.usuarios.findUnique({
        where: {
            direccion_correo: correo_bloqueador
        }
    })

    //Caso 1: El usuario que se quiere bloquear no ha sido bloqueado por otro
    //usuario anteriormente
    const nuevo_bloqueo = await prisma.direcciones_Bloqueadas.create({
        data: {
            direccion_bloqueada: correo_bloqueado,
            usuarios_que_bloquean.push(usuario_bloqueador)
        }
    })
    //Caso 2: El usuario que se quiere bloquear ha sido bloqueado por otro
    //usuario anteriormente
}
