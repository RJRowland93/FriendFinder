var path = require("path");

module.exports = function(app) {
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/survey.html"));
	}); //end get survey

// If no matching route is found default to home
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/home.html"));
	}); // end home get
}