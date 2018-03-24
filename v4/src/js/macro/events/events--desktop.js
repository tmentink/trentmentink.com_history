
// ===========================================
// Events - Desktop
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Events Object
    // =======================================
    if (typeof page.events == "undefined") {
      page.events = {};
    }


    // Desktop Events
    // =======================================
    var desktopOn = function() {
      $cache("#artwork-menu").on("click.desktop", ".responsive-menu__link", function() {
        page.scroll.smoothScroll(this, {duration: 500, padding: 0});
        return false;
      });

      $cache("#main-menu").on("click.desktop", ".responsive-menu__link", function() {
        page.scroll.smoothScroll(this, {duration: 750, padding: 15});
        return false;
      });

      page.menu.desktopState("#main-menu");
      page.menu.desktopState("#artwork-menu");

      $cache("body").imagesLoaded().always(function(){
        page.menu.startStickyMenu("#main-menu");
      });
    };

    var desktopOff = function() {
      $cache("#main-menu").off(".desktop");
      $cache("#artwork-menu").off(".desktop");

      page.menu.mobileState("#main-menu");
      page.menu.mobileState("#artwork-menu");
      page.menu.stopStickyMenu("#main-menu");
    };


    // Public Methods
    // =======================================
    page.events.desktop = {
      on: desktopOn,
      off: desktopOff
    };

    return page;
  })(page || {});

