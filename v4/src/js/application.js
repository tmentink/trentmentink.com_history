/*!--------------------------------------------------------------------
JAVASCRIPT "Outdated Browser"
Version:    1.1.2 - 2015
author:     Burocratik
website:    http://www.burocratik.com
* @preserve
-----------------------------------------------------------------------*/
var outdatedBrowser = function(options) {

    //Variable definition (before ajax)
    var outdated = document.getElementById("outdated");

    // Default settings
    this.defaultOpts = {
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'transform',
        languagePath: '../outdatedbrowser/lang/en.html'
    }

    if (options) {
        //assign css3 property to IE browser version
        if (options.lowerThan == 'IE8' || options.lowerThan == 'borderSpacing') {
            options.lowerThan = 'borderSpacing';
        } else if (options.lowerThan == 'IE9' || options.lowerThan == 'boxShadow') {
            options.lowerThan = 'boxShadow';
        } else if (options.lowerThan == 'IE10' || options.lowerThan == 'transform' || options.lowerThan == '' || typeof options.lowerThan === "undefined") {
            options.lowerThan = 'transform';
        } else if (options.lowerThan == 'IE11' || options.lowerThan == 'borderImage') {
            options.lowerThan = 'borderImage';
        }
        //all properties
        this.defaultOpts.bgColor = options.bgColor;
        this.defaultOpts.color = options.color;
        this.defaultOpts.lowerThan = options.lowerThan;
        this.defaultOpts.languagePath = options.languagePath;

        bkgColor = this.defaultOpts.bgColor;
        txtColor = this.defaultOpts.color;
        cssProp = this.defaultOpts.lowerThan;
        languagePath = this.defaultOpts.languagePath;
    } else {
        bkgColor = this.defaultOpts.bgColor;
        txtColor = this.defaultOpts.color;
        cssProp = this.defaultOpts.lowerThan;
        languagePath = this.defaultOpts.languagePath;
    } //end if options


    //Define opacity and fadeIn/fadeOut functions
    var done = true;

    function function_opacity(opacity_value) {
        outdated.style.opacity = opacity_value / 100;
        outdated.style.filter = 'alpha(opacity=' + opacity_value + ')';
    }

    // function function_fade_out(opacity_value) {
    //     function_opacity(opacity_value);
    //     if (opacity_value == 1) {
    //         outdated.style.display = 'none';
    //         done = true;
    //     }
    // }

    function function_fade_in(opacity_value) {
        function_opacity(opacity_value);
        if (opacity_value == 1) {
            outdated.style.display = 'block';
        }
        if (opacity_value == 100) {
            done = true;
        }
    }

    //check if element has a particular class
    // function hasClass(element, cls) {
    //     return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    // }

    var supports = ( function() {
        var div = document.createElement('div');
        var vendors = 'Khtml Ms O Moz Webkit'.split(' ');
        var len = vendors.length;

        return function(prop) {
            if (prop in div.style) return true;

            prop = prop.replace(/^[a-z]/, function(val) {
                return val.toUpperCase();
            });

            while (len--) {
                if (vendors[len] + prop in div.style) {
                    return true;
                }
            }
            return false;
        };
    } )();

    //if browser does not supports css3 property (transform=default), if does > exit all this
    if (!supports('' + cssProp + '')) {
        if (done && outdated.style.opacity !== '1') {
            done = false;
            for (var i = 1; i <= 100; i++) {
                setTimeout(( function(x) {
                    return function() {
                        function_fade_in(x);
                    };
                } )(i), i * 8);
            }
        }
    } else {
        return;
    } //end if

    //Check AJAX Options: if languagePath == '' > use no Ajax way, html is needed inside <div id="outdated">
    if (languagePath === ' ' || languagePath.length == 0) {
        startStylesAndEvents();
    } else {
        grabFile(languagePath);
    }

    //events and colors
    function startStylesAndEvents() {
        var btnClose = document.getElementById("btnCloseUpdateBrowser");
        var btnUpdate = document.getElementById("btnUpdateBrowser");

        //check settings attributes
        outdated.style.backgroundColor = bkgColor;
        //way too hard to put !important on IE6
        outdated.style.color = txtColor;
        outdated.children[0].style.color = txtColor;
        outdated.children[1].style.color = txtColor;

        //check settings attributes
        btnUpdate.style.color = txtColor;
        // btnUpdate.style.borderColor = txtColor;
        if (btnUpdate.style.borderColor) {
            btnUpdate.style.borderColor = txtColor;
        }
        btnClose.style.color = txtColor;

        //close button
        btnClose.onmousedown = function() {
            outdated.style.display = 'none';
            return false;
        };

        //Override the update button color to match the background color
        btnUpdate.onmouseover = function() {
            this.style.color = bkgColor;
            this.style.backgroundColor = txtColor;
        };
        btnUpdate.onmouseout = function() {
            this.style.color = txtColor;
            this.style.backgroundColor = bkgColor;
        };
    } //end styles and events


    // IF AJAX with request ERROR > insert english default
    var ajaxEnglishDefault = '<h6>Your browser is out-of-date!</h6>'
        + '<p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>'
        + '<p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>';


    //** AJAX FUNCTIONS - Bulletproof Ajax by Jeremy Keith **
    function getHTTPObject() {
        var xhr = false;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch ( e ) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch ( e ) {
                    xhr = false;
                }
            }
        }
        return xhr;
    }//end function

    function grabFile(file) {
        var request = getHTTPObject();
        if (request) {
            request.onreadystatechange = function() {
                displayResponse(request);
            };
            request.open("GET", file, true);
            request.send(null);
        }
        return false;
    } //end grabFile

    function displayResponse(request) {
        var insertContentHere = document.getElementById("outdated");
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 304) {
                insertContentHere.innerHTML = request.responseText;
            } else {
                insertContentHere.innerHTML = ajaxEnglishDefault;
            }
            startStylesAndEvents();
        }
        return false;
    }//end displayResponse

////////END of outdatedBrowser function
};

//event listener: DOM ready
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
//call plugin function after DOM ready
addLoadEvent(function(){
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'transform',
        languagePath: ''
    })
});


/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

/*!
 * imagesLoaded v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  if ( typeof elem == 'string' ) {
    elem = document.querySelectorAll( elem );
  }

  this.elements = makeArray( elem );
  this.options = extend( {}, this.options );

  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( function() {
    this.check();
  }.bind( this ));
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  return this.img.complete && this.img.naturalWidth !== undefined;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) { 
if (typeof define === 'function' && define.amd) { 
 // AMD. Register as an anonymous module. 
 define(['jquery'], factory); 
 } else if (typeof exports === 'object') { 
 // Node/CommonJS 
 factory(require('jquery')); 
 } else { 
 // Browser globals 
 factory(window.jQuery || window.Zepto); 
 } 
 }(function($) { 

/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
  BEFORE_CLOSE_EVENT = 'BeforeClose',
  AFTER_CLOSE_EVENT = 'AfterClose',
  BEFORE_APPEND_EVENT = 'BeforeAppend',
  MARKUP_PARSE_EVENT = 'MarkupParse',
  OPEN_EVENT = 'Open',
  CHANGE_EVENT = 'Change',
  NS = 'mfp',
  EVENT_NS = '.' + NS,
  READY_CLASS = 'mfp-ready',
  REMOVING_CLASS = 'mfp-removing',
  PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars 
 */
/*jshint -W079 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
  MagnificPopup = function(){},
  _isJQ = !!(window.jQuery),
  _prevStatus,
  _window = $(window),
  _document,
  _prevContentType,
  _wrapClasses,
  _currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
    mfp.ev.on(NS + name + EVENT_NS, f);
  },
  _getEl = function(className, appendTo, html, raw) {
    var el = document.createElement('div');
    el.className = 'mfp-'+className;
    if(html) {
      el.innerHTML = html;
    }
    if(!raw) {
      el = $(el);
      if(appendTo) {
        el.appendTo(appendTo);
      }
    } else if(appendTo) {
      appendTo.appendChild(el);
    }
    return el;
  },
  _mfpTrigger = function(e, data) {
    mfp.ev.triggerHandler(NS + e, data);

    if(mfp.st.callbacks) {
      // converts "mfpEventName" to "eventName" callback and triggers it if it's present
      e = e.charAt(0).toLowerCase() + e.slice(1);
      if(mfp.st.callbacks[e]) {
        mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
      }
    }
  },
  _getCloseBtn = function(type) {
    if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
      mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
      _currPopupType = type;
    }
    return mfp.currTemplate.closeBtn;
  },
  // Initialize Magnific Popup only when called at least once
  _checkInstance = function() {
    if(!$.magnificPopup.instance) {
      /*jshint -W020 */
      mfp = new MagnificPopup();
      mfp.init();
      $.magnificPopup.instance = mfp;
    }
  },
  // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
  supportsTransitions = function() {
    var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
      v = ['ms','O','Moz','Webkit']; // 'v' for vendor

    if( s['transition'] !== undefined ) {
      return true; 
    }
      
    while( v.length ) {
      if( v.pop() + 'Transition' in s ) {
        return true;
      }
    }
        
    return false;
  };



/**
 * Public functions
 */
MagnificPopup.prototype = {

  constructor: MagnificPopup,

  /**
   * Initializes Magnific Popup plugin. 
   * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
   */
  init: function() {
    var appVersion = navigator.appVersion;
    mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
    mfp.isAndroid = (/android/gi).test(appVersion);
    mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
    mfp.supportsTransition = supportsTransitions();

    // We disable fixed positioned lightbox on devices that don't handle it nicely.
    // If you know a better way of detecting this - let me know.
    mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
    _document = $(document);

    mfp.popupsCache = {};
  },

  /**
   * Opens popup
   * @param  data [description]
   */
  open: function(data) {

    var i;

    if(data.isObj === false) { 
      // convert jQuery collection to array to avoid conflicts later
      mfp.items = data.items.toArray();

      mfp.index = 0;
      var items = data.items,
        item;
      for(i = 0; i < items.length; i++) {
        item = items[i];
        if(item.parsed) {
          item = item.el[0];
        }
        if(item === data.el[0]) {
          mfp.index = i;
          break;
        }
      }
    } else {
      mfp.items = $.isArray(data.items) ? data.items : [data.items];
      mfp.index = data.index || 0;
    }

    // if popup is already opened - we just update the content
    if(mfp.isOpen) {
      mfp.updateItemHTML();
      return;
    }
    
    mfp.types = []; 
    _wrapClasses = '';
    if(data.mainEl && data.mainEl.length) {
      mfp.ev = data.mainEl.eq(0);
    } else {
      mfp.ev = _document;
    }

    if(data.key) {
      if(!mfp.popupsCache[data.key]) {
        mfp.popupsCache[data.key] = {};
      }
      mfp.currTemplate = mfp.popupsCache[data.key];
    } else {
      mfp.currTemplate = {};
    }



    mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
    mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

    if(mfp.st.modal) {
      mfp.st.closeOnContentClick = false;
      mfp.st.closeOnBgClick = false;
      mfp.st.showCloseBtn = false;
      mfp.st.enableEscapeKey = false;
    }
    

    // Building markup
    // main containers are created only once
    if(!mfp.bgOverlay) {

      // Dark overlay
      mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
        mfp.close();
      });

      mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
        if(mfp._checkIfClose(e.target)) {
          mfp.close();
        }
      });

      mfp.container = _getEl('container', mfp.wrap);
    }

    mfp.contentContainer = _getEl('content');
    if(mfp.st.preloader) {
      mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
    }


    // Initializing modules
    var modules = $.magnificPopup.modules;
    for(i = 0; i < modules.length; i++) {
      var n = modules[i];
      n = n.charAt(0).toUpperCase() + n.slice(1);
      mfp['init'+n].call(mfp);
    }
    _mfpTrigger('BeforeOpen');


    if(mfp.st.showCloseBtn) {
      // Close button
      if(!mfp.st.closeBtnInside) {
        mfp.wrap.append( _getCloseBtn() );
      } else {
        _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
          values.close_replaceWith = _getCloseBtn(item.type);
        });
        _wrapClasses += ' mfp-close-btn-in';
      }
    }

    if(mfp.st.alignTop) {
      _wrapClasses += ' mfp-align-top';
    }

  

    if(mfp.fixedContentPos) {
      mfp.wrap.css({
        overflow: mfp.st.overflowY,
        overflowX: 'hidden',
        overflowY: mfp.st.overflowY
      });
    } else {
      mfp.wrap.css({ 
        top: _window.scrollTop(),
        position: 'absolute'
      });
    }
    if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
      mfp.bgOverlay.css({
        height: _document.height(),
        position: 'absolute'
      });
    }

    

    if(mfp.st.enableEscapeKey) {
      // Close on ESC key
      _document.on('keyup' + EVENT_NS, function(e) {
        if(e.keyCode === 27) {
          mfp.close();
        }
      });
    }

    _window.on('resize' + EVENT_NS, function() {
      mfp.updateSize();
    });


    if(!mfp.st.closeOnContentClick) {
      _wrapClasses += ' mfp-auto-cursor';
    }
    
    if(_wrapClasses)
      mfp.wrap.addClass(_wrapClasses);


    // this triggers recalculation of layout, so we get it once to not to trigger twice
    var windowHeight = mfp.wH = _window.height();

    
    var windowStyles = {};

    if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

    if(mfp.fixedContentPos) {
      if(!mfp.isIE7) {
        windowStyles.overflow = 'hidden';
      } else {
        // ie7 double-scroll bug
        $('body, html').css('overflow', 'hidden');
      }
    }

    
    
    var classesToadd = mfp.st.mainClass;
    if(mfp.isIE7) {
      classesToadd += ' mfp-ie7';
    }
    if(classesToadd) {
      mfp._addClassToMFP( classesToadd );
    }

    // add content
    mfp.updateItemHTML();

    _mfpTrigger('BuildControls');

    // remove scrollbar, add margin e.t.c
    $('html').css(windowStyles);
    
    // add everything to DOM
    mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

    // Save last focused element
    mfp._lastFocusedEl = document.activeElement;
    
    // Wait for next cycle to allow CSS transition
    setTimeout(function() {
      
      if(mfp.content) {
        mfp._addClassToMFP(READY_CLASS);
        mfp._setFocus();
      } else {
        // if content is not defined (not loaded e.t.c) we add class only for BG
        mfp.bgOverlay.addClass(READY_CLASS);
      }
      
      // Trap the focus in popup
      _document.on('focusin' + EVENT_NS, mfp._onFocusIn);

    }, 16);

    mfp.isOpen = true;
    mfp.updateSize(windowHeight);
    _mfpTrigger(OPEN_EVENT);

    return data;
  },

  /**
   * Closes the popup
   */
  close: function() {
    if(!mfp.isOpen) return;
    _mfpTrigger(BEFORE_CLOSE_EVENT);

    mfp.isOpen = false;
    // for CSS3 animation
    if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
      mfp._addClassToMFP(REMOVING_CLASS);
      setTimeout(function() {
        mfp._close();
      }, mfp.st.removalDelay);
    } else {
      mfp._close();
    }
  },

  /**
   * Helper for close() function
   */
  _close: function() {
    _mfpTrigger(CLOSE_EVENT);

    var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

    mfp.bgOverlay.detach();
    mfp.wrap.detach();
    mfp.container.empty();

    if(mfp.st.mainClass) {
      classesToRemove += mfp.st.mainClass + ' ';
    }

    mfp._removeClassFromMFP(classesToRemove);

    if(mfp.fixedContentPos) {
      var windowStyles = {marginRight: ''};
      if(mfp.isIE7) {
        $('body, html').css('overflow', '');
      } else {
        windowStyles.overflow = '';
      }
      $('html').css(windowStyles);
    }
    
    _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
    mfp.ev.off(EVENT_NS);

    // clean up DOM elements that aren't removed
    mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
    mfp.bgOverlay.attr('class', 'mfp-bg');
    mfp.container.attr('class', 'mfp-container');

    // remove close button from target element
    if(mfp.st.showCloseBtn &&
    (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
      if(mfp.currTemplate.closeBtn)
        mfp.currTemplate.closeBtn.detach();
    }


    if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
      $(mfp._lastFocusedEl).focus(); // put tab focus back
    }
    mfp.currItem = null;  
    mfp.content = null;
    mfp.currTemplate = null;
    mfp.prevHeight = 0;

    _mfpTrigger(AFTER_CLOSE_EVENT);
  },
  
  updateSize: function(winHeight) {

    if(mfp.isIOS) {
      // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
      var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
      var height = window.innerHeight * zoomLevel;
      mfp.wrap.css('height', height);
      mfp.wH = height;
    } else {
      mfp.wH = winHeight || _window.height();
    }
    // Fixes #84: popup incorrectly positioned with position:relative on body
    if(!mfp.fixedContentPos) {
      mfp.wrap.css('height', mfp.wH);
    }

    _mfpTrigger('Resize');

  },

  /**
   * Set content of popup based on current index
   */
  updateItemHTML: function() {
    var item = mfp.items[mfp.index];

    // Detach and perform modifications
    mfp.contentContainer.detach();

    if(mfp.content)
      mfp.content.detach();

    if(!item.parsed) {
      item = mfp.parseEl( mfp.index );
    }

    var type = item.type;

    _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
    // BeforeChange event works like so:
    // _mfpOn('BeforeChange', function(e, prevType, newType) { });

    mfp.currItem = item;

    if(!mfp.currTemplate[type]) {
      var markup = mfp.st[type] ? mfp.st[type].markup : false;

      // allows to modify markup
      _mfpTrigger('FirstMarkupParse', markup);

      if(markup) {
        mfp.currTemplate[type] = $(markup);
      } else {
        // if there is no markup found we just define that template is parsed
        mfp.currTemplate[type] = true;
      }
    }

    if(_prevContentType && _prevContentType !== item.type) {
      mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
    }

    var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
    mfp.appendContent(newContent, type);

    item.preloaded = true;

    _mfpTrigger(CHANGE_EVENT, item);
    _prevContentType = item.type;

    // Append container back after its content changed
    mfp.container.prepend(mfp.contentContainer);

    _mfpTrigger('AfterChange');
  },


  /**
   * Set HTML content of popup
   */
  appendContent: function(newContent, type) {
    mfp.content = newContent;

    if(newContent) {
      if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
        mfp.currTemplate[type] === true) {
        // if there is no markup, we just append close button element inside
        if(!mfp.content.find('.mfp-close').length) {
          mfp.content.append(_getCloseBtn());
        }
      } else {
        mfp.content = newContent;
      }
    } else {
      mfp.content = '';
    }

    _mfpTrigger(BEFORE_APPEND_EVENT);
    mfp.container.addClass('mfp-'+type+'-holder');

    mfp.contentContainer.append(mfp.content);
  },


  /**
   * Creates Magnific Popup data object based on given data
   * @param  {int} index Index of item to parse
   */
  parseEl: function(index) {
    var item = mfp.items[index],
      type;

    if(item.tagName) {
      item = { el: $(item) };
    } else {
      type = item.type;
      item = { data: item, src: item.src };
    }

    if(item.el) {
      var types = mfp.types;

      // check for 'mfp-TYPE' class
      for(var i = 0; i < types.length; i++) {
        if( item.el.hasClass('mfp-'+types[i]) ) {
          type = types[i];
          break;
        }
      }

      item.src = item.el.attr('data-mfp-src');
      if(!item.src) {
        item.src = item.el.attr('href');
      }
    }

    item.type = type || mfp.st.type || 'inline';
    item.index = index;
    item.parsed = true;
    mfp.items[index] = item;
    _mfpTrigger('ElementParse', item);

    return mfp.items[index];
  },


  /**
   * Initializes single popup or a group of popups
   */
  addGroup: function(el, options) {
    var eHandler = function(e) {
      e.mfpEl = this;
      mfp._openClick(e, el, options);
    };

    if(!options) {
      options = {};
    }

    var eName = 'click.magnificPopup';
    options.mainEl = el;

    if(options.items) {
      options.isObj = true;
      el.off(eName).on(eName, eHandler);
    } else {
      options.isObj = false;
      if(options.delegate) {
        el.off(eName).on(eName, options.delegate , eHandler);
      } else {
        options.items = el;
        el.off(eName).on(eName, eHandler);
      }
    }
  },
  _openClick: function(e, el, options) {
    var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


    if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
      return;
    }

    var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

    if(disableOn) {
      if($.isFunction(disableOn)) {
        if( !disableOn.call(mfp) ) {
          return true;
        }
      } else { // else it's number
        if( _window.width() < disableOn ) {
          return true;
        }
      }
    }

    if(e.type) {
      e.preventDefault();

      // This will prevent popup from closing if element is inside and popup is already opened
      if(mfp.isOpen) {
        e.stopPropagation();
      }
    }

    options.el = $(e.mfpEl);
    if(options.delegate) {
      options.items = el.find(options.delegate);
    }
    mfp.open(options);
  },


  /**
   * Updates text on preloader
   */
  updateStatus: function(status, text) {

    if(mfp.preloader) {
      if(_prevStatus !== status) {
        mfp.container.removeClass('mfp-s-'+_prevStatus);
      }

      if(!text && status === 'loading') {
        text = mfp.st.tLoading;
      }

      var data = {
        status: status,
        text: text
      };
      // allows to modify status
      _mfpTrigger('UpdateStatus', data);

      status = data.status;
      text = data.text;

      mfp.preloader.html(text);

      mfp.preloader.find('a').on('click', function(e) {
        e.stopImmediatePropagation();
      });

      mfp.container.addClass('mfp-s-'+status);
      _prevStatus = status;
    }
  },


  /*
    "Private" helpers that aren't private at all
   */
  // Check to close popup or not
  // "target" is an element that was clicked
  _checkIfClose: function(target) {

    if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
      return;
    }

    var closeOnContent = mfp.st.closeOnContentClick;
    var closeOnBg = mfp.st.closeOnBgClick;

    if(closeOnContent && closeOnBg) {
      return true;
    } else {

      // We close the popup if click is on close button or on preloader. Or if there is no content.
      if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
        return true;
      }

      // if click is outside the content
      if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
        if(closeOnBg) {
          // last check, if the clicked element is in DOM, (in case it's removed onclick)
          if( $.contains(document, target) ) {
            return true;
          }
        }
      } else if(closeOnContent) {
        return true;
      }

    }
    return false;
  },
  _addClassToMFP: function(cName) {
    mfp.bgOverlay.addClass(cName);
    mfp.wrap.addClass(cName);
  },
  _removeClassFromMFP: function(cName) {
    this.bgOverlay.removeClass(cName);
    mfp.wrap.removeClass(cName);
  },
  _hasScrollBar: function(winHeight) {
    return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
  },
  _setFocus: function() {
    (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
  },
  _onFocusIn: function(e) {
    if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
      mfp._setFocus();
      return false;
    }
  },
  _parseMarkup: function(template, values, item) {
    var arr;
    if(item.data) {
      values = $.extend(item.data, values);
    }
    _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

    $.each(values, function(key, value) {
      if(value === undefined || value === false) {
        return true;
      }
      arr = key.split('_');
      if(arr.length > 1) {
        var el = template.find(EVENT_NS + '-'+arr[0]);

        if(el.length > 0) {
          var attr = arr[1];
          if(attr === 'replaceWith') {
            if(el[0] !== value[0]) {
              el.replaceWith(value);
            }
          } else if(attr === 'img') {
            if(el.is('img')) {
              el.attr('src', value);
            } else {
              el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
            }
          } else {
            el.attr(arr[1], value);
          }
        }

      } else {
        template.find(EVENT_NS + '-'+key).html(value);
      }
    });
  },

  _getScrollbarSize: function() {
    // thx David
    if(mfp.scrollbarSize === undefined) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
      document.body.appendChild(scrollDiv);
      mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
    return mfp.scrollbarSize;
  }

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
$.magnificPopup = {
  instance: null,
  proto: MagnificPopup.prototype,
  modules: [],

  open: function(options, index) {
    _checkInstance();

    if(!options) {
      options = {};
    } else {
      options = $.extend(true, {}, options);
    }

    options.isObj = true;
    options.index = index || 0;
    return this.instance.open(options);
  },

  close: function() {
    return $.magnificPopup.instance && $.magnificPopup.instance.close();
  },

  registerModule: function(name, module) {
    if(module.options) {
      $.magnificPopup.defaults[name] = module.options;
    }
    $.extend(this.proto, module.proto);
    this.modules.push(name);
  },

  defaults: {

    // Info about options is in docs:
    // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

    disableOn: 0,

    key: null,

    midClick: false,

    mainClass: '',

    preloader: true,

    focus: '', // CSS selector of input to focus after popup is opened

    closeOnContentClick: false,

    closeOnBgClick: true,

    closeBtnInside: true,

    showCloseBtn: true,

    enableEscapeKey: true,

    modal: false,

    alignTop: false,

    removalDelay: 0,

    prependTo: null,

    fixedContentPos: 'auto',

    fixedBgPos: 'auto',

    overflowY: 'auto',

    closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

    tClose: 'Close (Esc)',

    tLoading: 'Loading...',

    autoFocusLast: true

  }
};



