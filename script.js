const struttura_albergo = {
    singola: 10,
    doppia: 5,
    suite: 3
}

// usare form ciclo 
let data=document.getElementById('data');
let camera_singola_input=document.getElementById('single');
let camera_doppia_input=document.getElementById('double');
let camera_suit_input=document.getElementById('suite');
let invia=document.getElementById('send');



let informazioni = {};//prendere i valori dalla cache remota
//richiamare subito la render 



const table1 = createTable(document.getElementById('tabella'));

invia.onclick = () => {
    let fin= data.value+","+camera_singola_input.value+","+camera_doppia_input.value+","+camera_suit_input.value;
    data.value="";
   
    controllacamere(fin);
    render();
  };


















function controllacamere(dati){
    let key=Object.keys(struttura_albergo);
let info=dati.split(",");
if(informazioni[info[0]]==! null){
if(
informazioni[info[0]][key[0]]>info[1]&&
informazioni[info[0]][key[1]]>info[2]&&
informazioni[info[0]][key[2]]>info[3]){
    informazioni[info[0]][key[1]]-=info[1];
    informazioni[info[0]][key[2]]-=info[2];
    informazioni[info[0]][key[3]]-=info[3];// fare chiamata 
}else{
    console.log("Impossibile effettuare prenotazione")
}
}else{
    informazioni[info[0]]=struttura_albergo;
controllacamere(dati);
}

  };













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





  /*
  {
    01/01/2024:{
                singola:8,
                doppia:4,
                suite 1,
               }
    02/01/2024{
               singola:1,
                doppia:2,
                suite 0,
    }
  }
  */

  function render(){
    camera_singola_input.value="";
    camera_doppia_input.value="";
    camera_suit_input.value="";
    let key=Object.keys(struttura_albergo);
    let chiavi=Object.keys(informazioni);
    let size=chiavi.length;
    let tab=[["Date", key[0],key[1],key[3]]]
    for (let i = 0;i<size;i++){
    let arr=[chiavi[i],informazioni[chiavi[i]][key[0]],informazioni[chiavi[i]][key[1]],informazioni[chiavi[i]][key[2]]]
    tab.push(arr);
  }
    table1.build(tab);
    table1.rendert();

  }
