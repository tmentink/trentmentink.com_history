
// ===========================================
// Page - Scroll
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Scroll Object
    // =======================================
    if (typeof page.scroll == "undefined") {
      page.scroll = {};
    }


    // Smooth Srolling
    // =======================================
    var scrollTo = function(link, options) {
      if (typeof link == "string") {
        smoothScroll(link, options);
      }
      else if (link.hash) {
        smoothScroll(link.hash, options);
      }
      else {
        window.open(link.href, link.target);
      }
    };

    var smoothScroll = function(target, options) {
      var menuHeight = 0;
      if (page.breakpoints.desktop.matches) {
        menuHeight = $cache("#main-menu").height();
      }

      $cache(target).velocity("scroll", {
        duration: options.duration, 
        offset: -(menuHeight + options.padding)
      });
    };


    // Disable Scrolling
    // =======================================
    var disable = function() {
      $cache("html").css({"overflow":"hidden", "height":"100%"});
      $cache("body").bind("touchmove", function(e){e.preventDefault()});
    };


    // Enable Scrolling
    // =======================================
    var enable = function() {
      $cache("html").css({"overflow":"auto", "height":"auto"});
      $cache("body").unbind("touchmove");
    };


    // Public Methods
    // =======================================
    page.scroll.smoothScroll = scrollTo;
    page.scroll.disable = disable;
    page.scroll.enable = enable;


    return page;
  })(page || {});

