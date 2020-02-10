/*
* Author: Carla Martínez Poveda
* 2020
*
* */
function highlight() {

    // MULTIPLE (SEVERAL WORDS) - five colors
    let text = document.getElementById("search").value;
    // separate words to perform different searchs
    let words = text.split(" ");

    let inputText = document.getElementById("search_content");
    let innerHTML = inputText.innerHTML;
    innerHTML = innerHTML.replace(/<\/?span[^>]*>/g,""); // remove highlight classes (if any)

    let highlight_counter = 0;
    for (let w=0; w<words.length; w++) {
        if (highlight_counter++ > 5) {
            highlight_counter = 1;
        }

        let caseSensitive = document.getElementById("check_sensitive").checked;

        let indices = getIndicesOf(words[w], innerHTML, caseSensitive);

        for (let i = indices.length - 1; i >= 0; i--) {
            innerHTML = innerHTML.substring(0, indices[i]) +
                "<span class='highlight" + highlight_counter +
                "'>" + innerHTML.substring(indices[i], indices[i] + words[w].length) +
                "</span>" + innerHTML.substring(indices[i] + words[w].length);
            inputText.innerHTML = innerHTML;
        }
    }

}

// function that retrieves all indices of a given word
function getIndicesOf(searchStr, str, caseSensitive) {

    let searchStrLen = searchStr.length;
    if (searchStrLen === 0) {
        return [];
    }

    let result, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }

    let word_regex = new RegExp("\\b" + searchStr + "\\b", "g"); // whole word

    while ( (result = word_regex.exec(str)) ) {
        indices.push(result.index);
    }
    return indices;
}

function clear_highlight() {
    let inputText = document.getElementById("search_content");
    let innerHTML = inputText.innerHTML;
    // clear all spans
    innerHTML = innerHTML.replace(/<\/?span[^>]*>/g,"");
    // clear textbox
    document.getElementById("search").value = "";

    inputText.innerHTML = innerHTML;
}
