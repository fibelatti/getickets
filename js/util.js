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
  placeholder: 'Procure por bandas',
  width: '100%',
  ajax: {
    url: "https://api.spotify.com/v1/search",
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: params.term, // search term
        page: params.page,
        type: 'artist'
      };
    },
    processResults: function (data, page) {
      // parse the results into the format expected by Select2.
      // since we are using custom formatting functions we do not need to
      // alter the remote JSON data
      return {
        results: data.items
      };
    },
    cache: true
  },
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1
});

function formatRepo (repo) {
  if (repo.loading) return repo.text;

  var markup = '<div class="clearfix">' +
  '<div class="col-sm-1">' +
  '<img src="' + repo.owner.avatar_url + '" style="max-width: 100%" />' +
  '</div>' +
  '<div clas="col-sm-10">' +
  '<div class="clearfix">' +
  '<div class="col-sm-6">' + repo.full_name + '</div>' +
  '<div class="col-sm-3"><i class="fa fa-code-fork"></i> ' + repo.forks_count + '</div>' +
  '<div class="col-sm-2"><i class="fa fa-star"></i> ' + repo.stargazers_count + '</div>' +
  '</div>';

  if (repo.description) {
    markup += '<div>' + repo.description + '</div>';
  }

  markup += '</div></div>';

  return markup;
}

function formatRepoSelection (repo) {
  return repo.full_name || repo.text;
}