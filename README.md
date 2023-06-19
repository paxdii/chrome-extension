# Dream Runner Game Documentation

## Overview

Dream Runner is a simple, fun, and engaging runner game where the player character has to jump over obstacles. The game is built using the p5.js library, a JavaScript library that makes coding accessible for artists, designers, educators, and beginners.

## HTML Structure

The HTML file sets up the basic structure of the game. It includes links to the CSS for styling, the p5.js library for game functionality, and the game.js file which contains the game logic. The body of the HTML file contains a div for the game container, which includes the game over container and the start screen.

## CSS Styling

The CSS file provides the styling for the game. It sets up the layout of the game container, the game over screen, and the start screen. It also includes styles for the game over text, high score text, and the restart button.

## JavaScript Game Logic

The JavaScript file, game.js, contains the logic for the game. It includes the setup and draw functions provided by p5.js, as well as classes for the player and obstacles.

## Global Variables
The script begins by declaring global variables for the player, obstacles, score, obstacle rate, frames since the last obstacle, game over state, high score, and images for the player, obstacles, and background.

## Preload Function
The preload function is used to load the images for the player, obstacles, and background before the game starts.

## Setup Function
The setup function is called once when the program starts. It's used to define initial environment properties such as screen size and to load media such as images and fonts as the program starts. It also sets the frame rate and displays the start screen for 2 seconds.

## Draw Function
The draw function runs continuously from top to bottom until the program stops. It's used to continuously execute the lines of code contained inside its block until the program is stopped or noLoop() is called. It handles the game logic, player and obstacle movements, collision detection, and score calculation.

## Player Class
The Player class defines the properties and methods for the player. It includes properties for the player's size, position, velocity, gravity, and jump force. It also includes methods for displaying the player, making the player jump, moving the player, and checking if the player hits an obstacle.

## Obstacle Class
The Obstacle class defines the properties and methods for the obstacles. It includes properties for the obstacle's size, position, and speed. It also includes methods for displaying the obstacle and moving the obstacle.

## Game Flow

The game starts with a start screen that is displayed for 2 seconds. The player can make the player character jump by pressing the space bar. Obstacles come from the right side of the screen at random intervals. The player gets a point for every frame that they stay alive. If the player hits an obstacle, the game is over and a game over screen is displayed. The player can restart the game by clicking the restart button.
