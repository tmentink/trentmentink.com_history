
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

