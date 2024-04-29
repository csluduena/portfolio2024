document.addEventListener('DOMContentLoaded', (event) => {
    let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
    let currentFocusIndex = 0;

    // Enfocar el primer elemento al cargar la página
    focusableElements[currentFocusIndex].focus();
    focusableElements[currentFocusIndex].classList.add('focused');

    // Agregar un controlador de eventos de clic a cada elemento enfocable
    focusableElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = index;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowDown') {
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = (currentFocusIndex + 4) % focusableElements.length;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        } else if (event.key === 'ArrowLeft' || (event.key === 'Tab' && event.shiftKey)) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla de tabulación
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
            event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla de tabulación
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = (currentFocusIndex + 1) % focusableElements.length;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        } else if (event.key === 'ArrowUp') {
            event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla de tabulación
            focusableElements[currentFocusIndex].classList.remove('focused');
            if (focusableElements[currentFocusIndex].classList.contains('nope')) {
                currentFocusIndex = focusableElements.findIndex(el => el.classList.contains('Start'));
            } else if (focusableElements[currentFocusIndex].classList.contains('Start')) {
                currentFocusIndex = focusableElements.findIndex(el => el.classList.contains('MENU'));
            } else if (focusableElements[currentFocusIndex].classList.contains('optionsSystem')) {
                currentFocusIndex = (currentFocusIndex - 4 + focusableElements.length) % focusableElements.length;
            } else {
                currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
            }
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        }
    });
});





























// document.addEventListener('DOMContentLoaded', (event) => {
//     let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
//     let currentFocusIndex = 0;

//     // Enfocar el primer elemento al cargar la página
//     focusableElements[currentFocusIndex].focus();
//     focusableElements[currentFocusIndex].classList.add('focused');

//     // Agregar un controlador de eventos de clic a cada elemento enfocable
//     focusableElements.forEach((element, index) => {
//         element.addEventListener('click', () => {
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = index;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         });
//     });

//     document.addEventListener('keydown', function(event) {
//         if (event.key === 'ArrowDown') {
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex + 4) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         } else if (event.key === 'ArrowLeft' || event.key === 'Tab') {
//             event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla de tabulación
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
//             event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla de tabulación
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex + 1) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         } else if (event.key === 'ArrowUp') {
//             event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla de tabulación
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex - 4 + focusableElements.length) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         }
//     });
// });