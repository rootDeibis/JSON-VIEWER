function resolveObject(object, el, p = false) {
    Object.keys(object).forEach(function (element, index) {
        var value = object[element];

        if (typeof value === "object") {
            var DIV_CONTAINER = document.createElement("div");
            let ObjectType = Array.isArray(value) ? "array" : "object";

            var ObjectTitleDOM = document.createElement("div");

            DIV_CONTAINER.setAttribute("class", "object");
            ObjectTitleDOM.innerHTML = "<p id='object-title'>" + element + `<a class="object-button" id="${ObjectType}">${ObjectType}</a>` + "</p>";

            DIV_CONTAINER.append(ObjectTitleDOM);

            var DIV_VALUE = document.createElement("div");

            DIV_VALUE.setAttribute("class", "object-value");
            DIV_VALUE.style = "margin-left: 10px;border-left: solid 2px;padding: 10px 0;padding-left: 8px;border-radius: 0px;border-color: #2196f3;";

            DIV_CONTAINER.append(DIV_VALUE);
            el.append(DIV_CONTAINER);

            resolveObject(value, DIV_VALUE, true);
        } else {
            el.innerHTML += "<p style='margin: 5px 0;'><b>" + element + ": </b>" + value + "</p>";
        }
    });

    document.querySelectorAll(".object-button").forEach((btn) => {
        var ObjectValue = btn.parentNode.parentNode.parentNode.querySelector(".object-value");

        btn.addEventListener("click", function () {
            if (ObjectValue.classList.contains("active")) return ObjectValue.classList.remove("active");
            ObjectValue.classList.add("active");
        });
    });
}


function preview() {
	resolveObject(JSON.parse(document.querySelector("textarea").value), document.querySelector(".json-preview"));
}