/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
 const HORIZONTAL_LINE = 140;

console.log("JavaScript is amazing!");
document.addEventListener("keydown", moveJura);
document.addEventListener("keyup", stopJura);
let jura = document.getElementById("jurica");
//console.log("hehe",parseInt(getComputedStyle(jura).top));

let x=0;
let y=0;
let jump_direction=1;
let jump_interval = 1;
let map_keys_pressed = new Map();



function moveJura(event){
   map_keys_pressed.set(event.keyCode, true);
   //console.log("keyCode",event.keyCode);
   if(map_keys_pressed.has(38)){
     console.log("jump");
   }
   if(map_keys_pressed.has(37)){
     console.log("left");
   }
   if(map_keys_pressed.has(39)){
     console.log("right");
   }
   if(map_keys_pressed.has(39) && map_keys_pressed.has(38)){
     console.log("rightjump");
   }
   if(map_keys_pressed.has(37) && map_keys_pressed.has(38)){
     console.log("leftjump");
   }
}

function stopJura(event){
   map_keys_pressed.delete(event.keyCode);
   //console.log("keyCode",event.keyCode);
}

function moveLeft(){

}

function moveright(){

}

function jump(){
  if (parseInt(getComputedStyle(jura).top) < HORIZONTAL_LINE - 70){
      jump_direction = -1;
  }
  y = parseInt(getComputedStyle(jura).top) - 5 * jump_direction;
  jura.style.top = `${y}px`;

  if (parseInt(getComputedStyle(jura).top) > HORIZONTAL_LINE){
    y = parseInt(getComputedStyle(jura).top)-5;
    jura.style.top = `${y}px`;
    console.log("hehe",parseInt(getComputedStyle(jura).top));
    jump_direction = 1;
    clearInterval(jump_interval);
    jump_interval=1;
    console.log("clear_interval",jump_interval);
  }
}
