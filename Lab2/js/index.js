let maxWidth = 0;

function calculatingWidth() {
    const logo = document.querySelector('.navbar__logo-container')
    const buttonsContainer = document.querySelector('.navbar__buttons-container');
    maxWidth = logo.clientWidth + buttonsContainer.clientWidth + 100;
    updateButtons();
}

function updateButtons() {
    const buttons = document.querySelectorAll('.navbar__buttons-container--button');
    let windowWidth = window.innerWidth;
    if (windowWidth <= 390 || windowWidth <= maxWidth) {
        buttons.forEach(button => button.style.display = 'none');
        combinedButton.style.display = 'block';
    } else {
        buttons.forEach(button => button.style.display = 'block');
        combinedButton.style.display = 'none';
    }
}

window.addEventListener('load', calculatingWidth);
window.addEventListener('resize', updateButtons);
