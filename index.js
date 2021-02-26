/********global variables **************/
const main = document.querySelector('.main');
const numOfTiles =600;
const worldHeightInTiles = 20;
const worldWidthtInTiles = 30;
let contentDiv;
let row_idArray=[];//the array
let tileNumber;
let headOfCloud=530;
let tilesInventory =[1];
let treeStart = 183;
let rockStart = 198;
/********end of global variables **************/

/********FUNCTIONS**************/
//startPage(); should be enabled by default
startGame();
getArray_info();
drawSoil();
drawGrass();
drawTree();
drawCloud();
drawRocks();
removeATile();
//drawMatrix(); //draw main matrix
/******END***OF***FUNCTIONS**************/


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

function drawMatrix(){
 let k=1;
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
   aTile.setAttribute('data-id',`${k++}`);
  }
 } 
}

function drawSoil(){ 
 for(let i=(numOfTiles-150); i<row_idArray.length;i++){
  row_idArray[i].classList.add('soil');
  row_idArray[i].setAttribute('Type','soil');
 } 
}

function drawGrass(){
 for(let i=(numOfTiles-180); i<(numOfTiles-150);i++){
  row_idArray[i].classList.add('grass');
  row_idArray[i].setAttribute('Type','grass');
 }
}

function drawCloud(){
 row_idArray[numOfTiles-530].classList.add('cloud');
 for(let i=(numOfTiles-502); i<=(numOfTiles-499);i++){
  row_idArray[i].classList.add('cloud');
 }
 for(let i=(numOfTiles-473); i<=(numOfTiles-468);i++){
  row_idArray[i].classList.add('cloud');
  row_idArray[i].setAttribute('Type','cloud');
 }
}

function drawTree(){ //let treeStart = 187;
 if(treeStart>=182 && treeStart <=209){
  //draw treelog
  for(let i=treeStart; i<=treeStart+60; i+=30){
   row_idArray[numOfTiles-i].classList.add('wood'); 
   row_idArray[numOfTiles-i].classList.add('wood');
  }
  //draw treeleaves   
   for(let i=treeStart+149; i<=treeStart+151; i++){
    row_idArray[numOfTiles-i].classList.add('leaves');
    row_idArray[numOfTiles-i].classList.add('leaves');
   }
    for(let i=treeStart+119; i<=treeStart+121; i++){
    row_idArray[numOfTiles-i].classList.add('leaves');
    row_idArray[numOfTiles-i].classList.add('leaves');
   }
    for(let i=treeStart+89; i<=treeStart+91; i++){
    row_idArray[numOfTiles-i].classList.add('leaves');
    row_idArray[numOfTiles-i].classList.add('leaves');
   } 
 }else{
  console.log('You cannot plant a tree there');
 }
}

function drawRocks(){//rockStart =205
 if(rockStart>=181 && rockStart <=207){
  for(let i=rockStart; i<=rockStart+2; i++){
   row_idArray[numOfTiles-i].classList.add('rock');
   row_idArray[numOfTiles-i].classList.add('rock');
  } 
 } 
}


function removeATile(){
 document.querySelector('.content').addEventListener('click',(e)=>{     //log the row and col
  //console.log(`row: ${e.target.dataset.row_id}`,`col: ${e.target.dataset.col_id}`);  
  //console.log(`${e.target.dataset.id}`);
  //console.log(`${e.target.classList}`);
  let DT = `${e.target.dataset.type}`;
  let TType =`${e.target.classList}`;
  //console.log('TType:',TType, 'TType type: ',typeof(TType)); //TType is  string
 });
}

/**Grass */
/*let grassArray = document.querySelector('.grass');
grassArray.parentElement.addEventListener('click',(e)=>{ 
 console.log('classlist');
 if(shovel && e.target.classList.contains('grass')){
  e.target.classList.remove('grass');
  console.log('grass tile is removed');
 } 
});*/

let shovel = 1;
/*insert all tiles in an array and event listener */
function getArray_info(){
 document.querySelector('.content').addEventListener('click',(e)=>{     //log the row and col
  console.log(`row: ${e.target.dataset.row_id}`,`col: ${e.target.dataset.col_id}`);  
  
  if(shovel && e.target.classList.contains('grass')){
   e.target.classList.remove('grass');
   console.log('grass tile is removed from getArray_info');
   if(tilesInventory.length >=1){
    tilesInventory.pop();
    tilesInventory.push('grass');
    console.log('tilesInventory:',tilesInventory);
   }
  } 


  tileNumber = `${e.target.dataset.id}`;
  console.log('tileNumber:',tileNumber);
 }); 
 row_idArray= [...document.querySelectorAll(`[data-id]`)];//all tiles in an array
 console.log(row_idArray);
}