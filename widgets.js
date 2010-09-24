//should be called whenever a video loads
var videoLoaded = function() {
	$("title").text(Playlist.title);
	$("#matchName").text(Playlist.title);
	$("#curGame").text("Game " + (Playlist.curVideo.game + 1))
}

//called whenever the player state changes...
var playerStateChanged = function(state) {
	console.log("player state is: " + playerStateStr(state));
	if(playerStateStr(state) == "paused" || playerStateStr(state) == "playing") {
		var paused = playerStateStr(state) == "paused";
		$("#playButton")[(paused) ? "addClass" : "removeClass"]("active");
		$("#playButton").text((paused) ? "Play" : "Pause");
	}
	Playlist.onPlayerStateChange(state);
}

var playerIsReady = function() {
	setInterval(function() { 
		$("#curTime").text(secondsToTime(Player.getCurrentTime())); 
	}, 100);
	Playlist.cueFromStart();
}

var playerHasError = function(error) {
	
}

var qualLevels = {
	"small" : null,
	"medium" : "Medium",
	"large" : "Large",
	"hd720" : "720p",
	"hd1080" : "1080p",
	"highres" : "Super"
}

var playbackQualityChanged = function(quality) {
	Playlist.currentQuality = quality;
	$("#quality > a").remove();
	var qualities = Player.getAvailableQualityLevels();
	for(var i=qualities.length-1; i>=0; i--) {
		if(qualLevels[qualities[i]] != null) {
			var tag = $("<a></a>");
			tag.attr("href", "javascript:void(0)");
			tag.attr("id", "qual" + qualities[i]);
			tag.bind("click", function(e) { Player.setPlaybackQuality(this.id.substring(4)); });
			tag.text(qualLevels[qualities[i]]);
			$("#quality").append(tag);
		}
	}
	$("#quality").css("width", $("#quality").children().length * 100);

	$("#quality > a").removeClass("active");
	$("#qual" + quality).addClass("active");
}

function togglePause() {
	Player[(playerStateStr(Player.getPlayerState()) == "playing") ? "pause" : "play"]();
}

var muted = false;
function toggleMute() {
	muted = !muted;
	Player[(muted) ? "mute" : "unMute"]();
	$("#muteButton")[(muted) ? "addClass" : "removeClass"]("active");
	$("#muteButton").text((muted) ? "Unmute" : "Mute");
}