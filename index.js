const main = document.querySelector('.main');

function startPage(){
 main.classList.add('startScreen');
 let startBtnDiv = document.createElement('div');
 startBtnDiv.classList.add('startBtnDiv');
 main.insertAdjacentElement('afterbegin',startBtnDiv);

 let startBtn = document.createElement('button');
 startBtn.textContent='Start Game';
 startBtn.classList.add('startBtn');
 startBtnDiv.insertAdjacentElement('afterbegin',startBtn);

 startBtn.addEventListener('click',()=>{
  startBtnDiv.classList.add('hidden');
  startBtn.classList.add('hidden');
  startGame();
 });
}

let contentDiv;
function startGame(){
 console.log('startgame func');
 let section = document.createElement('section');
 let aside = document.createElement('aside');
 aside.classList.add('rightPanel');
 //let contentDiv = document.createElement('div');
 contentDiv = document.createElement('div');
 contentDiv.classList.add('content');
 
 main.insertAdjacentElement('afterbegin',section);
 section.insertAdjacentElement('afterbegin',contentDiv);
 section.insertAdjacentElement('afterend',aside);
 drawMatrix();//draw main matrix
}

const worldHeightInTiles = 20;
const worldWidthtInTiles = 30;
//let aRow,aColumn;
function drawMatrix(){
 for(let i=0; i<worldHeightInTiles; i++){
  aRow = document.createElement('div');
  aRow.classList.add('aRow');
  contentDiv.insertAdjacentElement('afterbegin',aRow);
  for(let j=0; j<worldWidthtInTiles; j++ ){
   aColumn = document.createElement('span');
   aColumn.classList.add('tile');
   aColumn.innerText = `${i +' , '+ j }`;   
   aRow.insertAdjacentElement('afterbegin',aColumn);
  }
 }
 let aTile = document.querySelector('.tile');
 aTile.setAttribute('data-id','');
}



/********FUNCTIONS**************/
//startPage(); should be enabled by default
startGame();

//drawMatrix(); //draw main matrix