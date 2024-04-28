document.addEventListener("DOMContentLoaded", function() {
    const consoleContent = document.getElementById("consoleContent");
    const inputLine = document.getElementById("inputLine");
    const cursor = document.getElementById("cursor");

    let commandHistory = [];
    let historyIndex = -1;

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
        consoleContent.innerHTML += `<div class="command-response ${getCommandClass(command)}">C:\\>${command}</div>`;
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
                    `   [time]     Displays the current time\n`;
                    consoleContent.innerHTML += 
                    `   [help]     Shows the list of available commands\n`;
                    consoleContent.innerHTML += 
                    `   [dir]      Lists directory contents\n`;
                    consoleContent.innerHTML += 
                    `   [cls]      Clears the console screen\n`;
                break;
            case "dir":
                consoleContent.innerHTML += `<div class="command-response dirConfig">Listing directory contents...</div>`;
                break;
            case "cls":
                consoleContent.innerHTML = "";
                break;
            default:
                if (command !== "") {
                    consoleContent.innerHTML += `<div class="command-response unknownConfig">Command not recognized.</div>`;
                }
                break;
        }
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
            case "dir":
                return "dirConfig";
            case "cls":
                return "clsConfig";
            default:
                return "unknownConfig";
        }
    }
});
