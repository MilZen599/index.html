document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const welcomeSection = document.getElementById('welcome-section');
    const questionnaireSections = document.querySelectorAll('.questionnaire-section');
    const startBtn = document.getElementById('start-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (!welcomeSection || !questionnaireSections || !startBtn || !submitBtn) {
        console.error("One or more elements are missing from the DOM");
        return;
    }

    let currentQuestionnaireIndex = 0;
    let feedbackData = {};

    startBtn.addEventListener('click', () => {
        console.log("Start button clicked");
        welcomeSection.style.display = 'none';
        showQuestionnaire(0);
    });

    function showQuestionnaire(index) {
        console.log(`Showing questionnaire ${index + 1}`);
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
        console.log(`Collected feedback for questionnaire ${index + 1}:`, feedbackData[`questionnaire${index + 1}`]);
    }

    questionnaireSections.forEach((section, index) => {
        const nextBtn = section.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                console.log(`Next button clicked for questionnaire ${index + 1}`);
                collectFeedback(index);
                if (index < questionnaireSections.length - 1) {
                    showQuestionnaire(index + 1);
                }
            });
        }
    });

    submitBtn.addEventListener('click', () => {
        console.log("Submit button clicked");
        collectFeedback(questionnaireSections.length - 1);
        console.log("Final feedback data:", feedbackData);
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
                console.log(`Star ${star.getAttribute('data-value')} selected for questionnaire ${index + 1}`);
            });
        });
    });
});
