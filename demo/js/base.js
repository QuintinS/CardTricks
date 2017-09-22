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
        cardDelay: 50,
      },
      animOptions: {
        velocity: "fastest",
        rotation: 5,
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
        cardDelay: 150,
      },
      animOptions: {
        velocity: "fast",
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

});
