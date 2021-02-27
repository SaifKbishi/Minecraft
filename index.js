/********global variables **************/
const main = document.querySelector('.main');
const numOfTiles =600;
const worldHeightInTiles = 20;
const worldWidthtInTiles = 30;
const headOfCloud = 530;
//const treeStart01 = Math.floor(Math.random() * (195 - 182) + 182);
//const treeStart02 = Math.floor(Math.random() * (209 - 196) + 196);
const maxNumberOfRocks = 4;

let startBtnDiv;
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
let treeStart01 = Math.floor(Math.random() * (195 - 182) + 182);
let treeStart02 = Math.floor(Math.random() * (209 - 196) + 196);
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
let tileTypes =['wood','leaves','grass','soil','rock'];
/*****END***Of***Inventory**************/

/********FUNCTIONS**************/
startPage(); //should be enabled by default
//startGame();
/*drawToolsAndInventory();
row_idArray= [...document.querySelectorAll(`[data-id]`)];//all tiles in an array
console.log(row_idArray);
removeATile();
drawSoil();
drawGrass();
drawTree(treeStart01);
drawTree(treeStart02);
drawCloud();
drawRocks();
handleInventory();*/
/******END***OF***FUNCTIONS**************/

function startPage(){
 main.classList.add('startScreen');
 startBtnDiv = document.createElement('div');
 startBtnDiv.classList.add('startBtnDiv');
 main.insertAdjacentElement('afterbegin',startBtnDiv);

 //create a button
 let startBtn = document.createElement('button');
 startBtn.textContent='Start Game';
 startBtn.classList.add('startBtn');
 startBtnDiv.insertAdjacentElement('afterbegin',startBtn);
 //create tutorial div
 let tutorialDiv = document.createElement('div');
 tutorialDiv.classList.add('tutorialDiv');
 tutorialDiv.innerHTML= `<p>
 This is MineCraft Game<br>
 You have the world on the left, which includes tiles of <i>Leaves</i>,<i> Wood</i>,<i> Rock</i>,<i> Grass</i>,<i> Soil</i><br>
 and on the right, you have the tools that you can use to move remove tiles from the world and place them on the inventory. One tile at a time.<br>
 You can use the Shovel for <i>Grass</i> and <i>Soil</i>.<br>
 You can use the Axe for <i>Leaves</i> and <i>Wood</i>.<br>
 You can use the Pickaxe for <i>Rock</i>.<br>
 You cannot remove a tile if there is something above it. <br>
 Most important, you <strong>CANNOT</strong> use any tool for anything else besides its purpose.
</p>`;
 startBtn.insertAdjacentElement('afterend',tutorialDiv);


 startScreen = document.querySelector('.startScreen');
 startBtn.addEventListener('click',()=>{  
  //startScreen.classList.add('hidden');
  startBtn.classList.add('hidden');
  startGame();
 });
}
function startGame(){ 
 //remove elements from start page
 startBtnDiv.classList.add('hidden');

 let section = document.createElement('section');
 aside = document.createElement('aside');
 aside.classList.add('rightPanel');
 contentDiv = document.createElement('div');
 contentDiv.classList.add('content');
 
 main.insertAdjacentElement('afterbegin',section);
 section.insertAdjacentElement('afterbegin',contentDiv);
 section.insertAdjacentElement('afterend',aside);
 drawMatrix();//draw main matrix 
/**************/
drawToolsAndInventory();
row_idArray= [...document.querySelectorAll(`[data-id]`)];//all tiles in an array
console.log(row_idArray);
removeATile();
drawSoil();
drawGrass();
drawTree(treeStart01);
drawTree(treeStart02);
drawCloud();
drawRocks();
handleInventory();
/**************/
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
 let resetBtn = document.createElement('input'); 
 resetBtn.type = 'button';
 resetBtn.value ='Reset World';
 resetBtn.classList.add('resetBtn');
 resetDiv.insertAdjacentElement('afterbegin',resetBtn);
 document.querySelector('.resetBtn').addEventListener('click', resetWorld);
}//drawToolsAndInventory
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
   //aTile.innerText= k;
   aTile.setAttribute('data-id',`${k--}`);   
  }
 } 
}//drawMatrix
function drawSoil(){ 
 for(let i=(numOfTiles-150); i<row_idArray.length;i++){
  row_idArray[i].classList.add('soil');
  row_idArray[i].setAttribute('data-type','soil');
 } 
}//drawSoil
function drawGrass(){
 for(let i=(numOfTiles-180); i<(numOfTiles-150);i++){
  row_idArray[i].classList.add('grass');
  row_idArray[i].setAttribute('data-type','grass');
 }
}//drawGrass
function drawCloud(){
 row_idArray[numOfTiles-530].classList.add('cloud');
 for(let i=(numOfTiles-502); i<=(numOfTiles-499);i++){
  row_idArray[i].classList.add('cloud');
 }
 for(let i=(numOfTiles-473); i<=(numOfTiles-468);i++){
  row_idArray[i].classList.add('cloud');
  row_idArray[i].setAttribute('data-type','cloud');
 }
}//drawCloud
function drawTree(root){
 let treeStart = root;
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
}//drawTree
function drawRocks(){
 //debugger;
 for(let j=1; j<=maxNumberOfRocks; j++){
  let rockStart = Math.floor(Math.random() * (208 - 181) + 181);  
  if(rockStart>=181 && rockStart <=207 && rockStart != treeStart01 && rockStart != treeStart02){
   if(row_idArray[rockStart].dataset.type == undefined){
    for(let i=rockStart; i==rockStart; i++){
     row_idArray[numOfTiles-i].classList.add('rock');
     row_idArray[numOfTiles-i].setAttribute('data-type','rock');
    }
   }else{
    rockStart-=1;
    row_idArray[numOfTiles-rockStart].classList.add('rock');
    row_idArray[numOfTiles-rockStart].setAttribute('data-type','rock');
   }
  } 
 }
 //const rocks
 row_idArray[numOfTiles-210].classList.add('rock');
 row_idArray[numOfTiles-210].setAttribute('data-type','rock');
 row_idArray[numOfTiles-240].classList.add('rock');
 row_idArray[numOfTiles-240].setAttribute('data-type','rock');
}//drawRocks
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
     //console.log(tool.name+' can move ', tool.usedFor,tool.inHand );
    }
   });   
  }
  //if tileInInv includes any type of tiles
  if(tileTypes.includes((e.target.dataset.type))){
   console.log('now you can use this tile');
   //remove the tile from inventory
   //document.querySelector('.inventoryTile').setAttribute('data-type',e.target.dataset.type);
   console.log('tilesInInventory: ',tilesInInventory);
   document.querySelector('.inventoryTile').classList.remove(e.target.dataset.type);
   document.querySelector('.inventoryTile').removeAttribute('data-type');
   //now we have tile in hand and we can place it in the world
   moveATileBackToWorld();
  }
 });
}//handleInventory
function removeATile(){
 document.querySelector('.content').addEventListener('click',(e)=>{  
  console.log('still listening to remove a tile');
  tileNumber = `${e.target.dataset.id}`;
  console.log('tileNumber:',tileNumber);
  console.log(e.target.dataset.type+ ' clicked');
  //if tile has type && tool in Hand can remove it
  if(e.target.dataset.type && toolInHand.usedFor.includes(e.target.dataset.type)){
   console.log('we have a tool in hand and a tile that we can move');
   //check if we can remove the tile (nothing above it)
   let selectedTileIndex = e.target.dataset.col_id;
   let selectedTileParent = e.target.parentElement;
   let rowAboveSelecedTile = selectedTileParent.previousElementSibling;
   let tileAboveType = rowAboveSelecedTile.children[30-selectedTileIndex].dataset.type;
   
   if(tileAboveType == undefined){
    console.log('you can remove this tile');
    e.target.classList.remove(e.target.dataset.type);
    //e.target.removeAttribute('data-type');//15:57
     if(tilesInInventory.length >=1){ //update inventory
      console.log('tilesInInventory: ',tilesInInventory);
      inventoryDiv.classList.remove(tilesInInventory[0]);
      tilesInInventory.pop(); //empty inventory if it contains anything
      tilesInInventory.push(e.target.dataset.type);
      console.log('tilesInInventory:',tilesInInventory);
      document.querySelector('.inventoryTile').classList.add(e.target.dataset.type);
      document.querySelector('.inventoryTile').setAttribute('data-type',e.target.dataset.type);
     }else{
      tilesInInventory.push(e.target.dataset.type);
      console.log('tilesInInventory:',tilesInInventory);
      document.querySelector('.inventoryTile').classList.add(e.target.dataset.type);
      document.querySelector('.inventoryTile').setAttribute('data-type',e.target.dataset.type);
     }
   }else{
    console.log('you CANNOT remove this tile');
    //need to implement animation for a tile to blink
   }
   e.target.removeAttribute('data-type');
  }else{
   //debugger;
   console.log('you CANNOT remove this tile with this tool');
   /*console.log(toolInHand.name);
   let pickedToolFromInventory = document.querySelector(".toolsTileClicked");
   console.log('pickedToolFromInventory: ',pickedToolFromInventory, 'typeOf: ',typeof(pickedToolFromInventory));
   pickedToolFromInventory.classList.toogle('wrongTool');*/

  }
 }); 
}//removeATile
function moveATileBackToWorld(){ 
 let tileInHand = tilesInInventory.pop();
 console.log('tileInHand: ',tileInHand);
 document.querySelector('.content').addEventListener('click',(e)=>{
  let selectedTileIndex = e.target.dataset.col_id; //the tile index
  let selectedTileParent = e.target.parentElement; //the selected tile parent
  let rowBelowSelecedTile = selectedTileParent.nextElementSibling;
  let tileBelowType = rowBelowSelecedTile.children[30-selectedTileIndex].dataset.type;
  if(tileInHand && tileBelowType!= undefined){
   e.target.classList.add(tileInHand);
   e.target.setAttribute('data-type',tileInHand);
   tileInHand ='';
  }
 });
}//moveATileBackToWorld
function resetWorld(){
 console.log('we are in reset World function');
 let allTiles = document.querySelector('.content');
 row_idArray.forEach(tile =>{  
   if(tileTypes.includes(tile.className)){
    debugger;
   tile.classList.remove(this);
   tile.removeAttribute('data-type');
  }  
 }); 
 /*removing rock */
 let groundRow = allTiles.children[13].children;
 for(let u=0; u<groundRow.length; u++){
  groundRow[u].removeAttribute('data-type');
  groundRow[u].classList.remove('rock');
 }
 //clear inventory
 document.querySelector('.toolsTileClicked').classList.remove('toolsTileClicked');
 document.querySelector('.inventoryTile').classList = ""; 
 inventoryDiv.classList.add('inventoryDiv','inventoryTile');
 document.querySelector('.inventoryTile').removeAttribute('data-type');
 removeATile();
 drawSoil();
 drawGrass();
 drawTree(treeStart01);
 drawTree(treeStart02);
 drawCloud();
 drawRocks();
 handleInventory();
}//resetWorld