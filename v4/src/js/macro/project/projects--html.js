
// ===========================================
// Projects - HTML
// ===========================================

  var page = (function(page) {
    "use strict";

    // Projects Object
    // =======================================
    if (typeof page.projects == "undefined") {
      page.projects = {};
    }


    // Build HTML
    // =======================================
    var buildHTML = function() { 

      var HTML = "<div class='card-deck'>";

      for (var i = 0, i_len = page.data.projects.length; i < i_len; i++) {
        var project = page.data.projects[i];
        
        HTML += "<div class='card'>";

        HTML += buildProjectImage(project);
        HTML += buildProjectHeader(project);
        HTML += buildProjectFooter(project);
        HTML += buildProjectOverlay(project);

        HTML += "</div>";

        // close card deck tag after every 3rd project
        if ((i + 1) % 3 === 0) {
          HTML += "</div><div class='card-deck'>"
        }
      }

      // add empty placeholders to fill out card decks
      var numEmpty = page.data.projects.length % 3;
      if (numEmpty > 0) {
        for (var e = 0, e_len = (3 - numEmpty); e < e_len; e++) {
          HTML += "<div class='card card--empty'></div>";
        }
      }

      $cache("#project-wrapper").html(HTML);
    }


    // Private Functions
    // =======================================
    var buildProjectImage = function(project) {
      return "<img class='card__img card__img--top' src='" + project.image + "'>";
    }

    var buildProjectHeader = function(project) {
      var HTML = "<div class='card__block'>";
      HTML += "<span class='card__title'>" + project.title + "</span>";
      HTML += "<span class='card__subtitle'>" + project.category + "</span>";
      HTML += "<span class='card__icon'><i class='fa " + page.config.projectIcon + "'></i></span>";
      HTML += "</div>";

      return HTML;
    };

    var buildProjectFooter = function(project) {
      var HTML = "<div class='card__footer'>";
      for (var i = 0, i_len = project.links.length; i < i_len; i++) {
        HTML += "<a class='link card__link' href='" + project.links[i].href + "' target='_blank'>" + project.links[i].text + "</a>";
      }
      HTML += "</div>";
      
      return HTML;
    };

    var buildProjectOverlay = function(project) {
      var HTML = "<div class='card__overlay card__overlay--hidden'>";
      HTML += buildProjectHeader(project);
      HTML += buildProjectDescription(project);
      HTML += "</div>";
      
      return HTML;
    };

    var buildProjectDescription = function(project) {
      var HTML = "<div class='card__block'>";
      HTML += "<p class='card__text'>" + project.description + "</p>";
      HTML += "</div>";
      
      return HTML;
    };

    
    // Public Methods
    // =======================================
    page.projects.buildHTML = buildHTML;


    return page;
  })(page || {});

