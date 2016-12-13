var friends = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friends/:characters?", function (req, res) {
		var chosen = req.params.characters;

		if (chosen) {
			console.log(chosen);
			for(var i = 0; i < friends.length; i++) {
				if (chosen === friends[i].route) {
					res.json(friends[i]);
				}
			}
			res.json(false);
		} else {
			res.json(friends);
		}
	}); //end get

	app.post("/api/friends", function(req, res) {

		var newfriend = req.body;

		// change new friend scores to numbers
		for (var i = 0; i < newfriend.scores.length; i++) {
			newfriend.scores[i] = parseInt(newfriend.scores[i]);
		}

		var diff = [];

		for (var i = 0; i < friends.length; i++) {
        for (var j = 0; j < friends.length; j++){
          diff.push(Math.abs(friends[i].scores[j] - newfriend.scores[j]));
        }
      }
		
      	Array.min = function (array) {
      		return Math.min.apply(Math, array);
      	}

		var lowest = Array.min(diff);

		var match = friends[friends.indexOf(lowest)];
		
		res.json(match);

		//friends.push(newfriend);
	}); //end post

};

