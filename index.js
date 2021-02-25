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
 //console.log('start game func');
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
 let aTile;
 for(let i=0; i<worldHeightInTiles; i++){
  aRow = document.createElement('div');
  aRow.classList.add('aRow');
  contentDiv.insertAdjacentElement('afterbegin',aRow);
  for(let j=0; j<worldWidthtInTiles; j++ ){
   aColumn = document.createElement('span');
   aColumn.classList.add('tile');
   //aColumn.innerText = `${(i+1)+','+(j+1)}`;   
   aRow.insertAdjacentElement('afterbegin',aColumn);
   aTile = document.querySelector('.tile');
   aTile.setAttribute('data-row_id',`${(i+1)}`);
   aTile.setAttribute('data-col_id',`${(j+1)}`);   
  }  
 } 
}

let row_idArray=[];//the array

function drawSoil(){ 
 row_idArray= [...document.querySelectorAll(`[data-row_id]`)];//all tiles in an array
 console.log(row_idArray, row_idArray.length);

 for(let i=450; i<row_idArray.length;i++){
  row_idArray[i].classList.add('soil');
 }

 document.querySelector('.content').addEventListener('click',(e)=>{     //log the row and col
  console.log(`row: ${e.target.dataset.row_id}`,`col: ${e.target.dataset.col_id}`);  
 });

}
function drawGrass(){
 for(let i=420; i<450;i++){
  row_idArray[i].classList.add('grass');
 }
}


/********FUNCTIONS**************/
//startPage(); should be enabled by default
startGame();
drawSoil();
drawGrass();
//drawMatrix(); //draw main matrix