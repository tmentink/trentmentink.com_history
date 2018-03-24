
// ===========================================
// Page - Breakpoints
// ===========================================

  !(function(page) {
    "use strict";

    $cache(document).ready(function() {
      page.breakpoints.mobile.addListener(function(e){
        if (e.matches) {
          page.events.mobile.on();
          page.events.desktop.off();
        }
      });

      page.breakpoints.desktop.addListener(function(e){
        if (e.matches) {
          page.events.mobile.off();
          page.events.desktop.on();
        }
      });
    });

  })(page);

