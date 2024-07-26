let ratings = JSON.parse(localStorage.getItem('ratings')) || [null, null, null, null, null, null]; // Pour stocker les notes

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.rating').forEach((ratingDiv, index) => {
        const pageIndex = getPageIndex();
        const ratingIndex = pageIndex * 2 + index;
        if (ratings[ratingIndex] !== null) {
            for (let i = 0; i < ratings[ratingIndex]; i++) {
                ratingDiv.children[i].classList.add('selected');
            }
        }
        for (let i = 0; i < 5; i++) {
            if (!ratingDiv.children[i]) {
                const span = document.createElement('span');
                span.textContent = '★';
                span.addEventListener('click', () => rate(ratingIndex, i + 1));
                ratingDiv.appendChild(span);
            }
        }
    });
});

function rate(index, rating) {
    ratings[index] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
    const ratingDivs = document.querySelectorAll('.rating')[index % 2].children;
    for (let i = 0; i < ratingDivs.length; i++) {
        ratingDivs[i].classList.toggle('selected', i < rating);
    }
}

function getPageIndex() {
    const page = window.location.pathname.split('/').pop();
    if (page === 'page1.html') return 0;
    if (page === 'page2.html') return 1;
    if (page === 'page3.html') return 2;
    return -1;
}

function generateFile() {
    const content = ratings.map((rating, index) => `Section ${index + 1}: ${rating !== null ? rating : 'Non noté'}/5`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultats.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
