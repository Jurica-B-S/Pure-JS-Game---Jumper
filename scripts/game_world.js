import {create_CSS_Sheet, addToHtmlCss, addCSSRule, sheet} from './helper_functions.js'
import {Dragon, Goblin} from './enemy.js';
import {Coin} from './coin.js';
import {PLAYER_DEATH, PLAYER_WIDTH, PLAYER_HEIGHT, PLATFORM_DIMENSION, PLATFORM_ID,
				PIKE_DIMENSION, PIKE_ID, JUMPER_DIMENSION, JUMPER_ID, MESH_DIMENSION,
				G_FORCE, PLAYER_JUMP_FORCE, PLAYER_IMG_LEFT, PLAYER_IMG_RIGHT,
			  DRAGON_IMG_LEFT, DRAGON_IMG_RIGHT, DRAGON_IMG_RIGHT_MOVE, DRAGON_IMG_LEFT_MOVE,
				DRAGON_SPEED,DRAGON_HEIGHT, DRAGON_WIDTH, DRAGON_CODE_COLLISION, GOBLIN_IMG_LEFT,
				GOBLIN_IMG_RIGHT, GOBLIN_IMG_RIGHT_MOVE, GOBLIN_IMG_LEFT_MOVE, GOBLIN_SPEED,
				GOBLIN_WIDTH, GOBLIN_HEIGHT, GOBLIN_CODE_COLLISION, COIN_WIDTH, COIN_HEIGHT,
				COIN_CODE_COLLISION, COIN_PICS}
				from './constants.js';

class GameWorld{
  constructor(game_width, game_height, mesh_dim, levels, g_force){
    this._world_width = game_width;
    this._world_height = game_height;
    this._mesh_dimension = mesh_dim;
		this._enemies = [];
		this._coins = [];
		this._mesh = [];
		this._enemy_mesh = [];
		this._levels = levels;
		this.createWorld(levels[1]);
		this._g_force = g_force;
		this._score = document.getElementById('score').childNodes[3];

  }
  get world_width(){
    return this._world_width;
  }
  get world_height(){
    return this._world_height;
  }
	get g_force(){
	   return this._g_force;
	}

