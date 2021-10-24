

const message = document.querySelector('#message');

const resumen = document.querySelector('#resumen');
const arrayResumen = [resumen]

const barritas = document.querySelector('#contenedor-barritas')



/* let arrayDatos = [[],[],[],[],[],[]];
let total = [];

let objSumas = {'entregas': 0, 'recogidas': 0, 'kilos': 0, 'especiales': 0, 'extras': 0}; */

let aData = [];
let aCabecera = [];
let aContenido = {};

// fn Inicial
const fnGetDatos = async (url, empresa) => {

    try {
        message.innerHTML = 'Cargando ...';

        console.log('1. escaneando ...');
        let resultado = await fetch('./assets/json/db2.json');

        console.log('2. creando objeto ...');
        aData = await resultado.json();

        console.log('3. objeto creado', aData);

        console.log('6. obteniendo contenido de tabla');        
        fnContenidoTabla(aData, 2021, 9, 'rhenus');

        console.log('4. obteniendo cabecera de tabla');
        fnCabeceraTabla(aData, 2021, 9, 'rhenus');

        console.log('5. array cabecera', aCabecera);

        

        console.log('7. array contenido', aContenido);
        
        
        /* console.log('2. insertando datos en pantalla', fnInsertarEnSolapas(data, empresa));
        console.log('3. rellenando arrayDatos para luego sumar', fnRellenandoParaPoderSumar(data, empresa));
        console.log('4. rellenando objSumas', fnSumas(arrayDatos));
        console.log('5. rellenando numero de entregas, recogidas, etc', fnResumen(arrayDatos));

        console.log('7. insertando barritas', fnRellenarBarritas(arrayDatos, data, empresa)); */


        message.innerHTML = '';
    }
    
    catch (error) {
        console.log('ERROR >>', error.message);
        message.innerHTML = 'Error al cargar los datos';
    }
}


// OK. fn que inyecta html 
const fnCabeceraTabla = async(data, año, mes, empresa) => {

    let html = document.querySelector('.insertarHtmlTablaRuta');

    data.forEach(items => {

        if (items.año == año) {

            items.meses.forEach(item => {

                if (item.id == mes && item.empresa == empresa) {
                
                    let objCabecera = Object.keys(item.ruta[0]);

                    objCabecera.forEach(element => {

                      html.innerHTML += `<ul><li>${element}</li></ul>`
                    })
                }
            })
        }
    })
}



// OK. fn que instancia el array 'aContenido'
const fnContenidoTabla = async(data, año, mes, empresa) => {

    data.forEach(items => {

        if (items.año == año) {

            items.meses.forEach(item => {

                if (item.id == mes && item.empresa == empresa) {
                
                    let objContenido = Object.values(item.ruta);

                    objContenido.forEach(item => {

                        aContenido = objContenido;

                        let dedo = Object.values(item);

                        return aContenido;
                    })
                }
            })
        }
    })   
}




const fnGlobalAveriguarAño = () => {
    
    let fecha = new Date();
    let anio = fecha.getFullYear();

    return anio;
}

const fnGlobalAveriguarMes = () => {
    
    let fecha = new Date();
    let mes  = fecha.getMonth();

    return mes;
}








// paso 1 > mostrando en pantalla los datos
const fnInsertarEnSolapas = (data, empresa) => {
    
    // limpiamos anteriores registros
    for(let i = 0; i < arrayInsertHtmlSolapas.length; i++){
            
        arrayInsertHtmlSolapas[i].innerHTML = ``;
    }

    data.mes.forEach(element => {

        let claves = Object.keys(element);
        
        for(let i = 0; i < arrayInsertHtmlSolapas.length; i++){
            
            if (element.empresa == empresa && i > 0) {
                
                arrayInsertHtmlSolapas[i].innerHTML += `<li>${element[claves[i]]}</li>`;
            }
        }
    });
}

// paso 2 > rellenando para poder sumar
const fnRellenandoParaPoderSumar = (data, empresa) => {

    data.mes.forEach(element => {

        if(typeof element.solapa2 === 'number' && element.empresa == empresa) { 

            arrayDatos[0].push(element.solapa2);
            arrayDatos[1].push(element.solapa3);
            arrayDatos[2].push(element.solapa4);
            arrayDatos[3].push(element.solapa5);
            arrayDatos[4].push(element.solapa6);
        }
    });
}

// paso 3 > rellenando 'objSumas'
const fnSumas = (items) => {
    
    let claves = Object.keys(objSumas);

    items.forEach(item => {

        total.push(item.reduce((acc, el) => acc + el, 0));

        for(let i = 0; i < claves.length; i++){
        
            objSumas[claves[i]] = total[i];
        }
    });
}




