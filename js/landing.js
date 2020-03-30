const app = document.getElementById('root');
document.getElementById('btn-films').click();

function buildContainer(elem, ghibliData) {
    // retrieve row container
    const container = document.getElementById("ghibli-items");

    // Create a div with a card class
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    // Create an h1 and set the text content to the element title
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'card-title');
    switch (ghibliData) {
        case "films": h1.textContent = elem.title; break;
        case "people":
            case "locations":
                case "species":
                    case "vehicles": h1.textContent = elem.name; break;
        default: h1.textContent = "Error";
    }

    // Create a p and set the text content to every element (according to its type)
   switch (ghibliData) {
        case "films":
            const filmDescr = newParagraph("", elem.description);
            //elem.description = elem.description.substring(0, 300); // Limit to 300 chars
            //filmDescr.textContent = `${elem.description}...`; // End with an ellipses

            // Append the cards to the container element
            container.appendChild(card);

            // Each card will contain an h1 and a p
            card.appendChild(h1);
            card.appendChild(filmDescr);

            break;
        case "people" :
            const pGender = newParagraph("Gender: ", elem.gender);
            const pAge = newParagraph("Age: ", elem.age);
            const pEye = newParagraph("Eye color: ", elem.eye_color);
            const pHair = newParagraph("Hair color: ", elem.hair_color);

            // Append the cards to the container element
            container.appendChild(card);

            // Each card will contain an h1 and a p
            card.appendChild(h1);
            card.appendChild(pGender);
            card.appendChild(pAge);
            card.appendChild(pEye);
            card.appendChild(pHair);

            break;
        case "locations":
            const pClimate = newParagraph("Climate: ", elem.climate);
            const pTerrain = newParagraph("Terrain: ", elem.terrain);
            const pSurface = newParagraph("Surface water: ", elem.surface_water);

            // Append the cards to the container element
            container.appendChild(card);

            // Each card will contain an h1 and a p
            card.appendChild(h1);
            card.appendChild(pClimate);
            card.appendChild(pTerrain);
            card.appendChild(pSurface);

            break;
        case "species":
            const pClassification = newParagraph("Classification: ", elem.classification);
            const pEyes = newParagraph("Eye colors: ", elem.eye_colors);
            const pHairs = newParagraph("Hair colors: ", elem.hair_colors);

            // Append the cards to the container element
            container.appendChild(card);

            // Each card will contain an h1 and a p
            card.appendChild(h1);
            card.appendChild(pClassification);
            card.appendChild(pEyes);
            card.appendChild(pHairs);
            break;
        case "vehicles":
            const vehicleDescr = newParagraph("", elem.description);
            //elem.description = elem.description.substring(0, 300); // Limit to 300 chars
            //vehicleDescr.textContent = `${elem.description}...`; // End with an ellipses
            const pVClass = newParagraph("Vehicle class: ", elem.vehicle_class);
            const pLength = newParagraph("Length: ", elem.length);

            // Append the cards to the container element
            container.appendChild(card);

            // Each card will contain an h1 and a p
            card.appendChild(h1);
            card.appendChild(vehicleDescr);
            card.appendChild(pVClass);
            card.appendChild(pLength);
    }

    /*// Append the cards to the container element
    container.appendChild(card);

    // Each card will contain an h1 and a p
    card.appendChild(h1);
    card.appendChild(p);*/
}

function newParagraph(text, content) {
    const p = document.createElement('p');
    p.setAttribute('class', 'card-content');
    p.textContent = text + content;
    return p;
}

function cleanContainers() {
    let container = document.getElementById('ghibli-items');
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function callApi(ghibliData) {
    // first clean all data
    cleanContainers();
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://ghibliapi.herokuapp.com/' + ghibliData + '', true);

    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.forEach(elem => {
                buildContainer(elem, ghibliData);
            })
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Not working!`;
            app.appendChild(errorMessage);
        }
    };

    request.send();
}

// DARK MODE
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);
