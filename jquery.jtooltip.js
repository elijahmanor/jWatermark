
/// <reference path="jquery-1.3.2-vsdoc2.js" />

/*
* jTooltip jQuery Plugin
* Copyright (c) 2009 Elijah Manor
* elijah.manor@gmail.com | http://elijahmanor.com
* Dual licensed under MIT and GPL.
* Updated: 08/13/09
* @author Elijah Manor
* @version 0.1
*/

(function($) {

    $.jTooltip = function(el, options) {

        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("jTooltip", base);

        base.init = function() {
            var elementOptions = base.elementOptions(base, options);

            base.$el.hover(function(e) { //Mouse Over
                var title = base.getTitle(elementOptions);                
                if (title) { //!string.IsNullOrEmpty(title)
                    var $tooltip = base.createTooltip();
                    base.updateTooltip($tooltip, title, elementOptions, e);
                }
            }, function(e) { //Mouse Out
                base.hideTooltip(elementOptions, e);
            }).mousemove(function(e) { //Mouse Move
                base.moveTooltip(elementOptions, e);
            });
        }

        base.elementOptions = function(base) {
            //Merge Default Options with User Options
            base.options = $.extend({}, $.jTooltip.defaultOptions, options);

            //Element Specific Options
            var elementOptions = $.metadata ? $.extend({}, base.options, base.$el.metadata()) : base.options;

            return elementOptions;
        }

        base.getTitle = function(options) {
            base.$el.data('title', base.$el.attr('title')); //Backup Title
            var title = base.$el.attr('title') ? base.$el.attr('title') : options.title; //Get Correct Title
            base.$el.attr('title', ''); //Remove Title from DOM
            
            return title;        
        }

        base.createTooltip = function(paramaters) {
            var $tooltip = $('#ctlTooltip');

            if ($tooltip.length == 0) {
                $('<div id="ctlTooltip" />')
                    .appendTo('body')
                    .hide();
                $tooltip = $('#ctlTooltip');
            }

            return $tooltip;
        }

        base.updateTooltip = function($tooltip, title, options, e) {      
            $tooltip
                .hide()
                .text(title)
                .stop(false, true)
                .css({
                    position: 'absolute',
                    backgroundColor: options.backgroundColor,
                    color: options.color,
                    top: e.pageY + 10,
                    left: e.pageX + 20
                })
                .fadeIn(options.fadeInSpeed);
        }

        base.hideTooltip = function(options, e) {
            $('#ctlTooltip').hide();
            base.$el.attr('title', base.$el.data('title'));
        }

        base.moveTooltip = function(options, e) {
            $('#ctlTooltip').css({
                top: e.pageY + 10,
                left: e.pageX + 20
            });
        }

        base.init();
    }

    $.jTooltip.defaultOptions = {
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fadeInSpeed: 350
    }

    $.fn.jTooltip = function(options) {
        return this.each(function() {
            (new $.jTooltip(this, options));
        });
    }

    // This function breaks the chain, but returns
    // the tooltip if it has been attached to the object.
    $.fn.getTooltip = function() {
        return this.data("jTooltip");
    }

})(jQuery);