$.fn.magnificPopup = function(options) {
  _checkInstance();

  var jqEl = $(this);

  // We call some API method of first param is a string
  if (typeof options === "string" ) {

    if(options === 'open') {
      var items,
        itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
        index = parseInt(arguments[1], 10) || 0;

      if(itemOpts.items) {
        items = itemOpts.items[index];
      } else {
        items = jqEl;
        if(itemOpts.delegate) {
          items = items.find(itemOpts.delegate);
        }
        items = items.eq( index );
      }
      mfp._openClick({mfpEl:items}, jqEl, itemOpts);
    } else {
      if(mfp.isOpen)
        mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
    }

  } else {
    // clone options obj
    options = $.extend(true, {}, options);

    /*
     * As Zepto doesn't support .data() method for objects
     * and it works only in normal browsers
     * we assign "options" object directly to the DOM element. FTW!
     */
    if(_isJQ) {
      jqEl.data('magnificPopup', options);
    } else {
      jqEl[0].magnificPopup = options;
    }

    mfp.addGroup(jqEl, options);

  }
  return jqEl;
};

/*>>core*/

/*>>inline*/

var INLINE_NS = 'inline',
  _hiddenClass,
  _inlinePlaceholder,
  _lastInlineElement,
  _putInlineElementsBack = function() {
    if(_lastInlineElement) {
      _inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
      _lastInlineElement = null;
    }
  };

$.magnificPopup.registerModule(INLINE_NS, {
  options: {
    hiddenClass: 'hide', // will be appended with `mfp-` prefix
    markup: '',
    tNotFound: 'Content not found'
  },
  proto: {

    initInline: function() {
      mfp.types.push(INLINE_NS);

      _mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
        _putInlineElementsBack();
      });
    },

    getInline: function(item, template) {

      _putInlineElementsBack();

      if(item.src) {
        var inlineSt = mfp.st.inline,
          el = $(item.src);

        if(el.length) {

          // If target element has parent - we replace it with placeholder and put it back after popup is closed
          var parent = el[0].parentNode;
          if(parent && parent.tagName) {
            if(!_inlinePlaceholder) {
              _hiddenClass = inlineSt.hiddenClass;
              _inlinePlaceholder = _getEl(_hiddenClass);
              _hiddenClass = 'mfp-'+_hiddenClass;
            }
            // replace target inline element with placeholder
            _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
          }

          mfp.updateStatus('ready');
        } else {
          mfp.updateStatus('error', inlineSt.tNotFound);
          el = $('<div>');
        }

        item.inlineElement = el;
        return el;
      }

      mfp.updateStatus('ready');
      mfp._parseMarkup(template, {}, item);
      return template;
    }
  }
});

/*>>inline*/

/*>>ajax*/
var AJAX_NS = 'ajax',
  _ajaxCur,
  _removeAjaxCursor = function() {
    if(_ajaxCur) {
      $(document.body).removeClass(_ajaxCur);
    }
  },
  _destroyAjaxRequest = function() {
    _removeAjaxCursor();
    if(mfp.req) {
      mfp.req.abort();
    }
  };

$.magnificPopup.registerModule(AJAX_NS, {

  options: {
    settings: null,
    cursor: 'mfp-ajax-cur',
    tError: '<a href="%url%">The content</a> could not be loaded.'
  },

  proto: {
    initAjax: function() {
      mfp.types.push(AJAX_NS);
      _ajaxCur = mfp.st.ajax.cursor;

      _mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
      _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
    },
    getAjax: function(item) {

      if(_ajaxCur) {
        $(document.body).addClass(_ajaxCur);
      }

      mfp.updateStatus('loading');

      var opts = $.extend({
        url: item.src,
        success: function(data, textStatus, jqXHR) {
          var temp = {
            data:data,
            xhr:jqXHR
          };

          _mfpTrigger('ParseAjax', temp);

          mfp.appendContent( $(temp.data), AJAX_NS );

          item.finished = true;

          _removeAjaxCursor();

          mfp._setFocus();

          setTimeout(function() {
            mfp.wrap.addClass(READY_CLASS);
          }, 16);

          mfp.updateStatus('ready');

          _mfpTrigger('AjaxContentAdded');
        },
        error: function() {
          _removeAjaxCursor();
          item.finished = item.loadError = true;
          mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
        }
      }, mfp.st.ajax.settings);

      mfp.req = $.ajax(opts);

      return '';
    }
  }
});

/*>>ajax*/

/*>>image*/
var _imgInterval,
  _getTitle = function(item) {
    if(item.data && item.data.title !== undefined)
      return item.data.title;

    var src = mfp.st.image.titleSrc;

    if(src) {
      if($.isFunction(src)) {
        return src.call(mfp, item);
      } else if(item.el) {
        return item.el.attr(src) || '';
      }
    }
    return '';
  };

$.magnificPopup.registerModule('image', {

  options: {
    markup: '<div class="mfp-figure">'+
          '<div class="mfp-close"></div>'+
          '<figure>'+
            '<div class="mfp-img"></div>'+
            '<figcaption>'+
              '<div class="mfp-bottom-bar">'+
                '<div class="mfp-title"></div>'+
                '<div class="mfp-counter"></div>'+
              '</div>'+
            '</figcaption>'+
          '</figure>'+
        '</div>',
    cursor: 'mfp-zoom-out-cur',
    titleSrc: 'title',
    verticalFit: true,
    tError: '<a href="%url%">The image</a> could not be loaded.'
  },

  proto: {
    initImage: function() {
      var imgSt = mfp.st.image,
        ns = '.image';

      mfp.types.push('image');

      _mfpOn(OPEN_EVENT+ns, function() {
        if(mfp.currItem.type === 'image' && imgSt.cursor) {
          $(document.body).addClass(imgSt.cursor);
        }
      });

      _mfpOn(CLOSE_EVENT+ns, function() {
        if(imgSt.cursor) {
          $(document.body).removeClass(imgSt.cursor);
        }
        _window.off('resize' + EVENT_NS);
      });

      _mfpOn('Resize'+ns, mfp.resizeImage);
      if(mfp.isLowIE) {
        _mfpOn('AfterChange', mfp.resizeImage);
      }
    },
    resizeImage: function() {
      var item = mfp.currItem;
      if(!item || !item.img) return;

      if(mfp.st.image.verticalFit) {
        var decr = 0;
        // fix box-sizing in ie7/8
        if(mfp.isLowIE) {
          decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
        }
        item.img.css('max-height', mfp.wH-decr);
      }
    },
    _onImageHasSize: function(item) {
      if(item.img) {

        item.hasSize = true;

        if(_imgInterval) {
          clearInterval(_imgInterval);
        }

        item.isCheckingImgSize = false;

        _mfpTrigger('ImageHasSize', item);

        if(item.imgHidden) {
          if(mfp.content)
            mfp.content.removeClass('mfp-loading');

          item.imgHidden = false;
        }

      }
    },

    /**
     * Function that loops until the image has size to display elements that rely on it asap
     */
    findImageSize: function(item) {

      var counter = 0,
        img = item.img[0],
        mfpSetInterval = function(delay) {

          if(_imgInterval) {
            clearInterval(_imgInterval);
          }
          // decelerating interval that checks for size of an image
          _imgInterval = setInterval(function() {
            if(img.naturalWidth > 0) {
              mfp._onImageHasSize(item);
              return;
            }

            if(counter > 200) {
              clearInterval(_imgInterval);
            }

            counter++;
            if(counter === 3) {
              mfpSetInterval(10);
            } else if(counter === 40) {
              mfpSetInterval(50);
            } else if(counter === 100) {
              mfpSetInterval(500);
            }
          }, delay);
        };

      mfpSetInterval(1);
    },

    getImage: function(item, template) {

      var guard = 0,

        // image load complete handler
        onLoadComplete = function() {
          if(item) {
            if (item.img[0].complete) {
              item.img.off('.mfploader');

              if(item === mfp.currItem){
                mfp._onImageHasSize(item);

                mfp.updateStatus('ready');
              }

              item.hasSize = true;
              item.loaded = true;

              _mfpTrigger('ImageLoadComplete');

            }
            else {
              // if image complete check fails 200 times (20 sec), we assume that there was an error.
              guard++;
              if(guard < 200) {
                setTimeout(onLoadComplete,100);
              } else {
                onLoadError();
              }
            }
          }
        },

        // image error handler
        onLoadError = function() {
          if(item) {
            item.img.off('.mfploader');
            if(item === mfp.currItem){
              mfp._onImageHasSize(item);
              mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
            }

            item.hasSize = true;
            item.loaded = true;
            item.loadError = true;
          }
        },
        imgSt = mfp.st.image;


      var el = template.find('.mfp-img');
      if(el.length) {
        var img = document.createElement('img');
        img.className = 'mfp-img';
        if(item.el && item.el.find('img').length) {
          img.alt = item.el.find('img').attr('alt');
        }
        item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
        img.src = item.src;

        // without clone() "error" event is not firing when IMG is replaced by new IMG
        // TODO: find a way to avoid such cloning
        if(el.is('img')) {
          item.img = item.img.clone();
        }

        img = item.img[0];
        if(img.naturalWidth > 0) {
          item.hasSize = true;
        } else if(!img.width) {
          item.hasSize = false;
        }
      }

      mfp._parseMarkup(template, {
        title: _getTitle(item),
        img_replaceWith: item.img
      }, item);

      mfp.resizeImage();

      if(item.hasSize) {
        if(_imgInterval) clearInterval(_imgInterval);

        if(item.loadError) {
          template.addClass('mfp-loading');
          mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
        } else {
          template.removeClass('mfp-loading');
          mfp.updateStatus('ready');
        }
        return template;
      }

      mfp.updateStatus('loading');
      item.loading = true;

      if(!item.hasSize) {
        item.imgHidden = true;
        template.addClass('mfp-loading');
        mfp.findImageSize(item);
      }

      return template;
    }
  }
});

/*>>image*/

/*>>zoom*/
var hasMozTransform,
  getHasMozTransform = function() {
    if(hasMozTransform === undefined) {
      hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
    }
    return hasMozTransform;
  };

$.magnificPopup.registerModule('zoom', {

  options: {
    enabled: false,
    easing: 'ease-in-out',
    duration: 300,
    opener: function(element) {
      return element.is('img') ? element : element.find('img');
    }
  },

  proto: {

    initZoom: function() {
      var zoomSt = mfp.st.zoom,
        ns = '.zoom',
        image;

      if(!zoomSt.enabled || !mfp.supportsTransition) {
        return;
      }

      var duration = zoomSt.duration,
        getElToAnimate = function(image) {
          var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
            transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
            cssObj = {
              position: 'fixed',
              zIndex: 9999,
              left: 0,
              top: 0,
              '-webkit-backface-visibility': 'hidden'
            },
            t = 'transition';

          cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

          newImg.css(cssObj);
          return newImg;
        },
        showMainContent = function() {
          mfp.content.css('visibility', 'visible');
        },
        openTimeout,
        animatedImg;

      _mfpOn('BuildControls'+ns, function() {
        if(mfp._allowZoom()) {

          clearTimeout(openTimeout);
          mfp.content.css('visibility', 'hidden');

          // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

          image = mfp._getItemToZoom();

          if(!image) {
            showMainContent();
            return;
          }

          animatedImg = getElToAnimate(image);

          animatedImg.css( mfp._getOffset() );

          mfp.wrap.append(animatedImg);

          openTimeout = setTimeout(function() {
            animatedImg.css( mfp._getOffset( true ) );
            openTimeout = setTimeout(function() {

              showMainContent();

              setTimeout(function() {
                animatedImg.remove();
                image = animatedImg = null;
                _mfpTrigger('ZoomAnimationEnded');
              }, 16); // avoid blink when switching images

            }, duration); // this timeout equals animation duration

          }, 16); // by adding this timeout we avoid short glitch at the beginning of animation


          // Lots of timeouts...
        }
      });
      _mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
        if(mfp._allowZoom()) {

          clearTimeout(openTimeout);

          mfp.st.removalDelay = duration;

          if(!image) {
            image = mfp._getItemToZoom();
            if(!image) {
              return;
            }
            animatedImg = getElToAnimate(image);
          }

          animatedImg.css( mfp._getOffset(true) );
          mfp.wrap.append(animatedImg);
          mfp.content.css('visibility', 'hidden');

          setTimeout(function() {
            animatedImg.css( mfp._getOffset() );
          }, 16);
        }

      });

      _mfpOn(CLOSE_EVENT+ns, function() {
        if(mfp._allowZoom()) {
          showMainContent();
          if(animatedImg) {
            animatedImg.remove();
          }
          image = null;
        }
      });
    },

    _allowZoom: function() {
      return mfp.currItem.type === 'image';
    },

    _getItemToZoom: function() {
      if(mfp.currItem.hasSize) {
        return mfp.currItem.img;
      } else {
        return false;
      }
    },

    // Get element postion relative to viewport
    _getOffset: function(isLarge) {
      var el;
      if(isLarge) {
        el = mfp.currItem.img;
      } else {
        el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
      }

      var offset = el.offset();
      var paddingTop = parseInt(el.css('padding-top'),10);
      var paddingBottom = parseInt(el.css('padding-bottom'),10);
      offset.top -= ( $(window).scrollTop() - paddingTop );


      /*

      Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

       */
      var obj = {
        width: el.width(),
        // fix Zepto height+padding issue
        height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
      };

      // I hate to do this, but there is no another option
      if( getHasMozTransform() ) {
        obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
      } else {
        obj.left = offset.left;
        obj.top = offset.top;
      }
      return obj;
    }

  }
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
  _emptyPage = '//about:blank',

  _fixIframeBugs = function(isShowing) {
    if(mfp.currTemplate[IFRAME_NS]) {
      var el = mfp.currTemplate[IFRAME_NS].find('iframe');
      if(el.length) {
        // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
        if(!isShowing) {
          el[0].src = _emptyPage;
        }

        // IE8 black screen bug fix
        if(mfp.isIE8) {
          el.css('display', isShowing ? 'block' : 'none');
        }
      }
    }
  };

$.magnificPopup.registerModule(IFRAME_NS, {

  options: {
    markup: '<div class="mfp-iframe-scaler">'+
          '<div class="mfp-close"></div>'+
          '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
        '</div>',

    srcAction: 'iframe_src',

    // we don't care and support only one default type of URL by default
    patterns: {
      youtube: {
        index: 'youtube.com',
        id: 'v=',
        src: '//www.youtube.com/embed/%id%?autoplay=1'
      },
      vimeo: {
        index: 'vimeo.com/',
        id: '/',
        src: '//player.vimeo.com/video/%id%?autoplay=1'
      },
      gmaps: {
        index: '//maps.google.',
        src: '%id%&output=embed'
      }
    }
  },

  proto: {
    initIframe: function() {
      mfp.types.push(IFRAME_NS);

      _mfpOn('BeforeChange', function(e, prevType, newType) {
        if(prevType !== newType) {
          if(prevType === IFRAME_NS) {
            _fixIframeBugs(); // iframe if removed
          } else if(newType === IFRAME_NS) {
            _fixIframeBugs(true); // iframe is showing
          }
        }// else {
          // iframe source is switched, don't do anything
        //}
      });

      _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
        _fixIframeBugs();
      });
    },

    getIframe: function(item, template) {
      var embedSrc = item.src;
      var iframeSt = mfp.st.iframe;

      $.each(iframeSt.patterns, function() {
        if(embedSrc.indexOf( this.index ) > -1) {
          if(this.id) {
            if(typeof this.id === 'string') {
              embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
            } else {
              embedSrc = this.id.call( this, embedSrc );
            }
          }
          embedSrc = this.src.replace('%id%', embedSrc );
          return false; // break;
        }
      });

      var dataObj = {};
      if(iframeSt.srcAction) {
        dataObj[iframeSt.srcAction] = embedSrc;
      }
      mfp._parseMarkup(template, dataObj, item);

      mfp.updateStatus('ready');

      return template;
    }
  }
});



/*>>iframe*/

/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
    var numSlides = mfp.items.length;
    if(index > numSlides - 1) {
      return index - numSlides;
    } else  if(index < 0) {
      return numSlides + index;
    }
    return index;
  },
  _replaceCurrTotal = function(text, curr, total) {
    return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
  };

$.magnificPopup.registerModule('gallery', {

  options: {
    enabled: false,
    arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
    preload: [0,2],
    navigateByImgClick: true,
    arrows: true,

    tPrev: 'Previous (Left arrow key)',
    tNext: 'Next (Right arrow key)',
    tCounter: '%curr% of %total%'
  },

  proto: {
    initGallery: function() {

      var gSt = mfp.st.gallery,
        ns = '.mfp-gallery';

      mfp.direction = true; // true - next, false - prev

      if(!gSt || !gSt.enabled ) return false;

      _wrapClasses += ' mfp-gallery';

      _mfpOn(OPEN_EVENT+ns, function() {

        if(gSt.navigateByImgClick) {
          mfp.wrap.on('click'+ns, '.mfp-img', function() {
            if(mfp.items.length > 1) {
              mfp.next();
              return false;
            }
          });
        }

        _document.on('keydown'+ns, function(e) {
          if (e.keyCode === 37) {
            mfp.prev();
          } else if (e.keyCode === 39) {
            mfp.next();
          }
        });
      });

      _mfpOn('UpdateStatus'+ns, function(e, data) {
        if(data.text) {
          data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
        }
      });

      _mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
        var l = mfp.items.length;
        values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
      });

      _mfpOn('BuildControls' + ns, function() {
        if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
          var markup = gSt.arrowMarkup,
            arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
            arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

          arrowLeft.click(function() {
            mfp.prev();
          });
          arrowRight.click(function() {
            mfp.next();
          });

          mfp.container.append(arrowLeft.add(arrowRight));
        }
      });

      _mfpOn(CHANGE_EVENT+ns, function() {
        if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

        mfp._preloadTimeout = setTimeout(function() {
          mfp.preloadNearbyImages();
          mfp._preloadTimeout = null;
        }, 16);
      });


      _mfpOn(CLOSE_EVENT+ns, function() {
        _document.off(ns);
        mfp.wrap.off('click'+ns);
        mfp.arrowRight = mfp.arrowLeft = null;
      });

    },
    next: function() {
      mfp.direction = true;
      mfp.index = _getLoopedId(mfp.index + 1);
      mfp.updateItemHTML();
    },
    prev: function() {
      mfp.direction = false;
      mfp.index = _getLoopedId(mfp.index - 1);
      mfp.updateItemHTML();
    },
    goTo: function(newIndex) {
      mfp.direction = (newIndex >= mfp.index);
      mfp.index = newIndex;
      mfp.updateItemHTML();
    },
    preloadNearbyImages: function() {
      var p = mfp.st.gallery.preload,
        preloadBefore = Math.min(p[0], mfp.items.length),
        preloadAfter = Math.min(p[1], mfp.items.length),
        i;

      for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
        mfp._preloadItem(mfp.index+i);
      }
      for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
        mfp._preloadItem(mfp.index-i);
      }
    },
    _preloadItem: function(index) {
      index = _getLoopedId(index);

      if(mfp.items[index].preloaded) {
        return;
      }

      var item = mfp.items[index];
      if(!item.parsed) {
        item = mfp.parseEl( index );
      }

      _mfpTrigger('LazyLoad', item);

      if(item.type === 'image') {
        item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
          item.hasSize = true;
        }).on('error.mfploader', function() {
          item.hasSize = true;
          item.loadError = true;
          _mfpTrigger('LazyLoadError', item);
        }).attr('src', item.src);
      }


      item.preloaded = true;
    }
  }
});

/*>>gallery*/

/*>>retina*/

var RETINA_NS = 'retina';

