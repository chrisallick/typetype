/*
    array to check item agains
    return true if item in array, false if not
*/
doesInclude = function( array, item ) {
    return (array.indexOf(item) != -1);
}

/*
	return length of keys of object
*/
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
