import { PrismaClient } from '@prisma/client'
import { Elysia } from "elysia";

const prisma = new PrismaClient()
export const verfavoritos = new Elysia({});
// Ruta para ver los favoritos de un usuario
verfavoritos.get('/api/verfavoritos', async ({query}) => {
    console.log("se ha recibido una peticion verfavoritos");
    // Verifica que se haya ingresado una direccion de correo
    if (query.direccion_correo === undefined) {
        console.log("No se ingreso una direccion de correo");
        return {
            "estado": 400,
            "error": 'No se han ingresado datos' 
        };
    }
    // Busca al usuario en la base de datos
    const usuario = await prisma.usuarios.findUnique({
        where: {
            direccion_correo: query.direccion_correo
        }
    });
    try {
        // Busca los favoritos del usuario
        const favoritos = await prisma.direcciones_Favoritas.findMany({
            where: {
                usuario_favoritadorId: usuario.id
            },
            select: {
                usuario_favoritadoId: false,
                direccion_favorita: true,
                usuario_favoritador: false
            }
        });
        console.log("Peticion del tipo ver/favoritos ha finalizado con exito")
        return {
            "estado": 200,
            "favoritos": favoritos
        };
    } catch (error) {
        // En caso de que no se encuentren favoritos
        console.log("Usuario no tiene favoritos");
        return {
            "estado": 400,
            "error": "Ha existido un error al buscar los favoritos"
        };
    }  
})