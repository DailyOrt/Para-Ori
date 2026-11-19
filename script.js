// ===================================
// CONFIGURACIÓN
// ===================================

const CODIGO_SECRETO = "67";

// Elementos HTML
const inputCode = document.getElementById("secretCode");
const enterButton = document.getElementById("enterButton");
const errorMessage = document.getElementById("errorMessage");

const welcomeContainer = document.querySelector(".welcome-container");
const welcomeCard = document.querySelector(".welcome-card");
const memoryScreen = document.getElementById("memoryScreen");

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");


// ===================================
// VALIDACIÓN DEL CÓDIGO
// ===================================

function validarCodigo() {

    const codigoIngresado = inputCode.value.trim();

    if (codigoIngresado === CODIGO_SECRETO) {

        errorMessage.classList.remove("show");

        // Ocultar pantalla de bienvenida
        welcomeCard.style.display = "none";

        // Mostrar carta y fotografías
        memoryScreen.style.display = "block";

        // Activar música
        backgroundMusic.play().catch(() => {
            console.log("La música necesita activarse manualmente.");
        });

        musicaActiva = true;
        musicButton.style.display = "flex";

        // Ir al inicio de la segunda pantalla
        memoryScreen.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {

        errorMessage.classList.add("show");

        inputCode.value = "";
        inputCode.focus();

    }
}


// ===================================
// EVENTOS DEL BOTÓN
// ===================================

enterButton.addEventListener("click", validarCodigo);

inputCode.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        validarCodigo();
    }

});


// ===================================
// MÚSICA DE FONDO
// ===================================

let musicaActiva = false;

musicButton.addEventListener("click", async function() {

    if (!musicaActiva) {

        try {

            await backgroundMusic.play();

            musicaActiva = true;
            musicButton.textContent = "♫";
            musicButton.style.background = "#e9dfff";

        } catch (error) {

            console.error("No se pudo reproducir la música:", error);

        }

    } else {

        backgroundMusic.pause();

        musicaActiva = false;
        musicButton.textContent = "♪";
        musicButton.style.background = "#ffffff";

    }

});