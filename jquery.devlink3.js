
/*
    $('a').devlink3();
    
    $.devlink3.defaultOptions.color = '#cccccc';
    $('a').devlink3();
    
    $('a').devlink3({
        color: '#cccccc'
    });
    
    $('a').devlink3.greet('Elijah');
*/

(function($) {
    $.fn.devlink3 = function(options) {

        options = $.extend({}, $.fn.devlink3.defaultOptions, options);

        this.each(function() {
            var $this = $(this);
            
            updateElement($this, options);
        });

        return this;
    };

    //Private Function
    function updateElement($element, options) {
        $element.attr('title', 'Hello devLINK 2009!')
            .css({
                color: options.color,
                backgroundColor: options.backgroundColor
            });
    };

    //Public Function
    $.fn.devlink3.greet = function(name) {
        console.log('Hello, ' + name + ', welcome to devLINK 2009!');
    };

    $.fn.devlink3.defaultOptions = {
        color: '#FFFFFF',
        backgroundColor: '#000000'
    }
})(jQuery); 






 

 

