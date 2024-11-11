let colorCells = "#222222";
let destiny = 0.5;
let sizeField = 10;
let sizeCanvas = 750;
let lengthCells = sizeCanvas / sizeField;
//let field = [];
//let newField = [];
let aliveCells = new Set();
let newAliveCells = new Set();
let changedCells = new Set();
let living = false;
const stepsInterval = [2000, 1000, 500, 250, 125, 60, 40, 20];
let stepInterval = stepsInterval[3];



const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
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
    console.log("drawField");
    for (cell of changedCells) {
        //ERROR 
        if (aliveCells.has(cell)) {
            context.fillStyle = colorCells;
        } else context.fillStyle = "#ffffff";
        
        // console.log(cell[0], cell[1]);
        context.fillRect(
            cell[0] * lengthCells,
            cell[1] * lengthCells,
            lengthCells,
            lengthCells
        );
    }
    changedCells.clear();
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

function generateRandomField () {
    console.log("generateRandomField");
    clearField();
    random();
    drawField();    
}

function clearField () {
    console.log("clearField");
    stop();
    aliveCells.clear();
    changedCells.clear();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, sizeCanvas, sizeCanvas);
    //drawField();
}

//step
function step () {
    console.log("Step");
    newAliveCells.clear();
    for (const cell of aliveCells) {
        checkNeighbors(cell[0], cell[1]);
    }
    aliveCells = new Set(newAliveCells);
    drawField();
}

//Make random field
function random () {
    console.log("Random");
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            if (Math.random() < destiny) {
                console.log("add");
                aliveCells.add([i, j]);
                changedCells.add([i, j]);
            } else {
            }
        }
    }
}

// function checkNeighbors(i, j) {
//         let countAliveNeighbors = 
//             field[(i - 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField] + 
//             field[(i - 1 + sizeField) % sizeField][j] + 
//             field[(i - 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField] + 
//             field[i][(j - 1 + sizeField) % sizeField] + 
//             field[i][(j + 1 + sizeField) % sizeField] + 
//             field[(i + 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField] + 
//             field[(i + 1 + sizeField) % sizeField][j] + 
//             field[(i + 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField];
//     if (field[i][j] === 1) {
//             console.log(" i = " + i + " j = " + j, "countAliveNeighbors = " , countAliveNeighbors);
//             console.log("i = " + i);
//             console.log("i - 1 = " + (i - 1));
//             console.log("sF = " + sizeField);
            
//             console.log("i - 1 + sF = " + (i - 1 + sizeField) );
            
//             console.log((i - 1 + sizeField) );
//             console.log((j - 1 + sizeField) );
            
//             console.log(field[(i - 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField]);
//             console.log(field[(i - 1 + sizeField) % sizeField][j]);
//             console.log(field[(i - 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField]);
//             console.log(field[i][(j - 1 + sizeField) % sizeField]);
//             console.log(field[i][(j + 1 + sizeField) % sizeField]);
//             console.log(field[(i + 1 + sizeField) % sizeField][(j - 1 + sizeField) % sizeField]);
//             console.log(field[(i + 1 + sizeField) % sizeField][j]);
//             console.log(field[(i + 1 + sizeField) % sizeField][(j + 1 + sizeField) % sizeField]);
            
            
            
                        
//         if (countAliveNeighbors === 2 || countAliveNeighbors === 3) {newField[i][j] = 1;
//             console.log("+ => +");
            
//         } 
//         else  {
//             newField[i][j] = 0;
//             console.log("+ => -");
//         }
//     } else {
//             //console.log("-i = " + i + " -j = " + j, "countAliveNeighbors = " , countAliveNeighbors);
            
//         if (countAliveNeighbors === 3) {
//             newField[i][j] = 1;
//             console.log("- => +");
//         }
//         else  {
//             newField[i][j] = 0;
//             console.log("- => -");
//         }
//     }
// }
function checkNeighbors(i, j) {
    const up = (i - 1 + sizeField) % sizeField;
    const down = (i + 1 + sizeField) % sizeField;
    const left = (j - 1 + sizeField) % sizeField;
    const right = (j + 1 + sizeField) % sizeField;


    let countAliveNeighbors = 0;
    if (aliveCells.has([up, left])) countAliveNeighbors++;
    if (aliveCells.has([up, i])) countAliveNeighbors++;
    if (aliveCells.has([up, right])) countAliveNeighbors++;
    if (aliveCells.has([j, left])) countAliveNeighbors++;
    if (aliveCells.has([j, right])) countAliveNeighbors++;
    if (aliveCells.has([down, left])) countAliveNeighbors++;
    if (aliveCells.has([down, i])) countAliveNeighbors++;
    if (aliveCells.has([down, right])) countAliveNeighbors++;

    if (aliveCells.has([i, j])) {
        if ((countAliveNeighbors === 2 || countAliveNeighbors === 3)) {
            newAliveCells.add([i, j]);
        } else {
            changedCells.add([i, j]);
        }
    } else if (countAliveNeighbors === 3) {
        newAliveCells.add([i, j]);
        changedCells.add([i, j]);
    }
}


const myCanvas = document.getElementById("canvas");
myCanvas.addEventListener('click', (event) => {
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
    
    sizeField = Number(input.value);
    lengthCells = sizeCanvas / sizeField;
    console.log(sizeField);
    
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

function print1 () {
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            if(field[i][j] === 1) console.log(" i = " + i + " j = " + j, "isLive = " + field[i][j])
        }
    }   
}