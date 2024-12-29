let colorCells = "#222222";
let density = 0.5;
let sizeField = 10;
let totalCells = sizeField ** 2;
let sizeCanvas = 600;
let lengthCells = sizeCanvas / sizeField;
let aliveCells = new Set();
let newAliveCells = new Set();
let potentialCells = new Set();
let living = false;
const stepsInterval = [2000, 1000, 500, 250, 125, 60, 40, 20];
let stepInterval= stepsInterval[3];
let currentStep = 0;


let fieldSizeInfo = document.getElementById("field-size");
let amountAliveCellsInfo = document.getElementById("alive-cells");
let totalCellsInfo = document.getElementById("total-cells");
let percentageAliveCellsInfo = document.getElementById("percentage-alive-cells");
let currentStepInfo = document.getElementById("current-step");


const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;
/*window.devicePixelRatio для нахождения соотношения (плотности) физического количества пикселей на устройстве к
логическому количеству пикселей,  которое браузер использует для отображения содержимого.
||1 ИЛИ 1,  используется для того, чтобы задать значение по умолчанию*/
const dpr = window.devicePixelRatio || 1;
// const dpr = 1;
console.log(dpr);
// Задаем размер канваса с учетом плотности пикселей
canvas.width = sizeCanvas * dpr;
canvas.height =  sizeCanvas * dpr;
// Задаем размеры, чтобы они оставались sizeCanvas x sizeCanvas
canvas.style.width = `${sizeCanvas}px`; 
canvas.style.height = `${sizeCanvas}px`;
// Масштабируем контекст
context.scale(dpr, dpr);
context.lineWidth = 1;



generateRandomField();

// Рисуем
function drawField() {
    console.log("drawField");
    context.fillStyle = "#ffffff";
        context.fillRect(
            0,
            0,
            sizeCanvas,
            sizeCanvas
        );
    context.fillStyle = colorCells;
    for (const cell of aliveCells) {
        const cell_ = strToArr(cell);

        context.fillRect(
            cell_[0] * lengthCells,
            cell_[1] * lengthCells,
            lengthCells,
            lengthCells
        );
    }
    updateAllInfo();
};


//Play button
function play () {
    console.log("Play");
    if (!living) living = setInterval(step, stepInterval);
}

//Stop button
function stop () {
    console.log("Stop");
    clearInterval(living);
    living = false;
}

//Random button
function generateRandomField () {
    console.log("generateRandomField");
    clearField();
    random();
    drawField();    
}

//Clear button
function clearField () {
    console.log("clearField");
    currentStep = 0;
    stop();
    aliveCells.clear();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, sizeCanvas, sizeCanvas);
}

function random () {
    console.log("Random");
    currentStep = 0;
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            if (Math.random() < density) {
                aliveCells.add(arrToStr(i, j));
            }
        }
    }
}

//step
function step () {
    console.log("Step");
    currentStep++;
    findPotentialCells();    
    newAliveCells.clear();
    for (const cell of potentialCells) {
        const cell_ = strToArr(cell);
        checkNeighbors(cell_[0], cell_[1]);
    }
    aliveCells = new Set(newAliveCells);
    drawField();
}

function findPotentialCells() {
    potentialCells.clear();
    
    for (cell of aliveCells) {
        const cell_ = strToArr(cell);
        potentialCells.add(arrToStr(cell_[0], cell_[1]));
        
        for (const [x, y] of getNeighbors(cell_[0], cell_[1], sizeField)) potentialCells.add(arrToStr(x, y));
    }
}

function checkNeighbors(i, j) {
    let countAliveNeighbors = 0;
    for (const [x, y] of getNeighbors(i, j, sizeField)) {
        if (aliveCells.has(arrToStr(x, y))) countAliveNeighbors++;
    }

    const cell = arrToStr(i, j);    
    if (aliveCells.has(cell)) {
        if ((countAliveNeighbors === 2 || countAliveNeighbors === 3)) {
            newAliveCells.add(cell);
        }
    } else if (countAliveNeighbors === 3) {
        newAliveCells.add(cell);
    }
}

function getNeighbors(i, j, size) {
    const left = (i - 1 + size) % size;
    const right = (i + 1 + size) % size;
    const up = (j - 1 + size) % size;
    const down = (j + 1 + size) % size;
    return [
            [left, up],
            [left, j],
            [left, down],
            [i, up],
            [i, down],
            [right, up], 
            [right, j],
            [right, down]
    ];
}


//INFO
function updateAllInfo () {
    updateSizeInfo();
    updateAmountAliveInfo();
    updatePercentageInfo();
    updateCurrentStepInfo();
}

function updateSizeInfo() {
    fieldSizeInfo.innerHTML = `${sizeField}x${sizeField}`;
}

function updateAmountAliveInfo() {
    totalCells = sizeField ** 2;
    amountAliveCellsInfo.innerHTML = aliveCells.size;
    totalCellsInfo.innerHTML = totalCells;
}

function updatePercentageInfo() {
    let percentageAliveCells = (aliveCells.size / totalCells) * 100;
    percentageAliveCellsInfo.innerHTML = `${parseFloat(percentageAliveCells.toFixed(3))}%`;
}

function updateCurrentStepInfo() {
    currentStepInfo.innerHTML = currentStep;
}

//Draw Cells
const myCanvas = document.getElementById("canvas");
myCanvas.addEventListener('click', (event) => {
    let rect = myCanvas.getBoundingClientRect();
    let left = rect.left;
    let top = rect.top;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let row = Math.floor(y / lengthCells);
    let column = Math.floor(x / lengthCells);
    const cell_ = arrToStr(column, row);

    if (!aliveCells.delete(cell_)) {
        aliveCells.add(cell_);
    }
    //changedCells.add(cell_);    
    drawField();
});

//Settings
function setBgColor (input) {
    colorCells = input.value;
    drawField();
}

function  setSize (input) {
    console.log("SetSize");
     
    const number = document.getElementById('size-field').lastElementChild;
    const range = number.previousElementSibling;
    
    sizeField = Number(input.value);
    if (sizeField < 5) sizeField = 5;
    if (sizeField > 200) sizeField = 200;
    number.value = sizeField;
    range.value = sizeField;
    lengthCells = sizeCanvas / sizeField;
    console.log("sizeField", sizeField);
    
    generateRandomField();
}

function  setSpeed (input) {
    stepInterval = stepsInterval[input.value];
    console.log("stepInterval = " + stepInterval);
    if (living) {
        stop();
        play();
    }
}

// function print () {
//     console.log("======INFO====");
//     console.log("sizeField = " + sizeField);
//     console.log("aliveCells:");
//     console.log(...aliveCells);
//     console.log("newAliveCells:");
//     console.log(...newAliveCells);
//     console.log("potentialCells:");
//     console.log(...potentialCells);
//     console.log("===========");
// }

function strToArr (cell) {
    return cell.split(",").map(Number);
}

function arrToStr (column, row) {
    return [column, row].join(",");
}

// RULES
const closeButton = document.getElementById('closeRules');
const modal = document.getElementById('rules');

function openRules() {
    modal.style.display = 'flex';
}

function closeRules() {
    modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
      if (event.target === modal) closeRules();
});