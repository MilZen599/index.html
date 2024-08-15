// Video se lance automqtiquement
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play();  
            } else { video.pause();}
        });
    }, { threshold: 0.5 });
    videos.forEach(video => {
        observer.observe(video);
    });
});

// sauve les commentaires
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        const savedComment = localStorage.getItem(input.id);
        if (savedComment) {
            input.value = savedComment;
        }

        // Sauvegarder le commentaire lors de la saisie
        input.addEventListener('input', () => {
            localStorage.setItem(input.id, input.value);
        });
    });
});

// empeche la touche entrée dans les commentaire
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionnez tous les champs de texte des commentaires
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Empêche la touche "Entrée" de soumettre le formulaire
            }
        });
    });
});

$(function() {
  // Au chargement de la page, vérifier l'état des boutons heart
  $(".heart").each(function() {
    var sectionId = $(this).closest('section').attr('id');
    var isActive = localStorage.getItem('heart_' + sectionId) === 'true';
    if (isActive) {
      $(this).addClass("is-active");
    }
  });

  // Gérer le clic sur les boutons heart
  $(".heart").on("click", function() {
    $(this).toggleClass("is-active");

    var sectionId = $(this).closest('section').attr('id');
    var isActive = $(this).hasClass("is-active");
    
    // Sauvegarder l'état dans localStorage
    localStorage.setItem('heart_' + sectionId, isActive);

    console.log("Heart button clicked in section:", sectionId, "Active:", isActive);
  });
});
