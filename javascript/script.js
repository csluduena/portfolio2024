const SIZES = [
    "42GB",
    "60GB",
    "120GB",
    "250GB",
    "500GB",
    "1TB"
];

const DISKS = [
    "WDC WD1603821JS-84WAA8",
    "SAMSUNG SP2504C VT100-33",
    "ExcelStor Technology J880 PF20A21B",
    "ExcelStor Technology J9250S GM20A52A",
    "WDC WD3200AAJS-00RYA0 12.01B",
    "ST9500325AS 0002SDM1",
    "MAXTOR 6Y060M0 SN0874",
    "WDC WD800JB-00FMA0"
];

const DEVICES = [
    `HL-DT-ST GCE-8526B 1.04`,
    `HL-DT-ST DVDRAM GSA-H10A JL02`,
    "OPTIARC DVD RW AD-7173A 1-01",
    "SLIMTYPE DVD A DS8A3S HA28",
    "HL-DT-ST DVDRAM GH22LS50 TL02",
    "TSSTCORP CDDVDW SH-S202G SB00",
    "LITE-ON DVD SOHD-16P9S FS09"
];

const EVENTS = [
    "CMOS checksum error. Please Wait...",
    "Floppy disk(s) fail (40). Please Wait...",
    "Error or no keyboard present. Please Wait...",
    "<strong>Trend ChipAwayVirus(R) On Guard. Please Wait...</strong>",
    "CMOS battery failed. Please Wait...",
    "Primary IDE channel no 80 conductor cable installed. Please Wait...",
    "Boot Disk failure. Please Wait...",
    "Non-System Disk or disk error. Please Wait...",
    "Conflict I/O Ports: 2E8 2EB. Please Wait...",
    "Warning! CPU has been changed. Please Wait...",
    "BIOS Guardian(R) enabled. Please Wait...",
    "OC fail. Please Wait...",
    "AHCI Port0 Device Error. Please Wait...",

];

const keySound = new Audio("./data/key.mp3");

const type = (paragraph, text) => {
    const duration = Number(paragraph.dataset.duration) || 5000;
    const portions = ~~(duration / text.length);
    for (let i = 0; i <= text.length; i++) {
        setTimeout(() => {
            paragraph.textContent = text.substring(0, i);
            keySound.currentTime = 0;
            keySound.play();
        }, i * portions);
    }
}

const typewriter = (paragraph) => {
    const delay = paragraph.dataset.delay || 0;
    const text = paragraph.textContent;
    paragraph.textContent = "";
    setTimeout(() => type(paragraph, text), delay);
}

const sound = new Audio("./data/boot.mp3");

const date = () => {
    const date = new Date();
    const zeroFill = data => String(data).padStart(2, "0");

    const day = zeroFill(date.getDate());
    const month = zeroFill(date.getMonth() + 1);
    const year = date.getFullYear().toString().substring(2, 4);

    return `${day}/${month}/${year}`;
}

