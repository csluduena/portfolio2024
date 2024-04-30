// Agregar un controlador de eventos de doble clic a cada elemento que representa un archivo de texto
document.querySelectorAll('.optionsSystem').forEach((element) => {
    if (element.textContent.endsWith('.txt')) {
        element.addEventListener('dblclick', () => {
            // Construir la URL del archivo de texto
            var url = '../textfiles/' + element.textContent;

            // Utilizar la API Fetch para cargar el contenido del archivo de texto
            fetch(url)
                .then(response => response.text())
                .then(contents => {
                    // Mostrar el contenido del archivo de texto en la ventana modal
                    document.querySelector('.modal-bodyTXT textarea').textContent = contents;
                    document.querySelector('.modal-title').textContent = element.textContent;
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'block';
                    modal.style.width = document.documentElement.clientWidth + 'px';
                    modal.style.height = document.documentElement.clientHeight + 'px';
                })
                .catch(() => console.log('No se pudo cargar el archivo de texto'));
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


