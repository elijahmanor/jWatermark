
/*
    $('a').devlink4();
    
    $.devlink4.defaultOptions.color = '#cccccc';
    $('a').devlink4();
    
    $('a').devlink4({
        color: '#cccccc'
    });
    
    $('a').devlink4.greet('Elijah');
    
    <a href="http://www.devlink.net" class="{color: '#cccccc'}"></a>
*/

(function($) {
    $.fn.devlink4 = function(options) {

        options = $.extend({}, $.fn.devlink4.defaultOptions, options);

        this.each(function() {
            var $this = $(this);

            //Support the Metadata Plugin
            options = $.metadata ? $.extend({}, options, $this.metadata()) : options;
            
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
    $.fn.devlink4.greet = function(name) {
        console.log('Hello, ' + name + ', welcome to devLINK 2009!');
    };

    $.fn.devlink4.defaultOptions = {
        color: '#FFFFFF',
        backgroundColor: '#000000'
    }
})(jQuery); 






 

 

