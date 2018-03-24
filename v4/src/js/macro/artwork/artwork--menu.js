
// ===========================================
// Artwork - Filter Menu
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Artwork Object
    // =======================================
    if (typeof page.artwork == "undefined") {
      page.artwork = {};
    }


    // Private Functions
    // =======================================
    var _buildHamburgerButton = function() {
      var HTML = "";

      HTML += "<div class='hamburger-button hamburger-button--open hamburger-button--mobile-only'>";
      
      for (var i = 0, i_len = 6; i < i_len; i++) {
        HTML += "<span class='hamburger-button__span'></span>";
      }

      HTML += "</div>";

      return HTML;
    };

    var _buildMenuItem = function(filter) {
      var data = filter.toLowerCase();
      var name = filter != "all" ? filter.capitalize() : "Show All";

      return "<span class='responsive-menu__item'><a class='responsive-menu__link' href='#artwork-menu-wrapper' data-filter='" + data + "'><i class='fa " + page.config.filterIcon.normal + "'></i>" + name + "</a></span>";
    };

    var _getFilters = function() {
      var filters = ["all"];

      for (var i = 0, i_len = page.data.artwork.length; i < i_len; i++) {
        var artwork = page.data.artwork[i];
        
        for (var j = 0, j_len = artwork.tags.length; j < j_len; j++) {
          var tag = artwork.tags[j].toLowerCase();

          if (!filters.includes(tag)) {
            filters.push(tag);
          }
        }
      }

      return filters;
    }


    // Build Menu
    // =======================================
    var buildMenu = function() { 
      var HTML = "";

      HTML += _buildHamburgerButton();
      HTML += "<div class='responsive-menu__item-wrapper'>";
      
      // build a menu item for each filter
      var filters = _getFilters();
      for (var i = 0, i_len = filters.length; i < i_len; i++) {
        HTML += _buildMenuItem(filters[i]);
      }

      // add an empty menu item if there are an odd number of filters
      if (filters.length % 2 != 0) {
        HTML += " <span class='responsive-menu__item responsive-menu__item--empty'></span>";
      }

      // close out item wrapper
      HTML += "</div>";

      $cache("#artwork-menu").html(HTML);
    }


    // Toggle Icon
    // =======================================
    var toggleIcon = function(tag) {
      tag = tag.toLowerCase();

      var normal = page.config.filterIcon.normal;
      var active = page.config.filterIcon.active;

      var selected = $cache("[data-filter='" + tag + "']", $cache("#artwork-menu"));
      var selectedIcon = $("i", selected);

      if (selectedIcon.hasClass(normal)) {
        $("." + active, $cache("#artwork-menu")).toggleClass(normal + " " + active);
        selectedIcon.toggleClass(normal + " " + active);
      }
    }


    // Public Methods
    // =======================================
    page.artwork.buildMenu = buildMenu;
    page.artwork.toggleIcon = toggleIcon;
    

    return page;
  })(page || {});


