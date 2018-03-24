
// ===========================================
// Events - General
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Events Object
    // =======================================
    if (typeof page.events == "undefined") {
      page.events = {};
    }


    // General Events
    // =======================================
    var generalOn = function() {
      $cache("#artwork-menu").on("click.general", ".responsive-menu__link", function(){
        var tag = $(this).attr("data-filter");

        page.artwork.filterGallery(tag);
        page.artwork.toggleIcon(tag);
      });

      $cache("#project-wrapper").on("click.general", ".card", function() {
        page.projects.showCardOverlay($(this));
      });

      $cache("#project-wrapper").on("click.general", ".card__overlay", function(e) {
        page.projects.hideCardOverlay($(this));
        e.stopPropagation();
      });

      $cache("#project-wrapper").on("click.general", ".card__footer", function(e) {
        e.stopPropagation();
      });

      $cache("body").on("click.general", ".link", function(){
        page.scroll.smoothScroll(this, {duration: 750, padding: 15});
        return false;
      });
    };



    // Public Methods
    // =======================================
    page.events.general = {
      on: generalOn
    };

    return page;
  })(page || {});


