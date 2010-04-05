
(function($) {

   $.watermark = function(element, options) {
   	  this.options = {};
   	
      element.data('watermark', this);
      
      this.init = function(element, options) {         
      	 this.options = $.extend({}, $.watermark.defaultOptions, options); 
	     this.options = $.metadata ? $.extend({}, this.options, element.metadata()) : this.options;
      
	     updateElement(element, this.options);
      };
      
      this.greet = function(name) {
         console.log('Hello, ' + name + ', welcome to Script Junkies!');
      };
      
      this.init(element, options);
   };
  
  $.fn.watermark = function(options) {    	 	  	
    return this.each(function() {
       (new $.watermark($(this), options));    	      
    });        
  };
  
  //Private Function
  function updateElement(element, options) {
    updateStyle(element, options);
    element.bind("focusin keyup", function() {
      clearElement(element, options);
    }).focusout(function() {
      updateStyle(element, options);
    })
  };

  function clearElement(element, options) {
	console.log('element.val(): ' + element.val());
    if (!element.val() || element.val() === options.text) {
	  console.log('Clearing element.val...');
      element.val('').removeClass(options.class);
    }      
  }

  function updateStyle(element, options) {
    if (!element.val()) {
      element.val(options.text).addClass(options.class);
    }    
  }
  
  $.watermark.defaultOptions = {
    class: 'watermark',
    text: 'Enter Text Here'
  }

})(jQuery);
