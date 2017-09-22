$(document).ready(function(){

  $("#button-init").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks();

  });

  $("#button-fidget").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks({
      deal: "fidget",
      velocity: "fast",
      animOptions: {
        rotation: 20,
        messy: true,
        messyMult: 2
      }
    });

  });

  $("#button-flick-up").on("click", function(event){

    console.log($(event.currentTarget).text());

    $("#cardtricks-1").cardtricks({
      deal: "flick",
      velocity: "fast",
      animOptions: {
        rotation: 20,
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
