import { PLAYER_WIDTH, PLAYER_HEIGHT, PLATFORM_DIMENSION, PLATFORM_ID,
				PIKE_DIMENSION, PIKE_ID, JUMPER_DIMENSION, JUMPER_ID, MESH_DIMENSION,
				G_FORCE, PLAYER_JUMP_FORCE, PLAYER_IMG_LEFT, PLAYER_IMG_RIGHT,
        PLAYER_IMG_MOVE_RIGHT1, PLAYER_IMG_MOVE_LEFT1, PLAYER_DEATH} from './constants.js';
import {create_CSS_Sheet, addToHtmlCss, addCSSRule, sheet} from './helper_functions.js'
//class definition of game main charachter

export class GameCharachter{
  constructor(top, left, width, height, jump_force, world, player_id){
    this._y_position = top;
    this._x_position = left;
    this._width = width;
    this._height = height;
    this._jump_force = jump_force;
    this.world = world;
    this.movement = false;
    this._css_id = this.addToHtmlCss(sheet, this._y_position, this._x_position);
    this.player = document.getElementById("player");
    this._player_dead = false;
		this._player_win = false;
		this._coins = 0;
		this._level_coins = 0;
		this._coin_detected = false;
    //////console.log("collison_code: ",this.world.__enemy_mesh);
  }
  get g_force(){
    return this.world.g_force;
  }
  get player_dead(){
    return this._player_dead;
  }
  jump(){
    if(this.movement === false){
      let player = this.player;
      let t = 0; //stepping parameter
      let y = this._y_position;
      let v0 = this._jump_force;
      let g_force = this.world.g_force;
      let direction_factor = 1;
      let speed = [10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10];
      this.movement = true;
      let interval = setInterval(() => {
        let factor = 0;
        if (t<20){
          factor = speed[t];
          if(speed[t]===0){
            direction_factor = -1;
          }
        }
        else {
          factor = 10;
        }
        factor = factor * direction_factor;
        y = y - factor * 2 ;
        player.style.top = `${y}px`;
        this._y_position = y;
        t = t + 1;
        let collision = this.checkCollision();
				if(collision.dragon === 1 || collision.goblin === 1 || collision.pikes === 1){
					clearInterval(interval);
					this._player_dead = true;
				}
				if(collision.coin === 1 && !this._coin_detected){
					this._coin_detected = true;
				}
        if(collision.up > 0){
          //////console.log("collison up");
          direction_factor = -1;
        }
        if(collision.down > 0){
          //////console.log("collison down:", collision);
          y = y + collision.down_px;
          player.style.top = `${y}px`;
          this._y_position = y;
          if(collision.end_game === true){
            ////console.log("EndGame");
            this._player_dead = true;
          }
          clearInterval(interval);
          this.movement = false;
        }
      }, 50);
    }
  }
  fall(){
    ////console.log(this.movement);
      ////console.log('fall');
      let player = this.player;
      let t = 0; //stepping parameter
      let y = this._y_position;
      let v0 = this._jump_force;
      let g_force = this.world.g_force;
      let speed = [0,1,2,3,4,5,6,7,8,9,10];
      this.movement = true;
      let interval = setInterval(() => {
        let factor = 0;
        if (t<10){
          factor = speed[t];
        }
        else{
          factor = 10;
        }
        y = y + factor * 2 ;
        player.style.top = `${y}px`;
        this._y_position = y;
        t = t + 1;
        let collision = this.checkCollision();
				if(this._y_position > 1000){
					clearInterval(interval);
					this._player_dead = true;
				}
        //////console.log(player.style.top);
        if(collision.down > 0){
          //////console.log("collison down");
          y = y + collision.down_px;
          player.style.top = `${y}px`;
          this._y_position = y;
          if(collision.end_game === true){
            ////console.log("EndGame");
            this._player_dead = true;
          }
          clearInterval(interval);
          this.movement = false;
        }
        if(y > 1500){
            ////console.log("EndGame");
        }

      }, 50);
  }
  move_left(){
    if(this.movement === false){
      let player = this.player;
      let t = 0; //stepping parameter
      let x = this._x_position;
      let y = this._y_position;
      let v0 = this._jump_force;
      let g_force = this.world.g_force;
      let direction_factor = 1;
      let factor = 3;
      let collision = this.checkCollision();
			if(collision.dragon === 1 || collision.goblin === 1 || collision.pikes === 1){
				this._player_dead = true;
			}
			if(collision.coin === 1 && !this._coin_detected){
				this._coin_detected = true;
			}
			if(this._y_position > 1000){
				this._player_dead = true;
			}
      this.movement = true;
      this.changeBackgroundImg(this._css_id, PLAYER_IMG_LEFT);
      if(collision.down > 0 && collision.left < 3){
        this.animate_move_left();
        x = x - factor;
        if(x < 0) x = 0;
        if(x > this.world.world_with) x = parseInt(this.world.world_with);
        player.style.left = `${x}px`;
        this._x_position = x;
        this.movement = false;
      }
      if(collision.end_game === true){
        ////console.log("EndGame");
        this._player_dead = true;
      }

    }
  }
  move_right(){
    if(this.movement === false){
      let player = this.player;
      let t = 0; //stepping parameter
      let x = this._x_position;
      let y = this._y_position;
      let v0 = this._jump_force;
      let g_force = this.world.g_force;
      let direction_factor = 1;
      let factor = 3;
      this.movement = true;
			//console.log(this.world._mesh[parseInt(x)],x,y);
      let collision = this.checkCollision();
			if(collision.dragon === 1 || collision.goblin === 1 || collision.pikes === 1){
				this._player_dead = true;
			}
			if(collision.coin === 1 && !this._coin_detected){
				this._coin_detected = true;
			}
			if(this._y_position > 1000){
				this._player_dead = true;
			}
			if(x > this.world.world_width - 30) {
				this._player_win = true;
			}
      this.changeBackgroundImg(this._css_id, PLAYER_IMG_RIGHT);
      if(collision.down > 0 && collision.left < 3){
        this.animate_move_right();
        x = x + factor;
        if(x < 0) x = 0;
        player.style.left = `${x}px`;
        this._x_position = x;
        this.movement = false;
      }
      if(collision.end_game === true){
        ////console.log("EndGame");
      }
    }
  }
  jump_right(){
    if(this.movement === false){
      let player = this.player;
      let t = 0; //stepping parameter
      let x = this._x_position;
      let y = this._y_position;
      let v0 = this._jump_force;
      let g_force = this.world.g_force;
      let direction_factor_x = 1;
      let direction_factor_y = 1;
      let speed = [10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10];
      this.movement = true;

      let interval = setInterval(() => {
        let factor_x = 3;
        let factor_y = 0;
        if (t<20){
          factor_y = speed[t];
          if(speed[t]===0){
            direction_factor_y = -1;
          }
        }
        else{
          factor_y = 10;
        }
        factor_y = factor_y * direction_factor_y;
        y = y - factor_y * 2 ;
        player.style.top = `${y}px`;
        this._y_position = y;
        x = x + factor_x * 1.2 * direction_factor_x;
				if(x < 0) x = 0;
				if(x > this.world.world_width - 10) {
					clearInterval(interval);
					this._player_win = true;
				}
				if(this._y_position > 1000){
					clearInterval(interval);
					this._player_dead = true;
				}
        player.style.left = `${x}px`;
        this._x_position = x;
        t = t + 1;
        let collision = this.checkCollision();
				if(collision.coin === 1 && !this._coin_detected){
					this._coin_detected = true;
				}
				if(collision.dragon === 1 || collision.goblin === 1 || collision.pikes === 1){
					this._player_dead = true;
					clearInterval(interval);
				}
        else if(collision.up > 0){
          ////console.log("collison up");
          direction_factor_y = -1;
        }
        else if(collision.right > 0 && collision.up === 0){
          ////console.log("collison right");
          direction_factor_x = -1;
        }
        else if(collision.down > 0 && collision.right === 0){
          ////console.log("collison down:", collision);
          y = y + collision.down_px;
          player.style.top = `${y}px`;
          this._y_position = y;
          if(collision.end_game === true){
            ////console.log("EndGame");
            this._player_dead = true;
          }
          clearInterval(interval);
          this.movement = false;
        }
        if(y > 1500){
            ////console.log("EndGame");
            clearInterval(interval);
        }

      }, 50);
    }
  }
  jump_left(){
    if(this.movement === false){
      let player = this.player;
      let t = 0; //stepping parameter
      let x = this._x_position;
      let y = this._y_position;
      let v0 = this._jump_force;
      let g_force = this.world.g_force;
      let direction_factor_x = 1;
      let direction_factor_y = 1;
      let speed = [10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10];
      this.movement = true;
      let interval = setInterval(() => {
        let factor_x = 3;
        let factor_y = 0;
        if (t<20){
          factor_y = speed[t];
          if(speed[t]===0){
            direction_factor_y = -1;
          }
        }
        else{
          factor_y = 10;
        }
        factor_y = factor_y * direction_factor_y;
        y = y - factor_y * 2 ;
        player.style.top = `${y}px`;
        this._y_position = y;
        x = x - factor_x * 1.2 * direction_factor_x;
        if(x < 0) x = 0;
        if(x > this.world.world_with) x = parseInt(this.world.world_with);
        player.style.left = `${x}px`;
        this._x_position = x;
        t = t + 1;
        let collision = this.checkCollision();
				if(collision.coin === 1 && !this._coin_detected){
					this._coin_detected = true;
				}
				if(collision.dragon === 1 || collision.goblin === 1 || collision.pikes === 1){
					this._player_dead = true;
					clearInterval(interval);
				}
				else if(this._y_position > 1000){
					clearInterval(interval);
					this._player_dead = true;
				}
        else if(collision.up > 0){
          ////console.log("collison up");
          direction_factor_y = -1;
        }
        else if(collision.left > 0 && collision.up === 0){
          ////console.log("collison right");
          direction_factor_x = -1;
        }
        else if(collision.down > 0 && collision.left === 0){
          y = y + collision.down_px;
          player.style.top = `${y}px`;
          this._y_position = y;
          if(collision.end_game === true){
            ////console.log("EndGame");
            this._player_dead = true;
          }
          ////console.log("collison down");
          clearInterval(interval);
          this.movement = false;
        }
        if(y > 1500){
            ////console.log("EndGame");
            clearInterval(interval);
        }

      }, 50);
    }
  }
  checkCollision(){
	    let x = parseInt(this._x_position / MESH_DIMENSION);
	    let y = parseInt(this._y_position / MESH_DIMENSION);
	    let left_collision = 0, right_collision = 0, up_collision = 0, down_collision = 0; //counters for points of collison
	    let player_collison_points_horizontal = PLAYER_WIDTH / MESH_DIMENSION;
	    let player_collison_points_vertical = PLAYER_HEIGHT / MESH_DIMENSION;
	    let collision = {left:0, up:0, right: 0, down: 0, end_game: false};
			let enemy_mesh = this.world._enemy_mesh;
	    //collision in 3 _points

	    //collision down_p
	    if(enemy_mesh[x][y + player_collison_points_vertical] === 5
	       || enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical] === 5
	       || enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical] === 5){
	         if(this._player_dead === false) collision.dragon = 1;
	    }
			if(enemy_mesh[x][y + player_collison_points_vertical] === 6
	       || enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical] === 6
	       || enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical] === 6){
	         if(this._player_dead === false) collision.goblin = 1;
	    }
			if(this.world._mesh[x][y + player_collison_points_vertical] === 7
				|| this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical] === 7
				|| this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical] === 7){
					collision.coin = 1;
					//console.log("coin detected");
		 }
	    if(this.world._mesh[x + MESH_DIMENSION][y + player_collison_points_vertical] === 1
	       || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y + player_collison_points_vertical] === 1
	       || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical] === 1){
	         collision.down = 1;
	         collision.down_px = 0;
	         if(this.world._mesh[x + MESH_DIMENSION * 2][y + player_collison_points_vertical] === 2
	            || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical] === 2
	            || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical] === 2){
	              if(this._player_dead === false) collision.pikes = 1;
	            }

	    }

	    else if(this.world._mesh[x + MESH_DIMENSION][y + player_collison_points_vertical + 1] === 1
	      || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y + player_collison_points_vertical + 1] === 1
	      || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 1] === 1){
	        collision.down = 1;
	        collision.down_px = MESH_DIMENSION;
	        if(this.world._mesh[x + MESH_DIMENSION * 2][y + player_collison_points_vertical +1] === 2
	           || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical + 1] === 2
	           || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 1] === 2){
	             if(this._player_dead === false) collision.pikes = 1;
	           }

	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y + player_collison_points_vertical + 2] === 1
	     || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y + player_collison_points_vertical + 2] === 1
	     || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 2] === 1){
	       collision.down = 1;
	       collision.down_px = MESH_DIMENSION * 2;
	       if(this.world._mesh[x + MESH_DIMENSION * 2][y + player_collison_points_vertical + 2] === 2
	          || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical + 2] === 2
	          || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 2] === 2){
	            if(this._player_dead === false) collision.pikes = 1;
	          }

	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y + player_collison_points_vertical + 3] === 1
	    || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y + player_collison_points_vertical + 3] === 1
	    || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 3] === 1){
	      collision.down = 1;
	      collision.down_px = MESH_DIMENSION * 3;
	      if(this.world._mesh[x + MESH_DIMENSION * 2][y + player_collison_points_vertical + 3] === 2
	         || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical + 3] === 2
	         || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 3] === 2){
	           if(this._player_dead === false) collision.pikes = 1;
	         }
	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y + player_collison_points_vertical + 4] === 1
	    || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y + player_collison_points_vertical + 4] === 1
	    || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 4] === 1){
	      collision.down = 1;
	      collision.down_px = MESH_DIMENSION * 4;
	      if(this.world._mesh[x + MESH_DIMENSION * 2][y + player_collison_points_vertical + 4] === 2
	         || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION * 2][y + player_collison_points_vertical + 4] === 2
	         || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y + player_collison_points_vertical + 4] === 2){
	           if(this._player_dead === false) collision.pikes = 1;
	         }
	    }

	    //collison up
	    if(enemy_mesh[x][y] === 5
	       || enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y] === 5
	       || enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y] === 5){
	         if(this._player_dead === false) collision.dragon = 1;
	    }
			if(enemy_mesh[x][y] === 6
	       || enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y] === 6
	       || enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y] === 6){
	         if(this._player_dead === false) collision.goblin = 1;
	    }
			if(this.world._mesh[x][y] === 7
	       || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y] === 7
	       || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y] === 7){
	        collision.coin = 1;
					//console.log("coin detected");
	    }
	    if(this.world._mesh[x + MESH_DIMENSION][y] > 0
	       || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y] > 0
	       || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y] > 0){
	         collision.up = 1;
	         collision.up_px = 0;
	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y - 1] > 0
	      || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 1] > 0
	      || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 1] > 0){
	        collision.up = 1;
	        collision.up_px = MESH_DIMENSION;
	        if(this.world._mesh[x + MESH_DIMENSION][y - 1] === 2
	           || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 1] === 2
	           || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 1] === 2){
	             if(this._player_dead === false) collision.pikes = 1;
	           }
	        else if(this.world._enemy_mesh[x + MESH_DIMENSION][y - 1] === 5
	            || this.world._enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 1] === 5
	            || this.world._enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 1] === 5){
	              if(this._player_dead === false) collision.dragon = 1;
	        }
	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y - 2] > 0
	     || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 2] > 0
	     || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 2] > 0){
	       collision.up = 1;
	       collision.up_px = MESH_DIMENSION * 2;
	       if(this.world._mesh[x + MESH_DIMENSION][y - 2] === 2
	          || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 2] === 2
	          || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 2] === 2){
	            if(this._player_dead === false) collision.pikes = 1;
	          }
	       else if(this.world._enemy_mesh[x + MESH_DIMENSION][y - 2] === 5
	          || this.world._enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 2] === 5
	          || this.world._enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 2] === 5){
	            if(this._player_dead === false) collision.dragon = 1;
	       }

	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y - 3] > 0
	    || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 3] > 0
	    || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 3] > 0){
	      collision.up = 1;
	      collision.up_px = MESH_DIMENSION * 3;
	      if(this.world._mesh[x + MESH_DIMENSION][y - 3] === 2
	         || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 3] === 2
	         || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 3] === 2){
	           if(this._player_dead === false) collision.pikes = 1;
	         }
	      else if(this.world._enemy_mesh[x + MESH_DIMENSION][y - 3] === 5
	        || this.world._enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 3] === 5
	        || this.world._enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 3] === 5){
	          if(this._player_dead === false) collision.dragon = 1;
	      }
	    }
	    else if(this.world._mesh[x + MESH_DIMENSION][y - 4] > 0
	    || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 4] > 0
	    || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 4] > 0){
	      collision.up = 1;
	      collision.up_px = MESH_DIMENSION * 4;
	      if(this.world._mesh[x + MESH_DIMENSION][y - 4] === 2
	         || this.world._mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 4] === 2
	         || this.world._mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 4] === 2){
	           if(this._player_dead === false) collision.pikes = 1;
	         }
	      else if(this.world._enemy_mesh[x + MESH_DIMENSION][y - 4] === 5
	       || this.world._enemy_mesh[x + player_collison_points_horizontal - MESH_DIMENSION][y - 4] === 5
	       || this.world._enemy_mesh[x + parseInt(player_collison_points_horizontal / 2) ][y - 4] === 5){
	         if(this._player_dead === false) collision.dragon = 1;
	      }
	    }

	    //collison right
	    if(this.world._mesh[x + player_collison_points_horizontal][y + MESH_DIMENSION] === 1
	       || this.world._mesh[x + player_collison_points_horizontal][y + player_collison_points_vertical - MESH_DIMENSION] === 1
	       || this.world._mesh[x + player_collison_points_horizontal][y + parseInt(player_collison_points_vertical / 2)] === 1){
	         collision.right = 1;
	         collision.right_px = 0;
	    }
			if(enemy_mesh[x + player_collison_points_horizontal][y + MESH_DIMENSION] === 6
	       ||enemy_mesh[x + player_collison_points_horizontal][y + player_collison_points_vertical - MESH_DIMENSION] === 6
	       || enemy_mesh[x + player_collison_points_horizontal][y + parseInt(player_collison_points_vertical / 2)] === 6){
					if(this._player_dead === false) collision.goblin = 1;
	    }
			if(this.world._mesh[x + player_collison_points_horizontal][y + MESH_DIMENSION] === 7
	       ||this.world._mesh[x + player_collison_points_horizontal][y + player_collison_points_vertical - MESH_DIMENSION] === 7
	       || this.world._mesh[x + player_collison_points_horizontal][y + parseInt(player_collison_points_vertical / 2)] === 7){
					//console.log("coin detected");
					collision.coin = 1;
	    }
	    //collison left
	    if(this.world._mesh[x][y + MESH_DIMENSION] === 1
	       || this.world._mesh[x][y + player_collison_points_vertical - MESH_DIMENSION] === 1
	       || this.world._mesh[x][y + parseInt(player_collison_points_vertical / 2)] === 1){
	         collision.left = 1;
	         collision.left_px = 0;
	    }
			if(enemy_mesh[x][y + MESH_DIMENSION] === 6
	       ||enemy_mesh[x][y + player_collison_points_vertical - MESH_DIMENSION] === 6
	       || enemy_mesh[x][y + parseInt(player_collison_points_vertical / 2)] === 6){
					if(this._player_dead === false) collision.goblin = 1;
	    }
			if(this.world._mesh[x][y + MESH_DIMENSION] === 7
	       ||this.world._mesh[x][y + player_collison_points_vertical - MESH_DIMENSION] === 7
	       || this.world._mesh[x][y + parseInt(player_collison_points_vertical / 2)] === 7){
					collision.coin = 1;
					////console.log("coin detected");
	    }

	    return collision;
  }

  addToHtmlCss(sheet, top, left){
    let iDiv = document.createElement('div');
  	iDiv.id = "player";
  	addCSSRule(sheet, '#' + iDiv.id, "position:absolute; width:" + PLAYER_WIDTH +
    "px; height:" + PLAYER_HEIGHT+ "px; left:" + left+"px; background-image: url('"+ PLAYER_IMG_RIGHT +"');"+
    "background-position: center; background-repeat: no-repeat;background-size: cover; "+
    "top:" + (top) + "px;", sheet.cssRules.length);
  	document.getElementById('gameDiv').appendChild(iDiv);
    return iDiv.id;
  }
  changeBackgroundImg(id, img){
    document.getElementById(id).style.backgroundImage = "url('"+ img +"')";
    ////console.log("Tried to change it", img, id, document.getElementById(id).style.backgroundImage);
  }
  animate_move_right(){
    setTimeout(() => {document.getElementById(this._css_id).style.backgroundImage = "url('"+ PLAYER_IMG_MOVE_RIGHT1 +"')";},15);
    setTimeout(() => {document.getElementById(this._css_id).style.backgroundImage = "url('"+ PLAYER_IMG_RIGHT +"')";},30);
  }
  animate_move_left(){
    setTimeout(() => {document.getElementById(this._css_id).style.backgroundImage = "url('"+ PLAYER_IMG_MOVE_LEFT1 +"')";},15);
    setTimeout(() => {document.getElementById(this._css_id).style.backgroundImage = "url('"+ PLAYER_IMG_LEFT +"')";},30);
  }
  animate_death(){
    let dom_element = document.getElementById(this._css_id);
    setTimeout(() => {dom_element.style.backgroundImage = "url('"+ PLAYER_DEATH[3] +"')";},200);
    //setTimeout(() => {document.getElementById(this._css_id).style.backgroundImage = "url('"+ PLAYER_DEATH[4] +"')";},500);
  }
	restart_position(){
		setTimeout(() => {document.getElementById(this._css_id).style.backgroundImage = "url('"+ PLAYER_IMG_RIGHT +"')";},200);
		this.movement = false;
		let x = this._x_position;
		let y = this._y_position;
		x = 50;
		y = 152;
		player.style.left = `${x}px`;
		player.style.top = `${y}px`;
		this._x_position = x;
		this._y_position = y;
		this._player_dead = false;
	}
	shoot(){

	}
	add_coins(){
		this._level_coins++;
	}
}
