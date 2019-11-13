
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

             
            }LIMIT 1485`;
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

        const fetchData = d3.json(url+'?query='+encodeURIComponent(query)+'&format=json')
        .then(function(data) {
             console.log(data)

            return data.results.bindings
          });




          fetchData.then(function (data) {
              
            
            for (let i=0; i < data.length; i++){
                let objectItem = data[i];
                objectItem.cho = objectItem.cho.value;
                objectItem.type = objectItem.type.value;
                objectItem.image = objectItem.imgLink;
                objectItem.date = objectItem.date;

                // if objectItem.

                console.log(objectItem.image)

    
            }
            return data
            

          });
          