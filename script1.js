document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const nextBtn = document.getElementById('next-btn');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    nextBtn.addEventListener('click', () => {
        const feedbackText = document.getElementById('feedback-text').value;
        const feedback = {
            rating: selectedRating,
            text: feedbackText
        };
        localStorage.setItem('questionnaire1', JSON.stringify(feedback));
        window.location.href = 'questionnaire2.html';
    });
});
