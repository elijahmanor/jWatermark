
/*
    $('a').devlink1();
*/

(function($) {
    $.fn.devlink1 = function() {

        //1. Plugin passed the this object which references the jQuery object
        this.each(function() {

            //2. Plugin manipulates the DOM
            var $this = $(this);
            $this.attr('title', 'Hello devLINK 2009!');
            
        });

        //3. Plugin should return this to facilitate chaining
        return this;
    }; 
})(jQuery); 


 

 

