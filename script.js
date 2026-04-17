/* ==========================================
   NULLTRACE - LÓGICA DE JUEGOS Y CATEGORÍAS
   ========================================== */

// 1. TU LISTA DE JUEGOS (Aquí es donde mandas tú)
const games = [
    {
        title: "Farming Simulator 25 Online",
        category: "Simulación",
        img: "assets/logo farming 25.jpg", // Asegúrate de que el archivo esté en la misma carpeta que el HTML
        mega: "https://gofile.io/d/fmiF08",       // Pega aquí el enlace de descarga
        mediafire: "#", 
        torrent: "#"
    
    }
];

// Seleccionar elementos una sola vez
const gameContainer = document.getElementById('game-container');
const searchInput = document.getElementById('search');
const catBtn = document.getElementById('cat-btn');
const catMenu = document.getElementById('category-menu');

// 2. FUNCIÓN PARA DIBUJAR LOS JUEGOS (RENDER)
/* ==========================================
   NUEVA FUNCIÓN RENDER: ENLACE DIRECTO
   ========================================== */
function renderGames(lista) {
    if (!gameContainer) return;
    gameContainer.innerHTML = ""; 
    
    lista.forEach(game => {
        const cardLink = document.createElement('a');
        cardLink.classList.add('game-card');
        
        // CONSTRUIMOS EL ENLACE A LA SUBPÁGINA PASANDO LOS DATOS
        const urlParams = `juego.html?title=${encodeURIComponent(game.title)}&cat=${encodeURIComponent(game.category)}&img=${encodeURIComponent(game.img)}&url=${encodeURIComponent(game.mega)}`;
        
        cardLink.href = urlParams; 
        
        cardLink.innerHTML = `
            <img src="${game.img}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <small style="color: #ce9d10; font-weight: bold;">${game.category}</small>
            </div>
        `;
        
        gameContainer.appendChild(cardLink);
    });
}

// 3. LÓGICA DEL MENÚ DE CATEGORÍAS
if (catBtn) {
    catBtn.onclick = (e) => {
        e.stopPropagation();
        catMenu.classList.toggle('show-cat');
    };
}

// Cerrar el menú si haces clic en cualquier parte de la pantalla
window.addEventListener('click', () => {
    if (catMenu) catMenu.classList.remove('show-cat');
});

// 4. FILTRAR POR CATEGORÍA
function filterByCategory(cat) {
    if (cat === 'Todos') {
        renderGames(games);
    } else {
        const filtrados = games.filter(juego => juego.category === cat);
        renderGames(filtrados);
    }
    // El menú se cierra solo después de elegir
}

// 5. LÓGICA DEL BUSCADOR
if (searchInput) {
    searchInput.oninput = (e) => {
        const term = e.target.value.toLowerCase();
        const filtrados = games.filter(juego => 
            juego.title.toLowerCase().includes(term)
        );
        renderGames(filtrados);
    };
}

// 6. INICIALIZACIÓN (Carga los juegos apenas abre la web)
document.addEventListener('DOMContentLoaded', () => {
    renderGames(games);
});