

/*=================================
  =Directory - menu.js
  =================================*/
/*
  1.  =Mobile Menu
  2.  =Desktop Menu
*/


/*=================================
  =Mobile Menu
  =================================*/
/*
  REQUIRES: 
  --------------------
  1.  debounce(fn, delay) <- utility.js

  FUNCTIONS: 
  --------------------
  1.  initMobileMainMenu()
  2.  toggleMobileMainMenu(action, time)
*/

/* ~initMobileMainMenu
   --------------------------------- */
function initMobileMainMenu() { 
  $("#mobile-main-menu-btn").click(function(){
    
    if($("#mobile-main-menu-btn").hasClass("open")) {
      toggleMobileMainMenu('close');
    }
    else {
      toggleMobileMainMenu('open');
    }
  });

  $("#mobile-main-menu a").click(function() {
    toggleMobileMainMenu('close');
  })
}


/* ~toggleMobileMainMenu
   --------------------------------- */
function toggleMobileMainMenu(action, time) {
  time = time || 500
  var height = $(window).height();
  var links = $("#mobile-main-menu .mobile-menu-link");

  function getWindowHeight() {
    return $(window).height();
  }

  $(window).on('resize', debounce(function(){
    height = getWindowHeight(); 
  },500));

  if (action === 'open') {
    $("#mobile-main-menu-btn").addClass("open");

    $("#mobile-main-menu").css({
      "display": "block",
      "transform":"translate(0,"+(-height)+"px)"
    }).transition({y:0,duration:time});
    
    links.each(function (i) {
      $(this).css({
        "transform": "translate(0,"+(-height)+"px)"
      }).transition({y:0,duration:time+(70*(links.length-i))});
    })
  }
  else if(action === 'close') {
    $("#mobile-main-menu-btn").removeClass("open");

    $("#mobile-main-menu").transition({
      y: -height,
      duration: time,
      easing: "easeInQuad",
      complete: function() {
        $("#mobile-main-menu").css("display", "none")
      }
    })
  } 
} // <--- toggleMobileMainMenu()



/*=================================
  =Desktop Menu
  =================================*/
/*
  FUNCTIONS: 
  --------------------
  1.  initDesktopMenu()
  2.  setDesktopMenuTop()
  3.  stickyMenu()
*/
  
  /* GLOBAL VARIABLES:
  ---------------------------------*/
  var stickyMenu_IsActive = false
  var desktopMenu = $('#main-menu');
  var desktopMenuPlaceholder = $('#main-menu-container');
  var desktopMenuTop = desktopMenuPlaceholder.offset().top;


  /* initDesktopMenu()
  ---------------------------------*/
  function initDesktopMenu() {  
    if ($('.desktop-only').is(':visible')) {
      stickyMenu_IsActive = true

      // set namespaced events on window
      $(window).on('resize.stickyMenu', setDesktopMenuTop);
      $(window).on('scroll.stickyMenu', stickyMenu); 

      // wait for window to load to get accurate value
      $(window).load(function() {
        desktopMenuTop = desktopMenuPlaceholder.offset().top;
      }) 
    }
  }

  /* setDesktopMenuTop()
  ---------------------------------*/
  function setDesktopMenuTop() {
    if (desktopMenu.is(':visible')) {
      desktopMenuTop = desktopMenuPlaceholder.offset().top;
    }
  }

  /* stickyMenu()
  ---------------------------------*/
  function stickyMenu() {
    var scrollPos;
    var html = document.documentElement;
    
    // get scroll position
    scrollPos = (window.pageYOffset || html.scrollTop) - (html.clientTop || 0);

    // toggle sticky menu
    if (scrollPos > desktopMenuTop) {
      desktopMenu.removeClass('relative');
      desktopMenu.addClass('fixed');
    } 
    else if (scrollPos < desktopMenuTop) {
      desktopMenu.removeClass('fixed');
      desktopMenu.addClass('relative');
    }
  } // <--- stickyMenu()
