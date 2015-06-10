function setUpBandsSearch () {
  $(".bands-ajax").select2({
    width: '100%',
    ajax: {
      url: "https://api.spotify.com/v1/search?type=artist",
      delay: 250,
      data: function (params) {
        return {
          q: params.term
        };
      },
      processResults: function (data, page) {
        return {
          results: data.artists.items
        };
      },
      cache: true
    },
    escapeMarkup: function (markup) { return markup; },
    minimumInputLength: 2,
    templateResult: formatArtist,
    templateSelection: formatArtistSelection
  });
}

function formatArtist (artist) {
  if (artist.loading) return artist.text;

  var imgIndex = artist.images.length - 1;
  var markup = '<div class="clearfix result-row">' +
  '<div class="col-sm-1">'
  
  if (imgIndex != -1) markup += '<img src="' + artist.images[imgIndex].url + '" class="band-img-result" />'
    
  markup += '</div>' +
  '<div clas="col-sm-10">' +
  '<div class="clearfix">' +
  '<div class="col-sm-6 band-info-result">' + artist.name + '</div>'
  '</div></div></div>';

  return markup;
}

function formatArtistSelection (artist) {
  return artist.name || artist.text;
}

function dismissCard () {
  var id = $(event.target).closest('.bandcard-item').find('.band-info-spotify-id').text();
  var index = sessionUserData.users[loggedUsername].bands.indexOf(id);
  
  sessionUserData.users[loggedUsername].bands.splice(index, 1);
  sessionUserData.users[loggedUsername].bandNames.splice(index, 1);
  saveToCookie();
  
  var target = $(event.target).closest('.bandcard-item');
  
  $(target).hide('fast', function(){ $(target).remove(); });
}

function addBandCard () {
  var cardContainer = $('#mybandsinfo');
  var artist = $(".bands-ajax").find(":selected").data().data;
  var arrayMyBands = sessionUserData.users[loggedUsername].bands;
  
  if (arrayMyBands.indexOf(artist.id) == -1) {
    var imgIndex = isMobile == false ? artist.images.length - 1 : artist.images.length - 2;
  
    var cardLayout = '<div class="col-xs-12 col-sm-6 col-md-4 bandcard-item">' +
      '<div class="card hovercard">' +
      '<div class="cardheader">' +
      '<button type="button" class="close bandcard-close-button" onclick="dismissCard()">x</button>' +
      '</div>' +
      '<div class="avatar">' +
      '<img alt="' + artist.name + '" src="' + artist.images[imgIndex].url + '">' +
      '</div>' +
      '<div class="info">' +
      '<h3>' + artist.name + '</h3>' +
      '<div class="band-info-spotify-id">' + artist.id + '</div>' +
      '<div class="band-info-spotify-name">' + artist.name + '</div>' +
      '<div class="band-info-spotify-url">' + artist.external_urls.spotify + '</div>' +
      '</div>' +
      '<div class="bottom">' +
      '<a type="button" class="btn btn-spotify btn-sm" href="' + artist.external_urls.spotify + '" target="_blank">Ouça no Spotify!</a>' +
      '</div>' +
      '</div>' +
      '</div>'

    cardContainer.append(cardLayout);

    sessionUserData.users[loggedUsername].bands.push(artist.id);
    sessionUserData.users[loggedUsername].bandNames.push(artist.name);
    saveToCookie();
  }
  
  $(".bands-ajax").select2("val", "");
}

function loadUserBands () {
  var myBands = sessionUserData.users[loggedUsername].bands.join();
  var cardLayout;
  var cardContainer = $('#mybandsinfo');
  var imgIndex;
  var requestURL = "https://api.spotify.com/v1/artists/?ids=" + myBands;
  
  cardContainer.empty();
  
  if (myBands != "") {
    $.ajax({
      url: requestURL,
      type: "GET",
      dataType: 'json',
      success: function(resultData) {
        var artists = resultData.artists;

        artists.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        for (var i = 0; i < artists.length; i++) {
          //imgIndex = artists[i].images.length - 1;

          //imgIndex = artists[i].images.length >= 1 ? 0 : -1;

          imgIndex = isMobile == true ? artists[i].images.length - 1 : artists[i].images.length - 2;

          cardLayout = '<div class="col-xs-12 col-sm-6 col-md-4 bandcard-item">' +
            '<div class="card hovercard">' +
            '<div class="cardheader">' +
            '<button type="button" class="close bandcard-close-button" onclick="dismissCard()">x</button>' +
            '</div>' +
            '<div class="avatar">' +
            '<img alt="' + artists[i].name + '" src="' + artists[i].images[imgIndex].url + '">' +
            '</div>' +
            '<div class="info">' +
            '<h3>' + artists[i].name + '</h3>' +
            '<div class="band-info-spotify-id">' + artists[i].id + '</div>' +
            '<div class="band-info-spotify-name">' + artists[i].name + '</div>' +
            '<div class="band-info-spotify-url">' + artists[i].external_urls.spotify + '</div>' +
            '</div>' +
            '<div class="bottom">' +
            '<a type="button" class="btn btn-spotify btn-sm" href="' + artists[i].external_urls.spotify + '" target="_blank">Ouça no Spotify!</a>' +
            '</div>' +
            '</div>' +
            '</div>'

          cardContainer.append(cardLayout);
        }
      },
      timeout: 120000
    }); 
  }
}