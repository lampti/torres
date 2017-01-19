(function(){
  'use strict';

  // NAVBAR
  var navigation = $('#nav-main').okayNav({
    swipe_enabled: false // If true, you'll be able to swipe left/right to open the navigation
  });

  // BOX SEARCH
  $('#optSearch').click(function() {
    // Close left menu
    navigation.okayNav('closeInvisibleNav');
    // Add/Remove class active
    if ($('.search-box').hasClass('active')) {
      $('.search-box').removeClass('active');
    } else {
      $('.search-box').addClass('active');
    }
    return false;
  });

  $('#optSearchClose').click(function() {
    $('.search-box').removeClass('active');
    return false;
  });

  // YOUTUBE
  // Get Uploads Playlist
  $.get(
     "https://www.googleapis.com/youtube/v3/channels",{
     part : 'contentDetails',
     forUsername : 'TV3Torres',
     key: 'AIzaSyB3N05cqVI-ZzV_PjtkY2Z6m4evuz5EfsM'},
     function(data) {
        $.each( data.items, function( i, item ) {
            var id = item.contentDetails.relatedPlaylists.uploads;
            getVids(id);
        });
    }
  );

  //Get Videos
  function getVids(pid){
      $.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",{
          part : 'snippet',
          maxResults : 6,
          playlistId : pid,
          key: 'AIzaSyB3N05cqVI-ZzV_PjtkY2Z6m4evuz5EfsM'},
          function(data) {
              var results;
              $.each( data.items, function( i, item ) {
                results = '<div class="col-md-2 col-xs-12"><iframe src="http://www.youtube.com/embed/'+item.snippet.resourceId.videoId+'" frameborder="0" allowfullscreen></iframe></div>';
                $('#videosYoutube').append(results);
              });
          }
      );
  }

})();
