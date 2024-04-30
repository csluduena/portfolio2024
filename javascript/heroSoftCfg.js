document.addEventListener('DOMContentLoaded', (event) => {
    let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
    let currentFocusIndex = 0;

    // Enfocar el primer elemento al cargar la página
    focusableElements[currentFocusIndex].focus();
    focusableElements[currentFocusIndex].classList.add('focused');

    // Obtener la ventana modal
    var modal = document.getElementById("myModal");

    // Obtener el botón de cerrar
    var span = document.getElementsByClassName("close")[0];

    // Agregar un controlador de eventos de clic a cada elemento enfocable
    focusableElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = index;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        });

        // Agregar un controlador de eventos de doble clic a cada elemento enfocable
        element.addEventListener('dblclick', () => {
            if (element.classList.contains('folder')) {
                // Abrir la carpeta
            } else if (element.classList.contains('txt')) {
                // Abrir el archivo de texto
            } else if (element.classList.contains('jpg')) {
                // Abrir la imagen
            } else if (element.classList.contains('exe')) {
                // Ejecutar el archivo .exe
            } else if (element.classList.contains('link')) {
                // Abrir el enlace en un navegador
            }
            modal.style.display = "block";
        });

        // Agregar un controlador de eventos de clic derecho a cada elemento enfocable
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            // Mostrar la ventana de información
        });
    });

    // Cuando se hace clic en el botón de cerrar (x), cerrar la ventana modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Cuando se hace clic en cualquier lugar fuera de la ventana modal, cerrarla
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.addEventListener('keydown', function (event) {
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


//TODO VENTANAS

document.addEventListener('DOMContentLoaded', (event) => {
    let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
    let currentFocusIndex = 0;

    // Obtener la ventana modal y los elementos relacionados
    var modal = document.getElementById("myModal");
    var modalTitle = document.querySelector(".modal-titleTXT");
    var closeButton = document.querySelector(".close");

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

        // Agregar un controlador de eventos de doble clic a cada elemento enfocable
        element.addEventListener('dblclick', () => {
            // Actualizar el título de la ventana modal con el nombre del complemento abierto
            modalTitle.textContent = element.textContent;

            // Mostrar la ventana modal
            modal.style.display = "block";
        });

        element.addEventListener('keydown', (event) => {
            console.log('Tecla presionada:', event.key);
            console.log('Elemento enfocado:', element);
            if (event.key === 'Enter' || event.key === ' ') {
                // Actualizar el título de la ventana modal con el nombre del complemento seleccionado
                modalTitle.textContent = element.textContent;
        
                // Mostrar la ventana modal
                modal.style.display = "block";
            }
        });
    });

    // Cuando se hace clic en el botón de cerrar (x), cerrar la ventana modal
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    // ... Resto del código ...
});
