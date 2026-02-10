import { usuarios, postUsuarios } from './modules/enun1.js';

usuarios()
.then((usuario) => 
{
    // Se inicializa una constante que se le asigna con un arreglo vacío para guardar el resultado final
    const resultados = [];
    // recorre el arreglo de los usuarios
    usuario.map(({id, name}) => 
    {
        // Llama a la función postUsuarios la cual obtiene los post de cada usuario por medio del id
        postUsuarios(id)
        .then((post) => {
            // En el arreglo resultados se guarda el nombre del usuario y la cantidad de posts que tiene
            resultados.push({
                nombre : name,
                CantidadPosts: post.length 
            });
            // Condición que compara si la cantidad de resultados es igual a la cantidad total de usuarios
            if(resultados.length === usuario.length)
            {
                // Imprime el nombre del usuario y la cantidad de posts
                console.log(resultados);
            }
        })
    })
})