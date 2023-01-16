/// BASE DE DATOS
import * as fn from './funciones.js';

let response_empresas = await fetch('./json/empresas.json');
let result_empresas = await response_empresas.json();

let response = await fetch('./json/repartos.json');
let aoPaso2 = await response.json();


const aCABECERA = (empresa, mes, año) => {
    let guardar = [];
    let cabecera = [];
    
    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(x.año, x.mes, x.empresa, x.reparto);
        }
    });

    /// guardar[3] > es la zona de 'reparto' del array guardar, al que queremos sacar la info
    guardar[3].forEach(element => {
        cabecera = Object.keys(element);
    });

    return cabecera;
}

const amCONTENIDO = (empresa, mes, año) => {
    let guardar = [];
    let contenido = [];

    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(x.año, x.mes, x.empresa, x.reparto);
        }
    });

    /// guardar[3] > es la zona de 'reparto' del array guardar, al que queremos sacar la info
    guardar[3].forEach(element => {
        contenido.push(Object.values(element));
    });

    return contenido;
}

const amCABECERA_CONTENIDO = (cabecera, contenido) => {

    let amTabla = [];
    /// Creamos un ARRAY MULTIDIMENCIONAL
    cabecera.forEach((element, i) => {
        amTabla[i] = [];
        /// insertamos los elementos
        amTabla[i].push(element);

        contenido.forEach((element, j) => { 
            /// insertamos los elementos en la dimension creada
            amTabla[i].push(Object.values(contenido[j])[i]);                
        });
    });

    return amTabla;
}


export const MOSTRAR_RUTA = (empresa, mes, año) => {
    let cabecera = aCABECERA(empresa, mes, año);
    let contenido = amCONTENIDO(empresa, mes, año);
    let cabecera_contenido = amCABECERA_CONTENIDO(cabecera, contenido);

    return cabecera_contenido.forEach(element => fn.fnCrearElementosUl('idTablaReparto', element));
}

///----------------------------------------------------
///                 PESTAÑA ESTADISTICAS
///----------------------------------------------------
const amNUMERO_FILTRADOS_PARA_SUMAR = (empresa, mes, año) => {
    let cabecera = aCABECERA(empresa, mes, año);
    let contenido = amCONTENIDO(empresa, mes, año);
    let cabecera_contenido = amCABECERA_CONTENIDO(cabecera, contenido);

    let numeros = [];

    cabecera_contenido.map((element, i) => {

        let [,...restoArray] = cabecera_contenido[i];
        /// al filtrar en el 'paso1' los arrays [0] y [1] se quedan vacios, pero ocupan lugar
        /// al poner la condicion '>0' los eliminamos y creamos un array solo con enteros en todas sus iteraciones
        if (i > 0) {
            /// añadimos los enteros filtrados
            numeros.push(restoArray);
        }
    });

    return numeros;
}



const aSUMAR = (numeros_filtrados) => {

    /// DECLARACION DE ARRAY y Variable 
    let aSuma = [];
    let sumas;
    let sumar_extras = 0;

    /// OK · Enero 23 > REDUCE para rellenar con las SUMAS el array 'aSumas'
    numeros_filtrados.forEach((element, i) => {
  
        /// Bucle REDUCE para SUMAR
        element.forEach((element2, j) => {
            
            if (typeof element2 ==  "object") {
                sumar_extras += element2.length;
            }
                
            sumas = element.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);
        });

        /// Usamos el Metodo PUSH para introduciar en amSumas las SUMAS del REDUCE
        aSuma.push(sumas);
    });
    
    /// PARA EVITAR ERROR EN 'EXTRAS' se hace un IF para saber cuantos extras hay y los agregamos aqui para tener el resultado correcto
    aSuma[aSuma.length-1] = sumar_extras;

    return aSuma;
}


