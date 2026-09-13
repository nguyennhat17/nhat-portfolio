const pages = [
    document.querySelector(".hero"),
    document.querySelector(".about-screen"),
    document.querySelector(".project-screen")
];

const arrows = document.querySelectorAll(".arrow-button");
const navItems = document.querySelectorAll(".nav-item");
const navPages = [0, 1, 2, null, null, null];

let currentPage = 0;


function showPage(index) {

    pages.forEach(function (page) {

        if (page) {
            page.style.display = "none";
        }

    });


    const activePage = pages[index];

    if (!activePage) {
        return;
    }


    if (activePage.classList.contains("hero")) {

        activePage.style.display = "grid";

    } else {

        activePage.style.display = "flex";

    }

    navItems.forEach(function (item, itemIndex) {

        item.classList.toggle("active", navPages[itemIndex] === index);

    });

}


arrows[1].addEventListener("click", function () {

    if (currentPage < pages.length - 1) {

        currentPage++;

        showPage(currentPage);

    }

});


arrows[0].addEventListener("click", function () {

    if (currentPage > 0) {

        currentPage--;

        showPage(currentPage);

    }

});


navItems.forEach(function (item, itemIndex) {

    const pageIndex = navPages[itemIndex];

    if (pageIndex === null) {
        return;
    }

    item.addEventListener("click", function () {

        currentPage = pageIndex;

        showPage(currentPage);

    });

});


document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowRight") {

        if (currentPage < pages.length - 1) {

            currentPage++;

            showPage(currentPage);

        }

    }


    if (event.key === "ArrowLeft") {

        if (currentPage > 0) {

            currentPage--;

            showPage(currentPage);

        }

    }

});


showPage(currentPage);
