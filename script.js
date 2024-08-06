// Vidéo se lance automatiquement
document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('myVideo');

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
        });

// Fin Vidéo se lance automatiquement
