const express = require("express");
const app = express();

app.get("/products", (req, res) => {
    const { limit = 5 } = req.query;
    const products = generateRandomProducts(limit);
    res.json(products);
});

function generateRandomProducts(count) {
    const products = [];
    for (let i = 0; i < parseInt(count); i++) {
        const product = {
            id: i + 1,
            name: `Product ${i + 1}`,
            price: getRandomPrice(10, 100),
        };
        products.push(product);
    }
    return products;
}

function getRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
