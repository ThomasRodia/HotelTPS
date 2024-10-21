const struttura_albergo = {
  singola: 10,
  doppia: 5,
  suite: 3,
}

let informazioni = {};

const createTable = (parentElement) => {
  let data;
  return {
    build: (dataInput) => {
      data = dataInput;
    },
    rendert: () => {
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

const table1 = createTable(document.getElementById('tabella'));
const response = document.getElementById("response");


function controllaCamere(dati) {
  let key = Object.keys(struttura_albergo);
  let info = dati.split(",");
  if (informazioni[info[0]] == ! null) {
    if (
      informazioni[info[0]][key[0]] > info[1] &&
      informazioni[info[0]][key[1]] > info[2] &&
      informazioni[info[0]][key[2]] > info[3]) {
      informazioni[info[0]][key[1]] -= info[1];
      informazioni[info[0]][key[2]] -= info[2];
      informazioni[info[0]][key[3]] -= info[3];// fare chiamata 
    } else {
      console.log("Impossibile effettuare prenotazione")
    }
  } else {
    informazioni[info[0]] = struttura_albergo;
    controllacamere(dati);
  }
};

function render() {
  camera_singola_input.value = "";
  camera_doppia_input.value = "";
  camera_suit_input.value = "";

  let key = Object.keys(struttura_albergo);
  let chiavi = Object.keys(informazioni);
  let size = chiavi.length;
  let tab = [["Date", key[0], key[1], key[3]]]

  for (let i = 0; i < size; i++) {
    let arr = [chiavi[i], informazioni[chiavi[i]][key[0]], informazioni[chiavi[i]][key[1]], informazioni[chiavi[i]][key[2]]]
    tab.push(arr);
  }

  table1.build(tab);
  table1.rendert();
}

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

let booker = createForm(document.getElementById("book"));

console.log(booker);

booker.setLabels({
  "Data": "date",
  "Single": "text",
  "Double": "text",
  "Suite": "text",
});

booker.onsubmit((values) => {
  
  

});

booker.render();


