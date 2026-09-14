const pages = [...document.querySelectorAll('main > section')];
const navItems = [...document.querySelectorAll('.nav-item, .top-nav a[href^="#"]')];
const arrows = document.querySelectorAll('.arrow-button');
let currentPage = 0;

function showPage() {
    const id = window.location.hash.slice(1) || 'home';
    const target = document.getElementById(id);
    const index = pages.findIndex(page => page === target || page.contains(target));
    if (index < 0) return;
    document.querySelectorAll('video').forEach(video => video.pause());
    currentPage = index;
    pages.forEach((page, i) => {
        page.hidden = i !== index;
    });
    const group = pages[index].classList.contains('project-screen') ? 'projects' : id;
    navItems.forEach(item => {
        const active = item.hash === `#${group}`;
        item.classList.toggle('active', active);
        if (active) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
    });
    arrows[0].disabled = index === 0;
    arrows[1].disabled = index === pages.length - 1;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (target !== pages[index]) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    const heading = target.querySelector('h1, h2');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
}

arrows.forEach((arrow, i) => arrow.addEventListener('click', () => {
    const next = pages[currentPage + (i ? 1 : -1)];
    if (next) window.location.hash = next.id;
}));
window.addEventListener('hashchange', showPage);
// Enhance anchor navigation while retaining readable content without JavaScript.
document.documentElement.classList.add('js');
if (!pages.some(page => page.contains(document.getElementById(window.location.hash.slice(1))))) {
    history.replaceState(null, '', '#home');
}
showPage();

const viewer = document.querySelector('.image-viewer');
const viewerImage = viewer.querySelector('.viewer-image');
const viewerTitle = viewer.querySelector('#viewer-title');
const viewerCounter = viewer.querySelector('.viewer-counter');
const previousImage = viewer.querySelector('.viewer-previous');
const nextImage = viewer.querySelector('.viewer-next');
let galleryImages = [];
let imageIndex = 0;
function displayImage(index) {
    imageIndex = index;
    const link = galleryImages[index];
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector('img').alt;
    viewerTitle.textContent = viewerImage.alt;
    viewerCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    previousImage.disabled = index === 0;
    nextImage.disabled = index === galleryImages.length - 1;
}
document.querySelectorAll('.gameplay-gallery').forEach(gallery => {
    gallery.addEventListener('click', event => {
        const link = event.target.closest('.gameplay-thumbnail');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        galleryImages = [...gallery.querySelectorAll('.gameplay-thumbnail')];
        displayImage(galleryImages.indexOf(link));
        viewer.showModal();
    });
});
previousImage.addEventListener('click', () => displayImage(imageIndex - 1));
nextImage.addEventListener('click', () => displayImage(imageIndex + 1));
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && imageIndex > 0) { event.preventDefault(); displayImage(imageIndex - 1); }
    if (event.key === 'ArrowRight' && imageIndex < galleryImages.length - 1) { event.preventDefault(); displayImage(imageIndex + 1); }
});
window.addEventListener('hashchange', () => { if (viewer.open) viewer.close(); });
