Tarea 2 de Bases de datos

                                  -- Communiken --

        La nueva e innovativa red social en la que puedes interactuar con tus amigos,
                    ¡exclusiva para miembros de la Mojo Dojo House!

Desarrolladores:

Hans Villouta         202273052-8
Erick Ávila           202273103-6
Emilio Valdeldebenito 202273040-4


Instrucciones de ejecucion:

Los siguientes pasos solo se deben hacer una vez:

✧ Debe cambiarse el archivo ".env" con la url de la base de datos a utilizar

✧ Para poder correr la tarea se debe correr en un terminal de powershell en esta carpeta
el siguiente comando:
    pip -r requirements.txt

✧  Con una terminal abierta dentro de la carpeta api, se debe correr el siguiente comando:
    bun add prisma @prisma/client
    npx prisma generate

Una vez hechos los pasos anteriores, cada vez que se quiera utilizar la api se deben seguir
los siguientes pasos:

✧ Asegurarse de que la base de datos este corriendo

✧ Usar el siguiente comando en poweshell dentro de la carpeta api:
    bun run dev
    
✧ En otra terminal diferente sin borrar la anterior usar el siguiente comando en la carpeta
 donde se encuetre el cliente:
    python cliente-communiken.py

✧ Una vez hecho todo eso, solo debe seguir las instrucciones que aparecen en la terminal y
¡a disfrutar de Communiken!
 

Nuestra interpretacion de la tarea:
✧ Marcar favorito marca como favorito a un usuario, no un correo
✧ Ya que en esta tarea no se requeria enviar o hacer cualquier interracion con correos (eso siendo las cartas)
   esta tabla fue omitida.
✧ La ejecucion de esta tarea fue contemplada exclusivamente en Windows, con en Powershell, no se
   garantiza su funcionamiento con otros sistemas operativos como MacOS o Linux. 