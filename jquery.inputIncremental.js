/*global jQuery*/
/* jquery.inputIncremental
 *
 * Version 0.0.1 by Florent Detry
 *
 * Extends jQuery <http://jquery.com>
 *
 */
$.fn.inputIncremental = function(options){
  return this.each(function() {
    var $inputs = $(this);
    $inputs.wrap('<span class="inputIncremental"/>');
    var $inputContainer = $inputs.parent();

    $inputContainer.append(
      $('<div />').addClass('incrementalButtonBox').append(
          $('<a href="#"/>').addClass('increment')
        ).append(
          $('<a href="#"/>').addClass('decrement')
        )
    );

    var defaultOptions = {
      value: 1,
      minVal: 0,
      maxVal: null,
      throttle: 1000,
      autocomplete: false
    };

    var params = $.extend(defaultOptions, options);

    // min val in data
    var metadata = $inputs.data();
    if(metadata.minval != undefined) {
      params.minVal = metadata.minval;
    }
    if(metadata.throttle != undefined) {
      params.throttle = metadata.throttle;
    }
    if(metadata.theme != undefined) {
      $inputContainer.addClass(metadata.theme);
    }

    if(!params.autocomplete) {
      $inputs.attr('autocomplete', 'off');
    }

    var setInputValue = function (input, value) {
      var $input = $(input);
      var throttle = $input.data('inputIncremental-throttle');
      if (!throttle) {
        throttle = $.throttle(params.throttle, function (val) {
          $input.trigger('change');
        });
        $input.data('inputIncremental-throttle', throttle);
      }

      if(value < params.minVal) value = params.minVal;
      if(params.maxVal && value > params.maxVal) value = params.maxVal;

      $input.val(value);
      throttle(value);
    };

    $inputs.on('keypress', function(e) {
      if( (e.which < 48 || e.which > 57 ) && e.which != 8 && e.which != 0 && e.which != 44 && e.which != 46 ) {
        e.preventDefault();
      }
      setInputValue(this, $(this).val().replace(',', '.'));
    });
    $inputs.on('keydown', function(e) {
      var triggerClick = function($button) {
        $button.addClass('hover')
             .trigger('click');
        setTimeout(function() {
          $button.removeClass('hover');
        }, 200);
      };

      if( e.which == 38 ) {
        triggerClick( $(this).parent().find("a.increment") );
      } else if( e.which == 40 ) {
        triggerClick( $(this).parent().find("a.decrement") );
      } else if ( e.keyCode == 9  ) { // TAB

      }
    });

    $inputContainer.on('click', 'a', function(e){
      e.preventDefault();

      if( $inputContainer.is('.disabled') ) return;

      var $input = $inputContainer.find('input'),
        nb = $input.val();

      if ( params.numberType == "int") {
        nb = parseInt($input.val());
      } else {
        nb = parseFloat($input.val());
      }

      if( isNaN(nb) ) nb = params.minVal;

      if( $(this).hasClass('increment') ) {
        nb = nb + params.value;
      } else if( $(this).hasClass('decrement') ) {
        nb = nb - params.value;
      }

      // arrondi a max 2
      setInputValue($input, Math.round(nb*100)/100);
      $input.focus();
    });

    $inputs.on('focus', function(e){
      $inputContainer.addClass('focus');
      setTimeout($.proxy(function(){
        this.select();
      },$inputs),10);
    }).on('blur', function(e){
      $inputContainer.removeClass('focus');
      var $this = $(this),
        value = parseInt($this.val());

      if( isNaN(value) || $this.val() == "" || value < params.minVal) {
        setInputValue($this, params.minVal);
      }
    });
  });
};