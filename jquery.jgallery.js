
/// <reference path="jquery-1.3.2-vsdoc2.js" />

/*
* jGallery jQuery Plugin
* Copyright (c) 2009 Elijah Manor
* elijah.manor@gmail.com | http://elijahmanor.com
* Dual licensed under MIT and GPL.
* Updated: 08/13/09
* @author Elijah Manor
* @version 0.1
*/

(function($) {

    $.jGallery = function(el, options) {
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data("jGallery", base);

        base.init = function() {

            base.options = $.extend({}, $.jGallery.defaultOptions, options);

            var imgLoading = new Image();
            $(imgLoading).load(function() {
                console.log('Success: imgLoading');
            }).error(function() {
                console.log('Failure: imgLoading');
            }).attr('src', base.options.baseUrl + base.options.loadingImage);

            var tableContents = '';
            var imagesLength = base.options.images.length;
            for (var i = 0; i < imagesLength; i += base.options.numberOfColumns) {
                var rowContents = '<tr>';
                for (var column = 0; column < base.options.numberOfColumns; ++column) {
                    rowContents += '<td id="' + base.el.id + '_' + (i + column) + '" />';
                }
                rowContents += '</tr>';
                tableContents += rowContents;
            }

            $('<table id="ctlJgallery">' + tableContents + '</table>').appendTo(base.$el);
            $('#ctlJgallery td').css('width', base.options.previewWidth)
                .css('height', base.options.previewHeight)
                .addClass(base.options.loadingClass)
                .fadeIn();

            //$.jGallery.pause(5000);

            $(base.options.images).each(function(index, value) {
                var img = new Image();
                $(img).load(function() {
                    console.log('#' + base.el.id + '_' + index, ': ', value);
                    $(this).css('display', 'none');
                    $('#' + base.el.id + '_' + index)
                        .removeClass(base.options.loadingClass)
                        .append(this);
                    $(this).fadeIn();
                    base.attachEvents(this, value);
                }).error(function() {
                    console.log('Error - index: ' + index + '; value: ' + base.options.baseUrl + value.thumbnailUrl);
                }).attr('src', base.options.baseUrl + value.thumbnailUrl)
                    .css('width', base.options.previewWidth)
                    .css('height', base.options.previewHeight);
            });
        }

        base.attachEvents = function(image, value) {
            $(image).hover(
                function() { //over
                    if (!$(this).hasClass('hovering')) {
                        base.$el.find('img').stop(false, true);
                        $(this).addClass('hovering')
                            .css('top', $(this).offset().top)
                            .css('left', $(this).offset().left)
                            .css('position', 'absolute').animate({
                                width: parseInt(base.options.previewWidth, 10) + base.options.growInterval,
                                height: parseInt(base.options.previewHeight, 10) + base.options.growInterval,
                                left: '-=' + (base.options.growInterval / 2) + 'px',
                                top: '-=' + (base.options.growInterval / 2) + 'px'
                            }, base.options.growSpeed);
                    }
                },
                function() { //out
                    $(this).animate({
                        width: parseInt(base.options.previewWidth, 10),
                        height: parseInt(base.options.previewHeight, 10),
                        left: '+=' + (base.options.growInterval / 2) + 'px',
                        top: '+=' + (base.options.growInterval / 2) + 'px'
                    }, base.options.shrinkSpeed, function() {
                        $(this).css('position', 'static').removeClass('hovering');
                    });
                }
            ).click(function(e) {
                if (typeof base.options.onLaunch == 'function') {
                    base.options.onLaunch(base.options.baseUrl + value.origionalUrl);
                } else { //Provide default lightbox functionality
                    var $ctlLoader = $('#ctlLoader');
                    if ($ctlLoader.length == 0) {
                        $('<div id="ctlLoader"></div>')
                            .appendTo('body')
                            .html('<img id="imgOrigional" /><div id="lblTitle"></div>')
                            .hide();
                        $ctlLoader = $('#ctlLoader');
                    }
                    $('#imgOrigional').attr('src', '');

                    $ctlLoader.fadeOut().addClass(base.options.loadingClass).css({
                        position: 'absolute',
                        backgroundColor: '#cccccc',
                        width: '200px',
                        height: '200px',
                        top: ($(window).height() / 2) - 100 + 'px',
                        left: ($(window).width() / 2) - 100 + 'px'
                    }).fadeIn(350);
                    $ctlLoader.find('#lblTitle').text(value.title);

                    var img = new Image();
                    img.onload = function() {
                        console.log('begin load: origional');
                        var newWidth = 500; 
                        var newHeight = 500; 
                        $ctlLoader.animate({
                            width: newWidth,
                            height: newHeight,
                            left: ($(window).width() / 2) - (newWidth / 2) + 'px',
                            top: ($(window).height() / 2) - (newHeight / 2) + 'px'
                        }, 500, function() {
                            $ctlLoader.removeClass(base.options.loadingClass);
                            $('#imgOrigional')                                
                                .fadeOut('slow', function() {
                                    $(this).attr('src', base.options.baseUrl + value.origionalUrl)
                                        .css({
                                            width: newWidth,
                                            height: newHeight
                                        }).fadeIn('slow').click(function() {
                                            $(this).parent().fadeOut(350);
                                        });
                                });
                            console.log('end append');
                        });
                        console.log('end load: origional');
                        img.onload = function() { };
                    };
                    img.src = base.options.baseUrl + value.origionalUrl;
                }
            });
        }

        base.init();
    }

    $.jGallery.pause = function(milliseconds) {
        var date = new Date();
        var currentDate = null;
        do { currentDate = new Date(); }
        while (currentDate - date < milliseconds);
    };

    $.jGallery.defaultOptions = {
        color: "#fff",
        toggleClass: "on",
        backgroundColor: "#000",
        baseUrl: "../Images/",
        onLaunch: null,
        images: [{
            thumbnailUrl: "image1p.jpg",
            origionalUrl: "image1.jpg",
            title: 'Title 1',
            description: 'Description 1'
        }, {
            thumbnailUrl: "image2p.jpg",
            origionalUrl: "image2.jpg"
        }, {
            thumbnailUrl: "image3p.jpg",
            origionalUrl: "image3.jpg"
        }, {
            thumbnailUrl: "image4p.jpg",
            origionalUrl: "image4.jpg"
        }, {
            thumbnailUrl: "image5p.jpg",
            origionalUrl: "image5.jpg"
        }, {
            thumbnailUrl: "image6p.jpg",
            origionalUrl: "image6.jpg"
        }, {
            thumbnailUrl: "image7p.jpg",
            origionalUrl: "image7.jpg"
        }, {
            thumbnailUrl: "image8p.jpg",
            origionalUrl: "image8.jpg"
        }, {
            thumbnailUrl: "image9p.jpg",
            origionalUrl: "image9.jpg"
        }
		],
        numberOfColumns: 3,
        previewWidth: '100px',
        previewHeight: '100px',
        loadingImage: 'loading.gif',
        loadingClass: 'loadingImage',
        growSpeed: 500,
        shrinkSpeed: 500,
        growInterval: 50
    }

    $.fn.jGallery = function(options) {
        return this.each(function() {
            (new $.jGallery(this, options));
        });
    }

    // This function breaks the chain, but returns
    // the jGallery if it has been attached to the object.
    $.fn.getjGallery = function() {
        return this.data("jGallery");
    }

})(jQuery);

