/*
* Custom map layer control
*/
window.mapBasemaps = []
window.mapLayers = [];
/*
* add radio option??
*/
function addMapLayersToggle(id, layer, name, on) {
	var label = document.createElement('label');
	var input = document.createElement('input');
	input.id = layer;
	input.type = 'checkbox';
	input.className = 'mdl-checkbox__input';
	var span = document.createElement('span');
	var spanText = document.createTextNode(name);
	span.appendChild(spanText);
	span.className = 'mdl-checkbox__label';
	label.appendChild(span);
	label.appendChild(input);
	label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect check';
	label.for = layer;
	label.id = layer + 'label';
	componentHandler.upgradeElement(label);
	document.getElementById(id).appendChild(label);
	if (on === true ) {document.getElementById(layer + 'label').MaterialCheckbox.check();}
}

function addMapBasemapsToggle(id, layer, name, on,val) {
  var div = document.createElement('div');
	var label = document.createElement('label');
	var input = document.createElement('input');
	input.id = layer;
	input.type = 'radio';
	input.className = 'mdl-radio__button';
  input.name = "options";
  input.value = val;
  //if (on === true ) {    input.attr = checked;  }
	var span = document.createElement('span');
	var spanText = document.createTextNode(name);
	span.appendChild(spanText);
	span.className = 'mdl-checkbox__label';
	label.appendChild(input);
  label.appendChild(span);
  label.id = layer + 'label';
  label.className = 'mdl-radio mdl-js-radio mdl-js-ripple-effect';
  label.for = layer;
	componentHandler.upgradeElement(label);
  div.appendChild(label);
	document.getElementById(id).appendChild(div);
  if (on === true ) {document.getElementById(layer + 'label').MaterialRadio.check();}
}
