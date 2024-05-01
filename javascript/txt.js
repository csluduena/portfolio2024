// Agregar un controlador de eventos de doble clic a cada elemento que representa un archivo de texto
document.querySelectorAll('.optionsSystem').forEach((element) => {
    const fileName = element.textContent;
    if (fileName.endsWith('.txt')) {
        element.addEventListener('dblclick', () => {
            // Construir la URL del archivo de texto
            const url = '../textfiles/' + fileName;

            // Utilizar la API Fetch para cargar el contenido del archivo de texto
            fetch(url)
                .then(response => response.text())
                .then(contents => {
                    // Mostrar el contenido del archivo de texto en la ventana modal
                    document.querySelector('.modal-bodyTXT textarea').textContent = contents;
                    document.querySelector('.modal-title').textContent = fileName;
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'block';
                    modal.style.width = document.documentElement.clientWidth + 'px';
                    modal.style.height = document.documentElement.clientHeight + 'px';
                })
                .catch(() => console.log('No se pudo cargar el archivo de texto'));
        });
    } else {
        element.addEventListener('dblclick', () => {
            // Simular la apertura de una carpeta normalmente
            //alert("Abriendo carpeta: " + fileName);
        });
    }
});

var modalContent = document.querySelector('.modal-contentTXT');
var modalTitleBar = document.querySelector('.modal-title-barTXT');
var isDragging = false;
var dragOffset = {x: 0, y: 0};

modalTitleBar.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragOffset.x = e.clientX - modalContent.offsetLeft;
    dragOffset.y = e.clientY - modalContent.offsetTop;
});

window.addEventListener('mousemove', function(e) {
    if (isDragging) {
        modalContent.style.left = (e.clientX - dragOffset.x) + 'px';
        modalContent.style.top = (e.clientY - dragOffset.y) + 'px';
    }
});

window.addEventListener('mouseup', function() {
    isDragging = false;
});


// Selecciona el elemento textarea
let textarea = document.querySelector('textarea');

// Agrega una regla de estilo CSS para cambiar el color del scrollbar
textarea.style.scrollbarColor = '#F3544D #e1f34d'; // rojo en WebKit (Chrome, Safari) y verde en Firefox
textarea.style.scrollbarColor = 'red'; // solo rojo en WebKit
textarea.style.scrollbarColor = 'green'; // solo verde en Firefox
//textarea.style.scrollbarWidth = 'thin'; // Puedes usar 'thin', 'auto' o 'none'