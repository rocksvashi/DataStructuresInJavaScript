// define the list
var stack = new Stack(10);

function addCol(value) {
	var t = document.getElementById("row");
	var tr = document.createElement("tr");
	tr.setAttribute("id", value);
	var td = document.createElement("td");
	td.setAttribute("class", "highlight custom")
	td.innerHTML = value;
	tr.appendChild(td);
	$("#row").prepend(tr);

}

var defaultValueCounter = 0;
function push() {
	var value = document.getElementById("add").value;
	if (value === "") {
		defaultValueCounter++;
		value = defaultValueCounter;
	}
	stack.push(value);
	addCol(value);

	document.getElementById("add").value = "";
}

function pop() {
	setTimeout(function() {
		try {
			var value = stack.pop();
			removeCol(value);
		} catch (e) {
			showMessage("#status", "Stack Underflow", "red")
		}
	}, 200)
}

function findMin() {
	var value = stack.minValue();
	highlightCol(value, "min");

}

function findMax() {
	var value = stack.maxValue();
	highlightCol(value, "max");

}

function highlightCol(value, css) {
	$("#" + value).animate({
		top : "20px"
	});
	$("#" + value).find('td').addClass(css);
}

function removeCol(value) {
	$("#" + value).animate({
		top : "20px"
	});
	$("#" + value).find('td').addClass("focus");
	setTimeout(function() {
		$("#" + value).fadeOut(500).delay(1000).remove();
		showMessage("#status", "Finished", "green")
	}, 500);

}

function showMessage(id, html, color) {
	$(id).html(html);
	$(id).css("color", color);
}