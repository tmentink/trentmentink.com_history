
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


