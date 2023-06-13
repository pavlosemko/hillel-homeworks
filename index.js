window.onload = function () {
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const randomImg = getRandomNumber(1, 9),
        imgPath = `./images/${randomImg}.jpeg`,
        img = document.createElement("img");
    img.src = imgPath;
    document.body.prepend(img);
};
