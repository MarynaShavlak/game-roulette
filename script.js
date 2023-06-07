let countShout = 0;
let currentPlayer = 1;
let rotateBaraban = 0;
let bulletPosition = getRandomBullet(1, 6);
const btnShot = document.querySelector('#shot');
const revolver = document.querySelector('#revolver');
const bullet = document.querySelector('#bullet');
const baraban = document.querySelector('#baraban');

function startGame() {
  btnShot.classList.add('off');
  bullet.style.display = 'block';
  revolver.style.display = 'block';
  btnShot.onclick = null;
  let rotateDegree = 0;

  const timer = setInterval(() => {
    rotateDegree += 10;
    baraban.style.transform = `rotate(${rotateDegree}deg)`;

    if (rotateDegree > 300) {
      bullet.style.display = 'none';
    }
    if (rotateDegree === 720) {
      clearInterval(timer);
      btnShot.innerText = 'Make a shot';
      btnShot.onclick = makeShot;
      btnShot.classList.remove('off');
    }
  }, 50);
}

function rotationRight() {
  revolver.style.background = 'url("images/revolver-right.png") no-repeat';
}
function rotationLeft() {
  revolver.style.background = 'url("images/revolver-left.png") no-repeat';
}

function endGame() {
  alert('Game over!');
  btnShot.onclick = restart;
  btnShot.innerText = 'Restart';
}

function getRandomBullet(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

btnShot.onclick = startGame;

function makeShot() {
  countShout += 1;
  if (countShout == bulletPosition) {
    showBlood();
    endGame();
  } else {
    currentPlayer === 1 ? rotationRight() : rotationLeft();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    let rotate = rotateBaraban;
    const barabanTimer = setInterval(() => {
      rotate += 10;
      baraban.style.transform = `rotate(${rotate}deg)`;
      if (rotate === rotateBaraban + 60) {
        clearInterval(barabanTimer);
        rotateBaraban = rotate;
      }
    }, 10);
  }
}

function restart() {
  location.reload();
}

function showBlood() {
  let bloodElement = document.createElement('div');
  bloodElement.id = 'blood';
  let playerElement = document.querySelector('#player' + currentPlayer);
  playerElement.appendChild(bloodElement);
}
