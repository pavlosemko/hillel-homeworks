window.onload = function () {
    // class Table {
    //     #table;
    //     #createTable = () => document.createElement("table");
    //     #createRow = () => document.createElement("tr");
    //     #createCeil = () => document.createElement("td");
    //     constructor() {
    //         this.#table = this.#createTable();
    //     }
    //     genTableBodyByArray(array) {
    //         for (const iterator of array) {
    //             const row = this.#createRow();
    //             for (const data of iterator) {
    //                 const cell = this.#createCeil();
    //                 cell.innerText = data;
    //                 row.append(cell);
    //             }
    //             this.#table.append(row);
    //         }
    //     }
    //     appendTo(element) {
    //         element.append(this.#table);
    //     }
    //     get render() {
    //         return this.#table;
    //     }
    // }

    // const createSequentialArray = (rows, cols) => {
    //     const array = new Array(rows);
    //     for (let i = 0; i < rows; i++) {
    //         array[i] = new Array(cols);
    //         for (let j = 0; j < cols; j++) {
    //             array[i][j] = i * cols + j + 1;
    //         }
    //     }
    //     return array;
    // };

    // const array = createSequentialArray(10, 10);

    // const table = new Table();
    // table.genTableBodyByArray(array);
    // table.appendTo(document.body);

    const createElByTagName = (tag) => document.createElement(tag);
    const createCell = () => createElByTagName("td");
    const createRow = () => createElByTagName("tr");
    const createTable = () => createElByTagName("table");

    const createSequentialArray = (rows, cols) => {
        const array = new Array(rows);
        for (let i = 0; i < rows; i++) {
            array[i] = new Array(cols);
            for (let j = 0; j < cols; j++) {
                array[i][j] = i * cols + j + 1;
            }
        }
        return array;
    };
    const fillTableByArray = (table, array) => {
        for (const iterator of array) {
            const row = createRow();
            for (const data of iterator) {
                const cell = createCell();
                cell.innerText = data;
                row.append(cell);
            }
            table.append(row);
        }
        return table;
    };
    const arr = createSequentialArray(10, 10);
    const table = createTable(table, arr);
    fillTableByArray(table, arr);
    document.body.append(table);
    
};