const fnMediaDiaria = (empresa, mes, año) => {

    let numeros_filtrados = amNUMERO_FILTRADOS_PARA_SUMAR(empresa, mes, año);
    let aSuma = aSUMAR(numeros_filtrados);
    let cabecera = aCABECERA(empresa, mes, año);
    let diasTrabajados = cabecera.length;

    /// suma especial
    if(empresa == 'Rhenus') {
        /// DESTRUCTURACION para no sumar todas sino 'entregas','recogidas','especiales'y'extras' > se deja fuera 'kilos' y 'supermercados'
        let [a, b, cNO, c, dNO, d] = aSuma;
        let todoSumado = [a,b,c,d].reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);

        return (todoSumado/diasTrabajados).toFixed(0);

    } else {
        /// reutilizamos aSumas
        let todoSumado = aSuma.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);

        return (todoSumado/diasTrabajados).toFixed(0);
    }
}




/// muestra todo lo repartido cada dia, sin cabecera ni dias
/// usado para 'parametro' en barritas
const fn_amREPARTO_DIARIO = (empresa, mes, año) => {

    let contenido = amCONTENIDO(empresa, mes, año);
    let guardar = [];

    contenido.forEach((element, i) => {

        guardar[i] = [];
        
        element.forEach((element2, j) => {

            if (0 !== j) {
                if (typeof element2 ==  "object") { /// para poder saber el numero de extras que hay
                    guardar[i].push(element2.length);
                } else {
                    guardar[i].push(element2);
                }
            }           
        })
    });
    
    return guardar;
}


const fn_aSUMAR_REPARTO_DIARIO = (empresa, arrayMulti) => {

    let sumar = [];

    arrayMulti.forEach((element, i) => {
        
        if(empresa == 'Rhenus') {
            /// DESTRUCTURACION para no sumar todas sino 'entregas','recogidas','especiales'y'extras' > se deja fuera 'kilos' y 'supermercados'
            let [a, b, cNO, c, dNO, d] = element;
            sumar[i] = [a,b,c,d].reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);
        } else {
            sumar[i] = element.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);
        }
    }); 

    return sumar;
}






const fn_aLETRA_BARRITA = (contenido, mes, año) => {
    
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const semana = ['D','L','M','X','J','V','S'];
    
    let num_mes = 0;
    let letras = [];
    
    meses.forEach((element, i) => {
        if (mes == element) {
            num_mes = i;
        }
    });

    contenido.forEach((element, i) => {

        element.forEach((element2, j) => {

            if(j == 0) {
                let d = new Date(año, num_mes, element2);
                letras.push(semana[d.getDay()]);
            }
        })
    })
    
    return letras;
}


const fn_aPORCENTAJE = (suma_barritas) => {

    let porcentaje = [];
    let numMaximoEntregas = Math.max(...suma_barritas);
    
    suma_barritas.forEach((item, index) => {

        porcentaje.push((suma_barritas[index] * 100) / numMaximoEntregas);
    });

    document.querySelector('#idInfoDiaMaximoReparto').innerHTML = `Dia de mayor reparto: ${numMaximoEntregas} entregas`;

    return porcentaje;
}


export const MOSTRAR_ESTADISTICAS = (empresa, mes, año) => {

    let cabecera = aCABECERA(empresa, mes, año);
    let numeros_filtrados = amNUMERO_FILTRADOS_PARA_SUMAR(empresa, mes, año);
    let diasTrabajados = cabecera.length;
    let textoEstadisticas = ['Media diaria', 'Dias Trabajados']
    let aMediaDiasTrabajados = [fnMediaDiaria(empresa, mes, año), diasTrabajados];
    let contenido = amCONTENIDO(empresa, mes, año);
    let aSumaBarritas = fn_aSUMAR_REPARTO_DIARIO(empresa, fn_amREPARTO_DIARIO(empresa, mes, año));

    /// LETRAS BARRITAS
    let letras = fn_aLETRA_BARRITA(contenido, mes, año);
    /// PORCENTAJE BARRITAS
    let porcentaje = fn_aPORCENTAJE(aSumaBarritas);


    /// DESTRUCTURACION PARA PASAR LO QUE QUIERO
    let [, ...restoArray] = cabecera;
    fn.fnCrearElementosLi('idEstadisticasReparto', aSUMAR(numeros_filtrados), restoArray);
    /// Media y dias Trabajados
    fn.fnCrearElementosLi('idEstadisticasMedia', aMediaDiasTrabajados, textoEstadisticas);
    /// Barritas
    fn.fnCrearListaElementosDiv('idContenedor-barritas', aSumaBarritas, porcentaje);
    fn.fnCrearListaElementosDiv2('idContenedor-letras', letras);
}


