// Seleccionar elementos del DOM
const logIn_content = document.getElementById("logIn_content");
const loginButton = document.getElementById("loginButton");
const title = document.getElementById('title');
const questionTitle = document.getElementById('questionTitle');
const answerButtons = document.querySelectorAll('.answerButton');
const hearts = document.querySelectorAll('img[id^="heart"]');
const scoreDisplay = document.getElementById('score');
const choice = document.getElementById('choice');
const questionCont = document.getElementById('question-container');
const usernameInput = document.getElementById("username");
const nameDiv = document.getElementById("name");
const game_content = document.getElementById("game_content");
const tableScoreDiv = document.getElementById ("tableScore_content")
const tableScoreBtn = document.getElementById("tableScoreBtn");
const tableScoreCont = document.getElementById("tableScore");

// Inicialización de las variables
let tableScores = JSON.parse(localStorage.getItem('tableScores')) || [];
let player = {
    playerName: "",
    lives: 3,
    score: 0,
    currentQuestionIndex: 0
};

// Definición de las preguntas y respuestas
let preguntas = null;
async function getPreguntas() {
  const url = "./recursos/preguntas.json";
  const response = await fetch(url);
  preguntas = await response.json();
}

// Llama a la función getPreguntas para obtener los datos
getPreguntas()
  .then(() => {
    // Los datos estarán disponibles aquí una vez que la promesa se resuelva
    mostrarPregunta();
  })
  .catch((error) => {
    console.error("Error al obtener preguntas:", error);
  });

loginButton.addEventListener("click", function () {
    const loginInput = document.getElementById("loginInput").value; 
  
    if (loginInput !== "") { 
        logIn_content.style.display = "none";
        game_content.style.display= "block"
        player.playerName = loginInput;
        nameDiv.textContent = player.playerName;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Inserte un nombre Valido',
        toast: true,        
      })
    }
});

// Función para guardar puntajes en el almacenamiento local
function guardarPuntajeEnLocalStorage() {
    tableScores.push({ playerName: player.playerName, score: player.score });
    localStorage.setItem('tableScores', JSON.stringify(tableScores));
}

// Función para mostrar una pregunta
function mostrarPregunta() {
    if (player.lives > 0) {
        if (player.currentQuestionIndex < preguntas.length) {
            const preguntaActual = preguntas[player.currentQuestionIndex];
            questionTitle.textContent = preguntaActual.pregunta;

            for (let i = 0; i < preguntaActual.respuestas.length; i++) {
                answerButtons[i].textContent = preguntaActual.respuestas[i];
            }
        } else {
            // Juego terminado
            questionCont.style.display = "none";
            title.textContent = "Juego Finalizado"
            questionTitle.textContent = '¡Llegaste al final, Bravo!';
            tableScoreBtn.style.display = "inline"
            guardarPuntajeEnLocalStorage();
        }
    } else {
        // Si el jugador se quedó sin vidas, muestra el mensaje de juego terminado
        questionCont.style.display = "none";
        title.textContent = "Juego Finalizado"
        questionTitle.textContent = '¡Te quedaste sin vidas!';
        tableScoreBtn.style.display = "inline"
        guardarPuntajeEnLocalStorage();
    }
}

// Función para evaluar la respuesta seleccionada por el jugador
function evaluarRespuesta(respuestaSeleccionada) {
    if (player.lives <= 0) {
      // Si ya no hay vidas, muestra el mensaje de juego terminado
      questionCont.style.display = "none";
      questionTitle.textContent = '¡Te quedaste sin vidas!';
      tableScoreBtn.style.display = "inline";
      guardarPuntajeEnLocalStorage();
      return;
    }
  
    const preguntaActual = preguntas[player.currentQuestionIndex];
    if (respuestaSeleccionada === preguntaActual.respuestaCorrecta) {
      player.score += 10;
      scoreDisplay.textContent = player.score;
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Respuesta Correcta!',
        toast: true,
        showConfirmButton: false,
        timer: 1000        
      })
    } else {
      player.lives--;
      hearts[player.lives].style.display = 'none';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Respuesta Incorrecta!', 
        toast: true,
        showConfirmButton: false,
        timer: 1000          
      })
    }
  
    player.currentQuestionIndex++;
    mostrarPregunta();
  }

// Agregar manejadores de eventos a los botones de respuesta
answerButtons.forEach(button => {
    button.addEventListener('click', function() {
        evaluarRespuesta(button.textContent);
    });
});

// Función para mostrar la tabla de puntajes
function mostrarTablaPuntajes() {
    game_content.style.display = "none";
    tableScoreDiv.style.display = "block";

    // Crear una tabla para mostrar los puntajes
    const table = document.createElement('table');
    table.classList.add('score-table');

    // Crear encabezado de la tabla
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Puntaje</th>
        </tr>
    `;
    table.appendChild(thead);

    // Crear cuerpo de la tabla con los puntajes de los jugadores
    const tbody = document.createElement('tbody');
    tableScores.sort((a, b) => b.score - a.score); // Ordenar los puntajes en orden descendente
    tableScores.forEach(score => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${score.playerName}</td>
            <td>${score.score}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableScoreCont.appendChild(table);
}

// Agregar un manejador de eventos al botón de la tabla de puntajes
tableScoreBtn.addEventListener('click', () => {
    mostrarTablaPuntajes();
});
