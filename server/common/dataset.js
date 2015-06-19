// dataset.js

var _ = require('lodash');

function DataSet() {

    var arr = [];

    arr._itemCheck_ = function (item) {
        if ('id' in item)
            return true;

        throw new Error(typeof (item) + ' is not a valid DataSet item.');
    };

    arr.add = function (newItem) {
        this._itemCheck_(newItem);

        if (_.some(arr, { id: newItem.id })) // can not add duplicated.
            return false;

        this.push(newItem);
        return true;
    };

    arr.remove = function (id) {
        var removed = _.remove(arr, { id: newItem.id });
        return removed[0];
    };

    arr.update = function (newItem) {
        this._itemCheck_(newItem);

        var index = _.findIndex({ id: newItem.id });
        if (index < 0)
            return false;

        this.splice(index, 1, newItem);
    };

    arr.find = function (predicate) {
        var result = _.find(arr, predicate);
        return _.isUndefined(result) ? null : result;
    };

    return arr;
}


module.exports = DataSet;
