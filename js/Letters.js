var Letters = function( parent ) {
	var self = this;
	var parent = parent;

	this.letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	this.audio = {};
	this.loaded = 0;
	this.all_loaded = false;
	this.playing = "";

	this.load = function() {
		for( var i = 0, len = self.letters.length; i < len; i++ ) {
			var letter = self.letters[i];

			self.audio[letter] = new Audio();
	        if( self.audio[letter].canPlayType("audio/wav") ) {
	            self.audio[letter].setAttribute("src","jams/"+self.letters[i]+".wav");
	        } else {
	            self.audio[letter].setAttribute("src","jams/"+self.letters[i]+".m4a");
	        }
	        self.audio[letter].addEventListener("canplaythrough",self.onLoadedHandler,false);
	        self.audio[letter].addEventListener("ended",self.onEndedHandler,false);
	        self.audio[letter].load();
		}
	}

	this.onLoadedHandler = function(event) {
	    self.loaded++;
	    if( self.loaded == self.letters.length ) {
	    	self.all_loaded = true;
	    	parent.onSectionLoad();
	    }
	}

	this.onEndedHandler = function() {
		parent.onPlayingEnded( self.playing, "letters" );
		self.playing = "";
	}

	this.play = function( letter ) {
		self.playing = letter;
		self.audio[letter].play();
	}

	this.pick = function() {
		var next = Math.floor(Math.random()*self.letters.length);
		return self.letters[next];
	}
}