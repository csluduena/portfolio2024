document.addEventListener('DOMContentLoaded', () => {
    let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
    let currentFocusIndex = 0;

    focusableElements[currentFocusIndex].focus();
    focusableElements[currentFocusIndex].classList.add('focused');

    const desktopContainer = document.querySelector('.tableCfg tbody');
    const itemsPerColumn = 12; // Número de elementos por columna

    function createElements(container, data) {
        let rowIndex = 0;
        let columnIndex = 0;

        for (let key in data) {
            const item = data[key];
            const newElement = document.createElement('tr');
            newElement.classList.add('pointer', 'optionsSystem');
            newElement.textContent = item.name || key;
            newElement.setAttribute('data-item-id', key);

            let currentRow;
            if (container.children.length > rowIndex) {
                currentRow = container.children[rowIndex];
            } else {
                currentRow = document.createElement('tr');
                container.appendChild(currentRow);
            }

            currentRow.appendChild(newElement);

            newElement.addEventListener('dblclick', () => {
                if (item.type === 'text_file') {
                    openModal(item);
                } else if (item.type === 'folder') {
                    openFolder(item);
                } else if (item.type === 'html' && item.path) {
                    window.open(item.path, '_blank');
                }
            });

            columnIndex++;
            if (columnIndex === itemsPerColumn) {
                columnIndex = 0;
                rowIndex++;
            }
        }
    }

    function openModal(item) {
        if (item.type === 'html' && item.path && isWebLink(item.path)) {
            // Si el tipo de archivo es HTML, y tiene un enlace web en el path, abrir en una nueva pestaña
            window.open(item.path, '_blank');
            return;
        }

        const modal = document.getElementById("myModal");
        const modalTitle = modal.querySelector(".modal-titleTXT");
        const modalBody = modal.querySelector(".modal-bodyTXT textarea");

        modalTitle.textContent = item.name;
        fetch(item.path)
            .then(response => response.text())
            .then(text => {
                modalBody.textContent = text;
                modal.style.display = "block";
            })
            .catch(error => {
                console.error('Error al cargar el archivo:', error);
            });
    }

    function openFolder(folder) {
        const modal = document.getElementById("myModalCarpet");
        const modalTitle = modal.querySelector(".modal-titleCarpet");
        const modalBody = modal.querySelector(".modal-bodyCarpet");

        if (folder.name === "portfolio") {
            modal.style.left = "15px";
            modal.style.top = "15px";
        }

        modalTitle.textContent = folder.name;
        modalBody.innerHTML = '';

        for (let key in folder.content) {
            const item = folder.content[key];
            const newItem = document.createElement('div');
            newItem.textContent = item.name || key;
            newItem.classList.add('pointer', 'optionsSystem');
            modalBody.appendChild(newItem);

            newItem.addEventListener('dblclick', () => {
                if (item.type === 'text_file') {
                    openModal(item);
                } else if (item.type === 'image') {
                    openImage(item);
                } else if (item.type === 'folder') {
                    openFolder(item);
                } else if (item.type === 'html' && item.path) {
                    window.open(item.path, '_blank');
                }
            });
        }

        modal.style.display = "block";

        if (folder.name === "portfolio") {
            modal.classList.add("draggable");
        }
    }

    function openImage(item) {
        const modal = document.getElementById("myModalCarpet");
        const modalTitle = modal.querySelector(".modal-titleCarpet");
        const modalBody = modal.querySelector(".modal-bodyCarpet");

        modalTitle.textContent = item.name;
        modalBody.innerHTML = ''; // Limpiar contenido anterior

        const image = document.createElement('img');
        image.src = item.path;
        image.style.maxWidth = '99%';
        image.style.maxHeight = '99%';
        modalBody.appendChild(image);

        modal.style.display = "block";
    }

    function isWebLink(path) {
        // Función para verificar si una cadena es un enlace web
        const regex = /^(http|https):\/\/[^ "]+$/;
        return regex.test(path);
    }

    fetch('./system.json')
        .then(response => response.json())
        .then(data => {
            createElements(desktopContainer, data.desktop);
        })
        .catch(error => console.error('Error:', error));

    document.addEventListener('keydown', function(event) {
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

    // Close modal on close button click
    const closeButtonTXT = document.querySelector("#myModal .close");
    if (closeButtonTXT) {
        closeButtonTXT.addEventListener("click", () => {
            const modal = document.getElementById("myModal");
            modal.style.display = "none";
        });
    }

    const closeButtonCarpet = document.querySelector("#myModalCarpet .closeCarpet");
    if (closeButtonCarpet) {
        closeButtonCarpet.addEventListener("click", () => {
            const modal = document.getElementById("myModalCarpet");
            modal.style.display = "none";
        });
    }

    // Drag modal
    const modalContentTXT = document.querySelector('.modal-contentTXT');
    const modalContentCarpet = document.querySelector('.modal-contentCarpet');
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    const modalTitleBarTXT = document.querySelector('.modal-title-barTXT');
    const modalTitleBarCarpet = document.querySelector('.modal-title-barCarpet');

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

    // Establecer el ancho y la altura máximos
    var minWidth = '750px';
    var minHeight = '375px';
    // Aplicar estilos de ancho y altura máximos
    modalTitleBarTXT.style.minWidth = minWidth;
    modalTitleBarTXT.style.minWidth = minHeight;
    modalContentTXT.style.minWidth = minWidth;
    modalContentTXT.style.minHeight = minHeight;
    modalContentCarpet.style.minWidth = minWidth;
    modalContentCarpet.style.minHeight = minHeight;

    document.querySelector('.hsMenu').addEventListener('click', function() {
        var dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        var dropdownMenu = document.querySelector('.dropdown-menu');
        var hsMenuButton = document.querySelector('.hsMenu');

        // Si el clic no fue en el menú ni en el botón, cierra el menú
        if (!dropdownMenu.contains(event.target) && !hsMenuButton.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});