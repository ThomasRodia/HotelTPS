
const myToken = '51b11384-64a9-4944-9156-ddf968153a6f';
const myKey = 'tesoro';

const struttura_albergo = {
  singola: 10,
  doppia: 5,
  suite: 3,
}

let informazioni = {};

function sottraiArray(arr1, arr2) {
  return arr1.map((num, index) => num - arr2[index]);
}

function positivo(arr) {
  return arr.every(num => num >= 0);
}

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
  let tipiStanze = { "Data": "date" };
  Object.keys(struttura_albergo).forEach(e => tipiStanze[e] = "text");
  return tipiStanze;
}

const table1 = createTable(document.getElementById('tabella'));
const response = document.getElementById("response");
const booker = createForm(document.getElementById("book"));

booker.onsubmit((values) => {

  let available = Object.values(struttura_albergo);

  // Controlla che nn ci siano gia prenotazioni nella cache
  prendiDati(myKey, myToken)
    .then(data => {
      const key = values[0];
      if (data[key]) {
        available = data[key];
      }
      const arrayDiff = sottraiArray(available, values.slice(1));
      console.log(arrayDiff);

      if (positivo(arrayDiff)) {
        response.innerHTML = "ok";
        salvaDati(values[0], arrayDiff).then(() => {
          initTable().then(tableStructure => {
            table1.build(tableStructure);
            table1.render();
          });
        });
      } else {
        response.innerHTML = "ko";
      };
    }).then(() => {
      table1.render();
    });

});


const salvaDati = (data, camere) => {
  return new Promise((resolve, reject) => {
    prendiDati(myKey, myToken)
      .then(vecchiDati => {
        const nuoviDati = {
          ...vecchiDati,
          [data]: camere
        };
        fetch('http://ws.cipiaceinfo.it/cache/set', {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "key": myToken
          },
          body: JSON.stringify({
            key: myKey,
            value: JSON.stringify(nuoviDati)
          })
        })
          .then(r => r.json())
          .then(result => {
            resolve(result);
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
}

const prendiDati = (myKey, myToken) => {
  return new Promise((resolve, reject) => {
    fetch('http://ws.cipiaceinfo.it/cache/get', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "key": myToken
      },
      body: JSON.stringify({
        key: myKey
      })
    })
      .then(r => r.json())
      .then(r => {
        const data = JSON.parse(r.result);
        resolve(data);
      })
      .catch(error => reject(error));
  });
}

booker.setLabels(creaBase());
booker.render();


initTable().then(tableStructure => {
  table1.build(tableStructure);
  table1.render();
});