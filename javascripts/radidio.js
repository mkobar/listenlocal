
// var last_index = 0;
// var args = {
//     format:'json', 
//     api_key: '6L1DANBQHJAEEF7NN',
//     location: 'Champaign, Illinois',
//     results: 100, 
//     high_relevance: false 
// }; 
// var url = "http://developer.echonest.com/api/v4/artist/";

// $.getJSON(url, args,
//     function(data) {
//         console.log(data);
//     },
//     function() {
//         error("Trouble getting news for " + artist);
//     }
// );

var songs = new Array();

function getTopSongsForArtists (data) {
  var keys_list = new Array();
  var song_loaded = new Array();
  var i = 0;
  $.each(data.result, function (key, obj) {
    getTopSongsForArtist(key, obj, i, song_loaded);
    i++;
  });

  $.when.apply($, song_loaded).then(function () {
    console.log("success");
    console.log(songs);
  }, function () {
    console.log("fail");
  });
  
}

function getTopSongsForArtist (key, obj, index, song_loaded) {
  song_loaded.push($.Deferred());
  R.request({
    method: "getTracksForArtist",
    content: {
      artist: key
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
            song_loaded[index].resolve();
            if (response.result.results[0].key != key) {
              getTopSongsForArtist(response.result.results[0].key, response.result.results[0], index, song_loaded);
            }
          },
          error: function (response) {
            
          }
        });
      } else {
        songs.push(response.result[0]);
        console.log("resolved promise " + index);
        song_loaded[index].resolve();
      }
    },
    error: function (response) {
      song_loaded[index].reject();
    }
  });
}

function getArtistsForLocation (location) {
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
      success: getTopSongsForArtists,
      error: function (response) {
        songs_loaded.reject();
      }
    });
  });
}

R.ready(function() {
  if (!R.authenticated()) {
    R.authenticate();
  }
  var userID = R.currentUser.attributes.key;
  getArtistsForLocation("Detroit");
});

// function getHistory(start) {
//   var userID = R.currentUser.attributes.key;
//   R.request({
//     method: "artist",
//     content: {
//       user: userID,
//       count: 30,
//       start: start
//     },
//     success: function(response) {
//       if (response.result.doneLoading) {
//         console.log("done loading");
//         return;
//       }
//       $.each(response.result.sources, function(index, obj) {
//         var play_date = new Date(obj.time);
//         // $("#history").append("<span><span style='font-weight:bold;'>"
//         //                         + play_date.toLocaleTimeString() + " on " 
//         //                         + play_date.toLocaleDateString() + "</span>");
//         $.each(obj.tracks, function (index, track) {
//           // $("#history").append("</br>&emsp;" + track.track.name + " - " + track.track.artist);
//           last_index++;
//         });
//         // $("#history").append("</span></br>");
//       });
//       console.log(last_index++);
//     },
//     error: function(response) {
//       console.log("error: " + response.message);
//     }
//   });
// }

// function clicked() {
//   getHistory(last_index);
// }
