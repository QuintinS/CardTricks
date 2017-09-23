(function($){

    $.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });

        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };

})(jQuery);

$(document).ready(function(){

  $("#button-init").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks();

  });

  $("#button-fidget").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks({
      deal: "fidget",
      dealOptions: {
        cardDelay: 0,
      },
      animOptions: {
        velocity: "fastest",
        rotation: 10,
        messy: true,
        messyMult: 2
      }
    });

  });

  $("#button-flick-up").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks({
      deal: "flick",
      dealOptions: {
        cards: "allExceptLast",
        cardDelay: 100,
        direction: "up"
      },
      animOptions: {
        velocity: "fastest",
        rotation: 5,
        messy: true,
        messyMult: 1
      }
    });

  });

  $("#button-stack").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks("stack");

  });

  $("#button-double").on("click", function(event){

    $($("#cardtricks-1").html()).appendTo("#cardtricks-1");

    $("#button-fidget").trigger("click");

  });

  $("#button-shuffle").on("click", function(event){

    $("#cardtricks-1 .cardtricks-cards__card").shuffle();

    $("#button-fidget").trigger("click");

  });


});
