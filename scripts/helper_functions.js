import { MESH_DIMENSION} from './constants.js';

function create_CSS_Sheet() {
	// Create the <style> tag
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style.sheet;
}

function addToHtmlCss(type, counter, top, left, width, world_height, sheet){
	//console.log(width);
	let iDiv = document.createElement('div');
	iDiv.id = type + counter;
	addCSSRule(sheet, '#' + iDiv.id, "position:absolute; width:" + width * MESH_DIMENSION + "px; left:" + left * MESH_DIMENSION +"px; top:" + (top * MESH_DIMENSION) + "px;", sheet.cssRules.length);
	iDiv.className = type;
	document.getElementById('gameDiv').appendChild(iDiv);
}

function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

let sheet = create_CSS_Sheet();

export {create_CSS_Sheet, addToHtmlCss, addCSSRule, sheet};
