
// ===========================================
// Menu - Animations
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Menu Object
    // =======================================
    if (typeof page.menu == "undefined") {
      page.menu = {};
    }


    // Toggle Menu
    // =======================================
    var toggleMenu = function(menu, direction, time) {
      if ($cache(menu).hasClass("responsive-menu--hidden")) {
        showMenu(menu, direction, time);
      }
      else {
        hideMenu(menu, direction, time);
      }
    }


    // Show Menu
    // =======================================
    var showMenu = function(menu, direction, time) { 
      time = time || 500
      direction = direction.toLowerCase();

      var links = $cache(menu + " .responsive-menu__item");
      var transform = getTransform(direction);
      var distance = getDistance(direction);
      var animation = getAnimation(direction, 0);

      $cache(menu).removeClass("responsive-menu--hidden");

      if (direction != "up") {
        $.Velocity.hook($cache(menu), transform, distance + "px");
        $cache(menu).velocity(animation, {duration: time});
      }

      links.each(function(i) {
        var timeMult = (direction != "up") ? 175 * (links.length + i) : 275 * (links.length - i);

        $.Velocity.hook($(this), transform, distance + "px");
        $(this).velocity(animation, {
          duration: time + timeMult, 
          easing: [ 225, 23 ],
          complete: function() {
            // remove transform applied by velocity
            $(this).css("transform", "");
          }
        });
      });
    };


    // Hide Menu
    // =======================================
    var hideMenu = function(menu, direction, time) { 
      time = time || 500
      direction = direction.toLowerCase();

      var distance = getDistance(direction);
      var animation = getAnimation(direction, distance);

      $cache(menu).velocity(animation, {
        duration: time,
        easing: "swing",
        complete: function() {
          $cache(menu).addClass("responsive-menu--hidden");

          // reset menu to original position
          $.Velocity.hook($cache(menu), getTransform(direction), 0 + "px");
        }
      });
    };


    // Utility Functions
    // =======================================
    var getAnimation = function(direction, value) {
      var animation = {};
      animation[getTransform(direction)] = value;

      return animation;
    };

    var getTransform = function(direction) {
      switch(direction) {
        case "up":
        case "down":
          return "translateY";

        case "left":
        case "right":
          return "translateX";
      }
    };

    var getDistance = function(direction) {
      switch(direction) {
        case "up":
          return "-" + $cache(window).height();

        case "down":
          return $cache(window).height();

        case "left":
          return "-" + $cache(window).width();

        case "right":
          return $cache(window).width();
      }
    };


    // Public Methods
    // =======================================
    page.menu.show = showMenu;
    page.menu.hide = hideMenu;
    page.menu.toggle = toggleMenu;


    return page;
  })(page || {});


