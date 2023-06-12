window.onload = function () {
    const getCommision = function (number) {
        const comissionMap = {
            20: 4,
            50: 6,
            75: 8,
        };
        let comission = 2;
        Object.keys(comissionMap).forEach((element) => {
            if (number >= parseFloat(element)) {
                comission = comissionMap[element];
            }
        });
        return comission;
    };

    const calcRedHeight = (v, c) => v * (c / 100);
    const validateValueAndGet = (context) => {
        const min = 0,
            max = 100,
            cntxValue = context.value,
            value = isNaN(parseInt(cntxValue)) ? 0 : parseInt(cntxValue);

        if (value > max) {
            context.value = max;
            return max;
        } else if (value < min) {
            context.value = min;
            return min;
        }

        return value;
    };
    const changeGraphHeight = (green, red, value, comission) => {
        green.style.height = `${value}px`;
        red.style.height = `${calcRedHeight(value, comission)}px`;
    };

    function renderGraph(input) {
        const green = document.querySelector(".green"),
            red = document.querySelector(".red");

        return function () {
            const value = validateValueAndGet(this),
                comission = getCommision(value);
            changeGraphHeight(green, red, value, comission);
            input.value = value;
        };
    }

    const number = document.getElementById("number"),
        range = document.getElementById("range");
    

    number.addEventListener("input", renderGraph(range));
    range.addEventListener("input", renderGraph(number));
};
