// Enunciado 1: (Usuarios activos y sus publicaciones)
// Una aplicación web requiere mostrar un listado de usuarios activos junto con la cantidad
// de publicaciones que han realizado. Sin embargo, no todos los usuarios han creado
// publicaciones. El sistema debe identificar correctamente estos casos.

// Función asíncrona principal que obtiene usuarios activos y cuenta sus publicaciones
const usuariosActivosConPublicaciones = async () => {
    
    // Realizar petición GET para obtener la lista completa de usuarios desde la API
    const listaCompleta = await fetch(`http://localhost:3000/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Convertir la respuesta a formato JSON
    const usuarios = await listaCompleta.json();
    
    // Realizar petición GET para obtener todas las publicaciones desde la API
    const listaPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Convertir la respuesta a formato JSON
    const publicaciones = await listaPublicaciones.json();

    // Crear array vacío para almacenar el resultado final
    const publicacionesPorUsuario = [];

    // Recorrer cada usuario para verificar si está activo y contar sus publicaciones
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];

        // Verificar si el usuario tiene el estado activo
        if (usuario.active === true) {
            // Inicializar contador de publicaciones en 0
            let numpublicaciones = 0;

            // Recorrer todas las publicaciones para contar las que pertenecen al usuario actual
            for (let publicacion = 0; publicacion < publicaciones.length; publicacion++) {
                // Comparar el userId de la publicación con el id del usuario (convertido a número)
                if (publicaciones[publicacion].userId === Number(usuario.id)) {
                    numpublicaciones++;
                }
            }

            // Agregar el usuario y su cantidad de publicaciones al array de resultados
            publicacionesPorUsuario.push({
                nombreUsuario: usuario.name,
                cantidadPublicaciones: numpublicaciones
            });
        }
    }

    // Mostrar encabezado en consola
    console.log("Usuarios activos y sus publicaciones: ");
    // Recorrer e imprimir cada usuario con su cantidad de publicaciones
    for (let i = 0; i < publicacionesPorUsuario.length; i++) {
        console.log(`Nombre: ${publicacionesPorUsuario[i].nombreUsuario} - Cantidad de publicaciones: ${publicacionesPorUsuario[i].cantidadPublicaciones}`);
    }

    // Retornar el array con los resultados
    return publicacionesPorUsuario;
}

// Ejecutar la función principal
usuariosActivosConPublicaciones();