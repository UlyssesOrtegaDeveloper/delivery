import * as fn from './funciones.js';
import * as pestaña_ruta from './01_Pestaña_Ruta.js';
/* import * as section_1 from './02_Pestaña_estadisticas.js'; */


let response = await fetch('./json/empresas.json');
let aoEmpresas = await response.json();
let response2 = await fetch('./json/repartos.json');
let aoReparto = await response2.json();


/// ------------------------------------------------------------
///               1º SELECT > EMPRESAS (AUTOMATICO)
/// ------------------------------------------------------------
/// PASO 1: Obtener un array de todas las empresas [Rhenus, Hill Food] 
const fn_aLista_Empresas = () => aoEmpresas.map(x => x.empresa);
/// PASO 1: HTML
fn.fnCrearListaElementosOption('idEmpresas', fn_aLista_Empresas());


/// ------------------------------------------------------------
///               2º SELECT > AÑOS (AUTOMATICO)
/// ------------------------------------------------------------
/// PASO 2: Obtener un array multidimensional de meses y años [[ 2023, "febrero" ],[ 2023, "enero" ]]
const fn_amAñosMeses = (parametro_value = 0) => {  
    
    let amAñosMeses = [];
    aoReparto.forEach(x => {
        if (x.empresa == fn_aLista_Empresas()[parametro_value]) {amAñosMeses.push([x.año, x.mes]);}
    });
    return amAñosMeses;
}


/// PASO 2: separamos los años [2023,2022]
const fn_aAñosTrabajados = (parametro_iterador) => { 
    
    let aLista_Años_Repetidos = parametro_iterador.map(element => element[0]);
    return [...new Set(aLista_Años_Repetidos)];
}

/// PASO 2: HTML
fn.fnCrearListaElementosOption('idAño', fn_aAñosTrabajados(fn_amAñosMeses()));


/// ------------------------------------------------------------
///               3º SELECT > MESES (AUTOMATICO)
/// ------------------------------------------------------------
/// PASO 3: Obtenemos un array de todos los meses trabajados
const fn_aMesesTrabajados = (parametro_iterador) => { 
    /// Siempre [1] > para obtener los meses
    return parametro_iterador.map(element => element[1]); /// ['febrero','enero','diciembre','noviembre',',octubre']
};


/// PASO 3: Obtener un array del numero de repeticiones de año en funcion de los meses trabajados [2,3] -> 2 veces 2023, 3 veces 2022
const fn_aAñosRepetidos = (parametro_iterador) => {

    let aListaAñosTrabajados = parametro_iterador.map(element => element[0]);  /// [2023,2023,2022,2022,2022]

    let aAñosRepetidos = [];
    let contador = 1;
    
    for (let i = 0; i < aListaAñosTrabajados.length; i++) {

        if (aListaAñosTrabajados[i+1] === aListaAñosTrabajados[i]) { /// itera el bucle en busca de iguales y los va contando
            contador++;
        } else {
            aAñosRepetidos.push(contador); /// [2,3] -> 2 veces 2023, 3 veces 2022
            contador = 1; /// se inializa a 1 cada vez que entra aqui, para empezar el bucle
        }
    }
    return aAñosRepetidos;
};


/// PASO 3:  Obtener un array multidimensional de meses en cada array es un año distinto   [ "febrero", "enero" ]​,[ "diciembre", "noviembre", "enero" ]
const fn_amMesesSeparadosPorAños = (listaMeses, mesesRepetidos) =>  {
    let amLista_Meses_Select = [];
    /// creamos un array multidimensional
    amLista_Meses_Select = mesesRepetidos.map((element, i) => {
        return new Array(mesesRepetidos[i]);
    });

    let contador_meses = 0;
    let contador_bucle = 0
    /// inseramos en el 'am' los meses correspondientes a cada año trabajado
    mesesRepetidos.forEach((element, i) => {
        
        for (let index = 0; index < element; index++) {

            amLista_Meses_Select[i][contador_bucle] = listaMeses[contador_meses]
            contador_meses++;
            contador_bucle++;
        }

        contador_bucle = 0;
    });

    return amLista_Meses_Select;
};


/// PASO 3: HTML > usamos [0] porque al ser la primera carga de la app, mostramos el 1º resultado
fn.fnCrearListaElementosOption('idMeses', fn_amMesesSeparadosPorAños(fn_aMesesTrabajados(fn_amAñosMeses()), fn_aAñosRepetidos(fn_amAñosMeses()))[0]); /// [0] [ "febrero", "enero" ] [1] [ "diciembre", "noviembre", "enero" ]


const select_empresa = document.querySelector('#idEmpresas');
const select_mes = document.querySelector('#idMeses');
const select_año = document.querySelector('#idAño');

const pantalla_ruta = document.querySelector('#idTablaReparto');
const pantalla_estadisticas_desgloce_ruta = document.querySelector('#idEstadisticasReparto');
const pantalla_estadisticas_media_diasTrabajados = document.querySelector('#idEstadisticasMedia');
const pantalla_estadisticas_barritas = document.querySelector('#idContenedor-barritas');
const pantalla_estadisticas_barritas_letras = document.querySelector('#idContenedor-letras');
const pantalla_resumen_tabla_resumen = document.querySelector('#idCalculo-resumen');
const pantalla_resumen_tabla_impuestos = document.querySelector('#idCalculo-total');
const pantalla_factura_lista_reparto_diaria = document.querySelector('#idContainerTablaRuta');
const pantalla_factura_lista_observaciones = document.querySelector('#idObservaciones');
const pantalla_factura_titulo_observaciones = document.querySelector('#idTituloObservaciones');
const pantalla_factura_lista_resparto_mensual = document.querySelector('#idFactura-reparto');
const pantalla_factura_lista_total_impuestos = document.querySelector('#idFactura-total-impuestos');

