import requests
URL="http://localhost:3000"

def login(correo,contraseña):
    data = {
        "correo": correo,
        "contraseña": contraseña
    }
    response = requests.post(URL+"/login", json=data)
    if response.status_code == 200:
        print("Bienvenido ", response.json()["nombre"])
        return True
    else:
        print("No se pudo iniciar sesion, intenta de nuevo/n")
        return False


def registro(correo,contraseña,nombre ,descripcion):
    data = {
        "correo": correo,
        "contraseña": contraseña,
        "nombre": nombre,
        "descripcion": descripcion
    }
    response = requests.post(URL+"/registro", json=data)
    if response.status_code == 200:
        print("Registrado correctamente")
    else:
        print("No se pudo registrar, detalle: "+ response.txt)
    

print ("Correos hans/n")
print ("Tienes una cuenta?/n")
print ("Si o No/n")
flag_correo=input()

if flag_correo=="No":
    print ("Nombre: ")
    nombre = input()
    print ("Correo: ")
    correo = input()
    print ("Contraseña: ")
    contraseña = input()
    print ("Registrando/n")
    print ("Descripcion:")
    descripcion = input()
    registro(correo,contraseña,nombre,descripcion)

print ("Correo: ")
correo = input()
print ("Contraseña: ")
contraseña = input()
print ("Iniciando sesion/n")
flag_inicio=False

while flag_inicio:
    flag_inicio=login(correo,contraseña)

flag=True
while flag:
    print("Que desea hacer?/n")
    print("1. Enviar un correo/n")
    print("2. Eliminar un correo/n")
    print("3. Hacer un usuario favorito/n")
    print("4. Bloquear a un usuario/n")
    print("5. Ver correos/n")
    print("6. Ver favoritos/n")
    print("7. Ver bloqueados/n")
    print("8. Ver no leidos/n") #hasta aqui llegue
    print("9. desbloquear/n")
    print("10. marcar como leido/n")
    print("11. marcar como no leido/n")
    print("12. marcar como no favoritos/n")

    print("anyotherkey.Salir/n")
    opcion=input()
    if opcion == "1":
        print("Para quien es el correo?/n")
        receptor=input()
        print("Mensaje/n")
        mensaje=input()
        data = {
            "receptor": receptor,
            "mensaje": mensaje
        }
        response = requests.post(URL+"/enviar_correo", json=data)
        if response.status_code == 200:
            print("Correo enviado/n")
        else:
            print("No se pudo enviar el correo, detalle: "+ response.txt+"/n")
    elif opcion == "2":
        print("Que correo desea eliminar?/n")
        correo_eliminar=input()
        data = {
            "correo": correo_eliminar
        }
        response = requests.post(URL+"/eliminar_correo", json=data)
        if response.status_code == 200:
            print("Correo eliminado/n")
        else:
            print("No se pudo eliminar el correo, detalle: "+ response.txt+"/n")
    elif opcion == "3":
        print("A quien desea hacer favorito?/n")
        favorito=input()
        data = {
            "favorito": favorito
        }
        response = requests.post(URL+"/favorito", json=data)
        if response.status_code == 200:
            print("Usuario hecho favorito/n")
        else:
            print("No se pudo hacer favorito al usuario, detalle: "+ response.txt+"/n")
    elif opcion == "4":
        print("A quien desea bloquear?/n")
        bloquear=input()
        data = {
            "bloquear": bloquear
        }
        response = requests.post(URL+"/bloquear", json=data)
        if response.status_code == 200:
            print("Usuario bloqueado/n")
        else:
            print("No se pudo bloquear al usuario, detalle: "+ response.txt+"/n")
    elif opcion == "5":
        response = requests.get(URL+"/ver_correos")
        if response.status_code == 200:
            print("se obtuvieron los correos")
            print(response.json())
        else:
            print("No se pudieron obtener los correos, detalle: "+ response.txt+"/n")
    elif opcion == "6":
        response = requests.get(URL+"/ver_favoritos")
        if response.status_code == 200:
            print("se obtuvieron los favoritos")
            print(response.json())
        else:
            print("No se pudieron obtener los favoritos, detalle: "+ response.txt+"/n")
    elif opcion == "7":
        response = requests.get(URL+"/ver_bloqueados")
        if response.status_code == 200:
            print("se obtuvieron los bloqueados")
            print(response.json())
        else:
            print("No se pudieron obtener los bloqueados, detalle: "+ response.txt+"/n")
    elif opcion == "8":
        response = requests.get(URL+"/ver_no_leidos")
        if response.status_code == 200:
            print("se obtuvieron los no leidos")
            print(response.json())
        else:
            print("No se pudieron obtener los no leidos, detalle: "+ response.txt+"/n")
    
    else:
        flag=False
        print("Adios/n")
    
