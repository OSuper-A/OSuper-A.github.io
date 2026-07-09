export function initializeFilters() {

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            const category = button.dataset.category;

            const elements = document.querySelectorAll(".element");

            elements.forEach(tile => {

                if(tile.classList.contains("placeholder"))
                    return;

                if(category === "all"){

                    tile.classList.remove("hidden");

                    return;

                }

                if(tile.classList.contains(category)){

                    tile.classList.remove("hidden");

                }

                else{

                    tile.classList.add("hidden");

                }

            });

        });

    });

}