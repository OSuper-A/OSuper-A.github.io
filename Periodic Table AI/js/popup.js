import { speakElement, stopSpeaking } from "./voice.js";
import { createAtom } from "./atom.js";
import { createOrbitalDiagram } from "./orbitals.js";

export function openPopup(element) {

    createAtom(element);
    createOrbitalDiagram(element.electronConfiguration);

    document.getElementById("speakBtn").onclick = () => {

        speakElement(element);

    };

    const popup = document.getElementById("popup");

    document.getElementById("popup-symbol").textContent = element.symbol;
    document.getElementById("popup-symbol").className =
        `element-tile ${element.category}`;

    document.getElementById("popup-name").textContent = element.name;

    document.getElementById("popup-category").textContent =
        capitalize(element.category);

    document.getElementById("popup-number").textContent = element.number;

    document.getElementById("popup-period").textContent = element.period;

    document.getElementById("popup-group").textContent = element.group;

    document.getElementById("popup-mass").textContent =
        element.atomicMass ?? "-";

    document.getElementById("popup-state").textContent =
        element.state ?? "-";

    document.getElementById("popup-year").textContent =
        element.yearDiscovered ?? "-";

    document.getElementById("popup-electrons").textContent =
        element.electronConfiguration ?? "-";

    document.getElementById("popup-summary").textContent =
        element.summary ?? "Coming soon...";

    document.getElementById("popup-fact").textContent =
        element.funFact ?? "Coming soon...";

    document.getElementById("popup-uses").textContent =
        element.uses ?? "Coming soon...";

    document.getElementById("popup-discoverer").textContent =
        `${element.discoverer ?? "-"} (${element.yearDiscovered ?? "-"})`;

    document.getElementById("popup-personality").textContent =
        element.personality ?? "";

    document.getElementById("wikiBtn").onclick = () => {
        window.open(element.wiki, "_blank");
    };

    popup.style.display = "flex";

    // Reset scroll position every time the popup opens
    popup.scrollTop = 0;

    const content = popup.querySelector(".popup-content");
    if (content) {
        content.scrollTop = 0;
    }
}

export function closePopup(){

    stopSpeaking();

    const popup = document.getElementById("popup");

    popup.style.display = "none";
    popup.scrollTop = 0;

}

function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}