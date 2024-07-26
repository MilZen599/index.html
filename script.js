document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('submit-btn');
    const downloadBtn = document.getElementById('download-btn');
    const feedbackImage = document.getElementById('feedback-image');
    let selectedRating = 0;
    let feedbacks = [];
    let imageIndex = 1;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    submitBtn.addEventListener('click', () => {
        const feedback = {
            rating: selectedRating,
            image: `image${imageIndex}.jpeg`
        };

        feedbacks.push(feedback);
        stars.forEach(star => star.classList.remove('selected'));

        // Switch to next image
        imageIndex++;
        if (imageIndex > 2) {
            imageIndex = 1;
        }
        feedbackImage.src = `image${imageIndex}.jpeg`;

        selectedRating = 0;
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
