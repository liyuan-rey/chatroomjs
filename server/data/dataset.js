// dataset.js

function DataSet() {
    
    var arr = [];
    
    arr._itemCheck_ = function (item) {
        if ('id' in item)
            return true;
        
        throw new Error(typeof (item) + ' is not a valid DataSet item.');
    };
    
    arr.add = function (newItem) {
        this._itemCheck_(newItem);
        
        var result = this.find(newItem.id);
        if (result.flag) // can not add duplicated.
            return false;
        
        this.push(newItem);
        return true;
    };
    
    arr.remove = function (id) {
        var result = this.find(id);
        var removed = this.splice(result.index, 1);
        return removed[0];
    };
    
    arr.update = function (id, newItem) {
        this._itemCheck_(newItem);
        
        var result = this.find(id);
        if (!result.flag)
            return false;
        
        newItem.id = id; // ignore the id of newItem
        this.splice(result.index, 1, newItem);
    };
    
    arr.find = function (id) {
        var result = {
            flag: false,
            index: -1,
            item: null
        };
        
        for (var i = 0; i < this.length && !result.flag; i++) {
            if ('id' in this[i] && arr[i].id === id)
                with (result) {
                    flag = true,
                    index = i,
                    item = this[i]
                };
        }
        
        return result;
    };
    
    return arr;
}


module.exports = DataSet;
