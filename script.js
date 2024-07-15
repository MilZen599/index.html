const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // Add more image paths as needed
];
let currentIndex = 0;
const yesResponses = [];

document.getElementById('yes-button').addEventListener('click', () => {
    animateHeart();
    yesResponses.push(images[currentIndex]);
    nextImage();
});

document.getElementById('maybe-button').addEventListener('click', nextImage);
document.getElementById('no-button').addEventListener('click', nextImage);

function nextImage() {
    currentIndex++;
    if (currentIndex < images.length) {
        document.getElementById('main-image').src = images[currentIndex];
    } else {
        showFinalPage();
    }
}

function animateHeart() {
    const yesButton = document.getElementById('yes-button');
    yesButton.style.animation = 'heartbeat 1s ease-in-out';
    yesButton.addEventListener('animationend', () => {
        yesButton.style.animation = '';
    });
}

function showFinalPage() {
    const main = document.querySelector('main');
    main.innerHTML = '<h2>Vos réponses "oui"</h2>';
    yesResponses.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Selected image';
        img.style.width = '100%';
        main.appendChild(img);
    });
}
