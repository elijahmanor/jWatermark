
/*
    $('a').devlink2();
    
    $.devlink2.defaultOptions.color = '#cccccc';
    $('a').devlink2();
    
    $('a').devlink2({
        color: '#cccccc'
    });
*/

(function($) {
    //2. Accept Custom Settings from the User 
    $.fn.devlink2 = function(options) {

        //3. Merge the Default Settings and Custom Settings and use the Union within the Plugin
        options = $.extend({}, $.fn.devlink2.defaultOptions, options);

        this.each(function() {

            var $this = $(this);
            $this.attr('title', 'Hello devLINK 2009!')
                .css({
                    color: options.color, 
                    backgroundColor: options.backgroundColor
                });
        });

        return this;
    };

    //1. Provide a set of Public Accessible Default Plugin Settings for User to Manipulate
    $.fn.devlink2.defaultOptions = {
        color: '#FFFFFF',
        backgroundColor: '#000000'
    }
})(jQuery); 






 

 

