const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

const filters = {
    filter_stock: (product, stock) => {
        const isStock = stock === "true";
        return product.productStock === isStock;
    },
    filter_priceFrom: (product, priceFrom) => {
        const productPrice = parseFloat(product.productPrice);
        priceFrom = parseFloat(priceFrom);
        return productPrice >= priceFrom;
    },
    filter_priceTo: (product, priceTo) => {
        const productPrice = parseFloat(product.productPrice);
        priceTo = parseFloat(priceTo);
        return productPrice <= priceTo;
    },
    filter_name: (product, name) => {
        return product.productName.toLowerCase().includes(name.toLowerCase());
    },
};

const matcher = ({ key, product, queryValue }) => {
    const filter = filters[`filter_${key}`];
    if (typeof filter !== "function") {
        console.warn(`Filter for ${key} is not defined`);
        return true;
    }

    if (!product || !queryValue) return false;

    return filter(product, queryValue);
};

const getFilteredProducts = (products, query) => {
    const keys = Object.keys(query);
    return products.filter((product) =>
        keys.every((key) =>
            matcher({
                key,
                product: product,
                queryValue: query[key],
            })
        )
    );
};

const getData = () => {
    return JSON.parse(fs.readFileSync("data.json"));
};

app.get("/products", (req, res) => {
    const { query } = req;
    const data = getData();
    const filteredProducts = getFilteredProducts(data, query);

    res.json(filteredProducts);
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const data = getData();
    const product = data.find((item) => item.productId === parseInt(id));

    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    res.json(product);
});

app.get("/products_by_name/:name/", (req, res) => {
    const { params } = req;
    const data = getData();
    const filteredProducts = getFilteredProducts(data, params);
    res.json(filteredProducts);
});
// чи через query
// app.get("/products_by_name/", (req, res) => {
//     const { query } = req;
//     const data = getData();
//     const filteredProducts = getFilteredProducts(data, query);
//     res.json(filteredProducts);
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
