const atmosphereButton = document.querySelector('.atmosphere-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let ambiencePaused = motionPreference.matches;
function updateAtmosphere() {
    document.body.classList.toggle('ambience-paused', ambiencePaused || document.hidden);
    atmosphereButton.setAttribute('aria-pressed', String(ambiencePaused));
    atmosphereButton.setAttribute('aria-label', ambiencePaused ? 'Play background animation' : 'Pause background animation');
    atmosphereButton.textContent = ambiencePaused ? 'Play ambience' : 'Pause ambience';
}
atmosphereButton.addEventListener('click', () => { ambiencePaused = !ambiencePaused; updateAtmosphere(); });
motionPreference.addEventListener('change', event => { ambiencePaused = event.matches; updateAtmosphere(); });
document.addEventListener('visibilitychange', updateAtmosphere);
updateAtmosphere();
