document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('submit-btn');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    submitBtn.addEventListener('click', () => {
        const feedbackText = document.getElementById('feedback-text').value;
        const feedback = {
            rating: selectedRating,
            text: feedbackText
        };

        const feedbackFile = new Blob([JSON.stringify(feedback, null, 2)], { type: 'application/json' });
        const feedbackURL = URL.createObjectURL(feedbackFile);
        const downloadLink = document.createElement('a');
        downloadLink.href = feedbackURL;
        downloadLink.download = 'feedback.json';
        downloadLink.click();
    });
});
