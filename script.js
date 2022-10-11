window.onload = function () {
    
    let numero;
    let cont;
    let arrayDeCores = ['yellow', 'blue', 'red'];
    let paletaDeCores = document.querySelector("#color-palette").children
    let click = document.getElementById("button-random-color");
    let coresSalvas = JSON.parse( localStorage.getItem('colorPalette') );
    colorInit();
    let colorSave = JSON.parse( localStorage.getItem('colorSelect') );
    click.addEventListener("click", coresAleatorias);     
    
    selected();
    
    if(localStorage.getItem('colorPalette')){  
        paletaDeCores[1].setAttribute("id", coresSalvas[0]);
        paletaDeCores[2].setAttribute("id", coresSalvas[1]);
        paletaDeCores[3].setAttribute("id", coresSalvas[2]);    
    }else{
        paletaDeCores[1].setAttribute("id", arrayDeCores[0]);
        paletaDeCores[2].setAttribute("id", arrayDeCores[1]);
        paletaDeCores[3].setAttribute("id", arrayDeCores[2]);   
    }; 

    let click2 = document.getElementById("color-palette");
    click2.addEventListener("click", ()=>{
        let colorSelect = event.target;
        for(let i = 0; i < paletaDeCores.length; i +=1){
            paletaDeCores[i].className = "color";
        }    
        colorSelect.setAttribute("class", "color selected");
    });
    
    function gravarEscolha(a,b) {
        if( coresSalvas ){
            localStorage.removeItem(coresSalvas);  
        }else{
            localStorage.setItem(a,JSON.stringify(b));
        };
        if( colorSave ){
            localStorage.removeItem(colorSave);  
        }else{
            localStorage.setItem(a,JSON.stringify(b));
        };
        if( pixelBoard ){
            localStorage.removeItem(pixelBoard);  
        }else{
            localStorage.setItem(a,JSON.stringify(b));
        };
        
    };
    
    function coresAleatorias() {
        numero = Math.floor(Math.random() * 2) +1;
        
        if(numero == cont){
            numero +=1
        }
        
        let newPaletaDCores = [];
        switch (numero) {
            case 3:
                newPaletaDCores.push(paletaDeCores[1].id = arrayDeCores[0]);
                newPaletaDCores.push(paletaDeCores[2].id = arrayDeCores[1]);
                newPaletaDCores.push(paletaDeCores[3].id = arrayDeCores[2]);          
                break;
                case 2:
                    newPaletaDCores.push(paletaDeCores[1].id = arrayDeCores[2]);
                    newPaletaDCores.push(paletaDeCores[2].id = arrayDeCores[0]);
                    newPaletaDCores.push(paletaDeCores[3].id = arrayDeCores[1]);
                break;
            default:
                newPaletaDCores.push(paletaDeCores[1].id = arrayDeCores[1]);
                newPaletaDCores.push(paletaDeCores[2].id = arrayDeCores[2]);
                newPaletaDCores.push(paletaDeCores[3].id = arrayDeCores[0]);
                break;          
        }
        cont = numero;
        gravarEscolha('colorPalette',newPaletaDCores);          
    }
    
    let pixelClick = document.getElementById( "color-palette");
    pixelClick.addEventListener("click",()=> {
        let pixelSelect = event.target.id;
        gravarEscolha("colorSelect",pixelSelect);
    });
    
    let pixels = document.getElementById("pixel-board");
    pixels.addEventListener("click",()=> {
        let pixels = event.target;
        pixels.id = JSON.parse( localStorage.getItem('colorSelect'));
        let listPixels = document.querySelector("#pixel-board");
        const obj = [listPixels.innerHTML];
        gravarEscolha("pixelBoard", obj);
    });
    
    let buttonReset = document.getElementById("clear-board");
    buttonReset.addEventListener("click",()=>{
        tabelaPixels = document.querySelectorAll(".pixel")
        for(let i = 0; i < tabelaPixels.length; i+=1 ){
            tabelaPixels[i].setAttribute("id", "white")
        };        
    });
}    

let pixelBoard  = JSON.parse( localStorage.getItem('pixelBoard') );
let tabelaPixels = document.querySelector("#pixel-board");
function createSquadPixels(tabelaPixels){
    if( pixelBoard ){
        let pixelBoardSalve = pixelBoard[0];
        tabelaPixels.innerHTML = pixelBoardSalve;
    }else{
        for(let i = 0; i < 5; i += 1){
            let divBlock = document.createElement("div");
            for(let j = 0; j < 5; j += 1){
                let divLine = document.createElement("div")
                divLine.className ="pixel";
                divBlock.appendChild(divLine);
                if(j === 4){
                    tabelaPixels.appendChild(divBlock);
                }
            }        
        }
    }   
}
createSquadPixels(tabelaPixels);

let button = document.querySelector("#button");
function createbutton(button,typeButton,id,text){
    let buttonCreate = document.createElement(typeButton);
    buttonCreate.id = id;
    buttonCreate.innerText = text;
    button.appendChild(buttonCreate);
}
createbutton(button,"button","button-random-color","Cores aleatórias");
createbutton(button,"button","clear-board","Limpar");
createbutton(button,"input","board-size","Pixels");
createbutton(button,"button","generate-board","VQV");


let colorSelect = document.querySelector(".selector");
function createSelectorColorPalette(colorSelect){
    for(let i = 0; i < 4; i+=1){
        let div = document.createElement("div");
        div.className = "color";
        colorSelect.appendChild(div);
    }
}
createSelectorColorPalette(colorSelect);

function selected(){
    let paletaDeCores = document.querySelector("#color-palette").children
    paletaDeCores[0].setAttribute("class","color selected");
    paletaDeCores[0].setAttribute("id","black");
};

function colorInit(){
    localStorage.removeItem("colorSelect");  
    localStorage.setItem("colorSelect",JSON.stringify("black"));
};
