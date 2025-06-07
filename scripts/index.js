'use strict';

const carPlayer = document.querySelector('.main__car_player');
const buttonPlay = document.querySelector('.header__button');
const section = document.querySelector('.main__section');
const sectionDialog = document.querySelector('.main__section_dialog');
const road1 = document.querySelector('.road1');
const road2 = document.querySelector('.road2');
const road3 = document.querySelector('.road3');
const main = document.querySelector('.main');

// timer element
const timerElement = document.createElement('p');
timerElement.classList.add('main__timer');
timerElement.innerText = 'Timer 1:00';
main.appendChild(timerElement);

// position car player
const carPlayerLeft = 75;
const carPlayerBottom = 30;
let left = 0;
let bottom = 10;
let topRoad1 = 0;
let topRoad2 = 325;
let topRoad3 = 650;

// position car
const carBottoms = [];
const carLefts = [];
let carBottom = 660;

// cars
const cars = [];

// control car player
let driveCarPlayer = 0;

document.addEventListener('keydown', (e) => {
    if (driveCarPlayer === 1) {
        if (e.code == 'ArrowRight' && left < 225) {
            carPlayer.style.left = `${left = left + carPlayerLeft}px`
        } else if (e.code == 'ArrowLeft' && left > 0) {
            carPlayer.style.left = `${left = left - carPlayerLeft}px`
        } else if (e.code == 'ArrowUp' && bottom < 460) {
            carPlayer.style.bottom = `${bottom = bottom + carPlayerBottom}px`
        } else if (e.code == 'ArrowDown' && bottom > 10) {
            carPlayer.style.bottom = `${bottom = bottom - carPlayerBottom}px`
        }
    }
});



// game
buttonPlay.addEventListener('click', () => {
    // control car player
    driveCarPlayer = 1;
    
    // timerPlay
    const end = new Date().getTime() + 60000;
    const intervalTimePlay = setInterval(() =>{
        const timeInt = new Intl.DateTimeFormat('ru-RU', {
            minute: 'numeric',
            second: 'numeric'
        }).format(end + 100 - new Date());
        timerElement.innerText = `Timer ${timeInt}`;
    }, 1000);
    
    const timerGame = setTimeout(() => {
        clearInterval(intervalTimePlay);
    }, 60000);

    // road
    const intervalRoad = setInterval(() => {
        if (topRoad1 === 0){
            road1.style.top = `${topRoad1 = topRoad1 - 30}px`;
            road2.style.top = `${topRoad2 = topRoad2 - 30}px`;
            road3.style.top = `${topRoad3 = topRoad3 - 30}px`;
        } else if (topRoad1 === -30){
            road1.style.top = `${topRoad1 = topRoad1 + 30}px`
            road2.style.top = `${topRoad2 = topRoad2 + 30}px`;
            road3.style.top = `${topRoad3 = topRoad3 + 30}px`;
        }
    }, 70);
    
    // cars
    const carGenerate = setInterval(() => {
        function getRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let colorCar;
        let carLeft;
        
        function getRandomLeftCar() {
            if (getRandomNumber(1, 4) == 1) {
                colorCar = '../images/машина1.png';
                carLeft = 0;
                return 0;
            } else if (getRandomNumber(1, 4) == 2) {
                colorCar = '../images/машина2.png';
                carLeft = 75;
                return 75;
            } else if (getRandomNumber(1, 4) == 3) {
                colorCar = '../images/машина3.png';
                carLeft = 150;
                return 150;
            } else {
                colorCar = '../images/машина4.png';
                carLeft = 225;
                return 225;
            }
        }
        

        // random
        getRandomLeftCar();
        const car = document.createElement('img');
        car.setAttribute('src', colorCar);
        car.classList.add('main__car');
        section.appendChild(car);
        car.style.left = `${getRandomLeftCar()}px`;
        
        // push
        cars.push(car);
        carBottoms.push(carBottom);
        carLefts.push(carLeft);
    }, 3200);
    
    const carPosition = setInterval(() => {
        cars.forEach((car, indexCar) => {
            car.style.bottom = `${carBottoms[indexCar] = carBottoms[indexCar] - 6}px`
        });
    }, 60);

    
    // Accident
    const accident = setInterval(() => {
        carBottoms.forEach((carBottom, carLeftIndex) => {
            if ((carBottom - bottom >= 0 && carBottom - bottom < 147) && (left === carLefts[carLeftIndex])) {
                stop();
            } else if ((bottom - carBottom >= 0 && bottom - carBottom < 147) && (left === carLefts[carLeftIndex])) {
                stop();
            }
        })
    }, 60);

    // stop
    function stop(dialogNumber) {
        clearInterval(intervalRoad);
        clearInterval(carGenerate);
        clearInterval(carPosition);
        clearInterval(accident);
        clearInterval(intervalTimePlay);
        clearTimeout(timerRoad);
        clearTimeout(timerGame);

        timerElement.innerText = 'Timer 1:00';
        driveCarPlayer = 0;
        
        // dialog
        const dialogElement = document.createElement('dialog');
        const h2DialogElement = document.createElement('h2');
        const buttonDialogElement = document.createElement('button');
        buttonDialogElement.innerText = 'Закрыть';
    
        section.appendChild(dialogElement);
        dialogElement.appendChild(h2DialogElement);
        dialogElement.appendChild(buttonDialogElement);
    
        dialogElement.classList.add('dialog');

        dialogElement.showModal()
        if (dialogNumber === 1) {
            h2DialogElement.innerText = 'You Win'
            h2DialogElement.style.color = 'green';
        } else {
            h2DialogElement.innerText = 'Game Over'
        }

        buttonDialogElement.addEventListener('click', () => {
            location.reload();
        });
    }

    // end
    const timerRoad = setTimeout (() => {
        stop(1);
    }, 60000);
});