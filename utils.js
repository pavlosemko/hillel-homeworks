const incrementCounter = (input) => (input.value = ++input.value);

const saveCounterToLS = (key, counter) => {
    return localStorage.setItem(key, counter);
};

const getCounterFromLS = (key) => localStorage.getItem(key);

const removeCounterFromLS = (key) => localStorage.removeItem(key);

const upCounter = (counterLSKey, counter) => {
    const numberCounter = incrementCounter(counter);
    saveCounterToLS(counterLSKey, numberCounter);
};
const requestUserCounter = () => Number(prompt("Укажить кількість"));

const createEl = (elementName) => document.createElement(elementName);

const createOption = (block) => {
    const option = createEl("option");
    option.innerText = block.id;
    option.value = block.id;
    return option;
};

export const setCounter = (counter, counterLSKey) => {
    const numberCounter = requestUserCounter();
    if (numberCounter) {
        counter.value = numberCounter;
        saveCounterToLS(counterLSKey, numberCounter);
    }
};

export const getCounterFormBlock = (block) => {
    return block.querySelector(`input[name=${block.id}]`);
};

export const getBlockById = (blockId) => document.getElementById(blockId);

export const setCountersToSelector = (blocks, form) => {
    const selector = createEl("select");
    blocks.forEach((block) => {
        const option = createOption(block);
        selector.append(option);
    });
    form.prepend(selector);
};

export const getValueFromLSAndAddToCounter = (block) => {
    const value = getCounterFromLS(block.id);
    if (value) {
        const input = getCounterFormBlock(block);
        input.value = value;
    }
};

export const resetCounterBlock = (block) => {
    const input = getCounterFormBlock(block);
    if (input) {
        input.value = null;
        removeCounterFromLS(block.id);
    }
};

export const increaseCounterValue = (cntx) => {
    const counter = getCounterFormBlock(cntx),
        counterLSKey = cntx.id;
    upCounter(counterLSKey, counter);
};
