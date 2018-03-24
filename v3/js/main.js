/*=================================
  =DIRECTORY
  =================================*/
/*
*/


/*=================================
  =Global Variables
  =================================*/
  
  /* jquery selectors cache
  ---------------------------------*/
  var $cache = new selectorCache();

  
  /* media queries
  ---------------------------------*/
  var mobile_only = window.matchMedia('(max-width: 1024px)');
  var desktop_only = window.matchMedia('(min-width: 1025px)');


  /* mobile menu
  ---------------------------------*/
  var mobileMenu_IsActive = false;


  /* desktop menu
  ---------------------------------*/
  var stickyMenu_IsActive = false;
  var desktopMenuTop = $cache('#main-menu-container').offset().top;


  /* gallery
  ---------------------------------*/ 
  var flip_IsActive = false; 
  var gallery_visibileClass = 'visible-gallery-card';
  var gallery_activeClass = '-is-flipped';



/*=================================
  =Page Init
  =================================*/
  $cache('document').ready(function(){
    initLoadingScreen();
    initMobileMainMenu();
    initDesktopMenu();
    initFilterMenu();
  })


/*=================================
  =Page Events
  =================================*/
  $cache(window).on('resize', throttle(function () {
    
    /* close mobile menus
    ---------------------------------*/
    if (desktop_only.matches) {
      toggleMobileMainMenu('close', 1);
      toggleFilterMenu('close', 1);      
    }

    /* add/remove sticky menu events
    ---------------------------------*/
    if (desktop_only.matches && !stickyMenu_IsActive) {
      stickyMenu_IsActive = true

      // add namespaced events on window
      $cache(window)
        .on('resize.stickyMenu', setDesktopMenuTop)
        .on('scroll.stickyMenu', stickyMenu); 
    }
    else if (mobile_only.matches && stickyMenu_IsActive) {
      stickyMenu_IsActive = false

      // remove namespaced events on window
      $cache(window).off('.stickyMenu');
    }
  }, 250));


  /* set the height to the window
  ---------------------------------*/
  $cache(window).on('orientationchange', function() {
    setTimeout(function() {
      var wh = window.innerHeight ? window.innerHeight : $cache(window).height();
      $cache('.vh-100').height(wh + 1);
    }, 250);   
  });



/*=================================
  =Loading Screen
  =================================*/
  /*
  REQUIRES: 
  --------------------
  1.  imagesLoaded() <- imagesloaded.pkgd.min.js
  2.  disableScrolling(bool) <- utility.js

  FUNCTIONS: 
  --------------------
  1.  initLoadingScreen(interval_time)
*/


  /* initLoadingScreen
  ---------------------------------*/
  function initLoadingScreen(interval_time) {
    interval_time = interval_time || 2500;
    
    // loading screen is hidden on IE 8 and lower
    if ($cache('#loader-wrapper').is(':visible')) {
      disableScrolling(true);
      
      var isLoaded_flag = false,
           panDown_time = 1000, 
            loader_time = 500,
             delay_time = loader_time;

      // trigger flag when images are finished loading
      $cache(window).load(function() {
        $cache('document').imagesLoaded().always( function() {
          isLoaded_flag = true;
        })  
      })

      var loading = setInterval(function() {
        if (isLoaded_flag) {
          var intro     = $cache('#intro'),
              introTop  = intro.offset().top             
              mainMenu  = $cache('#main-menu'),
              scrollPos = introTop;

          // scroll to bottom of main menu
          if ( mainMenu.is(':visible') ) {
            scrollPos = mainMenu.offset().top + mainMenu.height() - $(window).height()
          }
          
          // stop css loading animation
          $cache('body').addClass('loaded');
          
          // pan down from stars with small delay to make transition smooth
          if ($cache(window).scrollTop() < introTop) {
            // adjust delay_time
            delay_time += panDown_time

            setTimeout(function() { 
              $cache('html,body').velocity('scroll', {duration: panDown_time, offset: scrollPos});                             
            }, loader_time);
          }

          // add delay to not interfere with animations 
          setTimeout(function() {
            clearInterval(loading)
            disableScrolling(false);
            $cache('#loader-img').removeClass('loading');
          }, delay_time);
        }
        else {
          $cache('document').imagesLoaded().always( function() {
            isLoaded_flag = true;
          })
        }
      }, interval_time); //<--- setInterval()
    } //<--- if (#loader-wrapper is visible)
  } //<--- initLoadingScreen()


