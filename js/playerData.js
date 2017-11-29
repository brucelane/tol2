///// player data vars ///////////

/// json objects
var GameProfile = {};
// / json data arrays
var GameNames = [];
var CheevoNames = [];
var armDriftX = [];
var armDriftY = [];
var armDriftTime = [];
var gameStats = [];

//

// /// individual games
var armCalibration = [];
var postureData = [];
var reyMentaProgress = [];
var soundGripProgress = [];
var treeDogProgress = [];
var rocketDogProgress = [];
var spaceDogProgress = [];
var featherWeightProg = [];
/*
 * var totalFWHits; var totalFWRow; var totalFWAcc; var totalFWTime;
 */

var playerProfile; // / this might be a problem
var statBlocks;
var statFeather;

var newDriftX;
var newDriftY;
var newTimeStamp;

var gName;
var gInfo;
var gImage;
var gMap;
var gTimePlayed;
var gPercent;
var gNumCheev;
var gRecCheev;

var pName;
var pId;
var pTtime;
var pRank;
var pDiff;

// //// PLAYER DATA //////////////////////

////////////////////////////////////////////////////
// //// populate all arrays with saved player data ////
/////////////////////////////////////////////////////////////

function loadPlayerData() {
	
	console.log("LOADING PLAYER DATA");
	$.getJSON('data/playerData.json', function(data) {
		$.each(data.calibration_arm, function(a, b) {
			var xDrift = b.xdrift;
			var yDrift = b.ydrift;
			var tTimestamp = b.timestamp;

			var tCalArm = {
				"timestamp" : tTimestamp,
				"ydrift" : yDrift,
				"xdrift" : xDrift
			};
			armCalibration.push(tCalArm);

		});

		// // do rey menta tracking
		$.each(data.reymenta_progress, function(c, d) {
			var tHit = d.hits;
			var tAcc = d.accuracy;
			var tTime = d.time;
			var tStamp = d.timestamp;
			var xDrift = d.xdrift;
			var posRot = d.pos_rotation;
			var tRow = d.in_a_row;
			var tHits = d.total_hits;

			var tAllData = {
				"hits" : tHit,
				"accuracy" : tAcc,
				"in_a_row" : tRow,
				"total_hits" : tHits,
				"timestamp" : tStamp,
				"pos_rotation" : posRot,
				"xdrift" : xDrift,
				"time" : tTime
			};

			
			reyMentaProgress.push(tAllData);

		});


		$.each(data.spacedog_progress, function(e, f) {

			var tAllData = {
				"hits" :  f.hits,
				"accuracy" : f.accuracy,
				"in_a_row" :  f.in_a_row,
				"timestamp" : f.timestamp,
				"pos_rotation" : f.pos_rotation,
				"xdrift" : f.xdrift,
				"time" :  f.time
			};

			spaceDogProgress.push(tAllData);

		});
		
		$.each(data.treedog_progress, function(ee, ff) {

			var tAllData = {
				"hits" :  ff.hits,
				"accuracy" : ff.accuracy,
				"in_a_row" :  ff.in_a_row,
				"timestamp" : ff.timestamp,
				"pos_rotation" : ff.pos_rotation,
				"xdrift" : ff.xdrift,
				"time" :  ff.time
			};

			treeDogProgress.push(tAllData);

		});

		$.each(data.rocketdog_progress, function(g, h) {
			
			var tAllData = {
				"hits" : h.hits,
				"accuracy" :  h.accuracy,
				"in_a_row" : h.in_a_row,
				"timestamp" : h.timestamp,
				"pos_rotation" : h.pos_rotation,
				"xdrift" : h.xdrift,
				"time" : h.time
			};

			rocketDogProgress.push(tAllData);

		});

		// // do featherweight tracking
		$.each(data.featherweight_progress, function(i, j) {

			var tAllData = {
				"hits" : j.hits,
				"accuracy" : j.accuracy,
				"in_a_row" :  j.in_a_row,
				"timestamp" : j.timestamp,
				"pos_rotation" : j.pos_rotation,
				"xdrift" : j.xdrift,
				"time" : j.time
			};

			featherWeightProg.push(tAllData);

		});

		// ////////// do sound grip tracking ////////////////////

		$.each(data.soundgrip_progress, function(k, l) {

			var tAllData = {
					"hits" : l.hits,
					"accuracy" : l.accuracy,
					"in_a_row" :  l.in_a_row,
					"timestamp" : l.timestamp,
					"pos_rotation" : l.pos_rotation,
					"xdrift" : l.xdrift,
					"time" : l.time
			};

			// // save the soundgrip array with all the current data
			soundGripProgress.push(tAllData);
		});

		// // do the cheevo data
		$.each(data.achievements, function(m, n) {
			var cheevName = n.name;
			var cheevThumb = n.thumb;
			var cheevdesc = n.description;

			var cheevData = {
				"name" : cheevName,
				"thumb" : cheevThumb,
				"description" : cheevdesc
			};

			CheevoNames.push(cheevData);
		});
		// // console.log("Cheevonames: " + JSON.stringify(CheevoNames));

		$.each(data.game_stats, function(o, p) {

			gName = p.name;
			gInfo = p.info;
			gImage = p.image;
			gMap = p.map;
			gTimePlayed = p.time_played;
			gNumCheev = p.num_achievements;
			gPercent = p.per_completed;
			gRecCheev = p.recent_cheevo;
			playerProfile = {
				"name" : gName,
				"info" : gInfo,
				"image" : gImage,
				"map" : gMap,
				"time_played" : gTimePlayed,
				"num_achievements" : gNumCheev,
				"per_completed" : gPercent,
				"recent_cheevo" : gRecCheev,
			};
			GameNames.push(gName);
			gameStats.push(playerProfile);
		});

		// / get profile info
		pName = data.name;
		pId = data.id;
		pTtime = data.total_time;
		pRank = data.rank;
		pDiff = data.difficulty;

		GameProfile = {
			"name" : pName,
			"id" : pId,
			"total_time" : pTtime,
			"rank" : pRank,
			"difficulty" : pDiff,
			"game_stats" : gameStats,
			"calibration_arm" : armCalibration,
			"reymenta_progress" : reyMentaProgress,
			"soundgrip_progress" : soundGripProgress,
			"treedog_progress" : treeDogProgress,
			"rocketdog_progress" : rocketDogProgress,
			"spacedog_progress" : spaceDogProgress,
			"featherweight_progress" : featherWeightProg,
			"achievements" : CheevoNames
		};


		console.log("finished loading data");
		initNavigation();
		initGamesNav();

	});

}

