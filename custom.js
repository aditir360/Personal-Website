jQuery(function($) {

    // Fixed nav
    $.fn.checkHeaderPositioning = function(scrollEl, scrollClass) {
        var $me = $(this);

        if (!$me.length) {
          return;
        }

        if($(scrollEl).scrollTop() > 50) {
            $me.addClass(scrollClass);
        } else if($(scrollEl).scrollTop() === 0) {
            $me.removeClass(scrollClass);
        }
    };

  $.fn.expandableSidebar = function(expandedClass) {
    var $me = this;

    $me.on('click', function() {
      if(!$me.hasClass(expandedClass)) {
        $me.addClass(expandedClass);
      } else {
        $me.removeClass(expandedClass);
      }
    });
  }


  $.fn.intervalLoop = function(condition, action, duration, limit) {
    var counter = 0;
    var looper = setInterval(function(){
      if (counter >= limit || $.fn.checkIfElementExists(condition)) {
        clearInterval(looper);
      } else {
        action();
        counter++;
      }
    }, duration);
  }


  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }

  var birdseyeController = {
    init: function(opts) {
      var base = this;

      $('body').checkHeaderPositioning(window, 'affix');

 
      base._addClasses();

      if(!$('body').hasClass('wsite-editor') && $('#wsite-nav-cart-a').length) {
        $('#wsite-nav-cart-a').html($('#wsite-nav-cart-a').html().replace(/[()]/g, ''));
      }

      setTimeout(function(){
        base._checkCartItems();
        base._attachEvents();
        if($('#wsite-nav-cart-a').length) {
          $('#wsite-nav-cart-a').html($('#wsite-nav-cart-a').html().replace(/[()]/g, ''));
        }
        $('.banner-wrap .container').css("padding-top", $('.birdseye-header').outerHeight() + "px");
      }, 1500);
    },

    _addClasses: function() {
      var base = this;

        $('body').addClass('fade-in');

      
      $('.wsite-menu-default').find('li.wsite-menu-item-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item'));
        }
      });