/*=================================
  =Mobile Main Menu
  =================================*/
/*
  REQUIRES: 
  --------------------
  1.  debounce(fn, delay)  <-- Utility.js

  FUNCTIONS: 
  --------------------
  1.  initMobileMainMenu()
  2.  toggleMobileMainMenu(action, time)
*/


/* initMobileMainMenu
   --------------------------------- */
function initMobileMainMenu() { 
  $cache('#mobile-main-menu-btn').click(function(){
    // prevent multiple clicks until animation is done
    if (mobileMenu_IsActive) {
      return;
    }

    if($cache('#mobile-main-menu-btn').hasClass('open')) {
      toggleMobileMainMenu('close');
    }
    else {
      toggleMobileMainMenu('open');
    }
  });

  $cache('#mobile-main-menu a').click(function() {
    toggleMobileMainMenu('close');
  })
}


/* toggleMobileMainMenu
   --------------------------------- */
function toggleMobileMainMenu(action, time) {
  time = time || 500
  var wh = window.innerHeight ? window.innerHeight : $cache(window).height();
  var links = $cache('#mobile-main-menu .mobile-menu-link');

  function getWindowHeight() {
    wh = window.innerHeight ? window.innerHeight : $cache(window).height();
  }

  $cache(window).on('resize', debounce(function(){
    getWindowHeight(); 
  },500));

  if (action === 'open') {
    mobileMenu_IsActive = true;
    disableScrolling(true);
        
    $cache('.vh-100').height(wh + 1);
    $cache('#mobile-main-menu-btn').addClass('open');
    $cache('#mobile-main-menu').css({'display': 'block'});

    // toggle absolute vertical centering if
    // the height of the menu is greater than the window height
    var mh = $cache('#mobile-main-menu .mobile-menu-items').height();
    if (mh >= wh) {
      $cache('#mobile-main-menu .mobile-menu-items').removeClass('absolute-vcenter')
    } else {
      $cache('#mobile-main-menu .mobile-menu-items').addClass('absolute-vcenter')
    }

    links.each(function(i) {
      // set each links y-axis at -window height
      $.Velocity.hook($(this), "translateY", -(wh)+'px')
      // set y-axis back at 0 at varying speeds
      $(this).velocity({translateY: 0}, {
        duration: time + (250*(links.length-i)), 
        easing: [ 225, 23 ],  // using spring physics --> http://julian.com/research/velocity/#easing
        complete: function() { mobileMenu_IsActive = false; }
      }) 
    })
  }
  else if(action === 'close') {
    mobileMenu_IsActive = true;
    disableScrolling(false);

    $cache('#mobile-main-menu-btn').removeClass('open');
    $cache('#mobile-main-menu')
      .velocity({translateY: -wh}, {
        duration: time,
        easing: 'swing',
        complete: function() {
          $cache('#mobile-main-menu').css({'display': 'none'});
          $.Velocity.hook($('#mobile-main-menu'), "translateY", 0+'px');
          mobileMenu_IsActive = false;
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

  /* initDesktopMenu()
  ---------------------------------*/
  function initDesktopMenu() {  
    if (desktop_only.matches) {
      stickyMenu_IsActive = true

      // set namespaced events on window
      $cache(window)
        .on('resize.stickyMenu', setDesktopMenuTop)
        .on('scroll.stickyMenu', stickyMenu);

      // wait for window to load to get accurate value
      $cache(window).load(function() {
        desktopMenuTop = $cache('#main-menu-container').offset().top;
      }) 
    }
  }


  /* setDesktopMenuTop()
  ---------------------------------*/
  function setDesktopMenuTop() {
    if ($cache('#main-menu').is(':visible')) {
      desktopMenuTop = $cache('#main-menu-container').offset().top;
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
      $cache('#main-menu')
        .removeClass('relative')
        .addClass('fixed');
    } 
    else if (scrollPos < desktopMenuTop) {
      $cache('#main-menu')
        .removeClass('fixed')
        .addClass('relative');
    }
  }


/*=================================
  =Gallery
  =================================*/
/*
  REQUIRES: 
  --------------------
  1.  debounce(fn, delay)  <-- Utility.js
  2.  initMagnificPopup(container)  <-- Utility.js

  FUNCTIONS:
  --------------------
  1.  initFilterMenu()
  2.  toggleFilterMenu(action, time)
  3.  initGalleryFiltering()
  4.  filterGalleryItem(e)
  5.  toggleGalleryIcon(e)
  6.  toggleGalleryItem()      
  7.  resetGalleryItem(time)
  8.  flipGalleryItem(e, time)
*/


  /* Filter Menu
  ---------------------------------*/
  function initFilterMenu() {
    initGalleryFiltering();

    $cache('#filter-menu').click(function(){
      if (mobile_only.matches) {
        toggleFilterMenu('open');
      }
    });

    $cache('#mobile-filter-menu-btn').click(function() {
      toggleFilterMenu('close');
    })

    $cache('#mobile-filter-menu a').click(function() {
      toggleFilterMenu('close');
    })
  } // <--- initFilterMenu()


  function toggleFilterMenu(action, time){
    time = time || 500
    var width = $cache(window).width();
    var links = $cache('#mobile-filter-menu .mobile-menu-link');

    function getWindowWidth() {
      return $cache(window).width();
    }

    $cache(window).on('resize', debounce(function(){
      width = getWindowWidth(); 
    },500));

    if (action === 'open') {
      disableScrolling(true);

      // try to get the window height minus the address bar
      var wh = window.innerHeight ? window.innerHeight : $cache(window).height();
      $cache('.vh-100').height(wh + 1);

      $.Velocity.hook($cache('#mobile-filter-menu'), "translateX", width+'px');
      $cache('#mobile-filter-menu')
        .css({'display': 'block'})
        .velocity({translateX: 0}, {duration: time});

      links.each(function(i) {
        $.Velocity.hook($(this), "translateX", width+'px');
        $(this).velocity({translateX: 0}, {
          duration: time + (200*(links.length+i)), 
          easing: [ 225, 23 ] // using spring physics --> http://julian.com/research/velocity/#easing
        })
      });

    } 
    else if (action === 'close') {
      disableScrolling(false);

      $cache('#mobile-filter-menu').velocity({translateX: width}, {
        duration: time,
        easing: 'swing',
        complete: function() {
          $cache('#mobile-filter-menu').css({'display': 'none'})
        }
      })  
    }    
  } // <--- toggleFilterMenu()


  /* Gallery Filtering
  ---------------------------------*/
  function initGalleryFiltering() {
    toggleGalleryItem();
    initMagnificPopup('.' + gallery_visibileClass);

    $cache('.js-filter').click(function() {
      filterGalleryItem(this)
      toggleGalleryIcon(this);      
      resetGalleryItem();
    })
  }


  function filterGalleryItem(e) {
    if (e.id == 'all') {
      $cache('.gallery-card')
        .velocity('fadeIn', {duration: 450})
        .addClass(gallery_visibileClass);       
    } 
    else {
      var el = $('.' + e.id).velocity('fadeIn', {duration: 450});
      $cache('.gallery-card').not(el)
        .hide()       
        .removeClass(gallery_visibileClass);

      (el).addClass(gallery_visibileClass);
    }

    initMagnificPopup('.' + gallery_visibileClass);
  }


  function toggleGalleryIcon(e) {
    var uncheckedIcon = 'fa-square-o';
    var checkedIcon = 'fa-check-square-o';
    var prevChecked = $('.' + checkedIcon);
    var currChecked = $(e).find('span');

    prevChecked
      .removeClass(checkedIcon)
      .addClass(uncheckedIcon);

    currChecked
      .removeClass(uncheckedIcon)
      .addClass(checkedIcon);
  }


  function toggleGalleryItem() {
    $cache('.gallery-card').click(function() { 
      // prevent multiple clicks until all animations are done
      if (flip_IsActive) {
        return;
      }

      var e = $(this);     
      resetGalleryItem();

      // if clicked img isn't already flipped
      if (!e.children('img').hasClass('img' + gallery_activeClass)) {    
        flipGalleryItem(e);
      }
    })
  }


  function resetGalleryItem(time) {
    time = time || 300

    $('.img' + gallery_activeClass).velocity({scale: [1,0], opacity: 1}, { 
      duration: time,
      begin: function() {flip_IsActive = true;},
      complete: function() {
        $('.img' + gallery_activeClass).removeClass('img' + gallery_activeClass)
        flip_IsActive = false;
      }
    })

    $('.div' + gallery_activeClass).velocity({scale: [0,1], opacity: 0}, {
      duration: time,
      begin: function() {flip_IsActive = true;},
      complete: function() {
        $('.div' + gallery_activeClass).removeClass('div' + gallery_activeClass)
        flip_IsActive = false;
      }
    })   
  }


  function flipGalleryItem(e, time) {
    time = time || 300 

    e.children('img').velocity({scale: [0,1], opacity: 0}, {
      duration: time,
      begin: function() {flip_IsActive = true;},
      complete: function() {
        e.children('img').addClass('img' + gallery_activeClass)
        flip_IsActive = false;
      }
    });

    e.children('div').velocity({scale: [1,0], opacity: 1}, {
      duration: time,
      begin: function() {flip_IsActive = true;},
      complete: function() {
        e.children('div').addClass('div' + gallery_activeClass)
        flip_IsActive = false;
      }
    });
  }


/*=================================
  =jQuery Enhancements
  =================================*/
/*
  1.  on
*/

  /* on
  ---------------------------------*/
  ;(function ($) {
    var on = $.fn.on, timer;
    $.fn.on = function () {
      var args = Array.apply(null, arguments);
      var last = args[args.length - 1];

      if (isNaN(last) || (last === 1 && args.pop())) return on.apply(this, args);

      var delay = args.pop();
      var fn = args.pop();

      args.push(function () {
        var self = this, params = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self, params);
        }, delay);
      });

      return on.apply(this, args);
    };
  }(this.jQuery || this.Zepto));


/*=================================
  =Utility Functions
  =================================*/
/*
  1.  selectorCache()
  2.  smoothScrolling()
  3.  disableScrolling(bool)
  4.  initMagnificPopup(container)
  5.  debounce(fn, delay)
  6.  throttle(fn, threshold, scope)
*/

  /* selectorCache
  ---------------------------------*/
  function selectorCache() {
    // https://gist.github.com/jtsternberg/14978579a9edf42ed069
    
    var elementCache = {};

    var get_from_cache = function( selector, $ctxt, reset ) {

      if ( 'boolean' === typeof $ctxt ) {
        reset = $ctxt;
        $ctxt = false;
      }
      var cacheKey = $ctxt ? $ctxt.selector + ' ' + selector : selector;

      if ( undefined === elementCache[ cacheKey ] || reset ) {
        elementCache[ cacheKey ] = $ctxt ? $ctxt.find( selector ) : jQuery( selector );
      }

      return elementCache[ cacheKey ];
    };

    get_from_cache.elementCache = elementCache;
    return get_from_cache;

  } // <-- selectorCache()


  /* smoothScrolling
  ---------------------------------*/
  $(function() {
    $cache('a[href*="#"]:not([href="#"])').click(function() {
      // default values
      var scrollOffset = 0;
      var padding = 15;
      var duration = 750;

      // change offset to account for main menu height
      if ($cache('#main-menu').is(':visible')) {
        scrollOffset = $('#main-menu').height();
      }

      // remove duration for these classes
      if ($(this).hasClass('js-scroll_no-animation')) {
        duration = 0;
      }

      // remove padding for these classes
      if ($(this).hasClass('js-scroll_no-padding')) {
        padding = 0;
      }

      // scroll to location
      if (location.pathname.replace(/^\//, ') == this.pathname.replace(/^\//, ') || location.hostname == this.hostname) {
        var target = $cache(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          target.velocity('scroll', {duration: duration, offset: -(scrollOffset + padding)})
          return false;
        }
      }
    });
  }); //<--- smoothScrolling()


  /* disableScrolling
  ---------------------------------*/
  function disableScrolling(bool) {
    if(bool) {
      $cache('html').css({'overflow':'hidden', 'height':'100%'});
      $cache('body').bind('touchmove', function(e){e.preventDefault()});  
    } else {
      $cache('html').css({'overflow':'auto', 'height':'auto'});
      $cache('body').unbind('touchmove'); 
    }
  } //<--- disableScrolling()


  /* initMagnificPopup
  ---------------------------------*/
  function initMagnificPopup(container) {
    $(container).magnificPopup({
      delegate: 'a',
      gallery: {enabled: true},
      type: 'image',
      callbacks: {
        open: function() {
          disableScrolling(true);
        },
        close: function() {
          disableScrolling(false);
        }
      }
    }); 
  } //<--- initMagnificPopup()


  /* debounce
  ---------------------------------*/
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  } //<--- debounce()


  /* throttle
  ---------------------------------*/
  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var deferTimer,
        last;
    return function () {
      var context = scope || this;

      var now = +new Date,
      args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } 
      else {
        last = now;
        fn.apply(context, args);
      }
    };
  } //<--- throttle()



