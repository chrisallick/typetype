var Eletype = function( sections ) {
	var self = this;

	this.to_load = sections;

	/*
		create a section object that holds all the assets required for that lesson
	*/
	this.sections = {
		"letters": new Lesson(self, "letters", ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]),
		"words": new Lesson(self, "words", ["fox","bird","dog","cat","hello"]),
		//"numbers": new Numbers(self)
		"answers": new Lesson(self, "answers", ["correct","incorrect"]),
		"instructions": new Lesson(self, "instructions", ["getstarted"])
	};

	this.sections_loaded = 0;

	this.playing = "";
	this.waiting_for;
	this.current_section;
	this.t;
	this.ct;
	this.recheck = 0;

	/*
		manually load the answers and instructions set
		load all included lessons
	*/
	self.load = function() {
		self.sections["answers"].load();
		self.sections["instructions"].load();
		for( var i = 0; i < self.to_load.length; i++ ) {
			var section = self.to_load[i];
			self.sections[section].load();
		}
	}

	/*
		when a second(lesson) is loaded check to see if all lessons
		have been loaded. If so, start.
	*/
	this.onSectionLoad = function() {
		self.sections_loaded++;
		if( self.sections_loaded == self.to_load.length ) {
			console.log("all loaded: " + self.to_load);
			this.sections.instructions.play("getstarted");
		}
	}

	/*
		when an audio clip is done, you'll need to play
		another audio clip. clear the timer and decied which to play.
	*/
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

	/*
		was the correct answer entered? if so, play the next letter/word,
		or check again, or say it was incorrect
	*/
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

	this.testWord = function() {
		clearTimeout( self.ct );
		if( self.waiting_for != $("#textarea").val() ) {
			self.ct = setTimeout( self.testWord, 500 );
		} else {
			$("#textarea").val("");
			self.sections.answers.play("correct");
		}
	}

	/*
		decide which section to play, play a random choice from that section
	*/
	this.playNext = function() {
		clearTimeout( self.t );
		self.current_section = self.pickSection();
	    self.waiting_for = self.playing = self.sections[self.current_section].pick();
	    console.log( self.current_section, self.waiting_for);
	    self.sections[self.current_section].play( self.waiting_for );
	}

	/*
		returns a random section from the list of loaded sections
	*/
	this.pickSection = function() {
        var next = Math.floor(Math.random()*self.to_load.length);
        return self.to_load[next];
	}

	self.load();
}