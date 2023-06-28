import {
    increaseCounterValue,
    resetCounterBlock,
    getBlockById,
    getCounterFormBlock,
    setCounter,
} from "./utils.js";

export const setCounterHandler = function (event) {
    event.preventDefault();
    const selector = this.querySelector("select"),
        blockId = selector.value,
        block = getBlockById(blockId),
        counter = getCounterFormBlock(block);
    setCounter(counter, blockId);
};
export const blockHandler = function (event) {
    event.preventDefault();
    const isButton = event.target.tagName.toLowerCase() == "button";
    if (isButton) {
        increaseCounterValue(this);
    }
};

export const clearCounterHandler = function (blocks) {
    return function (event) {
        event.preventDefault();
        blocks.forEach((block) => {
            resetCounterBlock(block);
        });
    };
};
