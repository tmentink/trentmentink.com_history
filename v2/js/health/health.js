

/* =================================
   =DIRECTORY
   ================================= */
/*
  1.  =Page Init
  2.  =Loading Screen
  3.  =Menu
  4.  =BMR Section
  5.  =TDC Section
  6.  =Goal Section
  7.  =Macro Section
  8.  =Form Validation
  9.  =jQuery Ehancements
  10. =Utility Functions
*/


/* =================================
   =Global Variables
   ================================= */

   var bodyWeight,
       gender,
       bmr,
       bmrFormComplete = 0,
       tdc,
       tdcFormComplete = 0,
       goal,
       goalFormComplete = 0;



/* =================================
   =Page Init
   ================================= */

$('document').ready(function () {
  initLoadingScreen('timeout');
  initMenu();
  initValidations();
  bmrForm();
  tdcForm();
  goalForm();
  macroForm();

});



/* =================================
   =Loading Screen
   ================================= */


function initLoadingScreen(x, time) {
  time = time || 2000;

  //finish loading animaition after images have loaded
  if (x === 'imagesLoaded') {
    $('document').imagesLoaded(function () {
      $('body').addClass('loaded');
    });

  //finish loading animation after timeout
  } else if (x === 'timeout') {
    setTimeout(function () {
      $('body').addClass('loaded');
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
   =BMR Section
   ================================= */
/*
  1. ~bmrForm
  2. ~bmrCalculation
*/


/* ~bmrForm
   --------------------------------- */
function bmrForm() {

  $('#calculate-bmr').click(function () {          
    // get formValidation reference
    var fv = $('#bmr-form').data('formValidation')

    // validate form
    $('#bmr-form').formValidation().formValidation('validate');

    // if valid, run calculation and show result panel
    if (fv.isValid()) {
      bmrCalculation();
      $('#bmr-form').hide();
      $('#bmr-resultForm').show();
    }
  }) //<--- #calculate-bmr.click()

  // show bmr-form
  $('#recalculate-bmr').click(function () {
      $('#bmr-resultForm').hide();
      $('#bmr-form').show();
  })   
} //<--- bmrForm()


/* ~bmrCalcuation
   --------------------------------- */
function bmrCalculation() {
    
  var height = parseInt($('#txtHeight-ft').val() * 12) + parseInt($('#txtHeight-in').val()),
      age = parseInt($('#txtAge').val());

  bodyWeight = parseInt($('#txtWeight').val());

  if (document.getElementById('gender-male').checked) {
    bmr = parseFloat(66 + ( 6.23 * bodyWeight) + ( 12.7 * height) - ( 6.8 * age));
    gender = 'male';
  } 
  else if(document.getElementById('gender-female').checked) {
    bmr = parseFloat(655 + ( 4.35 * bodyWeight) + ( 4.7 * height) - ( 4.7 * age));
    gender = 'female';
  }

  $('#bmr-result').html(Math.floor(bmr) + ' cal');
  $('#bmr-result1').html(Math.floor(bmr) + ' cal');

  $("#tdc-customError").html("");
  bmrFormComplete = 1;

} //<--- bmrCalculation()



/* =================================
   =TDC Section
   ================================= */


function tdcForm() {

  $('#calculate-tdc').click(function () {      
    
    var errorMessage = $("#tdc-customError");

    if (bmrFormComplete == 0) {
      errorMessage.html("Complete The BMR Form"); 
    } 
    else {
      errorMessage.html("");

      // get formValidation reference
      var fv = $('#tdc-form').data('formValidation')

      // validate form
      $('#tdc-form').formValidation().formValidation('validate');

      // if valid, run calculation and show result panel
      if (fv.isValid()) {
        tdcCalculation();

        $('#tdc-form').hide();
        $('#tdc-resultForm').show();  
      }      
    }
  }) //<--- #calculate-tdc.click()

  // show tdc-form
  $('#recalculate-tdc').click(function () {
      $('#tdc-resultForm').hide();
      $('#tdc-form').show();
  })   
} //<--- tdcForm()


/* ~tdcCalcuation
   --------------------------------- */
function tdcCalculation() {
    
  var workActivity,
      exerciseDay,
      exerciseMin,
      exerciseLevel,
      activityLevel;

  var work = document.getElementById("workActivity");
  workActivity = parseFloat(work.options[work.selectedIndex].value);

  var ed = document.getElementById("exerciseDay");
  exerciseDay = parseFloat(ed.options[ed.selectedIndex].value);

  var em = document.getElementById("exerciseMin");
  exerciseMin = parseFloat(em.options[em.selectedIndex].value);

  var el = document.getElementById("exerciseLevel");
  exerciseLevel = parseFloat(el.options[el.selectedIndex].value); 

  activityLevel = (workActivity + (exerciseDay * (exerciseMin + exerciseLevel)));

  // if (activityLevel < 1.5) {
  //   console.log("Sedentary");
  // } else if (activityLevel < 2.5) {
  //   console.log("Lightly Active");
  // } else if (activityLevel < 3.5) {
  //   console.log("Active");
  // } else if (activityLevel < 4.5) {
  //   console.log("Very Active");
  // } else if (activityLevel > 4.5) {
  //   console.log("Extremely Active");
  // }

  if (activityLevel < 1.5) {
    tdc = (bmr * 1.2);
  } else if (activityLevel < 2.5) {
    tdc = (bmr * 1.375);
  } else if (activityLevel < 3.5) {
    tdc = (bmr * 1.55);
  } else if (activityLevel < 4.5) {
    tdc = (bmr * 1.725);
  } else if (activityLevel > 4.5) {
    tdc = (bmr * 1.9);
  }

  $('#tdc-result').html(Math.floor(tdc) + ' cal');
  $('#tdc-result1').html(Math.floor(tdc) + ' cal');
  $("#goal-customError").html("");
  tdcFormComplete = 1;

} //<--- tdcCalculation()



/* =================================
   =Goal Section
   ================================= */

function goalForm() {

  $('#calculate-goal').click(function () {         
    var errorMessage = $("#goal-customError");

    if (tdcFormComplete == 0) {
      errorMessage.html("Complete The TDC Form"); 
    } 
    else {
      errorMessage.html("");

      // get formValidation reference
      var fv = $('#goal-form').data('formValidation')

      // validate form
      $('#goal-form').formValidation().formValidation('validate');

      // if valid, run calculation and show result panel
      if (fv.isValid()) {
        goalCalculation();

        $('#goal-form').hide();
        $('#goal-resultForm').show();   
      }      
    }
  }) //<--- #calculate-goal.click()

  // show goal-form
  $('#recalculate-goal').click(function () {
      $('#goal-resultForm').hide();
      $('#goal-form').show();
  })   
} //<--- goalForm()


/* ~goalCalcuation
   --------------------------------- */
function goalCalculation() {
    
  var goalIntensity;

  if (document.getElementById('intensity1').checked) {
    goalIntensity = (tdc * .10);
  } 
  else if (document.getElementById('intensity2').checked) {
    goalIntensity = (tdc * .15);
  } 
  else if (document.getElementById('intensity3').checked) {
    goalIntensity = (tdc * .20);
  }

  if (document.getElementById('goal1').checked) {
    goal = tdc - goalIntensity;
  } 
  else if (document.getElementById('goal2').checked) {
    goal = tdc;
  } 
  else if (document.getElementById('goal3').checked) {
    goal = tdc + goalIntensity
  }

  $('#goal-result').html(Math.floor(goal) + ' cal');
  $('#goal-result1').html(Math.floor(goal) + ' cal');
  $("#macro-customError").html("");
  goalFormComplete = 1;

} //<--- goalCalculation()



/* =================================
   =Macro Section
   ================================= */

function macroForm() {

  // get formValidation reference
  var fv = $('#macro-form').data('formValidation'),
      errorMessage = $("#macro-customError");

  $('.nutritionPlan').click(function() {
    if($('#plan4').is(':checked')) {
      $('#customRatio').show(); 
    }
    else { 
      $('#macro-form').data('formValidation').resetForm();
      errorMessage.html("");
      $('#customRatio').hide();
    }
  });

  $('#calculate-macro').click(function () {        
    if (goalFormComplete == 0) {
      errorMessage.html("Complete The Goal Form"); 
    } 
    else {
      errorMessage.html("");

      if ($("#customRatio").is(":visible")) {
        var fat = parseInt($('#ratioFat').val()),
            protein = parseInt($('#ratioProtein').val()),
            carbs = parseInt($('#ratioCarbs').val()),
            totalRatio = fat + protein + carbs;

        if (totalRatio == 100) {
          errorMessage.html("");

          // validate form
          $('#macro-form').formValidation().formValidation('validate');
          
          // if valid, run calculation and show result panel
          if (fv.isValid()) {
            macroCalculation();

            $('#macro-form').hide();
            $('#macro-resultForm').show();   
          }
        }
        else {
          errorMessage.html("Custom Ratios Must Equal 100"); 
        } 
      } 
      else {
        errorMessage.html("");

        // validate form
        $('#macro-form').formValidation().formValidation('validate');
        // if valid, run calculation and show result panel
        if (fv.isValid()) {
          macroCalculation();

          $('#macro-form').hide();
          $('#macro-resultForm').show();   
        }
      }     
    } 
  }) //<--- #calculate-macro.click()

  // show macro-form
  $('#recalculate-macro').click(function () {
      $('#macro-resultForm').hide();
      $('#macro-form').show();
  })   
} //<--- macroForm()


/* ~macroCalcuation
   --------------------------------- */
function macroCalculation() {
    
  var calFat,
      resultFat,
      calProtein,
      resultProtein,
      calCarbs,
      resultCarbs;

  if (document.getElementById('plan1').checked) {
    resultFat = (bodyWeight * .4);
    
    if (gender == 'male') {
      resultProtein = (bodyWeight * .9);
    } 
    else {
      resultProtein = (bodyWeight * .7);
    }

    calFat = (resultFat * 9);
    calProtein = (resultProtein * 4);
    calCarbs = (goal - (calFat + calProtein));
    resultCarbs = (calCarbs / 4); 
  } 
  else if (document.getElementById('plan2').checked) {
    calFat = (goal * .15);
    calProtein = (goal * .30);
    calCarbs = (goal * .55);

    resultFat = (calFat / 9);
    resultProtein = (calProtein / 4);
    resultCarbs = (calCarbs / 4);
  } 
  else if (document.getElementById('plan3').checked) {
    calFat = (goal * .35);
    calProtein = (goal * .35);
    calCarbs = (goal * .30);

    resultFat = (calFat / 9);
    resultProtein = (calProtein / 4);
    resultCarbs = (calCarbs / 4);
  }
  else if (document.getElementById('plan4').checked) {
    var ratioFat = parseInt($('#ratioFat').val()) / 100,
        ratioProtein = parseInt($('#ratioProtein').val()) / 100,
        ratioCarbs = parseInt($('#ratioCarbs').val()) / 100;

    calFat = (goal * ratioFat);
    calProtein = (goal * ratioProtein);
    calCarbs = (goal * ratioCarbs);

    resultFat = (calFat / 9);
    resultProtein = (calProtein / 4);
    resultCarbs = (calCarbs / 4);
  }

  $('#resultFat').val(Math.floor(resultFat));
  $('#resultProtein').val(Math.floor(resultProtein));
  $('#resultCarbs').val(Math.floor(resultCarbs));

  macroFormComplete = 1;

} //<--- macroCalculation()



/* =================================
   =Form Validation
   ================================= */

function initValidations() {

  $('#bmr-form').formValidation({
    framework: 'bootstrap',
    err: {
      clazz: 'error-messages',
      container: '#bmr-errors'
    },
    fields: {
      gender: {
        validators: {
          notEmpty: {
            message: 'Select a gender'
          },
        }
      },
      feet: {
        validators: {
          notEmpty: {
            message: 'Feet is required'
          },
          regexp: {
            regexp: /^[1-9][0-9]*$/,
            message: 'Feet must be greater than 0'
          }
        }
      },
      inches: {
        validators: {
          notEmpty: {
            message: 'Inches is required'
          },
          between: {
            min: 0,
            max: 11,
            message: 'Inches must be between 0 and 11'
          }
        }
      },
      weight: {
        validators: {
          notEmpty: {
            message: 'Weight is required'
          },
          regexp: {
            regexp: /^[1-9][0-9]*$/,
            message: 'Weight must be greater than 0'
          }
        }
      },
      age: {
        validators: {
          notEmpty: {
            message: 'Age is required'
          },
          regexp: {
            regexp: /^[1-9][0-9]*$/,
            message: 'Age must be a greater than 0'
          }
        } 
      },
    } //<--- fields:
  }); //<--- .formValidation


  $('#tdc-form').formValidation({
    framework: 'bootstrap',
    err: {
      clazz: 'error-messages',
      container: '#tdc-errors'
    },
    fields: {
      workActivity: {
        validators: {
          notEmpty: {
            message: 'Activity is required'
          },
        }
      },
      exerciseDay: {
        validators: {
          notEmpty: {
            message: 'Days is required'
          },
        }
      },
      exerciseMin: {
        validators: {
          notEmpty: {
            message: 'Mins is required'
          },
        }
      },
      exerciseLevel: {
        validators: {
          notEmpty: {
            message: 'Intensity is required'
          },
        }
      },
    } //<--- fields:
  }); //<--- .formValidation


  $('#goal-form').formValidation({
    framework: 'bootstrap',
    err: {
      clazz: 'error-messages',
      container: '#goal-errors'
    },
    fields: {
      weightGoal: {
        validators: {
          notEmpty: {
            message: 'Select your weight goal'
          },
        }
      },
      goalIntensity: {
        validators: {
          notEmpty: {
            message: 'Select your goal intensity'
          },
        }
      },
    } //<--- fields:
  }); //<--- .formValidation


  $('#macro-form').formValidation({
    framework: 'bootstrap',
    err: {
      clazz: 'error-messages',
      container: '#macro-errors'
    },
    fields: {
      nutritionPlan: {
        validators: {
          notEmpty: {
            message: 'Select your nutrition plan'
          },
        }
      },
      fat: {
        validators: {
          notEmpty: {
            message: 'Enter a fat ratio'
          },
        }
      },
      protein: {
        validators: {
          notEmpty: {
            message: 'Enter a protein ratio'
          },
        }
      },
      carbs: {
        validators: {
          notEmpty: {
            message: 'Enter a carbs ratio'
          },
        }
      },
    } //<--- fields:
  }) //<--- .formValidation

}     //<--- initValidations()



/* =================================
   =jQuery Enhancements
   ================================= */


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
              scrollTop: (target.offset().top - 20)
          }, 500);
          return false;
        }
      }

    });
});












