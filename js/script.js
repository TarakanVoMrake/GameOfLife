let colorCells = "#222222";
let destiny = 0.5;
let sizeField = 10;
let sizeCanvas = 750;
let lengthCells = sizeCanvas / sizeField;
let field = [];
let newField = [];
let living = false;
const stepsInterval = [2000, 1000, 500, 250, 125, 60, 40, 20];
let stepInterval = stepsInterval[3];

const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.translate(0.5, 0.5);
context.globalAlpha = 1;

/*window.devicePixelRatio для нахождения соотношения (плотности) физического количества пикселей на устройстве к
логическому количеству пикселей,  которое браузер использует для отображения содержимого.
||1 ИЛИ 1,  используется для того, чтобы задать значение по умолчанию*/
const dpr = window.devicePixelRatio || 1;
console.log(dpr);
// Задаем размер канваса с учетом плотности пикселей
canvas.width = sizeCanvas * dpr;
canvas.height = sizeCanvas * dpr;
// Задаем размеры, чтобы они оставались sizeCanvas x sizeCanvas
canvas.style.width = String(sizeCanvas)+ "px"; 
canvas.style.height = String(sizeCanvas) + "px";
// Масштабируем контекст
context.scale(dpr, dpr);


generateRandomField();



// Рисуем
function drawField() {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, sizeCanvas, sizeCanvas);
    context.fillStyle = colorCells;

    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            if (field[i][j] === 1) {
                context.fillRect(
                    j * lengthCells,
                    i * lengthCells,
                    lengthCells,
                    lengthCells
                );
            }
        }
    }
};

//Play button
function play () {
    console.log("Play\n");    
    if (!living) living = setInterval(step, stepInterval);
}

//Stop button
function stop () {
    console.log("Stop\n");
    clearInterval(living);
    living = false;
}

function generateRandomField () {
    stop();
    random();
    drawField();
}

function clearField () {
    clearInterval(living);
    living = false;
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            field[i][j] = 0;
        }
    }

    drawField();
}

//step
function step () {
    console.log("Step");
    
    for (let i = 0; i < sizeField; i++) {
        newField[i] = [];
        for (let j = 0; j < sizeField; j++) {
            checkNeighbors(i, j);
        }
    }
    
    field = newField.slice();
    drawField();
}

//Make random field
function random () {
    console.log("Random");
    
    field = [];
    newField = [];
    for (let i = 0; i < sizeField; i++) {
        field[i] = []
        for (let j = 0; j < sizeField; j++) {
            if (Math.random() < destiny) {
                field[i][j] = 1;
            } else {
                field[i][j] = 0;
            }
        }
    }    
}

function checkNeighbors(i, j) {
    if (field[i][j] === 1) {
        let countAliveNeighbors = 
            field[(i - 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField] + 
            field[(i - 1 + sizeField) % sizeField][j] + 
            field[(i - 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField] + 
            field[i][(j - 1 + sizeField) % sizeField] + 
            field[i][(j + 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][j] + 
            field[(i + 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField];

            //console.log(" i = " + i + " j = " + j, "countAliveNeighbors = " , countAliveNeighbors);
                        
        if (countAliveNeighbors === 2 || countAliveNeighbors === 3) newField[i][j] = 1;
        else  newField[i][j] = 0;
    } else {
        let countAliveNeighbors = 
            field[(i - 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField] + 
            field[(i - 1 + sizeField) % sizeField][j] + 
            field[(i - 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField] + 
            field[i][(j - 1 + sizeField) % sizeField] + 
            field[i][(j + 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][j] + 
            field[(i + 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField];

            //console.log("-i = " + i + " -j = " + j, "countAliveNeighbors = " , countAliveNeighbors);
            
        if (countAliveNeighbors === 3) newField[i][j] = 1;
        else  newField[i][j] = 0;
    }
}

const myCanvas = document.getElementById("canvas");
myCanvas.addEventListener('click', (event) => {
    // const rect = event.target.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    let rect = myCanvas.getBoundingClientRect();
    let left = rect.left;
    let top = rect.top;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let column = Math.floor(x / lengthCells);
    let row = Math.floor(y / lengthCells);
    if (field[row][column] === 1) field[row][column] = 0;
    else field[row][column] = 1;
    drawField();
});

//MENU

function setBgColor (input) {
    colorCells = input.value;
    drawField();
}

function  setSize (input) {
    console.log("SetSize");
    
    sizeField = input.value;
    lengthCells = sizeCanvas / sizeField;    
    field = [];
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
//TO DO
/*const slider = document.getElementById('slider');
const output = document.getElementById('output');
      
slider.addEventListener('input', () => {
    output.value = slider.value;
});

output.addEventListener('input', () => {
    if (output.value >= slider.min && output.value <= slider.max) {
        slider.value = output.value;
    }
});*/

function print () {
    
    console.log("======INFO====");
    console.log("sizeField = " + sizeField);
    console.log("Field:");
    console.log(...field);
    console.log("newField:");
    console.log(...newField);
    console.log("===========");
}