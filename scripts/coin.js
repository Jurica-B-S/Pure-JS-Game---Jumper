import {MESH_DIMENSION} from './constants.js';
import {create_CSS_Sheet, addCSSRule, sheet} from './helper_functions.js'
//class definition of game main charachter

let coin_count = 0;

class Coin{
  constructor(top, left, width, height, world, id, collision_code, pics){
		this._id = id;
    this._y_position = top;
    this._x_position = left;
    this._width = width;
    this._height = height;
		this._collision_code = collision_code;
    this.world = world;
		this.direction = 1;
		this._pics = pics;
    this._css_id = this.addToHtmlCss(sheet);
		this.updateMeshPosition();
		this._animate_coin_iterator = this.animate_coin(this);
		this._interval = setInterval(this._animate_coin_iterator.next.bind(this._animate_coin_iterator),200);
  }

	addToHtmlCss(sheet){
    let iDiv = document.createElement('div');
  	iDiv.id = "coin" + this._id;
  	addCSSRule(sheet, '#' + iDiv.id, "position:absolute; width:" + this._width +"px; height:" + this._height+ "px; left:" +
		this._x_position + "px; background-image: url('"+ this._pics[0] +"');" +
    "background-position: center; background-repeat: no-repeat;background-size: auto; "+
    "top:" + this._y_position + "px;", sheet.cssRules.length);
		iDiv.className = "coin";
  	document.getElementById('gameDiv').appendChild(iDiv);
    return iDiv;
  }

	*animate_coin (coin_object){
		while (true) {
			yield coin_object._css_id.style.backgroundImage = "url('"+ coin_object._pics[0] +"')";
			yield coin_object._css_id.style.backgroundImage = "url('"+ coin_object._pics[1] +"')";
			yield coin_object._css_id.style.backgroundImage = "url('"+ coin_object._pics[2] +"')";
			yield coin_object._css_id.style.backgroundImage = "url('"+ coin_object._pics[3] +"')";
		}
	}
	delete_from_memory(){
		clearInterval(this._interval);
		this.updateMeshPositionToZero();
		this._css_id.remove();
	}
	updateMeshPosition(){
		let mesh = this.world._mesh;
		let left = parseInt(this._x_position / MESH_DIMENSION);
		let top = parseInt(this._y_position / MESH_DIMENSION) + 1;
		let width = parseInt(this._width / MESH_DIMENSION);
		let height = parseInt(this._height / MESH_DIMENSION);
		//mesh editing
		for(let i=left; i <= left + width; i++){
			for(let j=top; j <= top + height; j++){
				if(i > 0) mesh[i][j] = this._collision_code;
			}
		}
	}

	updateMeshPositionToZero(){
		let mesh = this.world._mesh;
		let left = parseInt(this._x_position / MESH_DIMENSION);
		let top = parseInt(this._y_position / MESH_DIMENSION) + 1;
		let width = parseInt(this._width / MESH_DIMENSION);
		let height = parseInt(this._height / MESH_DIMENSION);
		//mesh editing
		for(let i=left; i <= left + width; i++){
			for(let j=top; j <= top + height; j++){
				if(i > 0 && mesh[i][j] === this._collision_code) mesh[i][j] = 0;
			}
		}
	}
}




export {Coin};
