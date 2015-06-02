/*
ToDo
	-Add Cards
	-Dismiss Cards
*/


function setUpBandsSearch() {
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
  
  console.log(artist);

  var markup = '<div class="clearfix result-row">' +
  '<div class="col-sm-1">'
  
  if (artist.images[3] !== undefined) markup += '<img src="' + artist.images[3].url + '" class="band-img-result" />'
    
  markup += '</div>' +
  '<div clas="col-sm-10">' +
  '<div class="clearfix">' +
  '<div class="col-sm-6 band-info-result">' + artist.name + '</div>'
  '</div>';

  markup += '</div></div>';

  return markup;
}

function formatArtistSelection (artist) {
  return artist.name || artist.text;
}