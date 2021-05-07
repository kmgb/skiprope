const saveButton = document.getElementById('save-button');
const addRowButton = document.getElementById('add-row-button');
const rowContainer = document.getElementById('row-container');

// Load the stored commands from local storage
// var storedCommands = localStorage.getItem("commands");
localforage.getItem("commands").then(function (storedCommands) {
    if (storedCommands && storedCommands !== "[]") {
        var commands = JSON.parse(storedCommands);
        for (var i = 0; i < commands.length; i++) {
            addRow(commands[i][0], commands[i][1], commands[i][2]);
        }
    }
    else {
        addRow("", "", ""); // Add empty row so user can start adding commands
    }
});

saveButton.addEventListener("click", function() {
    saveArray = [];

    for (var i = 0; i < rowContainer.children.length; i++) {
        var child = rowContainer.children[i];
        saveArray.push([]);

        for (var j = 0; j < child.children.length; j++) {
            var input = child.children[j];

            saveArray[i].push(input.value);
        }
    }

    // Filter out entries without a command name, this lets users delete unwanted commands
    saveArray = saveArray.filter(arr => arr[0] !== "");
    // localStorage.setItem("commands", JSON.stringify(saveArray));
    localforage.setItem("commands", JSON.stringify(saveArray));

    location.reload(); // Show the user the updated values
});

addRowButton.addEventListener("click", function() {
    addRow("", "", "");
});

// Adds an input row to the container
// Sorry for the javascript-generating-html nightmare fuel
// It was required because setting the 'value' attribute on a select element in inline HTML doesn't select the given option
function addRow(command, option, value) {
    var div = document.createElement("div");
    div.classList.add("inline-form");

    var commandInput = document.createElement("input");
    commandInput.type = "text";
    commandInput.value = command;

    var dropdown = document.createElement("select");

    var option1 = document.createElement("option");
    option1.value = "url";
    option1.text = "Go to URL";
    if (option === option1.value) option1.selected = true;
    var option2 = document.createElement("option");
    option2.value = "script";
    option2.text = "Run Script";
    if (option === option2.value) option2.selected = true;

    dropdown.appendChild(option1);
    dropdown.appendChild(option2);

    var valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.value = value;

    div.appendChild(commandInput);
    div.appendChild(dropdown);
    div.appendChild(valueInput);

    rowContainer.appendChild(div);
}
