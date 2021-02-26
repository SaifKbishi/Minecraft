/********global variables **************/
const main = document.querySelector('.main');
const numOfTiles =600;
const worldHeightInTiles = 20;
const worldWidthtInTiles = 30;
const headOfCloud = 530;
const treeStart = 183;
const rockStart = 198;

let contentDiv;
let aside;
let rightPanel;
let row_idArray=[];//the array
let tileNumber;
let tilesInInventory =[1];
let toolInHand;

/********end of global variables **************/

/********Inventory**************/
let tools=[
 {
  name: 'axe',
  usedFor:['trees','leaves'],
  inHand: 0
 },
 {
  name: 'shovel',
  usedFor:['grass','soil'],
  inHand: 0
 },
 {
  name: 'pickaxe',
  usedFor:'rock',
  inHand: 0
 }
];
/*****END***Of***Inventory**************/

/********FUNCTIONS**************/
//startPage(); should be enabled by default
startGame();
drawToolsAndInventory();
getArray_info();
drawSoil();
drawGrass();
drawTree();
drawCloud();
drawRocks();
removeATile();
handleInventory();
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
 let section = document.createElement('section');
 aside = document.createElement('aside');
 aside.classList.add('rightPanel');
 //let contentDiv = document.createElement('div');
 contentDiv = document.createElement('div');
 contentDiv.classList.add('content');
 
 main.insertAdjacentElement('afterbegin',section);
 section.insertAdjacentElement('afterbegin',contentDiv);
 section.insertAdjacentElement('afterend',aside);
 drawMatrix();//draw main matrix
}

function drawToolsAndInventory(){
 let inventoryDiv = document.createElement('div');
 aside.insertAdjacentElement('afterbegin',inventoryDiv);
 inventoryDiv.classList.add('inventoryDiv','inventoryTile');
 
 let pickaxeDiv = document.createElement('div');
 pickaxeDiv.classList.add('pickaxe','toolsTile');
 aside.insertAdjacentElement('afterbegin',pickaxeDiv);
 pickaxeDiv.setAttribute('data-type','pickaxe');

 let ShovelDiv = document.createElement('div');
 aside.insertAdjacentElement('afterbegin',ShovelDiv);
 ShovelDiv.classList.add('shovel','toolsTile');
 ShovelDiv.setAttribute('data-type','shovel');

 let AxeDiv = document.createElement('div');
 aside.insertAdjacentElement('afterbegin',AxeDiv);
 AxeDiv.classList.add('axe','toolsTile');
 AxeDiv.setAttribute('data-type','axe');
 
 let resetDiv = document.createElement('div');
 aside.insertAdjacentElement('afterbegin',resetDiv);
 resetDiv.classList.add('resetDiv');
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
   //aTile.setAttribute('data-row_id',`${(i+1)}`);
   //aTile.setAttribute('data-col_id',`${(j+1)}`);
   aTile.setAttribute('data-id',`${k++}`);
  }
 } 
}

function drawSoil(){ 
 for(let i=(numOfTiles-150); i<row_idArray.length;i++){
  row_idArray[i].classList.add('soil');
  row_idArray[i].setAttribute('data-type','soil');
 } 
}

function drawGrass(){
 for(let i=(numOfTiles-180); i<(numOfTiles-150);i++){
  row_idArray[i].classList.add('grass');
  row_idArray[i].setAttribute('data-type','grass');
 }
}

function drawCloud(){
 row_idArray[numOfTiles-530].classList.add('cloud');
 for(let i=(numOfTiles-502); i<=(numOfTiles-499);i++){
  row_idArray[i].classList.add('cloud');
 }
 for(let i=(numOfTiles-473); i<=(numOfTiles-468);i++){
  row_idArray[i].classList.add('cloud');
  row_idArray[i].setAttribute('data-type','cloud');
 }
}

function drawTree(){ //let treeStart = 187;
 if(treeStart>=182 && treeStart <=209){
  //draw treelog
  for(let i=treeStart; i<=treeStart+60; i+=30){
   row_idArray[numOfTiles-i].classList.add('wood'); 
   row_idArray[numOfTiles-i].setAttribute('data-type','wood');
  }
  //draw treeleaves   
  for(let i=treeStart+149; i<=treeStart+151; i++){
   row_idArray[numOfTiles-i].classList.add('leaves');
   row_idArray[numOfTiles-i].setAttribute('data-type','leaves');
  }
  for(let i=treeStart+119; i<=treeStart+121; i++){
   row_idArray[numOfTiles-i].classList.add('leaves');
   row_idArray[numOfTiles-i].setAttribute('data-type','leaves');
  }
  for(let i=treeStart+89; i<=treeStart+91; i++){
   row_idArray[numOfTiles-i].classList.add('leaves');
   row_idArray[numOfTiles-i].setAttribute('data-type','leaves');
  } 
 }else{
  console.log('You cannot plant a tree there');
 }
}

function drawRocks(){//rockStart =205
 if(rockStart>=181 && rockStart <=207){
  for(let i=rockStart; i<=rockStart+2; i++){
   row_idArray[numOfTiles-i].classList.add('rock');
   row_idArray[numOfTiles-i].setAttribute('data-type','rock');
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

function handleInventory(){
 let allTools =[];
 tools.forEach(tool => allTools.push(tool.name));
 document.querySelector(".rightPanel").addEventListener('click',(e)=>{
  console.log(e.target.dataset.type + ' is picked');  
  if(allTools.includes(e.target.dataset.type) ){
   //debugger;
   deSelectOtherTools(e);
   e.target.classList.toggle('toolsTileClicked');   
   tools.forEach(tool => {   //update the toll in hand
    if(tool.name === e.target.dataset.type){
     tool.inHand =1;
     console.log(tool.name+' can move ', tool.usedFor,tool.inHand );
    }
   });   
  }  
 });
}
function deSelectOtherTools(e){ 
 e.target.parentElement.childNodes.forEach(div => div.classList.remove('toolsTileClicked'));
 tools.forEach(tool => {tool.inHand =0;});
 
}


let shovel = 1;
/*insert all tiles in an array and event listener */
function getArray_info(){
 document.querySelector('.content').addEventListener('click',(e)=>{     //log the row and col
  //console.log(`row: ${e.target.dataset.row_id}`,`col: ${e.target.dataset.col_id}`);  
 console.log(e.target.dataset.type+ ' clicked');

  if(shovel && e.target.classList.contains('grass')){  //removing Grass
   e.target.classList.remove('grass');
   console.log('grass tile is removed from getArray_info');
   if(tilesInInventory.length >=1){
    tilesInInventory.pop();
    tilesInInventory.push('grass');
    console.log('tilesInInventory:',tilesInInventory);
   }
  } //removing Grass - END


  tileNumber = `${e.target.dataset.id}`;
  console.log('tileNumber:',tileNumber);
 }); 
 row_idArray= [...document.querySelectorAll(`[data-id]`)];//all tiles in an array
 console.log(row_idArray);
}