// notes
let notes = getSavedNotes();
// data time
const dataTime = getDate();

// filters by default
const filters = {
    searchText: '',
    sortBy: 'byEdited'
};

// Event when search Notes
let searchText = document.querySelector('#search-text');
if (searchText) {
    searchText.addEventListener('input', (e) => {
        filters.searchText = e.target.value;
        renderNotes(notes, filters);
    });
}

// Event when filter Notes
let optionFilter = document.querySelector('#option-filter');
if (optionFilter) {
    optionFilter.addEventListener('change', (e) => {
        filters.sortBy = e.target.value;
        renderNotes(notes, filters);
    });
}

// Show notes
window.addEventListener('storage', (e) => { // When local storage changes
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
});

// render notes
renderNotes(notes, filters);

// Event when click 'Create Note'
function createNote() {
    let ID = create_UUID();
    localStorage.setItem('ID-' + ID.substring(0, 4), ID);
    notes.push({
        id: ID,
        title: '',
        body: '',
        createdAt: dataTime,
        updatedAt: dataTime,
    });
    localStorage.setItem('notes', JSON.stringify(notes)); // save note
    location.assign(`./notes-edit.html#${ID}`);
}

// about link
document.querySelector('#about-link').addEventListener('click', () => {
    alert("This project is inspired by the Notes app in Andrew Mead's Javascript course and Romeo Jeremiah's own version.");
});


