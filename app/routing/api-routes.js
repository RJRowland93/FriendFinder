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

		function add(a,b) {
        	return a+b;
        }

		// change new friend scores to numbers
		for (var i = 0; i < newfriend.scores.length; i++) {
			newfriend.scores[i] = parseInt(newfriend.scores[i]);
		}

		var totalDiff = [];
		for (var i = 0; i < friends.length; i++) {
		var friendDiff = [];
        for (var j = 0; j < friends[i].scores.length; j++){
          friendDiff.push(Math.abs(friends[i].scores[j] - newfriend.scores[j]));
        }

        friendSum = friendDiff.reduce(add, 0);
        totalDiff.push(friendSum);
      }

		console.log(totalDiff);

      	Array.min = function (array) {
      		return Math.min.apply(Math, array);
      	}

		var lowest = Array.min(totalDiff);

		console.log("Lowest: "+lowest);
		console.log("Index: "+totalDiff.indexOf(lowest));

		var match = friends[totalDiff.indexOf(lowest)];
		console.log("Match: "+match.name);

		res.json(match);

		//friends.push(newfriend);
	}); //end post

};

