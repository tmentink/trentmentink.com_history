

/* =================================
   =DIRECTORY
   ================================= */
/*
  1.  =Page Init
  2.  =Loading Screen
  3.  =Menu
  4.  =Portfolio Section
  5.  =Magnific Popup
  6.  =jQuery Ehancements
  7.  =Utility Functions
*/


/* =================================
   =Page Init
   ================================= */

$('document').ready(function () {
  initLoadingScreen('timeout');
  initMenu();
  initPortMenu();
  initMagnificPopup('.visible-port-item');
  initMagnificVideo('#t43');
  logoFlip();
  multiKeyPress(holdDisplay, ['#t43',51, 52], 77, 84, 49, 51, 52, 57);
  holdDisplay('#t43', 51, 52);

  if ($('.desktop-only').is(':hidden')){
      var top = $('#intro').offset().top;
      $(window).scrollTop(top);
  }

});



/* =================================
   =Loading Screen
   ================================= */
/*
  1. ~initLoadingScreen
*/


/* ~initLoadingScreen
   --------------------------------- */
function initLoadingScreen(x, time) {
  time = time || 2000;
  disableScrolling(true);

  //finish loading animaition after images have loaded
  if (x === 'imagesLoaded') {
    $('document').imagesLoaded(function () {
      $('body').addClass('loaded');
    
      setTimeout(function(){
        disableScrolling(false); 
      }, 1300);
    });

  //finish loading animation after timeout
  } else if (x === 'timeout') {
    setTimeout(function () {
      $('body').addClass('loaded');
    
      setTimeout(function(){
        disableScrolling(false); 
      }, 1300);
    }, time);
  }
} //<--- initLoadingScreen()



/* =================================
   =Menu
   ================================= */
/*
  1. ~initMenu
  2. ~openMenu
  3. ~closeMenu
*/


/* ~initMenu
   --------------------------------- */
var menuIsOpen=false;

function initMenu() {
  
  $("#menu-btn").click(function(){
    toggleMenu();
  });

  $(".menu-link a").click(function() {
    closeMenu();
  })
}

function toggleMenu() {
  if(menuIsOpen) {
    closeMenu();
  }
  else {
    openMenu();
  }
}


/* ~openMenu
   --------------------------------- */
function openMenu() {
  menuIsOpen=true;

  var wh = $(window).height(),
      links = $(".menu-link");

  function getWindowHeight() {
    return $(window).height();
  }

  window.addEventListener('resize', function () {
    wh = getWindowHeight();  
  });

  $("#menu-btn").addClass("open");

  $("#menu").css({
    "display": "block",
    "transform":"translate(0,"+(-wh)+"px)"
  }).transition({y:0,duration:430});
  
  links.each(function (i) {
    $(this).css({
      "transform": "translate(0,"+(-wh)+"px)"
    }).transition({y:0,duration:430+(70*(links.length-i))});
  })
}


/* ~closeMenu
   --------------------------------- */
function closeMenu(){
  menuIsOpen=false;
  
  var wh=$(window).height();

  function getWindowHeight() {
    return $(window).height();
  }

  window.addEventListener('resize', function () {
    wh = getWindowHeight();  
  });

  $("#menu-btn").removeClass("open");

  $("#menu").transition({
    y: -wh,
    duration: 330,
    easing: "easeInQuad",
    complete: function() {
      $("#menu").css("display", "none")
    }
  })   
}



/* =================================
   =Portfolio Section
   ================================= */
/*
  1. ~initPortMenu
  2. ~portFiltering
*/


/* ~initPortMenu
   --------------------------------- */
function initPortMenu() {

  var icon      = $(".rotate"),
      menu      = $("#port-menu"),
      menuPos   = menu.offset().top,
      dropdown  = $("#dropdown-port-filter");

  function getMenuPos() {
    return menu.offset().top
  }

  $('body').resize(function() {
    menuPos = getMenuPos();
  })

  window.addEventListener('resize', function () {
    menuPos = getMenuPos();   
  });

  menu.click(function() {
    dropdown.slideToggle();
    icon.toggleClass("down");

    $('html,body').animate({
      scrollTop: menuPos
    }, 500);
  })

  //init portFiltering
  portFiltering();
}


/* ~portFiltering
   --------------------------------- */
function portFiltering() {

  $('.filter').click(function() {
    if (this.id == 'all') {
      $('.portfolio-item').fadeIn(450);
      $('.portfolio-item').addClass('visible-port-item')
      initMagnificPopup('.visible-port-item');
    } 
    else {
      var el = $('.' + this.id).fadeIn(450);
      $('.portfolio-item').not(el).hide();
      (el).addClass('visible-port-item')
      $('.portfolio-item').not(el).removeClass('visible-port-item')
      initMagnificPopup('.visible-port-item');
    }

    $("#dropdown-port-filter").slideUp();
    $('.rotate').removeClass("down");
    resetPortItem();
  })
}



/* ~portFlipping
   --------------------------------- */
