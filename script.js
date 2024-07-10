const questions = [
    { id: 1, text: "Ceci est la question 1 du joueur ", image: "image1.jpg" },
    { id: 2, text: "Ceci est la question 2 du joueur ", image: "image2.jpg" },
    { id: 3, text: "Ceci est la question 3 du joueur ", image: "image3.jpg" },
];

let currentQuestionIndex = 0;
let currentPlayer = 1;
let responsesPlayer1 = [];
let responsesPlayer2 = [];
let startX, startY, distX, distY, threshold = 50, allowedTime = 500, elapsedTime, startTime;

function handleResponse(response, swipeDirection = null) {
    const currentQuestionId = questions[currentQuestionIndex].id;
    const responseEntry = { questionId: currentQuestionId, response };

    if (currentPlayer === 1) {
        responsesPlayer1.push(responseEntry);
    } else {
        responsesPlayer2.push(responseEntry);
    }

    if (swipeDirection) {
        const questionCard = document.getElementById('question-card');
        const stamp = document.getElementById('stamp');
        stamp.className = `stamp ${swipeDirection === 'swipe-right' ? 'like' : 'nope'}`;
        stamp.style.opacity = 1;
        questionCard.classList.add(swipeDirection);
        setTimeout(() => {
            stamp.style.opacity = 0;
            questionCard.classList.remove(swipeDirection);
            nextQuestion();
        }, 500);
    } else {
        nextQuestion();
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        if (currentPlayer === 1) {
            currentPlayer = 2;
            currentQuestionIndex = 0;
            renderQuestion();
        } else {
            renderResults();
        }
    } else {
        renderQuestion();
    }
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="app">
            <header class="app-header">
                <h1>Memory Test for Two Players</h1>
            </header>
            <div class="question-card" id="question-card">
                <img src="${question.image}" alt="${question.text}" class="question-image" />
                <p class="question-text">${question.text}${currentPlayer}?</p>
                <div class="response-buttons">
                    <button class="no" onclick="handleResponse('no')">No</button>
                    <button class="maybe" onclick="handleResponse('maybe')">Maybe</button>
                    <button class="yes" onclick="handleResponse('yes')">Yes</button>
                </div>
                <div class="stamp" id="stamp"></div>
            </div>
        </div>
    `;

    const questionCard = document.getElementById('question-card');
    questionCard.addEventListener('touchstart', handleTouchStart, false);
    questionCard.addEventListener('touchmove', handleTouchMove, false);
    questionCard.addEventListener('touchend', handleTouchEnd, false);
}

function handleTouchStart(e) {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
}

function handleTouchMove(e) {
    e.preventDefault();
}

function handleTouchEnd(e) {
    const touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= 100) {
            if (distX > 0) {
                handleResponse('yes', 'swipe-right');
            } else {
                handleResponse('no', 'swipe-left');
            }
        }
    }
    e.preventDefault();
}

function renderResults() {
    const root = document.getElementById('root');
    let results = "";

    responsesPlayer1.forEach((response1, index) => {
        const response2 = responsesPlayer2[index];
        if (
            (response1.response === 'yes' && response2.response === 'yes') ||
            (response1.response === 'yes' && response2.response === 'maybe') ||
            (response1.response === 'maybe' && response2.response === 'yes')
        ) {
            const question = questions.find(q => q.id === response1.questionId).text;
            results += `<li>${question}1 et 2</li>`;
        }
    });

    root.innerHTML = `
        <div class="app">
            <header class="app-header">
                <h1>Memory Test for Two Players</h1>
            </header>
            <div class="results">
                <h2>Final Results</h2>
                <ul>
                    ${results}
                </ul>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});
