import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const login = new Elysia();
// Ruta para iniciar sesion
login.get('/api/login', async ({ query }) => {
    console.log("Se ha recibido una peticion login");
    console.log(query.direccion_correo);
    console.log(query.contrasena);
    // Verificar que se hayan enviado los datos necesarios y que no esten vacios
    if(query.direccion_correo === undefined || query.contrasena === undefined){
      console.log("Error al iniciar sesion1");
      // Si no se envian los datos necesarios se retorna un error
      return {
          "estado": 400,
          "error": "Falta agregar algun dato"
      };
    }
    try {
        // se busca el usuario en la base de datos
        const usuario = await prisma.usuarios.findUnique({
            where: {
                direccion_correo: query.direccion_correo,
                contrasena: query.contrasena
            }
        });
        if (!usuario) {
          console.log("Usuario no ingresado");
          // Si no se encuentra el usuario se retorna un error
            return {
              "estado": 404,
              "error": 'No ingresó un usuario'
            }
        }
        console.log("Peticion del tipo login ha finalizado con exito");
        return {
          "estado": 200,
          "mensaje": 'Sesion iniciada correctamente',
          "nombre": usuario.nombre
        }
    } catch (error) {      
        console.log("Error al iniciar sesion");
        return {
          "estado": 500,
          "error": 'Error en el servidor'
        }
        
    }
});