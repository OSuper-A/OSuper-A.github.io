export function setupSearch() {

    const search = document.getElementById("search");

    search.addEventListener("input", () => {

        const value = search.value.toLowerCase().trim();

        const elements = document.querySelectorAll(".element");

        elements.forEach(tile => {

            const name = (tile.dataset.name || "").toLowerCase();
            const symbol = (tile.dataset.symbol || "").toLowerCase();
            const number = tile.dataset.number || "";

            if (
                value === "" ||
                name.includes(value) ||
                symbol.includes(value) ||
                number.includes(value)
            ) {

                tile.style.opacity = "1";
                tile.style.transform = "scale(1)";
                tile.style.filter = "none";

            } else {

                tile.style.opacity = "0.15";
                tile.style.transform = "scale(0.9)";
                tile.style.filter = "grayscale(80%)";

            }

        });

    });

}