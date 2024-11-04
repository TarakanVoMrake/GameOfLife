let colorCells = "#222222";
let destiny = 0.5;
let sizeField = 10;
let sizeCanvas = 750;
let lengthCells = sizeCanvas / sizeField;
let field = [];
let newField = [];
let living = false;

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
console.log(canvas.width);
console.log(canvas.height);
// Задаем размеры, чтобы они оставались sizeCanvas x sizeCanvas
canvas.style.width = String(sizeCanvas)+ "px"; 
canvas.style.height = String(sizeCanvas) + "px";
// Масштабируем контекст
context.scale(dpr, dpr);


generateField();

function generateField () {
    random();
    drawField();
}

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
            // if ((i + j) % 3 !== 1) {
            //     context.fillRect(
            //                 i * lengthCells,
            //                 j * lengthCells,
            //                 lengthCells,
            //                 lengthCells
            //             );
            // }
        }
    }
};

//Play button
function play () {
    console.log("Play\n");    
    if (!living) living = setInterval(step, 100);
}

//Stop button
function stop () {
    console.log("Stop\n");
    clearInterval(living);
    living = false;
}

//step
function step () {
    console.log("Step\n");
    
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
    clearInterval(living);
    living = false;

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

function checkNeighbors(i, k) {
    if (field[i][k] === 1) {
        let countAliveNeighbors = 
            field[(i - 1 + sizeField) % sizeField][(k - 1 + sizeField) % sizeField] + 
            field[(i - 1 + sizeField) % sizeField][k] + 
            field[(i - 1 + sizeField) % sizeField][(k + 1 + sizeField) % sizeField] + 
            field[i][(k - 1 + sizeField) % sizeField] + 
            field[i][(k + 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][(k - 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][k] + 
            field[(i + 1 + sizeField) % sizeField][(k + 1 + sizeField) % sizeField];

            console.log(" i = " + i + " k = " + k, "countAliveNeighbors = " , countAliveNeighbors);
                        
        if (countAliveNeighbors === 2 || countAliveNeighbors === 3) newField[i][k] = 1;
        else  newField[i][k] = 0;
    } else {
        let countAliveNeighbors = 
            field[(i - 1 + sizeField) % sizeField][(k - 1 + sizeField) % sizeField] + 
            field[(i - 1 + sizeField) % sizeField][k] + 
            field[(i - 1 + sizeField) % sizeField][(k + 1 + sizeField) % sizeField] + 
            field[i][(k - 1 + sizeField) % sizeField] + 
            field[i][(k + 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][(k - 1 + sizeField) % sizeField] + 
            field[(i + 1 + sizeField) % sizeField][k] + 
            field[(i + 1 + sizeField) % sizeField][(k + 1 + sizeField) % sizeField];

            console.log("-i = " + i + " -k = " + k, "countAliveNeighbors = " , countAliveNeighbors);
            
        if (countAliveNeighbors === 3) newField[i][k] = 1;
        else  newField[i][k] = 0;
    }
}

function changeLifeCell () {
    
}

function setBgColor(input) {
    colorCells = input.value;
    drawField();
}