var hashTable = new HashTable();

function initTable() {
	var bucketCount = 0;
	var t = document.getElementById("hashtable");
	for(var j=1 ; j<=5; j++){
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
	if( key === "" || value === "") {
		return;
	}
	
	index = hashTable.put(key, value);
	
	// add the callbacks
	eventList.push(addEvent)
	eventList.push(beginProgress)
	eventList.push(function(){$("#progress").fadeIn("slow").html("<img src='../images/loading.gif' width='150' height='80' /><br />")})
	eventList.push(showCalculatedPos)
	eventList.push(animateCol);
	// now animate
	animate(eventList);
}

function addEvent(key, value) {
	var html ="Inserting<br /> <code>Key: "+ $("#key").val()+" </code><br /><code>Value: "+$("#value").val()+" </code>"
	$("#itemStaged").animate({opacity: 0}, 800, function () {
		$("#itemStaged").animate({opacity: 1000});
		$("#itemStaged").html(html);
	});
}

function beginProgress() {
	$("#progress").fadeIn("slow").html("Calculating the Postion in Bucket");
}


function random(range) {
	return Math.floor((Math.random()*range) + 1); 
}


function showCalculatedPos() {
	$("#progress").fadeIn("slow").html("Position Identified at Index: "+ (index)).addClass("green");
}


function animateCol() {
	$("#" + ( index)).animate({opacity: 0}, 800, function () {
    	$("#" + ( index)).animate({opacity: 100});
    	$("#" + ( index)).addClass("focus");
    	$("#" + ( index)).html($("#value").val());
    	$("#" + ( index)).addClass("selected");
    	reset();
    });
}

function reset () {
	$("#itemStaged").html("");
	$("#progress").html("");
	$("#key").val("");
	 $("#value").val("");
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