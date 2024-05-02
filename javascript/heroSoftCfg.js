document.addEventListener('DOMContentLoaded', (event) => {
    let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
    let currentFocusIndex = 0;

    var modalTXT = document.getElementById("myModal");
    var modalCarpet = document.getElementById("myModalCarpet");
    var modalTitleTXT = document.querySelector(".modal-titleTXT");
    var modalTitleCarpet = document.querySelector(".modal-titleCarpet");
    var closeButtonTXT = document.querySelector(".close");
    var closeButtonCarpet = document.querySelector(".closeCarpet");

    focusableElements[currentFocusIndex].focus();
    focusableElements[currentFocusIndex].classList.add('focused');

    focusableElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            focusableElements[currentFocusIndex].classList.remove('focused');
            currentFocusIndex = index;
            focusableElements[currentFocusIndex].focus();
            focusableElements[currentFocusIndex].classList.add('focused');
        });

        element.addEventListener('dblclick', () => {
            modalTitleTXT.textContent = element.textContent;
            modalTitleCarpet.textContent = element.textContent;
            modalTXT.style.display = "none";
            modalCarpet.style.display = "none";
        });

        element.addEventListener('keydown', (event) => {
            console.log('Tecla presionada:', event.key);
            console.log('Elemento enfocado:', element);
            if (event.key === 'Enter' || event.key === ' ') {
                modalTitleTXT.textContent = element.textContent;
                modalTitleCarpet.textContent = element.textContent;
                modalTXT.style.display = "none";
                modalCarpet.style.display = "none";
            }
        });
    });

    // Obtener los elementos modal-contentTXT y modal-contentCarpet
var modalContentTXT = document.querySelector('.modal-contentTXT');
var modalContentCarpet = document.querySelector('.modal-contentCarpet');

// Establecer el ancho y la altura máximos
var minWidth = '522px';
var minHeight = '374px';

// Aplicar estilos de ancho y altura máximos
modalContentTXT.style.minWidth = minWidth;
modalContentTXT.style.minHeight = minHeight;

modalContentCarpet.style.minWidth = minWidth;
modalContentCarpet.style.minHeight = minHeight;

    closeButtonTXT.onclick = function() {
        modalTXT.style.display = "none";
    }

    closeButtonCarpet.onclick = function() {
        modalCarpet.style.display = "none";
    }

    var modalContentTXT = document.querySelector('.modal-contentTXT');
    var modalContentCarpet = document.querySelector('.modal-contentCarpet');
    var modalTitleBarTXT = document.querySelector('.modal-title-barTXT');
    var modalTitleBarCarpet = document.querySelector('.modal-title-barCarpet');
    var isDragging = false;
    var dragOffset = {x: 0, y: 0};

    modalTitleBarTXT.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragOffset.x = e.clientX - modalContentTXT.offsetLeft;
        dragOffset.y = e.clientY - modalContentTXT.offsetTop;
    });

    modalTitleBarCarpet.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragOffset.x = e.clientX - modalContentCarpet.offsetLeft;
        dragOffset.y = e.clientY - modalContentCarpet.offsetTop;
    });

    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            modalContentTXT.style.left = (e.clientX - dragOffset.x) + 'px';
            modalContentTXT.style.top = (e.clientY - dragOffset.y) + 'px';
            modalContentCarpet.style.left = (e.clientX - dragOffset.x) + 'px';
            modalContentCarpet.style.top = (e.clientY - dragOffset.y) + 'px';
        }
    });

    window.addEventListener('mouseup', function() {
        isDragging = false;
    });


    fetch('./system.json')
    .then(response => response.json())
    .then(data => {
        for (let item in data.desktop) {
            let element = document.getElementById(data.desktop[item].id);
            if (element) {
                element.addEventListener('dblclick', () => {
                    if (data.desktop[item].type === 'text_file') {
                        const url = data.desktop[item].content;
                        fetch(url)
                            .then(response => response.text())
                            .then(contents => {
                                document.querySelector('.modal-bodyTXT textarea').textContent = contents;
                                document.querySelector('.modal-titleTXT').textContent = item;
                                modalTXT.style.display = 'block';
                            })
                            .catch(() => console.log('No se pudo cargar el archivo de texto'));
                    } else if (data.desktop[item].type === 'folder') {
                        const folderContent = document.createDocumentFragment();
                        for (let subitem in data.desktop[item].content) {
                            const p = document.createElement('p');
                            // Usar el nombre del subitem en lugar del nombre del item
                            // p.textContent = data.desktop[item].content[subitem].name || subitem;
                            p.textContent = data.desktop[item].content[subitem].name;
                            p.classList.add('folder-content'); // Agregar una clase específica
                            folderContent.appendChild(p);
                        }
                        document.querySelector('.modal-bodyCarpet').innerHTML = '';
                        document.querySelector('.modal-bodyCarpet').appendChild(folderContent);
                        document.querySelector('.modal-titleCarpet').textContent = data.desktop[item].name || item;
                        modalCarpet.style.display = 'block';
                    }
                });
            }
        }
    })
    .catch(error => console.error('Error:', error));


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = (currentFocusIndex + 4) % focusableElements.length;
        focusableElements[currentFocusIndex].focus();
        focusableElements[currentFocusIndex].classList.add('focused');
    } else if (event.key === 'ArrowLeft' || (event.key === 'Tab' && event.shiftKey)) {
        event.preventDefault();
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
        focusableElements[currentFocusIndex].focus();
        focusableElements[currentFocusIndex].classList.add('focused');
    } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
        event.preventDefault();
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = (currentFocusIndex + 1) % focusableElements.length;
        focusableElements[currentFocusIndex].focus();
        focusableElements[currentFocusIndex].classList.add('focused');
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
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