// ////////////////////////////////////////////////////
// ////// ADD DATA TO THE PLAYER PROFILE /////////////
// /////////////////////////////////////////////////////

function addAchievement(cheevName, cheevDesc, cheevThumb) {
	var hasCheev = false;
	// // make sure cheevo isn't in the db
	for (var i = 0; i < CheevoNames.length; i++) {
		var tcheev = CheevoNames[i].name;
		if (tcheev == cheevName) {
			hasCheev = true;
		}
	}
	if (!hasCheev) {
		console.log("adding achievement: " + cheevName);
		var newCheev = {
			"name" : cheevName,
			"thumb" : cheevThumb,
			"description" : cheevDesc
		};

		// / add to game stats for the particular game

		// / add to cheevo list
		CheevoNames.push(newCheev);
		savePlayerData();
	} else {

		console.log("already has achievement");
	}
}

// /////////////////////////////////////
// /// completed calibration //////
// ////////////////////////////////

function completeCalibration(xDrift, yDrift) {

	console.log("CALIBRATION COMPLETED!");
	var timestamp = getTimestamp();

	newDriftX = xDrift;
	newDriftY = yDrift;
	newTimeStamp = timestamp;

	var nCalArm = {
		"timestamp" : newTimeStamp,
		"ydrift" : newDriftY,
		"xdrift" : newDriftX
	};
	armCalibration.push(nCalArm);

	savePlayerData();
}

// /////////////////////////////////////
// ///////// adding data to to soundgrip //////
// /////////////////////////////////////////
function addToSoundGrip(theTime) {
	// / console.log("Sound Grip TIME ADDED!" + theTime);
	var timestamp = getTimestamp();

	var newSoundGrip = {
		"hits" : "2", // // fake data
		"accuracy" : "45",// // fake data
		"in_a_row" : "1",// // fake data
		"pos_rotation" : pos_rotation,
		"xdrift" : pos_driftX, ///// get this from main.js
		"timestamp" : timestamp,
		"time" : theTime,
	};
	soundGripProgress.push(newSoundGrip);
	savePlayerData();

}

// /////////////////////////////////////
// ///////// added data to featherweight //////
// /////////////////////////////////////////
function addToFeatherWeight(theTime) {

	console.log("ADDING TO FEATHERWEIGHT");
	
	/*
	var timestamp = getTimestamp();

	var newFeatherWeight = {
		"timestamp" : timestamp,
		"time" : theTime,
	};
	featherWeightProg.push(newFeatherWeight);
	savePlayerData();
	
	*/

}

