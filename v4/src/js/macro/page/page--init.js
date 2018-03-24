
// ===========================================
// Page - Init
// ===========================================

  !(function(page) {
    "use strict";

    $cache(document).ready(function() {
      generalInit();

      if (page.breakpoints.mobile.matches) {
        page.events.mobile.on();
      }
      else if (page.breakpoints.desktop.matches) {
        page.events.desktop.on();
        desktopInit();
      }
    });


    // General Init
    // ========================================
    var generalInit = function() {
      page.projects.buildHTML();
      page.artwork.buildHTML();
      page.artwork.buildMenu();
      page.artwork.initMFP();
      page.artwork.toggleIcon("featured");
      page.loading.init();
      page.events.general.on();
    };


    // Mobile Init
    // ========================================
    var mobileInit = function() {
      
    };


    // Desktop Init
    // ========================================
    var desktopInit = function() {
      Waves.attach(".card__img");
      Waves.init();
    };

  })(page);

