let elements = [];

export async function loadElements() {

    const response = await fetch("./data/elements.json");

    elements = await response.json();

    return elements;

}