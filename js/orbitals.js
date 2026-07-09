export function createOrbitalDiagram(configuration) {

    const container = document.getElementById("orbital-diagram");

    container.innerHTML = "";

    if (!configuration) return;

    // Convert superscript numbers to normal numbers
    const superscripts = {
        "⁰": "0",
        "¹": "1",
        "²": "2",
        "³": "3",
        "⁴": "4",
        "⁵": "5",
        "⁶": "6",
        "⁷": "7",
        "⁸": "8",
        "⁹": "9"
    };

    configuration = configuration.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, m => superscripts[m]);

    // Remove noble gas shorthand such as [He], [Ne], [Ar], [Kr], [Xe], [Rn]
    configuration = configuration.replace(/\[[^\]]+\]/g, "").trim();

    const orbitals = configuration.split(/\s+/);

    orbitals.forEach(item => {

        const match = item.match(/(\d+)([spdf])(\d+)/);

        if (!match) return;

        const orbital = match[1] + match[2];
        const electrons = parseInt(match[3]);

        let boxCount = 1;

        switch (match[2]) {
            case "p":
                boxCount = 3;
                break;
            case "d":
                boxCount = 5;
                break;
            case "f":
                boxCount = 7;
                break;
        }

        // Hund's Rule
        const occupancy = new Array(boxCount).fill(0);

        let remaining = electrons;

        // First pass: one electron per orbital
        for (let i = 0; i < boxCount && remaining > 0; i++) {
            occupancy[i] = 1;
            remaining--;
        }

        // Second pass: pair them
        for (let i = 0; i < boxCount && remaining > 0; i++) {
            occupancy[i]++;
            remaining--;
        }

        // Create row
        const row = document.createElement("div");
        row.className = "orbital-row";

        const label = document.createElement("div");
        label.className = "orbital-label";
        label.textContent = orbital;

        const boxes = document.createElement("div");
        boxes.className = "boxes";

        occupancy.forEach(value => {

            const box = document.createElement("div");
            box.className = "box";

            if (value === 2)
                box.textContent = "↑↓";
            else if (value === 1)
                box.textContent = "↑";
            else
                box.textContent = "";

            boxes.appendChild(box);

        });

        row.appendChild(label);
        row.appendChild(boxes);

        container.appendChild(row);

    });

}