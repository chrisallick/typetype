var Instructions = function( parent ) {
	var self = this;
	var parent = parent;

	this.instructions = ["getstarted"];
	this.audio = {};
	this.loaded = 0;
	this.all_loaded = false;
	this.playing = "";

	this.load = function() {
		for( var i = 0, len = self.instructions.length; i < len; i++ ) {
			var instruction = self.instructions[i];

			self.audio[instruction] = new Audio();
	        if( self.audio[instruction].canPlayType("audio/wav") ) {
	            self.audio[instruction].setAttribute("src","jams/"+self.instructions[i]+".wav");
	        } else {
	            self.audio[instruction].setAttribute("src","jams/"+self.instructions[i]+".m4a");
	        }
	        self.audio[instruction].addEventListener("canplaythrough",self.onLoadedHandler,false);
	        self.audio[instruction].addEventListener("ended",self.onEndedHandler,false);
	        self.audio[instruction].load();
		}
	}

	this.onLoadedHandler = function(event) {
	    self.loaded++;
	    if( self.loaded == self.instructions.length ) {
	    	self.all_loaded = true;
	    	parent.onSectionLoad();
	    }
	}

	this.onEndedHandler = function() {
		parent.onPlayingEnded( self.playing, "instructions" );
		self.playing = "";
	}

	this.play = function( instruction ) {
		self.playing = instruction;
		self.audio[instruction].play();
	}
}