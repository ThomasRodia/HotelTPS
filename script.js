const struttura_albergo = {
  singola: 10,
  doppia: 5,
  suite: 3,
}

let informazioni = {};

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
      informazioni[info[0]][key[3]] -= info[3];
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

const creaBase = () => {
  let tipiStanze = {"Data": "date"};
  Object.keys(struttura_albergo).forEach(e => tipiStanze[e] = "text");
  return tipiStanze;
}

const table1 = createTable(document.getElementById('tabella'));
const response = document.getElementById("response");
const booker = createForm(document.getElementById("book"));

table1.build([Object.keys(creaBase)])
table1.render();

booker.onsubmit((values) => {});
booker.setLabels(creaBase());
booker.render(); 

