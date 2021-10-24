/* const objeto = punteros
{
    solapa1 = document.querySelector('#solapa1'),
    solapa2 = document.querySelector('#solapa2'),
    solapa3 = document.querySelector('#solapa3'),
    solapa4 = document.querySelector('#solapa4'),
    solapa5 = document.querySelector('#solapa5'),
    solapa6 = document.querySelector('#solapa6'),
    solapa7 = document.querySelector('#solapa7')
} */




/* *******************
    ASIGNAMIENTOS
******************** */

// Solapas principales
const solapa1 = document.querySelector('#solapa1');
const solapa2 = document.querySelector('#solapa2');
const solapa3 = document.querySelector('#solapa3');
const solapa4 = document.querySelector('#solapa4');
const solapa5 = document.querySelector('#solapa5');
const solapa6 = document.querySelector('#solapa6');
const solapa7 = document.querySelector('#solapa7');
// Totales
const solapa8 = document.querySelector('#solapa8');
const solapa9 = document.querySelector('#solapa9');
const solapa10 = document.querySelector('#solapa10');
const solapa11 = document.querySelector('#solapa11');
const solapa12 = document.querySelector('#solapa12');
const solapa13 = document.querySelector('#solapa13');
// insert html modal
let expModalHTML        = document.querySelector('#expModalHTML');
let obsModalHTML        = document.querySelector('#obsModalHTML');


/* **************
    FUNCIONES
*************** */

// OK > inserta en el HTML el contenido del fetch
const insertHtmlSolapas = index => arrayContenedorSolapas[index].map(item => `<li>${item}</li>`);

// OK > filtra los string y deja el array solo con numeros, para que se pueda sumar con 'sumatoria()'
const filterSolapas = arrayParaFiltrar => arrayParaFiltrar.filter(item => typeof item === 'number');

// OK > suma el array q entra por parametro
const sumatoria = arrayASumar => { let suma = arrayASumar.reduce((acc, el) => acc + el, 0); return suma; }









/* ***********
    ARRAYS
************* */
const arrayInsertHtmlSolapas = [solapa1, solapa2, solapa3, solapa4, solapa5, solapa6, solapa7, solapa8, solapa9, solapa10, solapa11, solapa12, solapa13];
const arrayContenedorSolapas = [[],[],[],[],[],[]];
/* console.log(arrayContenedorSolapas); */



let solapaFiltrada = [];
let resultadoSumaSolapaFiltrada;


// OK > llamada desde eventos al pulsar un 'select'
const llamadaAPI = (url, empresa) => {

    return new Promise((resolve, reject) => {

        fetch(url).then(r => r.json()).then(datos => {

                datos.mes.forEach(element => {

                    if (empresa == element.empresa) {                 

                        resolve(

                            arrayContenedorSolapas[0].push(element.solapa1),
                            arrayContenedorSolapas[1].push(element.solapa2),
                            arrayContenedorSolapas[2].push(element.solapa3),
                            arrayContenedorSolapas[3].push(element.solapa4),
                            arrayContenedorSolapas[4].push(element.solapa5),
                            arrayContenedorSolapas[5].push(element.solapa6),

                            solapaFiltrada.push(filterSolapas(arrayContenedorSolapas[0])),
                            solapaFiltrada.push(filterSolapas(arrayContenedorSolapas[1])),
                            solapaFiltrada.push(filterSolapas(arrayContenedorSolapas[2])),
                            solapaFiltrada.push(filterSolapas(arrayContenedorSolapas[3])),
                            solapaFiltrada.push(filterSolapas(arrayContenedorSolapas[4])),
                            solapaFiltrada.push(filterSolapas(arrayContenedorSolapas[5])),

                            arrayInsertHtmlSolapas[0].innerHTML = `${insertHtmlSolapas(0).join('')}`,
                            arrayInsertHtmlSolapas[1].innerHTML = `${insertHtmlSolapas(1).join('')}`,
                            arrayInsertHtmlSolapas[2].innerHTML = `${insertHtmlSolapas(2).join('')}`,
                            arrayInsertHtmlSolapas[3].innerHTML = `${insertHtmlSolapas(3).join('')}`,
                            arrayInsertHtmlSolapas[4].innerHTML = `${insertHtmlSolapas(4).join('')}`,
                            arrayInsertHtmlSolapas[5].innerHTML = `${insertHtmlSolapas(5).join('')}`,

                            arrayInsertHtmlSolapas[7].innerHTML = `${arrayContenedorSolapas.length}`
                        )

                        reject('Error al cargar el Fetch')
                    } 
                })
            })
    })
}




// -----------------------------------
/* console.log('1. Empezando');

const dedo = [1,2,3,5,6,7,8,9];

const promesa = new Promise((resolve, reject) => {
    console.log('2. Ejecutando');

    let x = sumatoria(dedo);
    resolve(x);
});

promesa.then(res => {
    console.log('3. Finalizado', res);
}) */


/* solapaFiltrada = filterSolapas(arrayContenedorSolapas[1]) */
/* resultadoSumaSolapaFiltrada = sumatoria(solapaFiltrada) */

/* console.log(resultadoSumaSolapaFiltrada); */


// OK > suma el array q entra por parametro
/* const sumatoria = arrayASumar => { let suma = arrayASumar.reduce((acc, el) => acc + el, 0); return suma; } */

// OK > filtra los string y deja el array solo con numeros, para que se pueda sumar con 'sumatoria()'
/* const filterSolapas = arrayParaFiltrar => arrayParaFiltrar.filter(item => typeof item === 'number'); */

/* 
const arrayA    = ["hola",2,5,7,9,8];
const arrayB    = [0,5,3,6,"caracola",3];

const arrayContenedorSolapas = [[],[],[],[],[],[]];
arrayContenedorSolapas.push(arrayA)
arrayContenedorSolapas.push(arrayB);


let solapaFiltrada;
let resultadoSumaSolapaFiltrada;

solapaFiltrada = filterSolapas(arrayContenedorSolapas[0])
resultadoSumaSolapaFiltrada = sumatoria(solapaFiltrada)

console.log(resultadoSumaSolapaFiltrada); */



// OK > inserta dentro de solapas la info para ver en modal
const observaciones = (element) => {
    
    if (element.solapa7[0].obs === "") {
        solapa7.innerHTML += `<li> - </li>`;
    } else {
        solapa7.innerHTML += `<li> <i data-modal="abrir" data-modalSide="modal-bottom" class="far fa-question-circle"></i> </li>`;
        
        element.solapa7.forEach(item => {

            obsModalHTML.innerHTML += `<li> <strong>Exp.: </strong> ${item.exp} - ${item.obs}<br> </li>`;
        });
    }
}


export {llamadaAPI}