
//? -----------------------------------------------------------------
//?                             HTML
//? -----------------------------------------------------------------
/// OK · Enero 23
///      HTML ->    <option>
export const fnCrearListaElementosOption = (idPadre, array) => {
    
    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {
        let node_option = document.createElement('option');
            
        node_option.textContent = element;
        dFrag.appendChild(node_option).value = i;
        /* dFrag.appendChild(node_option).value = element; */
    });
    
    document.getElementById(idPadre).appendChild(dFrag);
}


export const fnCrearElementosUl = (idPadre, arrayMulti) => {

    let dFrag = document.createDocumentFragment();
    let ul = document.createElement('ul');

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



export const fnCrearElementosLi = (idPadre, array, cabecera) => {

    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {
        let li = document.createElement('li');
        let node_div = document.createElement('div');
        let node_span = document.createElement('span');
            
        node_div.textContent = element;
        node_span.textContent = cabecera[i];
        dFrag.appendChild(li).appendChild(node_div).classList.add("numero");
        dFrag.appendChild(li).appendChild(node_span).classList.add("fuente");
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}



///      insert HTML > BARRAS
export const fnCrearListaElementosDiv = (idPadre, array, porcentaje) => {

    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {
        let node_div = document.createElement('div');
            
        node_div.textContent = element;
        dFrag.appendChild(node_div).classList = "barrita";
        dFrag.appendChild(node_div).style.height = `${porcentaje[i]}%`;
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}


///      insert HTML > LETRAS DIAS BARRAS
export const fnCrearListaElementosDiv2 = (idPadre, array) => {

    let dFrag = document.createDocumentFragment();
    
    array.forEach((element, i) => {
        let node_div = document.createElement('div');

        node_div.textContent = element;
        dFrag.appendChild(node_div).classList = "barritas_letra";
    });
    
    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}


export const fnCrearListaElementosTabla = (idPadre, array) => {
    
    let dFrag = document.createDocumentFragment();
    let node_tr = document.createElement('tr');
    
    array.forEach((element, i) => {
        let node_td = document.createElement('td');
            
        node_td.textContent = element;
        dFrag.appendChild(node_tr).appendChild(node_td).value = i;
    });
    
    document.getElementById(idPadre).appendChild(dFrag);
}


export const fnCrearElementosLi2 = (idPadre, arrayMulti) => {

    let dFrag = document.createDocumentFragment();
    
    arrayMulti.forEach(element => {
        let li = document.createElement('li');
        
        li.textContent = element;
        dFrag.appendChild(li);
        
    });

    // Add fragment to a list:
    document.getElementById(idPadre).appendChild(dFrag);
}

