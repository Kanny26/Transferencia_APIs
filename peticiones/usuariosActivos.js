// Enunciado 1: (Usuarios activos y sus publicaciones)
// Una aplicación web requiere mostrar un listado de usuarios activos junto con la cantidad
// de publicaciones que han realizado. Sin embargo, no todos los usuarios han creado
// publicaciones. El sistema debe identificar correctamente estos casos.
// Requerimientos
// • Consultar la lista completa de usuarios.
// • Consultar la lista de publicaciones.
// • Identificar cuáles usuarios tienen publicaciones asociadas.
// • Calcular la cantidad de publicaciones por usuario.
// • Mostrar también los usuarios que no tienen publicaciones.
// Datos de entrada
// • Endpoint de usuarios (users).
// • Endpoint de publicaciones (posts).
// • Identificador del usuario (userId)
// Datos de salida
// • Listado de usuarios con:
// o Nombre del usuario
// o Cantidad de publicaciones asociadas (puede ser 0)

const usuariosActivosConPublicaciones = async () => {
    
    //mostrar la lista completa de usuarios 
    const listaCompleta = await fetch(`http://localhost:3000/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const usuarios = await listaCompleta.json();
    
    //mostrar la lista de publicaciones
    const listaPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const publicaciones = await listaPublicaciones.json();

    //calcular publicaciones por usuario
    const publicacionesPorUsuario = [];

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];

        if (usuario.active === true) {
            let numpublicaciones = 0;

            for (let publicacion = 0; publicacion < publicaciones.length; publicacion++) {
                // Convertir el id del usuario a número para comparar
                if (publicaciones[publicacion].userId === Number(usuario.id)) {
                    numpublicaciones++;
                }
            }

            publicacionesPorUsuario.push({
                nombreUsuario: usuario.name,
                cantidadPublicaciones: numpublicaciones
            });
        }
    }

    //mostrar usuarios y sus publicaciones
    console.log("Usuarios activos y sus publicaciones: ");
    for (let i = 0; i < publicacionesPorUsuario.length; i++) {
        console.log(`Nombre: ${publicacionesPorUsuario[i].nombreUsuario} - Cantidad de publicaciones: ${publicacionesPorUsuario[i].cantidadPublicaciones}`);
    }

    return publicacionesPorUsuario;

}

usuariosActivosConPublicaciones();