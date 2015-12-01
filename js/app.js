/* First Demo */
function generateRandom(arrayLength) {
    var arr = [];
    for (var i = 0; i < arrayLength; i++) {
        var newItem = {};
        newItem.label = Math.random().toString(36).substring(7);
        newItem.status = Math.random().toString(36).substring(7);
        arr.push(newItem);
    }
    return arr;
}

(function() {

    'use strict';
    var myApp = angular.module("myApp0", []);
    myApp.controller('ZeroController', [function(){
        var self = this;
        self.expandAll = function(){
            $(".collapse").collapse("show");
        };
        self.collapseAll = function(){
            $(".collapse").collapse("hide");
        }
    }])

})();



(function() {
    'use strict';
    var myApp = angular.module("myApp1", []);
    myApp.controller("FirstController", [function() {
        var self = this;
        self.demoTitle = "1. ng-bind and double curly";
        self.helloMessage = "Hello moto";
        self.goodbyeMessage = "Goodbye moto " + self.helloMessage;
    }]);


    var myApp1Element = document.getElementById("myApp1ID");
    angular.bootstrap(myApp1Element, ["myApp1"]);
})();

/* Second Demo */
(function() {
    'use strict';
    var myApp = angular.module("myApp2", []);
    myApp.controller("SeccondController", [function() {
        var self = this;
        self.demoTitle = "2. ng-click";
        var message1 = "First Message";
        var message2 = "Seccond Message";
        self.message = message1;

        self.changeMessage = function() {
            if(self.message == message1){
                self.message = message2;
            } else {
                self.message = message1;
            }
        };
    }]);
    var myApp2Element = document.getElementById("myApp2ID");
    angular.bootstrap(myApp2Element, ["myApp2"]);
})();

/* Third Demo */
(function() {
    'use strict';
    var myApp = angular.module("myApp3", []);
    myApp.controller("ThirdController", [function() {
        var self = this;
        self.demoTitle = "3. ng-repeat and child controller";
        self.helloMessage = "Hello from ThirdController";
        self.notes = generateRandom(10);

        self.addItem = function(){
            var newItem = {};
            newItem.label = Math.random().toString(36).substring(7);
            newItem.status = Math.random().toString(36).substring(7);
            self.notes.push(newItem);
        }
        self.removeItem = function(itemToRemove){
            self.notes.splice(self.notes.indexOf(itemToRemove), 1);
        }
    }]);

    myApp.controller("ChildThirdController", [function() {
        var self = this;
        self.helloMessage = "Hello from ChildThirdController";
    }]);

    var myApp3Element = document.getElementById("myApp3ID");
    angular.bootstrap(myApp3Element, ["myApp3"]);
})();

/* Fourth Demo */
(function() {
    'use strict';
    var myApp = angular.module("myApp4", []);
    myApp.controller("FourthController", [function() {
        var self = this;
        self.demoTitle = "4. ng-show, ng-hid, ng-class, ng-repeat over an Object";
        self.getNoteClass = function(){
            return {
                testngclass: true
            };
        };

        self.notes = {
            shyam: {
                id: 1,
                label: 'First Note',
                done: false
            },
            Misko: {
                id: 3,
                label: 'Finished Third Note',
                done: true
            },
            brad: {
                id: 2,
                label: 'Second Note',
                done: false
            },
            Angela: {
                id: 0,
                label: 'Fourth Note',
                done: false
            }
        };

    }]);

    var myApp4Element = document.getElementById("myApp4ID");
    angular.bootstrap(myApp4Element, ["myApp4"]);
})();

/* Fifth Demo */
(function() {
    'use strict';
    var myApp = angular.module("myApp5", []);
    myApp.controller("FifthController", [function() {
        var self = this;
        self.demoTitle = "5. ng-repeat track by ID";
        var notes = [{
            id: 1,
            label: 'First Note',
            done: false,
            someRandom: 31431
        }, {
            id: 2,
            label: 'Second Note',
            done: false
        }, {
            id: 3,
            label: 'Finished Third Note',
            done: true
        }];
        self.notes1 = angular.copy(notes);
        self.notes2 = angular.copy(notes);
        self.changeNotes = function() {
            notes = [{
                id: 1,
                label: 'Changed Note',
                done: false,
                someRandom: 4242
            }, {
                id: 2,
                label: 'Second Note',
                done: false
            }, {
                id: 3,
                label: 'Finished Third Note',
                done: true
            }];
            self.notes1 = angular.copy(notes);
            self.notes2 = angular.copy(notes);
        };
    }]);

    var myApp5Element = document.getElementById("myApp5ID");
    angular.bootstrap(myApp5Element, ["myApp5"]);
})();
