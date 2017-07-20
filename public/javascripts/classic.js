/* jshint esversion: 6 */

$(document).ready( ()=> {
    //Create forms

    createForms('diet','shortDescription');
    createForms('allergy','shortDescription');
    createForms('cuisine','name');
    createForms('course','name');


    //dropdown menus:
    $('.category').on('click', function(){
      var id = $(this).attr('id');
      var idName = id.split('-')[1];

      if ($(this).hasClass("active")) {
        $(this).removeClass('active');
        $('#' + idName).removeClass('active');
      } else {
        $('.category').removeClass('active');
        $('.filter-group').removeClass('active');
        $(this).addClass('active');
        $('#' + idName).addClass('active');
      }

    });

    //Initial request
       getRecipesBySearch();

    //Make request
    $("#ingredientText").on("change paste submit", (event)=> {
        event.preventDefault();
        let myIngredient= $("#ingredientText").val().toLowerCase();
    $(".ingredient").append(`<label class="checkMenu">
                                <input type="checkbox" name="eachIngredient" value=${myIngredient} checked>
                                <div class="eachCheck">${myIngredient}
                                </div>
                            </label><br>`);

    });


    $('.form-filters').on("submit", (e)=> {
        e.preventDefault();
    });


    //Get different req depending on the user input
    $('.form-filters').children().on("change checked", ()=> {
        getRecipesBySearch();
})


});
