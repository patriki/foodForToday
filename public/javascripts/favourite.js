$(document).ready(()=>{

$('.output').on("click", '.save-favourite',(event)=> {
    $(event.target).removeClass("save-favourite").addClass("delete-favourite");
    console.log("Llegué");
    console.log();
    

      var recipe = {
         recipeImage: "image",
         recipeName: "name",
         recipeIngredients: "ingredient",
         recipeRating: "stars",
         recipeLink: "link"
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