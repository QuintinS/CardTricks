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
              cardDelay: 0, // The delay between one card being animated and nother, in ms
              direction: "up",
            },
            animOptions: {
              velocity: "fast",
              ease: "easeOut",
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

          // this.options = $.extend(true, this.defaults, this.options);

          var dealClass;
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

          switch(this.options.animOptions.velocity){
            case "fastest":
              this.storage.duration = 0.1;
              break;
            case "fast":
              this.storage.duration = 0.25;
              break;
            case "medium":
              this.storage.duration = 0.5;
              break;
            case "slow":
              this.storage.duration = 0.75;
              break;
            case "slowest":
              this.storage.duration = 1;
              break;
            default:
              this.storage.duration = 0.25;
              break;
          }

          switch(this.options.animOptions.ease){
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

          $(this.element.children())
            .css("transition-duration", this.storage.duration + "s");

          this.element
            .addClass(easeClass + " " + dealClass);

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

          // All the cards. Must be reversed because position: absolute stacks cards in reverse.
          var cards;
          var $this = this;

          if (this.options.dealOptions.cards == "allExceptLast") {
            cards = $(this.element.find(".cardtricks-cards__card:not(:first-child)").get().reverse());
          }
          else {
            cards = $(this.element.find(".cardtricks-cards__card").get().reverse());
          }

          var _dealMode = this.options.dealOptions.mode;
          var _dealCardDelay = this.options.dealOptions.cardDelay;
          var _dealDirection = this.options.dealOptions.direction;
          var _animRotation = this.options.animOptions.rotation;
          var _animDuration = this.options.animOptions.duration;
          var _animEase = this.options.animOptions.ease;
          var _messy;
          var _messyAmplitude = this.options.animOptions.messyMult;
          var _totalCards = cards.length;

          var cardsToAnimate = _totalCards;

          var totalDuration = (cardsToAnimate * this.storage.duration) * 1000;

          var animation;

          if (typeof this.options.animOptions === "object") {
            _messy = this.options.animOptions.messy === true ? true : false;
          }

          var fidget = function(){

            var rotation;
            var animation;

            var transformOriginX = 50 - (50 * noise()) + "%";
            var transformOriginY = 50 - (50 * noise()) + "%";

            if (_messy) {
              rotation = _animRotation * noise();
            }

            animation = {
              "transform": "rotate(" + rotation + "deg)",
              "transform-origin": transformOriginX + " " + transformOriginY
            };

            return animation;

          };

          var flick = function(){

            var rotation;
            var animation = {};

            var transformOriginX = 50 - (50 * noise()) + "%";
            var transformOriginY = 50 - (50 * noise()) + "%";

            if (_messy) {
              rotation = _animRotation * noise();
            }

            animation["transform"] = "rotate(" + rotation + "deg)";
            animation["transform-origin"] = transformOriginX + " " + transformOriginY;

            switch(_dealDirection){
              case"up":
                animation["top"] = "-200%";
                break;
              case"down":
                animation["bottom"] = "-200%";
                break;
              case"left":
                animation["left"] = "-200%";
                break;
              case"right":
                animation["right"] = "-200%";
                break;
            }

            return animation;

          };

          function animate(){

            var last = false;
            var animationName = $this.options.deal;

            $this.element.trigger('cardtricks.' + animationName + '.start', event);

            // Set a timer that ends when the animation finishes.
            setTimeout(function(){
              $this.element.trigger('cardtricks.' + animationName + '.finish', event);
            }, totalDuration);

            cards.each(function(index, card){

              $(card)
              .delay(_dealCardDelay * index)
              .queue(function(next){

                $(this).css(animation());
                next();

              });


            });

          }

          // Loop through all cards, animating them.

          switch(this.options.deal) {
            case "fidget":
              animation = fidget;
              break;
            case "flick":
              animation = flick;
              break;
            default:
              animation = fidget;
              break;
          }

          animate();

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
