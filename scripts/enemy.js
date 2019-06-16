import {MESH_DIMENSION} from './constants.js';
import {create_CSS_Sheet, addCSSRule, sheet} from './helper_functions.js'
//class definition of game main charachter

class Enemy{
  constructor(top, left, width, height, world, id, collision_code, pic_right, pic_left, pic_right_move, pic_left_move){
		this._id = id;
    this._y_position = top;
    this._x_position = left;
    this._width = width;
    this._height = height;
		this._collision_code = collision_code;
    this.world = world;
		this.direction = 1;
		this._x_speed = 10;
		this._pic_right = pic_right;
		this._pic_left = pic_left;
		this._pic_right_move = pic_right_move;
		this._pic_left_move = pic_left_move;
    this._css_id = this.addToHtmlCss(sheet);
		this._interval = setInterval(this.move.bind(this),200);
  }

  addToHtmlCss(sheet){
    let iDiv = document.createElement('div');
  	iDiv.id = "enemy" + this._id;
  	addCSSRule(sheet, '#' + iDiv.id, "position:absolute; width:" + this._width +"px; height:" + this._height+ "px; left:" +
		this._x_position + "px; background-image: url('"+ this._pic_right +"');" +
    "background-position: center; background-repeat: no-repeat;background-size: auto; "+
    "top:" + this._y_position + "px;", sheet.cssRules.length);
  	document.getElementById('gameDiv').appendChild(iDiv);
    return iDiv;
  }
	animate_move_right(){
		setTimeout(() => {document.getElementById(this._css_id.id).style.backgroundImage = "url('"+ this._pic_right_move +"')";},0);
		setTimeout(() => {document.getElementById(this._css_id.id).style.backgroundImage = "url('"+ this._pic_right +"')";},100);
	}
	animate_move_left(){
		setTimeout(() => {document.getElementById(this._css_id.id).style.backgroundImage = "url('"+ this._pic_left_move +"')";},0);
		setTimeout(() => {document.getElementById(this._css_id.id).style.backgroundImage = "url('"+ this._pic_left +"')";},100);
	}
	delete_from_memory(){
		clearInterval(this._interval);
		this.updateMeshPositionToZero();
		document.getElementById(this._css_id.id).remove();
	}
}

