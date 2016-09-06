/*global $*/
/* jquery.inputIncremental
 *
 * Version 0.3.0 by Florent Detry
 *
 * Extends jQuery <http://jquery.com>
 *
 */
$.fn.inputIncremental = function(options){
  'use strict';

  return this.each(function() {
    var $input = $(this);
    $input.wrap('<span class="inputIncremental"/>');
    var $inputContainer = $input.parent();

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
      debounce: 1000,
      autocomplete: false,
      negative: false,
      integer: false
    }, options);

    // Metadata
    var metadata = $input.data();
    var keys = ['minVal', 'maxVal', 'value', 'debounce', 'integer'];
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
      $input.attr('autocomplete', 'off');
    }

    if(params.negative && params.minVal >= 0) {
      params.minVal = null;
    }

    var setInputValue = function (value) {
      var debounce = $input.data('inputIncremental-debounce');
      if (!debounce) {
        if (params.throttle) {
          console.log('WARN: `throttle` is deprecated. Use `debounce` instead.');
          params.debounce = params.throttle;
        }

        debounce = $.debounce(params.debounce, function() {
          $input.trigger('change');
        });
        $input.data('inputIncremental-debounce', debounce);
      }

      if(params.minVal !== null && value < params.minVal) {
        value = params.minVal;
      }
      if(params.maxVal && value > params.maxVal) {
        value = params.maxVal;
      }

      $input.val(value);
      debounce(value);
    };

    var checkValue = function (val) {
      var nb = val.replace(',', '.');

      if ( params.integer ) {
        nb = parseInt(nb);
      } else {
        nb = parseFloat(nb);
      }

      if(isNaN(nb)) {
        nb = params.minVal;
      }

      return nb;
    };

    $input.on('keypress', function(e) {
      if(
        (e.which < 48 || e.which > 57 ) && // 0-9
        e.which !== 8 && // backspace
        e.which !== 0 &&
        e.which !== 44 && // ,
        e.which !== 46 && // .
        !(params.negative && e.which === 45) // -
      ) {
        e.preventDefault();
      }
    });
    $input.on('keydown', function(e) {
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

    $inputContainer.on('click', 'a', function (e) {
      e.preventDefault();

      if (
        $inputContainer.hasClass('disabled') ||
        $input.hasClass('disabled') ||
        $input.is(':disabled')
      ) {
        return;
      }

      var nb = checkValue($input.val());

      if( $(this).hasClass('increment') ) {
        nb = nb + params.value;
      } else if( $(this).hasClass('decrement') ) {
        nb = nb - params.value;
      }

      // round 2
      setInputValue(Math.round(nb*100)/100);
      $input.focus();
    });

    $input.on('focus', function(){
      $inputContainer.addClass('focus');
      setInputValue(checkValue(this.value));
      setTimeout($.proxy(function(){
        this.select();
      },$input),10);
    }).on('blur', function(){
      $inputContainer.removeClass('focus');
      setInputValue(checkValue(this.value));
    });
  });
};
