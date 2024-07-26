document.addEventListener('DOMContentLoaded', () => {
    const feedbackInputs = document.querySelectorAll('.feedback input');
    const submitBtn = document.getElementById('submit-btn');
    const downloadBtn = document.getElementById('download-btn');
    const feedbackImage = document.getElementById('feedback-image');
    let selectedFeedback = 0;
    let feedbacks = [];
    let imageIndex = 1;

    feedbackInputs.forEach(input => {
        input.addEventListener('change', () => {
            selectedFeedback = input.value;
        });
    });

    submitBtn.addEventListener('click', () => {
        const feedback = {
            feedback: selectedFeedback,
            image: `image${imageIndex}.jpeg`
        };

        feedbacks.push(feedback);
        feedbackInputs.forEach(input => input.checked = false);

        // Switch to next image
        imageIndex++;
        if (imageIndex > 2) {
            imageIndex = 1;
        }
        feedbackImage.src = `image${imageIndex}.jpeg`;

        selectedFeedback = 0;
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
