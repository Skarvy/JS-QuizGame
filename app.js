     
        const questionTitle = document.getElementById('questionTitle');
        const answerButtons = document.querySelectorAll('.answerButton');
        const hearts = document.querySelectorAll('img[id^="heart"]');
        const scoreDisplay = document.getElementById('score');
        
        const questionCont = document.getElementById("question-container");

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
            // Agrega más preguntas aquí
        ];

        let currentQuestionIndex = 0;
        let lives = 3;
        let score = 0;




        function mostrarPregunta() {
            if (lives > 0) {
                if (currentQuestionIndex < preguntas.length) {
                    const preguntaActual = preguntas[currentQuestionIndex];
                    questionTitle.textContent = preguntaActual.pregunta;

                    for (let i = 0; i < preguntaActual.respuestas.length; i++) {
                        answerButtons[i].textContent = preguntaActual.respuestas[i];
                    }
                } else {
                    // Juego terminado
                    questionCont.style.display = "none";
                    questionTitle.textContent = '¡Juego terminado!';
                }
            } else {
                // Si el jugador se quedó sin vidas, muestra el mensaje de juego terminado
                questionCont.style.display = "none";
                questionTitle.textContent = '¡Te quedaste sin vidas! Juego terminado';
            }
        }

        function evaluarRespuesta(respuestaSeleccionada) {
            if (lives <= 0) {
                // Si ya no hay vidas, muestra el mensaje de juego terminado
                questionCont.style.display = "none";
                questionTitle.textContent = '¡Te quedaste sin vidas! Juego terminado';
                return;
            }

            const preguntaActual = preguntas[currentQuestionIndex];
            if (respuestaSeleccionada === preguntaActual.respuestaCorrecta) {
                score += 10;
                scoreDisplay.textContent = score;
            } else {
                lives--;
                hearts[lives].style.display = 'none';
            }

            currentQuestionIndex++;
            mostrarPregunta();
        }

        answerButtons.forEach(button => {
            button.addEventListener('click', function() {
                evaluarRespuesta(button.textContent);
            });
        });

        mostrarPregunta();