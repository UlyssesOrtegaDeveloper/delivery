let insertarHTML        = document.querySelector('#insertarHTML');

let fechaHTML           = document.querySelector('#fecha');
let entregasHTML        = document.querySelector('#entregas');
let recogidasHTML       = document.querySelector('#recogidas');
let kilosHTML           = document.querySelector('#kilos');
let especialesHTML      = document.querySelector('#especiales');
let extrasHTML          = document.querySelector('#extras');
let observacionesHTML   = document.querySelector('#observaciones');

let contador = 0;

fetch('../assets/json/db.json')
    .then(r => r.json())
    .then(data => {

        data.forEach(element => {

            element.observaciones.forEach(datos => {
                
                if (contador == 0) {

                    fechaHTML.innerHTML         += `<li>${element.fecha}</li>`;
                    entregasHTML.innerHTML      += `<li>${element.entregas}</li>`;
                    recogidasHTML.innerHTML     += `<li>${element.recogidas}</li>`;
                    kilosHTML.innerHTML         += `<li>${element.kilos}</li>`;
                    especialesHTML.innerHTML    += `<li>${element.especiales}</li>`;
                    extrasHTML.innerHTML        += `<li>${element.extras}</li>`;

                    if (datos.exp.length > 1) {
                        /* observacionesHTML.innerHTML += `<li>${datos.exp} ${datos.obs}</li>`; */
                        observacionesHTML.innerHTML += `<li> <i class="far fa-check-square"></i> </li>`;
                    } else {
                        observacionesHTML.innerHTML += `<li> - </li>`;
                    }
                    
                    contador++;

                } 
            })
            
            contador = 0;
        });
    })