import requests
URL="http://localhost:3000/api"

def login(correo,contrasena):
    data = {
        "direccion_correo": correo,
        "contrasena": contrasena
    }
    response = requests.get(URL+"/login",params=data)
    if response.json()["estado"] == 200:
        print("Bienvenido", response.json()["nombre"])
        return True
    else:
        input("No se pudo iniciar sesion, presione enter para salir del programa\n")
        return False
#bienvenida------------------------------------------------------------------------------------------------------------
print("-- ¡Bienvenido a CommuniKen! --")
print("La innovativa red social para relacionarte con tus amigos\n")
input("Presione enter para continuar al inicio de sesión\n")
#inicio de sesion-------------------------------------------------------------------------------------------------------
flag_inicio=False
while not flag_inicio:
    correo_sesion = input("Ingrese su correo: ")
    contrasena = input("Ingrese su contraseña: ")
    print ("Iniciando sesión...\n")
    flag_inicio=login(correo_sesion,contrasena)
    if not flag_inicio:
        break
#menu------------------------------------------------------------------------------------------------------------------
if(flag_inicio):
    flag=True
else:
    flag=False
#opciones--------------------------------------------------------------------------------------------------------------
while flag:
    print("¿Que desea hacer?")
    print("1. Buscar a un usuario")
    print("2. Marcar a un usuario como favorito")
    print("3. Desmarcar usuario como favorito")
    print("4. Ver lista de usuario favoritos")
    print("5. Bloquear a un usuario")
    print("6. Registrar un nuevo usuario")
    print("7. Salir de Communiken")
    opcion = input()
    #codigo de opciones-------------------------------------------------------------------------------------------------
    if opcion == "1":
        print ("Ingrese el correo del usuario que desea buscar")
        correo = input()
        data = {
            "direccion_correo": correo
        }
        response = requests.get(URL+"/informacion",params=data)
        if response.json()["estado"] == 200:
            print("\n¡Usuario encontrado!\n \nNombre:", response.json()["nombre"],"\nCorreo :",response.json()["direccion_correo"],"\nDescripcion:",response.json()["descripcion"],"\n")
            input("Presione enter para continuar\n")
        else:
            print(response.json()["error"],"\n")
            input("Presione enter para continuar\n")
    elif opcion == "2":
        print ("Ingrese el correo del usuario que desea marcar como favorito")
        correo = input()
        data = {
            "correo_marcado": correo,
            "correo_marcador": correo_sesion
        }
        response = requests.post(URL+"/marcarcorreo", json=data)
        if response.json()["estado"] == 200:
            print("¡Usuario marcado como favorito exitosamente!")
            input("Presione enter para continuar\n")
        else:
            print(response.json()["error"],"\n")
            input("Presione enter para continuar\n")
    elif opcion == "3":
        print ("Ingrese el correo del usuario que desea desmarcar como favorito")
        correo = input()
        data = {
            "correo_marcado": correo,
            "correo_marcador": correo_sesion
        }
        response = requests.delete(URL+"/desmarcarcorreo", params=data)
        if response.json()["estado"] == 200:
            print("¡Usuario desmarcado como favorito exitosamente!\n")
            input("Presione enter para continuar\n")
        else:
            print(response.json()["error"],"\n")
            input("Presione enter para continuar\n")
    elif opcion == "4":
        data = {
            "direccion_correo": correo_sesion
        }
        response = requests.get(URL+"/verfavoritos", params=data)
        if response.json()["estado"] == 200:
            if response.json()["favoritos"] != []:
                print("Usuarios favoritos: ")
                i=1
                for usuario in response.json()["favoritos"]:
                    print("Usuario "+str(i)+":", usuario["direccion_favorita"])
                    i+=1
                input("\nPresione enter para continuar\n")
            else:
                print("No tiene usuarios favoritos")
                input("Presione enter para continuar\n")
        else:
            print(response.json()["error"],"\n")
            input("Presione enter para continuar\n")
    elif opcion == "5":
        print ("Ingrese el correo del usuario que desea bloquear")
        correo = input()
        data = {
            "correo_marcado": correo,
            "correo_marcador": correo_sesion
        }
        response = requests.post(URL+"/bloquear", json=data)
        if response.json()["estado"] == 200:
            print("¡Usuario bloqueado exitosamente!")
            input("Presione enter para continuar\n")
        else:
            print(response.json()["error"],"\n")
            input("Presione enter para continuar\n")
    elif opcion == "6":
        print("Ingrese los datos del nuevo usuario")
        nombre = input("Nombre: ")
        direccion_correo = input("Correo: ")
        contrasena = input("Contraseña: ")
        descripcion = input("Descripcion: ")
        data = {
            "nombre": nombre,
            "direccion_correo": direccion_correo,
            "contrasena": contrasena,
            "descripcion": descripcion
        }
        response = requests.post(URL+"/registrar", json=data)
        if response.json()["estado"] == 200:
            print("¡Usuario registrado con éxito!\n")
            input("Presione enter para continuar\n")
        else:
            print(response.json()["error"],"\n")
            input("Presione enter para continuar\n")
    elif opcion == "7":
        flag=False
    else:
        print("Opcion no valida")
print("Sesion terminada")
print("¡Gracias por usar Communiken!")