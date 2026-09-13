const projectScreens = document.querySelectorAll(".project-screen");

const pages = [
    document.querySelector(".hero"),
    document.querySelector(".about-screen"),
    ...projectScreens
];

const arrows = document.querySelectorAll(".arrow-button");
const navItems = document.querySelectorAll(".nav-item");
const navPages = Array.from(navItems, function (item, index) {
    return index;
});

let currentPage = 0;


function showPage(index) {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });

    pages.forEach(function (page) {

        if (page) {
            page.style.display = "none";
        }

    });


    const activePage = pages[index];

    if (!activePage) {
        return;
    }


    activePage.style.display = "flex";

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


document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href").slice(1);
        const pageIndex = pages.findIndex(function (page) {
            return page && page.id === targetId;
        });

        if (pageIndex === -1) {
            return;
        }

        event.preventDefault();

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
