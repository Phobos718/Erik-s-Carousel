;(function ( $ ) {
    if (!$.myNamespace) {
        $.myNamespace = {};
    }



    $.myNamespace.ErikzCarousel = function ( el, options ) {

        var base = this;

        base.$el        = $(el);
        base.el         = el;
        base.$el.data( "myNamespace.ErikzCarousel" , base );

        base.init = function () {

            $.myNamespace.ErikzCarousel.options = $.extend({}, $.myNamespace.ErikzCarousel.defaultOptions, options);
            $.myNamespace.ErikzCarousel.buttons.init();
            $.myNamespace.ErikzCarousel.indicator.init();           
            $.myNamespace.ErikzCarousel.highlightButtons(); 
            $.myNamespace.ErikzCarousel.buttons_enabled = true;
            $.myNamespace.ErikzCarousel.autoplay();
        };

        base.init();
    };

    $.myNamespace.ErikzCarousel.buttons = {

        init : function() {
            if ($.myNamespace.ErikzCarousel.options.buttons) {
                $('.carousel').append(
                    '<!-- Left/Right controls -->\n<div class="button">\n<button class="bttn right">\n<p>&#10095;</p>\n'+
                    '</button>\n<button class="bttn left">\n<p>&#10094;</p>\n</button>\n</div>\n'
                );
                $('.right').click(
                    function(){
                        if ($.myNamespace.ErikzCarousel.buttons_enabled) { $.myNamespace.ErikzCarousel.buttons.click('right'); }
                    }
                );
                $('.left').click(
                    function(){
                        if ($.myNamespace.ErikzCarousel.buttons_enabled) { $.myNamespace.ErikzCarousel.buttons.click('left'); }
                    }
                );
            }
        },

        click : function(direction) {
                _current_index  = $('.indicator ul li').index($('.active_button')),
                _next_index     = _current_index === $.myNamespace.ErikzCarousel.slides.buildArray().length - 1 ? 0 : _current_index + 1,
                _prev_index     = _current_index === 0 ? $.myNamespace.ErikzCarousel.slides.buildArray().length - 1 : _current_index - 1; 

            if (direction === 'right' && $.myNamespace.ErikzCarousel.buttons_enabled && (_next_index != 0 || $.myNamespace.ErikzCarousel.options.loopable)) {
                $.myNamespace.ErikzCarousel.slides.slideTo(_next_index, direction);
            } else if (direction === 'left' && $.myNamespace.ErikzCarousel.buttons_enabled && (_current_index != 0 || $.myNamespace.ErikzCarousel.options.loopable)) {
                $.myNamespace.ErikzCarousel.slides.slideTo(_prev_index, direction);
            }
        }
    };

    $.myNamespace.ErikzCarousel.indicator = {

        init : function() {
            if ($.myNamespace.ErikzCarousel.options.indicator) {
                    _slideslength   = $.myNamespace.ErikzCarousel.slides.buildArray().length;
                $('.carousel').append(
                    '<!-- Indicator -->\n'+
                    '<div class="indicator bttn"><ul>\n'+
                    '<li class="indicator_button active_button"></li>\n'
                );
                for(i = 2; i <= _slideslength; i++) {
                    $('.indicator ul').append('<li class="indicator_button"></li>\n');
                }
                $('.indicator_button').click(function(){
                    $.myNamespace.ErikzCarousel.indicator.click(this); 
                });
            }
        },

        click : function(clicked_button) {
            if ($.myNamespace.ErikzCarousel.buttons_enabled) {
                $('.active_button').attr('class', 'indicator_button');
                $(clicked_button).attr('class', 'indicator_button active_button');
                if ( $('.indicator ul li').index(clicked_button) > $('.slides ul li').index($('.slide_active'))) {
                    $.myNamespace.ErikzCarousel.slides.slideTo( $('.indicator ul li').index(clicked_button), 'right');
                } else if ( $('.indicator ul li').index(clicked_button) < $('.slides ul li').index($('.slide_active'))) {
                    $.myNamespace.ErikzCarousel.slides.slideTo( $('.indicator ul li').index(clicked_button), 'left');
                }
            }
        }           
    };

    $.myNamespace.ErikzCarousel.autoplay = function() {
        if ($.myNamespace.ErikzCarousel.options.autoplay) {
            window.setInterval(
                function() { 
                    $.myNamespace.ErikzCarousel.buttons.click('right'); 
                }, 
                $.myNamespace.ErikzCarousel.options.autoplay
            );
        }
    };


    $.myNamespace.ErikzCarousel.highlightButtons = function() {
        $('.bttn').each(function() {
            $(this).mouseenter(function(){
                $(this).fadeTo('fast',0.9);
            });
            $(this).mouseleave(function(){
                $(this).fadeTo('fast',0.4);
            });
        });
    };

    $.myNamespace.ErikzCarousel.slides = {

        buildArray : function() {
            var _slides = [];
            for(i = 1; i <= $('.slides ul').children().length; i++) {
                _slides.push($('.slides ul li:nth-child(' + i.toString() + ')'));
            }
            return _slides;
        },

        slideTo : function(index, direction) {
            var _offset     = '',
                _element    = $.myNamespace.ErikzCarousel.slides.buildArray()[index];
            $.myNamespace.ErikzCarousel.buttons_enabled = false;

            if (direction === 'right') {
                _offset = -$('.carousel').width();
            } else if (direction === 'left') {
                _offset = $('.carousel').width();
            }
            if($.myNamespace.ErikzCarousel.options.animation === 'slide') {
                $.myNamespace.ErikzCarousel.slides.animSlide(_element, _offset);
            } else if ($.myNamespace.ErikzCarousel.options.animation === 'fade') {
                $.myNamespace.ErikzCarousel.slides.animFade(_element);
            }
            $('.active_button').attr('class', 'indicator_button');
            $('.indicator ul li:nth-child(' + (index + 1) + ')').attr('class', 'indicator_button active_button');
        },

        animFade : function(_element) {
            _element.css({
                'opacity' : '1',
                'z-index' : '-1'
            });
            $('.slide_active').fadeTo($.myNamespace.ErikzCarousel.options.animSpeed, 0, function(){
                $('.slide_active').attr('class', 'slide');
                _element.attr('class', 'slide_active');
                _element.css({
                'z-index' : ''
            });
                $.myNamespace.ErikzCarousel.buttons_enabled = true;
            });
        },

        animSlide : function(_element, _offset) {
            _element.css({
                'right' : _offset.toString() + 'px',
                'opacity' : '1'
            });
            $('.slide_active').animate({
                right: (-_offset).toString() + 'px'
            }, { duration: $.myNamespace.ErikzCarousel.options.animSpeed, queue: false, complete: function(){
                $(this).attr('class', 'slide').css({
                    'right' : '',
                    'opacity' : '',
                });
            } });
            _element.animate({
                right: '0px'
            }, { duration: $.myNamespace.ErikzCarousel.options.animSpeed, queue: false, complete: function(){
                $(this).attr('class', 'slide_active');
                $.myNamespace.ErikzCarousel.buttons_enabled = true;
            } });
        }
    };

    $.myNamespace.ErikzCarousel.defaultOptions = {
            animSpeed   : 500,
            animation   : 'slide',  // alternatively 'fade'
            loopable    : true,
            autoplay    : false,    // false for off or frequency in miliseconds
            indicator   : true,
            buttons     : true
    };

    $.fn.ErikzCarousel = function ( options ) {
        return this.each(function () {
            (new $.myNamespace.ErikzCarousel(this, options));
        });
    };

})( jQuery );