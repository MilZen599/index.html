document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.action-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.classList.contains('rewind')) {
                alert('Rewind action');
            } else if (this.classList.contains('nope')) {
                alert('Nope action');
            } else if (this.classList.contains('like')) {
                alert('Like action');
            } else if (this.classList.contains('super-like')) {
                alert('Super Like action');
            }
        });
    });
});