// /////////////////////////////////////
// ///////// added data to REYMENTA //////
// /////////////////////////////////////////
// addToReyMenta(formatTime(curTime), totalHits, totalBounce, tStamp);
function addToReyMenta(theTime, tHit, tBounce, tStamp) {
	// shots hit / shots fired
	console.log("SHOTS HIT: " + tHit + " " + "SHOTS FIRED: " + tBounce);
	var theAcc = parseInt(tHit / tBounce);
	var newReyMenta = {
		"hits" : tHit, // // fake data
		"accuracy" : theAcc * 100,// // fake data
		"in_a_row" : "1",// // fake data
		"timestamp" : tStamp,
		"pos_rotation" : pos_rotation,
		"xdrift" : pos_driftX, ///// get this from main.js
		"time" : theTime,

	};


	reyMentaProgress.push(newReyMenta);
	savePlayerData();
}

///////////////////////////////////////
/////////// added data to TREEDOG //////
///////////////////////////////////////////

/////// addrocketDogPlayerData(tHit, tShots, tRow, tTime);
function addTreeDogPlayerData(tHit, tShots, tRow, tTime) {
	
	// "green" range is from 185 (move left) to 155 (move right)
	// so "median" is 160
	var oldR = 0;
	var oldX = 0;
	var tmpDrift = 0;
	for(var i = 0; i<posRArray.length; i++){
	// check xdrift against the median 
		var newR = posRArray[i]; /// rotation
		var newX = posXArray[i]; // x drift
		
		oldX = newX; /// this is just to check to make sure there's variables
		
	    if(newX >= 160){
	    	newX = Math.floor(newX - 160); /// drift is more than the median
	    	
	    } else if(newX < 160){
	    	newX = Math.floor(160 - newX); /// drift is less than the median
	    }
	
	/// check this number against the next drift
	/// make sure the facetracker is reading values
	    if(oldX >0 && newX > tmpDrift){
	 	    tmpDrift = newX;
	    }
	    /// console.log("ORIG DRIFT : " + oldX + " lerped median: " + newX + " "  + tmpDrift);
	/// save the face tracking array
	}
	/// console.log("FINAL DRIFT CALCULATION: " + tmpDrift);
	var theAcc = parseFloat((tHit/3) / tShots); /// get accuracy
	theAcc =theAcc*100; // turn it into a percentage
	theAcc = theAcc.toFixed(2); // trim the decimals

	if(theAcc > 100){
		theAcc = 100;
	}
	
	var timestamp = getTimestamp();
	var newTreeDog = {
		"hits" : tHit,
		"accuracy" : theAcc,
		"in_a_row" : tRow,
		"timestamp" : timestamp,
		"pos_rotation" : pos_rotation,
		"xdrift" : tmpDrift, ///// get this from main.js
		"time" : tTime,

	};
	treeDogProgress.push(newTreeDog);
	savePlayerData();
}
///////////////////////////////////////
/////////// added data to ROCKETDOG //////
///////////////////////////////////////////

/////// addrocketDogPlayerData(tHit, tShots, tRow, tTime);
function addRocketDogPlayerData(tHit, tShots, tRow, tTime) {
	
	// "green" range is from 185 (move left) to 155 (move right)
	// so "median" is 160
	var oldR = 0;
	var oldX = 0;
	var tmpDrift = 0;
	for(var i = 0; i<posRArray.length; i++){
	// check xdrift against the median 
		var newR = posRArray[i]; /// rotation
		var newX = posXArray[i]; // x drift
		
		oldX = newX; /// this is just to check to make sure there's variables
		
	    if(newX >= 160){
	    	newX = Math.floor(newX - 160); /// drift is more than the median
	    	
	    } else if(newX < 160){
	    	newX = Math.floor(160 - newX); /// drift is less than the median
	    }
	
	/// check this number against the next drift
	/// make sure the facetracker is reading values
	    if(oldX >0 && newX > tmpDrift){
	 	    tmpDrift = newX;
	    }
	    console.log("ORIG DRIFT : " + oldX + " lerped median: " + newX + " "  + tmpDrift);
	/// save the face tracking array
	}
	/// console.log("FINAL DRIFT CALCULATION: " + tmpDrift);
	var theAcc = parseFloat((tHit/3) / tShots); /// get accuracy
	theAcc =theAcc*100; // turn it into a percentage
	theAcc = theAcc.toFixed(2); // trim the decimals

	if(theAcc > 100){
		theAcc = 100;
	}
	
	var timestamp = getTimestamp();
	var newrocketDog = {
		"hits" : tHit,
		"accuracy" : theAcc,
		"in_a_row" : tRow,
		"timestamp" : timestamp,
		"pos_rotation" : pos_rotation,
		"xdrift" : tmpDrift, ///// get this from main.js
		"time" : tTime,

	};
	rocketDogProgress.push(newrocketDog);
	savePlayerData();
}

// /////////////////////////////////////
// ///////// added data to SPACEDOG //////
// /////////////////////////////////////////


