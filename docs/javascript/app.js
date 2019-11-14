// setup api url and query
const url =    'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-27/sparql';
const query = `
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX edm: <http://www.europeana.eu/schemas/edm/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT * 
    WHERE {
        <https://hdl.handle.net/20.500.11840/termmaster1397> skos:narrower* ?type .
        ?type skos:prefLabel ?typeLabel.
        ?cho edm:object ?type.
        # ?cho dc:title ?title.
        # FILTER langMatches(lang(?title), "ned")

        # kijk of het woord portret voorkomt in de title of de description
                ?cho (dc:title | dc:description) ?beschrijving.   
                FILTER(REGEX(?beschrijving, "portret"))  
            

                # Geef evt. een verwijzing naar het plaatje als het er is
                OPTIONAL {
                    ?cho dc:title ?titel.
                    ?cho dct:created ?date.
                    ?cho foaf:depiction ?imgLink.

                }

            }LIMIT 10000`;

        const fetchData = d3.json(url+'?query='+encodeURIComponent(query)+'&format=json')
        .then(function(data) {
             console.log(data)

            return data.results.bindings
          });

          fetchData.then(function (data) {

            // Check if properties contain images.

            let gallerij = data.filter(obj => Object.keys(obj)
            .includes("imgLink")
            
            );
            // Delete properties that are not needed
            gallerij.forEach(element =>  {
                delete element.cho
                delete element.type
                delete element.typeLabel
            });

            // Clean date to uniform 
            // console.log("galerij: ", gallerij)

            // const maanden = ["januari", "februari","maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]

             gallerij.forEach(element => {
                 
                 element.date.value = element.date.value
                 .toLowerCase()
                 .replace("ca. ", "")
                 .replace("ca.", "")
                 .replace("voor", "")
                 .replace("/", " ")
                 //vervang alle streepjes in de data
                 .replace(/-/g, " ")
                 //.replace(/\D/g, "")

                 
                 //Replace alle maanden
                 .replace("januari", "")
                 .replace("februari", "")
                 .replace("maart", "")
                 .replace("april", "")
                 .replace("mei", "")
                 .replace("juni", "")
                 .replace("juli", "")
                 .replace("augustus", "")
                 .replace("september", "")
                 .replace("oktober", "")
                 .replace("november", "")
                 .replace("december", "")

                 //Vervang alle numerieke maanden
                .trim(" ")

                //only keep last year from entry
                .substr(-4, 4)

                // String naar nummer
                element.date.value = parseInt(element.date.value)
                // console.log(element.date.value)
                // console.log("hey: ", element.date.value)
                // Titel cleanup
                element.titel.value = element.titel.value
                // .toLowerCase()
                .trim()
                // console.log(element.titel.value)


                // Beschrijving Cleanup
                element.beschrijving.value = element.beschrijving.value
                .trim()
                // Als er geen beschrijving beschikbaar is. Informeer dan de gebruiker.
                if(element.beschrijving.value == ""){
                    element.beschrijving.value = "Er is geen beschrijving beschikbaar"
                }
                //console.log(element.beschrijving.value)

            })

            console.log(gallerij)



// !!! UNUSED CODE !!!

 
//  console.log(gallerij);
              
            
            // for (let i=0; i < data.length; i++){
            //     let objectItem = data[i];
            //     // objectItem.cho = objectItem.cho.value;
            //     // objectItem.type = objectItem.type.value;
            //     // console.log(i)
            //     // objectItem.date = objectItem.date.value;

            //     // if (objectItem.image == undefined) {
            //     //     objectItem.image = null
            //     //     return objectItem.image
            //     // }

            //     if (objectItem.imgLink) {
            //         objectItem.image = objectItem.imgLink.value
                    
            //     } else {
            //         delete objectItem
            //     }
                    

                // if objectItem.

            //     console.log(objectItem.image)

    
            // }
            // return data

                        
       // handle data
    //    const handleData = (json) =>{
    //        let bindings =  json.results.bindings;
    //        for (let i=0; i < bindings.length; i++){
    //            let objectItem = bindings[i];
    //            objectItem.cho = objectItem.cho.value;
    //            objectItem.placeName = objectItem.placeName.value;
    //            objectItem.title = objectItem.title.value;
    //            objectItem.type = objectItem.type.value;
    //            objectItem.image = objectItem.imageLink.value;
    //        }
    //        console.log(bindings);
    //        return bindings
    //    };
       // fetch data

       
    //    fetch(url+'?query='+encodeURIComponent(query)+'&format=json')
    //        .then(res => res.json())
    //        .then(handleData => {

    //         console.log(handleData)
    //         handleData.map()

    //        })
    //        .catch(err => console.error(err));

    // Fetch Query
            

          });
          