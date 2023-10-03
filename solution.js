var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.items = items;
        this.itemMap = new Map();
        //creating a map for quick access by id
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.itemMap.set(item.id, item);
        }
    }
    TreeStore.prototype.getAll = function () {
        return this.items;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.itemMap.get(id);
    };
    TreeStore.prototype.getChildren = function (id) {
        var children = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.parent === id) {
                children.push(item);
            }
        }
        return children;
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var allChildren = [];
        var stack = [id];
        while (stack.length > 0) {
            var currentId = stack.pop();
            var children = this.getChildren(currentId);
            allChildren.push.apply(allChildren, children);
            stack.push.apply(stack, children.map(function (child) { return child.id; }));
        }
        return allChildren;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var allParents = [];
        var currentId = id;
        while (currentId !== 'root' && currentId !== undefined) {
            var parent_1 = this.itemMap.get(currentId);
            if (parent_1) {
                allParents.push(parent_1);
                currentId = parent_1.parent;
            }
            else {
                break;
            }
        }
        return allParents;
    };
    return TreeStore;
}());
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var ts = new TreeStore(items);
console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));
