
    // Create Dino Constructor
    function createDinosaur(dinox){
        
        // Object properties.
        this.species = dinox.species;
        this.image = './images/' + dinox.species + '.png';
        this.height = dinox.height;
        this.weight = dinox.weight;
        this.diet = dinox.diet;
        this.when = dinox.when;
        this.where =dinox.where;
        this.fact = dinox.fact;
        this.dinoFacts = new Array();
        this.compareHeight = compareHeight;
        this.compareWeight = compareWeight;
        this. compareDiet = compareDiet;

        // Pre-build array of facts in object, for later.        
        let keys = Object.keys(dinox);
        if (this.species == 'Pigeon'){
            this.dinoFacts.push(dinox.fact) ;
        } 
        else
        {
            var fact  = '';
            keys.forEach(function(key){
                switch (key){
                    case 'weight':
                        fact =   'It weighed ' + this.weight + ' pounds.';
                        break;
                    case 'height':
                        fact =  'It was ' + this.height + ' inches tall.';
                        break;
                    case 'diet':
                        fact =   'It ate a ' + this.diet + ' diet.';
                        break;
                    case 'when':
                        fact = 'It lived in the ' + this.when + ' Period.';
                        break;
                    case 'where':                       
                        fact = 'It lived in ' + this.where + '.'; 
                        break;
                    case 'fact':
                        fact = this.fact;
                        break;               
                };
                // Don't push empty fact for species.                     
                fact.length == 0?null:this.dinoFacts.push(fact);
            }, this);
                 
        } 
    }

    

    // Read data.
    import data from './dino.json' with  {type : 'json'};

   
    // Create Dino Objects
    function createDinoObjects(){
            let dinos = new Array();
            data.Dinos.forEach(function(dinoItem){
                var dino = new createDinosaur(dinoItem);
                dinos.push(dino);                
            });
 
        return dinos;
    }

 

   


    // Create Human Object    
  

    // Use IIFE to get human data from form
    function getHuman (){
        let human = {
 
        };
        let name = document.getElementById('name').value;
        let feet = document.getElementById('feet').value;
        let feetToInches = feet * 12;
        let inches = document.getElementById("inches").value;
        let humanHeight = feetToInches + inches;
        human.humanHeight  = humanHeight;
        human.weight  = document.getElementById("weight").value;
        human.diet  = document.getElementById("diet").value;
        human.name = name
        human.image = './images/human.png'
        return human;
    };

    

    



    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareHeight (human){
        let strRslt = "";
        if (this.height > human.height)
        {
            strRslt = 'The ' + this.species + ' is taller than this human.'   
        }
        else if (this.height < human.height)
        {
            strRslt = 'This human  is taller than a ' + this.species;   
        }
        else 
        {
            strRslt = 'This human is the same height as ' + this.species; 
        }

        return strRslt;

    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareWeight (human){
        let strRslt = "";
        if (this.weight > human.weight)
        {
            strRslt = 'The ' + this.species + ' is heavier than this human.'   
        }
        else if (this.height < human.height)
        {
            strRslt = 'This human  is heavier than a ' + this.species;   
        }
        else 
        {
            strRslt = 'This human is the same weight as ' + this.species; 
        }

        return strRslt;

    }
    
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet (human){
        let strRslt = "";
        console.log(this);
        if (this.diet == human.diet)
        {
            strRslt = 'The ' + this.species + ' and the human are both ' + human.diet + '.'   
        }
        else
        {
            strRslt = 'The ' + this.species + ' eats a ' + this.diet + ' diet, and the human eats a ' + human.diet + ' diet.';   
        }

        return strRslt;

    }

    
    
    function showDom ()
    {
        let dinos = createDinoObjects();
        let human = getHuman();

        // Generate Tiles for each Dino in Array
            console.log(dinos)
            let tiles = [];
            let counter = 0;
            dinos.forEach( function(dino){
                let heightComp  = dino.compareHeight(human);
                let weightComp  = dino.compareWeight(human);
                let dietComp  = dino.compareDiet(human);
                if (dino.species != 'pigeon')
                {   
                    dino.dinoFacts.push(heightComp);
                    dino.dinoFacts.push(weightComp);
                    dino.dinoFacts.push(dietComp);
                }
                // Not sure what to do with  the results of compares, there were no instructions given.
                
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                let title = dino.species;
                const h3 = document.createElement('h3');
                h3.innerText = title;
                gridItem.appendChild(h3);
                const img = document.createElement('img');
                img.src = dino.image;
                gridItem.appendChild(img);
                const p = document.createElement('p');
                let randIdx = Math.floor(Math.random() * dino.dinoFacts.length);              
                if (dino.species == "pigeon") {
                    p.innerText = dino.fact
                }
                else {
                    p.innerText = dino.dinoFacts[randIdx]
                }                
                gridItem.appendChild(p);
                tiles.push(gridItem);
        })

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        let title = human.name;
        const h3 = document.createElement('h3');
        h3.innerText = title;
        gridItem.appendChild(h3);
        const img = document.createElement('img');
        img.src = human.image;
        gridItem.appendChild(img);
        const p = document.createElement('p');
        gridItem.appendChild(p);
        tiles.splice(4,0,gridItem);

        // Add tiles to DOM

        const main = document.getElementById("grid");
        tiles.forEach( function (tile){            
            main.appendChild(tile);
        })
       

        // Remove form from screen
    
        document.getElementById("dino-compare").remove();
    }

// On button click, prepare and display infographic
document.getElementById ("btn").addEventListener ("click", showDom, false);