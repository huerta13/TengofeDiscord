// Función que acorta un texto para usar como título en Shopify
function acortarTitulo(texto, max = 245) {
    if (!texto) return "";
    
    // Limpia saltos de línea y espacios dobles
    texto = texto.replace(/\s+/g, " ").trim();

    // Si ya es corto, lo regresa igual
    if (texto.length <= max) return texto;

    // Corta limpiamente en el último espacio antes del límite
    let recorte = texto.slice(0, max);

    const ultimoEspacio = recorte.lastIndexOf(" ");
    if (ultimoEspacio > 10) {      // para evitar cortar palabras al inicio
        recorte = recorte.slice(0, ultimoEspacio);
    }

    return recorte + "...";
}


// ----------------------
// PRUEBAS
// ----------------------

const largos = [
    "BLACK KNIGHT! SPARKLE SPECIALIST! TOMA LA L! STW! BLUE SQUARE! ROYALE KNIGHT! ELITE! ROGUE AGENT! PICO AC/DC! CLOUD STRIKER! ERA! GLOW! OMEGA! SKIN FUNDADOR! NEZUME! LADA CROFT! MANDALORIAN! JOSSLY SKIN GERENTE! HAVEN! PICO REAPER! (5499 MX) @everyone VINCULABLE SOLO PC NINTENDO!",
];

largos.forEach((t, i) => {
    console.log("\n--- Prueba", i + 1, "---");
    console.log("Original:", t.length, "caracteres");
    console.log("Resultado:", acortarTitulo(t));
});
