/*
ToDo
	-Integrate with Bandsintown API
*/

function setUpCalendar() {
  $('.responsive-calendar').responsiveCalendar({
    translateMonths : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthChangeAnimation : false,
    onActiveDayClick: function(events) {
      showDayEventsPopover(this, events);
    },
    events: {
      "2015-05-30": {"number": 1, "badgeClass": "badge-standard", "url": "",
        "dayEvents": [{"name": "Architects"}]
      },
      "2015-09-25": {"number": 2, "badgeClass": "badge-standard", "url": "",
        "dayEvents": [{"name": "System Of A Down"}, {"name": "Deftones"}]
      },
      "2015-09-27": {"number": 1, "badgeClass": "badge-standard", "url": "",
        "dayEvents": [{"name": "Slipknot"}]
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