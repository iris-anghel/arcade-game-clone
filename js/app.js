// Points
let displayScore = document.querySelector('.score');
let score = 0;
displayScore.innerText = 'Points: ' + score;

//   -------------------------- ENEMIES ------------------------------

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // change this                !!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.

    if(this.x < 505) {
        this.x += (this.speed * dt);
//        is this ok ????????               !!!!!!!!!!!!!!!!!!!1
        this.x = Math.floor(this.x);
    } else {
        this.x = -90;
    }
    // if the player and the enemies collide
    if(this.x < player.x + 30 &&
       this.x + 60 > player.x &&
       this.y < player.y + 60 &&
       this.y + 40 > player.y) {
        player.lives -= 1;
//        gems = [];
// the gems array should be empty if the player get bitten by bugs
		player.reset(); // the position
        gems.reset();   //  their random position
    }

    if(player.lives === 0) {
        location.reload();  // is there a better way????
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//   -------------------------- LIVES/HEARTS ------------------------------

function displayLives(num) {
  const lives = document.querySelector('.hearts');
  const showHearts = '<img src="images/Heart.png">';
  lives.innerHTML = "";

  for (let i = 0; i < num; i++) {
    lives.innerHTML += showHearts;
  }
}

//   -------------------------- PLAYER ------------------------------

// This class requires an update(), render() and a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.lives = 3;
}

Player.prototype.update = function() {
    displayLives(this.lives);

    // prevent player from moving beyond canvas
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // if he reaches the water and wins game
    if(player.y < 20) {
        gameWon();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// update player position in response to key presses
Player.prototype.handleInput = function(key) {
    if(key == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if(key == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if(key == 'right' && this.x < 405) {
        this.x += 102;
    }
    if(key == 'down' && this.y < 405) {
        this.y += 83;
    }
}

// in case of collision with enemies, reset the location
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

//   -------------------------- GEMS ------------------------------

var Gem = function(x, y, sprite, value) {
    this.sprite = sprite;
    this.x = x || Math.floor(Math.random() * 400);
    this.y = y || Math.floor(Math.random() * 250);
    this.value = value;
}

Gem.prototype.update = function() {
    gems.forEach(function(gem) {
        if (player.x == gem.x && player.y == gem.y) {
            // update score and pop one gem from array
            score += gem.value;
            displayScore.innerText = 'Points: ' + score;
            gems.pop();
        }
    })
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gem.prototype.reset = function() {
    this.x = Math.floor(Math.random() * 350);
    this.y = Math.floor(Math.random() * 250);
}


// --------------- Now instantiate your objects.

var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-190, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);
var enemy6 = new Enemy(-890, 230);

const blueGem = new Gem(101, 215, 'images/Gem-Blue.png', 100);
const greenGem = new Gem(404, 55, 'images/Gem-Green.png', 200);
const orangeGem = new Gem(202, 135, 'images/Gem-Orange.png', 300);

let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
var player = new Player(200, 380);
let gems = [blueGem, greenGem, orangeGem];


// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//  --------------- Start game modal

const gameStart = document.getElementById('play-game');

gameStart.addEventListener('click', function() {
    // Hide modal and overlay
    document.getElementById('modal').classList.add('modal-hide');
    document.getElementById('overlay').classList.add('modal-hide');
});


// When the game is won, display the hidden modal with the congratulation message and play again button
function gameWon() {
    // display modal and overlay
    const gameWon = document.getElementById('win');
    const overlay = document.getElementById('overlay');
    gameWon.classList.remove('modal-hide');
    overlay.classList.remove('modal-hide');

    // restart game
    const replayGame = document.getElementById("replay");
    replayGame.addEventListener('click', function() {
        location.reload();
    })
};