function resetPortItem() {
  $(".img-is-flipped").transition({
    scale: 1,
    opacity: 1,
    duration: 333
  })
  $(".img-is-flipped").removeClass("img-is-flipped");

  $(".div-is-flipped").transition({
    scale: 0,
    opacity: 0,
    duration: 333
  })
  $(".div-is-flipped").removeClass("div-is-flipped"); 
}

function flipPortItem(e) {
  e.children("img").transition({
    scale: 0,
    opacity: 0,
    duration: 333
  });
  e.children("img").addClass("img-is-flipped");

  e.children("div").transition({
    scale: 1,
    opacity: 1,
    duration: 333
  });
  e.children("div").addClass("div-is-flipped");
}


$(".portfolio-item").click(function() { 
  var e = $(this);
  
  if (e.children("img").hasClass("img-is-flipped")) {
    resetPortItem();
  } 
  else {
    resetPortItem();
    flipPortItem(e);
  }  
})



/* =================================
   =Contact Section
   ================================= */
/*
  1. ~logoFLip
*/


/* ~logoFlip
   --------------------------------- */
function logoFlip() {
  var counter = 0
  
  $('.logo').click(function(){
    counter += 1
    if (counter % 12 == 0) {
      $('#t43').fadeIn(function(){
        setTimeout(function(){
          $('#t43').fadeOut()
        }, 4300)
      });
    }

    $(this).addClass('flip');
    $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function(e){
        $(this).removeClass('flip');
        $(this).off(e);
      });
  }); 
}



/* =================================
   =Magnific Popup
   ================================= */
/*
  1. ~initMagnificPopup
  2. ~initMagnificVideo
*/


/* ~initMagnificPopup
   --------------------------------- */
function initMagnificPopup(container, zoom){
  zoom = zoom || 'no-zoom'

  if (zoom === 'with-zoom') {
    $(container).magnificPopup({
      delegate: 'a',
      gallery: {enabled: true},
      type: 'image',
      mainClass: 'mfp-with-zoom',
      zoom: {
        enabled: true,
        duration: 500,
        easing: 'ease-in-out',
      },
      callbacks: {
        open: function() {
          disableScrolling(true);
        },
        close: function() {
          disableScrolling(false);
        }
      }
    });  
  } 
  else {
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
  }
} //<--- initMagnificPopup()


/* ~initMagnificVideo
   --------------------------------- */
function initMagnificVideo(container) {
  $(container).magnificPopup({
    delegate: 'a',
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,
    callbacks: {
      open: function() {
        var top = $('#intro').offset().top;

        $(".overlay").show();
        if ($('.intro-img').is(':visible')){
          $(".triangle-img").show();         
          $(window).scrollTop(top + 5)
        } 
        else {
          $(".mobile-triangle-img").show();
          $(window).scrollTop(top)
        } 
      },
      close: function() {
        $(".overlay").fadeOut(function(){
          setTimeout(function(){
            $(".triangle-img").fadeOut("slow");
            $(".mobile-triangle-img").fadeOut("slow");
          }, 1618)
        })
      }
    }
  });
}



/* =================================
   =jQuery Enhancements
   ================================= */
/*
  1. ~on
*/


/* ~on
   --------------------------------- */
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



/* =================================
   =Utility Functions
   ================================= */
/*
  1. ~disableScrolling
  2. ~holdDisplay
  3. ~multiKeyPress
  4. ~debounce
  5. ~smoothScrolling
*/


/* ~disableScrolling
   --------------------------------- */
function disableScrolling(bool) {
  if(bool) {
    $('html').css({
      'overflow': 'hidden',
      'height': '100%'
    });  
  } else {
    $('html').css({
      'overflow': 'auto',
      'height': 'auto'
    }); 
  }
} //<--- disableScrolling()


/* ~holdDisplay
   --------------------------------- */
function holdDisplay(obj) {
  // maxes at 6 keys pressed at once
  var keysPressed = Array.prototype.slice.call(arguments, 1);
  var down = [];
  var counter = 0
  $(window).keydown(function(e) {
    down[e.keyCode] = true;
    var allPressed = keysPressed.every(function (key) { 
      return down[key];
    });

    if (allPressed && counter < 1) {
      $(obj).show();
      counter += 1;
    }
  }).keyup(function(e) {
    down[e.keyCode] = false;
    $(obj).hide();
  })
} //<--- holdDisplay()


/* ~multiKeyPress
   --------------------------------- */
function multiKeyPress(funcName, args) {
  // maxes at 6 keys pressed at once
  var keysPressed = Array.prototype.slice.call(arguments, 2);
  var down = [];
  $(window).keydown(function(e) {
    down[e.keyCode] = true;
  }).keyup(function(e) {
    var allPressed = keysPressed.every(function (key) { 
      return down[key];
    });
    if (allPressed) {
      // alert("I am working");
      funcName.apply(this, args);
    }
    down[e.keyCode] = false;
  });
} //<--- multiKeyPress()


/* ~debounce
   --------------------------------- */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}; //<--- debounce()


/* ~smoothScrolling
   --------------------------------- */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});//<--- smoothScrolling











