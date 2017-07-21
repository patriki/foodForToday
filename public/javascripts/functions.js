/* jshint esversion: 6 */

function modifyFavourite(modification, reverse) {
  $('.output').on("click", `.${modification}-favourite`,(event)=> {
    $(event.target).removeClass(`${modification}-favourite`).addClass(`${reverse}-favourite`).attr("src", `/images/${reverse}.png`);


      var recipe = {
         recipeId:$(event.target).siblings(".id").html(),
         recipeImage: "image",
         recipeName: $(event.target).siblings(".name").html(),
         recipeIngredients: $(event.target).siblings(".ingredients").html(),
         recipeRating:$(event.target).siblings(".rating").html(),
         recipeLink: $(event.target).siblings(".link").html()
      };


      $.ajax({
        url: `http://localhost:3000/${modification}-favourite`,
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

}

function getRecipesBySearch() {
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
}



function showRecipes (response) {
  $(".output").html('');
  console.log(response.matches);
  response.matches.forEach((el,index)=> {
    $(".output").append(`
                    <article class="flex-item recipe" id="recipe${index}">
                        <div class="image">
                            <img src=${el.imageUrlsBySize[90].replace(/s90-c$/,"s350")}>
                        </div>
                        <div class="recipe-info">
                            <span class="id" style="display:none">${el.id}</span>
                            <!--<span class='title'> Recipe: </span>-->
                            <div class="recipe-sup">
                              <div class="recipe-title"><span class="name"> ${el.recipeName}</span></div>
                              <div class="recipe-fav"><img src="/images/save.png" class='recipe-btn save-favourite'></div>
                            </div>
                            <div class="recipe-inf">
                              <div class="recipe-ingredients"><span class='title'> Ingredients: </span> <br><span class="ingredients">${[...el.ingredients]}</span> </div><br>
                              <div class="recipe-rating"><!--<span class='title'> Rating:  </span>--><span class="rating"> ${el.rating}</span></div>
                            </div>
                        </div>
                    </article>

                    `);



  $.ajax( {
      url:`http://api.yummly.com/v1/api/recipe/${el.id}?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88`,
      method:"GET",
      success: function(res) {
          $(`#recipe${index} > .info`).append(`<span class= 'title'> Sources: </span> <span class="link"> ${res.source.sourceRecipeUrl} </span>`)
      },
      error:handleError
  })

  })


}

function getParameters (filter) {
    let myFilter='';
    $(`.${filter.toLowerCase()} input:checked`).each((index,el)=>{
        myFilter+=`allowed${filter}[]=${el.value}&`;
    })
    return myFilter;
}


function createForms (filter, selector) {
$.ajax({
    url: `http://api.yummly.com/v1/api/metadata/${filter}?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88`,
    method:"GET",
    success: function (response) { displayFilter(response,filter,selector); setUpUserInfo("allergy"); setUpUserInfo("diet");},
    error: handleError
  });

};

function displayFilter(response,filter,selector) {
      let jsonDocs= extractMetadata(response);
      $(`.${filter}`).append(` <label class="filter-group-title" for="${filter}Input">${filter}</label><br>`);
      jsonDocs.forEach ((el)=> {

          $(`.${filter}`).append(`<label class="checkMenu">
                                    <input type="checkbox" name="each${filter}" value=${el.searchValue.replace(" ","%20")}>
                                        <div class="eachCheck">${el[selector]}
                                        </div>
                                  </label>`);

      });

  }



function extractMetadata(response) {
    response = response.split(",").filter(function(chunk, index, array){
        return index != 0
    })
    response = response.join()
    response = response.split(")")[0];

    return JSON.parse(response);

}

function setUpUserInfo(filterAttr) {
    let filterArray=$(`script[${filterAttr}]`).attr(`${filterAttr}`).split(",");
    filterArray.forEach((el)=> {
        $(`input[value="${el}"]`).attr("checked",true);
    })

}

function handleError (error) {
      console.log(error);
  }
