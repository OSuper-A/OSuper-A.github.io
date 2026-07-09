import { loadElements } from "./data.js";
import { createTable } from "./table.js";
import { closePopup } from "./popup.js";
import { setupSearch } from "./search.js";
import { initializeFilters } from "./filter.js";
import { initializeTooltip } from "./tooltip.js";

window.addEventListener("DOMContentLoaded", async ()=>{

    const elements = await loadElements();

    createTable(elements);
    setupSearch();
    initializeFilters();
    initializeTooltip();

    document
        .getElementById("close")
        .addEventListener("click",closePopup);

    document
        .getElementById("popup")
        .addEventListener("click",(e)=>{

            if(e.target.id==="popup")
                closePopup();

        });

});