$.magnificPopup.registerModule(RETINA_NS, {
  options: {
    replaceSrc: function(item) {
      return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
    },
    ratio: 1 // Function or number.  Set to 1 to disable.
  },
  proto: {
    initRetina: function() {
      if(window.devicePixelRatio > 1) {

        var st = mfp.st.retina,
          ratio = st.ratio;

        ratio = !isNaN(ratio) ? ratio : ratio();

        if(ratio > 1) {
          _mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
            item.img.css({
              'max-width': item.img[0].naturalWidth / ratio,
              'width': '100%'
            });
          });
          _mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
            item.src = st.replaceSrc(item, ratio);
          });
        }
      }

    }
  }
});

/*>>retina*/
 _checkInstance(); }));
/*! VelocityJS.org (1.3.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

/*************************
 Velocity jQuery Shim
 *************************/

/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */

(function(window) {
  "use strict";
  /***************
   Setup
   ***************/

  /* If jQuery is already loaded, there's no point in loading this shim. */
  if (window.jQuery) {
    return;
  }

  /* jQuery base. */
  var $ = function(selector, context) {
    return new $.fn.init(selector, context);
  };

  /********************
   Private Methods
   ********************/

  /* jQuery */
  $.isWindow = function(obj) {
    /* jshint eqeqeq: false */
    return obj && obj === obj.window;
  };

  /* jQuery */
  $.type = function(obj) {
    if (!obj) {
      return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
  };

  /* jQuery */
  $.isArray = Array.isArray || function(obj) {
    return $.type(obj) === "array";
  };

  /* jQuery */
  function isArraylike(obj) {
    var length = obj.length,
        type = $.type(obj);

    if (type === "function" || $.isWindow(obj)) {
      return false;
    }

    if (obj.nodeType === 1 && length) {
      return true;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }

  /***************
   $ Methods
   ***************/

  /* jQuery: Support removed for IE<9. */
  $.isPlainObject = function(obj) {
    var key;

    if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
      return false;
    }

    try {
      if (obj.constructor &&
          !hasOwn.call(obj, "constructor") &&
          !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }

    for (key in obj) {
    }

    return key === undefined || hasOwn.call(obj, key);
  };

  /* jQuery */
  $.each = function(obj, callback, args) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj);

    if (args) {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (!obj.hasOwnProperty(i)) {
            continue;
          }
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      }

    } else {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (!obj.hasOwnProperty(i)) {
            continue;
          }
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      }
    }

    return obj;
  };

  /* Custom */
  $.data = function(node, key, value) {
    /* $.getData() */
    if (value === undefined) {
      var getId = node[$.expando],
          store = getId && cache[getId];

      if (key === undefined) {
        return store;
      } else if (store) {
        if (key in store) {
          return store[key];
        }
      }
      /* $.setData() */
    } else if (key !== undefined) {
      var setId = node[$.expando] || (node[$.expando] = ++$.uuid);

      cache[setId] = cache[setId] || {};
      cache[setId][key] = value;

      return value;
    }
  };

  /* Custom */
  $.removeData = function(node, keys) {
    var id = node[$.expando],
        store = id && cache[id];

    if (store) {
      // Cleanup the entire store if no keys are provided.
      if (!keys) {
        delete cache[id];
      } else {
        $.each(keys, function(_, key) {
          delete store[key];
        });
      }
    }
  };

  /* jQuery */
  $.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    if (typeof target === "boolean") {
      deep = target;

      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== "object" && $.type(target) !== "function") {
      target = {};
    }

    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      if ((options = arguments[i])) {
        for (name in options) {
          if (!options.hasOwnProperty(name)) {
            continue;
          }
          src = target[name];
          copy = options[name];

          if (target === copy) {
            continue;
          }

          if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && $.isArray(src) ? src : [];

            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }

            target[name] = $.extend(deep, clone, copy);

          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  };

  /* jQuery 1.4.3 */
  $.queue = function(elem, type, data) {
    function $makeArray(arr, results) {
      var ret = results || [];

      if (arr) {
        if (isArraylike(Object(arr))) {
          /* $.merge */
          (function(first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
              first[i++] = second[j++];
            }

            if (len !== len) {
              while (second[j] !== undefined) {
                first[i++] = second[j++];
              }
            }

            first.length = i;

            return first;
          })(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          [].push.call(ret, arr);
        }
      }

      return ret;
    }

    if (!elem) {
      return;
    }

    type = (type || "fx") + "queue";

    var q = $.data(elem, type);

    if (!data) {
      return q || [];
    }

    if (!q || $.isArray(data)) {
      q = $.data(elem, type, $makeArray(data));
    } else {
      q.push(data);
    }

    return q;
  };

  /* jQuery 1.4.3 */
  $.dequeue = function(elems, type) {
    /* Custom: Embed element iteration. */
    $.each(elems.nodeType ? [elems] : elems, function(i, elem) {
      type = type || "fx";

      var queue = $.queue(elem, type),
          fn = queue.shift();

      if (fn === "inprogress") {
        fn = queue.shift();
      }

      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }

        fn.call(elem, function() {
          $.dequeue(elem, type);
        });
      }
    });
  };

  /******************
   $.fn Methods
   ******************/

  /* jQuery */
  $.fn = $.prototype = {
    init: function(selector) {
      /* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
      if (selector.nodeType) {
        this[0] = selector;

        return this;
      } else {
        throw new Error("Not a DOM node.");
      }
    },
    offset: function() {
      /* jQuery altered code: Dropped disconnected DOM node checking. */
      var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {top: 0, left: 0};

      return {
        top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
        left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
      };
    },
    position: function() {
      /* jQuery */
      function offsetParentFn(elem) {
        var offsetParent = elem.offsetParent;

        while (offsetParent && offsetParent.nodeName.toLowerCase() !== "html" && offsetParent.style && offsetParent.style.position === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || document;
      }

      /* Zepto */
      var elem = this[0],
          offsetParent = offsetParentFn(elem),
          offset = this.offset(),
          parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? {top: 0, left: 0} : $(offsetParent).offset();

      offset.top -= parseFloat(elem.style.marginTop) || 0;
      offset.left -= parseFloat(elem.style.marginLeft) || 0;

      if (offsetParent.style) {
        parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0;
        parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0;
      }

      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    }
  };

  /**********************
   Private Variables
   **********************/

  /* For $.data() */
  var cache = {};
  $.expando = "velocity" + (new Date().getTime());
  $.uuid = 0;

  /* For $.queue() */
  var class2type = {},
      hasOwn = class2type.hasOwnProperty,
      toString = class2type.toString;

  var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
  for (var i = 0; i < types.length; i++) {
    class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
  }

  /* Makes $(node) possible, without having to call init. */
  $.fn.init.prototype = $.fn;

  /* Globalize Velocity onto the window, and assign its Utilities property. */
  window.Velocity = {Utilities: $};
})(window);

/******************
 Velocity.js
 ******************/

