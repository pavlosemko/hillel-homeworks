window.onload = function () {
    const step = 10,
        array = new Array(step).fill(new Array(step)),
        table = document.createElement("table");
    let inner = 1;
    array.forEach(function (row) {
        const tr = document.createElement("tr");
        let counter = row.length;
        while (counter--) {
            const td = document.createElement("td");
            td.innerHTML = inner++;
            tr.append(td);
        }
        table.append(tr);
    });

    const table2 = document.createElement("table");
    for (let i = 0; i < step; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < step; j++) {
            const cell = document.createElement("td");
            const value = i * step + j + 1;
            const text = (document.innerText = value);
            cell.append(text);
            row.append(cell);
        }

        table2.append(row);
    }

    const fragment = document.createDocumentFragment();
    fragment.append(table);
    fragment.append(table2);

    document.body.append(fragment);
};
