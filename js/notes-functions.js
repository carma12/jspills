// Generate the last edited message
const generateLastEdited = (dataTime) => `Created: ${dataTime}`;

// get current date
function getDate() {
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth()) + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;

}

//remove Note by id
function removeNote(id) {
    const index = notes.findIndex((note) => note.id === id);

    if (index > -1) {
        notes.splice(index,1);
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElem = document.createElement('div');
    const titleElem = document.createElement('p');
    const bodyElem = document.createElement('p');
    const dateElem = document.createElement('p');
    const deleteButton = document.createElement('button');

    // Setup the note title text
    if (note.title.length > 0) {
        titleElem.textContent = note.title;
    } else {
        titleElem.textContent = 'Unnamed note';
    }
    titleElem.classList.add('list-note-title');
    titleElem.setAttribute('id', 'note-title');
    noteElem.appendChild(titleElem);

    // Setup the note body
    if (note.body.length > 0) {
        bodyElem.textContent = note.body;
    } else {
        bodyElem.textContent = 'No text';
    }
    bodyElem.classList.add('list-note-body');
    bodyElem.setAttribute('id', 'note-body');
    noteElem.appendChild(bodyElem);

    // Setup the date
    dateElem.textContent = generateLastEdited(note.updatedAt);
    dateElem.classList.add('list-note-subtitle');
    noteElem.appendChild(dateElem);

    // setup the button
    deleteButton.classList.add('list-note-delete-btn');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener ("click", function() {
        removeNote(note.id);
        localStorage.setItem('notes', JSON.stringify(notes)); // save note
        location.reload();
    });
    noteElem.appendChild(deleteButton);

    // Setup the div
    noteElem.classList.add('list-item');

    return noteElem;
};



// function to create an UUID
function create_UUID(){
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// obtains the ID given the site url
function getID() {
    let url = window.location.href;
    let endPos = url.indexOf('.html#') + 6; // because length('.html#') = 6
    let idRef = url.substring(endPos);
    return localStorage.getItem('ID-' + idRef.substring(0, 4));
}

// Clear all notes
function clearAllNotes() {
    localStorage.clear();
    location.reload();
    alert("All notes have been deleted")
}

// Read existing notes from local storage
function getSavedNotes() {
    const notesJSON = localStorage.getItem('notes');

    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e){
        return [];
    }
}

// sort notes
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt){
                return -1;
            } else if (a.updatedAt < b.updatedAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort( (a,b) => {
            if (a.createdAt > b.createdAt){
                return -1;
            } else if (a.createdAt < b.createdAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetical'){
        return notes.sort( (a,b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
};

// Render application notes
const renderNotes = (notes, filters) => {
    let notesEl = document.querySelector('#notes');
    notes = sortNotes(notes, filters.sortBy);
    let filteredNotes = notes.filter( (note) => {
        let title = note.title.toLowerCase();
        let filter = filters.searchText.toLowerCase();
        return title.includes(filter);
    });

    if (notesEl) {
        notesEl.innerHTML = '';

        if (filteredNotes.length > 0) {
            filteredNotes.forEach((note) => {
                notesEl.appendChild(generateNoteDOM(note));
            })
        } else {
            let emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No notes to show';
            emptyMessage.classList.add('empty-message');
            notesEl.appendChild(emptyMessage);
        }
    }
};


