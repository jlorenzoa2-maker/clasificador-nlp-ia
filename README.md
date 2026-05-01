# Clasificador NLP con Red Neuronal

## Descripción del proyecto

Este proyecto consiste en una aplicación web de inteligencia artificial que clasifica comentarios relacionados con tecnología como positivos, negativos o inciertos.

El usuario puede escribir una opinión técnica en un campo de texto, presionar el botón "Analizar comentario" y el sistema muestra el resultado con un porcentaje de confianza.

## Tecnologías utilizadas

- HTML5
- Tailwind CSS
- JavaScript
- TensorFlow.js
- Procesamiento básico de lenguaje natural
- Red neuronal secuencial
- Dataset en formato JSON dentro del archivo JavaScript

## Funcionamiento

El sistema utiliza un pequeño conjunto de frases positivas y negativas relacionadas con tecnología, servidores, software y rendimiento.

Primero, el texto se limpia y se divide en palabras. Después, cada palabra se convierte en un valor numérico para que pueda ser procesada por la red neuronal.

El modelo se entrena con esos ejemplos y luego puede analizar comentarios nuevos escritos por el usuario.

## Hiperparámetros utilizados

- Learning rate: 0.001
- Epochs: 100

Estos valores permiten que el modelo aprenda a partir del dataset utilizado durante el laboratorio.

## Análisis de incertidumbre

Cuando el resultado está cerca del 50%, el modelo puede mostrar incertidumbre. Esto puede pasar cuando la frase ingresada contiene palabras que no estaban en el entrenamiento o cuando el comentario es ambiguo.

Un ejemplo sería una frase sarcástica como:

"Excelente, otra vez falló el sistema."

Aunque contiene la palabra "excelente", realmente expresa una opinión negativa. Por eso, el modelo puede confundirse.

## Conclusión

El laboratorio permitió comprender cómo una red neuronal puede aprender patrones básicos del lenguaje para clasificar opiniones. Aunque el modelo funciona con frases sencillas, también se observó que puede tener dificultades con frases sarcásticas, ambiguas o muy diferentes al dataset original.
