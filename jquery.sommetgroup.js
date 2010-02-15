
(function($) {

    $.fn.SommetGroup = function(options) {

        $.fn.SommetGroup.defaultOptions =
            $.extend({}, $.fn.SommetGroup.defaultOptions, options);
        var innerHtml = '<div id="concept">Concept</div>' +
            '<div id="code">Code</div>' +
            '<div id="conquer">Conquer</div>';
        $('<div id="SommetGroup" />')
           .appendTo('body')
           .hide()
           .html(innerHtml)
           .fadeIn('slow');

        $('#SommetGroup div').addClass('initialize');

        $.fn.SommetGroup.agilify('#concept');
        $.fn.SommetGroup.agilify('#code');
        $.fn.SommetGroup.agilify('#conquer');
    }

    $.fn.SommetGroup.agilify = function(expression) {
        var $element = $(expression);

        $element.css('position', 'absolute');
        if ($element.hasClass('initialize')) {
            $element.css('left', $(document).width() / 2)
                .css('top', $(document).height() / 2)
                .removeClass('initialize');
        }
        $element.animate({
            fontSize: randomNumber($.fn.SommetGroup.defaultOptions.maximumFontSize) + 'px',
            left: randomLocation(),
            top: randomLocation()
        }, $.fn.SommetGroup.defaultOptions.movementSpeed, function() {
            setTimeout("$.fn.SommetGroup.agilify('" + expression + "')",
                $.fn.SommetGroup.defaultOptions.movementSpeed);
        })
        .click(function() {
            if (typeof $.fn.SommetGroup.defaultOptions.onLaunch == 'function') {
                console.log('clicked');
            }
        });
    }

    function randomLocation() {
        return movementDirection() +
            randomNumber($.fn.SommetGroup.defaultOptions.movementInterval) + 'px';
    }

    function movementDirection() {
        return (randomNumber(1) == 1) ? '+=' : '-=';
    }

    function randomNumber(maximumNumber) {
        return Math.floor(Math.random() * (maximumNumber + 1));
    }

    $.fn.SommetGroup.defaultOptions = {
        color: "#fff",
        maximumFontSize: 64,
        movementInterval: 100,
        movementSpeed: 500,
        backgroundColor: "#000",
        onLaunch: null
    }

})(jQuery);
