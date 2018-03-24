
// ===========================================
// Menu - States
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Menu Object
    // =======================================
    if (typeof page.menu == "undefined") {
      page.menu = {};
    }


    // Mobile
    // =======================================
    var mobileState = function(menu) {
      $cache(menu).addClass("responsive-menu--hidden responsive-menu--fullscreen");
    };


    // Desktop
    // =======================================
    var desktopState = function(menu) {
      $cache(menu).removeClass("responsive-menu--hidden responsive-menu--fullscreen");
    };


    // Public Methods
    // =======================================
    page.menu.mobileState = mobileState;
    page.menu.desktopState = desktopState;


    return page;
  })(page || {});


