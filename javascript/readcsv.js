async function importDataset(){
    let dataset =  await d3.csv("../files/kleuren.csv")

   // Onderstaande code haalt alle waardes uit de data die niet overeenkomen met het "#000000" format. En past deze aan naar het juiste format. 
    let lijst = dataset
                .map(element => {

         let kleurwaarde = element["Lievelingskleur (HEX code)"];
        kleurwaarde = kleurwaarde.replace("#","").replace(" ","");


        if (kleurwaarde.length == 6) {
          } else {
              kleurwaarde = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}); 
              
              // dit stukje gejat van stackoverflow. Genereert een random hexcode terug zodat de totale data niet extreme waardes aanneemt.
          }

        return ("#" + kleurwaarde);  //voegt weer een # toe aan de hexreeks.
    })
    console.log(lijst)
}
importDataset()