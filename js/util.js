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