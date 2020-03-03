// data time
const dataTime = getDate();

let notes = getSavedNotes();
let ID = getID();
let note = notes.find( (note) => note.id === ID);

// save Note
function saveNote() {

    // note elements
    const noteTitle = document.getElementById("note-title").value;
    const noteBody = document.getElementById("note-body").value;

    if (!note) {
        // new note
        notes.push({
            id: ID,
            title: noteTitle,
            body: noteBody,
            createdAt: dataTime,
            updatedAt: dataTime,
        });
        localStorage.setItem('notes', JSON.stringify(notes)); // save note
        alert("Note created");

    } else {
        // remove existent node
        removeNote(ID);

        // replace the info with the new info and ID
        notes.push({
            id: ID,
            title: noteTitle,
            body: noteBody,
            createdAt: dataTime,
            updatedAt: dataTime,
        });
        localStorage.setItem('notes', JSON.stringify(notes)); // save note
        alert("Note created");

    }
    //location.assign(`./notes.html`); // Redirects to main page
}

document.querySelector('#btn-delete-note').addEventListener('click', () =>{
    removeNote(note.id);
    localStorage.setItem('notes', JSON.stringify(notes)); // save note
    location.assign('./notes.html');
});