///----------------------------------------------------
///                 PESTAÑA RESUMEN
///----------------------------------------------------



const fn_CALCULO = (empresa, mes, año) => {

    let guardar = [];
    let precios = [];
    let cabeceras = [];
    let sumas = [];
    let resultadoMultiplicacion = [];
    let amConjunto = [];

    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(x.precios);
        }
    });

    let numeros_filtrados = amNUMERO_FILTRADOS_PARA_SUMAR(empresa, mes, año);
    sumas = aSUMAR(numeros_filtrados);

    guardar.forEach(element => {
        precios = Object.values(element);
        cabeceras = Object.keys(element);
    });

    precios.forEach((element, i) => {
        resultadoMultiplicacion.push(parseFloat((element * sumas[i]).toFixed(2)));
    });

    cabeceras.forEach((cab, i) => {
        amConjunto.push([sumas[i]+' '+cab, precios[i], resultadoMultiplicacion[i]]);
    })

    /// HTML > Tabla resumen
    amConjunto.forEach(element => fn.fnCrearListaElementosTabla('idCalculo-resumen', element));

    /// ---------------------------------------------------------------
    /// ---------------------------------------------------------------
    /// ---------------------------------------------------------------
    /// ---------------------------------------------------------------
    /// ---------------------------------------------------------------



    const TOTAL = resultadoMultiplicacion.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);

    
    const BASE_EN = TOTAL.toFixed(2);
    const IGIC_EN = (TOTAL * (3 / 100)).toFixed(2);
    const IRPF_EN = (TOTAL * (1 / 100)).toFixed(2);

    const aBASE_IGIC_IRPF = [['BASE: '+ BASE_EN+'€'], ['IGIC 3%: '+ IGIC_EN+'€'], ['IRPF 1%: '+ IRPF_EN+'€'], ['TOTAL: '+ TOTAL+'€']];
    

    const SUMA_EN = ((parseFloat(BASE_EN) + parseFloat(IGIC_EN)) - parseFloat(IRPF_EN)).toFixed(2);

    
    /// HTML > Tabla Impuestos y Total
    aBASE_IGIC_IRPF.forEach(element => fn.fnCrearElementosLi2('idCalculo-total', element));

}


const fn_aTOTAL_E_IMPUESTOS = () => {

    /// Para poder sumar en FLOAT tengo que ponerlo en formato EN para por lo que creo las siguieste variables para poder hacer la suma a parte
    const BASE_EN = sumaTotalResumen.toFixed(2);
    const IGIC_EN = (sumaTotalResumen * (3 / 100)).toFixed(2);
    const IRPF_EN = (sumaTotalResumen * (1 / 100)).toFixed(2);

    const SUMA_EN = ((parseFloat(BASE_EN) + parseFloat(IGIC_EN)) - parseFloat(IRPF_EN)).toFixed(2);

    console.log('SUMA_EN', SUMA_EN);
}



export const MOSTRAR_RESUMEN = (empresa, mes, año) => {

    fn_CALCULO(empresa, mes, año);
}



///----------------------------------------------------
///                 PESTAÑA FACTURA
///----------------------------------------------------

const fn_aFACTURA_FECHA_FACTURA_FECHA_VENCIMIENTO_NUMERO_FACTURA = (empresa, mes, año) => {
    let guardar = [];
    
    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(x.numero_factura, x.fecha_factura, x.fecha_vencimiento);
        }
    });

    document.querySelector('#idNumFactura').innerHTML = guardar[0];
    document.querySelector('#idFechaFactura').innerHTML = guardar[1];
    document.querySelector('#idFechaVecimiento').innerHTML = guardar[2];
}


