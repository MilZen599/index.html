// script.js
let questionIndex = 0;
const images = ['path/to/your/image1.png', 'path/to/your/image2.png', 'path/to/your/image3.png'];
const responses = [];

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked');
    if (rating) {
        responses.push(rating.value);
        questionIndex++;
        if (questionIndex < images.length) {
            document.getElementById('questionnaire-image').src = images[questionIndex];
            document.querySelector('input[name="rating"]:checked').checked = false;
        } else {
            generateFile();
        }
    } else {
        alert('Please select a rating!');
    }
});

function generateFile() {
    const blob = new Blob([responses.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'responses.txt';
    link.click();
}
