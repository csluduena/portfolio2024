//todo terminal on.

document.addEventListener("DOMContentLoaded", function() {
    const consoleContent = document.getElementById("consoleContent");
    const inputLine = document.getElementById("inputLine");
    const cursor = document.getElementById("cursor");

    inputLine.focus();

    inputLine.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleCommand(inputLine.value);
            inputLine.value = "";
        }
    });

    function handleCommand(command) {
        consoleContent.textContent += "C:\\> " + command + "\n";
        consoleContent.scrollTop = consoleContent.scrollHeight;
        cursor.style.display = "none";
        setTimeout(() => {
            consoleContent.textContent += "C:\\> ";
            cursor.style.display = "inline";
            inputLine.focus();
            consoleContent.scrollTop = consoleContent.scrollHeight;
        }, 500);
    }
});
