function secondsToTime(seconds) {
	if(seconds < 3600) return Math.floor(seconds / 60) + ":" + ((seconds % 60 < 10) ? "0" : "") + Math.floor(seconds % 60);
	return Math.floor(seconds / 3600) + ":" + ((seconds % 60 < 10) ? "0" : "") + Math.floor((seconds / 60) % 60) + ":" + ((seconds % 60 < 10) ? "0" : "") + Math.floor(seconds % 60);
}

function playerStateStr(stateId) {
	var states = ["unstarted", "ended", "playing", "paused", "buffering", "unknown", "cued"];
	return states[stateId + 1];
}
