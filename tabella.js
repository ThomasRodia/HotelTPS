// Crea la tabella
const createTable = (parentElement) => {
    let data;
    return {
        build: (dataInput) => {
            data = dataInput;
        },
        render: () => {
            let htmlTable = "<table>";
            htmlTable += data.map((row) =>
                "<tr>" + row.map((col) =>
                    "<td>" + col + "</td>"
                ).join("")
            ).join("") + "</tr>";
            htmlTable += "</table";
            parentElement.innerHTML = htmlTable;
        }
    }
}

const initTable = () => {
    return new Promise((resolve) => {
        let tableStructure = [Object.keys(creaBase())];
        
        const getDateKey = (date) => {
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        };

        prendiDati(myKey, myToken)
            .then(data => {
                const dataMonth = {};
                for (let i = 0; i < 30; i++) {
                    const d = new Date();
                    d.setDate(d.getDate() + i);
                    const key = getDateKey(d);
                    dataMonth[key] = !data[key] ? Object.values(struttura_albergo) : data[key];
                    tableStructure.push([key, ...dataMonth[key]]);
                }
                resolve(tableStructure);
            });
    });
}