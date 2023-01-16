/* ABRIR MODAL */
let modalPulsado = '';

const btnAbrirModal = document.querySelector('.mixin-NAV-Top-Mobile');

btnAbrirModal.addEventListener('click', (e) => {
    
    if (e.target.dataset.modal === 'abrir') {
        
        modalPulsado = e.target.dataset.modalside;
        
        document.querySelector('.modal').style.visibility = 'visible';
        document.querySelector('.fondo-oscuro-modal').classList.add('fondo-oscuro-modal-activo');
        document.querySelector(`.${e.target.dataset.modalside}`).classList.add(`modal-activo`);
    }
});

/* CERRAR MODAL */
const btnCerrarModal = document.querySelector('.modal');

btnCerrarModal.addEventListener('click', (e) => {

    if (e.target.dataset.modal === 'cerrar' || e.target.classList[1] === 'fondo-oscuro-modal-activo') {

        document.querySelector('.fondo-oscuro-modal').classList.remove('fondo-oscuro-modal-activo');
        btnCerrarModal.style.visibility = 'hidden';
        document.querySelector(`.${modalPulsado}`).classList.remove('modal-activo');
    }
});


/* ABRIR MODAL OBSERVACIONES EN DELIVERY*/
/* const btnAbrirModalObs = document.querySelector('#solapa6');

btnAbrirModalObs.addEventListener('click', (e) => {

    if (e.target.dataset.modal === 'abrir') {
        
        modalPulsado = e.target.dataset.modalside;
        
        document.querySelector('.modal').style.visibility = 'visible';
        document.querySelector('.fondo-oscuro-modal').classList.add('fondo-oscuro-modal-activo');
        document.querySelector(`.${e.target.dataset.modalside}`).classList.add(`modal-activo`);
    }
}); */