/*
ToDo
	-Add Cards (Collect artist.name, artist.images[imgIndex].url, artist.external_urls.spotify
*/

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
    templateResult: formatArtist, // omitted for brevity, see the source of this page
    templateSelection: formatArtistSelection // omitted for brevity, see the source of this page
  });
}

function formatArtist (artist) {
  if (artist.loading) return artist.text;
  
  //console.log(artist);

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
  //ToDo: Remove from User JSON
  
  $(event.target).closest('.bandcard-item').hide('slow', function(){ $target.remove(); });
}

function addBandCard () {
  var cardContainer = $('#mybandsinfo');
  
  var cardLayout = '<div class="col-xs-12 col-sm-6 col-md-4 bandcard-item">' +
    '<div class="card hovercard">' +
    '<div class="cardheader">' +
    '<button type="button" class="close bandcard-close-button" onclick="dismissCard()">x</button>' +
    '</div' +
    '<div class="avatar">' +
    '<img alt="' + artist.name + '" src="' + artist.images[imgIndex].url + '">' +
    '</div>' +
    '<div class="info">' +
    '<h3>' + artist.name + '</h3>' +
    '</div>' +
    '<div class="bottom">' +
    '<a type="button" class="btn btn-spotify btn-sm" href="' + artist.external_urls.spotify + '">Ouça no Spotify!</a>' +
    '</div>' +
    '</div>' +
    '</div>'
  
  cardContainer.append(cardLayout);
}