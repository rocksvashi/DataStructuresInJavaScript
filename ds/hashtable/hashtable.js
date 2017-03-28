
var HashTable = function (size) {
	this.bucketSize = size || 20;
	this.array = [];
	for(var i= 0; i< this.bucketSize; i++) {
		this.array.push(undefined);
	}
}
// holds the entry
var Entry = function(k, v) {
	this.key = k;
	this.value = v
}

// I adopted this hash function from the below URL
// http://www.willvillanueva.com/javascript-hash-tables/
var getHash = function(str, max){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash<<5) - hash) + str.charCodeAt(i);
      console.log(hash)
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
   
    }
    return hash % max;
};

// My simple hash implementation
var simpleHash = function (key, max) {
	return (key % max);
}

HashTable.prototype.isEmpty = function () {
	return this.array.length > 0;
}

HashTable.prototype.print = function () {
	return console.log(this.array)
}

HashTable.prototype.put = function (key, value) {
	 var hash = getHash(key, this.bucketSize);
     while (this.array[hash] !== undefined && this.array[hash].key !== key)
           hash = (hash + 1) % this.bucketSize; //liner probing
     
     this.array[hash] = new Entry(key, value);
     
     return hash;
}

HashTable.prototype.get = function (key) {
	var hash = getHash(key, this.bucketSize);
    while (this.array[hash] !== undefined && this.array[hash].key !== key)
          hash = (hash + 1) % this.bucketSize;
   
    if (this.array[hash] == null)
          return -1;
    else
          return this.array[hash].value;
}

HashTable.prototype.remove = function (key) {

}
