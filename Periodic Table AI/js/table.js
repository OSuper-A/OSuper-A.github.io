import { openPopup } from "./popup.js";

export function createTable(elements) {

    const table = document.getElementById("periodic-table");
    table.innerHTML = "";

    // Quick lookup by symbol
    const elementMap = {};
    elements.forEach(e => elementMap[e.symbol] = e);

    // Main periodic table layout
    const layout = [
        ["H","","","","","","","","","","","","","","","","","He"],

        ["Li","Be","","","","","","","","","","","B","C","N","O","F","Ne"],

        ["Na","Mg","","","","","","","","","","","Al","Si","P","S","Cl","Ar"],

        ["K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr"],

        ["Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe"],

        ["Cs","Ba","★","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn"],

        ["Fr","Ra","☆","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"]
    ];

    // Build main table
    layout.forEach(row => {

        row.forEach(symbol => {

            const tile = document.createElement("div");

            if(symbol === ""){

                tile.className = "empty";

            }

            else if(symbol === "★"){

                tile.className = "element placeholder";

                tile.innerHTML = `
                    <div class="symbol">★</div>
                    <div class="name">57–71</div>
                `;

            }

            else if(symbol === "☆"){

                tile.className = "element placeholder";

                tile.innerHTML = `
                    <div class="symbol">☆</div>
                    <div class="name">89–103</div>
                `;

            }

            else{

                const e = elementMap[symbol];

                tile.className = `element ${e.category}`;

                tile.dataset.element = JSON.stringify(e);

                tile.dataset.name = e.name;
                tile.dataset.symbol = e.symbol;
                tile.dataset.number = e.number;
                tile.dataset.category = e.category;

                tile.innerHTML = `
                    <div class="number">${e.number}</div>
                    <div class="symbol">${e.symbol}</div>
                    <div class="name">${e.name}</div>
                `;

                tile.addEventListener("click",()=>openPopup(e));

            }

            table.appendChild(tile);

        });

    });

    // Spacer
    for(let i=0;i<18;i++){

        const spacer=document.createElement("div");

        spacer.className="empty";

        table.appendChild(spacer);

    }

    // Lanthanides label
    addLabel(table,"Lanthanides");

    // Lanthanides
    addSeries(table,elements.filter(e=>e.number>=57&&e.number<=71));

    // Spacer
    for(let i=0;i<18;i++){

        const spacer=document.createElement("div");

        spacer.className="empty";

        table.appendChild(spacer);

    }

    // Actinides label
    addLabel(table,"Actinides");

    // Actinides
    addSeries(table,elements.filter(e=>e.number>=89&&e.number<=103));

}

function addSeries(table,series){

    // indent 3 columns
    for(let i=0;i<3;i++){

        const blank=document.createElement("div");

        blank.className="empty";

        table.appendChild(blank);

    }

    series.forEach(e=>{

        const tile=document.createElement("div");

        tile.className=`element ${e.category}`;
        tile.dataset.element = JSON.stringify(e);

        tile.dataset.name = e.name;
        tile.dataset.symbol = e.symbol;
        tile.dataset.number = e.number;
        tile.dataset.category = e.category;

        tile.innerHTML=`
            <div class="number">${e.number}</div>
            <div class="symbol">${e.symbol}</div>
            <div class="name">${e.name}</div>
        `;

        tile.onclick=()=>openPopup(e);

        table.appendChild(tile);

    });

}

function addLabel(table,text){

    const label=document.createElement("div");

    label.className="series-label";

    label.textContent=text;

    table.appendChild(label);

    for(let i=1;i<18;i++){

        const blank=document.createElement("div");

        blank.className="empty";

        table.appendChild(blank);

    }

}