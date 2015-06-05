function loadUserDiscover () {
  // ToDo: Get user bands from JSON
  var myBands = "53RsXctnNmj9oKXvcbvzI2,3ZztVuWxHzNpl0THurTFCv,74XFHRwlV6OrjEM0A2NCMF";
  var myBandsNames = "Alexisonfire,Architects,Paramore";
  
  var cardLayout;
  var cardContainer = $('#dicoverinfo');
  var imgIndex;
  var randIndex, randIndex2;
  var requestURLRelatedArtists;
  
  var arrayMyBands = myBands.split(',');
  var arrayMyBandsNames = myBandsNames.split(',');
  var arrayBaseArtists = [];
  var arrayRelatedArtists = [];
  
  var countDisplayed = 0;

  // Discover only related bands from 3 artists per refresh
  while (countDisplayed < 3) {
    randIndex = parseInt(Math.random() * arrayMyBands.length, 10);
    if (arrayBaseArtists.indexOf(arrayMyBands[randIndex]) == -1) {
      arrayBaseArtists.push(arrayMyBands[randIndex]);
      countDisplayed++;
      
      requestURLRelatedArtists = "https://api.spotify.com/v1/artists/" + arrayMyBands[randIndex] + "/related-artists"
      
      var rowLayout = '<div class="discover-row row"><hr/>' +
        '<h4>Porque você gosta de ' + arrayMyBandsNames[randIndex] +
        '<div class="dicover-row-cards">';
      
      $.ajax({
        url: requestURLRelatedArtists,
        type: "GET",
        dataType: 'json',
        rowLayout: rowLayout,
        success: function(resultData) {        
          var artists = resultData.artists;
          var countRelated = 0;
          var imgIndex;
          
          while (countRelated < 3) {
            randIndex2 = parseInt(Math.random() * artists.length, 10);
            
            if (arrayRelatedArtists.indexOf(artists[randIndex2].id) == -1 && arrayMyBands.indexOf(artists[randIndex2].id) == -1) {
              arrayRelatedArtists.push(artists[randIndex2].id);
              countRelated++;
              
              imgIndex = artists[randIndex2].images.length >= 1 ? 0 : -1;
              
              var cardLayout = '<div class="col-xs-12 col-sm-12 col-md-4 bandcard-item">' +
                '<div class="card hovercard">' +
                '<div class="cardheader">' +
                '</div>' +
                '<div class="avatar">' +
                '<img alt="' + artists[randIndex2].name + '" src="' + artists[randIndex2].images[imgIndex].url + '">' +
                '</div>' +
                '<div class="info">' +
                '<h3>' + artists[randIndex2].name + '</h3>' +
                '<div class="band-info-spotify-id">' + artists[randIndex2].id + '</div>' +
                '<div class="band-info-spotify-url">' + artists[randIndex2].external_urls.spotify + '</div>' +
                '</div>' +
                '<div class="bottom">' +
                '<button type="button" class="btn btn-standard btn-sm">Adicionar!</button>' + //ToDo: onclick
                '</div>' +
                '</div>' +
                '</div>';
              
              this.rowLayout += cardLayout;
            }
          }
          
          this.rowLayout += '</div></div>';
          
          cardContainer.append(this.rowLayout);
        },
        timeout: 120000
      });
    }
  }
}

function refreshUserDiscover () {
  $('#dicoverinfo').empty();
  loadUserDiscover();
}