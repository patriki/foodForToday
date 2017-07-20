$(document).ready(()=> {
    $(".list-favs").on("click",".delete", ()=> {

        var $buttonClicked=$(event.target);

        var recipe= {
            recipeId: $(event.target).siblings(".id").html()
        }
        
        $.ajax({
        url: `http://localhost:3000/delete-favourite`,
        method: "POST",
        data: JSON.stringify(recipe),
        contentType: "application/json",
        dataType:'json',
        success: function(res) {
          console.log('success --> data :', res);
          $buttonClicked.parents(".favourite")[0].remove();

        },
        error: handleError
      
      });
    })
})