(function(factory) {
  "use strict";
  /* CommonJS module. */
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
    /* AMD module. */
  } else if (typeof define === "function" && define.amd) {
    define(factory);
    /* Browser globals. */
  } else {
    factory();
  }
}(function() {
  "use strict";
  return function(global, window, document, undefined) {

    /***************
     Summary
     ***************/

    /*
     - CSS: CSS stack that works independently from the rest of Velocity.
     - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
     - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
     - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
     Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
     - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
     - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
     - completeCall(): Handles the cleanup process for each Velocity call.
     */

    /*********************
     Helper Functions
     *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = (function() {
      if (document.documentMode) {
        return document.documentMode;
      } else {
        for (var i = 7; i > 4; i--) {
          var div = document.createElement("div");

          div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

          if (div.getElementsByTagName("span").length) {
            div = null;

            return i;
          }
        }
      }

      return undefined;
    })();

    /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
    var rAFShim = (function() {
      var timeLast = 0;

      return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        var timeCurrent = (new Date()).getTime(),
            timeDelta;

        /* Dynamically set delay on a per-tick basis to match 60fps. */
        /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
        timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
        timeLast = timeCurrent + timeDelta;

        return setTimeout(function() {
          callback(timeCurrent + timeDelta);
        }, timeDelta);
      };
    })();

    var performance = (function() {
      var perf = window.performance || {};

      if (!perf.hasOwnProperty("now")) {
        var nowOffset = perf.timing && perf.timing.domComplete ? perf.timing.domComplete : (new Date()).getTime();

        perf.now = function() {
          return (new Date()).getTime() - nowOffset;
        };
      }
      return perf;
    })();

    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
    function compactSparseArray(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value) {
          result.push(value);
        }
      }

      return result;
    }

    function sanitizeElements(elements) {
      /* Unwrap jQuery/Zepto objects. */
      if (Type.isWrapped(elements)) {
        elements = [].slice.call(elements);
        /* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
      } else if (Type.isNode(elements)) {
        elements = [elements];
      }

      return elements;
    }

    var Type = {
      isNumber: function(variable) {
        return (typeof variable === "number");
      },
      isString: function(variable) {
        return (typeof variable === "string");
      },
      isArray: Array.isArray || function(variable) {
        return Object.prototype.toString.call(variable) === "[object Array]";
      },
      isFunction: function(variable) {
        return Object.prototype.toString.call(variable) === "[object Function]";
      },
      isNode: function(variable) {
        return variable && variable.nodeType;
      },
      /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
      isNodeList: function(variable) {
        return typeof variable === "object" &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
            variable.length !== undefined &&
            (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
      },
      /* Determine if variable is an array-like wrapped jQuery, Zepto or similar element. */
      isWrapped: function(variable) {
        return variable && (Type.isArray(variable) || (Type.isNumber(variable.length) && !Type.isString(variable) && !Type.isFunction(variable)));
      },
      isSVG: function(variable) {
        return window.SVGElement && (variable instanceof window.SVGElement);
      },
      isEmptyObject: function(variable) {
        for (var name in variable) {
          if (variable.hasOwnProperty(name)) {
            return false;
          }
        }

        return true;
      }
    };

    /*****************
     Dependencies
     *****************/

    var $,
        isJQuery = false;

    if (global.fn && global.fn.jquery) {
      $ = global;
      isJQuery = true;
    } else {
      $ = window.Velocity.Utilities;
    }

    if (IE <= 8 && !isJQuery) {
      throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    } else if (IE <= 7) {
      /* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
      jQuery.fn.velocity = jQuery.fn.animate;

      /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
      return;
    }

    /*****************
     Constants
     *****************/

    var DURATION_DEFAULT = 400,
        EASING_DEFAULT = "swing";

    /*************
     State
     *************/

    var Velocity = {
      /* Container for page-wide Velocity state data. */
      State: {
        /* Detect mobile devices to determine if mobileHA should be turned on. */
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
        isAndroid: /Android/i.test(navigator.userAgent),
        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
        isChrome: window.chrome,
        isFirefox: /Firefox/i.test(navigator.userAgent),
        /* Create a cached element for re-use when checking for CSS property prefixes. */
        prefixElement: document.createElement("div"),
        /* Cache every prefix match to avoid repeating lookups. */
        prefixMatches: {},
        /* Cache the anchor used for animating window scrolling. */
        scrollAnchor: null,
        /* Cache the browser-specific property names associated with the scroll anchor. */
        scrollPropertyLeft: null,
        scrollPropertyTop: null,
        /* Keep track of whether our RAF tick is running. */
        isTicking: false,
        /* Container for every in-progress call to Velocity. */
        calls: [],
        delayedElements: {
          count:0
        }
      },
      /* Velocity's custom CSS stack. Made global for unit testing. */
      CSS: {/* Defined below. */},
      /* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
      Utilities: $,
      /* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
      Redirects: {/* Manually registered by the user. */},
      Easings: {/* Defined below. */},
      /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
      Promise: window.Promise,
      /* Velocity option defaults, which can be overriden by the user. */
      defaults: {
        queue: "",
        duration: DURATION_DEFAULT,
        easing: EASING_DEFAULT,
        begin: undefined,
        complete: undefined,
        progress: undefined,
        display: undefined,
        visibility: undefined,
        loop: false,
        delay: false,
        mobileHA: true,
        /* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
        _cacheValues: true,
        /* Advanced: Set to false if the promise should always resolve on empty element lists. */
        promiseRejectEmpty: true
      },
      /* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
      init: function(element) {
        $.data(element, "velocity", {
          /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
          isSVG: Type.isSVG(element),
          /* Keep track of whether the element is currently being animated by Velocity.
           This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
          isAnimating: false,
          /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
          computedStyle: null,
          /* Tween data is cached for each animation on the element so that data can be passed across calls --
           in particular, end values are used as subsequent start values in consecutive Velocity calls. */
          tweensContainer: null,
          /* The full root property values of each CSS hook being animated on this element are cached so that:
           1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
           2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
          rootPropertyValueCache: {},
          /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
          transformCache: {}
        });
      },
      /* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
      hook: null, /* Defined below. */
      /* Velocity-wide animation time remapping for testing purposes. */
      mock: false,
      version: {major: 1, minor: 3, patch: 2},
      /* Set to 1 or 2 (most verbose) to output debug info to console. */
      debug: false,
      /* Use rAF high resolution timestamp when available */
      timestamp: true,
      /* Pause all animations */
      pauseAll: function(queueName) {
        var currentTime = (new Date()).getTime();

        $.each(Velocity.State.calls, function(i, activeCall) {
                      
          if (activeCall) {
            
            /* If we have a queueName and this call is not on that queue, skip */
            if (queueName !== undefined && ((activeCall[2].queue !== queueName) || (activeCall[2].queue === false))) {
              return true;
            }

            /* Set call to paused */
            activeCall[5] = {
              resume:false
            };
          }
        });

        /* Pause timers on any currently delayed calls */
        $.each(Velocity.State.delayedElements, function(k, element) {
          if(!element) {
            return;
          }
          pauseDelayOnElement(element, currentTime);
        });
      },
      /* Resume all animations */
      resumeAll: function(queueName) {
        var currentTime = (new Date()).getTime();

        $.each(Velocity.State.calls, function(i, activeCall) {
            
          if (activeCall) {
            
            /* If we have a queueName and this call is not on that queue, skip */
            if (queueName !== undefined && ((activeCall[2].queue !== queueName) || (activeCall[2].queue === false))) {
              return true;
            }

            /* Set call to resumed if it was paused */
            if(activeCall[5]) {
              activeCall[5].resume = true;
            }
          }
        });
        /* Resume timers on any currently delayed calls */
        $.each(Velocity.State.delayedElements, function(k, element) {
          if(!element) {
            return;
          }
          resumeDelayOnElement(element, currentTime);
        });
      }
    };

    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
    if (window.pageYOffset !== undefined) {
      Velocity.State.scrollAnchor = window;
      Velocity.State.scrollPropertyLeft = "pageXOffset";
      Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
      Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
      Velocity.State.scrollPropertyLeft = "scrollLeft";
      Velocity.State.scrollPropertyTop = "scrollTop";
    }

    /* Shorthand alias for jQuery's $.data() utility. */
    function Data(element) {
      /* Hardcode a reference to the plugin name. */
      var response = $.data(element, "velocity");

      /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
      return response === null ? undefined : response;
    }

    /**************
     Delay Timer
     **************/

    function pauseDelayOnElement(element, currentTime) {
      /* Check for any delay timers, and pause the set timeouts (while preserving time data)
      to be resumed when the "resume" command is issued */
      var data = Data(element);
      if (data && data.delayTimer && !data.delayPaused) {
        data.delayRemaining = data.delay - currentTime + data.delayBegin;
        data.delayPaused = true;
        clearTimeout(data.delayTimer.setTimeout);
      }
    }

    function resumeDelayOnElement(element, currentTime) {
      /* Check for any paused timers and resume */
      var data = Data(element);
      if (data && data.delayTimer && data.delayPaused) {
        /* If the element was mid-delay, re initiate the timeout with the remaining delay */
        data.delayPaused = false;
        data.delayTimer.setTimeout = setTimeout(data.delayTimer.next, data.delayRemaining);
      }
    }



    /**************
     Easing
     **************/

    /* Step easing generator. */
    function generateStep(steps) {
      return function(p) {
        return Math.round(p * steps) * (1 / steps);
      };
    }

    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    function generateBezier(mX1, mY1, mX2, mY2) {
      var NEWTON_ITERATIONS = 4,
          NEWTON_MIN_SLOPE = 0.001,
          SUBDIVISION_PRECISION = 0.0000001,
          SUBDIVISION_MAX_ITERATIONS = 10,
          kSplineTableSize = 11,
          kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
          float32ArraySupported = "Float32Array" in window;

      /* Must contain four arguments. */
      if (arguments.length !== 4) {
        return false;
      }

      /* Arguments must be numbers. */
      for (var i = 0; i < 4; ++i) {
        if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
          return false;
        }
      }

      /* X values must be in the [0, 1] range. */
      mX1 = Math.min(mX1, 1);
      mX2 = Math.min(mX2, 1);
      mX1 = Math.max(mX1, 0);
      mX2 = Math.max(mX2, 0);

      var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

      function A(aA1, aA2) {
        return 1.0 - 3.0 * aA2 + 3.0 * aA1;
      }
      function B(aA1, aA2) {
        return 3.0 * aA2 - 6.0 * aA1;
      }
      function C(aA1) {
        return 3.0 * aA1;
      }

      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }

      function getSlope(aT, aA1, aA2) {
        return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
      }

      function newtonRaphsonIterate(aX, aGuessT) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);

          if (currentSlope === 0.0) {
            return aGuessT;
          }

          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }

        return aGuessT;
      }

      function calcSampleValues() {
        for (var i = 0; i < kSplineTableSize; ++i) {
          mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }

      function binarySubdivide(aX, aA, aB) {
        var currentX, currentT, i = 0;

        do {
          currentT = aA + (aB - aA) / 2.0;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0.0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

        return currentT;
      }

      function getTForX(aX) {
        var intervalStart = 0.0,
            currentSample = 1,
            lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }

        --currentSample;

        var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
            guessForT = intervalStart + dist * kSampleStepSize,
            initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT);
        } else if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
      }

      var _precomputed = false;

      function precompute() {
        _precomputed = true;
        if (mX1 !== mY1 || mX2 !== mY2) {
          calcSampleValues();
        }
      }

      var f = function(aX) {
        if (!_precomputed) {
          precompute();
        }
        if (mX1 === mY1 && mX2 === mY2) {
          return aX;
        }
        if (aX === 0) {
          return 0;
        }
        if (aX === 1) {
          return 1;
        }

        return calcBezier(getTForX(aX), mY1, mY2);
      };

      f.getControlPoints = function() {
        return [{x: mX1, y: mY1}, {x: mX2, y: mY2}];
      };

      var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
      f.toString = function() {
        return str;
      };

      return f;
    }

    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
     then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
    var generateSpringRK4 = (function() {
      function springAccelerationForState(state) {
        return (-state.tension * state.x) - (state.friction * state.v);
      }

      function springEvaluateStateWithDerivative(initialState, dt, derivative) {
        var state = {
          x: initialState.x + derivative.dx * dt,
          v: initialState.v + derivative.dv * dt,
          tension: initialState.tension,
          friction: initialState.friction
        };

        return {dx: state.v, dv: springAccelerationForState(state)};
      }

      function springIntegrateState(state, dt) {
        var a = {
          dx: state.v,
          dv: springAccelerationForState(state)
        },
            b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
            c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
            d = springEvaluateStateWithDerivative(state, dt, c),
            dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
            dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

        state.x = state.x + dxdt * dt;
        state.v = state.v + dvdt * dt;

        return state;
      }

      return function springRK4Factory(tension, friction, duration) {

        var initState = {
          x: -1,
          v: 0,
          tension: null,
          friction: null
        },
            path = [0],
            time_lapsed = 0,
            tolerance = 1 / 10000,
            DT = 16 / 1000,
            have_duration, dt, last_state;

        tension = parseFloat(tension) || 500;
        friction = parseFloat(friction) || 20;
        duration = duration || null;

        initState.tension = tension;
        initState.friction = friction;

        have_duration = duration !== null;

        /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
        if (have_duration) {
          /* Run the simulation without a duration. */
          time_lapsed = springRK4Factory(tension, friction);
          /* Compute the adjusted time delta. */
          dt = time_lapsed / duration * DT;
        } else {
          dt = DT;
        }

        while (true) {
          /* Next/step function .*/
          last_state = springIntegrateState(last_state || initState, dt);
          /* Store the position. */
          path.push(1 + last_state.x);
          time_lapsed += 16;
          /* If the change threshold is reached, break. */
          if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
            break;
          }
        }

        /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
         computed path and returns a snapshot of the position according to a given percentComplete. */
        return !have_duration ? time_lapsed : function(percentComplete) {
          return path[ (percentComplete * (path.length - 1)) | 0 ];
        };
      };
    }());

    /* jQuery easings. */
    Velocity.Easings = {
      linear: function(p) {
        return p;
      },
      swing: function(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      },
      /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
      spring: function(p) {
        return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
      }
    };

    /* CSS3 and Robert Penner easings. */
    $.each(
        [
          ["ease", [0.25, 0.1, 0.25, 1.0]],
          ["ease-in", [0.42, 0.0, 1.00, 1.0]],
          ["ease-out", [0.00, 0.0, 0.58, 1.0]],
          ["ease-in-out", [0.42, 0.0, 0.58, 1.0]],
          ["easeInSine", [0.47, 0, 0.745, 0.715]],
          ["easeOutSine", [0.39, 0.575, 0.565, 1]],
          ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
          ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
          ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
          ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
          ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
          ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
          ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
          ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
          ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
          ["easeInOutQuart", [0.77, 0, 0.175, 1]],
          ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
          ["easeOutQuint", [0.23, 1, 0.32, 1]],
          ["easeInOutQuint", [0.86, 0, 0.07, 1]],
          ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
          ["easeOutExpo", [0.19, 1, 0.22, 1]],
          ["easeInOutExpo", [1, 0, 0, 1]],
          ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
          ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
          ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]
        ], function(i, easingArray) {
      Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
    });

    /* Determine the appropriate easing type given an easing input. */
    function getEasing(value, duration) {
      var easing = value;

      /* The easing option can either be a string that references a pre-registered easing,
       or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
      if (Type.isString(value)) {
        /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
        if (!Velocity.Easings[value]) {
          easing = false;
        }
      } else if (Type.isArray(value) && value.length === 1) {
        easing = generateStep.apply(null, value);
      } else if (Type.isArray(value) && value.length === 2) {
        /* springRK4 must be passed the animation's duration. */
        /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
         function generated with default tension and friction values. */
        easing = generateSpringRK4.apply(null, value.concat([duration]));
      } else if (Type.isArray(value) && value.length === 4) {
        /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
        easing = generateBezier.apply(null, value);
      } else {
        easing = false;
      }

      /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
       if the Velocity-wide default has been incorrectly modified. */
      if (easing === false) {
        if (Velocity.Easings[Velocity.defaults.easing]) {
          easing = Velocity.defaults.easing;
        } else {
          easing = EASING_DEFAULT;
        }
      }

      return easing;
    }

    /*****************
     CSS Stack
     *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
     It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
    var CSS = Velocity.CSS = {
      /*************
       RegEx
       *************/

      RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,
        /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
        /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
      },
      /************
       Lists
       ************/

      Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
      },
      /************
       Hooks
       ************/

      /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
       (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
      /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
       tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
      Hooks: {
        /********************
         Registration
         ********************/

        /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
        /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
        templates: {
          "textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
          "boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
          "clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
          "backgroundPosition": ["X Y", "0% 0%"],
          "transformOrigin": ["X Y Z", "50% 50% 0px"],
          "perspectiveOrigin": ["X Y", "50% 50%"]
        },
        /* A "registered" hook is one that has been converted from its template form into a live,
         tweenable property. It contains data to associate it with its root property. */
        registered: {
          /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
           which consists of the subproperty's name, the associated root property's name,
           and the subproperty's position in the root's value. */
        },
        /* Convert the templates into individual hooks then append them to the registered object above. */
        register: function() {
          /* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
           currently set to "transparent" default to their respective template below when color-animated,
           and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
           which is almost always set closer to black than white. */
          for (var i = 0; i < CSS.Lists.colors.length; i++) {
            var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
            CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
          }

          var rootProperty,
              hookTemplate,
              hookNames;

          /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
           Thus, we re-arrange the templates accordingly. */
          if (IE) {
            for (rootProperty in CSS.Hooks.templates) {
              if (!CSS.Hooks.templates.hasOwnProperty(rootProperty)) {
                continue;
              }
              hookTemplate = CSS.Hooks.templates[rootProperty];
              hookNames = hookTemplate[0].split(" ");

              var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

              if (hookNames[0] === "Color") {
                /* Reposition both the hook's name and its default value to the end of their respective strings. */
                hookNames.push(hookNames.shift());
                defaultValues.push(defaultValues.shift());

                /* Replace the existing template for the hook's root property. */
                CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
              }
            }
          }

          /* Hook registration. */
          for (rootProperty in CSS.Hooks.templates) {
            if (!CSS.Hooks.templates.hasOwnProperty(rootProperty)) {
              continue;
            }
            hookTemplate = CSS.Hooks.templates[rootProperty];
            hookNames = hookTemplate[0].split(" ");

            for (var j in hookNames) {
              if (!hookNames.hasOwnProperty(j)) {
                continue;
              }
              var fullHookName = rootProperty + hookNames[j],
                  hookPosition = j;

              /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
               and the hook's position in its template's default value string. */
              CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
            }
          }
        },
        /*****************************
         Injection and Extraction
         *****************************/

        /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
        /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
        getRoot: function(property) {
          var hookData = CSS.Hooks.registered[property];

          if (hookData) {
            return hookData[0];
          } else {
            /* If there was no hook match, return the property name untouched. */
            return property;
          }
        },
        /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
         the targeted hook can be injected or extracted at its standard position. */
        cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
          /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
          if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
            rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
          }

          /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
           default to the root's default value as defined in CSS.Hooks.templates. */
          /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
           zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
          if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
            rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
          }

          return rootPropertyValue;
        },
        /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
        extractValue: function(fullHookName, rootPropertyValue) {
          var hookData = CSS.Hooks.registered[fullHookName];

          if (hookData) {
            var hookRoot = hookData[0],
                hookPosition = hookData[1];

            rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

            /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
            return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
          } else {
            /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
            return rootPropertyValue;
          }
        },
        /* Inject the hook's value into its root property's value. This is used to piece back together the root property
         once Velocity has updated one of its individually hooked values through tweening. */
        injectValue: function(fullHookName, hookValue, rootPropertyValue) {
          var hookData = CSS.Hooks.registered[fullHookName];

          if (hookData) {
            var hookRoot = hookData[0],
                hookPosition = hookData[1],
                rootPropertyValueParts,
                rootPropertyValueUpdated;

            rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

            /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
             then reconstruct the rootPropertyValue string. */
            rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
            rootPropertyValueParts[hookPosition] = hookValue;
            rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

            return rootPropertyValueUpdated;
          } else {
            /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
            return rootPropertyValue;
          }
        }
      },
      /*******************
       Normalizations
       *******************/

      /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
       and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
      Normalizations: {
        /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
         the targeted element (which may need to be queried), and the targeted property value. */
        registered: {
          clip: function(type, element, propertyValue) {
            switch (type) {
              case "name":
                return "clip";
                /* Clip needs to be unwrapped and stripped of its commas during extraction. */
              case "extract":
                var extracted;

                /* If Velocity also extracted this value, skip extraction. */
                if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                  extracted = propertyValue;
                } else {
                  /* Remove the "rect()" wrapper. */
                  extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

                  /* Strip off commas. */
                  extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                }

                return extracted;
                /* Clip needs to be re-wrapped during injection. */
              case "inject":
                return "rect(" + propertyValue + ")";
            }
          },
          blur: function(type, element, propertyValue) {
            switch (type) {
              case "name":
                return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
              case "extract":
                var extracted = parseFloat(propertyValue);

                /* If extracted is NaN, meaning the value isn't already extracted. */
                if (!(extracted || extracted === 0)) {
                  var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

                  /* If the filter string had a blur component, return just the blur value and unit type. */
                  if (blurComponent) {
                    extracted = blurComponent[1];
                    /* If the component doesn't exist, default blur to 0. */
                  } else {
                    extracted = 0;
                  }
                }

                return extracted;
                /* Blur needs to be re-wrapped during injection. */
              case "inject":
                /* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
                if (!parseFloat(propertyValue)) {
                  return "none";
                } else {
                  return "blur(" + propertyValue + ")";
                }
            }
          },
          /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
          opacity: function(type, element, propertyValue) {
            if (IE <= 8) {
              switch (type) {
                case "name":
                  return "filter";
                case "extract":
                  /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                  var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                  if (extracted) {
                    /* Convert to decimal value. */
                    propertyValue = extracted[1] / 100;
                  } else {
                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                    propertyValue = 1;
                  }

                  return propertyValue;
                case "inject":
                  /* Opacified elements are required to have their zoom property set to a non-zero value. */
                  element.style.zoom = 1;

                  /* Setting the filter property on elements with certain font property combinations can result in a
                   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
                  if (parseFloat(propertyValue) >= 1) {
                    return "";
                  } else {
                    /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                    return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                  }
              }
              /* With all other browsers, normalization is not required; return the same values that were passed in. */
            } else {
              switch (type) {
                case "name":
                  return "opacity";
                case "extract":
                  return propertyValue;
                case "inject":
                  return propertyValue;
              }
            }
          }
        },
        /*****************************
         Batched Registrations
         *****************************/

        /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
        register: function() {

          /*****************
           Transforms
           *****************/

          /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
           so that they can be referenced in a properties map by their individual names. */
          /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
           setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
           Transform setting is batched in this way to improve performance: the transform style only needs to be updated
           once when multiple transform subproperties are being animated simultaneously. */
          /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
           transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
           from being normalized for these browsers so that tweening skips these properties altogether
           (since it will ignore them as being unsupported by the browser.) */
          if ((!IE || IE > 9) && !Velocity.State.isGingerbread) {
            /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
             share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
            CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
          }

          for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
            /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
             paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
            (function() {
              var transformName = CSS.Lists.transformsBase[i];

              CSS.Normalizations.registered[transformName] = function(type, element, propertyValue) {
                switch (type) {
                  /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                  case "name":
                    return "transform";
                    /* Transform values are cached onto a per-element transformCache object. */
                  case "extract":
                    /* If this transform has yet to be assigned a value, return its null value. */
                    if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                      /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                      return /^scale/i.test(transformName) ? 1 : 0;
                      /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                       Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                    }
                    return Data(element).transformCache[transformName].replace(/[()]/g, "");
                  case "inject":
                    var invalid = false;

                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                     Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
                    switch (transformName.substr(0, transformName.length - 1)) {
                      /* Whitelist unit types for each transform. */
                      case "translate":
                        invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                        break;
                        /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
                      case "scal":
                      case "scale":
                        /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                         value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                         and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                        if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                          propertyValue = 1;
                        }

                        invalid = !/(\d)$/i.test(propertyValue);
                        break;
                      case "skew":
                        invalid = !/(deg|\d)$/i.test(propertyValue);
                        break;
                      case "rotate":
                        invalid = !/(deg|\d)$/i.test(propertyValue);
                        break;
                    }

                    if (!invalid) {
                      /* As per the CSS spec, wrap the value in parentheses. */
                      Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                    }

                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
                    return Data(element).transformCache[transformName];
                }
              };
            })();
          }

          /*************
           Colors
           *************/

          /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
           Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
          for (var j = 0; j < CSS.Lists.colors.length; j++) {
            /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
             (Otherwise, all functions would take the final for loop's colorName.) */
            (function() {
              var colorName = CSS.Lists.colors[j];

              /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
              CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                switch (type) {
                  case "name":
                    return colorName;
                    /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                  case "extract":
                    var extracted;

                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                      extracted = propertyValue;
                    } else {
                      var converted,
                          colorNames = {
                            black: "rgb(0, 0, 0)",
                            blue: "rgb(0, 0, 255)",
                            gray: "rgb(128, 128, 128)",
                            green: "rgb(0, 128, 0)",
                            red: "rgb(255, 0, 0)",
                            white: "rgb(255, 255, 255)"
                          };

                      /* Convert color names to rgb. */
                      if (/^[A-z]+$/i.test(propertyValue)) {
                        if (colorNames[propertyValue] !== undefined) {
                          converted = colorNames[propertyValue];
                        } else {
                          /* If an unmatched color name is provided, default to black. */
                          converted = colorNames.black;
                        }
                        /* Convert hex values to rgb. */
                      } else if (CSS.RegEx.isHex.test(propertyValue)) {
                        converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                        /* If the provided color doesn't match any of the accepted color formats, default to black. */
                      } else if (!(/^rgba?\(/i.test(propertyValue))) {
                        converted = colorNames.black;
                      }

                      /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                       repeated spaces (in case the value included spaces to begin with). */
                      extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }

                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                    if ((!IE || IE > 8) && extracted.split(" ").length === 3) {
                      extracted += " 1";
                    }

                    return extracted;
                  case "inject":
                    /* If we have a pattern then it might already have the right values */
                    if (/^rgb/.test(propertyValue)) {
                      return propertyValue;
                    }

                    /* If this is IE<=8 and an alpha component exists, strip it off. */
                    if (IE <= 8) {
                      if (propertyValue.split(" ").length === 4) {
                        propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                      }
                      /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                    } else if (propertyValue.split(" ").length === 3) {
                      propertyValue += " 1";
                    }

                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                     on all values but the fourth (R, G, and B only accept whole numbers). */
                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                }
              };
            })();
          }

          /**************
           Dimensions
           **************/
          function augmentDimension(name, element, wantInner) {
            var isBorderBox = CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() === "border-box";

            if (isBorderBox === (wantInner || false)) {
              /* in box-sizing mode, the CSS width / height accessors already give the outerWidth / outerHeight. */
              var i,
                  value,
                  augment = 0,
                  sides = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"],
                  fields = ["padding" + sides[0], "padding" + sides[1], "border" + sides[0] + "Width", "border" + sides[1] + "Width"];

              for (i = 0; i < fields.length; i++) {
                value = parseFloat(CSS.getPropertyValue(element, fields[i]));
                if (!isNaN(value)) {
                  augment += value;
                }
              }
              return wantInner ? -augment : augment;
            }
            return 0;
          }
          function getDimension(name, wantInner) {
            return function(type, element, propertyValue) {
              switch (type) {
                case "name":
                  return name;
                case "extract":
                  return parseFloat(propertyValue) + augmentDimension(name, element, wantInner);
                case "inject":
                  return (parseFloat(propertyValue) - augmentDimension(name, element, wantInner)) + "px";
              }
            };
          }
          CSS.Normalizations.registered.innerWidth = getDimension("width", true);
          CSS.Normalizations.registered.innerHeight = getDimension("height", true);
          CSS.Normalizations.registered.outerWidth = getDimension("width");
          CSS.Normalizations.registered.outerHeight = getDimension("height");
        }
      },
      /************************
       CSS Property Names
       ************************/

      Names: {
        /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
         Camelcasing is used to normalize property names between and across calls. */
        camelCase: function(property) {
          return property.replace(/-(\w)/g, function(match, subMatch) {
            return subMatch.toUpperCase();
          });
        },
        /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
        SVGAttribute: function(property) {
          var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

          /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
          if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
            SVGAttributes += "|transform";
          }

          return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
        },
        /* Determine whether a property should be set with a vendor prefix. */
        /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
         If the property is not at all supported by the browser, return a false flag. */
        prefixCheck: function(property) {
          /* If this property has already been checked, return the cached value. */
          if (Velocity.State.prefixMatches[property]) {
            return [Velocity.State.prefixMatches[property], true];
          } else {
            var vendors = ["", "Webkit", "Moz", "ms", "O"];

            for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
              var propertyPrefixed;

              if (i === 0) {
                propertyPrefixed = property;
              } else {
                /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) {
                  return match.toUpperCase();
                });
              }

              /* Check if the browser supports this property as prefixed. */
              if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                /* Cache the match. */
                Velocity.State.prefixMatches[property] = propertyPrefixed;

                return [propertyPrefixed, true];
              }
            }

            /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
            return [property, false];
          }
        }
      },
      /************************
       CSS Property Values
       ************************/

      Values: {
        /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
        hexToRgb: function(hex) {
          var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
              rgbParts;

          hex = hex.replace(shortformRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
          });

          rgbParts = longformRegex.exec(hex);

          return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
        },
        isCSSNullValue: function(value) {
          /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
           Thus, we check for both falsiness and these special strings. */
          /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
           templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
          /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
          return (!value || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
        },
        /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
        getUnitType: function(property) {
          if (/^(rotate|skew)/i.test(property)) {
            return "deg";
          } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
            /* The above properties are unitless. */
            return "";
          } else {
            /* Default to px for all other properties. */
            return "px";
          }
        },
        /* HTML elements default to an associated display type when they're not set to display:none. */
        /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
        getDisplayType: function(element) {
          var tagName = element && element.tagName.toString().toLowerCase();

          if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
            return "inline";
          } else if (/^(li)$/i.test(tagName)) {
            return "list-item";
          } else if (/^(tr)$/i.test(tagName)) {
            return "table-row";
          } else if (/^(table)$/i.test(tagName)) {
            return "table";
          } else if (/^(tbody)$/i.test(tagName)) {
            return "table-row-group";
            /* Default to "block" when no match is found. */
          } else {
            return "block";
          }
        },
        /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
        addClass: function(element, className) {
          if (element) {
            if (element.classList) {
              element.classList.add(className);
            } else if (Type.isString(element.className)) {
              // Element.className is around 15% faster then set/getAttribute
              element.className += (element.className.length ? " " : "") + className;
            } else {
              // Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
              var currentClass = element.getAttribute(IE <= 7 ? "className" : "class") || "";

              element.setAttribute("class", currentClass + (currentClass ? " " : "") + className);
            }
          }
        },
        removeClass: function(element, className) {
          if (element) {
            if (element.classList) {
              element.classList.remove(className);
            } else if (Type.isString(element.className)) {
              // Element.className is around 15% faster then set/getAttribute
              // TODO: Need some jsperf tests on performance - can we get rid of the regex and maybe use split / array manipulation?
              element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
            } else {
              // Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
              var currentClass = element.getAttribute(IE <= 7 ? "className" : "class") || "";

              element.setAttribute("class", currentClass.replace(new RegExp("(^|\s)" + className.split(" ").join("|") + "(\s|$)", "gi"), " "));
            }
          }
        }
      },
      /****************************
       Style Getting & Setting
       ****************************/

      /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
      getPropertyValue: function(element, property, rootPropertyValue, forceStyleLookup) {
        /* Get an element's computed property value. */
        /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
         style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
         *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
        function computePropertyValue(element, property) {
          /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
           element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
           offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
           We subtract border and padding to get the sum of interior + scrollbar. */
          var computedValue = 0;

          /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
           of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
           codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
           Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
          if (IE <= 8) {
            computedValue = $.css(element, property); /* GET */
            /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
             associated element so that it does not need to be refetched upon every GET. */
          } else {
            /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
             toggle display to the element type's default value. */
            var toggleDisplay = false;

            if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
              toggleDisplay = true;
              CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
            }

            var revertDisplay = function() {
              if (toggleDisplay) {
                CSS.setPropertyValue(element, "display", "none");
              }
            };

            if (!forceStyleLookup) {
              if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                revertDisplay();

                return contentBoxHeight;
              } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                revertDisplay();

                return contentBoxWidth;
              }
            }

            var computedStyle;

            /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
             of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
            if (Data(element) === undefined) {
              computedStyle = window.getComputedStyle(element, null); /* GET */
              /* If the computedStyle object has yet to be cached, do so now. */
            } else if (!Data(element).computedStyle) {
              computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
              /* If computedStyle is cached, use it. */
            } else {
              computedStyle = Data(element).computedStyle;
            }

            /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
             Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
             So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
            if (property === "borderColor") {
              property = "borderTopColor";
            }

            /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
             instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
            if (IE === 9 && property === "filter") {
              computedValue = computedStyle.getPropertyValue(property); /* GET */
            } else {
              computedValue = computedStyle[property];
            }

            /* Fall back to the property's style value (if defined) when computedValue returns nothing,
             which can happen when the element hasn't been painted. */
            if (computedValue === "" || computedValue === null) {
              computedValue = element.style[property];
            }

            revertDisplay();
          }

          /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
           defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
           effect as being set to 0, so no conversion is necessary.) */
          /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
           property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
           to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
          if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
            var position = computePropertyValue(element, "position"); /* GET */

            /* For absolute positioning, jQuery's $.position() only returns values for top and left;
             right and bottom will have their "auto" value reverted to 0. */
            /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
             Not a big deal since we're currently in a GET batch anyway. */
            if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
              /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
              computedValue = $(element).position()[property] + "px"; /* GET */
            }
          }

          return computedValue;
        }

        var propertyValue;

        /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
         extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
        if (CSS.Hooks.registered[property]) {
          var hook = property,
              hookRoot = CSS.Hooks.getRoot(hook);

          /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
           query the DOM for the root property's value. */
          if (rootPropertyValue === undefined) {
            /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
            rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
          }

          /* If this root has a normalization registered, peform the associated normalization extraction. */
          if (CSS.Normalizations.registered[hookRoot]) {
            rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
          }

          /* Extract the hook's value. */
          propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

          /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
           normalize the property's name and value, and handle the special case of transforms. */
          /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
           numerical and therefore do not require normalization extraction. */
        } else if (CSS.Normalizations.registered[property]) {
          var normalizedPropertyName,
              normalizedPropertyValue;

          normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

          /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
           At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
           This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
           thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
          if (normalizedPropertyName !== "transform") {
            normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

            /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
            if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
              normalizedPropertyValue = CSS.Hooks.templates[property][1];
            }
          }

          propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
        }

        /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
        if (!/^[\d-]/.test(propertyValue)) {
          /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
           their HTML attribute values instead of their CSS style values. */
          var data = Data(element);

          if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
            /* Since the height/width attribute values must be set manually, they don't reflect computed values.
             Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
            if (/^(height|width)$/i.test(property)) {
              /* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
              try {
                propertyValue = element.getBBox()[property];
              } catch (error) {
                propertyValue = 0;
              }
              /* Otherwise, access the attribute value directly. */
            } else {
              propertyValue = element.getAttribute(property);
            }
          } else {
            propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
          }
        }

        /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
         convert CSS null-values to an integer of value 0. */
        if (CSS.Values.isCSSNullValue(propertyValue)) {
          propertyValue = 0;
        }

        if (Velocity.debug >= 2) {
          console.log("Get " + property + ": " + propertyValue);
        }

        return propertyValue;
      },
      /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
      setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
        var propertyName = property;

        /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
        if (property === "scroll") {
          /* If a container option is present, scroll the container instead of the browser window. */
          if (scrollData.container) {
            scrollData.container["scroll" + scrollData.direction] = propertyValue;
            /* Otherwise, Velocity defaults to scrolling the browser window. */
          } else {
            if (scrollData.direction === "Left") {
              window.scrollTo(propertyValue, scrollData.alternateValue);
            } else {
              window.scrollTo(scrollData.alternateValue, propertyValue);
            }
          }
        } else {
          /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
           Thus, for now, we merely cache transforms being SET. */
          if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
            /* Perform a normalization injection. */
            /* Note: The normalization logic handles the transformCache updating. */
            CSS.Normalizations.registered[property]("inject", element, propertyValue);

            propertyName = "transform";
            propertyValue = Data(element).transformCache[property];
          } else {
            /* Inject hooks. */
            if (CSS.Hooks.registered[property]) {
              var hookName = property,
                  hookRoot = CSS.Hooks.getRoot(property);

              /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
              rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

              propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
              property = hookRoot;
            }

            /* Normalize names and values. */
            if (CSS.Normalizations.registered[property]) {
              propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
              property = CSS.Normalizations.registered[property]("name", element);
            }

            /* Assign the appropriate vendor prefix before performing an official style update. */
            propertyName = CSS.Names.prefixCheck(property)[0];

            /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
             Try/catch is avoided for other browsers since it incurs a performance overhead. */
            if (IE <= 8) {
              try {
                element.style[propertyName] = propertyValue;
              } catch (error) {
                if (Velocity.debug) {
                  console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
                }
              }
              /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
              /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
            } else {
              var data = Data(element);

              if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
                /* Note: For SVG attributes, vendor-prefixed property names are never used. */
                /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
                element.setAttribute(property, propertyValue);
              } else {
                element.style[propertyName] = propertyValue;
              }
            }

            if (Velocity.debug >= 2) {
              console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
            }
          }
        }

        /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
        return [propertyName, propertyValue];
      },
      /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
      /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
      flushTransformCache: function(element) {
        var transformString = "",
            data = Data(element);

        /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
         (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
        if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && data && data.isSVG) {
          /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
           Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
          var getTransformFloat = function(transformProperty) {
            return parseFloat(CSS.getPropertyValue(element, transformProperty));
          };

          /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
           we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
          var SVGTransforms = {
            translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
            skewX: [getTransformFloat("skewX")], skewY: [getTransformFloat("skewY")],
            /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
             (this behavior mimics the result of animating all these properties at once on HTML elements). */
            scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
            /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
             defining the rotation's origin point. We ignore the origin values (default them to 0). */
            rotate: [getTransformFloat("rotateZ"), 0, 0]
          };

          /* Iterate through the transform properties in the user-defined property map order.
           (This mimics the behavior of non-SVG transform animation.) */
          $.each(Data(element).transformCache, function(transformName) {
            /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
             properties so that they match up with SVG's accepted transform properties. */
            if (/^translate/i.test(transformName)) {
              transformName = "translate";
            } else if (/^scale/i.test(transformName)) {
              transformName = "scale";
            } else if (/^rotate/i.test(transformName)) {
              transformName = "rotate";
            }

            /* Check that we haven't yet deleted the property from the SVGTransforms container. */
            if (SVGTransforms[transformName]) {
              /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
              transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

              /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
               re-insert the same master property if we encounter another one of its axis-specific properties. */
              delete SVGTransforms[transformName];
            }
          });
        } else {
          var transformValue,
              perspective;

          /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
          $.each(Data(element).transformCache, function(transformName) {
            transformValue = Data(element).transformCache[transformName];

            /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
            if (transformName === "transformPerspective") {
              perspective = transformValue;
              return true;
            }

            /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
            if (IE === 9 && transformName === "rotateZ") {
              transformName = "rotate";
            }

            transformString += transformName + transformValue + " ";
          });

          /* If present, set the perspective subproperty first. */
          if (perspective) {
            transformString = "perspective" + perspective + " " + transformString;
          }
        }

        CSS.setPropertyValue(element, "transform", transformString);
      }
    };

    /* Register hooks and normalizations. */
    CSS.Hooks.register();
    CSS.Normalizations.register();

    /* Allow hook setting in the same fashion as jQuery's $.css(). */
    Velocity.hook = function(elements, arg2, arg3) {
      var value;

      elements = sanitizeElements(elements);

      $.each(elements, function(i, element) {
        /* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
        if (Data(element) === undefined) {
          Velocity.init(element);
        }

        /* Get property value. If an element set was passed in, only return the value for the first element. */
        if (arg3 === undefined) {
          if (value === undefined) {
            value = CSS.getPropertyValue(element, arg2);
          }
          /* Set property value. */
        } else {
          /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
          var adjustedSet = CSS.setPropertyValue(element, arg2, arg3);

          /* Transform properties don't automatically set. They have to be flushed to the DOM. */
          if (adjustedSet[0] === "transform") {
            Velocity.CSS.flushTransformCache(element);
          }

          value = adjustedSet;
        }
      });

      return value;
    };

    /*****************
     Animation
     *****************/

    var animate = function() {
      var opts;

      /******************
       Call Chain
       ******************/

      /* Logic for determining what to return to the call stack when exiting out of Velocity. */
      function getChain() {
        /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
         default to null instead of returning the targeted elements so that utility function's return value is standardized. */
        if (isUtility) {
          return promiseData.promise || null;
          /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
        } else {
          return elementsWrapped;
        }
      }

      /*************************
       Arguments Assignment
       *************************/

      /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
       objects are defined on a container object that's passed in as Velocity's sole argument. */
      /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
      var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
          /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
          isUtility,
          /* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
           passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
          elementsWrapped,
          argumentIndex;

      var elements,
          propertiesMap,
          options;

      /* Detect jQuery/Zepto elements being animated via the $.fn method. */
      if (Type.isWrapped(this)) {
        isUtility = false;

        argumentIndex = 0;
        elements = this;
        elementsWrapped = this;
        /* Otherwise, raw elements are being animated via the utility function. */
      } else {
        isUtility = true;

        argumentIndex = 1;
        elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
      }

      /***************
       Promises
       ***************/

      var promiseData = {
        promise: null,
        resolver: null,
        rejecter: null
      };

      /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
       promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
       method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
       call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
      /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
       triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
       grouped together for the purposes of resolving and rejecting a promise. */
      if (isUtility && Velocity.Promise) {
        promiseData.promise = new Velocity.Promise(function(resolve, reject) {
          promiseData.resolver = resolve;
          promiseData.rejecter = reject;
        });
      }

      if (syntacticSugar) {
        propertiesMap = arguments[0].properties || arguments[0].p;
        options = arguments[0].options || arguments[0].o;
      } else {
        propertiesMap = arguments[argumentIndex];
        options = arguments[argumentIndex + 1];
      }

      elements = sanitizeElements(elements);

      if (!elements) {
        if (promiseData.promise) {
          if (!propertiesMap || !options || options.promiseRejectEmpty !== false) {
            promiseData.rejecter();
          } else {
            promiseData.resolver();
          }
        }
        return;
      }

      /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
       single raw DOM element is passed in (which doesn't contain a length property). */
      var elementsLength = elements.length,
          elementsIndex = 0;

      /***************************
       Argument Overloading
       ***************************/

      /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
       Overloading is detected by checking for the absence of an object being passed into options. */
      /* Note: The stop/finish/pause/resume actions do not accept animation options, and are therefore excluded from this check. */
      if (!/^(stop|finish|finishAll|pause|resume)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
        /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
        var startingArgumentPosition = argumentIndex + 1;

        options = {};

        /* Iterate through all options arguments */
        for (var i = startingArgumentPosition; i < arguments.length; i++) {
          /* Treat a number as a duration. Parse it out. */
          /* Note: The following RegEx will return true if passed an array with a number as its first item.
           Thus, arrays are skipped from this check. */
          if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
            options.duration = arguments[i];
            /* Treat strings and arrays as easings. */
          } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
            options.easing = arguments[i];
            /* Treat a function as a complete callback. */
          } else if (Type.isFunction(arguments[i])) {
            options.complete = arguments[i];
          }
        }
      }

      /*********************
       Action Detection
       *********************/

      /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
       or they can be started, stopped, paused, resumed, or reversed . If a literal or referenced properties map is passed in as Velocity's
       first argument, the associated action is "start". Alternatively, "scroll", "reverse", "pause", "resume" or "stop" can be passed in 
       instead of a properties map. */
      var action;

      switch (propertiesMap) {
        case "scroll":
          action = "scroll";
          break;

        case "reverse":
          action = "reverse";
          break;

        case "pause":
          
          /*******************
           Action: Pause
           *******************/

          var currentTime = (new Date()).getTime();

          /* Handle delay timers */
          $.each(elements, function(i, element) {
            pauseDelayOnElement(element, currentTime);
          });

          /* Pause and Resume are call-wide (not on a per element basis). Thus, calling pause or resume on a 
          single element will cause any calls that containt tweens for that element to be paused/resumed
          as well. */

          /* Iterate through all calls and pause any that contain any of our elements */
          $.each(Velocity.State.calls, function(i, activeCall) {
            
            var found = false;
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function(k, activeElement) {
                var queueName = (options === undefined) ? "" : options;

                if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }

                /* Iterate through the calls targeted by the stop command. */
                $.each(elements, function(l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {

                    /* Set call to paused */
                    activeCall[5] = {
                      resume:false
                    };

                    /* Once we match an element, we can bounce out to the next call entirely */
                    found = true;
                    return false;
                  }
                });

                /* Proceed to check next call if we have already matched */
                if(found) {
                  return false;
                }
              });
            }

          });

          /* Since pause creates no new tweens, exit out of Velocity. */
          return getChain();

        case "resume":

          /*******************
           Action: Resume
           *******************/

          /* Handle delay timers */
          $.each(elements, function(i, element) {
            resumeDelayOnElement(element, currentTime);
          });
          
          /* Pause and Resume are call-wide (not on a per elemnt basis). Thus, calling pause or resume on a 
          single element will cause any calls that containt tweens for that element to be paused/resumed
          as well. */

          /* Iterate through all calls and pause any that contain any of our elements */
          $.each(Velocity.State.calls, function(i, activeCall) {
            var found = false;
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function(k, activeElement) {
                var queueName = (options === undefined) ? "" : options;

                if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }

                /* Skip any calls that have never been paused */
                if(!activeCall[5]) {
                  return true;
                }

                /* Iterate through the calls targeted by the stop command. */
                $.each(elements, function(l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {
                    
                    /* Flag a pause object to be resumed, which will occur during the next tick. In
                    addition, the pause object will at that time be deleted */
                    activeCall[5].resume = true;
                    
                    /* Once we match an element, we can bounce out to the next call entirely */
                    found = true;
                    return false;
                  }
                });

                /* Proceed to check next call if we have already matched */
                if(found) {
                  return false;
                }
              });
            }

          });
          
          /* Since resume creates no new tweens, exit out of Velocity. */
          return getChain();

        case "finish":
        case "finishAll":
        case "stop":
          /*******************
           Action: Stop
           *******************/

          /* Clear the currently-active delay on each targeted element. */
          $.each(elements, function(i, element) {
            if (Data(element) && Data(element).delayTimer) {
              /* Stop the timer from triggering its cached next() function. */
              clearTimeout(Data(element).delayTimer.setTimeout);

              /* Manually call the next() function so that the subsequent queue items can progress. */
              if (Data(element).delayTimer.next) {
                Data(element).delayTimer.next();
              }

              delete Data(element).delayTimer;
            }

            /* If we want to finish everything in the queue, we have to iterate through it
             and call each function. This will make them active calls below, which will
             cause them to be applied via the duration setting. */
            if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
              /* Iterate through the items in the element's queue. */
              $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                /* The queue array can contain an "inprogress" string, which we skip. */
                if (Type.isFunction(item)) {
                  item();
                }
              });

              /* Clearing the $.queue() array is achieved by resetting it to []. */
              $.queue(element, Type.isString(options) ? options : "", []);
            }
          });

          var callsToStop = [];

          /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
           been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
           is stopped, the next item in its animation queue is immediately triggered. */
          /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
           or a custom queue string can be passed in. */
          /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
           regardless of the element's current queue state. */

          /* Iterate through every active call. */
          $.each(Velocity.State.calls, function(i, activeCall) {
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function(k, activeElement) {
                /* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
                 clear calls associated with the relevant queue. */
                /* Call stopping logic works as follows:
                 - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
                 - options === undefined --> stop current queue:"" call and all queue:false calls.
                 - options === false --> stop only queue:false calls.
                 - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
                var queueName = (options === undefined) ? "" : options;

                if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }

                /* Iterate through the calls targeted by the stop command. */
                $.each(elements, function(l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {
                    /* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
                     due to the queue-clearing above. */
                    if (options === true || Type.isString(options)) {
                      /* Iterate through the items in the element's queue. */
                      $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                        /* The queue array can contain an "inprogress" string, which we skip. */
                        if (Type.isFunction(item)) {
                          /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                           (Specifically, the queue will resolve the call's associated promise then abort.)  */
                          item(null, true);
                        }
                      });

                      /* Clearing the $.queue() array is achieved by resetting it to []. */
                      $.queue(element, Type.isString(options) ? options : "", []);
                    }

                    if (propertiesMap === "stop") {
                      /* Since "reverse" uses cached start values (the previous call's endValues), these values must be
                       changed to reflect the final value that the elements were actually tweened to. */
                      /* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
                       object. Also, queue:false animations can't be reversed. */
                      var data = Data(element);
                      if (data && data.tweensContainer && queueName !== false) {
                        $.each(data.tweensContainer, function(m, activeTween) {
                          activeTween.endValue = activeTween.currentValue;
                        });
                      }

                      callsToStop.push(i);
                    } else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
                      /* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
                       they finish upon the next rAf tick then proceed with normal call completion logic. */
                      activeCall[2].duration = 1;
                    }
                  }
                });
              });
            }
          });

          /* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
           that the complete callback and display:none setting should be skipped since we're completing prematurely. */
          if (propertiesMap === "stop") {
            $.each(callsToStop, function(i, j) {
              completeCall(j, true);
            });

            if (promiseData.promise) {
              /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
              promiseData.resolver(elements);
            }
          }

          /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
          return getChain();

        default:
          /* Treat a non-empty plain object as a literal properties map. */
          if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
            action = "start";

            /****************
             Redirects
             ****************/

            /* Check if a string matches a registered redirect (see Redirects above). */
          } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
            opts = $.extend({}, options);

            var durationOriginal = opts.duration,
                delayOriginal = opts.delay || 0;

            /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
            if (opts.backwards === true) {
              elements = $.extend(true, [], elements).reverse();
            }

            /* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
            $.each(elements, function(elementIndex, element) {
              /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
              if (parseFloat(opts.stagger)) {
                opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
              } else if (Type.isFunction(opts.stagger)) {
                opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
              }

              /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
               the duration of each element's animation, using floors to prevent producing very short durations. */
              if (opts.drag) {
                /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

                /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                 B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                 The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
                opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
              }

              /* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
               reduce the opts checking logic required inside the redirect. */
              Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
            });

            /* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
             (The performance overhead up to this point is virtually non-existant.) */
            /* Note: The jQuery call chain is kept intact by returning the complete element set. */
            return getChain();
          } else {
            var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

            if (promiseData.promise) {
              promiseData.rejecter(new Error(abortError));
            } else {
              console.log(abortError);
            }

            return getChain();
          }
      }

      /**************************
       Call-Wide Variables
       **************************/

      /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
       being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
       avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
       conversion metrics across Velocity animations that are not immediately consecutively chained. */
      var callUnitConversionData = {
        lastParent: null,
        lastPosition: null,
        lastFontSize: null,
        lastPercentToPxWidth: null,
        lastPercentToPxHeight: null,
        lastEmToPx: null,
        remToPx: null,
        vwToPx: null,
        vhToPx: null
      };

      /* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
       Velocity.State.calls array that is processed during animation ticking. */
      var call = [];

      /************************
       Element Processing
       ************************/

      /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
       1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
       2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
       3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
       `elementArrayIndex` allows passing index of the element in the original array to value functions.
       If `elementsIndex` were used instead the index would be determined by the elements' per-element queue.
       */
      function processElement(element, elementArrayIndex) {

        /*************************
         Part I: Pre-Queueing
         *************************/

        /***************************
         Element-Wide Variables
         ***************************/

        var /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
            opts = $.extend({}, Velocity.defaults, options),
            /* A container for the processed data associated with each property in the propertyMap.
             (Each property in the map produces its own "tween".) */
            tweensContainer = {},
            elementUnitConversionData;

        /******************
         Element Init
         ******************/

        if (Data(element) === undefined) {
          Velocity.init(element);
        }

        /******************
         Option: Delay
         ******************/

        /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
        /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
         (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
        if (parseFloat(opts.delay) && opts.queue !== false) {
          $.queue(element, opts.queue, function(next) {
            /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
            Velocity.velocityQueueEntryFlag = true;

            /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
             The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command, and
             delayBegin/delayTime is used to ensure we can "pause" and "resume" a tween that is still mid-delay. */

            /* Temporarily store delayed elements to facilite access for global pause/resume */
            var callIndex = Velocity.State.delayedElements.count ++;
            Velocity.State.delayedElements[callIndex] = element;

            var delayComplete = (function(index) {
              return function() {
                /* Clear the temporary element */
                Velocity.State.delayedElements[index] = false;

                /* Finally, issue the call */
                next();
              };
            })(callIndex);


            Data(element).delayBegin = (new Date()).getTime();
            Data(element).delay = parseFloat(opts.delay);
            Data(element).delayTimer = {
              setTimeout: setTimeout(next, parseFloat(opts.delay)),
              next: delayComplete
            };
          });
        }

        /*********************
         Option: Duration
         *********************/

        /* Support for jQuery's named durations. */
        switch (opts.duration.toString().toLowerCase()) {
          case "fast":
            opts.duration = 200;
            break;

          case "normal":
            opts.duration = DURATION_DEFAULT;
            break;

          case "slow":
            opts.duration = 600;
            break;

          default:
            /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
            opts.duration = parseFloat(opts.duration) || 1;
        }

        /************************
         Global Option: Mock
         ************************/

        if (Velocity.mock !== false) {
          /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
           Alternatively, a multiplier can be passed in to time remap all delays and durations. */
          if (Velocity.mock === true) {
            opts.duration = opts.delay = 1;
          } else {
            opts.duration *= parseFloat(Velocity.mock) || 1;
            opts.delay *= parseFloat(Velocity.mock) || 1;
          }
        }

        /*******************
         Option: Easing
         *******************/

        opts.easing = getEasing(opts.easing, opts.duration);

        /**********************
         Option: Callbacks
         **********************/

        /* Callbacks must functions. Otherwise, default to null. */
        if (opts.begin && !Type.isFunction(opts.begin)) {
          opts.begin = null;
        }

        if (opts.progress && !Type.isFunction(opts.progress)) {
          opts.progress = null;
        }

        if (opts.complete && !Type.isFunction(opts.complete)) {
          opts.complete = null;
        }

        /*********************************
         Option: Display & Visibility
         *********************************/

        /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
        /* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
        if (opts.display !== undefined && opts.display !== null) {
          opts.display = opts.display.toString().toLowerCase();

          /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
          if (opts.display === "auto") {
            opts.display = Velocity.CSS.Values.getDisplayType(element);
          }
        }

        if (opts.visibility !== undefined && opts.visibility !== null) {
          opts.visibility = opts.visibility.toString().toLowerCase();
        }

        /**********************
         Option: mobileHA
         **********************/

        /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
         on animating elements. HA is removed from the element at the completion of its animation. */
        /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
        /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
        opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

        /***********************
         Part II: Queueing
         ***********************/

        /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
         In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
        /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
         the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
        function buildQueue(next) {
          var data, lastTweensContainer;

          /*******************
           Option: Begin
           *******************/

          /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
          if (opts.begin && elementsIndex === 0) {
            /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
            try {
              opts.begin.call(elements, elements);
            } catch (error) {
              setTimeout(function() {
                throw error;
              }, 1);
            }
          }

          /*****************************************
           Tween Data Construction (for Scroll)
           *****************************************/

          /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
          if (action === "scroll") {
            /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
            var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                scrollOffset = parseFloat(opts.offset) || 0,
                scrollPositionCurrent,
                scrollPositionCurrentAlternate,
                scrollPositionEnd;

            /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
             as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
            if (opts.container) {
              /* Ensure that either a jQuery object or a raw DOM element was passed in. */
              if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
                /* Extract the raw DOM element from the jQuery wrapper. */
                opts.container = opts.container[0] || opts.container;
                /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                 (due to the user's natural interaction with the page). */
                scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

                /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                 -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                 the scroll container's current scroll position. */
                scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
                /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
              } else {
                opts.container = null;
              }
            } else {
              /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
               the appropriate cached property names (which differ based on browser type). */
              scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
              /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
              scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

              /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
               and therefore end values do not need to be compounded onto current values. */
              scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
            }

            /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
            tweensContainer = {
              scroll: {
                rootPropertyValue: false,
                startValue: scrollPositionCurrent,
                currentValue: scrollPositionCurrent,
                endValue: scrollPositionEnd,
                unitType: "",
                easing: opts.easing,
                scrollData: {
                  container: opts.container,
                  direction: scrollDirection,
                  alternateValue: scrollPositionCurrentAlternate
                }
              },
              element: element
            };

            if (Velocity.debug) {
              console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
            }

            /******************************************
             Tween Data Construction (for Reverse)
             ******************************************/

            /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
             that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
             the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
            /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
            /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
             there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
             as reverting to the element's values as they were prior to the previous *Velocity* call. */
          } else if (action === "reverse") {
            data = Data(element);

            /* Abort if there is no prior animation data to reverse to. */
            if (!data) {
              return;
            }

            if (!data.tweensContainer) {
              /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
              $.dequeue(element, opts.queue);

              return;
            } else {
              /*********************
               Options Parsing
               *********************/

              /* If the element was hidden via the display option in the previous call,
               revert display to "auto" prior to reversal so that the element is visible again. */
              if (data.opts.display === "none") {
                data.opts.display = "auto";
              }

              if (data.opts.visibility === "hidden") {
                data.opts.visibility = "visible";
              }

              /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
               Further, remove the previous call's callback options; typically, users do not want these to be refired. */
              data.opts.loop = false;
              data.opts.begin = null;
              data.opts.complete = null;

              /* Since we're extending an opts object that has already been extended with the defaults options object,
               we remove non-explicitly-defined properties that are auto-assigned values. */
              if (!options.easing) {
                delete opts.easing;
              }

              if (!options.duration) {
                delete opts.duration;
              }

              /* The opts object used for reversal is an extension of the options object optionally passed into this
               reverse call plus the options used in the previous Velocity call. */
              opts = $.extend({}, data.opts, opts);

              /*************************************
               Tweens Container Reconstruction
               *************************************/

              /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
              lastTweensContainer = $.extend(true, {}, data ? data.tweensContainer : null);

              /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
              for (var lastTween in lastTweensContainer) {
                /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                if (lastTweensContainer.hasOwnProperty(lastTween) && lastTween !== "element") {
                  var lastStartValue = lastTweensContainer[lastTween].startValue;

                  lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                  lastTweensContainer[lastTween].endValue = lastStartValue;

                  /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
                  if (!Type.isEmptyObject(options)) {
                    lastTweensContainer[lastTween].easing = opts.easing;
                  }

                  if (Velocity.debug) {
                    console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                  }
                }
              }

              tweensContainer = lastTweensContainer;
            }

            /*****************************************
             Tween Data Construction (for Start)
             *****************************************/

          } else if (action === "start") {

            /*************************
             Value Transferring
             *************************/

            /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
             while the element was in the process of being animated by Velocity, then this current call is safe to use
             the end values from the prior call as its start values. Velocity attempts to perform this value transfer
             process whenever possible in order to avoid requerying the DOM. */
            /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
             then the DOM is queried for the element's current values as a last resort. */
            /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */

            data = Data(element);

            /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
             to transfer over end values to use as start values. If it's set to true and there is a previous
             Velocity call to pull values from, do so. */
            if (data && data.tweensContainer && data.isAnimating === true) {
              lastTweensContainer = data.tweensContainer;
            }

            /***************************
             Tween Data Calculation
             ***************************/

            /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
            /* Property map values can either take the form of 1) a single value representing the end value,
             or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
             The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
             the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
            var parsePropertyValue = function(valueData, skipResolvingEasing) {
              var endValue, easing, startValue;

              /* If we have a function as the main argument then resolve it first, in case it returns an array that needs to be split */
              if (Type.isFunction(valueData)) {
                valueData = valueData.call(element, elementArrayIndex, elementsLength);
              }

              /* Handle the array format, which can be structured as one of three potential overloads:
               A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
              if (Type.isArray(valueData)) {
                /* endValue is always the first item in the array. Don't bother validating endValue's value now
                 since the ensuing property cycling logic does that. */
                endValue = valueData[0];

                /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                 start value since easings can only be non-hex strings or arrays. */
                if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                  startValue = valueData[1];
                  /* Two or three-item array: If the second item is a non-hex string easing name or an array, treat it as an easing. */
                } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1]) && Velocity.Easings[valueData[1]]) || Type.isArray(valueData[1])) {
                  easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

                  /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
                  startValue = valueData[2];
                } else {
                  startValue = valueData[1] || valueData[2];
                }
                /* Handle the single-value format. */
              } else {
                endValue = valueData;
              }

              /* Default to the call's easing if a per-property easing type was not defined. */
              if (!skipResolvingEasing) {
                easing = easing || opts.easing;
              }

              /* If functions were passed in as values, pass the function the current element as its context,
               plus the element's index and the element set's size as arguments. Then, assign the returned value. */
              if (Type.isFunction(endValue)) {
                endValue = endValue.call(element, elementArrayIndex, elementsLength);
              }

              if (Type.isFunction(startValue)) {
                startValue = startValue.call(element, elementArrayIndex, elementsLength);
              }

              /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
              return [endValue || 0, easing, startValue];
            };

            var fixPropertyValue = function(property, valueData) {
              /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
              var rootProperty = CSS.Hooks.getRoot(property),
                  rootPropertyValue = false,
                  /* Parse out endValue, easing, and startValue from the property's data. */
                  endValue = valueData[0],
                  easing = valueData[1],
                  startValue = valueData[2],
                  pattern;

              /**************************
               Start Value Sourcing
               **************************/

              /* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
               inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
               Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
              /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
               there is no way to check for their explicit browser support, and so we skip skip this check for them. */
              if ((!data || !data.isSVG) && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                if (Velocity.debug) {
                  console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
                }
                return;
              }

              /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
               animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
               a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
              if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                startValue = 0;
              }

              /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
               for all of the current call's properties that were *also* animated in the previous call. */
              /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
              if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                if (startValue === undefined) {
                  startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                }

                /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                 instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                 attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
                rootPropertyValue = data.rootPropertyValueCache[rootProperty];
                /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
              } else {
                /* Handle hooked properties. */
                if (CSS.Hooks.registered[property]) {
                  if (startValue === undefined) {
                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                     getPropertyValue() will extract the hook from rootPropertyValue. */
                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                    /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                     just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                     root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                     to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                  } else {
                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                  }
                  /* Handle non-hooked properties that haven't already been defined via forcefeeding. */
                } else if (startValue === undefined) {
                  startValue = CSS.getPropertyValue(element, property); /* GET */
                }
              }

              /**************************
               Value Data Extraction
               **************************/

              var separatedValue,
                  endValueUnitType,
                  startValueUnitType,
                  operator = false;

              /* Separates a property value into its numeric value and its unit type. */
              var separateValue = function(property, value) {
                var unitType,
                    numericValue;

                numericValue = (value || "0")
                    .toString()
                    .toLowerCase()
                    /* Match the unit type at the end of the value. */
                    .replace(/[%A-z]+$/, function(match) {
                      /* Grab the unit type. */
                      unitType = match;

                      /* Strip the unit type off of value. */
                      return "";
                    });

                /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
                if (!unitType) {
                  unitType = CSS.Values.getUnitType(property);
                }

                return [numericValue, unitType];
              };

              if (Type.isString(startValue) && Type.isString(endValue)) {
                pattern = "";
                var iStart = 0, // index in startValue
                    iEnd = 0, // index in endValue
                    aStart = [], // array of startValue numbers
                    aEnd = []; // array of endValue numbers

                while (iStart < startValue.length && iEnd < endValue.length) {
                  var cStart = startValue[iStart],
                      cEnd = endValue[iEnd];

                  if (/[\d\.]/.test(cStart) && /[\d\.]/.test(cEnd)) {
                    var tStart = cStart, // temporary character buffer
                        tEnd = cEnd, // temporary character buffer
                        dotStart = ".", // Make sure we can only ever match a single dot in a decimal
                        dotEnd = "."; // Make sure we can only ever match a single dot in a decimal

                    while (++iStart < startValue.length) {
                      cStart = startValue[iStart];
                      if (cStart === dotStart) {
                        dotStart = ".."; // Can never match two characters
                      } else if (!/\d/.test(cStart)) {
                        break;
                      }
                      tStart += cStart;
                    }
                    while (++iEnd < endValue.length) {
                      cEnd = endValue[iEnd];
                      if (cEnd === dotEnd) {
                        dotEnd = ".."; // Can never match two characters
                      } else if (!/\d/.test(cEnd)) {
                        break;
                      }
                      tEnd += cEnd;
                    }
                    if (tStart === tEnd) {
                      pattern += tStart;
                    } else {
                      pattern += "{" + aStart.length + "}";
                      aStart.push(parseFloat(tStart));
                      aEnd.push(parseFloat(tEnd));
                    }
                  } else if (cStart === cEnd) {
                    pattern += cStart;
                    iStart++;
                    iEnd++;
                  } else {
                    // TODO: changing units, fixing colours
                    break;
                  }
                }
                if (iStart !== startValue.length || iEnd !== endValue.length) {
                  if (Velocity.debug) {
                    console.error("Trying to pattern match mis-matched strings [\"" + endValue + "\", \"" + startValue + "\"]");
                  }
                  pattern = undefined;
                }
                if (pattern) {
                  if (aStart.length) {
                    if (Velocity.debug) {
                      console.log("Pattern found \"" + pattern + "\" -> ", aStart, aEnd, startValue, endValue);
                    }
                    startValue = aStart;
                    endValue = aEnd;
                    endValueUnitType = startValueUnitType = "";
                  } else {
                    pattern = undefined;
                  }
                }
              }

              if (!pattern) {
                /* Separate startValue. */
                separatedValue = separateValue(property, startValue);
                startValue = separatedValue[0];
                startValueUnitType = separatedValue[1];

                /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
                separatedValue = separateValue(property, endValue);
                endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                  operator = subMatch;

                  /* Strip the operator off of the value. */
                  return "";
                });
                endValueUnitType = separatedValue[1];

                /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
                startValue = parseFloat(startValue) || 0;
                endValue = parseFloat(endValue) || 0;

                /***************************************
                 Property-Specific Value Conversion
                 ***************************************/

                /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
                if (endValueUnitType === "%") {
                  /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                   which is identical to the em unit's behavior, so we piggyback off of that. */
                  if (/^(fontSize|lineHeight)$/.test(property)) {
                    /* Convert % into an em decimal value. */
                    endValue = endValue / 100;
                    endValueUnitType = "em";
                    /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                  } else if (/^scale/.test(property)) {
                    endValue = endValue / 100;
                    endValueUnitType = "";
                    /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                  } else if (/(Red|Green|Blue)$/i.test(property)) {
                    endValue = (endValue / 100) * 255;
                    endValueUnitType = "";
                  }
                }
              }

              /***************************
               Unit Ratio Calculation
               ***************************/

              /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
               %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
               for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
               from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
               1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
               2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
              /* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
               setting values with the target unit type then comparing the returned pixel value. */
              /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
               of batching the SETs and GETs together upfront outweights the potential overhead
               of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
              /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
              var calculateUnitRatios = function() {

                /************************
                 Same Ratio Checks
                 ************************/

                /* The properties below are used to determine whether the element differs sufficiently from this call's
                 previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
                 of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
                 this is done to minimize DOM querying. */
                var sameRatioIndicators = {
                  myParent: element.parentNode || document.body, /* GET */
                  position: CSS.getPropertyValue(element, "position"), /* GET */
                  fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
                },
                    /* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
                    samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
                    /* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
                    sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);

                /* Store these ratio indicators call-wide for the next element to compare against. */
                callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                callUnitConversionData.lastPosition = sameRatioIndicators.position;
                callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

                /***************************
                 Element-Specific Units
                 ***************************/

                /* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                 of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
                var measurement = 100,
                    unitRatios = {};

                if (!sameEmRatio || !samePercentRatio) {
                  var dummy = data && data.isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

                  Velocity.init(dummy);
                  sameRatioIndicators.myParent.appendChild(dummy);

                  /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                   Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
                  /* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
                  $.each(["overflow", "overflowX", "overflowY"], function(i, property) {
                    Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                  });
                  Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                  Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                  Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

                  /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
                  $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(i, property) {
                    Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                  });
                  /* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
                  Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

                  /* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
                  unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
                  unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
                  unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

                  sameRatioIndicators.myParent.removeChild(dummy);
                } else {
                  unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                  unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                  unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                }

                /***************************
                 Element-Agnostic Units
                 ***************************/

                /* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
                 once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
                 that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
                 so we calculate it now. */
                if (callUnitConversionData.remToPx === null) {
                  /* Default to browsers' default fontSize of 16px in the case of 0. */
                  callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
                }

                /* Similarly, viewport units are %-relative to the window's inner dimensions. */
                if (callUnitConversionData.vwToPx === null) {
                  callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
                  callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
                }

                unitRatios.remToPx = callUnitConversionData.remToPx;
                unitRatios.vwToPx = callUnitConversionData.vwToPx;
                unitRatios.vhToPx = callUnitConversionData.vhToPx;

                if (Velocity.debug >= 1) {
                  console.log("Unit ratios: " + JSON.stringify(unitRatios), element);
                }
                return unitRatios;
              };

              /********************
               Unit Conversion
               ********************/

              /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
              if (/[\/*]/.test(operator)) {
                endValueUnitType = startValueUnitType;
                /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                 is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                 on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                 would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
                /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
              } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
                /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                 match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                 which remains past the point of the animation's completion. */
                if (endValue === 0) {
                  endValueUnitType = startValueUnitType;
                } else {
                  /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                  elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

                  /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
                  /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                  var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";

                  /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
                  switch (startValueUnitType) {
                    case "%":
                      /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                       Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                       to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                      startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                      break;

                    case "px":
                      /* px acts as our midpoint in the unit conversion process; do nothing. */
                      break;

                    default:
                      startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                  }

                  /* Invert the px ratios to convert into to the target unit. */
                  switch (endValueUnitType) {
                    case "%":
                      startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                      break;

                    case "px":
                      /* startValue is already in px, do nothing; we're done. */
                      break;

                    default:
                      startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                  }
                }
              }

              /*********************
               Relative Values
               *********************/

              /* Operator logic must be performed last since it requires unit-normalized start and end values. */
              /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
               to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
               50 points is added on top of the current % value. */
              switch (operator) {
                case "+":
                  endValue = startValue + endValue;
                  break;

                case "-":
                  endValue = startValue - endValue;
                  break;

                case "*":
                  endValue = startValue * endValue;
                  break;

                case "/":
                  endValue = startValue / endValue;
                  break;
              }

              /**************************
               tweensContainer Push
               **************************/

              /* Construct the per-property tween object, and push it to the element's tweensContainer. */
              tweensContainer[property] = {
                rootPropertyValue: rootPropertyValue,
                startValue: startValue,
                currentValue: startValue,
                endValue: endValue,
                unitType: endValueUnitType,
                easing: easing
              };
              if (pattern) {
                tweensContainer[property].pattern = pattern;
              }

              if (Velocity.debug) {
                console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
              }
            };

            /* Create a tween out of each property, and append its associated data to tweensContainer. */
            for (var property in propertiesMap) {

              if (!propertiesMap.hasOwnProperty(property)) {
                continue;
              }
              /* The original property name's format must be used for the parsePropertyValue() lookup,
               but we then use its camelCase styling to normalize it for manipulation. */
              var propertyName = CSS.Names.camelCase(property),
                  valueData = parsePropertyValue(propertiesMap[property]);

              /* Find shorthand color properties that have been passed a hex string. */
              /* Would be quicker to use CSS.Lists.colors.includes() if possible */
              if (CSS.Lists.colors.indexOf(propertyName) >= 0) {
                /* Parse the value data for each shorthand. */
                var endValue = valueData[0],
                    easing = valueData[1],
                    startValue = valueData[2];

                if (CSS.RegEx.isHex.test(endValue)) {
                  /* Convert the hex strings into their RGB component arrays. */
                  var colorComponents = ["Red", "Green", "Blue"],
                      endValueRGB = CSS.Values.hexToRgb(endValue),
                      startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

                  /* Inject the RGB component tweens into propertiesMap. */
                  for (var i = 0; i < colorComponents.length; i++) {
                    var dataArray = [endValueRGB[i]];

                    if (easing) {
                      dataArray.push(easing);
                    }

                    if (startValueRGB !== undefined) {
                      dataArray.push(startValueRGB[i]);
                    }

                    fixPropertyValue(propertyName + colorComponents[i], dataArray);
                  }
                  /* If we have replaced a shortcut color value then don't update the standard property name */
                  continue;
                }
              }
              fixPropertyValue(propertyName, valueData);
            }

            /* Along with its property data, store a reference to the element itself onto tweensContainer. */
            tweensContainer.element = element;
          }

          /*****************
           Call Push
           *****************/

          /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
           being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
          if (tweensContainer.element) {
            /* Apply the "velocity-animating" indicator class. */
            CSS.Values.addClass(element, "velocity-animating");

            /* The call array houses the tweensContainers for each element being animated in the current call. */
            call.push(tweensContainer);

            data = Data(element);

            if (data) {
              /* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
              if (opts.queue === "") {

                data.tweensContainer = tweensContainer;
                data.opts = opts;
              }

              /* Switch on the element's animating flag. */
              data.isAnimating = true;
            }

            /* Once the final element in this call's element set has been processed, push the call array onto
             Velocity.State.calls for the animation tick to immediately begin processing. */
            if (elementsIndex === elementsLength - 1) {
              /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
               Anything on this call container is subjected to tick() processing. */
              Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver, null, 0]);

              /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
              if (Velocity.State.isTicking === false) {
                Velocity.State.isTicking = true;

                /* Start the tick loop. */
                tick();
              }
            } else {
              elementsIndex++;
            }
          }
        }

        /* When the queue option is set to false, the call skips the element's queue and fires immediately. */
        if (opts.queue === false) {
          /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
           we manually inject the delay property here with an explicit setTimeout. */
          if (opts.delay) {

            /* Temporarily store delayed elements to facilitate access for global pause/resume */
            var callIndex = Velocity.State.delayedElements.count++;
            Velocity.State.delayedElements[callIndex] = element;

            var delayComplete = (function(index) {
              return function() {
                /* Clear the temporary element */
                Velocity.State.delayedElements[index] = false;

                /* Finally, issue the call */
                buildQueue();
              };
            })(callIndex);

            Data(element).delayBegin = (new Date()).getTime();
            Data(element).delay = parseFloat(opts.delay);
            Data(element).delayTimer = {
              setTimeout: setTimeout(buildQueue, parseFloat(opts.delay)),
              next: delayComplete
            };
          } else {
            buildQueue();
          }
          /* Otherwise, the call undergoes element queueing as normal. */
          /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
        } else {
          $.queue(element, opts.queue, function(next, clearQueue) {
            /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
             so it's fine if this is repeatedly triggered for each element in the associated call.) */
            if (clearQueue === true) {
              if (promiseData.promise) {
                promiseData.resolver(elements);
              }

              /* Do not continue with animation queueing. */
              return true;
            }

            /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
             See completeCall() for further details. */
            Velocity.velocityQueueEntryFlag = true;

            buildQueue(next);
          });
        }

        /*********************
         Auto-Dequeuing
         *********************/

        /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
         must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
         for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
         queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
         first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
        /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
         each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
        /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
         Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
        if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
          $.dequeue(element);
        }
      }

      /**************************
       Element Set Iteration
       **************************/

      /* If the "nodeType" property exists on the elements variable, we're animating a single element.
       Place it in an array so that $.each() can iterate over it. */
      $.each(elements, function(i, element) {
        /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
        if (Type.isNode(element)) {
          processElement(element, i);
        }
      });

      /******************
       Option: Loop
       ******************/

      /* The loop option accepts an integer indicating how many times the element should loop between the values in the
       current call's properties map and the element's property values prior to this call. */
      /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
       to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
       which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
      opts = $.extend({}, Velocity.defaults, options);
      opts.loop = parseInt(opts.loop, 10);
      var reverseCallsCount = (opts.loop * 2) - 1;

      if (opts.loop) {
        /* Double the loop count to convert it into its appropriate number of "reverse" calls.
         Subtract 1 from the resulting value since the current call is included in the total alternation count. */
        for (var x = 0; x < reverseCallsCount; x++) {
          /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
           isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
           call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
          var reverseOptions = {
            delay: opts.delay,
            progress: opts.progress
          };

          /* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
           so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
          if (x === reverseCallsCount - 1) {
            reverseOptions.display = opts.display;
            reverseOptions.visibility = opts.visibility;
            reverseOptions.complete = opts.complete;
          }

          animate(elements, "reverse", reverseOptions);
        }
      }

      /***************
       Chaining
       ***************/

      /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
      return getChain();
    };

    /* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
    Velocity = $.extend(animate, Velocity);
    /* For legacy support, also expose the literal animate method. */
    Velocity.animate = animate;

    /**************
     Timing
     **************/

    /* Ticker function. */
    var ticker = window.requestAnimationFrame || rAFShim;

    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
     To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
     devices to avoid wasting battery power on inactive tabs. */
    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
    if (!Velocity.State.isMobile && document.hidden !== undefined) {
      var updateTicker = function() {
        /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
        if (document.hidden) {
          ticker = function(callback) {
            /* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
            return setTimeout(function() {
              callback(true);
            }, 16);
          };

          /* The rAF loop has been paused by the browser, so we manually restart the tick. */
          tick();
        } else {
          ticker = window.requestAnimationFrame || rAFShim;
        }
      };

      /* Page could be sitting in the background at this time (i.e. opened as new tab) so making sure we use correct ticker from the start */
      updateTicker();

      /* And then run check again every time visibility changes */
      document.addEventListener("visibilitychange", updateTicker);
    }

    /************
     Tick
     ************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
    function tick(timestamp) {
      /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
       We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
       the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
       calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
       the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
       by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
      if (timestamp) {
        /* We normally use RAF's high resolution timestamp but as it can be significantly offset when the browser is
         under high stress we give the option for choppiness over allowing the browser to drop huge chunks of frames.
         We use performance.now() and shim it if it doesn't exist for when the tab is hidden. */
        var timeCurrent = Velocity.timestamp && timestamp !== true ? timestamp : performance.now();

        /********************
         Call Iteration
         ********************/

        var callsLength = Velocity.State.calls.length;

        /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
         when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
         has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
        if (callsLength > 10000) {
          Velocity.State.calls = compactSparseArray(Velocity.State.calls);
          callsLength = Velocity.State.calls.length;
        }

        /* Iterate through each active call. */
        for (var i = 0; i < callsLength; i++) {
          /* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
          if (!Velocity.State.calls[i]) {
            continue;
          }

          /************************
           Call-Wide Variables
           ************************/

          var callContainer = Velocity.State.calls[i],
              call = callContainer[0],
              opts = callContainer[2],
              timeStart = callContainer[3],
              firstTick = !!timeStart,
              tweenDummyValue = null,
              pauseObject = callContainer[5],
              millisecondsEllapsed = callContainer[6];



          /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
           We assign timeStart now so that its value is as close to the real animation start time as possible.
           (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
           between that time and now would cause the first few frames of the tween to be skipped since
           percentComplete is calculated relative to timeStart.) */
          /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
           first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
           same style value as the element's current value. */
          if (!timeStart) {
            timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
          }

          /* If a pause object is present, skip processing unless it has been set to resume */
          if(pauseObject) {
            if(pauseObject.resume === true) {
              /* Update the time start to accomodate the paused completion amount */
              timeStart = callContainer[3] = Math.round(timeCurrent - millisecondsEllapsed - 16);

              /* Remove pause object after processing */
              callContainer[5] = null;
            } else {
              continue;
            }
          }

          millisecondsEllapsed = callContainer[6] = timeCurrent - timeStart;

          /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
           (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
           Accordingly, we ensure that percentComplete does not exceed 1. */
          var percentComplete = Math.min((millisecondsEllapsed) / opts.duration, 1);

          /**********************
           Element Iteration
           **********************/

          /* For every call, iterate through each of the elements in its set. */
          for (var j = 0, callLength = call.length; j < callLength; j++) {
            var tweensContainer = call[j],
                element = tweensContainer.element;

            /* Check to see if this element has been deleted midway through the animation by checking for the
             continued existence of its data cache. If it's gone, or the element is currently paused, skip animating this element. */
            if (!Data(element)) {
              continue;
            }

            var transformPropertyExists = false;

            /**********************************
             Display & Visibility Toggling
             **********************************/

            /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
             (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
            if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
              if (opts.display === "flex") {
                var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];

                $.each(flexValues, function(i, flexValue) {
                  CSS.setPropertyValue(element, "display", flexValue);
                });
              }

              CSS.setPropertyValue(element, "display", opts.display);
            }

            /* Same goes with the visibility option, but its "none" equivalent is "hidden". */
            if (opts.visibility !== undefined && opts.visibility !== "hidden") {
              CSS.setPropertyValue(element, "visibility", opts.visibility);
            }

            /************************
             Property Iteration
             ************************/

            /* For every element, iterate through each property. */
            for (var property in tweensContainer) {
              /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
              if (tweensContainer.hasOwnProperty(property) && property !== "element") {
                var tween = tweensContainer[property],
                    currentValue,
                    /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                     on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                    easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                /******************************
                 Current Value Calculation
                 ******************************/

                if (Type.isString(tween.pattern)) {
                  var patternReplace = percentComplete === 1 ?
                      function($0, index) {
                        return tween.endValue[index];
                      } :
                      function($0, index) {
                        var startValue = tween.startValue[index],
                            tweenDelta = tween.endValue[index] - startValue;

                        return startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));
                      };

                  currentValue = tween.pattern.replace(/{(\d+)}/g, patternReplace);
                } else if (percentComplete === 1) {
                  /* If this is the last tick pass (if we've reached 100% completion for this tween),
                   ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                  currentValue = tween.endValue;
                } else {
                  /* Otherwise, calculate currentValue based on the current delta from startValue. */
                  var tweenDelta = tween.endValue - tween.startValue;

                  currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));
                  /* If no value change is occurring, don't proceed with DOM updating. */
                }
                if (!firstTick && (currentValue === tween.currentValue)) {
                  continue;
                }

                tween.currentValue = currentValue;

                /* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
                 it can be passed into the progress callback. */
                if (property === "tween") {
                  tweenDummyValue = currentValue;
                } else {
                  /******************
                   Hooks: Part I
                   ******************/
                  var hookRoot;

                  /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                   for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                   rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                   updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                   subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
                  if (CSS.Hooks.registered[property]) {
                    hookRoot = CSS.Hooks.getRoot(property);

                    var rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                    if (rootPropertyValueCache) {
                      tween.rootPropertyValue = rootPropertyValueCache;
                    }
                  }

                  /*****************
                   DOM Update
                   *****************/

                  /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
                  /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
                  var adjustedSetData = CSS.setPropertyValue(element, /* SET */
                      property,
                      tween.currentValue + (IE < 9 && parseFloat(currentValue) === 0 ? "" : tween.unitType),
                      tween.rootPropertyValue,
                      tween.scrollData);

                  /*******************
                   Hooks: Part II
                   *******************/

                  /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
                  if (CSS.Hooks.registered[property]) {
                    /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                    if (CSS.Normalizations.registered[hookRoot]) {
                      Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                    } else {
                      Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                    }
                  }

                  /***************
                   Transforms
                   ***************/

                  /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
                  if (adjustedSetData[0] === "transform") {
                    transformPropertyExists = true;
                  }

                }
              }
            }

            /****************
             mobileHA
             ****************/

            /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
             It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
            if (opts.mobileHA) {
              /* Don't set the null transform hack if we've already done so. */
              if (Data(element).transformCache.translate3d === undefined) {
                /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                transformPropertyExists = true;
              }
            }

            if (transformPropertyExists) {
              CSS.flushTransformCache(element);
            }
          }

          /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
           Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
          if (opts.display !== undefined && opts.display !== "none") {
            Velocity.State.calls[i][2].display = false;
          }
          if (opts.visibility !== undefined && opts.visibility !== "hidden") {
            Velocity.State.calls[i][2].visibility = false;
          }

          /* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
          if (opts.progress) {
            opts.progress.call(callContainer[1],
                callContainer[1],
                percentComplete,
                Math.max(0, (timeStart + opts.duration) - timeCurrent),
                timeStart,
                tweenDummyValue);
          }

          /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
          if (percentComplete === 1) {
            completeCall(i);
          }
        }
      }

      /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
      if (Velocity.State.isTicking) {
        ticker(tick);
      }
    }

    /**********************
     Call Completion
     **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
    function completeCall(callIndex, isStopped) {
      /* Ensure the call exists. */
      if (!Velocity.State.calls[callIndex]) {
        return false;
      }

      /* Pull the metadata from the call. */
      var call = Velocity.State.calls[callIndex][0],
          elements = Velocity.State.calls[callIndex][1],
          opts = Velocity.State.calls[callIndex][2],
          resolver = Velocity.State.calls[callIndex][4];

      var remainingCallsExist = false;

      /*************************
       Element Finalization
       *************************/

      for (var i = 0, callLength = call.length; i < callLength; i++) {
        var element = call[i].element;

        /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
        /* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
        /* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
        if (!isStopped && !opts.loop) {
          if (opts.display === "none") {
            CSS.setPropertyValue(element, "display", opts.display);
          }

          if (opts.visibility === "hidden") {
            CSS.setPropertyValue(element, "visibility", opts.visibility);
          }
        }

        /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
         a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
         an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
         we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
         is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
        var data = Data(element);

        if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
          /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
          if (data) {
            data.isAnimating = false;
            /* Clear the element's rootPropertyValueCache, which will become stale. */
            data.rootPropertyValueCache = {};

            var transformHAPropertyExists = false;
            /* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
            $.each(CSS.Lists.transforms3D, function(i, transformName) {
              var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                  currentValue = data.transformCache[transformName];

              if (data.transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                transformHAPropertyExists = true;

                delete data.transformCache[transformName];
              }
            });

            /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
            if (opts.mobileHA) {
              transformHAPropertyExists = true;
              delete data.transformCache.translate3d;
            }

            /* Flush the subproperty removals to the DOM. */
            if (transformHAPropertyExists) {
              CSS.flushTransformCache(element);
            }

            /* Remove the "velocity-animating" indicator class. */
            CSS.Values.removeClass(element, "velocity-animating");
          }
        }

        /*********************
         Option: Complete
         *********************/

        /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
        /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
        if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
          /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
          try {
            opts.complete.call(elements, elements);
          } catch (error) {
            setTimeout(function() {
              throw error;
            }, 1);
          }
        }

        /**********************
         Promise Resolving
         **********************/

        /* Note: Infinite loops don't return promises. */
        if (resolver && opts.loop !== true) {
          resolver(elements);
        }

        /****************************
         Option: Loop (Infinite)
         ****************************/

        if (data && opts.loop === true && !isStopped) {
          /* If a rotateX/Y/Z property is being animated by 360 deg with loop:true, swap tween start/end values to enable
           continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
          $.each(data.tweensContainer, function(propertyName, tweenContainer) {
            if (/^rotate/.test(propertyName) && ((parseFloat(tweenContainer.startValue) - parseFloat(tweenContainer.endValue)) % 360 === 0)) {
              var oldStartValue = tweenContainer.startValue;

              tweenContainer.startValue = tweenContainer.endValue;
              tweenContainer.endValue = oldStartValue;
            }

            if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
              tweenContainer.endValue = 0;
              tweenContainer.startValue = 100;
            }
          });

          Velocity(element, "reverse", {loop: true, delay: opts.delay});
        }

        /***************
         Dequeueing
         ***************/

        /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
         which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
         $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
        if (opts.queue !== false) {
          $.dequeue(element, opts.queue);
        }
      }

      /************************
       Calls Array Cleanup
       ************************/

      /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
       (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
      Velocity.State.calls[callIndex] = false;

      /* Iterate through the calls array to determine if this was the final in-progress animation.
       If so, set a flag to end ticking and clear the calls array. */
      for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
        if (Velocity.State.calls[j] !== false) {
          remainingCallsExist = true;

          break;
        }
      }

      if (remainingCallsExist === false) {
        /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
        Velocity.State.isTicking = false;

        /* Clear the calls array so that its length is reset. */
        delete Velocity.State.calls;
        Velocity.State.calls = [];
      }
    }

    /******************
     Frameworks
     ******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
     If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
     also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
     accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
     (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
    global.Velocity = Velocity;

    if (global !== window) {
      /* Assign the element function to Velocity's core animate() method. */
      global.fn.velocity = animate;
      /* Assign the object function's defaults to Velocity's global defaults object. */
      global.fn.velocity.defaults = Velocity.defaults;
    }

    /***********************
     Packaged Redirects
     ***********************/

    /* slideUp, slideDown */
    $.each(["Down", "Up"], function(i, direction) {
      Velocity.Redirects["slide" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
            begin = opts.begin,
            complete = opts.complete,
            inlineValues = {},
            computedValues = {height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: ""};

        if (opts.display === undefined) {
          /* Show the element before slideDown begins and hide the element after slideUp completes. */
          /* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
          opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
        }

        opts.begin = function() {
          /* If the user passed in a begin callback, fire it now. */
          if (elementsIndex === 0 && begin) {
            begin.call(elements, elements);
          }

          /* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
          for (var property in computedValues) {
            if (!computedValues.hasOwnProperty(property)) {
              continue;
            }
            inlineValues[property] = element.style[property];

            /* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
             use forcefeeding to start from computed values and animate down to 0. */
            var propertyValue = CSS.getPropertyValue(element, property);
            computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
          }

          /* Force vertical overflow content to clip so that sliding works as expected. */
          inlineValues.overflow = element.style.overflow;
          element.style.overflow = "hidden";
        };

        opts.complete = function() {
          /* Reset element to its pre-slide inline values once its slide animation is complete. */
          for (var property in inlineValues) {
            if (inlineValues.hasOwnProperty(property)) {
              element.style[property] = inlineValues[property];
            }
          }

          /* If the user passed in a complete callback, fire it now. */
          if (elementsIndex === elementsSize - 1) {
            if (complete) {
              complete.call(elements, elements);
            }
            if (promiseData) {
              promiseData.resolver(elements);
            }
          }
        };

        Velocity(element, computedValues, opts);
      };
    });

    /* fadeIn, fadeOut */
    $.each(["In", "Out"], function(i, direction) {
      Velocity.Redirects["fade" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
            complete = opts.complete,
            propertiesMap = {opacity: (direction === "In") ? 1 : 0};

        /* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
         callbacks by firing them only when the final element has been reached. */
        if (elementsIndex !== 0) {
          opts.begin = null;
        }
        if (elementsIndex !== elementsSize - 1) {
          opts.complete = null;
        } else {
          opts.complete = function() {
            if (complete) {
              complete.call(elements, elements);
            }
            if (promiseData) {
              promiseData.resolver(elements);
            }
          };
        }

        /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
        /* Note: We allow users to pass in "null" to skip display setting altogether. */
        if (opts.display === undefined) {
          opts.display = (direction === "In" ? "auto" : "none");
        }

        Velocity(this, propertiesMap, opts);
      };
    });

    return Velocity;
  }((window.jQuery || window.Zepto || window), window, (window ? window.document : undefined));
}));

