var Eletype = function( sections ) {
	var self = this;

	this.to_load = sections;

	this.sections = {
		"letters": new Base(self, "letters", ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]),
		"words": new Base(self, "words", ["fox","bird","dog","cat","hello"]),
		//"numbers": new Numbers(self)
		"answers": new Base(self, "answers", ["correct","incorrect"]),
		"instructions": new Base(self, "instructions", ["getstarted"])
	};

	this.sections_loaded = 0;

	this.playing = "";
	this.waiting_for;
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
			if( section == "letters" ) {
				self.ct = setTimeout( self.test, 500 );
				$("#textarea").css("font-size","560px");	
			} else if( section = "words" ) {
				self.ct = setTimeout( self.testWord, 500 );
				$("#textarea").css("font-size","280px");
			}
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

	// this.testWord = function() {
	// 	clearTimeout( self.ct );
	// 	if( self.waiting_for != $("#textarea").val() ) {
	// 		self.ct = setTimeout( self.testWord, 500 );
	// 	} else {
	// 		$("#textarea").val("");
	// 		self.t = setTimeout( self.playNext, 1000 );
	// 	}
	// }

	this.playNext = function() {
		clearTimeout( self.t );
	    self.waiting_for = self.playing = self.sections.letters.pick();
	    self.sections.letters.play( self.waiting_for );
	    // self.waiting_for = self.playing = self.sections.words.pick();
	    // self.sections.words.play( self.waiting_for );
	}

	self.load();
}