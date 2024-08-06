// Vidéo se lance automatiquement
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');

    if (video) { // Vérifie si l'élément vidéo existe
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    } else {
        console.error("L'élément vidéo avec l'ID 'myVideo' n'a pas été trouvé.");
    }
});
// Fin Vidéo se lance automatiquement
