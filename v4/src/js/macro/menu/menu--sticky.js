
// ===========================================
// Menu - Sticky
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Menu Object
    // =======================================
    if (typeof page.menu == "undefined") {
      page.menu = {};
    }


    // Start Sticky Menu
    // =======================================
    var startStickyMenu = function(menu) { 
      var menuWrapper = menu + "-wrapper";
      var menuHeight = getMenuHeight(menu);
      setMenuWrapperHeight(menuWrapper, menuHeight);

      var stickyToggle = getMenuWrapperTop(menuWrapper);
      setStickyToggle(menu, stickyToggle);

      $cache(window).on("scroll.stickyMenu-" + menu, function(){ 
        toggleStickyMenu(menu); 
      });

      $cache(window).on("resize.stickyMenu-" + menu, utility.debounce(function(){
        var stickyToggle = getMenuWrapperTop(menuWrapper);
        setStickyToggle(menu, stickyToggle);
      }));
    };


    // Stop Sticky Menu
    // =======================================
    var stopStickyMenu = function(menu) { 
      var menuWrapper = menu + "-wrapper";
      setMenuWrapperHeight(menuWrapper, 0);

      $cache(menu).removeClass("responsive-menu--sticky");
      $cache(window).off(".stickyMenu-" + menu);
    };


    // Toggle Sticky Menu
    // =======================================
    var toggleStickyMenu = function(menu) {
      var scrollPosition = $cache(window).scrollTop();
      
      if (scrollPosition > page.menu.stickyToggle[menu]) {
        $cache(menu).addClass("responsive-menu--sticky");
      }
      else {
        $cache(menu).removeClass("responsive-menu--sticky");
      }
    };


    // Utility Functions
    // =======================================
    var getMenuHeight = function(menu) {
      return $cache(menu).height();
    };

    var getMenuWrapperTop = function(menuWrapper) {
      return $cache(menuWrapper).offset().top;
    };

    var setMenuWrapperHeight = function(menuWrapper, height) {
      $cache(menuWrapper).height(height);
    };

    var setStickyToggle = function(menu, position) {
      if (typeof page.menu.stickyToggle == "undefined") {
        page.menu.stickyToggle = {};
      }

      page.menu.stickyToggle[menu] = position;
    };


    // Public Methods
    // =======================================
    page.menu.startStickyMenu = startStickyMenu;
    page.menu.stopStickyMenu = stopStickyMenu;


    return page;
  })(page || {});


