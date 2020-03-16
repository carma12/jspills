let elemItems = document.getElementById('items');
let counterElem = document.getElementById('counter');
let items = ['Milk', 'Eggs', 'Apples'];
let data = '';

// Update number of items
updateCounter();

// Show items
function showItems() {
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            data += createRow(items[i], i);
        }
    }
    // Update counter
    updateCounter();
    elemItems.innerHTML = data;
}

// CREATES new row for a item
function createRow(item, index) {
    let row = '';
    let idName = "item" + index;
    row += '<tr class="tr-cell-' + index + '">';
    row += '<td id=' + idName + ' class="item-cell">' + item + '</td>';
    row += '<td><select class="custom-select mr-sm-2" id="quantityInlineForm">\n' +
        '      <option selected>1</option>' +
        '      <option value="2">2</option>' +
        '      <option value="3">3</option>' +
        '      <option value="4">4</option>' +
        '      <option value="5">5</option>' +
        '      <option value="6">6</option>' +
        '      <option value="7">7</option>' +
        '      <option value="8">8</option>' +
        '      <option value="9">9</option>' +
        '      <option value="Many">Many</option>' +
        '    </select></td>';
    row += '<td><button id="edit-item" class="edit-button btn btn-warning" onclick="editItem(' + index + ')">Edit</button></td>';
    row += '<td><button id="delete-item" class="delete-button btn btn-danger" onclick="deleteItem(' + index + ')">Delete</button></td>';
    row += '</tr>';
    return row;
}

// Add item
function addItem() {
    let item = document.getElementById('new-item').value;
    if (item) {
        elemItems.innerHTML += createRow(item, getCounter());
        // Let TextBox 'new-item' empty
        document.getElementById('new-item').value = '';
        // Add item in array
        items.push(item);
        // Update counter (it doesn't update?)
        updateCounter();
    } else {
        alert("Sorry! You can't insert an empty element");
    }
}

// UPDATES item
function editItem(index) {
    // item to edit
    let itemElement = document.getElementById('item' + index);

    // put it on 'edit-name' textBox as innerText
    document.getElementById('edit-name').value = itemElement.innerText;

    // Display
    document.getElementById('spoiler').style.display = 'flex';

    // Click to edit
    document.getElementById('edit-hidden-btn').onclick = function() {
        let newItem = document.getElementById('edit-name').value;

        if (newItem) {
            items[index] = newItem;
            document.getElementById('item' + index).innerText = newItem;
            closeEdit();
        }
    };
}

// closes the edit item section
function closeEdit() {
    document.getElementById('spoiler').style.display = 'none';
}

// DELETE item
function deleteItem(index) {
    // prevents from edit and delete at the same time
    closeEdit();
    // delete element in array
    items.splice(index, 1);
    // delete row
    document.getElementById('items').deleteRow(index);
    updateCounter();
}

// Get how many elements in array
function getCounter() {
    return items.length;
}

// Update counter
function updateCounter(){
    counterElem.innerText = getCounter() + ' items';
}