/******************
 Known Issues
 ******************/

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
 Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
 will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */
/*!
 * Waves v0.7.5
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2016 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window, factory) {
    'use strict';

    // AMD. Register as an anonymous module.  Wrap in function so we have access
    // to root via `this`.
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return factory.apply(window);
        });
    }

    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    else if (typeof exports === 'object') {
        module.exports = factory.call(window);
    }

    // Browser globals.
    else {
        window.Waves = factory.call(window);
    }
})(typeof global === 'object' ? global : this, function() {
    'use strict';

    var Waves            = Waves || {};
    var $$               = document.querySelectorAll.bind(document);
    var toString         = Object.prototype.toString;
    var isTouchAvailable = 'ontouchstart' in window;


    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function isObject(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    }

    function isDOMNode(obj) {
        return isObject(obj) && obj.nodeType > 0;
    }

    function getWavesElements(nodes) {
        var stringRepr = toString.call(nodes);

        if (stringRepr === '[object String]') {
            return $$(nodes);
        } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
            return nodes;
        } else if (isDOMNode(nodes)) {
            return [nodes];
        }

        return [];
    }

    function offset(elem) {
        var docElem, win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(styleObj) {
        var style = '';

        for (var prop in styleObj) {
            if (styleObj.hasOwnProperty(prop)) {
                style += (prop + ':' + styleObj[prop] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect duration
        duration: 750,

        // Effect delay (check for scroll before showing effect)
        delay: 200,

        show: function(e, element, velocity) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            element = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple waves-rippling';
            element.appendChild(ripple);

            // Get click coordinate and element width
            var pos       = offset(element);
            var relativeY = 0;
            var relativeX = 0;
            // Support for touch devices
            if('touches' in e && e.touches.length) {
                relativeY   = (e.touches[0].pageY - pos.top);
                relativeX   = (e.touches[0].pageX - pos.left);
            }
            //Normal case
            else {
                relativeY   = (e.pageY - pos.top);
                relativeX   = (e.pageX - pos.left);
            }
            // Support for synthetic events
            relativeX = relativeX >= 0 ? relativeX : 0;
            relativeY = relativeY >= 0 ? relativeY : 0;

            var scale     = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
            var translate = 'translate(0,0)';

            if (velocity) {
                translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-translate', translate);

            // Set ripple position
            var rippleStyle = {
                top: relativeY + 'px',
                left: relativeX + 'px'
            };

            ripple.classList.add('waves-notransition');
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.classList.remove('waves-notransition');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale + ' ' + translate;
            rippleStyle['-moz-transform'] = scale + ' ' + translate;
            rippleStyle['-ms-transform'] = scale + ' ' + translate;
            rippleStyle['-o-transform'] = scale + ' ' + translate;
            rippleStyle.transform = scale + ' ' + translate;
            rippleStyle.opacity = '1';

            var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
            rippleStyle['-webkit-transition-duration'] = duration + 'ms';
            rippleStyle['-moz-transition-duration']    = duration + 'ms';
            rippleStyle['-o-transition-duration']      = duration + 'ms';
            rippleStyle['transition-duration']         = duration + 'ms';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e, element) {
            element = element || this;

            var ripples = element.getElementsByClassName('waves-rippling');

            for (var i = 0, len = ripples.length; i < len; i++) {
                removeRipple(e, element, ripples[i]);
            }
        }
    };

    /**
     * Collection of wrapper for HTML element that only have single tag
     * like <input> and <img>
     */
    var TagWrapper = {

        // Wrap <input> tag so it can perform the effect
        input: function(element) {

            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }

            // Put element class and style to the specified parent
            var wrapper       = document.createElement('i');
            wrapper.className = element.className + ' waves-input-wrapper';
            element.className = 'waves-button-input';

            // Put element as child
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);

            // Apply element color and background color to wrapper
            var elementStyle    = window.getComputedStyle(element, null);
            var color           = elementStyle.color;
            var backgroundColor = elementStyle.backgroundColor;

            wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
            element.setAttribute('style', 'background-color:rgba(0,0,0,0);');

        },

        // Wrap <img> tag so it can perform the effect
        img: function(element) {

            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }

            // Put element as child
            var wrapper  = document.createElement('i');
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);

        }
    };

    /**
     * Hide the effect and remove the ripple. Must be
     * a separate function to pass the JSLint...
     */
    function removeRipple(e, el, ripple) {

        // Check if the ripple still exist
        if (!ripple) {
            return;
        }

        ripple.classList.remove('waves-rippling');

        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale     = ripple.getAttribute('data-scale');
        var translate = ripple.getAttribute('data-translate');

        // Get delay beetween mousedown and mouse leave
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;

        if (delay < 0) {
            delay = 0;
        }

        if (e.type === 'mousemove') {
            delay = 150;
        }

        // Fade out ripple after delay
        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;

        setTimeout(function() {

            var style = {
                top: relativeY + 'px',
                left: relativeX + 'px',
                opacity: '0',

                // Duration
                '-webkit-transition-duration': duration + 'ms',
                '-moz-transition-duration': duration + 'ms',
                '-o-transition-duration': duration + 'ms',
                'transition-duration': duration + 'ms',
                '-webkit-transform': scale + ' ' + translate,
                '-moz-transform': scale + ' ' + translate,
                '-ms-transform': scale + ' ' + translate,
                '-o-transform': scale + ' ' + translate,
                'transform': scale + ' ' + translate
            };

            ripple.setAttribute('style', convertStyle(style));

            setTimeout(function() {
                try {
                    el.removeChild(ripple);
                } catch (e) {
                    return false;
                }
            }, duration);

        }, delay);
    }


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {

        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,

        allowEvent: function(e) {

            var allow = true;

            if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
                allow = false;
            }

            return allow;
        },
        registerEvent: function(e) {
            var eType = e.type;

            if (eType === 'touchstart') {

                TouchHandler.touches += 1; // push

            } else if (/^(touchend|touchcancel)$/.test(eType)) {

                setTimeout(function() {
                    if (TouchHandler.touches) {
                        TouchHandler.touches -= 1; // pop after 500ms
                    }
                }, 500);

            }
        }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {

        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (target.classList.contains('waves-effect') && (!(target instanceof SVGElement))) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {

        // Disable effect if element has "disabled" property on it
        // In some cases, the event is not triggered by the current element
        // if (e.target.getAttribute('disabled') !== null) {
        //     return;
        // }

        var element = getWavesEffectElement(e);

        if (element !== null) {

            // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
            if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
                return;
            }

            TouchHandler.registerEvent(e);

            if (e.type === 'touchstart' && Effect.delay) {

                var hidden = false;

                var timer = setTimeout(function () {
                    timer = null;
                    Effect.show(e, element);
                }, Effect.delay);

                var hideEffect = function(hideEvent) {

                    // if touch hasn't moved, and effect not yet started: start effect now
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                        Effect.show(e, element);
                    }
                    if (!hidden) {
                        hidden = true;
                        Effect.hide(hideEvent, element);
                    }
                };

                var touchMove = function(moveEvent) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    hideEffect(moveEvent);
                };

                element.addEventListener('touchmove', touchMove, false);
                element.addEventListener('touchend', hideEffect, false);
                element.addEventListener('touchcancel', hideEffect, false);

            } else {

                Effect.show(e, element);

                if (isTouchAvailable) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }

                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }
    }

    Waves.init = function(options) {
        var body = document.body;

        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        if ('delay' in options) {
            Effect.delay = options.delay;
        }

        if (isTouchAvailable) {
            body.addEventListener('touchstart', showEffect, false);
            body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
            body.addEventListener('touchend', TouchHandler.registerEvent, false);
        }

        body.addEventListener('mousedown', showEffect, false);
    };


    /**
     * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
     * waves classes to a set of elements. Set drag to true if the ripple mouseover
     * or skimming effect should be applied to the elements.
     */
    Waves.attach = function(elements, classes) {

        elements = getWavesElements(elements);

        if (toString.call(classes) === '[object Array]') {
            classes = classes.join(' ');
        }

        classes = classes ? ' ' + classes : '';

        var element, tagName;

        for (var i = 0, len = elements.length; i < len; i++) {

            element = elements[i];
            tagName = element.tagName.toLowerCase();

            if (['input', 'img'].indexOf(tagName) !== -1) {
                TagWrapper[tagName](element);
                element = element.parentElement;
            }

            if (element.className.indexOf('waves-effect') === -1) {
                element.className += ' waves-effect' + classes;
            }
        }
    };


    /**
     * Cause a ripple to appear in an element via code.
     */
    Waves.ripple = function(elements, options) {
        elements = getWavesElements(elements);
        var elementsLen = elements.length;

        options          = options || {};
        options.wait     = options.wait || 0;
        options.position = options.position || null; // default = centre of element


        if (elementsLen) {
            var element, pos, off, centre = {}, i = 0;
            var mousedown = {
                type: 'mousedown',
                button: 1
            };
            var hideRipple = function(mouseup, element) {
                return function() {
                    Effect.hide(mouseup, element);
                };
            };

            for (; i < elementsLen; i++) {
                element = elements[i];
                pos = options.position || {
                    x: element.clientWidth / 2,
                    y: element.clientHeight / 2
                };

                off      = offset(element);
                centre.x = off.left + pos.x;
                centre.y = off.top + pos.y;

                mousedown.pageX = centre.x;
                mousedown.pageY = centre.y;

                Effect.show(mousedown, element);

                if (options.wait >= 0 && options.wait !== null) {
                    var mouseup = {
                        type: 'mouseup',
                        button: 1
                    };

                    setTimeout(hideRipple(mouseup, element), options.wait);
                }
            }
        }
    };

    /**
     * Remove all ripples from an element.
     */
    Waves.calm = function(elements) {
        elements = getWavesElements(elements);
        var mouseup = {
            type: 'mouseup',
            button: 1
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            Effect.hide(mouseup, elements[i]);
        }
    };

    /**
     * Deprecated API fallback
     */
    Waves.displayEffect = function(options) {
        console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
        Waves.init(options);
    };

    return Waves;
});


