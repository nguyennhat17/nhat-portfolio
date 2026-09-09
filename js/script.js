const homeScreen = document.querySelector(".hero");
const aboutScreen = document.querySelector(".about-screen");

const arrows = document.querySelectorAll(".arrow-button");

let currentPage = 0;

function showPage(page) {

    if (page === 0) {

        homeScreen.style.display = "grid";
        aboutScreen.style.display = "none";

    }

    if (page === 1) {

        homeScreen.style.display = "none";
        aboutScreen.style.display = "flex";

    }

}


arrows[1].addEventListener("click", function () {

    currentPage = 1;

    showPage(currentPage);

});


arrows[0].addEventListener("click", function () {

    currentPage = 0;

    showPage(currentPage);

});