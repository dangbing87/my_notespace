var __extend = function(b, d) {
    for (var p in d) {
        b[p] = d[p];
    }
};

var __super = function(_object) {
    if (_object.init) {
        return _object.init();
    }

    return {};
};

var __mixin = function(_mixin) {
    var self = {},

        f = function(_object) {
            if (_object.init) {
                return _object.init();
            }
            return {};
        };

    if (_mixin.length > 1) {
        for (var m in _mixin) {
            __extend(self, f(_mixin[m]));
        }
    } else if (_mixin) {
        __extend(self, f(_mixin));
    }

    return self;
};

var A = (function() {
    function init() {
        var self = {};
        self.word = 'hello';

        return self;
    }

    return {
        'init': init
    };
}());

var MixinA = (function() {
    function init() {
        var self = {};
        self.word = 'hello';

        return self;
    }

    return {
        'init': init
    };
}());

var MixinB = (function() {
    function init() {
        var self = {};
        self.name = 'hello';

        return self;
    }

    return {
        'init': init
    };
}());

var B = (function(_super, _mixin) {
    function init() {
        var self = _super;

        console.log(_mixin);

        return self;
    }

    return {
        'init': init
    };
}(__super(A), __mixin([MixinA, MixinB])));

var Person = (function() {
    function Person(name) {
        this.name = name;
    }

    Person.prototype.say = function() {
        console.log(this.name);
    };

    return Person;
}());

var b =  new B.init();
var tom = new Person('Tom');

console.log(tom);
