document.addEventListener('DOMContentLoaded', (event) => {
    let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
    let currentFocusIndex = 0;

    // Obtener la ventana modal
    var modal = document.getElementById("myModal");

    // Obtener el botón de cerrar
    var span = document.getElementsByClassName("close")[0];

    // Función para manejar el evento de doble clic en cualquier elemento
    function handleDoubleClick(element) {
        const fileName = element.textContent;
        if (element.classList.contains('folder')) {
            // Abrir la carpeta
            console.log("Abriendo carpeta:", fileName);
        } else if (element.classList.contains('txt')) {
            // Abrir el archivo de texto
            // Construir la URL del archivo de texto
            const url = '../textfiles/' + fileName;

            // Utilizar la API Fetch para cargar el contenido del archivo de texto
            fetch(url)
                .then(response => response.text())
                .then(contents => {
                    // Limpiar el contenido anterior de la ventana modal
                    document.querySelector('.modal-bodyTXT textarea').textContent = '';

                    // Mostrar el contenido del archivo de texto en la ventana modal
                    document.querySelector('.modal-bodyTXT textarea').textContent = contents;
                    document.querySelector('.modal-title').textContent = fileName;
                    modal.style.display = 'block';
                    modal.style.width = document.documentElement.clientWidth + 'px';
                    modal.style.height = document.documentElement.clientHeight + 'px';
                })
                .catch(() => console.log('No se pudo cargar el archivo de texto'));
        } else {
            // Otros tipos de archivos
            console.log("Abrir otro tipo de archivo:", fileName);
        }
    }

    // Agregar un controlador de eventos de doble clic a cada elemento enfocable
    focusableElements.forEach((element, index) => {
        element.addEventListener('dblclick', () => {
            handleDoubleClick(element);
        });

        // Agregar un controlador de eventos de clic a cada elemento enfocable
        element.addEventListener('click', () => {
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = index;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        });

        // Agregar un controlador de eventos de clic derecho a cada elemento enfocable
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            // Mostrar la ventana de información
        });
    });

    // Cuando se hace clic en el botón de cerrar (x), cerrar la ventana modal
    span.onclick = function () {
        // Limpiar el contenido de la ventana modal al cerrarla
        document.querySelector('.modal-bodyTXT textarea').textContent = '';
        modal.style.display = "none";
    }

    // Cuando se hace clic en cualquier lugar fuera de la ventana modal, cerrarla
    window.onclick = function (event) {
        if (event.target == modal) {
            // Limpiar el contenido de la ventana modal al cerrarla
            document.querySelector('.modal-bodyTXT textarea').textContent = '';
            modal.style.display = "none";
        }
    }

    // Agregar un controlador de eventos de teclado para la navegación
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

    




