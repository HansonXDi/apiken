import requests
URL="http://localhost:3000"

def login(correo,contrasenia):
    data = {
        "correo": correo,
        "contrasenia": contrasenia
    }
    response = requests.post(URL+"/login", json=data)
    if response.status_code == 200:
        print("Bienvenido ", response.json()["nombre"])
        return True
    else:
        print("No se pudo iniciar sesion, intenta de nuevo/n")
        return False

print ("Correos ComuniKen/n")

flag_inicio=False
while flag_inicio:
    print ("Correo: ")
    correo_sesion = input()
    print ("Contrasenia: ")
    contrasenia = input()
    print ("Iniciando sesion/n")
    flag_inicio=login(correo_sesion,contrasenia)
#menu----------------------------------------------------------------------------------------------------------------
flag=True
while flag:
    #opciones----------------------------------------------------------------------------------------------------------------
    print("Que desea hacer?/n")
    print ("1. buscar un usuario/n")
    print ("2. marcar usuario como favorito/n")
    print ("3. descamarcar usuario como favorito/n")
    print ("4. ver lista de usuario marcados como favoritos/n")
    print ("5. bloquear usuario/n")
    print ("6. salir/n")
    opcion = input()
    #codigo de opciones----------------------------------------------------------------------------------------------------------------
    if opcion == "1":
        print ("Ingrese el correo del usuario que desea buscar/n")
        correo = input()
        data = {
            "correo": correo
        }
        response = requests.post(URL+"/buscar_usuario", json=data)
        if response.status_code == 200:
            print("Usuario encontrado: ", response.json())
        else:
            print("se ha producido un error, detalles:", response.text)
    elif opcion == "2":
        print ("Ingrese el correo del usuario que desea marcar como favorito/n")
        correo = input()
        data = {
            "correo_que_quiere_maracar": correo_sesion,
            "correo_a_marcar": correo
        }
        response = requests.post(URL+"/marcarcorreo", json=data)
        if response.status_code == 200:
            print("Usuario marcado como favorito")
        else:
            print("se ha producido un error, detalles:", response.text)
    elif opcion == "3":
        print ("Ingrese el correo del usuario que desea descamarcar como favorito/n")
        correo = input()
        data = {
            "correo_que_quiere_desmarcar": correo_sesion,
            "correo": correo
        }
        response = requests.post(URL+"/desmarcarcorreo", json=data)
        if response.status_code == 200:
            print("Usuario descamarado como favorito")
        else:
            print("se ha producido un error,detalles", response.text)
    elif opcion == "4":
        data = {
            "correo": correo_sesion
        }

        response = requests.get(URL+"/favoritos", json=data)
        if response.status_code == 200:
            print("Usuarios favoritos: ", response.json())
        else:
            print("se ha producido un error,detalles", response.text)
    elif opcion == "5":
        print ("Ingrese el correo del usuario que desea bloquear/n")
        correo = input()
        data = {
            "correo": correo
        }
        response = requests.post(URL+"/bloquear", json=data)
        if response.status_code == 200:
            print("Usuario bloqueado")
        else:
            print("se ha producido un error,detalles", response.json())
    elif opcion == "6":
        flag=False
    else:
        print("Opcion no valida")
print("Sesion cerrada")


