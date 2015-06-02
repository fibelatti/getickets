$('#modal-ok').on('click', function () {
  $('#nav-username').text('Bem vindo, ' + $('#login-user').val() + '!');
});

function addLeadingZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}

function showDayEventsPopover(ref, events) {
  var thisDayEvent, key;
            
  key = $(ref).data('year')+'-'+addLeadingZero( $(ref).data('month') )+'-'+addLeadingZero( $(ref).data('day') );

  thisDayEvent = events[key];
  
  $(ref).popover({
    html : true,
    placement : 'top',
    trigger : 'click',
    container: 'body',
    title : 'Eventos do dia',
    content : function () {
      var str = '<div>';
      
      for (i = 0; i < thisDayEvent.dayEvents.length; i++) {
        str += '<div><button type="button" class="btn btn-standard btn-xs">GeTickets!</button>  ' + thisDayEvent.dayEvents[i].name + '</div><br>';
      }
      
      str += '</div>';
      
      return str;
    }
  });
}

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

function formatArtist (artist) {
  if (artist.loading) return artist.text;
  
  console.log(artist);

  var markup = '<div class="clearfix result-row">' +
  '<div class="col-sm-1">'
  
  if (artist.images[3] !== undefined) markup += '<img src="' + artist.images[3].url + '" style="width: 50px;height: 50px;" />'
    
  markup += '</div>' +
  '<div clas="col-sm-10">' +
  '<div class="clearfix">' +
  '<div class="col-sm-6">' + artist.name + '</div>'
  '</div>';

  markup += '</div></div>';

  return markup;
}

function formatArtistSelection (artist) {
  return artist.name || artist.text;
}