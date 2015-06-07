function setUpCalendar() {
  $('.responsive-calendar').responsiveCalendar({
    translateMonths : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthChangeAnimation : false,
    events: {},
    onActiveDayClick: function(events) { showDayEventsPopover(this, events);}
  });
}

function showDayEventsPopover(ref, events) {
  //$('#modalDayEvents').modal('show');
  var thisDayEvent, key;
            
  key = $(ref).data('year') + '-' + addLeadingZero($(ref).data('month')) + '-' + addLeadingZero($(ref).data('day'));

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
        str += '<div><a type="button" class="btn btn-standard btn-xs" href="' + thisDayEvent.dayEvents[i].ticketURL + '" target= "_blank">GeTickets!</a>  ' + thisDayEvent.dayEvents[i].name + '</div><br>';
      }
      
      str += '</div>';
      
      return str;
    }
  });
}

function loadUserCalendar () {
  var requestURL, key, myCity, myBands = "", events = {}, eventInfo;
  var array = sessionUserData.users[loggedUsername].bandNames;

  $('.responsive-calendar').responsiveCalendar('clearAll');
  
  for (var i = 0; i < array.length; i++) {
    myBands += "artists[]=" + array[i].split(' ').join('%20') + "&";
  }
  
  myCity = sessionUserData.users[loggedUsername].city + ",Brasil"
  
  requestURL = "http://api.bandsintown.com/events/search?" + myBands + "location=" + myCity + "&format=json&app_id=getickets";

  $.ajax({
    url: requestURL,
    type: "GET",
    dataType: 'jsonp',
    cache: true,
    success: function(resultData) {
      for (var i = 0; i < resultData.length; i++) {
        key = resultData[i].datetime.substring(0, 10);
        
        events[key] = {};
        events[key].badgeClass = "badge-standard";
        
        for (var j = 0; j < resultData[i].artists.length; j++) {
          events[key].number = events[key].number === undefined ? 1 : events[key].number + 1;
          
          if (events[key].dayEvents === undefined || events[key].dayEvents.length == 0) events[key].dayEvents = [];
          
          eventInfo = {};
          eventInfo.name = resultData[i].artists[j].name;
          eventInfo.ticketURL = resultData[i].ticket_url;

          events[key].dayEvents.push(eventInfo);
        }
      }
      
      $('.responsive-calendar').responsiveCalendar('edit', events);
    },
    timeout: 120000
  });
}