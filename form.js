// Creata la form
const createForm = (parentElement) => {
    let data;
    let callback = null;

    return {
        setLabels: (labelsAndType) => {
            data = labelsAndType;
        },
        onsubmit: (callbackInput) => {
            callback = callbackInput
        },
        render: () => {
            for (let key in data) {
                parentElement.innerHTML += `<div>${key}\n<input id="${key}" type="${data[key]}"/></div>` + '\n';
            }
            parentElement.innerHTML += "<button type='button' id='submit'>Submit</button>";

            document.querySelector("#submit").onclick = () => {
                const result = Object.keys(data).map((name) => {
                    return document.querySelector("#" + name).value;
                });

                Object.keys(data).forEach(e => document.querySelector("#" + e).value = "")

                callback(result);
            }
        }
    }
}