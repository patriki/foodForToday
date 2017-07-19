$(document).ready(()=>{

$('.output').on("click", '.save-favourite',(event)=> {
    $(event.target).removeClass("save-favourite").addClass("delete-favourite");
    

      var recipe = {
         recipeImage: "image",
         recipeName: $(event.target).siblings(".name").html(),
         recipeIngredients: $(event.target).siblings(".ingredients").html(),
         recipeRating:$(event.target).siblings(".rating").html(),
         recipeLink: $(event.target).siblings(".link").html()
      };


      $.ajax({
        url: "http://localhost:3000/classic/favourite",
        method: "POST",
        data: JSON.stringify(recipe),
        contentType: "application/json",
        dataType:'json',
        success: function(res) {
          console.log('success --> data :', res);

        },
        error: handleError
      
      });

    });  

});