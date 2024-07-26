document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('submit-btn');
    const downloadBtn = document.getElementById('download-btn');
    const feedbackContainer = document.querySelector('.feedback-container');
    let selectedRating = 0;
    let feedbacks = [];

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

        feedbacks.push(feedback);
        document.getElementById('feedback-text').value = '';
        stars.forEach(star => star.classList.remove('selected'));

        alert('Feedback submitted! You can submit another feedback or download all feedbacks.');

        downloadBtn.style.display = 'inline-block';
    });

    downloadBtn.addEventListener('click', () => {
        const feedbackFile = new Blob([JSON.stringify(feedbacks, null, 2)], { type: 'application/json' });
        const feedbackURL = URL.createObjectURL(feedbackFile);
        const downloadLink = document.createElement('a');
        downloadLink.href = feedbackURL;
        downloadLink.download = 'feedbacks.json';
        downloadLink.click();
    });
});
