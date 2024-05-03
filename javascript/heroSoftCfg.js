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

});

// document.addEventListener('DOMContentLoaded', (event) => {
//     let focusableElements = Array.from(document.querySelectorAll('.hsMenu, .menuSection1, .menuSection2, .menuSection3, .optionsSystem'));
//     let currentFocusIndex = 0;

//     // Variables relacionadas con los modales de archivo de texto
//     var modalTXT = document.getElementById("myModal");
//     var modalTitleTXT = document.querySelector(".modal-titleTXT");
//     var closeButtonTXT = document.querySelector(".close");

//     // Variables relacionadas con los modales de carpeta
//     var modalCarpet = document.getElementById("myModalCarpet");
//     var modalTitleCarpet = document.querySelector(".modal-titleCarpet");
//     var closeButtonCarpet = document.querySelector(".closeCarpet");

//     focusableElements[currentFocusIndex].focus();
//     focusableElements[currentFocusIndex].classList.add('focused');

//     focusableElements.forEach((element, index) => {
//         element.addEventListener('click', () => {
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = index;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         });

//         element.addEventListener('dblclick', () => {
//             modalTitleTXT.textContent = element.textContent;
//             modalTitleCarpet.textContent = element.textContent;
//             modalTXT.style.display = "none";
//             modalCarpet.style.display = "none";
//         });

//         element.addEventListener('keydown', (event) => {
//             console.log('Tecla presionada:', event.key);
//             console.log('Elemento enfocado:', element);
//             if (event.key === 'Enter' || event.key === ' ') {
//                 modalTitleTXT.textContent = element.textContent;
//                 modalTitleCarpet.textContent = element.textContent;
//                 modalTXT.style.display = "none";
//                 modalCarpet.style.display = "none";
//             }
//         });
//     });

//     closeButtonTXT.onclick = function() {
//         modalTXT.style.display = "none";
//     }

//     closeButtonCarpet.onclick = function() {
//         modalCarpet.style.display = "none";
//     }

//     var modalContentTXT = document.querySelector('.modal-contentTXT');
//     var modalContentCarpet = document.querySelector('.modal-contentCarpet');
//     var modalTitleBarTXT = document.querySelector('.modal-title-barTXT');
//     var modalTitleBarCarpet = document.querySelector('.modal-title-barCarpet');
//     var isDragging = false;
//     var dragOffset = {x: 0, y: 0};

//     modalTitleBarTXT.addEventListener('mousedown', function(e) {
//         isDragging = true;
//         dragOffset.x = e.clientX - modalContentTXT.offsetLeft;
//         dragOffset.y = e.clientY - modalContentTXT.offsetTop;
//     });

//     modalTitleBarCarpet.addEventListener('mousedown', function(e) {
//         isDragging = true;
//         dragOffset.x = e.clientX - modalContentCarpet.offsetLeft;
//         dragOffset.y = e.clientY - modalContentCarpet.offsetTop;
//     });

//     window.addEventListener('mousemove', function(e) {
//         if (isDragging) {
//             modalContentTXT.style.left = (e.clientX - dragOffset.x) + 'px';
//             modalContentTXT.style.top = (e.clientY - dragOffset.y) + 'px';
//             modalContentCarpet.style.left = (e.clientX - dragOffset.x) + 'px';
//             modalContentCarpet.style.top = (e.clientY - dragOffset.y) + 'px';
//         }
//     });

//     window.addEventListener('mouseup', function() {
//         isDragging = false;
//     });

// // Establecer el ancho y la altura máximos
// var minWidth = '700px';
// var minHeight = '375px';
// // Aplicar estilos de ancho y altura máximos
// modalContentTXT.style.minWidth = minWidth;
// modalContentTXT.style.minHeight = minHeight;
// modalContentCarpet.style.minWidth = minWidth;
// modalContentCarpet.style.minHeight = minHeight;

// const desktopContainer = document.querySelector('.tableCfg tbody');
//     const itemsPerColumn = 12; // Número de elementos por columna

//     function createElements(container, data) {
//         let rowIndex = 0;
//         let columnIndex = 0;

//         for (let key in data) {
//             const item = data[key];
//             const newElement = document.createElement('tr');
//             newElement.classList.add('pointer', 'optionsSystem');
//             newElement.textContent = item.name || key;
//             newElement.setAttribute('data-item-id', key);

//             let currentRow;
//             if (container.children.length > rowIndex) {
//                 currentRow = container.children[rowIndex];
//             } else {
//                 currentRow = document.createElement('tr');
//                 container.appendChild(currentRow);
//             }

//             currentRow.appendChild(newElement);

//             // Dentro de la función openFolder() y createElements()

//             newElement.addEventListener('dblclick', () => {
//                 if (item.type === 'text_file') {
//                     modalTitleTXT.textContent = item.name;
//                     fetch(item.path) // Obtener el contenido del archivo .txt
//                         .then(response => response.text())
//                         .then(text => {
//                             // Colocar el contenido en el textarea del modal
//                             document.querySelector('.modal-bodyTXT textarea').textContent = text;
//                             modalTXT.style.display = "block"; // Mostrar el modal
//                         })
//                         .catch(error => {
//                             console.error('Error al cargar el archivo:', error);
//                         });
//                 } else if (item.type === 'folder') {
//                     openFolder(item);
//                 }
//             });

