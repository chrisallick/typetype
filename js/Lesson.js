var Lesson = function( _p, _section, _assets ) {
    var self = this;
    var parent = _p;

    this.assets = _assets;
    this.section = _section;

    this.audio = {};
    this.loaded = 0;
    this.all_loaded = false;
    this.playing = "";

    this.load = function() {
        for( var i = 0, len = self.assets.length; i < len; i++ ) {
            var asset = self.assets[i];

            self.audio[asset] = new Audio();
            if( self.audio[asset].canPlayType("audio/mpeg") ) {
                self.audio[asset].setAttribute("src","jams/"+self.assets[i]+".mp3");
            } else if( self.audio[asset].canPlayType("audio/wav") ) {
                self.audio[asset].setAttribute("src","jams/"+self.assets[i]+".wav");
            } else if( self.audio[asset].canPlayType("audio/m4a") ) {
                self.audio[asset].setAttribute("src","jams/"+self.assets[i]+".m4a");
            } else {
                $("#about").html("Unfortunately you're browser does not support any of the available media types.");
            }
            self.audio[asset].addEventListener("canplaythrough",self.onLoadedHandler,false);
            self.audio[asset].addEventListener("ended",self.onEndedHandler,false);
        }
    }

    this.onLoadedHandler = function(event) {
        self.loaded++;
        if( self.loaded == self.assets.length ) {
            self.all_loaded = true;
            parent.onSectionLoad( self.section );
        }
    }

    this.onEndedHandler = function() {
        parent.onPlayingEnded( self.playing, self.section );
        self.playing = "";
    }

    this.play = function( asset ) {
        document.form.textarea.focus();
        self.playing = asset;
        //self.audio[asset].load(); // unclear if this is needed or not?
        self.audio[asset].play();
    }

    this.pick = function() {
        var next = Math.floor(Math.random()*self.assets.length);
        return self.assets[next];
    }
}