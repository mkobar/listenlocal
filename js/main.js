var geocoder = null;
var mapZoom = 15;

function initialize() {
  geocoder = new google.maps.Geocoder();
}

function AboutListenLocal() {
  alert("AboutListenLocal");
}

function codeAddress(address) {
  var address = address;
  console.log("address : "+address);
  geocoder.geocode( { 'address': address}, function(results, status) {
    //console.log(results[0].geometry.location.k);
    //console.log(results[0].geometry.location.A);
    //console.log(results[0].geometry.location.lat());
    //console.log(results[0].geometry.location.lng());
    //map.setView([results[0].geometry.location.k, results[0].geometry.location.A], mapZoom);
    map.setView([results[0].geometry.location.lat(), results[0].geometry.location.lng()], mapZoom);
    if (status == google.maps.GeocoderStatus.OK) {
      results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

initialize();

R.ready(function () {
  R.logger.verbosity('all');
});

// http://stackoverflow.com/a/19498477/2390856
$(function () {
  var focusedElement;
  $(document).on('focus', 'input', function () {
      if (focusedElement == this) return; //already focused, return so user can now place cursor at specific point in input.
      focusedElement = this;
      setTimeout(function () { focusedElement.select(); }, 50); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
  });
  $(document).on('blur', 'input', function() {
    focusedElement = null;
  });
});

(function() {

  window.Main = {
    getArtistsForLocation: function (location) {
      this.originalArtistIndex = new Array();
      this.tracks = new Array();
      var self = this;
      var url = "getArtistsForLocation.php?location=" + encodeURIComponent(location);
      $.get(url, function (data) {
        var data_obj = $.parseJSON(data);
        var artists = data_obj.response.artists;
        var keys_list = new Array();
        $.each(artists, function (index, obj) {
          //console.log(obj.name);
          var key = obj.foreign_ids[0].foreign_id.replace("rdio-US:artist:", "");
          self.originalArtistIndex[key] = index;
          keys_list.push(key);
        });
        keys_list = keys_list.join();
        R.request({
          method: "get",
          content: {
            keys: keys_list
          },
          success: function (response) {
            //console.log("getArtistsForLocation success");
            self.getTopSongsForArtists(response);
          },
          error: function (response) {
            console.log("getArtistsForLocation error");
          }
        });
      });
    },

    // ----------
    init: function() {
      var self = this;
      
      this.$input = $(".search input");
      this.$results = $(".results");

      var rawTemplate = $.trim($("#album-template").text());
      this.albumTemplate = _.template(rawTemplate);

      if (Modernizr.touch) {
        self.$results
          .click(function() {
            $(".album").removeClass("hover");          
          });
      } else {
        _.defer(function() {
          self.$input.focus();
        });
      }
              
      $(".search")
        .submit(function(event) {
          event.preventDefault();
          var query = self.$input.val();
          if (query) {
            codeAddress(query);
            R.ready(function() { // just in case the API isn't ready yet
              self.search(query);
            });
          }
        });
        
      if (!rdioUtils.startupChecks()) {
        return;
      }

      R.ready(function() {
        R.player.queue.on("add", self.keyAdded);
        var $play = $(".trackinfo .play")
          .click(function() {
            if (R.player.playingTrack() == null) {
              if (self.queue.length != 0) {
                self.currentTrackIndex = 0;
                R.player.play({source: self.queue[self.currentTrackIndex]});
              }
            } else { 
              R.player.togglePause();
            }
          });
        
        $(".trackinfo .next")
          .click(function() {
            // R.player.next();
            if (self.currentTrackIndex < self.queue.length - 1 && self.queue.length > 0) {
              if (self.currentTrackIndex != -1) {
                // self.previousTrackIndex = self.currentTrackIndex;
                self.currentTrackIndex++;
                R.player.play({source: self.queue[self.currentTrackIndex]});
              } else {
                R.player.play({source: self.queue[0]});
              }
            }
          });
        
        $(".trackinfo .prev")
          .click(function() {
            if (R.player.position() > 0 || self.currentTrackIndex == 0) {
              R.player.previous();
            } else {
              // self.previousTrackIndex = self.currentTrackIndex;
              self.currentTrackIndex--;
              R.player.play({source: self.queue[self.currentTrackIndex]});
            }
          });

        $(".login-button")
          .click(function() {
            if (!R.authenticated()) {
              R.authenticate(function () {
                $(".current-user").css("background-image", "url(" + R.currentUser.get("icon") + ")");
                $(".current-user-name").text("Logged in as " 
                  + R.currentUser.get("firstName") + " " 
                  + R.currentUser.get("lastName"));
              });
            } else {
              $(".current-user").css("background-image", "url(" + R.currentUser.get("icon") + ")");
              $(".current-user-name").text("Logged in as " 
                + R.currentUser.get("firstName") + " " 
                + R.currentUser.get("lastName"));
            }
            $(".login-button").css("display", "none");
            $("#poweredby").css("display", "none");
          });
        
        R.player.on("change:playingTrack", function (track) {
          $(".trackinfo .icon").attr("src", track.get("icon"));
          $(".trackinfo .track").text(track.get("name"));
          $(".trackinfo .dash").text(" - ");
          $(".trackinfo .artist").text(track.get("artist"));
          // if (self.previousTrackIndex != -1) {
            // prevEl = $(".results").find("[data-key=" + self.queue[self.previousTrackIndex] + "]");
          $(".results").find(".list-play").html('<img src="img/playart.png" style="margin: 50px;">');
          $(".results").find(".list-play").css({"opacity": "0.7"});
          $(".results").find(".list-play").hover(function (e) {
            $(e.target).css({"opacity": "1.0"});
          }, function (e) {
            $(e.target).css({"opacity": "0.7"});
          });
          el = $(".results").find("[data-key=" + track.get("key") + "]");
          $(el).find(".list-play").html("Playing");
          $(el).find(".list-play").css({"opacity": "1.0"});
          $('html,body').animate({scrollTop: el.offset().top - 100}, 'slow');
        });
        
        R.player.on("change:position", function (position) {
          if (position == R.player.playingTrack().get("duration") - 1
            && self.queue.length > self.currentTrackIndex + 1) {
              // self.previousTrackIndex = self.currentTrackIndex;
              self.currentTrackIndex++;
              R.player.play({source: self.queue[self.currentTrackIndex]});
          }
        });

        R.player.on("change:playState", function (state) {
          if (state === R.player.PLAYSTATE_PLAYING || state === R.player.PLAYSTATE_BUFFERING) {
            //$play.text("pause");
            //$play.html("<img src='./img/pause.png'>");
            $("img[src='./img/play.png']").attr('src','./img/pause.png');
          } else {
            //$play.text("play");
            //$play.html("<img src='./img/play.png'>");
            $("img[src='./img/pause.png']").attr('src','./img/play.png');
          }
        });
        if (R.authenticated()) {
          $(".login-button").css("display", "none");
          $("#poweredby").css("display", "none");

          $(".current-user").css("background-image", "url(" + R.currentUser.get("icon") + ")");
          $(".current-user-name").text("Logged in as " 
            + R.currentUser.get("firstName") + " " 
            + R.currentUser.get("lastName"));
        }

        codeAddress("Detroit, MI");
        self.getArtistsForLocation("Detroit, MI");
      });
    }, 
    
    // ----------
    showResults: function(tracks) {
      window.scrollTo(0, 0);
      var self = this;
      this.queue = new Array();
      this.currentTrackIndex = -1;
      this.previousTrackIndex = -1;
      this.$results.empty();
      var error_tracks = 0;
      $.each(tracks, function (index, track) {
        if (!track) {
          error_tracks++;
          return;
        }
        index -= error_tracks;
        
        track.appUrl = track.shortUrl.replace("http", "rdio");      
        var $el = $(self.albumTemplate(track))
          .appendTo(self.$results);

        $el.attr("data-key", track.key);
        
        var $cover = $el.find(".icon");
        if (Modernizr.touch) {  
          $cover.click(function(event) {
            event.stopPropagation();
            if (!$el.hasClass("hover")) {
              $(".album").not($el).removeClass("hover");
              $el.addClass("hover");
            }
          });
        } else {
          $cover.hover(function() {
            $el.addClass("hover");
          }, function() {
            $el.removeClass("hover");
          });
        }
        
        $el.find(".list-play")
          .click(function (e) {
            // self.previousTrackIndex = self.currentTrackIndex;
            self.currentTrackIndex = index;
            if (self.queue.length > index) {
              R.player.play({source: self.queue[self.currentTrackIndex]});
            }
          });
      });

      this.$results = $(".results");
      this.$results.children(".album").each(function (index, child) {
        //console.log($(child).find(".artist")[0].innerText);
        self.queue.push($(child).attr("data-key"));
      });
      if (this.queue.length != 0) {
        // R.player.play({source: this.queue[0].key});
      }

    }, 

    getTopSongsForArtists: function (data) {
      var keys_list = new Array();
      var song_loaded = new Array();
      var self = this;
      $.each(data.result, function (key, obj) {
        //console.log(obj.name);
        self.getTopSongsForArtist(key, obj, self.originalArtistIndex[key], song_loaded);
      });

      $.when.apply($, song_loaded).then(function () {
        self.showResults(self.tracks);
      }, function () {
        console.log("fail");
      });
    },

    getTopSongsForArtist: function (key, obj, index, song_loaded) {
      var self = this;
      song_loaded.push($.Deferred());
      R.request({
        method: "getTracksForArtist",
        content: {
          artist: key,
          count: 1
        },
        success: function (response) {
          if (response.result.length == 0) {
            R.request({
              method: "search",
              content: {
                query: obj.name,
                types: "Artist",
                limit: 1
              },
              success: function (response) {
                // song_loaded[index].resolve();
                if (response.result.results[0].key != key) {
                  self.getTopSongsForArtist(response.result.results[0].key, response.result.results[0], index, song_loaded);
                } else {
                  song_loaded[index].resolve();
                }
              },
              error: function (response) {
                
              }
            });
          } else {
            self.tracks[index] = response.result[0];
            //console.log("resolved promise " + index);
            song_loaded[index].resolve();
          }
        },
        error: function (response) {
          song_loaded[index].reject();
        }
      });
    },

    // ----------
    search: function(query) {
      var self = this;
      query = query.toLowerCase().trim();
      document.title = "music from " + query;
      R.ready(function() {
        self.getArtistsForLocation(query);
      });
    }
  };
  
  // ----------
  $(document).ready(function() {
    
    var options = {
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      tap: false

    }

    map = L.map('map', options);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Main.init();

    // $("img[src='./img/play.png']").attr('src','./img/pause.png');
  });

  
})();  
