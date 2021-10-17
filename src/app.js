function resolveObject(object, el) {
    Object.keys(object).forEach(function (element, index) {
        var value = object[element];

        if (typeof value === "object") {
            var DIV_CONTAINER = document.createElement("div");
            let ObjectType = Array.isArray(value) ? "array" : "object";

            var ObjectTitleDOM = document.createElement("div");

            DIV_CONTAINER.setAttribute("class", "object");
            ObjectTitleDOM.innerHTML = "<p id='object-title'>" + element + `<a class="object-button"><i class="uil uil-plus"></i></a><span>` + ObjectType + "</span></p>";

            DIV_CONTAINER.append(ObjectTitleDOM);

            var DIV_VALUE = document.createElement("div");

            DIV_VALUE.classList.add("object-value");

            DIV_CONTAINER.append(DIV_VALUE);
            el.append(DIV_CONTAINER);

            resolveObject(value, DIV_VALUE, true);
        } else {
            el.innerHTML += "<p id='object-key'><b>" + element + ": </b>" + value + "</p>";
        }
    });

    document.querySelectorAll(".object-button").forEach((btn) => {
        var ObjectValue = btn.parentNode.parentNode.parentNode.querySelector(".object-value");

        btn.onclick = () => {
            if (ObjectValue.classList.contains("active")) return ObjectValue.classList.remove("active");

            ObjectValue.classList.add("active");
        };
    });
}


function preview() {
    var JSON_PREVIEW = document.querySelector(".json-preview");

    JSON_PREVIEW.innerHTML = "";


    
        resolveObject(
            JSON.parse(document.querySelector("textarea").value), 
            JSON_PREVIEW
        );
    
	
}
