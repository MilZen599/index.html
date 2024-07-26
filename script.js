document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    const questionnaire1Section = document.getElementById('questionnaire1-section');
    const questionnaire2Section = document.getElementById('questionnaire2-section');

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    startBtn.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        questionnaire1Section.style.display = 'block';
    });

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
        questionnaire1Section.style.display = 'none';
        questionnaire2Section.style.display = 'block';
    });

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

    // Show welcome section initially
    welcomeSection.style.display = 'block';
});