// ===========================================
// Breakpoints
// ===========================================

  var page = (function(page) {
    "use strict";

    // Breakpoints Object
    // =======================================
    page.breakpoints = {
      mobile: window.matchMedia("(max-width: 1024px)"),
      desktop: window.matchMedia("(min-width: 1025px)")
    };


    return page;

  })(page || {});



// ===========================================
// Config
// ===========================================

  var page = (function(page) {
    "use strict";

    // Config Object
    // =======================================
    page.config = {
      filterIcon: {
        active: "fa-check-square-o",
        normal: "fa-square-o"
      },
      projectIcon: "fa-ellipsis-v",
      artworkIcon: {
        single: "fa-tag",
        multi: "fa-tags"
      }
    };


    return page;

  })(page || {});



// ------------------------------------------------------------------------
// base/data.js
// ------------------------------------------------------------------------


  var page = (function(page) {
    "use strict";

    // --------------------------------------------------------------------
    // Project Data
    // --------------------------------------------------------------------
    
    page.data = {};
    page.data.projects = [
      {
        title       : "gmaps",
        category    : "Javascript",
        description : "A JavaScript library that simplifies the development of Google Maps web applications. Get started with gmaps, the way maps were meant to be made!",
        image       : "img/projects/gmaps.jpg",
        links: [
          {
            href : "http://gmapsjs.com",
            text : "View Website"
          },
          {
            href : "https://www.github.com/tmentink/gmaps",
            text : "View Github"
          }
        ]
      },
      {
        title       : "jQuery Geocomplete",
        category    : "Javascript",
        description : "A jQuery plugin for Google Maps Autocomplete. Easily autofill address forms or center a map based on the selected location.",
        image       : "img/projects/jquery_geocomplete.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/jquery_geocomplete",
            text : "View Demo"
          },
          {
            href : "https://www.github.com/tmentink/jquery.geocomplete",
            text : "View Github"
          }
        ]
      },
      {
        title       : "Poly - Split",
        category    : "Javascript",
        description : "A Google Maps plugin that extends the polygon object with a new method to easily split it in two. Simply draw a polygon over another and the plugin will split out the difference.",
        image       : "img/projects/poly_split.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/polygon_splitting",
            text : "View Demo"
          },
          {
            href : "https://www.github.com/tmentink/google-maps-polygon-splitting",
            text : "View Github"
          }
        ]
      },
      {
        title       : "Sliding Puzzle",
        category    : "Gaming",
        description : "Sliding Puzzle is a HTML5 game that randomly shuffles images into tiles. If you get stuck, you can click solve and watch the AI find the shortest possible solution. All images were created by Kelly N. Hagan.",
        image       : "img/projects/sliding_puzzle.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/sliding_puzzle",
            text : "Play Game"
          },
          {
            href : "https://www.github.com/tmentink/sliding_puzzle",
            text : "View Github"
          }
        ]
      },
      {
        title       : "The Frameshop",
        category    : "Website",
        description : "The Frameshop is a family owned business specializing in custom framing. I worked closely with them to design and develop a brand new mobile-friendly website.",
        image       : "img/projects/frameshop.jpg",
        links: [
          {
            href : "http://www.theframeshopsite.com",
            text : "View Website"
          }
        ]
      },
      {
        title       : "Simon Says",
        category    : "Gaming",
        description : "Simon Says is a web based game that utilizes HTML5 features like data attributes, audio and local storage. Test your memory with this fresh take on a classic.",
        image       : "img/projects/simon_says.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/simon_says",
            text : "Play Game"
          },
          {
            href : "https://www.github.com/tmentink/simon_says",
            text : "View Github"
          }
        ]
      }
    ];


    // --------------------------------------------------------------------
    // Artwork Data
    // --------------------------------------------------------------------
    
    page.data.artwork = [
        {
            title       : "Rising Sun",
            tags        : ["Featured", "Digital"],
            img         : "risingsun.png",
            thumb       : "risingsun.jpg",
            description : "Simple is beautiful. But simple is also really hard. This is by far the most challenging and rewarding piece of artwork I have ever created."
        },
        {
            title       : "Tule Fields",
            tags        : ["Featured", "Digital"],
            img         : "tulefields.jpg",
            thumb       : "tulefields.jpg",
            description : "This drawing was inspired by the rice fields near my home town of Yuba City. Some of my fondest memories with my dad were made out in the duck blind."
        },
        {
            title       : "Yellowstone Waterfall",
            tags        : ["Featured", "Pencil"],
            img         : "yellowstonewaterfall.jpg",
            thumb       : "yellowstonewaterfall.jpg",
            description : "This piece is rather special to me because I swear it drew itself. During a trip to the family cabin in Montana I felt an urge to draw something. With no real plan in mind, I just started drawing and watched as it came to life."
        },
        {
            title       : "Mountain Reflection",
            tags        : ["Featured", "Pencil"],
            img         : "mountainreflection.jpg",
            thumb       : "mountainreflection.jpg",
            description : "I remember thinking I wanted to draw a really complicated mountain range. Afterwards, I wanted to draw reflections in the lake and immediately wished I had drawn simpler mountains."
        },
        {
            title       : "Ocean Sunset",
            tags        : ["Digital"],
            img         : "oceansunset.jpg",
            thumb       : "oceansunset.jpg",
            description : "This was my first piece of digital artwork. After spending so much time with graphite pencils, I was eager to draw something more colorful."
        },
        {
            title       : "Moonlit Mountains",
            tags        : ["Digital"],
            img         : "moonlight.jpg",
            thumb       : "moonlight.jpg",
            description : "This drawing was an experiment in lighting and I absolutely love the way the clouds turned out. It also makes me really want to visit Alaska."
        },
        {
            title       : "At Peace",
            tags        : ["Pencil"],
            img         : "atpeace.jpg",
            thumb       : "atpeace.jpg",
            description : "This was one of my earlier drawings when I was experimenting with a new cloud technique. It was inspired by all the late night fishing trips I've had with my dad."
        },
        {
            title       : "Mountain Rapids",
            tags        : ["Pencil"],
            img         : "mountainrapids.jpg",
            thumb       : "mountainrapids.jpg",
            description : "If you haven't noticed by now, I kind of have a thing for mountains..."
        },
        {
            title       : "Ravens Logo",
            tags        : ["Pencil"],
            img         : "ravenslogo.jpg",
            thumb       : "ravenslogo.jpg",
            description : "I've been a big Baltimore Ravens fan since 2005. I drew this logo during their magical Super Bowl run in Ray Lewis' final season."
        },
        {
            title       : "Cosette",
            tags        : ["Pencil"],
            img         : "cosette.jpg",
            thumb       : "cosette.jpg",
            description : "I really enjoyed watching the movie Les Misérables and wanted to draw something from it. This piece was inspired by the original artwork created by Émile Bayard in 1862."
        },
        {
            title       : "Dolphins",
            tags        : ["Pencil"],
            img         : "dolphins.jpg",
            thumb       : "dolphins.jpg",
            description : "This piece has some Polynesian influences and was drawn for a friend of mine that loves dolphins."
        },
        {
            title       : "Kingfisher",
            tags        : ["Pencil"],
            img         : "kingfisher.jpg",
            thumb       : "kingfisher.jpg",
            description : "I made this guy for my sister's birthday when she told me she wanted a drawing of a bird. I typically stick to nature landscapes but I really love the way the head feathers turned out."
        },
        {
            title       : "Farmhouse",
            tags        : ["Pencil"],
            img         : "farmhouse.jpg",
            thumb       : "farmhouse.jpg",
            description : "I drew a lot when I was growing up but stopped when I got to middle school. In my last few years of college I decided to take it back up and this was the first thing I drew."
        },
        {
            title       : "Misty Mountains",
            tags        : ["Pencil"],
            img         : "mistymountains.jpg",
            thumb       : "mistymountains.jpg",
            description : "This drawing was created while following a YouTube tutorial by TylersArtShack. This video taught me a lot including the technique to create realistic clouds."
        },
        {
            title       : "Cresent Earth",
            tags        : ["Pencil"],
            img         : "cresentearth.jpg",
            thumb       : "cresentearth.jpg",
            description : "I briefly worked with prismacolor pencils before transitioning into digital artwork. At the time I was reading a lot about space and wanted to try to draw colorful gas clouds."
        },
        {
            title       : "Autumn Tree",
            tags        : ["Featured", "Pencil"],
            img         : "autumntree.jpg",
            thumb       : "autumntree.jpg",
            description : "One thing I loved about the prismacolor pencils is how you could blend colors together using baby oil and a Cuetip. It was fun to work with but it was hard to draw the same level of detail I was accustomed to."
        },
        {
            title       : "The Enchantments",
            tags        : ["Featured", "Photography"],
            img         : "theenchantments.jpg",
            thumb       : "theenchantments.jpg",
            description : "This picture was taken during my backpacking trip into the Enchantments in Washington. The views were absolutely breathtaking and totally worth the 21 miles of hiking."
        },
        {
            title       : "Base Camp",
            tags        : ["Photography"],
            img         : "basecamp.jpg",
            thumb       : "basecamp.jpg",
            description : "This was the view from our campsite next to Snow lake. Luckily we were able to find a nice level spot of dirt and didn't have to sleep on top rocks."
        },
        {
            title       : "Nada Lake",
            tags        : ["Photography"],
            img         : "nadalake.jpg",
            thumb       : "nadalake.jpg",
            description : "This was taken during the last day of our trip. Although I was exhausted and couldn't wait to get back home, some of the views were just too stunning to pass up."
        },
        {
            title       : "Prusik Pass",
            tags        : ["Photography"],
            img         : "prusikpass.jpg",
            thumb       : "prusikpass.jpg",
            description : "If you've ever seen a mountain goat in its natural habitat then you know just how amazing they are at climbing. The Rangers warned us that they can be a little too friendly at times and will try to lick the salt right off you..."
        },
        {
            title       : "Enchantment Basin",
            tags        : ["Photography"],
            img         : "enchantmentbasin.jpg",
            thumb       : "enchantmentbasin.jpg",
            description : "This is one of the many alpine lakes that the Enchantments is known for. Although it was the middle of June, there was still a lot of snow in the upper core."
        },
        {
            title       : "On The Lookout",
            tags        : ["Featured", "Photography"],
            img         : "onthelookout.jpg",
            thumb       : "onthelookout.jpg",
            description : "I found this guy among the wildflowers on Table Mountain in Oroville California. I swear he knew I was taking his picture because he would look back at me several times and then strike a pose."
        },
        {
            title       : "The Freak",
            tags        : ["Featured", "Photography"],
            img         : "thefreak.jpg",
            thumb       : "thefreak.jpg",
            description : "This was taken during a father son trip to AT&T park when the Giants blew out the Brewers and a fly ball landed perfectly in my dad's cup holder."
        },
        {
            title       : "Paint It Black",
            tags        : ["Photography"],
            img         : "paintitblack.jpg",
            thumb       : "paintitblack.jpg",
            description : "Our family was lucky enough to watch Bob Dylan, The Rolling Stones, Neil Young, Paul McCartney, The Who and Roger Waters rock the stage at the first ever Desert Trip concert."
        }
    ];


    return page;

  })(page || {});



