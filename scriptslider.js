// Fonction debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Instance Vue.js pour le premier slider
const slider1 = new Vue({
    el: '#slider1',
    data: () => ({
        val1: parseInt(localStorage.getItem('sliderValue1')) || 50 // Charger la valeur de LocalStorage pour le premier slider
    }),
    watch: {
        val1: debounce(function(newVal) {
            console.log('Slider 1 value:', newVal);
            localStorage.setItem('sliderValue1', newVal); // Enregistrer la valeur dans LocalStorage
        }, 600) // Utilisation du debounce avec un délai de 600ms
    },
    computed: {
        getPlacement1() {
            return ((this.val1 * 14.5)) + `%`;
        },
        greaterThanFifty1() {
            return this.val1 > 50 ? `var(--roundness)` : `0`;
        },
        getHappinessColor1() {
            return `rgba(255, ${106 + (103 / 100 * this.val1)}, ${(Math.floor(this.val1 * -1 / 7.692)) + 13}`;
        },
        getSliderBackground1() {
            return `linear-gradient(to right, var(--orange), ${(this.val1 * -1) + 125}%, var(--yellow))`;
        },
        getHappiness1() {
            let moods = ["😡","😠","😦","☹️","🙁","😐","🙂","😊","😄","😃","😍"];
            if (this.val1 === 0) {
                return "🤬";
            }
            return moods[(Math.floor(this.val1 / 10))];
        }
    }
});

// Instance Vue.js pour deuxième slider
const slider2 = new Vue({
    el: '#slider2',
    data: () => ({
        val2: parseInt(localStorage.getItem('sliderValue2')) || 50 // Charger la valeur de LocalStorage pour le deuxième slider
    }),
    watch: {
        val2: debounce(function(newVal) {
            console.log('Slider 2 value:', newVal);
            localStorage.setItem('sliderValue2', newVal); // Enregistrer la valeur dans LocalStorage
        }, 600) // Utilisation du debounce avec un délai de 600ms
    },
    computed: {
        getPlacement2() {
            return ((this.val2 * 14.5)) + `%`;
        },
        greaterThanFifty2() {
            return this.val2 > 50 ? `var(--roundness)` : `0`;
        },
        getHappinessColor2() {
            return `rgba(255, ${106 + (103 / 100 * this.val2)}, ${(Math.floor(this.val2 * -1 / 7.692)) + 13}`;
        },
        getSliderBackground2() {
            return `linear-gradient(to right, var(--orange), ${(this.val2 * -1) + 125}%, var(--yellow))`;
        },
        getHappiness2() {
            let moods = ["😡","😠","😦","☹️","🙁","😐","🙂","😊","😄","😃","😍"];
            if (this.val2 === 0) {
                return "🤬";
            }
            return moods[(Math.floor(this.val2 / 10))];
        }
    }
});
