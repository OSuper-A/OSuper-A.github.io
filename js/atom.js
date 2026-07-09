export function createAtom(element){

    const atom=document.getElementById("atom");

    atom.querySelectorAll(".shell").forEach(s=>s.remove());

    document.getElementById("nucleus-symbol").textContent=element.symbol;

    const shells=getShells(element.electronConfiguration);

    shells.forEach((count,index)=>{

        const shell=document.createElement("div");

        shell.className="shell";

        const size=90+index*42;

        shell.style.width=size+"px";
        shell.style.height=size+"px";

        shell.style.animationDuration=(12+index*6)+"s";

        for(let i = 0; i < count; i++){

            const electron = document.createElement("div");

            electron.className = "electron";

            const radius = size / 2;

            const angle = (2 * Math.PI * i) / count;

            const x = radius + Math.cos(angle) * radius;
            const y = radius + Math.sin(angle) * radius;

            electron.style.left = `${x - 5}px`;
            electron.style.top = `${y - 5}px`;

         shell.appendChild(electron);

        }

        atom.appendChild(shell);

    });

}

function getShells(configuration){

    if(!configuration) return [];

    // Convert superscript numbers to normal numbers
    const superscripts = {
        "⁰":"0",
        "¹":"1",
        "²":"2",
        "³":"3",
        "⁴":"4",
        "⁵":"5",
        "⁶":"6",
        "⁷":"7",
        "⁸":"8",
        "⁹":"9"
    };

    configuration = configuration.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, m => superscripts[m]);

    const shells = {};

    const orbitals = configuration.trim().split(/\s+/);

    orbitals.forEach(orbital => {

        const match = orbital.match(/(\d+)([spdfg])(\d+)/);

        if(!match) return;

        const shell = parseInt(match[1]);
        const electrons = parseInt(match[3]);

        shells[shell] = (shells[shell] || 0) + electrons;

    });

    return Object.keys(shells)
        .sort((a,b)=>a-b)
        .map(shell => shells[shell]);

}