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

	app.post("/api/newfriend", function(req, res) {
		var newfriend = req.body;
		newfriend.route = newfriend.name.replace(/\s+/g, "").toLowerCase();
		// change new friend scores to numbers
		for (var i = 0; i < newfriend.scores.length; i++) {
			newfriend.scores[i] = parseInt(newfriend.scores[i]);
		}
		friends.push(newfriend);
		res.json(newfriend);
	}); //end post

};

