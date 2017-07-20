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


    $('.form-filters').children().on("change checked", ()=> {
        myDiet=getParameters('Diet');
        myCuisine=getParameters('Cuisine');
        myCourse=getParameters('Course');
        myAllergy=getParameters('Allergy');
        myIngredients=getParameters('Ingredient');

        //console.log(`http://api.yummly.com/v1/api/recipes?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88&${myDiet}${myCuisine}${myAllergy}${myCourse}${myIngredients}requirePictures=true`)
    $.ajax({
        url: `http://api.yummly.com/v1/api/recipes?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88&${myDiet}${myCuisine}${myAllergy}${myCourse}${myIngredients}requirePictures=true`,
        method: "GET",
        success: showRecipes,
        error: handleError
    });
});


});
