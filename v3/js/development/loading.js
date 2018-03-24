

/* =================================
   =Directory - loading.js
   ================================= */
  /*
  REQUIRES: 
  --------------------
  1.  imagesLoaded() <- imagesloaded.pkgd.min.js
  2.  disableScrolling(bool) <- utility.js


  FUNCTIONS: 
  --------------------
  1.  initLoadingScreen(interval_time)
*/

  /* initLoadingScreen
  ---------------------------------*/
  function initLoadingScreen(interval_time) {
    interval_time = interval_time || 2500;
    
    // loading screen is hidden on IE 8 and lower
    if ($('#loader-wrapper').is(':visible')) {
      disableScrolling(true);
      
      var isLoaded_flag = false,
           panDown_time = 1000, 
            loader_time = 500,
             delay_time = loader_time;

      // trigger flag when images are finished loading
      $('document').imagesLoaded().always( function() {
        isLoaded_flag = true
      });

      var x = setInterval(function() {
        if (isLoaded_flag) {
          $('body').addClass('loaded');
                   
          // pan down from stars with small delay to make transition smooth
          var intro = $("#intro").offset().top
          if ($(window).scrollTop() < intro) {
            // adjust delay_time
            delay_time += panDown_time

            setTimeout(function() {                     
              $('html,body').animate({ scrollTop: intro }, panDown_time);           
            }, loader_time);
          }

          // add delay to not interfere with animations 
          setTimeout(function() {
            clearInterval(x)
            disableScrolling(false);
            $('#loader-img').removeClass('loading');
          }, delay_time);
        }
      }, interval_time); //<--- setInterval()
    } //<--- if (#loader-wrapper is visible)
  } //<--- initLoadingScreen()







  