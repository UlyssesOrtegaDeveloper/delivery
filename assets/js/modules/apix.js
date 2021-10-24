/* *******************
    ASIGNAMIENTOS
******************** */
const solapa1 = document.querySelector('#solapa1');
const solapa2 = document.querySelector('#solapa2');
const solapa3 = document.querySelector('#solapa3');
const solapa4 = document.querySelector('#solapa4');
const solapa5 = document.querySelector('#solapa5');
const solapa6 = document.querySelector('#solapa6');
const arrayInsertHtmlSolapas = [solapa1, solapa2, solapa3, solapa4, solapa5, solapa6];

const message = document.querySelector('#message');

const resumen = document.querySelector('#resumen');
const arrayResumen = [resumen]

const barritas = document.querySelector('#contenedor-barritas')

let arrayDatos = [[],[],[],[],[],[]];
let total = [];

let objSumas = {'entregas': 0, 'recogidas': 0, 'kilos': 0, 'especiales': 0, 'extras': 0};


// fn Inicial
const fnGetDatos = async (url, empresa) => {

    /* let objGetFetch = {}; prueba satisfactoria */ 

    try {
        message.innerHTML = 'Cargando ...';

        arrayDatos = [[],[],[],[],[],[]];
        total = [];
        
        let resultado = await fetch(url);
        let data = await resultado.json();

        fnInsertarEnSolapas(data, empresa);
        fnRellenandoParaPoderSumar(data, empresa);
        fnSumas(arrayDatos);
        fnResumen(arrayDatos);
        fnRellenarBarritas(arrayDatos, data, empresa);

        message.innerHTML = '';
    }
    
    catch (error) {
        console.log('ERROR >>', error.message);
        message.innerHTML = 'Error al cargar los datos';
    }
}

// paso 1 > mostrando en pantalla los datos
const fnInsertarEnSolapas = (data, empresa) => {

    // limpiamos anteriores registros
    for(let i = 0; i < arrayInsertHtmlSolapas.length; i++){
            
        arrayInsertHtmlSolapas[i].innerHTML = ``;
    }

    data.mes.forEach(element => {
        let f = 1;
        let claves = Object.keys(element);

        console.log('dd', element.solapa1);
        
        for(let i = 0; i < arrayInsertHtmlSolapas.length; i++){
            
            if (element.empresa == empresa) {

                if (i < 5) {
                    arrayInsertHtmlSolapas[i].innerHTML += `<li>${element[claves[f]]}</li>`;
                    
                } else {

                    if (i == 5) {
                        arrayInsertHtmlSolapas[i].innerHTML += `<li data-modal="abrir" data-modalSide="modal-bottom">${element[claves[f]]}</li>`;
                    }

                    if (element[claves[f]] > 0) {

                        console.log('DENTROOOO', element.solapa7);
                        
                        element.solapa7.forEach(item => {

                            obsModalHTML.innerHTML += `<li><strong>Dia: ${element.solapa1} <br> </strong> <strong> Exp.: </strong> ${item.exp} - ${item.obs}<br> </li>`;
                        })
                        
                    

                    }
                }
            }

            f++;
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

    let contenedorMediaCantidad = document.querySelector('#contenedor-media-cantidad');

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
        
        // hayando la media
        let media = (objSumas.entregas + objSumas.recogidas + objSumas.extras) / diasTrabajados;
        
        const precios = {"bultos": 3.94, "recogidas": 3.94, "recogidasEspeciales": 6, "kilos": 0.04, "especiales": 5, "extras": 3.94};
        
        let acumulado = (objSumas.entregas * precios.bultos) + (objSumas.recogidas * precios.recogidas) + (objSumas.kilos * precios.kilos) + (objSumas.especiales * precios.especiales) + (objSumas.extras * precios.extras);


        // media y cantidad
        contenedorMediaCantidad.innerHTML = `<div class="media">${media}<br><span class='subtexto'>media</span></div><li class="cantidad">${acumulado.toFixed(2)}€<br><span class='subtexto'>acumulado</span></li>`;
        

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
