!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);class a{constructor(e){this.blocks=e,this.hitPlaces=new Array(e).fill(0),this.sunk=!1}hit(e){this.hitPlaces[e]=1}isSunk(){let e;return e=!!this.hitPlaces.every(e=>1===e),e}getData(){return{blocks:this.blocks,hitPlaces:this.hitPlaces,sunk:this.sunk}}}class n{constructor(){this.board=Array(10).fill(-1).map(()=>Array(10).fill(-1)),this.ships=[]}placeShip(e,t,r){const n=new a(e);for(let a=0;a<e;a++)this.board[t][r+a]=this.ships.length;this.ships.push({ship:n,start:r})}receiveAttack(e,t){const r=this.board[e][t];switch(r){case"hit":case"miss":return r;case-1:this.board[e][t]="miss";break;default:const a=this.ships[r];a.ship.hit(t-a.start),this.board[e][t]="hit"}}allSunk(){return this.ships.every(e=>e.ship.isSunk())}}class s{constructor(e,t=!1){this.isPc=t,this.name=e,this.attacked=[],this.gameBoard=new n}attack(){let e;do{e=this.getCoordinates()}while(this.CoordinatesAttacked(e));return this.attacked.push(e),e}CoordinatesAttacked(e){for(let t=0;t<this.attacked.length;t++)if(this.attacked[t][0]===e[0]&&this.attacked[t][1]===e[1])return!0;return!1}getCoordinates(){return[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}}const l=(()=>{const e={};return{on:(t,r)=>{e[t]=e[t]||[],e[t].push(r)},off:(t,r)=>{if(e[t])for(let a=0;a<e[t].length;a+=1)if(e[t][a]===r){e[t].splice(a,1);break}},emit:(t,r)=>{e[t]&&e[t].forEach(e=>{e(r)})}}})();class o{constructor(){this.playerOne=null,this.playerTwo=null,this.currentPlayer=null,this.nextPlayer=null}createPlayers(e){const t=e.playerOne,r=e.playerTwo;this.playerOne=new s(t[0],t[1]),this.playerTwo=new s(r[0],r[1]),this.currentPlayer=this.playerOne,this.nextPlayer=this.playerTwo}placeShips(){for(let e=0;e<5;e++)this.playerOne.gameBoard.placeShip(2,e,5),this.playerTwo.gameBoard.placeShip(2,e,1)}doShoot(e=null,t=null){let r=e,a=t;return console.log(e,t),"pc"===this.currentPlayer.name&&([r,a]=this.currentPlayer.attack()),this.nextPlayer.gameBoard.receiveAttack(r,a),l.emit("player attack",this.nextPlayer),this.currentPlayer=this.nextPlayer,this.currentPlayer===this.playerOne?this.nextPlayer=this.playerTwo:this.nextPlayer=this.playerOne,[this.currentPlayer,this.nextPlayer]}}function i(e){const t=document.getElementById(e);for(let e=0;e<10;e++){const r=document.createElement("div");r.classList.add("gridRow");for(let t=0;t<10;t++){const a=document.createElement("div");a.classList.add("gridSquare"),a.setAttribute("data",""+[e,t]),r.appendChild(a)}t.appendChild(r)}}function c(e){let t=e.gameBoard.board;const r=d("pc"===e.name?"playerOneBoard":"playerTwoBoard");for(let e=0;e<10;e++)for(let a=0;a<10;a++){let n=t[e][a],s=r[e][a];switch(n){case-1:s.style.backgroundColor="blue";break;case"hit":s.style.backgroundColor="red";break;case"miss":s.style.backgroundColor="grey";break;default:s.style.backgroundColor="green"}}}function d(e){return Array.from(document.getElementById(e).childNodes).map(e=>Array.from(e.childNodes))}!function(){const e=new o;l.on("create players",t=>{e.createPlayers(t),async function(e){e.placeShips();do{[e.currentPlayer,e.nextPlayer]=await new Promise(async t=>{if("pc"!==e.currentPlayer.name){let[r,a]=await new Promise(e=>document.getElementById("playerOneBoard").addEventListener("click",l.on("square clicked",t=>e(t))));t(e.doShoot(r,a))}else{t(e.doShoot())}})}while(!e.playerOne.gameBoard.allSunk()&&!e.playerTwo.gameBoard.allSunk());console.log("gameOver")}(e)})}(),i("playerTwoBoard"),i("playerOneBoard"),d("playerOneBoard").forEach((e,t)=>{e.map((e,r)=>{e.addEventListener("click",()=>l.emit("square clicked",[t,r]))})}),l.on("player attack",c),l.emit("create players",{playerOne:["tin",!0],playerTwo:["pc",!1]}),function(){let e=document.querySelectorAll(".draggableBoat");document.querySelectorAll(".gridSquare").forEach(e=>{e.addEventListener("dragover",t=>{let r=document.getElementsByClassName("dragging")[0];e.appendChild(r)})}),e.forEach(e=>{e.addEventListener("dragstart",()=>e.classList.add("dragging")),e.addEventListener("dragend",()=>{e.classList.remove("dragging")})})}()}]);