document.addEventListener("DOMContentLoaded", function() {
    const consoleContent = document.getElementById("consoleContent");
    const inputLine = document.getElementById("inputLine");

    let commandHistory = [];
    let historyIndex = -1;

    // Estructura de carpetas
    let fileSystem = {
        'C:': {
            'juegos': {
                'mario': {},
                'zelda': {}
            },
            'imágenes': {
                'acdc': {},
                'metallica': {}
            }
        }
    };

    document.addEventListener("click", function(event) {
        // Verificar si el clic ocurrió fuera del área del inputLine
        if (event.target !== inputLine) {
            // En caso afirmativo, enfocar el inputLine
            inputLine.focus();
        }
    });

    // Directorio actual y ruta
    let currentDirectory = fileSystem['C:'];
    let currentPath = ['C:'];

    inputLine.focus();

    inputLine.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleCommand(inputLine.value.trim());
            inputLine.value = "";
            historyIndex = -1; // Reset history index
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            navigateCommandHistory("up");
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            navigateCommandHistory("down");
        }
    });

    function handleCommand(command) {
        let currentPathDisplay = currentPath.join('\\');
        if (!currentPathDisplay.endsWith('\\')) {
            currentPathDisplay += '\\';
        }
        consoleContent.innerHTML += `<div class="command-response ${getCommandClass(command)}">${currentPathDisplay}>${command}</div>`;
        commandHistory.unshift(command);
        consoleContent.scrollTop = consoleContent.scrollHeight;
        
        // Implementación de las funciones de la consola
        switch (command.toLowerCase()) {
            case "time":
                consoleContent.innerHTML += `<div class="command-response timeConfig">Current time is: ${getCurrentTime()}</div>`;
                break;
            case "help":
                consoleContent.innerHTML += 
                `Available commands\n`;
                consoleContent.innerHTML += 
                `   [time]        Displays the current time\n`;
                consoleContent.innerHTML += 
                `   [help]        Shows the list of available commands\n`;
                consoleContent.innerHTML += 
                `   [cls]         Clears the console screen\n`;
                consoleContent.innerHTML += 
                `   [start.exe]   Run HeroSoft Operative System\n`;
                break;
            case "cls":
                consoleContent.innerHTML = "";
                break;
            case "start.exe":
                startHeroSoftSystem();
                break;
            default:
                if (command !== "") {
                    consoleContent.innerHTML += `<div class="command-response unknownConfig">Command not recognized.</div>`;
                }
                break;
        }
    }
    
    function startHeroSoftSystem() {
        consoleContent.innerHTML += `<div class="command-response">Starting HeroSoft System</div>`;
        // Ocultar el elemento inputLine y inputPrefix después de enviar el comando "start.exe"
        inputLine.style.display = "none";
        inputPrefix.style.display = "none";
        setTimeout(function() {
            addDotsAndSound();
        }, 500);
    }

    function addDotsAndSound() {
        let dots = "";
        // Comenzar a agregar puntos inmediatamente
        let timer = setInterval(function() {
            dots += ".";
            consoleContent.lastElementChild.innerHTML = `Starting HeroSoft System${dots}`;
            if (dots.length === 3) {
                clearInterval(timer);
                const audio = new Audio('../data/pip.mp3');
                // Reproducir el sonido después de un segundo desde el tercer punto
                setTimeout(function() {
                    audio.play();
                    // Redirigir a la página después de que termine el sonido
                    setTimeout(function() {
                        window.location.href = "./loading.html";
                    }, 1000);
                }, 1000);
            }
        }, 1000);
    }

    function navigateCommandHistory(direction) {
        if (direction === "up") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputLine.value = commandHistory[historyIndex];
            }
        } else if (direction === "down") {
            if (historyIndex >= 0) {
                historyIndex--;
                if (historyIndex >= 0) {
                    inputLine.value = commandHistory[historyIndex];
                } else {
                    inputLine.value = "";
                }
            }
        }
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    function getCommandClass(command) {
        switch (command.toLowerCase()) {
            case "time":
                return "timeConfig";
            case "help":
                return "helpConfig";
            case "cls":
                return "clsConfig";
            case "start.exe":
                return "startConfig";
            default:
                return "unknownConfig";
        }
    }
});
