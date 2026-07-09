export function initializeTooltip() {

    const tooltip = document.getElementById("tooltip");

    document.addEventListener("mouseover", e => {

        const tile = e.target.closest(".element");

        if(!tile) return;

        if(tile.classList.contains("placeholder")) return;

        const element = JSON.parse(tile.dataset.element);

        document.getElementById("tip-name").textContent = element.name;

        document.getElementById("tip-symbol").textContent = element.symbol;

        document.getElementById("tip-number").textContent = element.number;

        document.getElementById("tip-mass").textContent = element.atomicMass;

        document.getElementById("tip-category").textContent =
            capitalize(element.category);

        tooltip.style.display = "block";

    });

    document.addEventListener("mousemove", e=>{

        tooltip.style.left = (e.clientX + 18) + "px";

        tooltip.style.top = (e.clientY + 18) + "px";

    });

    document.addEventListener("mouseout", e=>{

        if(e.target.closest(".element")){

            tooltip.style.display="none";

        }

    });

}

function capitalize(text){

    if(!text) return "";

    return text.charAt(0).toUpperCase()+text.slice(1);

}