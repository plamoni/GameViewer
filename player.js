var Player = {
	init : function(onPlayerReady, onPlayerError, onPlayerStateChange, onVideoPlaybackQualityChange) {
		Player.onPlayerReady = onPlayerReady;
		Player.onPlayerError = onPlayerError;
		Player.onPlayerStateChange = onPlayerStateChange;
		Player.onVideoPlaybackQualityChange = onVideoPlaybackQualityChange;
	
		swfobject.embedSWF("wrapper.swf", 
		   "player", 
		   "800", "450", 
		   "9.0.0",  
		   "expressInstall.swf", 
		   null, 
		   {	
		   		allowfullscreen: "true", 
				allowScriptAccess: "always"
		   }, 
		   null, 
		   function(e) { Player.p = e.ref; }
		);
	},
	
	//callbacks:
	onPlayerReady : null,
	onPlayerError : null,
	onPlayerStateChange : null,
	onVideoPlaybackQualityChange : null,
	
	//video controls:
	pause : function() { Player.p.pauseVideo();	},
	play : function() { Player.p.playVideo(); },
	stop : function() { Player.p.stopVideo(); },
	mute : function() {	Player.p.mute(); },
	unMute : function() { Player.p.unMute(); },
	isMuted : function() { return Player.p.isMuted(); },
	setVolume : function(volume) { Player.p.setVolume(volume); },
	getVolume : function() { return Player.p.getVolume(); },
	seekTo : function(seconds, allowSeekAhead) { Player.p.seekTo(seconds, allowSeekAhead); },
	setSize : function(width, height) {
		Player.p.width = width;
		Player.p.height = height;
	},
	cueVideoById : function(id, seconds, quality) { Player.p.cueVideoById(id, seconds, quality); },
	loadVideoById : function(id, seconds, quality) { Player.p.loadVideoById(id, seconds, quality); },
	cueVideoByUrl : function(url, seconds) { Player.p.cueVideoByUrl(url, seconds); },
	loadVideoByUrl : function(url, seconds) { Player.p.loadVideoByUrl(url, seconds); },
	getVideoBytesLoaded : function() { return Player.p.getVideoBytesLoaded(); },
	getVideoBytesTotal : function() { return Player.p.getVideoBytesTotal(); },
	getVideoStartBytes : function() { return Player.p.getVideoStartBytes(); },
	getPlayerState : function() { return Player.p.getPlayerState(); },
	getCurrentTime : function() { return Player.p.getCurrentTime(); },
	getPlaybackQuality : function() { return Player.p.getPlaybackQuality(); },
	setPlaybackQuality : function(quality) { Player.p.setPlaybackQuality(quality); },
	getAvailableQualityLevels : function() { return Player.p.getAvailableQualityLevels(); },
	getDuration : function() { return Player.p.getDuration(); },
	getVideoUrl : function() { return Player.p.getVideoUrl(); },
	getVideoEmbedCode : function() { return Player.p.getVideoEmbedCode(); },
	
	//custom controls:
	skip : function(seconds) { Player.seekTo(Player.getCurrentTime() + seconds, true) },
	
	p : null
};

//callback functions:
function onPlayerReady(val) { Player.onPlayerReady(val); }
function onPlayerError(val) { Player.onPlayerError(val); }
function onPlayerStateChange(val) { Player.onPlayerStateChange(val); }
function onVideoPlaybackQualityChange(val) { Player.onVideoPlaybackQualityChange(val); }