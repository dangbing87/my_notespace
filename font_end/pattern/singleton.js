var Person = (function() {
    var instantiated,
        self = {};


    function init() {
        return self;
    };

    function getInstance() {
        if (!instantiated) {
            instantiated = init();
        }

        return instantiated;
    }

    self.say = function() {
        console.log("hi " + self.word);
    };

    self.word = "";

    return { "getInstance": getInstance };
})();

var a = new Person.getInstance();
var b = new Person.getInstance();

a.word = "this is singleton";
b.say();
