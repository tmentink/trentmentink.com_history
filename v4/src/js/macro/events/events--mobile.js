
// ===========================================
// Events - Mobile
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Events Object
    // =======================================
    if (typeof page.events == "undefined") {
      page.events = {};
    }


    // Mobile Events
    // =======================================
    var mobileOn = function() {
      $cache("#artwork-menu-button").on("click.mobile", function(){
        page.menu.show("#artwork-menu", "right", 500);
      });

      $cache("#artwork-menu").on("click.mobile", ".hamburger-button", function(){
        page.menu.hide("#artwork-menu", "right", 500);
      });

      $cache("#artwork-menu").on("click.mobile", ".responsive-menu__link", function() {
        page.menu.hide("#artwork-menu", "right", 500);
        page.scroll.smoothScroll(this, {duration: 0, padding: 0});
        return false;
      });


      $cache("#main-menu-button").on("click.mobile", function(){
        page.menu.toggle("#main-menu", "up", 500);
        $(this).toggleClass("hamburger-button--open");
      });

      $cache("#main-menu").on("click.mobile", ".responsive-menu__link", function() {
        page.menu.hide("#main-menu", "up", 500);
        $cache("#main-menu-button").removeClass("hamburger-button--open");
        page.scroll.smoothScroll(this, {duration: 0, padding: 15});
        return false;
      });
    };

    var mobileOff = function() {
      $cache("#artwork-menu-button").off(".mobile");
      $cache("#artwork-menu").off(".mobile");

      $cache("#main-menu-button").off(".mobile");
      $cache("#main-menu").off(".mobile");
    };


    // Public Methods
    // =======================================
    page.events.mobile = {
      on: mobileOn,
      off: mobileOff
    };

    return page;
  })(page || {});


