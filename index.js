window.onload = function () {
    class Table {
        #table;
        get #createTable() {
            return document.createElement("table");
        }
        get #createRow() {
            return document.createElement("tr");
        }
        get #createCeil() {
            return document.createElement("td");
        }
        constructor() {
            this.#table = this.#createTable;
        }
        genTableBodyByArray(array) {
            for (const iterator of array) {
                const row = this.#createRow;
                for (const data of iterator) {
                    const cell = this.#createCeil;
                    cell.innerText = data;
                    row.append(cell);
                }
                this.#table.append(row);
            }
        }
        appendTo(element) {
            element.append(this.#table);
        }
        get render() {
            return this.#table;
        }
    }

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

    const array = createSequentialArray(10, 10);

    const table = new Table();
    table.genTableBodyByArray(array);
    table.appendTo(document.body);
};


