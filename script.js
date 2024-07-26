document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    const questionnaireSections = document.querySelectorAll('.questionnaire-section');
    const startBtn = document.getElementById('start-btn');
    const submitBtn = document.getElementById('submit-btn');

    let currentQuestionnaireIndex = 0;
    let feedbackData = {};

    startBtn.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        showQuestionnaire(0);
    });

    function showQuestionnaire(index) {
        questionnaireSections.forEach((section, idx) => {
            section.style.display = idx === index ? 'block' : 'none';
        });
    }

    function collectFeedback(index) {
        const rating = document.querySelector(`#stars${index + 1} .star.selected`)?.getAttribute('data-value') || 0;
        const feedbackText = document.getElementById(`feedback-text${index + 1}`)?.value || '';
        feedbackData[`questionnaire${index + 1}`] = {
            rating: rating,
            text: feedbackText
        };
    }

    questionnaireSections.forEach((section, index) => {
        const nextBtn = section.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                collectFeedback(index);
                if (index < questionnaireSections.length - 1) {
                    showQuestionnaire(index + 1);
                }
            });
        }
    });

    submitBtn.addEventListener('click', () => {
        collectFeedback(questionnaireSections.length - 1);
        const feedbackFile = new Blob([JSON.stringify(feedbackData, null, 2)], { type: 'application/json' });
        const feedbackURL = URL.createObjectURL(feedbackFile);
        const downloadLink = document.createElement('a');
        downloadLink.href = feedbackURL;
        downloadLink.download = 'full_feedback.json';
        downloadLink.click();
    });

    // Handle star selection
    questionnaireSections.forEach((section, index) => {
        const stars = section.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                stars.forEach(s => s.classList.remove('selected'));
                star.classList.add('selected');
            });
        });
    });
});
