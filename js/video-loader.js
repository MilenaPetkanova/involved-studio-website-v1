
$(window).on('load', function(){

  var youtube = document.querySelectorAll( ".youtube" );

  console.log(youtube);

  for (var i = 0; i < youtube.length; i++) {
    console.log(youtube[i]);
    $('<iframe>').attr(
    {
      "src": "https://www.youtube.com/embed/videoseries?list=" + youtube[i].dataset.embed,
      "frameborder": "0"
    }).appendTo(youtube[i]);
  }

});