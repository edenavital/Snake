//Play function - from the Menu
function snake(paragraph) {

  //Create the unit
  const box = 32;

  //Load images
  const ground = new Image();
  ground.src = "img/ground.png";
  const foodImg = new Image();
  foodImg.src = "img/food.png";

  //Load audio files
  const dead = new Audio();
  const eat = new Audio();
  const up = new Audio();
  const left = new Audio();
  const right = new Audio();
  const down = new Audio();

  dead.src = "audio/dead.mp3";
  eat.src = "audio/eat.mp3";
  up.src = "audio/up.mp3";
  left.src = "audio/left.mp3";
  right.src = "audio/right.mp3";
  down.src = "audio/down.mp3";


  //Initialize the snake
  let snake = [];
  snake[0] = {
    x: 9 * box,
    y: 10 * box
  }

  //Initialize the food - random spot between the borders
  let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  }

  // Initialize the score
  let score = 0;

  // Control the snake
  let d;
  document.addEventListener("keydown", keys);

  function keys(event) {
    let key = event.keyCode;

    if (key == 37 && d != "RIGHT" && d != "LEFT") {
      left.play();
      d = "LEFT";
    } else if (key == 38 && d != "DOWN" && d != "UP") {
      up.play();
      d = "UP";
    } else if (key == 39 && d != "LEFT" && d != "RIGHT") {
      right.play();
      d = "RIGHT";
    } else if (key == 40 && d != "UP" && d != "DOWN") {
      down.play();
      d = "DOWN";
    } else if (key == 27){
        pause();
    }
  }
  function pause(){

    if (paragraph.style.visibility == "hidden") {

      clearInterval(game);
      cvs.style.opacity ="0.5";
      paragraph.style.visibility = "visible";
      paragraph.style.top = "25%";
      paragraph.innerHTML = "Paused, to resume, press Escape";



    } else{
      game = setInterval(draw, level);
      cvs.style.opacity ="1";
      paragraph.style.visibility = "hidden";

    }
  }

  //Check collision function
  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  // Draw everything to the canvas
  function draw() {
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = (i == 0) ? "green" : "white";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);

      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x, snake[i].y, 32, 32);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Which keys
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
      //We don't remove the tail
      eat.play();
      score++;
      food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      }

    } else {
      //We remove the tail
      snake.pop();
    }
    // Add new head
    let newHead = {
      x: snakeX,
      y: snakeY
    }

    //Game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box ||
      snakeY > 17 * box || collision(newHead, snake)) {
      clearInterval(game);
      dead.play();
      document.removeEventListener("keydown", keys);
      cvs.style.opacity ="0.5";
      paragraph.innerHTML = "You Lost!";
      paragraph.style.visibility = "visible";
      restart_button.style.visibility = "visible";
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px one";
    ctx.fillText(score, 2 * box, 1.6 * box);
  }

  let game = setInterval(draw, level);

}