// ===========================================
// Extensions
// ===========================================

  !(function (root) {
    "use strict";

    // Capitalize String
    // ===========================================
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };


    // Array Inlcudes 
    // ===========================================
    Array.prototype.includes = function(value) {
      return this.indexOf(value) > -1;
    };
    
  })(this);



// ===========================================
// Utility
// ===========================================

  !(function (root) {
    "use strict";

    // Debounce
    // =======================================
    var debounce = function (fn, delay) {
      if (delay === undefined) { delay = 250; }

      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }


    // Trottle
    // =======================================
    var throttle = function(fn, delay) {
      if (delay === undefined) { delay = 250; }

      var deferTimer,
          last;
      return function () {
        var context = this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + delay) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, delay);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }


    // Selector Cache
    // =======================================
    if (root.jQuery) {
      var selector_cache = function() {
        var elementCache = {};

        var get_from_cache = function( selector, $ctxt, reset ) {
          if ( "boolean" === typeof $ctxt ) {
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
      }
    }


    // Public Methods
    // =======================================
    root.utility = {
      debounce: debounce,
      throttle: throttle
    };

    if (selector_cache) {
      root.$cache = new selector_cache();
    } 

  })(this);





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




// ===========================================
// Artwork - MFP
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Artwork Object
    // =======================================
    if (typeof page.artwork == "undefined") {
      page.artwork = {};
    }

    page.artwork.MFP = {};

    // create shortened aliases
    var _Artwork = page.artwork
    var _MFP = page.artwork.MFP;


    // Build MFP Data
    // =======================================
    var buildMFPData = function() {
      
      // create MFP.Data object to store img paths and indexes by tag
      _MFP.Data = {
        active: [],
        all: []
      };

      // loop through artwork data
      var data = page.data.artwork;
      for (var i = 0, i_len = data.length; i < i_len; i++) {
        var artwork = data[i];
        
        // build an array with all items
        _MFP.Data.all.push({src: "img/artwork/" + artwork.img});

        // loop through each tag
        for (var j = 0, j_len = artwork.tags.length; j < j_len; j++) {
          var tag = artwork.tags[j].toLowerCase();
          
          _buildTagArrays(tag, artwork);
        }
      }
    }


    // Build Tag Arrays
    // =======================================
    var _buildTagArrays = function(tag, artwork) {
      
      // create an array for each tag
      if (typeof _MFP[tag] == "undefined") {
        _MFP[tag] = {};
        _MFP.Data[tag] = [];
      }

      // store index by title in each tag array
      _MFP[tag][artwork.title] = Object.keys(_MFP[tag]).length;

      // add img path to tag data array
      _MFP.Data[tag].push({src: "img/artwork/" + artwork.img});
    } 


    // Open Gallery
    // =======================================
    var _openGallery = function() { 
      var clicked = $(this);
      var title = clicked.attr("data-title");
      var filter = _Artwork.filter;

      // if gallery is filtered, fetch index by title
      var index = filter == "all" ? clicked.index() : _MFP[filter][title];

      $.magnificPopup.open({
        items: _MFP.Data.active,
        gallery: { enabled:true },
        type: "image"
      }, index);
    }


    // Filter Gallery
    // =======================================
    var filterGallery = function(tag) {
      if (tag == undefined) { tag = "all"; }
      tag = tag.toLowerCase();

      // exit function if gallery is already filtered correctly
      if (_Artwork.filter == tag) { return; }

      _setFilter(tag);

      if (tag == "all") {
        $cache(".artwork-item", $cache("#artwork-wrapper")).velocity("fadeIn", {duration: 450});
      }
      else {
        // show all items that match the filter
        var filter = $cache(".js--filter-" + tag, $cache("#artwork-wrapper")).velocity("fadeIn", {duration: 450});

        // hide all other items
        $cache(".artwork-item", $cache("#artwork-wrapper")).not(filter).hide();
      }
    }


    // Set Filtet
    // ===========================================
    var _setFilter = function(tag) {
      // set filter and active gallery
      _Artwork.filter = tag;
      _MFP.Data.active = _MFP.Data[tag];
    }


    // Init MFP
    // =======================================
    var initMFP = function() {
      buildMFPData();
      filterGallery("featured");

      // add click event to open gallery
      $cache("#artwork-wrapper").on("click", ".artwork-item", _openGallery);

      // add click event to filter by tag
      $cache("#artwork-wrapper").on("click", ".artwork-item__tags span", function(e) {
        e.stopPropagation();
        
        // filter by clicked tag
        var tag = $(this).html();
        page.artwork.filterGallery(tag);
        page.artwork.toggleIcon(tag);
        page.scroll.smoothScroll("#artwork-menu-wrapper", {duration: 0, padding: 0});
      });
    }


    // Public Methods
    // =======================================
    _Artwork.filterGallery = filterGallery;
    _Artwork.buildMFPData = buildMFPData;
    _Artwork.initMFP = initMFP;


    return page;
  })(page || {});




