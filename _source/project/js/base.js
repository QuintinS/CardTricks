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

        storage: {

        },

        defaults: {

        },

        options: {
            deal: "fidget", // "scatter" | "spreadLeftRight" | "spreadRightLeft",
            dealOptions: {
              mode: "sequence", // "sequence" | "all" - whether to animate cards one at a time or all at once.
              cardsToAnimate: "all", // "all" | integer - How many cards to animate.
              cardDelay: 250, // The delay between one card being animated and nother, in ms
              cardMultiplier: 1, // Multiplies the cards by this amount for the animation. Integer.
            },
            animOptions: {
              velocity: "fast",
              ease: "easeOut",
              duration: 0.5,
              messy: true, // true | false - Adds a bit of randomness for a natural feel.
              messyMult: 1, // Number - adjust randomness
              rotation: 10,
            },
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

            this.defaults = this.options;
            this.options.element = this.element;

            this.element.addClass("cardtricks-cards");

            this._trigger('cardtricks.create.complete', event);

        },

        _init: function(){

          this.options = $.extend(this.defaults, this.options);

          var dealClass;
          var velocityClass;
          var easeClass;

          switch(this.options.deal){
            case "flick":
              dealClass = "cardtricks-deal--flick";
              break;
            case "scatter":
              dealClass = "cardtricks-deal--scatter";
              break;
            case "fan":
              dealClass = "cardtricks-deal--fan";
              break;
            default:
              dealClass = "cardtricks-deal--fidget";
              break;
          }

          switch(this.options.velocity){
            case "fastest":
              velocityClass = "cardtricks-velocity--fastest";
              this.storage.duration = 0.1;
              break;
            case "fast":
              velocityClass = "cardtricks-velocity--fast";
              this.storage.duration = 0.25;
              break;
            case "medium":
              velocityClass = "cardtricks-velocity--medium";
              this.storage.duration = 0.5;
              break;
            case "slow":
              velocityClass = "cardtricks-velocity--slow";
              this.storage.duration = 0.75;
              break;
            case "slowest":
              velocityClass = "cardtricks-velocity--slowest";
              this.storage.duration = 1;
              break;
            default:
              velocityClass = "cardtricks-velocity--fast";
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

          this.element
            .addClass(velocityClass + " " + easeClass + " " + dealClass);

          this._trigger('cardtricks.init.complete', event);

          this._animate();

        },

        stack: function ( event ) {

            // Return all the cards to their original position.

            this.options.element.find(".cardtricks-cards__card").attr("style", "");

            this._trigger('cardtricks.stack.complete', event);
        },

        /*  ===== Private Methods ===== */

        _animate: function (type, options) {

          // Animate the cards.

          var cards = this.element.find(".cardtricks-cards__card");


          var _rotation = this.options.animOptions.rotation;
          var _origin = "center";
          var _messy;
          var _messyAmplitude = this.options.animOptions.messyMult;

          var queue = $.Deferred().resolve();

          if (typeof this.options.animOptions === "object") {
            _messy = this.options.animOptions.messy === true ? true : false;
          }

          // Loop through all cards, animating them.

          switch(this.options.deal) {
            case "fidget":
              fidget();
              break;
            case "flick":
              flick();
              break;
            default:
              fidget();
              break;
          }

          function fidget(){

            cards.each(function(index, card){

              var rotation;
              var origin;

              if (_messy) {
                rotation = _rotation * noise();
                origin = 50 + 50 * noise() + "% " + 50 + 50 * noise() + "%";
              }
              else {
                origin = "center";
              }

              $(card).css({
                "transform": "rotate(" + rotation + "deg)",
                "transform-origin": origin
              });

            });

          }

          function flick(){

            cards.each(function(index, card){

              var rotation;

              if (_messy) {
                rotation = _rotation * noise();
              }

              $(card).css({
                "transform": "rotate(" + rotation + "deg)",
                "transform-origin": 50 + 50 * noise() + "% " + 50 + 50 * noise() + "%"
              });

            });

          }



          // A little noise function for injecting some randomness.
          function noise(){
            return (Math.random() - 0.5) * _messyAmplitude;
          }

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

    });

})( jQuery, window, document );
