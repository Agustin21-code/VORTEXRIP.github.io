/* ==========================================
   NULLTRACE - LÓGICA DE JUEGOS Y CATEGORÍAS
   ========================================== */

// 1. TU LISTA DE JUEGOS (Aquí es donde mandas tú)
const games = [
    {
        title: "Farming Simulator 25",
        category: "Simulación",
        img: "assets/logo farming 25.jpg", // Asegúrate de que el archivo esté en la misma carpeta que el HTML
        mega: "TU_LINK_AQUÍ",       // Pega aquí el enlace de descarga
        mediafire: "#", 
        torrent: "#"
    },
    {
        title: "The Sims 4",
        category: "Simulación",
        img: "https://images5.alphacoders.com/543/543163.jpg",
        mega: "#", mediafire: "#", torrent: "#"
    },
    {
        title: "Resident Evil Village",
        category: "Terror",
        img: "https://images3.alphacoders.com/114/1146740.jpg",
        mega: "#", mediafire: "#", torrent: "#"
    },
    {
        title: "Project Zomboid",
        category: "Supervivencia",
        img: "https://images.alphacoders.com/115/1154567.jpg",
        mega: "#", mediafire: "#", torrent: "#"
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
        // 1. Creamos un ENLACE (<a>) en lugar de un DIV
        const cardLink = document.createElement('a');
        cardLink.classList.add('game-card');
        
        // 2. LE ASIGNAMOS TU ENLACE DIRECTO (MEGA en este ejemplo)
        cardLink.href = game.mega; // <--- Aquí es donde pones tu link de MEGA/Mediafire
        
        // 3. (OPCIONAL) Que se abra en una pestaña nueva
        cardLink.target = "_blank"; 
        
        // 4. Mantenemos el mismo diseño visual adentro
        cardLink.innerHTML = `
            <img src="${game.img}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <small style="color: #ce9d10; font-weight: bold;">${game.category}</small>
            </div>
        `;
        
        // YA NO USAMOS cardLink.onclick, porque el href hace el trabajo.
        
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