// ===========================================
// Events - Desktop
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Events Object
    // =======================================
    if (typeof page.events == "undefined") {
      page.events = {};
    }


    // Desktop Events
    // =======================================
    var desktopOn = function() {
      $cache("#artwork-menu").on("click.desktop", ".responsive-menu__link", function() {
        page.scroll.smoothScroll(this, {duration: 500, padding: 0});
        return false;
      });

      $cache("#main-menu").on("click.desktop", ".responsive-menu__link", function() {
        page.scroll.smoothScroll(this, {duration: 750, padding: 15});
        return false;
      });

      page.menu.desktopState("#main-menu");
      page.menu.desktopState("#artwork-menu");

      $cache("body").imagesLoaded().always(function(){
        page.menu.startStickyMenu("#main-menu");
      });
    };

    var desktopOff = function() {
      $cache("#main-menu").off(".desktop");
      $cache("#artwork-menu").off(".desktop");

      page.menu.mobileState("#main-menu");
      page.menu.mobileState("#artwork-menu");
      page.menu.stopStickyMenu("#main-menu");
    };


    // Public Methods
    // =======================================
    page.events.desktop = {
      on: desktopOn,
      off: desktopOff
    };

    return page;
  })(page || {});



// ===========================================
// Events - General
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Events Object
    // =======================================
    if (typeof page.events == "undefined") {
      page.events = {};
    }


    // General Events
    // =======================================
    var generalOn = function() {
      $cache("#artwork-menu").on("click.general", ".responsive-menu__link", function(){
        var tag = $(this).attr("data-filter");

        page.artwork.filterGallery(tag);
        page.artwork.toggleIcon(tag);
      });

      $cache("#project-wrapper").on("click.general", ".card", function() {
        page.projects.showCardOverlay($(this));
      });

      $cache("#project-wrapper").on("click.general", ".card__overlay", function(e) {
        page.projects.hideCardOverlay($(this));
        e.stopPropagation();
      });

      $cache("#project-wrapper").on("click.general", ".card__footer", function(e) {
        e.stopPropagation();
      });

      $cache("body").on("click.general", ".link", function(){
        page.scroll.smoothScroll(this, {duration: 750, padding: 15});
        return false;
      });
    };



    // Public Methods
    // =======================================
    page.events.general = {
      on: generalOn
    };

    return page;
  })(page || {});




// ===========================================
// Events - Mobile
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Events Object
    // =======================================
    if (typeof page.events == "undefined") {
      page.events = {};
    }


    // Mobile Events
    // =======================================
    var mobileOn = function() {
      $cache("#artwork-menu-button").on("click.mobile", function(){
        page.menu.show("#artwork-menu", "right", 500);
      });

      $cache("#artwork-menu").on("click.mobile", ".hamburger-button", function(){
        page.menu.hide("#artwork-menu", "right", 500);
      });

      $cache("#artwork-menu").on("click.mobile", ".responsive-menu__link", function() {
        page.menu.hide("#artwork-menu", "right", 500);
        page.scroll.smoothScroll(this, {duration: 0, padding: 0});
        return false;
      });


      $cache("#main-menu-button").on("click.mobile", function(){
        page.menu.toggle("#main-menu", "up", 500);
        $(this).toggleClass("hamburger-button--open");
      });

      $cache("#main-menu").on("click.mobile", ".responsive-menu__link", function() {
        page.menu.hide("#main-menu", "up", 500);
        $cache("#main-menu-button").removeClass("hamburger-button--open");
        page.scroll.smoothScroll(this, {duration: 0, padding: 15});
        return false;
      });
    };

    var mobileOff = function() {
      $cache("#artwork-menu-button").off(".mobile");
      $cache("#artwork-menu").off(".mobile");

      $cache("#main-menu-button").off(".mobile");
      $cache("#main-menu").off(".mobile");
    };


    // Public Methods
    // =======================================
    page.events.mobile = {
      on: mobileOn,
      off: mobileOff
    };

    return page;
  })(page || {});




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




// ===========================================
// Menu - States
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Menu Object
    // =======================================
    if (typeof page.menu == "undefined") {
      page.menu = {};
    }


    // Mobile
    // =======================================
    var mobileState = function(menu) {
      $cache(menu).addClass("responsive-menu--hidden responsive-menu--fullscreen");
    };


    // Desktop
    // =======================================
    var desktopState = function(menu) {
      $cache(menu).removeClass("responsive-menu--hidden responsive-menu--fullscreen");
    };


    // Public Methods
    // =======================================
    page.menu.mobileState = mobileState;
    page.menu.desktopState = desktopState;


    return page;
  })(page || {});




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




// ===========================================
// Page - Breakpoints
// ===========================================

  !(function(page) {
    "use strict";

    $cache(document).ready(function() {
      page.breakpoints.mobile.addListener(function(e){
        if (e.matches) {
          page.events.mobile.on();
          page.events.desktop.off();
        }
      });

      page.breakpoints.desktop.addListener(function(e){
        if (e.matches) {
          page.events.mobile.off();
          page.events.desktop.on();
        }
      });
    });

  })(page);



// ===========================================
// Page - Loading
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Loading Object
    // =======================================
    if (typeof page.loading == "undefined") {
      page.loading = {};
    }


    // Init Loading
    // =======================================
    var init = function() {
      page.scroll.disable();

      var timerDone = false;
      var imagesLoaded = false;

      var loading = setInterval(function(){
        if (timerDone && imagesLoaded) {
          clearInterval(loading);
          doneLoading();
        }
      }, 250);

      $cache("body").imagesLoaded().always(function(){
        imagesLoaded = true;
      });

      setTimeout(function(){
        timerDone = true;
      }, 2000);
    };


    // Done Loading
    // =======================================
    var doneLoading = function() {
      $cache("#loading-screen").addClass("loader--loaded");
      
      setTimeout(function() {
        $cache("#loading-screen").removeClass("loader--loading");
        scrollToMenu();
      }, 700);
    };

    var scrollToMenu = function() {
      var menu = $cache("#main-menu-wrapper");
      var menuBottom = menu.offset().top + menu.height();
      var scrollPos = menuBottom - $cache(window).height();
      
      $cache("html").velocity("scroll", {
        duration: 1000, 
        offset: scrollPos, 
        easing: "easeOut",
        complete: function() {
          page.scroll.enable();
        }
      }); 
    };


    // Public Methods
    // =======================================
    page.loading.init = init;


    return page;
  })(page || {});




// ===========================================
// Page - Scroll
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Scroll Object
    // =======================================
    if (typeof page.scroll == "undefined") {
      page.scroll = {};
    }


    // Smooth Srolling
    // =======================================
    var scrollTo = function(link, options) {
      if (typeof link == "string") {
        smoothScroll(link, options);
      }
      else if (link.hash) {
        smoothScroll(link.hash, options);
      }
      else {
        window.open(link.href, link.target);
      }
    };

    var smoothScroll = function(target, options) {
      var menuHeight = 0;
      if (page.breakpoints.desktop.matches) {
        menuHeight = $cache("#main-menu").height();
      }

      $cache(target).velocity("scroll", {
        duration: options.duration, 
        offset: -(menuHeight + options.padding)
      });
    };


    // Disable Scrolling
    // =======================================
    var disable = function() {
      $cache("html").css({"overflow":"hidden", "height":"100%"});
      $cache("body").bind("touchmove", function(e){e.preventDefault()});
    };


    // Enable Scrolling
    // =======================================
    var enable = function() {
      $cache("html").css({"overflow":"auto", "height":"auto"});
      $cache("body").unbind("touchmove");
    };


    // Public Methods
    // =======================================
    page.scroll.smoothScroll = scrollTo;
    page.scroll.disable = disable;
    page.scroll.enable = enable;


    return page;
  })(page || {});



// ===========================================
// Projects - Animations
// ===========================================

  var page = (function(page) {
    "use strict";
  
    // Projects Object
    // =======================================
    if (typeof page.projects == "undefined") {
      page.projects = {};
    }


    // Show Overlay
    // =======================================
    var showOverlay = function(card) {
      var overlay = card.find(".card__overlay");
      var distance = card.find(".card__img").height();

      $.Velocity.hook(overlay, "translateY", distance + "px");
      overlay.velocity({translateY: 0}, {
        duration: 500,
        begin: function() {
          overlay.removeClass("card__overlay--hidden");
        }
      });
    };


    // Hide Overlay
    // =======================================
    var hideOverlay = function(overlay) {
      var card = overlay.parent(".card");
      var distance = card.find(".card__img").height();

      overlay.velocity({translateY: distance}, {
        duration: 500,
        complete: function(){
          overlay.addClass("card__overlay--hidden");
        }
      });
    };


    // Public Methods
    // =======================================
    page.projects.showCardOverlay = showOverlay;
    page.projects.hideCardOverlay = hideOverlay;


    return page;
  })(page || {});




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



// ===========================================
// Page - Init
// ===========================================

  !(function(page) {
    "use strict";

    $cache(document).ready(function() {
      generalInit();

      if (page.breakpoints.mobile.matches) {
        page.events.mobile.on();
      }
      else if (page.breakpoints.desktop.matches) {
        page.events.desktop.on();
        desktopInit();
      }
    });


    // General Init
    // ========================================
    var generalInit = function() {
      page.projects.buildHTML();
      page.artwork.buildHTML();
      page.artwork.buildMenu();
      page.artwork.initMFP();
      page.artwork.toggleIcon("featured");
      page.loading.init();
      page.events.general.on();
    };


    // Mobile Init
    // ========================================
    var mobileInit = function() {
      
    };


    // Desktop Init
    // ========================================
    var desktopInit = function() {
      Waves.attach(".card__img");
      Waves.init();
    };

  })(page);

