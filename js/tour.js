// show address of the LMU
document.getElementById('addressLMUTI').onclick = function(){
    alert("Division of Infectious Diseases and Tropical Medicine \n" +
        "University Hospital, Ludwig-Maximilians-Universität (LMU) Munich\n" +
        "Leopoldstrasse 5\n" +
        "80802 München\n\n" +
        "Fax: 0049-89-33 60 38 or 33 61 12\n" +
        "Tel.: 0049-89-2180 13500\n" +
        "Email: tropinst@lrz.uni-muenchen.de");
};

// Starts Tour when button is clicked
function startTour() {
    let happyEmoticon = '<i class="far fa-grin-beam"></i>';
    // Define Tour
    let tour = new Tour({
        storage: false, // prevents Bootstrap Tour to freeze
        steps: [
            {
                element: '#navbarResponsive',
                title: 'Welcome to the Tour!',
                content: 'Those are the options of the navbar. Feel free to move through them!',
                placement: "left"
            },
            {
                element: '#about',
                title: 'What is that?',
                content: 'This is the motivation and some details about the project.',
                placement: 'auto'
            },
            {
                element: "#tips",
                title: "Free advice!",
                content: "Useful tips to fight against procastination at home when Coronavirus is out there. Take a look!",
                placement: 'top'
            },
            {
                element: "#pre-information",
                title: "Do you live in Munich? Perfect!",
                content: "Here you will find some useful information about the quarantine and what to do in some cases.",
                placement: 'top'
            },
            {
                element: "#exit-restrictions",
                title: "Very important",
                content: "Be a responsible citizen and follow these tips."
            },
            {
                element: "#footer",
                title: "That's all!",
                content: "If you liked this tour, feel free to visit my Github profile " + happyEmoticon,
                placement: 'top'
            }
        ],
        backdrop: true // highlight each element through the steps
    });

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();
}
