document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', () => {
        const additionalFeedback = document.getElementById('additional-feedback').value;
        const feedback1 = JSON.parse(localStorage.getItem('questionnaire1'));
        const feedback2 = {
            additionalFeedback: additionalFeedback
        };

        const fullFeedback = {
            ...feedback1,
            ...feedback2
        };

        const feedbackFile = new Blob([JSON.stringify(fullFeedback, null, 2)], { type: 'application/json' });
        const feedbackURL = URL.createObjectURL(feedbackFile);
        const downloadLink = document.createElement('a');
        downloadLink.href = feedbackURL;
        downloadLink.download = 'full_feedback.json';
        downloadLink.click();
    });
});
