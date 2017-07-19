/* jshint esversion: 6 */

function showRecipes (response) {
  $(".output").html('');
  console.log(response.matches);
  response.matches.forEach((el,index)=> {
    $(".output").append(`
                    <div class=recipe id="recipe${index}">
                        <div class="image">
                            <img src=${el.imageUrlsBySize[90].replace(/s90-c$/,"s350")}>
                        </div>
                        <div class="info">
                            <span class='title'> Recipe: </span> <span class="name"> ${el.recipeName}</span> <br>
                            <span class='title'> Ingredients: </span> <span class="ingredients">${[...el.ingredients]}</span> <br>
                            <span class='title'> Rating:  </span> <span class="rating"> ${el.rating}</span>
                            <button class='save-favourite'> Save </button>
                        </div>
                    </div>

                    `);


// function showRecipes (response) {
//   $(".output").html('');
//   console.log(response.matches);
//   response.matches.forEach((el,index)=> {
//     $(".output").append(`
//                     <div class=recipe id="recipe${index}">
//                         <div class="image">
//                             <img src=${el.smallImageUrls[0].replace(/s90$/,"s350")}>
//                         </div>
//                         <div class="info">
//                             <span class='title'> Recipe: </span> ${el.recipeName} <br>
//                             <span class='title'> Ingredients: </span> ${[...el.ingredients]} <br>
//                             <span class='title'> Rating: ${el.rating}
//                         </div>
//                     </div>
//
//                     `);




  $.ajax( {
      url:`http://api.yummly.com/v1/api/recipe/${el.id}?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88`,
      method:"GET",
      success: function(res) {
          $(`#recipe${index}`).append(`<span class= 'title'> Sources: ${res.source.sourceRecipeUrl} </span>`)
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
      $(`.${filter}`).append(` <label for="${filter}Input">${filter}</label><br>`);
      jsonDocs.forEach ((el)=> {

          $(`.${filter}`).append(`<input type="checkbox" name="each${filter}" value=${el.searchValue.replace(" ","%20")}>${el[selector]}`);

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