  createWorld(level_design){
		console.log("kreirajmo svijet");
    for(let i=0; i <= parseInt(this.world_width / MESH_DIMENSION); i++){
      let help_array = [];
			let help_array2 = [];
      ////console.log("mesh1");
      for(let j=0; j <= parseInt(this.world_height / MESH_DIMENSION); j++){
        ////console.log("mesh2");
        help_array.push(0);
				help_array2.push(0);
      }
      this._mesh.push(help_array);
			this._enemy_mesh.push(help_array2);
    }
    for(let item in level_design){
      //create divs and css styleSheet
      ////console.log(level_design[item]);
      if(item === 'platforms'){
        let counter_of_items = 1;
        for(let platform of level_design[item]){
	          let left = parseInt(platform.x * PLATFORM_DIMENSION / MESH_DIMENSION);
	          let top = parseInt(platform.y * PLATFORM_DIMENSION / MESH_DIMENSION) + 1;

	          let width = parseInt(PLATFORM_DIMENSION * platform.number_of_segments / MESH_DIMENSION);
	          let height = parseInt(PLATFORM_DIMENSION / MESH_DIMENSION);
						if(platform.x * PLATFORM_DIMENSION + PLATFORM_DIMENSION * platform.number_of_segments < this.world_width){
						//check if platform goes out of the world widths
						if(left + width > parseInt(this.world_width / MESH_DIMENSION)){
							width = parseInt(this.world_width / MESH_DIMENSION) - left - 5;
						}
	          //mesh editing
	          for(let i=left; i <= left + width; i++){
	            for(let j=top; j <= top + height; j++){
	              this._mesh[i][j] = PLATFORM_ID;
	            }
	          }
	          addToHtmlCss("platform",counter_of_items, top, left, width, this.world_height, sheet);
	          counter_of_items++;
					}
        }
      }
      if(item === 'pikes'){
        let counter_of_items = 1;
        for(let pike of level_design[item]){
          let left = parseInt(pike.x * PIKE_DIMENSION / MESH_DIMENSION);
          let top = parseInt(pike.y * PIKE_DIMENSION / MESH_DIMENSION)+1;

          let width = parseInt(PIKE_DIMENSION * pike.number_of_segments / MESH_DIMENSION);
          let height = parseInt(PIKE_DIMENSION / MESH_DIMENSION);
          //mesh editing
					if(pike.x * PIKE_DIMENSION + PIKE_DIMENSION * pike.number_of_segments < this.world_width){
	          for(let i=left; i <= left + width; i++){
	            for(let j=top; j <= top + height; j++){
	              this._mesh[i][j] = PIKE_ID;
	            }
	          }
	          addToHtmlCss("pike", counter_of_items, top, left, width, this.world_height, sheet);
	          counter_of_items++;
	        	}
					}
      }
      if(item === 'jumpers'){
        let counter_of_items = 1;
        for(let jumper of level_design[item]){
          let left = parseInt(jumper.x * JUMPER_DIMENSION / MESH_DIMENSION);
          let top = parseInt(jumper.y * JUMPER_DIMENSION / MESH_DIMENSION)+1;

          let width = parseInt(JUMPER_DIMENSION * jumper.number_of_segments / MESH_DIMENSION);
          let height = parseInt(JUMPER_DIMENSION / MESH_DIMENSION);
          //mesh editing
					if(jumper.x + PLATFORM_DIMENSION * jumper.number_of_segments < this.world_width){
	          for(let i=left; i <= left + width; i++){
	            for(let j=top; j <= top + height; j++){
	              this._mesh[i][j] = JUMPER_ID;
	            }
	          }
	          addToHtmlCss("jumper", counter_of_items, top, left, width, this.world_height, sheet);
	          counter_of_items++;
					}
	      }
      }
			if(item === 'coins'){
				for(let coin of level_design[item]){
					if(coin.x + COIN_WIDTH  < this.world_width){
						let coin2 =  new Coin(coin.y, coin.x, COIN_WIDTH, COIN_HEIGHT, this, this._coins.length + 1 , COIN_CODE_COLLISION,
																			COIN_PICS);
							this._coins.push(coin2);
						}
				}
			}
			if(item === 'dragons'){
        for(let dragon of level_design[item]){
					if(dragon.x + DRAGON_WIDTH < this.world_width){
						let dragon2 =  new Dragon(dragon.y, dragon.x, DRAGON_WIDTH, DRAGON_HEIGHT, this, this._enemies.length + 1,
																		DRAGON_CODE_COLLISION, DRAGON_IMG_RIGHT,DRAGON_IMG_LEFT, DRAGON_IMG_RIGHT_MOVE,
																		DRAGON_IMG_LEFT_MOVE,DRAGON_SPEED);
						this._enemies.push(dragon2);
					}
        }
      }
			if(item === 'goblins'){
        for(let goblin of level_design[item]){
					if(goblin.x + GOBLIN_WIDTH < this.world_width){
						let goblin2 =  new Goblin(goblin.y, goblin.x, GOBLIN_WIDTH, GOBLIN_HEIGHT, this,  this._enemies.length + 1,
																			GOBLIN_CODE_COLLISION, GOBLIN_IMG_RIGHT, GOBLIN_IMG_LEFT, GOBLIN_IMG_RIGHT_MOVE,
																			GOBLIN_IMG_LEFT_MOVE, GOBLIN_SPEED);
						this._enemies.push(goblin2);
					}
				}
      }
    }
  }
	removeWorld(){
		this._mesh = [];
		this._enemy_mesh =[];
		let platforms = document.getElementsByClassName('platform');
		let platforms_length = platforms.length;
		let pikes = document.getElementsByClassName('pike');
		let pikes_length = pikes.length;
		let jumpers = document.getElementsByClassName('jumper');
		let jumpers_length = jumpers.length;
		let coins = document.getElementsByClassName('coin');
		let coins_length = coins.length;
		for(let i = 0; i < platforms_length; i++){
			platforms[0].remove();
		}
		for(let i = 0; i < pikes_length; i++){
			pikes[0].remove();
		}
		for(let i = 0; i < jumpers_length; i++){
			jumpers[0].remove();
		}
		for(let i = 0; i < coins_length; i++){
			coins[0].remove();
		}
	  //document.getElementsByClassName('jumper')
   	//document.getElementByClassName('lava')

  }


}

export {GameWorld};
