document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    const questionnaire1Section = document.getElementById('questionnaire1-section');
    const questionnaire2Section = document.getElementById('questionnaire2-section');

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    const stars1 = document.querySelectorAll('#questionnaire1-section .star');
    const stars2 = document.querySelectorAll('#questionnaire2-section .star');
    let selectedRating1 = 0;
    let selectedRating2 = 0;

    startBtn.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        questionnaire1Section.style.display = 'block';
    });

    stars1.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating1 = star.getAttribute('data-value');
            stars1.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    stars2.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating2 = star.getAttribute('data-value');
            stars2.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    nextBtn.addEventListener('click', () => {
        const feedbackText = document.getElementById('feedback-text').value;
        const feedback = {
            rating: selectedRating1,
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
            additionalRating: selectedRating2,
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
