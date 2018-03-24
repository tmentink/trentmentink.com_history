
// ===========================================
// Projects - Animations
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Projects Object
    // =======================================
    if (typeof page.projects == "undefined") {
      page.projects = {};
    }


    // Show Overlay
    // =======================================
    var showOverlay = function(card) {
      var overlay = card.find(".card__overlay");
      var distance = card.find(".card__img").height();

      $.Velocity.hook(overlay, "translateY", distance + "px");
      overlay.velocity({translateY: 0}, {
        duration: 500,
        begin: function() {
          overlay.removeClass("card__overlay--hidden");
        }
      });
    };


    // Hide Overlay
    // =======================================
    var hideOverlay = function(overlay) {
      var card = overlay.parent(".card");
      var distance = card.find(".card__img").height();

      overlay.velocity({translateY: distance}, {
        duration: 500,
        complete: function(){
          overlay.addClass("card__overlay--hidden");
        }
      });
    };


    // Public Methods
    // =======================================
    page.projects.showCardOverlay = showOverlay;
    page.projects.hideCardOverlay = hideOverlay;


    return page;
  })(page || {});


