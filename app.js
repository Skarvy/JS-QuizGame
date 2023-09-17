    const title = document.getElementById('title');
    const questionTitle = document.getElementById('questionTitle');
    const answerButtons = document.querySelectorAll('.answerButton');
    const hearts = document.querySelectorAll('img[id^="heart"]');
    const scoreDisplay = document.getElementById('score');
    const choice = document.getElementById('choice');
    const questionCont = document.getElementById('question-container');
    const overlay = document.getElementById("overlay");
    const loginButton = document.getElementById("loginButton");
    const usernameInput = document.getElementById("username");
    const nameDiv = document.getElementById("name");
    let player ={
        playerName:prompt("inserte su nombre"),
        lives:3,
        score:0,
        currentQuestionIndex:0
    } ;
  
 
    nameDiv.textContent=player.playerName
        
        const preguntas = [
            {
                pregunta: '¿Cuál es la capital de Francia?',
                respuestas: ['París', 'Londres', 'Madrid', 'Berlín'],
                respuestaCorrecta: 'París'
            },
            {
                pregunta: '¿En qué año se fundó Apple Inc.?',
                respuestas: ['1976', '1984', '1991', '2001'],
                respuestaCorrecta: '1976'
            },
            {
                pregunta: '¿Quién escribió la obra "Don Quijote de la Mancha"?',
                respuestas: ['Miguel de Cervantes', 'Federico García Lorca', 'Pablo Neruda', 'Gabriel García Márquez'],
                respuestaCorrecta: 'Miguel de Cervantes'
            },
            {
                pregunta: '¿Cuál es el río más largo del mundo?',
                respuestas: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
                respuestaCorrecta: 'Nilo'
            },
            {
                pregunta: '¿Qué planeta es conocido como el "Planeta Rojo"?',
                respuestas: ['Venus', 'Marte', 'Júpiter', 'Saturno'],
                respuestaCorrecta: 'Marte'
            },
            {
                pregunta: '¿Quién pintó la Mona Lisa?',
                respuestas: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Rembrandt'],
                respuestaCorrecta: 'Leonardo da Vinci'
            },
            {
                pregunta: '¿En qué año se llevó a cabo la Revolución Rusa?',
                respuestas: ['1917', '1898', '1923', '1905'],
                respuestaCorrecta: '1917'
            }
          
        ];      


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
                    questionTitle.textContent = '¡Llegastes al Final, Bravo!';
                }
            } else {
                // Si el jugador se quedó sin vidas, muestra el mensaje de juego terminado
                questionCont.style.display = "none";
                title.textContent = "Juego Finalizado"
                questionTitle.textContent = '¡Te quedaste sin vidas!';
            }
        }

        function evaluarRespuesta(respuestaSeleccionada) {
            if (player.lives <= 0) {
                // Si ya no hay vidas, muestra el mensaje de juego terminado
                questionCont.style.display = "none";
                questionTitle.textContent = '¡Te quedaste sin vidas!';
                return;
            }

            const preguntaActual = preguntas[player.currentQuestionIndex];
            if (respuestaSeleccionada === preguntaActual.respuestaCorrecta) {
                player.score += 10;
                scoreDisplay.textContent = player.score;
                alert("Correcto")          
                      
            } else {
                player.lives--;
                hearts[player.lives].style.display = 'none';
                alert("Incorrecto")            
            }

            player.currentQuestionIndex++;
            mostrarPregunta();
        }

        answerButtons.forEach(button => {
            button.addEventListener('click', function() {
                evaluarRespuesta(button.textContent);
            });
        });

        mostrarPregunta();