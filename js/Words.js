var Words = function( parent ) {
	var self = this;
	var parent = parent;

	this.words = ["fox","bird","dog","cat","hello"];
	this.audio = {};
	this.loaded = 0;
	this.all_loaded = false;
	self.playing = "";

	this.load = function() {
		for( var i = 0, len = self.words.length; i < len; i++ ) {
			var word = self.words[i];

			self.audio[word] = new Audio();
	        if( self.audio[word].canPlayType("audio/wav") ) {
	            self.audio[word].setAttribute("src","jams/"+self.words[i]+".wav");
	        } else {
	            self.audio[word].setAttribute("src","jams/"+self.words[i]+".m4a");
	        }
	        self.audio[word].addEventListener("canplaythrough",self.onLoadedHandler,false);
	        self.audio[word].addEventListener("ended",self.onEndedHandler,false);
	        self.audio[word].load();
		}
	}

	this.onLoadedHandler = function(event) {
	    self.loaded++;
	    if( self.loaded == self.words.length ) {
	    	self.all_loaded = true;
	    	parent.onSectionLoad();
	    }
	}

	this.onEndedHandler = function() {
		parent.onPlayingEnded( self.playing, "words" );
		self.playing = "";
	}

	this.play = function( word ) {
		self.playing = word;
		self.audio[word].play();
	}

	this.pick = function() {
		var next = Math.floor(Math.random()*self.words.length);
		return self.words[next];
	}
}