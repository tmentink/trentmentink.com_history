

/*=================================
  =Directory - utility.js
  =================================*/
/*
  FUNCTIONS: 
  --------------------
  1.  smoothScrolling()
  2.  disableScrolling(bool)
  3.  initMagnificPopup(container)
  4.  debounce(fn, delay)
  5.  throttle(fn, threshold, scope)
*/

  /* smoothScrolling
  ---------------------------------*/
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      // default values
      var scrollOffset = 0;
      var padding = 15;
      var duration = 750;

      // change offset to account for main menu height
      if ($('#main-menu').is(':visible')) {
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

      // animate to location
      if (location.pathname.replace(/^\//, ') == this.pathname.replace(/^\//, ') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - scrollOffset - padding
          }, duration);
          return false;
        }
      }
    });
  }); //<--- smoothScrolling()


  /* disableScrolling
  ---------------------------------*/
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



