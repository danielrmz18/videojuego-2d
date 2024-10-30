const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let puntaje = 0;
let objetos = [];
const murcielagoImg = new Image();
murcielagoImg.src = 'img/murcielago.png';

const musicaFondo = document.getElementById("musicaFondo");

// Crear objetos aleatorios
function crearObjeto() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;
    objetos.push({ x, y, dx, dy });
}

// Dibujar y mover objetos
function actualizarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(document.getElementById('natabatmanFondo'), 0, 0, canvas.width, canvas.height);
    objetos.forEach((obj, index) => {
        obj.x += obj.dx;
        obj.y += obj.dy;
        
        // Rebote en los bordes
        if (obj.x < 0 || obj.x > canvas.width) obj.dx *= -1;
        if (obj.y < 0 || obj.y > canvas.height) obj.dy *= -1;
        
        // Dibujar objeto
        ctx.drawImage(murcielagoImg, obj.x - 20, obj.y - 20, 40, 40);
    });
    requestAnimationFrame(actualizarJuego);
}

// Manejo de clics para eliminar objetos y sumar puntos
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    objetos = objetos.filter(obj => {
        const dist = Math.sqrt((obj.x - x) ** 2 + (obj.y - y) ** 2);
        if (dist > 20) return true;
        puntaje++;
        document.getElementById("contador").textContent = `Puntuación: ${puntaje}`;

        // Reproducir música al llegar a 10 puntos
        if (puntaje === 10 && musicaFondo.paused) {
            musicaFondo.play();
        }

        // Aumentar el volumen de la música al llegar a 20 puntos
        if (puntaje === 20) {
            musicaFondo.volume = 1.0;
        }
        return false;
    });
});

setInterval(crearObjeto, 3000);
actualizarJuego();
