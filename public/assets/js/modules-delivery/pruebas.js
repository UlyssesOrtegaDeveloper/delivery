import * as db from './db.js';
import * as fn from './funciones.js';

export let empresa = 'Rhenus';
/// PASO 1: Cargar Select Empresas
/// PASO 2: Cargar Select Años
/// PASO 3: Cargar Select Meses


/// aNombre     array []
/// amNombre    array multidimensional [[],[],[]]
/// oNombre     objeto {}
/// aoNombre    array de objetos [{},{},{}]
/// fnNombre    function const fnNombre = ()
/// let nombre  variable












let mes = 'diciembre';
let año = '2022';


/// BASE DE DATOS
let response = await fetch('./json/repartos.json');
let aoPaso2 = await response.json();

/// OK · Enero 23
///      CREACION DE FUNCION > para filtrar AÑO y MES de la BASE DE DATOS
const fnFiltrar = (year, month) => aoPaso2.filter((x) => x.año == year && x.mes == month);

/// OK · Enero 23
///      Ejecutamos la funcion
let oFiltrado_1 = fnFiltrar(año, mes);

/// OK · Enero 23
///      Usamos el metodo FILTER para obterner los datos de la EMPRESA que queremos
let oFiltrado_2 = oFiltrado_1[0].reparto.filter((x) => x.empresa == empresa);


console.log('VIEJO', oFiltrado_2);

/// DECLARACION DE ARRAYS
let newArrayCabecera = [];
let newArrayContenido = [];

/// OK · Enero 23
/// Instanciamos en los Arrays creados, el filtrado de objetos
oFiltrado_2.forEach(element => {
    try {
        if (element.empresa == empresa) {
        
            newArrayCabecera = Object.keys(element);
            newArrayContenido.push(Object.values(element));
        }
        
    } catch (error) {
        console.log('Error:', error);
    }
});

/* console.log('newArrayCabecera',newArrayCabecera);
console.log('newArrayContenido',newArrayContenido); */

/// DECLARACION DE ARRAY
let amTablaRuta = [];

/// OK · Enero 23
/// Creamos un ARRAY MULTIDIMENCIONAL
newArrayCabecera.forEach((element, i) => {
    /// creamos una dimesion a cada iteración
    amTablaRuta[i] = [];
    /// insertamos los elementos
    amTablaRuta[i].push(element);

    newArrayContenido.forEach((element, j) => { 
        /// insertamos los elementos en la dimension creada
        amTablaRuta[i].push(Object.values(newArrayContenido[j])[i]);                
    });
});

/* console.log(amTablaRuta); */


/// OK · Enero 23 > Super funcion para crear varias listas <ul> con sus correspondientes <li>
///      Solo para Arrays Multidimensionales > ej: [[1,2,3],[a,b,c],[q,w,e]]
const fnCrearElementosUl = (idPadre, arrayMulti, iterador) => {

    let dFrag = document.createDocumentFragment();
    let ul = document.createElement('ul');

    /// NO queremos el valor 0, porque es el nombre de la empresa y no la necesitamos
    if (iterador > 0) {
        
        arrayMulti.forEach(element => {
            let li = document.createElement('li');
            
            /// Si 'element' es un Objeto
            if (typeof element == 'object') {
                li.textContent = element.length;
                dFrag.appendChild(li);

            /// si 'element' es un String o Number
            } else {
                li.textContent = element;
                dFrag.appendChild(li);
            }
        });

        // Add fragment to a list:
        document.getElementById(idPadre).appendChild(ul).appendChild(dFrag);
    }
}
/// OK · Enero 23 > Bucle de la fn 'fnCrearElementosUl' 
///      para poder meter dentro del <div> padre, la iteracion de <li> dentro de un <ul> individual
///      llamamos a la fn 'fnCrearElementosUl' para crear listas de elementos <ul> <li>


const fnMostarTablaReparto = (idContenedor) => {
    amTablaRuta.forEach((element, i) => fnCrearElementosUl(idContenedor, element, i));
}

fnMostarTablaReparto('idTablaReparto');
///----------------------------------------------------
///                 PESTAÑA ESTADISTICAS
///----------------------------------------------------

/// DECLARACION DE ARRAY
let aNumFiltradosSumas = [];

/// OK · Enero 23 > FILTRAMOS
///      del array Multidimensional 'amTablaRuta' necesitamos filtrar los numeros enteros
amTablaRuta.map((element, i) => {

    let paso1 = element.filter(numero =>  Number.isInteger(numero));

    /// al filtrar en el 'paso1' los arrays [0] y [1] se quedan vacios, pero ocupan lugar
    /// al poner la condicion '>0' los eliminamos y creamos un array solo con enteros en todas sus iteraciones
    if (paso1.length > 0) {
        /// añadimos los enteros filtrados
        aNumFiltradosSumas.push(paso1);
    }
});

