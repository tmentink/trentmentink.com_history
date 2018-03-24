
// ===========================================
// Page - Loading
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Loading Object
    // =======================================
    if (typeof page.loading == "undefined") {
      page.loading = {};
    }


    // Init Loading
    // =======================================
    var init = function() {
      page.scroll.disable();

      var timerDone = false;
      var imagesLoaded = false;

      var loading = setInterval(function(){
        if (timerDone && imagesLoaded) {
          clearInterval(loading);
          doneLoading();
        }
      }, 250);

      $cache("body").imagesLoaded().always(function(){
        imagesLoaded = true;
      });

      setTimeout(function(){
        timerDone = true;
      }, 2000);
    };


    // Done Loading
    // =======================================
    var doneLoading = function() {
      $cache("#loading-screen").addClass("loader--loaded");
      
      setTimeout(function() {
        $cache("#loading-screen").removeClass("loader--loading");
        scrollToMenu();
      }, 700);
    };

    var scrollToMenu = function() {
      var menu = $cache("#main-menu-wrapper");
      var menuBottom = menu.offset().top + menu.height();
      var scrollPos = menuBottom - $cache(window).height();
      
      $cache("html").velocity("scroll", {
        duration: 1000, 
        offset: scrollPos, 
        easing: "easeOut",
        complete: function() {
          page.scroll.enable();
        }
      }); 
    };


    // Public Methods
    // =======================================
    page.loading.init = init;


    return page;
  })(page || {});