class Dragon extends Enemy{
	constructor(top, left, width, height, world, id, collision_code, pic_right, pic_left, pic_right_move, pic_left_move){
		super(top, left, width, height, world, id, collision_code, pic_right, pic_left, pic_right_move, pic_left_move);
	}
	move(){
		let x = this._x_position;
		let random_factor = Math.floor(Math.random() * 100);
		if(this.direction  === 1){
			this.animate_move_right();
		}
		if(this.direction  === -1){
			this.animate_move_left();
		}
		x = x + this._x_speed * this.direction;
		if(x < -200) this.direction *= -1;
		if(x > this.world._world_width -80) this.direction *= -1;
		if(random_factor > 94 && x < this.world._world_width - 40 && x > 0 ) this.direction *= -1;
		this._css_id.style.left = `${x}px`;
		this._x_position = x;

		////console.log(this.world._enemy_mesh);
		this.updateMeshPosition();
	}
	updateMeshPosition(){
		let mesh = this.world._enemy_mesh;
		let left = parseInt(this._x_position / MESH_DIMENSION);
		let top = parseInt(this._y_position / MESH_DIMENSION) + 1;
		let width = parseInt(this._width / MESH_DIMENSION);
		let height = parseInt(this._height / MESH_DIMENSION);
		//mesh editing
			if(this.direction === 1){
				for(let i=left - 3; i < left + width - 3; i++){
					for(let j=top; j < top + height; j++){
						if(i > 0) mesh[i][j] = this._collision_code;

					}
				}
				for(let i=left - parseInt(this._x_speed / MESH_DIMENSION) - 3; i < left - 3 ; i++){
					for(let j=top; j <  top - 1 + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
			if(this.direction === -1){
				for(let i=left + 3; i < left + width - 3 ; i++){
					for(let j=top; j < top + height; j++){
						if(i > 0) mesh[i][j] = this._collision_code;
						////console.log(i,j,mesh[i][j], this.world._enemy_mesh[i][j]);
					}
				}
				for(let i=left + width - 3; i < left + width + parseInt(this._x_speed / MESH_DIMENSION)  - 3 ; i++){
					for(let j=top; j <  top - 1 + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
	}
	updateMeshPositionToZero(){
		let mesh = this.world._enemy_mesh;
		let left = parseInt(this._x_position / MESH_DIMENSION);
		let top = parseInt(this._y_position / MESH_DIMENSION) + 1;
		let width = parseInt(this._width / MESH_DIMENSION);
		let height = parseInt(this._height / MESH_DIMENSION);
		//mesh editing

			if(this.direction === 1){
				for(let i=left - 3; i <= left + width - 3; i++){
					for(let j=top; j < top + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
				for(let i=left - parseInt(this._x_speed / MESH_DIMENSION) - 3; i <= left - 3 ; i++){
					for(let j=top; j <=  top - 1 + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
			if(this.direction === -1){
				for(let i=left + 3; i <= left + width - 3 ; i++){
					for(let j=top; j < top + height; j++){
						 if(i > 0) mesh[i][j] = 0;
						////console.log(i,j,mesh[i][j], this.world._enemy_mesh[i][j]);
					}
				}
				for(let i=left + width - 3; i <= left + width + parseInt(this._x_speed / MESH_DIMENSION)  - 3 ; i++){
					for(let j=top; j <  top - 1 + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
	}
}

class Goblin extends Enemy{
	constructor(top, left, width, height, world, id, collision_code, pic_right, pic_left, pic_right_move, pic_left_move){
		super(top, left, width, height, world, id, collision_code, pic_right, pic_left, pic_right_move, pic_left_move);

	}

	move(){
		let x = this._x_position;
		let random_factor = Math.floor(Math.random() * 100);
		if(this.direction  === 1){
			this.animate_move_right();
		}
		if(this.direction  === -1){
			this.animate_move_left();
		}
		x = x + this._x_speed * this.direction;
		if(x < 20) this.direction *= -1;
		if(x > this.world._world_width - 40) this.direction *= -1;
		if(random_factor > 91 && x < this.world._world_width - 40 && x > 0 ) this.direction *= -1;
		this._css_id.style.left = `${x}px`;
		this._x_position = x;
		////console.log(this.world._enemy_mesh);
		this.check_collision_down();
		this.updateMeshPosition();
	}
	updateMeshPosition(){
		let mesh = this.world._enemy_mesh;
		let left = parseInt(this._x_position / MESH_DIMENSION);
		let top = parseInt(this._y_position / MESH_DIMENSION);
		let width = parseInt(this._width / MESH_DIMENSION);
		let height = parseInt(this._height / MESH_DIMENSION);
		//mesh editing
		if(this._x_position > -60 && this._x_position < this.world.world_width + 60){
		//delete mesh history
			if(this.direction === 1){
				for(let i=left; i < left + width; i++){
					for(let j=top; j < top + height; j++){
						mesh[i][j] = this._collision_code;
					}
				}
				for(let i=left - parseInt(this._x_speed / MESH_DIMENSION) ; i <= left  ; i++){
					for(let j=top; j <=  top  + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
			if(this.direction === -1){
				for(let i=left; i < left + width ; i++){
					for(let j=top; j < top + height; j++){
						mesh[i][j] = this._collision_code;

						////console.log(i,j,mesh[i][j], this.world._enemy_mesh[i][j]);
					}
				}
				for(let i=left + width; i <= left + width + parseInt(this._x_speed / MESH_DIMENSION) ; i++){
					for(let j=top; j <=  top + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
		}
	}
	updateMeshPositionToZero(callback){
		let mesh = this.world._enemy_mesh;
		let left = parseInt(this._x_position / MESH_DIMENSION);
		let top = parseInt(this._y_position / MESH_DIMENSION);
		let width = parseInt(this._width / MESH_DIMENSION);
		let height = parseInt(this._height / MESH_DIMENSION);
		//mesh editing

		if(this._x_position > -60 && this._x_position < this.world.world_width + 60){
		//delete mesh history
			if(this.direction === 1){
				for(let i=left; i <= left + width; i++){
					for(let j=top; j <= top + height; j++){
						mesh[i][j] = 0;
					}
				}
				for(let i=left - parseInt(this._x_speed / MESH_DIMENSION) ; i <= left  ; i++){
					for(let j=top; j <=  top  + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
			if(this.direction === -1){
				for(let i=left; i <= left + width ; i++){
					for(let j=top; j <= top + height; j++){
						mesh[i][j] = 0;

						////console.log(i,j,mesh[i][j], this.world._enemy_mesh[i][j]);
					}
				}
				for(let i=left + width; i <= left + width + parseInt(this._x_speed / MESH_DIMENSION) ; i++){
					for(let j=top; j <=  top + height; j++){
						if(i > 0) mesh[i][j] = 0;
					}
				}
			}
		}
		if(callback != undefined){
			this._interval = setInterval(callback,50);
			console.log("cistim prije pada");
		}
	}
	check_collision_down(){
		let x = parseInt(this._x_position / MESH_DIMENSION);
		let y = parseInt(this._y_position / MESH_DIMENSION);
		if(this.direction ===  1){
			//console.log(x,y,this.world._mesh[x][y + parseInt(this._height / MESH_DIMENSION) + 2],this.world._mesh);
			if(this.world._mesh[x][y + parseInt(this._height / MESH_DIMENSION) + 2] === 0){
				clearInterval(this._interval);
				this.updateMeshPositionToZero(this.fall.bind(this));
			}
		}
		else if(this.direction === -1){
			//console.log(x,y,this.world._mesh[x + parseInt(this._width/ MESH_DIMENSION)][y + parseInt(this._height / MESH_DIMENSION) + 2], this.world._mesh);
			if(this.world._mesh[x + parseInt(this._width/ MESH_DIMENSION)][y + parseInt(this._height / MESH_DIMENSION) + 2] === 0){
				clearInterval(this._interval);
				this.updateMeshPositionToZero();
				this._interval = setInterval(this.fall.bind(this),50);

			}
		}

	}
	fall(){
		this.updateMeshPositionToZero();
		let y = this._y_position;
		y = y + this.world._g_force;
		this._css_id.style.top = `${y}px`;
		this._y_position = y;
		if(this._y_position > 1500){
			clearInterval(this._interval);
		}
		////console.log(this.world._enemy_mesh);
	}

}


export {Enemy, Dragon, Goblin};
