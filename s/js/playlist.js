var STATE_STR_ENDED = "ended";

var Playlist = {
	//This should be set programmatically:
	gameVids : [
		["TDbJafFqajA", "5IFNPyn_s4U"], //game 1 (parts 1 and 2)
		["BM6enx5Q-og", "6e8Kj5FNB58"], //game 2 (parts 1 and 2)
		["Hey0NL-xse8", "cT62kr0v4gI"], //game 3 (parts 1 and 2)
		["GjRT_1Wb9Ok", "IoxqOmFeqC8"], //game 4 (parts 1 and 2)
		["dSSi45LM3sM"], //game 5 (only one part)
		["yKyvnqfDC9M", "t2O5dv5t42Q"] //game 6 (parts 1 and 2)
	],
	
	//this should also be set programmatically:
	title : "Huk vs. MorroW - Best of 7",
	
	currentQuality : "default",
	onVideoLoad : null,
	onPlayerStateChangeAlt : null,
	
	init : function(onVideoLoad, onPlayerStateChange) {
		Playlist.onVideoLoad = onVideoLoad;
		Playlist.onPlayerStateChangeAlt = onPlayerStateChange;
	},
	
	onPlayerStateChange : function(state) {
		var stateStr = playerStateStr(state);
		if(stateStr == STATE_STR_ENDED) {
			Playlist.loadNextVideo();
		}
		Playlist.onPlayerStateChangeAlt(state);
	},
	
	nextGame : function() {
		if(Playlist.curVideo.game + 1 == Playlist.gameVids.length)
			return false;
		
		Playlist.curVideo.part = Playlist.gameVids[Playlist.curVideo.game].length - 1;
		Playlist.loadNextVideo();
		return true;
	},
	
	loadNextVideo : function() {
		if(Playlist.curVideo.part + 1 == Playlist.gameVids[Playlist.curVideo.game].length) {
			Playlist.curVideo.game++;
			Playlist.curVideo.part = 0;
		} else {
			Playlist.curVideo.part++;
		}
			
		if(Playlist.curVideo.game == Playlist.gameVids.length) {
			//we reached the end of the playlist
		} else {
			Player.loadVideoById(Playlist.gameVids[Playlist.curVideo.game][Playlist.curVideo.part], 0, Playlist.currentQuality);
			Playlist.onVideoLoad();
		}
	},
	
	curVideo : {"game" : 0, "part" : 0},
	
	cueFromStart : function() {
		Playlist.curVideo.game = 0;
		Playlist.curVideo.part = 0;
		Player.cueVideoById(Playlist.gameVids[0][0], 0, Playlist.currentQuality);
		Playlist.onVideoLoad();
	}
}