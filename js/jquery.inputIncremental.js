/*global $*/
/* jquery.inputIncremental
 *
 * Version 0.0.1 by Florent Detry
 *
 * Extends jQuery <http://jquery.com>
 *
 */
$.fn.inputIncremental = function(options){
  'use strict';

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

    var params = $.extend({
      value: 1,
      minVal: 0,
      maxVal: null,
      throttle: 1000,
      autocomplete: false,
      negative: false
    }, options);

    // Metadata
    var metadata = $inputs.data();
    var keys = ['minVal', 'maxVal', 'value', 'throttle'];
    keys.forEach(function(i_key) {
      if(metadata[i_key] !== undefined) {
        params[i_key] = metadata[i_key];
      }
    });
    if(metadata.theme !== undefined) {
      $inputContainer.addClass(metadata.theme);
    }
    if(metadata.negative !== undefined) {
      params.negative = metadata.negative;
    }

    if(!params.autocomplete) {
      $inputs.attr('autocomplete', 'off');
    }

    if(params.negative && params.minVal >= 0) {
      params.minVal = null;
    }

    var setInputValue = function (input, value) {
      var $input = $(input);
      var throttle = $input.data('inputIncremental-throttle');
      if (!throttle) {
        throttle = $.throttle(params.throttle, function() {
          $input.trigger('change');
        });
        $input.data('inputIncremental-throttle', throttle);
      }

      if(params.minVal !== null && value < params.minVal) {
        value = params.minVal;
      }
      if(params.maxVal && value > params.maxVal) {
        value = params.maxVal;
      }

      $input.val(value);
      throttle(value);
    };

    $inputs.on('keypress', function(e) {
      if( (e.which < 48 || e.which > 57 ) && e.which !== 8 && e.which !== 0 && e.which !== 44 && e.which !== 46 ) {
        e.preventDefault();
      }
    });
    $inputs.on('keydown', function(e) {
      var triggerClick = function($button) {
        $button.addClass('hover')
             .trigger('click');
        setTimeout(function() {
          $button.removeClass('hover');
        }, 200);
      };

      if( e.which === 38 ) {
        triggerClick( $(this).parent().find('a.increment') );
      } else if( e.which === 40 ) {
        triggerClick( $(this).parent().find('a.decrement') );
      } else if ( e.keyCode === 9  ) { // TAB

      }
    });

    $inputContainer.on('click', 'a', function(e){
      e.preventDefault();

      if( $inputContainer.is('.disabled') ) {
        return;
      }

      var $input = $inputContainer.find('input'),
        nb = $input.val().replace(',', '.');

      if ( params.numberType === 'int') {
        nb = parseInt($input.val());
      } else {
        nb = parseFloat($input.val());
      }

      if(isNaN(nb)) {
        nb = params.minVal;
      }

      if( $(this).hasClass('increment') ) {
        nb = nb + params.value;
      } else if( $(this).hasClass('decrement') ) {
        nb = nb - params.value;
      }

      // arrondi a max 2
      setInputValue($input, Math.round(nb*100)/100);
      $input.focus();
    });

    $inputs.on('focus', function(){
      $inputContainer.addClass('focus');
      setInputValue(this, this.value.replace(',', '.'));
      setTimeout($.proxy(function(){
        this.select();
      },$inputs),10);
    }).on('blur', function(){
      setInputValue(this, this.value.replace(',', '.'));
      $inputContainer.removeClass('focus');
      var $this = $(this),
        value = parseInt($this.val());

      if( isNaN(value) || $this.val() === '' || value < params.minVal) {
        setInputValue($this, params.minVal);
      }
    });
  });
};
