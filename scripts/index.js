"use strict";
import {GameWorld} from './game_world.js';
import {GameState} from './game_state.js';
import {GameCharachter} from './game_charachters.js';
import {PLATFORM_DIMENSION, MESH_DIMENSION, G_FORCE, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_JUMP_FORCE }from './constants.js';

let game_width = document.getElementById("gameDiv").offsetWidth + 10;
let game_height = document.getElementById("gameDiv").offsetHeight;
console.log(game_height);
console.log(game_width);

// 0,0 is top left corner
//x - platform starting position in x direction - integer number represents how many platform widths is left of the 0,0 position
//y - platform starting position in y direction - integer number represents how many platform heights is down of the 0,0 position


let level_design = [
	 {'platforms':[{x:0, y:9, number_of_segments:parseInt(game_width / PLATFORM_DIMENSION)},
		 {x:13, y:5, number_of_segments:3}, {x:20, y:5, number_of_segments:5}],
	 'pikes':[{x:4, y:9, number_of_segments:3},{x:15, y:9, number_of_segments:4},{x:30, y:9, number_of_segments:3}],
	 'dragons':[{x:20, y:50}],
	 'goblins':[{x:200, y:152}],
	 'coins':[{x:70, y:162},{x:160, y:162},{x:225, y:162}]
   },
	 {'platforms':[{x:0, y:9, number_of_segments:7}, {x:9, y:9, number_of_segments:3}, {x:20, y:9, number_of_segments:parseInt(game_width / PLATFORM_DIMENSION) - 20},
	 {x:11, y:5, number_of_segments:3}, {x:15, y:5, number_of_segments:4}],
	 'pikes':[{x:4, y:9, number_of_segments:2},{x:15, y:9, number_of_segments:2},{x:30, y:9, number_of_segments:3}],
	 'dragons':[{x:300, y:50}],
	 'goblins':[{x:400, y:152}]
 	},
	 {'platforms':[{x:0, y:9, number_of_segments:5}, {x:9, y:9, number_of_segments:1},{x:11, y:9, number_of_segments:1},{x:13, y:9, number_of_segments:1}, {x:20, y:9, number_of_segments:parseInt(game_width / PLATFORM_DIMENSION) - 20},
	 {x:2, y:5, number_of_segments:3}, {x:15, y:5, number_of_segments:4}],
	 'pikes':[{x:10, y:9, number_of_segments:1},{x:15, y:9, number_of_segments:3},{x:30, y:9, number_of_segments:4}],
	 'dragons':[{x:600, y:50}],
	 'goblins':[{x:500, y:152}]
	 }
];

let current_level = 1;


window.onload = start_new_game(game_width, game_height, level_design);


function start_new_game(game_width, game_height, levels) {

					 let world = new GameWorld(game_width, game_height, MESH_DIMENSION, levels, G_FORCE);
					 let player = new GameCharachter(152, 50, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_JUMP_FORCE, world);
					 let game_state = new GameState(1, 0, 50, "easy", player, world, world._enemies);

					 document.addEventListener("keydown", game_state.keys_pressed.bind(game_state));
					 document.addEventListener("keyup", game_state.keys_unpressed.bind(game_state));

};
