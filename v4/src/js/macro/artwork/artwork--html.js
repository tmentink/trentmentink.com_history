
// ===========================================
// Artwork - HTML
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Artwork Object
    // =======================================
    if (typeof page.artwork == "undefined") {
      page.artwork = {};
    }


    // Build HTML
    // =======================================
    var buildHTML = function() { 
      var HTML = "";

      for (var i = 0, i_len = page.data.artwork.length; i < i_len; i++) {
        var artwork = page.data.artwork[i];
        
        HTML += "<div class='artwork-item";

        HTML += buildArtworkFilters(artwork);
        HTML += "' data-title='" + artwork.title + "'>";
        HTML += buildArtworkThumb(artwork);
        HTML += buildArtworkOverlay(artwork);

        HTML += "</div>";
      }

      $cache("#artwork-wrapper").html(HTML);
    }



    // Private Functions
    // ===========================================
    var buildArtworkTags = function(artwork) {
      var icon = artwork.tags.length > 1 ? page.config.artworkIcon.multi : page.config.artworkIcon.single;
  
      var HTML = "<div class='artwork-item__tags'><i class='fa " + icon + "'></i>";
      for (var i = 0, i_len = artwork.tags.length; i < i_len; i++) {
        HTML += "<span>" + artwork.tags[i].capitalize() + "</span>";
      }
      HTML += "</div>";

      return HTML;
    };

    var buildArtworkThumb = function(artwork) {
      var HTML = "<div class='artwork-item__thumb'>";
      HTML += "<img class='img' src='img/artwork/thumb/" + artwork.thumb + "'>";
      HTML += "</div>";

      return HTML;
    };

    var buildArtworkOverlay = function(artwork) {
      var HTML = "<div class='artwork-item__overlay'>";
      HTML += "<div class='artwork-item__text'>";
      HTML += "<h3 class='artwork-item__title'>" + artwork.title + "</h3>";
      HTML += "<p class='artwork-item__desc'>" + artwork.description + "</p></div>";
      HTML += buildArtworkTags(artwork);
      HTML += "</div>";

      return HTML;
    };

    var buildArtworkFilters = function(artwork) {
      var HTML = "";
      for (var i = 0, i_len = artwork.tags.length; i < i_len; i++) {
        HTML += " js--filter-" + artwork.tags[i].toLowerCase(); 
      }
      
      return HTML;
    }


    // Public Methods
    // =======================================
    page.artwork.buildHTML = buildHTML;
    

    return page;
  })(page || {});


