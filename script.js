let ratings = [null, null, null, null, null, null]; // To store ratings for both sections on each page

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.rating').forEach((ratingDiv, index) => {
        for (let i = 1; i <= 5; i++) {
            const span = document.createElement('span');
            span.textContent = '★';
            span.addEventListener('click', () => rate(index, i));
            ratingDiv.appendChild(span);
        }
    });
});

function rate(sectionIndex, rating) {
    const ratingDivs = document.querySelectorAll('.rating')[sectionIndex].children;
    ratings[sectionIndex] = rating;

    for (let i = 0; i < ratingDivs.length; i++) {
        ratingDivs[i].classList.toggle('selected', i < rating);
    }
}

function generateFile() {
    const content = ratings.map((rating, index) => `Section ${index + 1}: ${rating}/5`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultats.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