function addSpaceDogPlayerData(tHit, tShots, tRow, tTime) {

	// "green" range is from 185 (move left) to 155 (move right)
	// so "median" is 160
	var oldR = 0;
	var oldX = 0;
	var tmpDrift = 0;
	for(var i = 0; i<posRArray.length; i++){
	// check xdrift against the median (which is 160) 
		var newR = posRArray[i]; /// rotation
		var newX = posXArray[i]; // x drift
		
		oldX = newX; /// this is just to check to make sure there's variables
		
	    if(newX >= 160){
	    	newX = Math.floor(newX - 160); /// drift is more than the median
	    	
	    } else if(newX < 160){
	    	newX = Math.floor(160 - newX); /// drift is less than the median
	    }
	
	/// check this number against the next drift
	/// make sure the facetracker is reading values
	    if(oldX >0 && newX > tmpDrift){
	 	    tmpDrift = newX;
	    }
	    console.log("ORIG POSTURE DRIFT : " + oldX + " lerped median: " + newX + " "  + tmpDrift);
	/// save the face tracking array
	}

	var theAcc = parseFloat(tHit / tShots);
	console.log("NUM HITS : " + tHit + " NUM SHOTS: " + tShots + " ACCURACY:"  + theAcc);
	theAcc =theAcc*100; // turn it into a percentage
	theAcc = theAcc.toFixed(2); // trim the decimals
	
	if(theAcc > 100){
		theAcc = 100;
	}
	console.log(" PARSED ACC: " + theAcc);
	var timestamp = getTimestamp();
	var newSpaceDog = {
		"hits" : tHit,
		"accuracy" : theAcc,
		"in_a_row" : tRow,
		"timestamp" : timestamp,
		"pos_rotation" : oldR,
		"xdrift" : tmpDrift, 
		"time" : tTime,

	};
	

	spaceDogProgress.push(newSpaceDog);
	savePlayerData();
}

// //////////////////////////////////////////
// /////// UPDATE AND SAVE DATA ////////////
// //////////////////////////////////////////

function savePlayerData() {

	console.log("building json");

	GameProfile = {
		"name" : pName,
		"id" : pId,
		"total_time" : pTtime,
		"rank" : pRank,
		"difficulty" : pDiff,
		"game_stats" : gameStats,
		"calibration_arm" : armCalibration,
		"posture_data" : postureData,
		"reymenta_progress" : reyMentaProgress,
		"soundgrip_progress" : soundGripProgress,
		"treedog_progress" : treeDogProgress,
		"spacedog_progress" : spaceDogProgress,
		"rocketdog_progress" : rocketDogProgress,
		"featherweight_progress" : featherWeightProg,
		"achievements" : CheevoNames
	};
	// /// console.log("UPDATED PLAYER DATA-- global: " +
	// JSON.stringify(GameProfile));
	saveJsonFile();
}

function saveJsonFile() {
	console.log("saving file");
	// some jQuery to write to file
	$.ajax({
		type : "POST",
		url : "incl/saveJson.php",
		dataType : 'json',
		data : {
			json : JSON.stringify(GameProfile)
		/* convert here only */
		}
	});

}

// / timestamp functions
function getTimestamp() {
	// Create a date object with the current time
	var now = new Date().getTime();
	
	return now;
}

function convertDate(timestamp) {
	// Create an array with the current month, day and time
	// / truncate year
	var theTimeStamp = new Date(parseInt(timestamp)); // new Date(timestamp);
	// var theTimeStamp = new Date();
	var tYear = theTimeStamp.getFullYear().toString();
	var smYear = tYear.substring(2, 4);
	var date = [ theTimeStamp.getMonth() + 1, theTimeStamp.getDate(), smYear ];

	// Create an array with the current hour, minute and second
	var time = [ theTimeStamp.getHours(), theTimeStamp.getMinutes(),
			theTimeStamp.getSeconds() ];

	var smTime = [ theTimeStamp.getHours(), theTimeStamp.getMinutes() ];
	// Determine AM or PM suffix based on the hour
	var suffix = (smTime[0] < 12) ? "am" : "pm";

	// Convert hour from military time
	smTime[0] = (smTime[0] < 12) ? smTime[0] : smTime[0] - 12;

	// If hour is 0, set it to 12
	smTime[0] = smTime[0] || 12;

	// If seconds and minutes are less than 10, add a zero
	for (var i = 1; i < 3; i++) {
		if (smTime[i] < 10) {
			smTime[i] = "0" + smTime[i];
		}
	}

	// Return the formatted string
	// / return time.join(":") + " " + suffix + "\n" + date.join("/");
	// / trimmed for size
	
	/// console.log("SAVED TIMESTAMP: " + timestamp + " CONVERT DATE: " + theTimeStamp + " READABLE DATWE: " + smTime.join(":") + suffix + ", " + date.join("/"));
	return smTime.join(":") + suffix + ", " + date.join("/");

}
