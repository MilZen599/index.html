document.addEventListener('DOMContentLoaded', function() {
    if (typeof Vue !== 'undefined') {
        console.log('Vue.js is loaded and ready.');

        new Vue({
            el: '#slider',
            data: () => ({
                val: 70
            }),
            mounted() {
                this.val = Math.floor(Math.random() * 101);
            },
            computed: {
                getPlacement() {
                    return ((this.val * 14.5)) + `%`;
                },
                greaterThanFifty() {
                    return this.val > 50 ? `var(--roundness)` : `0`;
                },
                getHappinessColor() {
                    return `rgba(255, ${106 + (103 / 100 * this.val)}, ${(Math.floor(this.val * -1 / 7.692)) + 13}`;
                },
                getSliderBackground() {
                    return `linear-gradient(to right, var(--orange), ${(this.val * -1) + 125}%, var(--yellow))`;
                },
                getHappiness() {
                    let moods = ["😡","😠","😦","☹️","🙁","😐","🙂","😊","😄","😃","😍"];
                    if (this.val === 0) {
                        return "🤬";
                    } 
                    return moods[(Math.floor(this.val / 10))];
                }
            }
        });
    } else {
        console.log('Vue.js failed to load.');
    }
});
