var BinaryTree = function(isBst) {
	this.root;
	this.isBst = isBst || false;
}

BinaryTree.prototype.insert = function(value) {
	if (this.root === undefined) {
		this.root = new Node();
	}

	if (this.isBst == true) {
		this.root.insertBst(value, 1);
		return;
	}

	this.root.insert(value, 1);
}

BinaryTree.prototype.tree = function () {
	if(this.root == null) {
		return [];
	}
	
	var treeArray = [];

	var queue = [];
	queue.push(this.root);
	
	while(queue.length > 0) {
		var tmp = [];
		var node = queue.pop();
		if(node.left != null) {
			tmp.push(node.left.value);
			// put at front
			queue.unshift(node.left);
		}
		if (node.right != null) {
			tmp.push(node.right.value);
			// put at front
			queue.unshift(node.right);
		}
		treeArray.push(tmp);
	}
	
	return treeArray;
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

Node.prototype.insert = function(value, level) {
	if (this.value === null) {
		this.value = value;
		this.level = 1;
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