//             //abrir Imagenes.
//             newElement.addEventListener('dblclick', () => {
//                 if (item.type === 'text_file') {
//                     modalTitleTXT.textContent = item.name;
//                     fetch(item.path) // Obtener el contenido del archivo .txt
//                         .then(response => response.text())
//                         .then(text => {
//                             // Colocar el contenido en el textarea del modal
//                             document.querySelector('.modal-bodyTXT textarea').textContent = text;
//                             modalTXT.style.display = "block"; // Mostrar el modal
//                         })
//                         .catch(error => {
//                             console.error('Error al cargar el archivo:', error);
//                         });
//                 } else if (item.type === 'folder') {
//                     openFolder(item);
//                 }
//             });

//             newElement.addEventListener('keydown', (event) => {
//                 if (event.key === 'Enter' || event.key === ' ') {
//                     if (item.type === 'text_file') {
//                         modalTitleTXT.textContent = item.name;
//                         modalTXT.style.display = "block";
//                     } else if (item.type === 'folder') {
//                         openFolder(item);
//                     }
//                 }
//             });

//             columnIndex++;
//             if (columnIndex === itemsPerColumn) {
//                 columnIndex = 0;
//                 rowIndex++;
//             }
//         }
//     }

//     function openFolder(folder) {
//         modalTitleCarpet.textContent = folder.name;
//         modalCarpet.style.display = "block";
//         const folderContent = folder.content;
//         const modalBody = document.querySelector('.modal-bodyCarpet');
//         modalBody.innerHTML = ''; // Limpiar contenido anterior
//         for (let key in folderContent) {
//             const item = folderContent[key];
//             const newItem = document.createElement('div');
//             newItem.textContent = item.name || key;
//             newItem.classList.add('pointer', 'optionsSystem');
//             modalBody.appendChild(newItem);
    
//             // Evento para abrir archivos de texto y imágenes
//             newItem.addEventListener('dblclick', () => {
//                 if (item.type === 'text_file') {
//                     // Código para abrir archivos de texto
//                     modalTitleTXT.textContent = item.name;
//                     modalTXT.style.display = "block";
//                 } else if (item.type === 'image') {
//                     // Código para abrir imágenes
//                     modalTitleCarpet.textContent = item.name; // Establecer el nombre del archivo en el título del modal
//                     const image = document.createElement('img'); // Crear un elemento <img>
//                     image.src = item.path; // Establecer la URL de la imagen como src
//                     image.style.maxWidth = '99%'; // Establecer un ancho máximo para la imagen
//                     image.style.maxHeight = '99%'; // Establecer una altura máxima para la imagen
//                     modalBody.innerHTML = ''; // Limpiar contenido anterior
//                     modalBody.appendChild(image); // Agregar la imagen al cuerpo del modal
//                     modalCarpet.style.display = "block"; // Mostrar el modal
//                 } else if (item.type === 'folder') {
//                     openFolder(item);
//                 }
//             });
    
//             // Evento para abrir archivos de texto con tecla Enter o espacio
//             newItem.addEventListener('keydown', (event) => {
//                 if (event.key === 'Enter' || event.key === ' ') {
//                     if (item.type === 'text_file') {
//                         // Código para abrir archivos de texto
//                         modalTitleTXT.textContent = item.name;
//                         modalTXT.style.display = "block";
//                     } else if (item.type === 'folder') {
//                         openFolder(item);
//                     }
//                 }
//             });
//         }
//     }
    

//     // Cargar elementos desde el JSON
//     fetch('./system.json')
//         .then(response => response.json())
//         .then(data => {
//             let columnIndex = 0;
//             let rowIndex = 0;
//             createElements(desktopContainer, data.desktop);
//         })
//         .catch(error => console.error('Error:', error));

//     document.addEventListener('keydown', function(event) {
//         if (event.key === 'ArrowDown') {
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex + 4) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         } else if (event.key === 'ArrowLeft' || (event.key === 'Tab' && event.shiftKey)) {
//             event.preventDefault();
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
//             event.preventDefault();
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             currentFocusIndex = (currentFocusIndex + 1) % focusableElements.length;
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         } else if (event.key === 'ArrowUp') {
//             event.preventDefault();
//             focusableElements[currentFocusIndex].classList.remove('focused');
//             if (focusableElements[currentFocusIndex].classList.contains('nope')) {
//                 currentFocusIndex = focusableElements.findIndex(el => el.classList.contains('Start'));
//             } else if (focusableElements[currentFocusIndex].classList.contains('Start')) {
//                 currentFocusIndex = focusableElements.findIndex(el => el.classList.contains('MENU'));
//             } else if (focusableElements[currentFocusIndex].classList.contains('optionsSystem')) {
//                 currentFocusIndex = (currentFocusIndex - 4 + focusableElements.length) % focusableElements.length;
//             } else {
//                 currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
//             }
//             focusableElements[currentFocusIndex].focus();
//             focusableElements[currentFocusIndex].classList.add('focused');
//         }
//     });
// });













// s

// 1 "About Me.txt"        13        25       37                                                
// 2 "Personal Resume.txt" 14        26       38
// 3 "Portfolio"           15        27       39
// 4 "Certificates"        16        28       40
// 5 "explorer.exe"        17        29       41
// 6                       18        30       42
// 7                       19        31       43
// 8                       20        32       44
// 9                       21        33       45
// 10                      22        34       46
// 11                      23        35       47
// 12                      24        36       48

// s
