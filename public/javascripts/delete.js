$(document).ready(()=> {
    $(".output").on("click",".delete", ()=> {

        var $buttonClicked=$(event.target);
        var recipeid= $(event.target).parents("article").attr("id");

        var recipe= {
            recipeId: $(`#${recipeid} .id`).html()
        }

        $.ajax({
        url: `http://localhost:3000/delete-favourite`,
        method: "POST",
        data: JSON.stringify(recipe),
        contentType: "application/json",
        dataType:'json',
        success: function(res) {
          console.log('success --> data :', res);
          $buttonClicked.parents("article")[0].remove();

        },
        error: handleError

      });
    })
})
