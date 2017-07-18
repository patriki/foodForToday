$(document).ready(()=>{
    console.log("hago");
    console.log($('.save-favourite'));

$('.output').on("click", '.save-favourite',(event)=> {
    $(event.target).removeClass("save-favourite").addClass("delete-favorite");
    console.log("Llegué");
    console.log($(event.target).siblings(".name"));
    

      var obj = {
        title: "hola",
      };


      $.ajax({
        url: "http://localhost:3000/classic/favourite",
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        success: function(data) {
          console.log('success --> data :', data);

        },
        error: handleError
      
      });

    });  

});