const LIMPIAR_PANTALLA = () => {
    pantalla_ruta.innerHTML = '';
    pantalla_estadisticas_desgloce_ruta.innerHTML = '';
    pantalla_estadisticas_media_diasTrabajados.innerHTML = '';
    pantalla_estadisticas_barritas.innerHTML = '';
    pantalla_estadisticas_barritas_letras.innerHTML = '';
    pantalla_resumen_tabla_resumen.innerHTML = '';
    pantalla_resumen_tabla_impuestos.innerHTML = '';
    pantalla_factura_lista_reparto_diaria.innerHTML = '';
    pantalla_factura_lista_observaciones.innerHTML = '';
    pantalla_factura_lista_resparto_mensual.innerHTML = '';
    pantalla_factura_lista_total_impuestos.innerHTML = '';
    pantalla_factura_titulo_observaciones.innerHTML = '';
}

/// --------------------------------------------
///    ARRAY >  Obtenemos lo que muestran los 3 selects en este momento > ejemplo: ['Rhenus','agosto',2023]
/// --------------------------------------------
const fn_aObtenerTextoSelects = () => {

    let empresa_seleccionada = select_empresa.options[select_empresa.selectedIndex].text;
    let mes_seleccionado = select_mes.options[select_mes.selectedIndex].text;
    let año_seleccionado = select_año.options[select_año.selectedIndex].text;

    let aTextoSeleccionado = [empresa_seleccionada,mes_seleccionado,año_seleccionado];

    return aTextoSeleccionado;
}
/// --------------------------------------------
///             INICIO AUTOMATICO APP
/// --------------------------------------------
pestaña_ruta.MOSTRAR_RUTA(...fn_aObtenerTextoSelects());
pestaña_ruta.MOSTRAR_ESTADISTICAS(...fn_aObtenerTextoSelects());
pestaña_ruta.MOSTRAR_RESUMEN(...fn_aObtenerTextoSelects());
pestaña_ruta.MOSTRAR_FACTURA(...fn_aObtenerTextoSelects());
/// -------------------------------------------- 


///------------------------------------------------
///         ELEGIDO POR EL SELECT
///------------------------------------------------

select_empresa.addEventListener('change', e => {
    LIMPIAR_PANTALLA();
    select_año.innerHTML = '';
    select_mes.innerHTML = '';

    fn.fnCrearListaElementosOption('idAño', fn_aAñosTrabajados(fn_amAñosMeses(e.target.value)));
    /// PASO 3: HTML > usamos [0] porque al ser la primera carga de la app, mostramos el 1º resultado   
    fn.fnCrearListaElementosOption('idMeses', fn_amMesesSeparadosPorAños(fn_aMesesTrabajados(fn_amAñosMeses(e.target.value)), fn_aAñosRepetidos(fn_amAñosMeses(e.target.value)))[0]); /// [0] [ "febrero", "enero" ] [1] [ "diciembre", "noviembre", "enero" ]
    /// MOSTRAMOS EN PANTALLA > Pestaña Ruta
    pestaña_ruta.MOSTRAR_RUTA(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_ESTADISTICAS(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_RESUMEN(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_FACTURA(...fn_aObtenerTextoSelects());
});


select_año.addEventListener('change', e => {
    LIMPIAR_PANTALLA();
    select_mes.innerHTML = '';

    fn.fnCrearListaElementosOption('idMeses', fn_amMesesSeparadosPorAños(fn_aMesesTrabajados(fn_amAñosMeses(select_empresa.value)), fn_aAñosRepetidos(fn_amAñosMeses(select_empresa.value)))[e.target.value]);
    /// MOSTRAMOS EN PANTALLA > Pestaña Ruta
    pestaña_ruta.MOSTRAR_RUTA(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_ESTADISTICAS(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_RESUMEN(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_FACTURA(...fn_aObtenerTextoSelects());
});


select_mes.addEventListener('change', e => {
    LIMPIAR_PANTALLA();

    pestaña_ruta.MOSTRAR_RUTA(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_ESTADISTICAS(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_RESUMEN(...fn_aObtenerTextoSelects());
    pestaña_ruta.MOSTRAR_FACTURA(...fn_aObtenerTextoSelects());
});



/* const allSelects = document.querySelector('#idAllSelects');



allSelects.addEventListener('change', e => {

    pantalla_ruta.innerHTML = ''; 
    
    console.log('EMPRESA', select_empresa.value, ' MES', select_mes.value);
    
    if (e.target.name == 'empresa') {
        console.log('DENTRO EMPRESA');
        select_año.innerHTML = ''; 
        select_mes.innerHTML = '';
        /// empresa
        fn.fnCrearListaElementosOption('idAño', fn_aAñosTrabajados(fn_amAñosMeses(select_empresa.value)));
    }

    if (e.target.name == 'mes') {
        console.log('DENTRO MES');
        select_mes.innerHTML = '';
        /// mes
        fn.fnCrearListaElementosOption('idAño', fn_aAñosTrabajados(fn_amAñosMeses(select_empresa.value)));
        fn.fnCrearListaElementosOption('idMeses', fn_amMesesSeparadosPorAños(fn_aMesesTrabajados(fn_amAñosMeses(select_empresa.value)), fn_aAñosRepetidos(fn_amAñosMeses(select_empresa.value)))[select_mes.value]);
        
    }
    /// MOSTRAMOS EN PANTALLA > Pestaña Ruta
    /// 
    console.log('FILTRADO', ruta.FILTRAR(...fn_aObtenerTextoSelects()));

}); */