const fn_aFACTURA_DATOS_FISCALES = (empresa) => {
    let guardar = [];
    let datos_fiscales = [];
    
    result_empresas.forEach(x => {
        if (x.empresa == empresa) {
            guardar = x.datos_fiscales;
        }
    });

    [guardar].forEach(element => {
        datos_fiscales.push(...(Object.values(element)));
    });

    document.querySelector('#idNombreEmpresa').innerHTML = datos_fiscales[0];
    document.querySelector('#idCifEmpresa').innerHTML = datos_fiscales[1];
    document.querySelector('#idDireccionEmpresa').innerHTML = datos_fiscales[2];
    document.querySelector('#idCpEmpresa').innerHTML = datos_fiscales[3];
}

const fn_amFACTURA_LISTA_REPARTO = (empresa, mes, año) => {
    let cabecera = aCABECERA(empresa, mes, año);
    let contenido = amCONTENIDO(empresa, mes, año);
    let cabecera_contenido = amCABECERA_CONTENIDO(cabecera, contenido);

    return cabecera_contenido.forEach(element => fn.fnCrearElementosUl('idContainerTablaRuta', element));
}


const fn_aFACTURA_OBSERVACIONES = (empresa, mes, año) => {
    let guardar = [];
    let extras = [];
    
    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(...x.reparto);
        }
    });
    
    guardar.forEach(element => {

        if (!!element.extras) {
            
            element.extras.forEach(x => {

                extras.push(Object.values(x)[0]);
            })

            document.querySelector('#idTituloObservaciones').innerHTML = 'Observaciones: Expediciones no asignadas por ser faltantes, rechazo u otros motivos';
            return fn.fnCrearElementosLi2('idObservaciones', extras);
        } else {
            return '';
        }
    });
}


const fn_aFACTURA_RESUMEN_REPARTO = (empresa, mes, año) => {
    let guardar = [];
    let precios = [];
    let cabeceras = [];
    let sumas = [];
    let resultadoMultiplicacion = [];
    let amConjunto = [];

    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(x.precios);
        }
    });

    let numeros_filtrados = amNUMERO_FILTRADOS_PARA_SUMAR(empresa, mes, año);
    sumas = aSUMAR(numeros_filtrados);

    guardar.forEach(element => {
        precios = Object.values(element);
        cabeceras = Object.keys(element);
    });

    precios.forEach((element, i) => {
        resultadoMultiplicacion.push(parseFloat((element * sumas[i]).toFixed(2)));
    });

    cabeceras.forEach((cab, i) => {
        amConjunto.push([sumas[i]+' '+cab, precios[i]+' €', resultadoMultiplicacion[i]+' €']);
    })

    /// HTML > Tabla resumen
    return amConjunto.forEach(element => fn.fnCrearListaElementosTabla('idFactura-reparto', element));
}



const fn_aFACTURA_TOTAL_E_IMPUESTOS = (empresa, mes, año) => {
    let resultadoMultiplicacion = [];
    let sumas = [];
    let guardar = [];
    let precios = [];

    aoPaso2.forEach(x => {
        if (x.empresa == empresa && x.mes == mes && x.año == año) {
            guardar.push(x.precios);
        }
    });

    let numeros_filtrados = amNUMERO_FILTRADOS_PARA_SUMAR(empresa, mes, año);
    sumas = aSUMAR(numeros_filtrados);

    guardar.forEach(element => {
        precios = Object.values(element);
    });

    precios.forEach((element, i) => {
        resultadoMultiplicacion.push(parseFloat((element * sumas[i]).toFixed(2)));
    });
    
    const TOTAL = resultadoMultiplicacion.reduce((valorAnterior, valorAcumulado) => valorAnterior + valorAcumulado);

    const BASE_EN = TOTAL.toFixed(2);
    const IGIC_EN = (TOTAL * (3 / 100)).toFixed(2);
    const IRPF_EN = (TOTAL * (1 / 100)).toFixed(2);

    const SUMA_EN = ((parseFloat(BASE_EN) + parseFloat(IGIC_EN)) - parseFloat(IRPF_EN)).toFixed(2);
    
    const aBASE_IGIC_IRPF = [['','','BASE:',BASE_EN+'€'], ['','','IGIC 3%:',IGIC_EN+'€'], ['','','IRPF 1%:',IRPF_EN+'€'], ['','','TOTAL:',SUMA_EN+'€']];

    
    /// HTML > Tabla Impuestos y Total
    return aBASE_IGIC_IRPF.forEach(element => fn.fnCrearListaElementosTabla('idFactura-total-impuestos', element));
}


