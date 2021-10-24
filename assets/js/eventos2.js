import * as Api from './modules/apix2.js';

const URL_API = "https://my-json-server.typicode.com/UlyssesOrtegaDeveloper/api-json/";


document.querySelector('#mes').addEventListener('change', e => {
    Api.fnGetDatos(`${URL_API}/${select_ano.value}/${e.target.value}`, `${select_empresa.value}`); 
});


document.querySelector('#ano').addEventListener('change', e => {
    Api.fnGetDatos(`${URL_API}/${e.target.value}/${select_meses.value}`, `${select_empresa.value}`); 
});


document.querySelector('#empresa').addEventListener('change', e => {
    Api.fnGetDatos(`${URL_API}/${select_ano.value}/${select_meses.value}`, `${e.target.value}`);
});

// OK > Funcion automatica: Muestra en la pagina de inicio
// OK > segun el año y mes que estemos muestra los datos con la empresa rhenus como predeterminada

document.addEventListener('DOMContentLoaded', () => {

    // spinner hasta cargar la pagina
    document.querySelector('.spinner-wrapper').style.display = 'none';

    let fecha = new Date();
    let mes  = fecha.getMonth();
    let anio = fecha.getFullYear();

    Api.fnGetDatos(`${URL_API}/${anio}/${mes}`, `rhenus`);
})


// ------------------------

