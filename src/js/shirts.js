function Player() {
    var self = this;

    self.name = ko.observable(" ");
    self.preference1 = ko.observable(0);
    self.preference2 = ko.observable(0);
    self.preference3 = ko.observable(0);
}

function ShirtsModel() {
    var self = this;

    var players = [];
    for (i = 0; i < 15; i++) {
	players.push(new Player())
    }
    
    self.players = ko.observableArray(players);
    self.numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    self.generate = function() {
	var solution = [];
	for (var number = 0; number < 15; number++) {
	    solution.push([]);
	    for (var player = 0; player < 15; player++) {
		var cost = 4;
		if (self.players()[player].preference3() === number + 2) {
		    cost = 3;
		}
		if (self.players()[player].preference2() === number + 2) {
		    cost = 2;
		}
		if (self.players()[player].preference1() === number + 2) {
		    cost = 1;
		}

		solution[number][player] = cost;
	    }
	}

	for (var x = 0; x < 15; x++) {
	    var minValue = 10;
	    for (y = 0; y < 15; y++) {
		if (solution[x][y] < minValue) {
		    minValue = solution[x][y];
		}
	    }
	    for (y = 0; y < 15; y++) {
		solution[x][y] -= minValue;
	    }
	    console.log(minValue);
	}

	//print output
	for (var x = 0; x < 15; x++) {
	    var row = '[ '
	    for (y = 0; y < 15; y++) {
		row += solution[x][y] + ', ';
	    }
	    row += ']'
	    console.log(row);
	}
    }
}

var model = new ShirtsModel();
ko.applyBindings(model);