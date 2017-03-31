var hashTable = new HashTable();

function initTable() {
	var bucketCount = 0;
	var t = document.getElementById("hashtable");
	for (var j = 1; j <= 5; j++) {
		var tr = document.createElement("tr");
		for (var i = 1; i <= 5; i++) {
			var td = document.createElement("td");
			td.setAttribute("id", ++bucketCount);
			tr.appendChild(td);
		}
		t.appendChild(tr);
	}
}
initTable()

var eventList = []
var index = -1;
function add() {

	var key = $("#key").val();
	var value = $("#value").val();
	if (key === "" || value === "") {
		return;
	}

	index = hashTable.put(key, value);

	// add the callbacks
	eventList.push(addEvent)
	eventList.push(beginProgress)
	eventList
			.push(function() {
				$("#progress")
						.fadeIn("slow")
						.html(
								"<img src='../images/loading.gif' width='150' height='80' /><br />")
			})
	eventList.push(showCalculatedPos)
	eventList.push(animateCol);
	// now animate
	animate(eventList);
}

function search() {
	var key = $("#search").val();
	if (key === "") {
		return;
	}

	index = hashTable.get(key);
	console.log('index ', index);
	if (index == -1) {
		alert("no key found..")
		return;
	}

	// add the callbacks
	eventList.push(highlightCol);
	// now animate
	animate(eventList);
	$("#serach").val("");
}

function remove() {

	var key = $("#search").val();
	if (key === "") {
		return;
	}

	index = hashTable.remove(key);
	console.log('index ', index);
	if (index == -1) {
		alert("no key found..")
		return;
	}

	// add the callbacks
	eventList.push(highlightCol);
	eventList.push(removeCol);
	// now animate
	animate(eventList);

	$("#search").val("");
}

function addEvent(key, value) {
	var html = "Inserting<br /> <code>Key: " + $("#key").val()
			+ " </code><br /><code>Value: " + $("#value").val() + " </code>"
	$("#itemStaged").animate({
		opacity : 0
	}, 800, function() {
		$("#itemStaged").animate({
			opacity : 1000
		});
		$("#itemStaged").html(html);
	});
	
	
	
	
}

function beginProgress() {
	$("#progress").fadeIn("slow").html(
			"Using a hash function to compute the bucket location...");
}

function showCalculatedPos() {
	$("#progress").fadeIn("slow").html(
			"Position Identified at Index: " + (index)).addClass("green");
}

function animateCol() {
	$("#" + (index)).animate(
			{
				opacity : 0
			},
			800,
			function() {
				$("#" + (index)).animate({
					opacity : 100
				});
				$("#" + (index)).addClass("focus");
				$("#" + (index)).html(
						"k: " + $("#key").val() + "<br/ > v: "
								+ $("#value").val());
				$("#" + (index)).addClass("selected");
				reset();
			});
}

function highlightCol() {
	$("#" + index).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100)
			.fadeIn(100);
}

function removeCol() {
	$("#" + index).removeClass("focus selected");
	$("#" + index).html("");
}

function reset() {
	$("#itemStaged").html("");
	$("#progress").html("");
	$("#key").val("");
	$("#value").val("");
	$("#remove").val("");
	$("#search").val("");
	index = -1;
}

function animate(list) {
	if (list.length === 0) {
		return;
	}
	var event = list.shift();
	event();

	setTimeout(function() {
		animate(list);
	}, 2000);
}