class AwardBoot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Agregar el evento para escuchar la tecla F2
    document.addEventListener("keydown", (event) => {
        if (event.key === "F2") {
            this.enterDOSConsole();
        }
    });
}

    static get styles() {
        return `
        .screen {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            padding: 25px;
            overflow: hidden;
            transform-origin: top; /* Define el punto de origen de la transformación */
            image-rendering: pixelated; /* Mantiene la apariencia pixelada */
        }
        .ribbon {
            width: 48px;
            height: 48px;
            image-rendering: pixelated;
        }
        .brand-text {
            display: flex;
            align-items: center;
        }
        .epa {
            position: absolute;
            right: 0;
            top: 0;
            opacity: 1;
            transition: opacity 1s linear;
        }
        .epa.fadeoff {
            opacity: 0;
        }
        strong {
            color: #fff;
            font-weight: normal;
        }
        p.line {
            margin: 0;
            bottom: 12%;
        }
        .off {
            visibility: hidden;
        }
        .pre {
            white-space: pre;
        }
        .last {
            position: absolute;
            bottom: 0;
        }
        .hdd {
            margin-bottom: 50px;
        }
        `;
    }

    connectedCallback() {
        this.render();
        this.rebootSystem();
    }

    setVisible(className, duration = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.shadowRoot.querySelector(className).classList.remove("off");
                resolve(true)
            }, duration);
        });
    }

    setHTML(className, HTML, duration = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const div = this.shadowRoot.querySelector(className);
                div.innerHTML = HTML;
                resolve(true)
            }, duration);
        });
    }

    addHTML(className, HTML) {
        const div = this.shadowRoot.querySelector(className);
        div.innerHTML += HTML;
    }

    async detectDevice(place, label) {
        const n = ~~(Math.random() * 4);

        if (n === 0) {
            const device = DEVICES[~~(Math.random() * DEVICES.length)];
            await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>[Press <strong>F4</strong> to skip]</span>`);
            await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>${device}</span>`, 4000);
        }
        else if (n === 1) {
            const disk = DISKS[~~(Math.random() * DISKS.length)];
            await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>[Press <strong>F4</strong> to skip]</span>`);
            await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>${disk}</span>`, 4000);
        }
        else {
            await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>None</span>`, 50);
        }
    }

    async detectHardDisks() {

        const disk = DISKS[~~(Math.random() * DISKS.length)];
        const size = SIZES[~~(Math.random() * SIZES.length)];

        await this.setHTML(".hdd p:nth-child(1)", `Detecting IDE Primary Master  ... <span>[Press <strong>F4</strong> to skip]</span>`);
        await this.setHTML(".hdd p:nth-child(1)", `Detecting IDE Primary Master  ... <span>${disk} ${size}</span>`, 2000);

        await this.detectDevice(2, "Primary Slave");
        await this.detectDevice(3, "Secondary Master");
        await this.detectDevice(4, "Secondary Slave");
    }

    turnOn() {
        return this.setHTML(".header", `
        <img class="epa" src="./img/epa.png" alt="Energy EPA">
        <div class="brand-text">
        <img class="ribbon" src="./img/award-logo.png" alt="Award Logo">
            <p>
            CSLUDUENA PORTFOLIO BIOS v4.50G, An Energy Star Ally<br>
                Copyright (C) <1986-2024>, HeroSoft, Inc.
            </p>
        </div>
            <p>CSLUDUENA ACPI BIOS Revision 1.0A</p>
            <p>
                Intel(R) Pentium(R) PRO-MMX CPU at 133Mhz<br>
                Memory Test:  <span class="memory">${2 ** 16}</span>
            </p>
        `, 2000);
    }

    async rebootSystem() {
        const timeline = [
            { action: () => this.turnOn() },
            { action: () => this.checkMemory() },
            { action: () => this.setVisible(".pnp-stage", 3000) },
            { action: () => this.detectHardDisks() },
            { action: () => this.createRandomEvent(2000) },
            { action: () => this.setVisible(".last", 3500) },
            { action: () => this.createFinalEvent(4000) } // Agrega el evento "Press F2 to Resume" al final
            // { action: () => this.enterBIOS() }
        ];

        sound.play();

        let i = 0;
        while (i < timeline.length) {
            await timeline[i].action();
            if (timeline[i].action === this.createRandomEvent) return;
            i++;
        }
    }

    checkMemory() {
        return new Promise(resolve => {
            const BLOCK = 8;
            const memory = this.shadowRoot.querySelector(".memory");
            const max = Number(memory.textContent);
            memory.textContent = "";
            for (let i = 0; i < max; i = i + BLOCK) {
                setTimeout(() => {
                    memory.textContent = `${i}K`;
                }, i / BLOCK);
            }
            setTimeout(() => this.disableEPA(), 5000);
            setTimeout(() => {
                memory.textContent += " OK";
                resolve(true);
            }, max / BLOCK);
        });
    }

    createRandomEvent(duration = 0) {
        const eventName = EVENTS[~~(Math.random() * EVENTS.length)];
        if (eventName === "Conflict I/O Ports: 2E8 2EB") {
            const eventParagraph = this.shadowRoot.querySelector(".event");
            setTimeout(() => {
                eventParagraph.textContent = "Press any key to continue";
                eventParagraph.addEventListener("click", () => this.enterDOSConsole());
            }, duration);
        } else {
            this.setHTML(".event", eventName, duration);
        }
    }

    createFinalEvent(duration = 0) {
        const finalEvent = "Press F2 to Resume";
        this.setHTML(".event", finalEvent, duration);
    }

    createRandomEvent(duration = 0) {
        const eventName = EVENTS[~~(Math.random() * EVENTS.length)];
        if (eventName === "Conflict I/O Ports: 2E8 2EB") {
            const eventParagraph = this.shadowRoot.querySelector(".event");
            setTimeout(() => {
                eventParagraph.textContent = "Press any key to continue";
                eventParagraph.addEventListener("click", () => this.enterDOSConsole());
            }, duration);
        } else if (eventName === "Press F2 to Resume") {
            this.createFinalEvent(duration);
        } else {
            this.setHTML(".event", eventName, duration);
        }
    }

    disableEPA() {
        this.shadowRoot.querySelector(".epa").classList.add("fadeoff");
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        ${AwardBoot.styles}
        .screen {
            display: block;
            position: relative;
            width: var(--width, 1024px);
            height: var(--height, 768px);
            background: #000;
            padding: 25px;
            overflow: hidden;
        }
        .header {
            /* Estilos para el encabezado */
        }
        .pnp-stage {
            /* Estilos para la etapa de inicialización Plug and Play */
        }
        .hdd {
            /* Estilos para la lista de discos duros */
        }
        .event {
            /* Estilos para el evento aleatorio */
        }
        .last {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        .epa {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 9999; /* Asegura que esté siempre por encima del resto del contenido */
        }
        </style>
        <div class="screen" style="transform: scale(2); transform-origin: top;">
            <div class="header">
            </div>
            <p class="pnp-stage off">
            Portfolio BIOS HeroSoft Extension v1.0A<br>
            Initialize Sistem. Loading Personal Information Data...
            </p>
            <div class="hdd">
                <p class="line"></p>
                <p class="line"></p>
                <p class="line"></p>
                <p class="line"></p>
            </div>
            <p class="line event"></p>
            <p class="line last style=margin-top: 50%">
                ${date()}
                <span>Copyright (C) 1986-2024 HeroSoft, Inc.</span>
            </p>
            <img class="epa" src="./img/epa.png" alt="Energy EPA">
        </div>
    </div>
    `;

        // Métodos y lógica adicionales aquí...
    }
    createRandomEvent(duration = 0) {
        const eventName = EVENTS[~~(Math.random() * EVENTS.length)];
        if (eventName === "Conflict I/O Ports: 2E8 2EB") {
            const eventParagraph = this.shadowRoot.querySelector(".event");
            setTimeout(() => {
                eventParagraph.textContent = "Press any key to continue";
                eventParagraph.addEventListener("click", () => this.enterDOSConsole());
            }, duration);
        } else {
            this.setHTML(".event", eventName, duration);
        }
    }

    enterDOSConsole() {
        const screen = this.shadowRoot.querySelector(".screen");
        window.location.href = "../pages/ms-dos.html";
        $(document).ready(function() {
            $('#terminal').terminal(function(command) {
                // Aquí irá la lógica para procesar los comandos ingresados por el usuario
            }, {
                greetings: 'HeroSoft(R) CsLuduena Portfolio\n(C)Copyright HeroSoft Corp 1986-2024\n',
                prompt: 'C:\\>'
            });
        });
    }
}

customElements.define("award-boot", AwardBoot);

//todo terminal on.

// $(document).ready(function() {
//     $('#terminal').terminal(function(command) {
//         // Aquí irá la lógica para procesar los comandos ingresados por el usuario
//     }, {
//         greetings: 'HeroSoft(R) CsLuduena Portfolio\n(C)Copyright HeroSoft Corp 1986-2024\n',
//         prompt: 'C:\\>'
//     });
// });