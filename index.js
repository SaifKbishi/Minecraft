/********global variables **************/
const main = document.querySelector('.main');
const numOfTiles =600;
const worldHeightInTiles = 20;
const worldWidthtInTiles = 30;
const headOfCloud = 530;
const treeStart = 183; //must be between tile 182 && 209
const rockStart = 198; //must be between tiles 181 && 207

let contentDiv;
let inventoryDiv;
let aside;
let rightPanel;
let row_idArray=[];//array of all tiles
let allTools =[];
let tileNumber;
let tilesInInventory =[1];
let toolInHand={};
let inventoryClasses;
/********end of global variables **************/

/********Inventory**************/
let tools=[
 {
  name: 'axe',
  usedFor:['wood','leaves'],
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
row_idArray= [...document.querySelectorAll(`[data-id]`)];//all tiles in an array
console.log(row_idArray);
removeATile();
drawSoil();
drawGrass();
drawTree();
drawCloud();
drawRocks();

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
 inventoryDiv = document.createElement('div');
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
 let k=599;
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
   aTile.setAttribute('data-col_id',`${(j+1)}`);
   aTile.innerText= k;
   aTile.setAttribute('data-id',`${k--}`);
   
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

function handleInventory(){ 
 tools.forEach(tool => allTools.push(tool.name));
 document.querySelector(".rightPanel").addEventListener('click',(e)=>{
  console.log(e.target.dataset.type + ' is picked');  
  if(allTools.includes(e.target.dataset.type) ){
   /* Unselect other tools and update tool in hand */
   e.target.parentElement.childNodes.forEach(div => div.classList.remove('toolsTileClicked'));
   tools.forEach(tool => {tool.inHand =0;});
   e.target.classList.toggle('toolsTileClicked');   
   tools.forEach(tool => {   //update the tool in hand
    if(tool.name === e.target.dataset.type){
     tool.inHand =1;
     //toolInHand = tool.name;
     toolInHand = tool;
     console.log(tool.name+' can move ', tool.usedFor,tool.inHand );
    }
   });   
  }
  //here maybe
 });
}

function removeATile(){
 document.querySelector('.content').addEventListener('click',(e)=>{     
  //console.log(`row: ${e.target.dataset.row_id}`,`col: ${e.target.dataset.col_id}`);
  tileNumber = `${e.target.dataset.id}`;
  console.log('tileNumber:',tileNumber);
  console.log(e.target.dataset.type+ ' clicked');
  //if tile has type && tool in Hand can remove it
  if(e.target.dataset.type && toolInHand.usedFor.includes(e.target.dataset.type)){   
   console.log('we have a tool in hand and a tile that we can move');
   //check if we can remove the tile (nothing above it)
   //canRemoveTile(e);
   let tileIndex = e.target.dataset.col_id;
   let selectedTileParent = e.target.parentElement;
   let rowAboveSelecedTile = selectedTileParent.previousElementSibling;
   //console.log('col index: ', tileIndex );
   //console.log(rowAboveSelecedTile.children[30-tileIndex]);
   let tileAboveType = rowAboveSelecedTile.children[30-tileIndex].dataset.type;
   if(tileAboveType == undefined){
    console.log('you can remove this tile');
    e.target.classList.remove(e.target.dataset.type);
     if(tilesInInventory.length >=1){ //update inventory
      console.log('tilesInInventory: ',tilesInInventory);
      inventoryDiv.classList.remove(tilesInInventory[0]);
      tilesInInventory.pop();
      tilesInInventory.push(e.target.dataset.type);
      console.log('tilesInInventory:',tilesInInventory);
      document.querySelector('.inventoryTile').classList.add(e.target.dataset.type);
     }
   }else{
    console.log('you CANNOT remove this tile');
    //need to implement animation for a tile to blink
   }

  }
 }); 
}//removeATile

/*
function canRemoveTile(e){
 let tileIndex = e.target.dataset.col_id;
 let selectedTileParent = e.target.parentElement;
 let rowAboveSelecedTile = selectedTileParent.previousElementSibling;
 //console.log('col index: ', tileIndex );
 //console.log(rowAboveSelecedTile.children[30-tileIndex]);
 let tileAboveType = rowAboveSelecedTile.children[30-tileIndex].dataset.type;
 if(tileAboveType == undefined){
  console.log('you can remove this tile');
  e.target.classList.remove(e.target.dataset.type);
   if(tilesInInventory.length >=1){ //update inventory
    console.log('tilesInInventory: ',tilesInInventory);
    inventoryDiv.classList.remove(tilesInInventory[0]);
    tilesInInventory.pop();
    tilesInInventory.push(e.target.dataset.type);
    console.log('tilesInInventory:',tilesInInventory);
    document.querySelector('.inventoryTile').classList.add(e.target.dataset.type);
   }
 }else{
  console.log('you CANNOT remove this tile');
  //need to implement animation for a tile to blink
 }
}*/