var Answers = function( parent ) {
	var self = this;
	var parent = parent;

	this.instructions = ["correct","incorrect"];
	this.audio = {};
	this.loaded = 0;
	this.all_loaded = false;
	this.playing = "";

	this.load = function() {
		for( var i = 0, len = self.instructions.length; i < len; i++ ) {
			var answer = self.instructions[i];

			self.audio[answer] = new Audio();
	        if( self.audio[answer].canPlayType("audio/wav") ) {
	            self.audio[answer].setAttribute("src","jams/"+self.instructions[i]+".wav");
	        } else {
	            self.audio[answer].setAttribute("src","jams/"+self.instructions[i]+".m4a");
	        }
	        self.audio[answer].addEventListener("canplaythrough",self.onLoadedHandler,false);
	        self.audio[answer].addEventListener("ended",self.onEndedHandler,false);
	        self.audio[answer].load();
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
		parent.onPlayingEnded( self.playing, "answers" );
		self.playing = "";
	}

	this.play = function( answer ) {
		self.playing = answer;
		self.audio[answer].play();
	}
}