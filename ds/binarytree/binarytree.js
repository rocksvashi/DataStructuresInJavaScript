var BinaryTree = function(isBst) {
	this.root;
	this.isBst = isBst || false;
}

BinaryTree.prototype.insert = function(value) {
	if (this.root === undefined) {
		this.root = new Node();
	}

	if (this.isBst == true) {
		this.root.insertBst(value);
		return;
	}

	this.root.insert(value);
}

BinaryTree.prototype.find = function(value) {
	if (this.root === null) {
		return -1;
	}

	if (this.isBst) {
		return this.root.findBstStyle(value);
	}

	return this.root.findNonBst(value);

}

BinaryTree.prototype.printTree = function (node) {
	if (node === null || typeof node == "undefined") {
		return;
	}
	
	console.log(node.value);
	this.printTree(node.left);
	this.printTree(node.right);
}

var Node = function() {
	this.value = null;
	this.left = null;
	this.right = null;
	this.level = 0;
}

Node.prototype.insert = function(value) {
	if (this.value === null) {
		this.value = value;
		return value;
	}
	
	var nodes = [];
	nodes.push(this); //push the root
	
	while(nodes.length > 0){
        var node = nodes.pop();
        if(node.left === null){
            node.left = new Node();
            node.left.value = value;
            return;
        } else {
        	// add at front
        	nodes.unshift(node.left)
        }

        if(node.right === null){
          node.right = new Node();
          node.right.value = value;
          return;
        } else {
        	// add at front
        	nodes.unshift(node.right)
        }
    }
	
}

Node.prototype.insertBst = function(value) {
	
	if (typeof this.value === "undefined") {
		this.value = value;
		return value;
	}

	if (value >= this.value) {
		if (this.right === null) {
			this.right = new Node();
			this.right.value = value;
			return value;
		}
		
		return this.right.insertBst(value);
		
	} else {
		
		if (this.left === null) {
			this.left = new Node();
			this.left.value = value;
			return value;
		}
		
		return this.left.insertBst(value);
	}

}

Node.prototype.findBstStyle = function(value) {

	if (this.value == value) {
		return value;
	}

	if (value > this.value && this.right !== null) {
		return this.right.findBstStyle(value);

	} else {
		if (this.left !== null) {
			return this.left.findBstStyle(value);
		}
	}

	return -1;
}

Node.prototype.findNonBst = function(value) {
	if (this.value == value) {
		return value;
	}

	if (this.left !== null) {
		return this.left.findNonBst(value);
	}

	if (this.right !== null) {
		return this.right.findNonBst(value);
	}

	return -1;
}