
const TextPossibleErrEl = document.querySelector("p#problem");
const ButtonEl = document.querySelector("button");
const TextArea = document.querySelector("textarea");
const objectDisplay = document.querySelector(".oplugins-json-display");

const MessageEl = (str) => TextPossibleErrEl.innerText = str;
const create = (type, attrs = {}) => {
	const el = document.createElement(type);

	Object.entries(attrs).forEach(([key,value]) => el.setAttribute(key, value));

	return el;
}

let pressedInterval = null;
let JsonParsed = {};

ButtonEl.addEventListener('click', function(event) {
	for(var e of Array.from(objectDisplay.childNodes)) {
		if (e.tagName == 'H4') continue;
		e.remove();
	}
	try {
		JsonParsed = JSON.parse(TextArea.value);
		generateJsonStructure(JsonParsed, objectDisplay);
		TextArea.value = JSON.stringify(JsonParsed, null, 4);

		MessageEl("Json parsed, sucessfully!")
	} catch(e) {
		MessageEl(e);
	}
})


function generateJsonStructure(structure, element) {
	Object.entries(structure).forEach(([key, value]) => {
		const valueType = typeof value;

		const divContainer = create("div", {id: 'oplugins-object-container'});
		const keyContainer = create("p", {id: 'oplugins-object-key'});
		const valueContainer = create("div", {id: 'oplugins-object-value'})

		keyContainer.innerText = key;
		divContainer.append(keyContainer,valueContainer);
		element.append(divContainer);


		if (valueType === 'object') {
			keyContainer.classList.add('object-array-value');

			generateJsonStructure(value, keyContainer);



		} else {
			
			valueContainer.innerText = value;
		}

		


	})
}