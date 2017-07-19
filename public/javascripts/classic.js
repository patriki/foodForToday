/* jshint esversion: 6 */

$(document).ready( ()=> {
    //Create forms

    createForms('diet','shortDescription');
    createForms('allergy','shortDescription');
    createForms('cuisine','name');
    createForms('course','name');


    //Make request
    $("#ingredients").on("change paste submit", (event)=> {
        event.preventDefault();
        let myIngredient= $("#ingredients").val().toLowerCase();
    $(".ingredient").append(`<input type="checkbox" name="eachIngredient" value=${myIngredient} checked>${myIngredient}<br>`);

    })

    $('.form-filters').on("submit", (e)=> {
        e.preventDefault();
    })


    $('.form-filters').children().on("change checked", ()=> {
        myDiet=getParameters('Diet');
        myCuisine=getParameters('Cuisine');
        myCourse=getParameters('Course');
        myAllergy=getParameters('Allergy');
        myIngredients=getParameters('Ingredient');


    $.ajax({
        url: `http://api.yummly.com/v1/api/recipes?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88&${myDiet}${myCuisine}${myAllergy}${myCourse}${myIngredients}requirePictures=true`,
        method: "GET",
        success: showRecipes,
        error: handleError
    });
})


});
