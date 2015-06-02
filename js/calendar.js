function setUpCalendar() {
  $('.responsive-calendar').responsiveCalendar({
    translateMonths : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthChangeAnimation : false,
    onActiveDayClick: function(events) {
      showDayEventsPopover(this, events);
    },
    events: {
      "2015-05-30": {"number": 1, "badgeClass": "badge-standard",
        "dayEvents": [{"name": "Architects", "ticketURL": ""}]
      },
      "2015-09-25": {"number": 2, "badgeClass": "badge-standard",
        "dayEvents": [{"name": "System Of A Down", "ticketURL": ""}, {"name": "Deftones", "ticketURL": ""}]
      },
      "2015-09-27": {"number": 1, "badgeClass": "badge-standard",
        "dayEvents": [{"name": "Slipknot", "ticketURL": ""}]
      }
    }
  });
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

function loadUserCalendar () {
  var requestURL, myCity, myBands = "" ;
  
  // ToDo: Replace this with User Bands
  var array = ("System Of A Down,Slipknot").split(',');
  
  for (var i = 0; i < array.length; i++) {
    myBands += "artists[]=" + array[i].split(' ').join('%20') + "&";
  }
  
  myCity = "Sao%20Paulo,Brasil"
  
  requestURL = "http://api.bandsintown.com/events/search?" + myBands + "location=" + myCity + "&format=json&app_id=getickets"
  
  $.ajax({
    url: requestURL,
    type: "GET",
    dataType: 'jsonp',
    success: function(resultData) {
        console.log(resultData);
      
      /*
        ToDo
          -Loop result to create Event Object
      */
    },
    timeout: 120000
  });
}