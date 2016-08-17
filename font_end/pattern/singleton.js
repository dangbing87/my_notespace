var decoratorSingleton = (function() {

    var wrap = function(func) {
        var instantiated;

        function init(initArgs) {
            return func(initArgs);
        }

        return {
            'getInstance': function(args) {
                if (!instantiated) {
                    instantiated = init(args);
                }

                return instantiated;
            }
        };
    };

    return {
        'creat': function(func) {
            return wrap(func);
        }
    };
}());

var Person = (function() {
    var instantiated;


    function init() {
        var self = {};

        self.say = function() {
            console.log("hi " + self.word);
        };

        self.word = "";

        return self;
    }

    return {
        'getInstance': function() {
            if (!instantiated) {
                instantiated = init();
            }

            return instantiated;
        }
    };
}());

var Person2 = decoratorSingleton.creat(function() {
    var self = {};

    self.word = 'hello';

    self.say = function() {
        console.log(self.word);
    };

    return self;
});


var Cup = decoratorSingleton.creat(function(color) {
    var self = {};

    self.color = color || 'blue';

    return self;
});

var a = new Person.getInstance();
var b = new Person.getInstance();

b.word = '';
// a.say();

var cup1 = Cup.getInstance('red'),
    cup2 =Cup.getInstance('green');

console.log(cup1);
console.log(cup2);
cup1.color = 'white';
console.log(cup2);

