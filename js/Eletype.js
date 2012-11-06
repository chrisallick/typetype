var Eletype = function() {
	var self = this;

	this.to_load = new Array();
	this.textcolor = "black";

	/*
		create a section object that holds all the assets required for that lesson
	*/
	this.sections = {
		"letters": new Lesson(self, "letters", ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]),
		"words": new Lesson(self, "words", ["fox","bird","dog","cat","hello","cold","good","green","hot","red","sky","warm"]),
		//"numbers": new Numbers(self)
		"answers": new Lesson(self, "answers", ["correct","incorrect"]),
		"instructions": new Lesson(self, "instructions", ["getstarted","getstartedwords","chirp"])
	};

	this.sections_loaded = 0;
	this.effects_loaded = 0;

	this.playing = "";
	this.waiting_for;
	this.current_section;
	this.t;
	this.ct;
	this.recheck = 0;

	this.ready = false;

	/*
		manually load the answers and instructions set
		load all included lessons
	*/
	self.load = function( sections ) {
		self.to_load = sections;
		for( var i = 0; i < self.to_load.length; i++ ) {
			var section = self.to_load[i];
			self.sections[section].load();
		}
	}

	self.init = function() {
		self.sections["answers"].load();
		self.sections["instructions"].load();
	}

	/*
		when a second(lesson) is loaded check to see if all lessons
		have been loaded. If so, start.
	*/
	this.onSectionLoad = function( section ) {
		if( section == "instructions" || section == "answers" ) {
			self.effects_loaded++;
			if( self.effects_loaded == 2 ) {
				parent.onEletypeReady();
			}
		} else {
			self.sections_loaded++;
			if( self.sections_loaded == self.to_load.length ) {
				console.log("all loaded: " + self.to_load);
				if( self.to_load.length == 1 && self.to_load[0] == "words" ) {
					this.sections.instructions.play("getstartedwords");
				} else {
					this.sections.instructions.play("getstarted");
				}
				
			}
		}
	}

	/*
		when an audio clip is done, you'll need to play
		another audio clip. clear the timer and decied which to play.
	*/
	this.onPlayingEnded = function( clip, section ) {
		clearTimeout( self.t );
		if( clip == "getstarted" || clip == "getstartedwords" ) {
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
			$("#textarea").css("color","#61b004");
			var wait = setTimeout(function(){
				clearTimeout( wait );
				self.sections.answers.play("correct");
				self.recheck = 0;
				$("#textarea").val("").css("color","black");
			}, 1000 );
		} else if( $("#textarea").val() == "" ) {
			self.recheck++;
			if( self.recheck > 10 ) { 
				self.recheck = 0;
				self.sections.letters.play( self.waiting_for );
			} else {
				self.ct = setTimeout( self.test, 500 );
			}
		} else if( $("#textarea").val() != self.waiting_for ) {
			$("#textarea").css("color","#e54b16");
			var wait = setTimeout(function(){
				clearTimeout( wait );
				self.sections.answers.play("incorrect");
				self.recheck = 0;
				$("#textarea").val("").css("color","black");
			}, 1000);
		}
		
	}

	this.testWord = function() {
		clearTimeout( self.ct );
		if( self.waiting_for != $("#textarea").val() ) {
			self.recheck++;
			if( self.recheck > 16 ) {
				self.recheck = 0;
				self.sections.words.play( self.waiting_for );
			} else {
				self.ct = setTimeout( self.testWord, 500 );
			}
		} else {
			var wait = setTimeout(function(){
				clearTimeout( wait );
				$("#textarea").val("");
				self.recheck = 0;
				self.sections.answers.play("correct");
			}, 1000 );

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

	self.init();
}