/// DECLARACION DE ARRAY y Variable 
const aSuma = [];
let sumas;

/// OK · Enero 23 > REDUCE para rellenar con las SUMAS el array 'aSumas'
aNumFiltradosSumas.forEach((element, i) => {
    
    /// Bucle REDUCE para SUMAR
    element.forEach((element2, j) => {
        sumas = element.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);
    });

    /// Usamos el Metodo PUSH para introduciar en amSumas las SUMAS del REDUCE
    aSuma.push(sumas);
});


/// OK · Enero 23 > DESTRUCTURACION
///      con el fin de reutilizar el array 'newArrayCabecera'
///      quitamos el [0] y [1] los cuales son 'empresa' y 'dia' los cuales no vamos a querer
let [,, ...restoCabecera] = newArrayCabecera;


const fnCrearElementosLi = (idPadre, sumas) => {

    let dFrag = document.createDocumentFragment();
    
    sumas.forEach((element, i) => {
        let li = document.createElement('li');
        let node_div = document.createElement('div');
        let node_span = document.createElement('span');
            
        node_div.textContent = element;
        node_span.textContent = restoCabecera[i];
        dFrag.appendChild(li).appendChild(node_div).classList.add("numero");;
        dFrag.appendChild(li).appendChild(node_span).classList.add("fuente");;
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}

fnCrearElementosLi('idEstadisticasReparto', aSuma);



/// OK · Enero 23 > DIAS TRABAJADOS
const fnDiasTrabajados = () => newArrayContenido.length;

/// OK · Enero 23 > MEDIA DE REPARTO DIARIO
const fnMediaDiaria = () => {
    /// suma especial
    if(empresa == 'Rhenus') {
        /// DESTRUCTURACION para no sumar todas sino 'entregas','recogidas','especiales'y'extras' > se deja fuera 'kilos' y 'supermercados'
        let [a, b, cNO, c, dNO, d] = aSuma;
        let todoSumado = [a,b,c,d].reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);

        return (todoSumado/fnDiasTrabajados());

    } else {
        /// reutilizamos aSumas
        let todoSumado = aSuma.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);

        return (todoSumado/fnDiasTrabajados());
    }
}

const aMediaDiasTrabajados = [fnMediaDiaria().toFixed(0), fnDiasTrabajados()];

fnCrearElementosLi('idEstadisticasMedia', aMediaDiasTrabajados);



/// --------------------------
///         Barritas 
/// --------------------------

let aArray = [21,32,23,40,35,26,47,18,29,30];
let aArrayDias = ['L','M','X','J','V','L','M','X','J','V'];


/// OK · Enero 23
///      insert HTML > BARRAS
const fnCrearListaElementosDiv = (idPadre, array) => {

    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {
        let node_div = document.createElement('div');
            
        node_div.textContent = element;
        dFrag.appendChild(node_div).classList = "barrita";
        dFrag.appendChild(node_div).style.height = `${element}%`;
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}

fnCrearListaElementosDiv('idContenedor-barritas', aArray);



/// OK · Enero 23
///      insert HTML > LETRAS DIAS BARRAS
const fnCrearListaElementosDiv2 = (idPadre, array) => {

    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {
        let node_div = document.createElement('div');

        node_div.textContent = element;
        dFrag.appendChild(node_div).classList = "barritas_letra";
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}

fnCrearListaElementosDiv2('idContenedor-letras', aArrayDias);








//! PRUEBAS para crear listas de elementos automaticas
const etiquetas_barritas = ['div'];
const contenido_texto = ['10%'];
const reparto = [25,31,11,29,20];


/// CREAR LISTAS <ul> <li> <div> etc
/// Siempre tiene que pasar por parametro un 'idPadre' que sera el contenedor
const fnCrearListasDeElementos = (idPadre, array, texto , etiquetas) => {

    console.log('idPadre', idPadre);
    console.log('array', array);
    console.log('...etiquetas', etiquetas);
    console.log('texto', texto);

    /// creamos elemento etiquetas
    let etiqueta = etiquetas.map(x => {

        return document.createElement(x);
    })

    
    console.log('>>', etiqueta);


    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {

     /* let li = document.createElement('li');
        let node_div = document.createElement('div');
        let node_span = document.createElement('span'); */
        

            
        /* node_div.textContent = element; */
        /* node_span.textContent = restoCabecera[i]; */
        /* dFrag.appendChild(li).appendChild(node_div).classList.add("numero");
        dFrag.appendChild(li).appendChild(node_span).classList.add("fuente"); */
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}
//! TAPADO PARA NO EJECUTAR HASTA HACER LAS PRUEBAS
/* fnCrearListasDeElementos('contenedor-barritas', reparto, contenido_texto, etiquetas_barritas); */


