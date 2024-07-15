document.addEventListener('DOMContentLoaded', () => {
    const rewindButton = document.querySelector('.rewind');
    const nopeButton = document.querySelector('.nope');
    const likeButton = document.querySelector('.like');
    const superLikeButton = document.querySelector('.super-like');

    rewindButton.addEventListener('click', () => {
        alert('Rewind clicked!');
    });

    nopeButton.addEventListener('click', () => {
        alert('Nope clicked!');
    });

    likeButton.addEventListener('click', () => {
        alert('Like clicked!');
    });

    superLikeButton.addEventListener('click', () => {
        alert('Super Like clicked!');
    });
});
