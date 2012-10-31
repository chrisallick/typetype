var Lesson = function( sections ) {
	var self = this;

	this.to_load = sections;

	this.sections = {
		"letters": new Letters(self),
		//"words": new Words(self),
		//"numbers": new Numbers(self)
		"answers": new Answers(self),
		"instructions": new Instructions(self)
	};

	this.sections_loaded = 0;

	this.playing = "";
	this.waiting_for;
	//this.section_playing = "";

	this.t;
	this.ct;
	this.recheck = 0;

	self.load = function() {
		self.sections["answers"].load();
		self.sections["instructions"].load();
		for( var i = 0; i < self.to_load.length; i++ ) {
			var section = self.to_load[i];
			self.sections[section].load();
		}
	}

	this.onSectionLoad = function() {
		self.sections_loaded++;
		if( self.sections_loaded == self.to_load.length ) {
			console.log("all loaded: " + self.to_load);
			this.sections.instructions.play("getstarted");
		}
	}

	this.onPlayingEnded = function( clip, section ) {
		clearTimeout( self.t );
		if( clip == "getstarted" ) {
			self.t = setTimeout( self.playNext, 500 );
		} else if( doesInclude( self.to_load, section) ) {
			self.ct = setTimeout( self.test, 500 );
		} else if( clip == "correct" ) {
			self.t = setTimeout( self.playNext, 1000 );
		} else if( clip == "incorrect" ) {
			self.ct = setTimeout( self.test, 500 );
		}
	}

	this.test = function() {
		clearTimeout( self.ct );
		if( $("#textarea").val() == self.waiting_for ) {
			self.sections.answers.play("correct");
			self.recheck = 0;
		} else if( $("#textarea").val() == "" ) {
			self.recheck++;
			if( self.recheck > 10 ) { 
				self.recheck = 0;
				self.sections.letters.play( self.waiting_for );
			} else {
				self.ct = setTimeout( self.test, 500 );
			}
		} else if( $("#textarea").val() != self.waiting_for ) {
			self.sections.answers.play("incorrect");
			self.recheck = 0;
		}
		$("#textarea").val("");
	}

	this.playNext = function() {
		clearTimeout( self.t );
	    self.waiting_for = self.playing = self.sections.letters.pick();
	    self.sections.letters.play( self.waiting_for );
	}

	self.load();
}