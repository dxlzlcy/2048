var board = [];
var rows = 4;
var columns = 4;
var score = 0;

// board = [
//     [2,2,2,2],
//     [2,2,2,2],
//     [4,4,4,4],
//     [8,8,8,8],
// ]

board = [
    [2,2,0,0],
    [2,2,0,0],
    [0,0,0,0],
    [0,0,0,0],
]

window.onload= function(){
    startGame();
    setStartButton();
    eventListen();
}

function setStartButton(){
    let btn = document.getElementById('start')
    btn.innerText = 'start';
    btn.addEventListener('click',function(){
        board = [];
        score = 0;
    
        board = [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
    
        document.getElementById('board').innerHTML = '';
        document.getElementById('score').innerHTML = 0;
    
        startGame();
    
    })
}

function log(x){
    document.getElementById('log').innerText = x;
}

function eventListen(){

    document.addEventListener('keyup',e=>{
        if(e.code=="ArrowLeft"){
            moveLeft();
            update();
        }else if(e.code=="ArrowRight"){
            moveRight();
            update();
        }else if(e.code=="ArrowUp"){
            moveUp();
            update();
        }else if(e.code=="ArrowDown"){
            moveDown();
            update();
        }
    })
}

function startGame(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = i + '-' + j;
            let value = board[i][j];
            tile.innerText = value?value:'';

            if(value<=4096){
                tile.classList.add('x'+value);
            }else{
                tile.classList.add('x8192');
            }

            document.getElementById('board').append(tile);
        }
    }

}

function checkGameOver(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]==0){
                return false;
            }
        }
    }
    return true;
}

function addTwo(){
    console.log('addTwo..');
    if(checkGameOver()){
        alert('Game Over!');
        return;
    }
    found = false;
    while(!found){
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);
        if(board[r][c]==0){
            board[r][c] = 2;
            found = true;
        }   
    }
}

function updateScore(){
    document.getElementById('score').innerText = score;
}

function update(){
    addTwo();
    addTwo();
    updateScore();
    updateBoard();
}

function updateBoard(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            let tile = document.getElementById(i+'-'+j);
            let value = board[i][j];
            tile.innerText = value?value:'';
            tile.classList.value = '';
            tile.classList.add('tile');
            if(value<=4096){
                tile.classList.add('x'+value);
            }else{
                tile.classList.add('x8192');
            }

        }
    }
}

function moveDown(){
    for(let c=0;c<columns;c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row = moveLeftRow(row);
        row.reverse();
        for(let r=0;r<rows;r++){
            board[r][c] = row[r];
        }
    }
}

function moveUp(){
    for(let c=0;c<columns;c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row = moveLeftRow(row);
        for(let r=0;r<rows;r++){
            board[r][c] = row[r];
        }
    }
}

function moveRight(){
    for(let i=0;i<rows;i++){
        let row = board[i];
        row.reverse();
        row = moveLeftRow(row);
        row.reverse();
        board[i] = row;
    }
}

function moveLeft(){
    for(let i=0;i<rows;i++){
        let row = board[i];
        row = moveLeftRow(row);
        board[i] = row;
    }
}

function moveLeftRow(row){
    row = filterZero(row);
    for(let i=0;i<row.length-1;i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score += row[i];
        }
    }
    row = filterZero(row);
    row = addZero(row);
    return row;
}

function addZero(row){
    while(row.length<4){
        row.push(0);
    }
    return row;
}

function filterZero(row){
    return row.filter(i=>i!=0);
}