/* *********************** 
    PESTAÑA RESUMEN
**************************/

const fnResumen = (data) => {   // nos muestra el numero total de Entregas, recogidas, etc ...

    let diasTrabajados = data[0].length;

    try {
        
        // limpiamos anteriores registros
        for(let i = 0; i < arrayResumen.length; i++){
                
            arrayResumen[i].innerHTML = ``;
        }

        let keys = Object.keys(objSumas);
        let values = Object.values(objSumas);

        // insertamos en HTML
        for(let i = 0; i < values.length; i++){
        
            resumen.innerHTML += `<li><div class="resumenValues counter" data-target="${values[i]}">0</div><div class="resumenKeys">${keys[i]}</div></li>`; 
        }

        resumen.innerHTML += `<li><div class="resumenValues counter" data-target="${diasTrabajados}">0</div><div class="resumenKeys">Dias trabajados</div></li>`; 

    } catch (error) {
        
        console.log('ERROR', error.message);
    }
}

// Ejecuta dentro de fnResumen
const fnCounterUp = () => {

    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = Math.ceil(target / 500);

            if(c < target) {
                counter.innerText = c + increment;
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

// fn > se activa en fnInicial
// lista todas las barras (numero de dias trabajados) en la pestaña 'resumen' a 10%
const fnRellenarBarritas = (data, dataB, empresa) => {
    
    try {

        let letra = fnCalcularLetraDia(dataB, empresa);
        
        barritas.innerHTML = '';
        
        data[0].forEach((item, index) => {

            barritas.innerHTML += `<div class="barrita">${data[0][index]} <br> ${letra[index]}</div>`;
        });

    } catch (error) {
        console.log('ERROR', error.message);
    }
}

// fn > se activa al pulsar el btn 'resumen' o los select 'elegir empresa', 'mes' o 'año'
// inserta el numero de entregas diarias en las barras creadas en fnRellenarBarritas, y con ayuda del CSS le da un bonito movimiento 
const fnMagia = (data) => {
    
    try {

        let porcentaje = 0;
        let numMaximoEntregas = Math.max(...data[0]);
        
        data[0].forEach((item, index) => {

            // matematiqueando
            porcentaje = ((data[0][index] * 100) / numMaximoEntregas)+'%';
            
            if (index == 0) document.querySelectorAll('.barrita')[index].style.height = porcentaje;
            if (index > 0) document.querySelectorAll('.barrita')[index].style.height = porcentaje;
        })

    } catch (error) {
        console.log('ERROR', error.message);
    }
}

// fn > se activa dentro de fnRellenarBarritas
// calcula la letra de la semana (lunes = L, martes = M, etc) para que la funcion principal pueda insertarla dentro de las barritas
const fnCalcularLetraDia = (data, empresa) => {

    const semana = ['D','L','M','X','J','V','S'];
    let letras = [];

    data.mes.forEach((item, index) => {

        if (index > 1 && item.empresa == empresa) {
            let d = new Date(data.ano, data.id, data.mes[index].solapa1);
            letras.push(semana[d.getDay()]);
        }
    })

    return letras; 
}



/* Eventos */

// Al pulsar el BOTON 'Resumen' de la barra bottom mobile, acciona el evento 'fnMagiaBarritas'
// este evento inserta el numero de entregas a las barras con una transicion de movimiento
const evBtnResumen = document.querySelector('#idFooterMobile');
evBtnResumen.addEventListener('click', e => {

    if (e.target.dataset.titulo === 'Estadisticas') {

        setTimeout(() => {
            fnMagia(arrayDatos);
            fnCounterUp();
        }, 500);
    }
});


const evBtnElegirEmpresa = document.querySelector('#empresa');
evBtnElegirEmpresa.addEventListener('click', () => { fnSetTimeOutMagic(); });

const evBtnElegirMes = document.querySelector('#mes');
evBtnElegirMes.addEventListener('click', () => { fnSetTimeOutMagic(); });

const evBtnElegirAno = document.querySelector('#ano');
evBtnElegirAno.addEventListener('click', () => { fnSetTimeOutMagic(); });

// fn > se activa dentro de los eventos 'elegir empresa', 'elegir mes' o 'elegir año'
const fnSetTimeOutMagic = () => {
    
    setTimeout(() => {
        fnMagia(arrayDatos);
        fnCounterUp();
    }, 500);
}


export {fnGetDatos}
