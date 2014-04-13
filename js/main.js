/*globals R, Main, Modernizr, rdioUtils */

(function() {

  window.Main = {
    getArtistsForLocation: function (location) {
      var self = this;
      var url = "getArtistsForLocation.php?location=" + encodeURIComponent(location);
      $.get(url, function (data) {
        var data_obj = $.parseJSON(data);
        var artists = data_obj.response.artists;
        var keys_list = new Array();
        $.each(artists, function (index, obj) {
          keys_list.push(obj.foreign_ids[0].foreign_id.replace("rdio-US:artist:", ""));
        });
        keys_list = keys_list.join();
        R.request({
          method: "get",
          content: {
            keys: keys_list
          },
          success: function (response) {
            self.getTopSongsForArtists(response);
          },
          error: function (response) {
            
          }
        });
      });
    },

    // ----------
    init: function() {
      var self = this;
      
      this.$input = $(".search input");
      this.$results = $(".results");
      this.tracks = new Array();

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
            R.ready(function() { // just in case the API isn't ready yet
              self.search(query);
            });
          }
        });
        
      if (!rdioUtils.startupChecks()) {
        return;
      }

      R.ready(function() {
        var $play = $(".header .play")
          .click(function() {
            R.player.togglePause();
          });
        
        $(".header .next")
          .click(function() {
            R.player.next();
          });
        
        $(".header .prev")
          .click(function() {
            R.player.previous();
          });
        
        R.player.on("change:playingTrack", function(track) {
          $(".header .icon").attr("src", track.get("icon"));
          $(".header .track").text(track.get("name"));
          $(".header .dash").text(" - ");
          //$(".header .album-title").text(track.get("album"));
          $(".header .artist").text(track.get("artist"));
          //$(".header .track").text("Track: " + track.get("name"));
          //$(".header .album-title").text("Album: " + track.get("album"));
          //$(".header .artist").text("Artist: " + track.get("artist"));
        });
        
        R.player.on("change:playState", function(state) {
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
        
        R.ready(function() {
          if (!R.authenticated()) {
            R.authenticate();
          }
          var userID = R.currentUser.attributes.key;
          self.getArtistsForLocation("Champaign, IL");
        });

      });
    }, 
    
    // ----------
    showResults: function(tracks) {
      var self = this;
      this.$results.empty();
      this.tracks = new Array();
      $.each(tracks, function(index, track) {
        track.appUrl = track.shortUrl.replace("http", "rdio");        
        var $el = $(self.albumTemplate(track))
          .appendTo(self.$results);
        
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
        
        $el.find(".play")
          .click(function() {
            R.player.play({source: track.key});
          });
      });
    }, 

    getTopSongsForArtists: function (data) {
      var keys_list = new Array();
      var song_loaded = new Array();
      var i = 0;
      var self = this;
      $.each(data.result, function (key, obj) {
        self.getTopSongsForArtist(key, obj, i, song_loaded);
        i++;
      });

      $.when.apply($, song_loaded).then(function () {
        console.log("fellasdad");
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
          limit: 1
        },
        success: function (response) {
          if (response.result.length == 0) {
            R.request({
              method: "search",
              content: {
                query: obj.name,
                types: "Artist"
              },
              success: function (response) {
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
            self.tracks.push(response.result[0]);
            console.log("resolved promise " + index);
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
        if (!R.authenticated()) {
          R.authenticate();
        }
        var userID = R.currentUser.attributes.key;
        self.getArtistsForLocation(query);
        //update the googlemaps background
        $('#gmaps').attr('src','http://maps.googleapis.com/maps/api/staticmap?center='+query+'&zoom=15&size=640x640&scale=2&key=AIzaSyBh71g21aCO232Jq_6_mL3Z1cftdHBcRSk');
      });
    }

  };
  
  // ----------
 $(document).ready(function() {
  // create a map in the "map" div, set the view to a given place and zoom
  var options = {
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    tap: false

  }
  var map = L.map('map', options).setView([51.505, -0.09], 15);
  L.dragging = false;

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

   Main.init();
 });
  
})();  