const fn_aFACTURA_TEXTO_MES_AÑO = (mes, año) => {
    
    document.querySelector('#idMes').innerHTML = mes;
    document.querySelector('#idAno').innerHTML = año;
}


/* export const MOSTRAR_FACTURA = (empresa, mes, año) => {

    fn_aFACTURA_FECHA_FACTURA_FECHA_VENCIMIENTO_NUMERO_FACTURA(empresa, mes, año);
    fn_aFACTURA_DATOS_FISCALES(empresa);
    fn_aFACTURA_TEXTO_MES_AÑO(mes, año);
    console.log('6', fn_amFACTURA_LISTA_REPARTO(empresa, mes, año));
    fn_aFACTURA_OBSERVACIONES(empresa, mes, año);
    fn_aFACTURA_RESUMEN_REPARTO(empresa, mes, año);
    fn_aFACTURA_TOTAL_E_IMPUESTOS(empresa, mes, año);
} */



// Switch toggle
const container_switch = document.querySelector('#switch');

const switch_1_ListaReparto = document.querySelector('#switch_checkbox_01');
const switch_2_Observaciones = document.querySelector('#switch_checkbox_02');

console.log('SWITCH 1', switch_1_ListaReparto.checked);
console.log('SWITCH 1', switch_2_Observaciones.checked);

if (switch_1_ListaReparto.checked) {
    document.querySelector('#idContainerTablaRuta').style.display = 'grid';
} else {
    document.querySelector('#idContainerTablaRuta').style.display = 'none';
}

if (switch_2_Observaciones.checked) {
    document.querySelector('#idTituloObservaciones').style.display = 'grid';
    document.querySelector('#idObservaciones').style.display = 'grid';
} else {
    document.querySelector('#idTituloObservaciones').style.display = 'none';
    document.querySelector('#idObservaciones').style.display = 'none';
}


export const MOSTRAR_FACTURA = (empresa, mes, año) => {

    fn_aFACTURA_FECHA_FACTURA_FECHA_VENCIMIENTO_NUMERO_FACTURA(empresa, mes, año);
    fn_aFACTURA_DATOS_FISCALES(empresa);
    fn_aFACTURA_TEXTO_MES_AÑO(mes, año);
    fn_amFACTURA_LISTA_REPARTO(empresa, mes, año);
    fn_aFACTURA_OBSERVACIONES(empresa, mes, año);
    fn_aFACTURA_RESUMEN_REPARTO(empresa, mes, año);
    fn_aFACTURA_TOTAL_E_IMPUESTOS(empresa, mes, año);

    container_switch.addEventListener('click', (e) => {
        /// LISTA_REPARTO
        if (e.target.checked && e.target.id == 'switch_checkbox_01') document.querySelector('#idContainerTablaRuta').style.display = 'grid';
        if (!e.target.checked && e.target.id == 'switch_checkbox_01') document.querySelector('#idContainerTablaRuta').style.display = 'none';
        /// OBSERVACIONES
        if (e.target.checked && e.target.id == 'switch_checkbox_02') {
            document.querySelector('#idTituloObservaciones').style.display = 'grid';
            document.querySelector('#idObservaciones').style.display = 'grid';
        }
        
        if (!e.target.checked && e.target.id == 'switch_checkbox_02') {
            document.querySelector('#idTituloObservaciones').style.display = 'none';
            document.querySelector('#idObservaciones').style.display = 'none';
        }
    });
}