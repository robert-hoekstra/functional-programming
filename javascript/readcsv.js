async function importDataset(){
    let dataset =  await d3.csv("../files/kleuren.csv")

    // dataset.forEach(function(element){
    //     element["Lievelingskleur (HEX code)"].split("#");
    //  //   console.log(element)

    // })

    let lijst = dataset
                .map(element => {

         let piet =  element["Lievelingskleur (HEX code)"];
        // console.log(piet.replace("#","") )   
        piet = piet.replace("#","").replace(" ","");
        console.log(piet)

        return element;
    })
    //console.log(lijst)
}
importDataset()