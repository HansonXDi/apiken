import { PrismaClient } from '@prisma/client'
import { Elysia } from "elysia";

const prisma = new PrismaClient()
export const verfavoritos = new Elysia({});

verfavoritos.get('/api/verfavoritos', async ({body}) => {
    console.log("se ha recibido una peticion verfavoritos");
    if (!body) {
        return {
            "estado": 400,
            "error": 'No se han ingresado datos' 
        };
    }
    const { id } = body;
    if (typeof id === 'undefined' || id === null || id === '') {
        console.log("Peticion del tipo ver/favoritos ha fallado");
        return {
            "estado": 400,
            "error": 'Falta la contraseña o el correo' 
        };
    }
    try {
        const favoritos = await prisma.favoritos.findMany({
            where: {
                id_usuario: id
            },
            select: {
                direccion_correo: true,
            }
        });
        console.log("Peticion del tipo ver/favoritos ha finalizada con exito")
        return {
            "estado": 200,
            "favoritos": favoritos
        };
    } catch (error) {
        console.log("Peticion del tipo ver/favoritos ha fallado");
        return {
            "estado": 400,
            "error": "Ha existido un error al buscar los favoritos"
        };
    }  
})