// Función asíncrona que obtiene la lista de los usuarios
export const usuarios = async () => {
    // Se realiza una consulta al endpoint de usuarios usando fetch
    const respuestaUser = await fetch('http://localhost:3000/users');
    // Se convierte a formato JSON y devuelve un arreglo con la información de los usuarios
    return await respuestaUser.json();
}
// Función asíncrona que obtiene los post de un usuario
export const postUsuarios = async (id) => {
    // Se realiza una consulta al endpoint de los posts de un usuario en específico por medio del id usando fetch
    const respuestaPost = await fetch(`http://localhost:3000/posts?userId=${id}`);
    // Se convierte a formato JSON y devuelve un arreglo de los post del usuario
    return await respuestaPost.json();
}

