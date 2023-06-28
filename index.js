import {
    blockHandler,
    clearCounterHandler,
    setCounterHandler,
} from "./handlers.js";

import {
    getValueFromLSAndAddToCounter,
    setCountersToSelector,
} from "./utils.js";

function main() {
    const blocks = [...document.querySelectorAll(".block")],
        clearCounter = document.getElementById("clearCounter"),
        setCounters = document.getElementById("setCounters");

    setCountersToSelector(blocks, setCounters);

    clearCounter.addEventListener("click", clearCounterHandler(blocks));

    setCounters.addEventListener("submit", setCounterHandler);

    blocks.forEach((block) => {
        getValueFromLSAndAddToCounter(block);
        block.addEventListener("click", blockHandler);
    });
};
window.onload = main
