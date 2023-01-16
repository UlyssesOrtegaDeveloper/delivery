/* obtener todos los 'botones' del menu bottom */
const contenedor_mixin_NAV_Bottom_mobile = document.querySelector('.mixin-NAV-Bottom-mobile');
const arrayBotonNavBottom = [];

for (let index = 0; index < contenedor_mixin_NAV_Bottom_mobile.children.length; index++) {
    
    arrayBotonNavBottom[index] = document.querySelectorAll(`[data-itemNavBottomMobile='${index}']`);
}

/* obtener todos los '<section>' */
const contenedor_main = document.getElementsByTagName('main');
const arraySection = [];

for (let index = 0; index < contenedor_main[0].children.length; index++) {
    
    arraySection[index] = document.querySelector('#idSection_'+index);
}


const quitar_color = () => {
    
    arrayBotonNavBottom.forEach(element => {

        element[0].classList.remove('icono-footer-activo');
    });
} 

const quitar_activo = () => {
    
    arraySection.forEach(element => {
        
        element.classList.remove('section-activo');
    });
}

/* Click en los botones del menu bottom */
const container_footer_mobile = document.querySelector('#idFooterMobile');

container_footer_mobile.addEventListener('click', (e) => {

    let insertarHTML = document.querySelector('#idNavAppName');
    let posicion = e.target.dataset.itemnavbottommobile;
    let titulo = e.target.dataset.titulo;
    
    if(posicion) {
        
        quitar_color();
        quitar_activo();

        insertarHTML.innerHTML = titulo;
        
        arrayBotonNavBottom[posicion][0].classList.add('icono-footer-activo');
        arraySection[posicion].classList.add('section-activo');
    } 
});