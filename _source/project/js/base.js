/**
 *  CARD TRICKS
 * *
 *  Play the cards like a master with this simple library.
 * *
 *  @author      Quintin Schnehage
 *  @copyright   Copyright (c) 2016
 *  @license     Reserved
 *  @since       Version 1.0
 *
 */

;(function ( $, window, document, undefined ) {

    $.widget( "cardtricks.cardtricks" , {

        options: {
            type: "scatter", // "scatter" | "spreadLeftRight" | "spreadRightLeft",
            cardMultiplier: 1,
            speed: "fast",
            ease: "easeOut",
            animOptions: {

            }
        },

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {

            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then you can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();

            this.options.element = this.element;

            var speedClass;
            var easeClass;

            var data_type = this.element.attr("data-cardtricks-type");
            var data_speed = this.element.attr("data-cardtricks-speed");
            var data_ease = this.element.attr("data-cardtricks-ease");

            this.element.removeAttr("data-cardtricks-type data-cardtricks-speed data-cardtricks-ease");

            if ( data_type !== "") {
              this.options.type = data_type;
            }
            if ( data_speed !== "") {
              this.options.speed = data_speed;
            }
            if ( data_ease !== "") {
              this.options.ease = data_ease;
            }

            this._trigger('cardtricks.create.complete', event);

            this._init();

        },

        _init: function(){

          var typeClass;
          var speedClass;
          var easeClass;

          this.element.addClass("cardtricks-cards");

          switch(this.options.speed){
            case "fastest":
              speedClass = "cardtricks-speed--fastest";
              break;
            case "fast":
              speedClass = "cardtricks-speed--fast";
              break;
            case "medium":
              speedClass = "cardtricks-speed--medium";
              break;
            case "slow":
              speedClass = "cardtricks-speed--slow";
              break;
            case "slowest":
              speedClass = "cardtricks-speed--slowest";
              break;
            default:
              speedClass = "cardtricks-speed--fast";
              break;
          }

          switch(this.options.ease){
            case "easeInOut":
              easeClass = "cardtricks-easeInOut";
              break;
            case "easeIn":
              easeClass = "cardtricks-easeIn";
              break;
            case "easeOut":
              easeClass = "cardtricks-easeOut";
              break;
            default:
              easeClass = "cardtricks-easeOut";
              break;
          }

          switch(this.options.type){
            case "fan":
              easeClass = "cardtricks-type--fan";
              break;
            default:
              easeClass = "cardtricks-type--scatter";
              break;
          }

          this.element
            .addClass(speedClass + " " + easeClass + " " + typeClass);

          this._trigger('cardtricks.init.complete', event);

          this._animate();

        },

        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        destroy: function () {

            // this.element.removeStuff();
            // For UI 1.8, destroy must be invoked from the
            // base widget
            $.Widget.prototype.destroy.call(this);
            // For UI 1.9, define _destroy instead and don't
            // worry about
            // calling the base widget
        },

        stack: function ( event ) {

            // Return all the cards to their original position.

            this._trigger('cardtricks.stack.complete', event);
        },

        /*  ===== Private Methods ===== */

        _animate: function (type, options) {

          // Animate the cards.

        },

        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch (key) {
            case "someValue":
                //this.options.someValue = doSomethingWith( value );
                break;
            default:
                //this.options[ key ] = value;
                break;
            }

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        }
    });

})( jQuery, window, document );
