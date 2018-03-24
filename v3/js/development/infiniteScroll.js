

/*=================================
  =Directory - infiniteScroll.js
  =================================*/
/*
  REQUIRES: 
  --------------------
  1.  resize() <- resize.min.js 

  FUNCTIONS: 
  --------------------
  1.  initInfiniteScroll()
*/

function initInfiniteScroll() {

  // only init on desktop (1025px wide)
  if ( $('.desktop-only').is(':visible') ) {
    var doc  = document,
        body = doc.body,
        html = doc.documentElement,
        clones = doc.getElementsByClassName('js-is-clone'),
        startElement = doc.getElementsByClassName('js-is-start')[0],
        startElementTop,
        disableScroll = false,
        docHeight,
        scrollPos,
        i;

    function getScrollPos() {
      return (window.pageYOffset || html.scrollTop) - (html.clientTop || 0);
    }
    function getDocHeight() {
      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    function getStartElementTop() {
      return $('.js-is-start').offset().top
    }

    docHeight = getDocHeight();
    startElementTop = getStartElementTop();

    window.addEventListener('resize', function () {
      startElementTop = getStartElementTop();
      scrollPos       = getScrollPos();
      docHeight       = getDocHeight();     

      if (scrollPos <= 0) {
        window.scroll(0, 1); // Scroll 1 pixel to allow upwards scrolling.
      }
    }, false);

    $('body').resize(function() {
      startElementTop = getStartElementTop();
      scrollPos       = getScrollPos();
      docHeight       = getDocHeight(); 
    })

    window.addEventListener('scroll', function () {
      if ( $('.desktop-only').is(':visible') && disableScroll === false ) {
        scrollPos = getScrollPos();

        if (scrollPos >= startElementTop) {
          // Scroll to the top when you’ve reached the bottom
          window.scroll(0, 1); // Scroll 1 pixel to allow upwards scrolling.
          disableScroll = true;
        } 
        else if (scrollPos <= 0) {
          // Scroll to the top of the clones when you reach the top.
          window.scroll(0, startElementTop);
          disableScroll = true;
        }

        if (disableScroll) {
          // Disable scroll-repositioning for a while to avoid flickering.
          window.setTimeout(function () {
            disableScroll = false;
          }, 100);
        }
      }
    }, false);

    // Needs a small delay in some browsers.
    window.setTimeout(function () {
      window.scroll(0, 1);
    });

  } //<--- if (.desktop-only is visible)
} // initInfiniteScroll()




