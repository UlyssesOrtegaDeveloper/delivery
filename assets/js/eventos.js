import * as Api from './modules/apix.js';

const URL_API        = "https://my-json-server.typicode.com/UlyssesOrtegaDeveloper/api-json/";

const select_meses   = document.querySelector('#mes');
const select_ano     = document.querySelector('#ano');
const select_empresa = document.querySelector('#empresa');


select_meses.addEventListener('change', e => {
    Api.fnGetDatos(`${URL_API}/${select_ano.value}/${e.target.value}`, `${select_empresa.value}`); 
});


select_ano.addEventListener('change', e => {
    Api.fnGetDatos(`${URL_API}/${e.target.value}/${select_meses.value}`, `${select_empresa.value}`); 
});


select_empresa.addEventListener('change', e => {
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

