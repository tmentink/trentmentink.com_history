
// ===========================================
// Breakpoints
// ===========================================

  var page = (function(page) {
    "use strict";

    // Breakpoints Object
    // =======================================
    page.breakpoints = {
      mobile: window.matchMedia("(max-width: 1024px)"),
      desktop: window.matchMedia("(min-width: 1025px)")
    };


    return page;

  })(page || {});

