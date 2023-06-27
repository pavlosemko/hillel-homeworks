window.onload = function () {
    const wrappers = [...document.querySelectorAll(".wrapper")];

    const count = (input) => (input.value = ++input.value);

    const getCounterFormCntx = (cntx) => {
        return cntx.querySelector(`input[name=${cntx.id}]`);
    };

    const saveCounterToLS = (key, counter) => {
        return localStorage.setItem(key, counter);
    };

    const getCounterFromLS = (key) => localStorage.getItem(key);

    const removeCounterFromLS = (key) => localStorage.removeItem(key);

    const actions = {
        clearCounter(counterLSKey, counter) {
            counter.value = null;
            removeCounterFromLS(counterLSKey);
        },
        setCounter(counterLSKey, counter) {
            const numberCounter = getCounterFromLS(counterLSKey);
            counter.value = numberCounter;
        },
        upCounter(counterLSKey, counter) {
            const numberCounter = count(counter);
            saveCounterToLS(counterLSKey, numberCounter);
        },
    };

    const wrapperHandler = function (event) {
        event.preventDefault();
        const action = event.target.dataset.action,
            actionMethod = actions[action];
        if (action && typeof actionMethod == "function") {
            const counter = getCounterFormCntx(this),
                counterLSKey = this.id;
            actionMethod(counterLSKey, counter);
        }
    };

    wrappers.forEach((wrapper) => {
        wrapper.addEventListener("click", wrapperHandler);
    });
};
