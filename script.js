const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to display notes from local storage
function showNotes() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
        attachEventListenersToNotes(); // Reattach event listeners after loading notes
    }
}
showNotes();

// Function to update local storage with the current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to attach event listeners to each note
function attachEventListenersToNotes() {
    notesContainer.querySelectorAll(".input-box").forEach(note => {
        note.addEventListener("keyup", updateStorage);
    });
}

// Event listener for creating a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Attach keyup event listener to the new note
    inputBox.addEventListener("keyup", updateStorage);

    updateStorage(); // Update local storage after creating a new note
});

// Event listener for handling clicks on delete icons
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Event listener for handling the Enter key to insert a line break
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
        updateStorage();
    }
});
