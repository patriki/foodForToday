/* jshint esversion: 6 */

$(document).ready( ()=> {
    //Create forms

    createForms('diet','shortDescription');
    createForms('allergy','shortDescription');
    createForms('cuisine','name');
    createForms('course','name');


    //Initial request
       getRecipesBySearch();


    //Get ingredients and query
    $("#ingredients").on("change paste submit", (event)=> {
        event.preventDefault();
        let myIngredient= $("#ingredients").val().toLowerCase();
        $(".ingredient").append(`<input type="checkbox" name="eachIngredient" value=${myIngredient} checked>${myIngredient}<br>`);

    })

    $('.form-filters').on("submit", (e)=> {
        e.preventDefault();
    })


    //Get different req depending on the user input
    $('.form-filters').children().on("change checked", ()=> {
        getRecipesBySearch();
})


});
