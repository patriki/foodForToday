/* jshint esversion: 6 */

function showRecipes (response) {
  $(".output").html('');
  console.log(response.matches);
  response.matches.forEach((el,index)=> {
    $(".output").append(`
                  <form action="/classic" method="POST">
                    <div class=recipe id="recipe${index}">
                        <div class="image">
                        <input type="text" class="form-control" id="username" placeholder="Username" name="username">
                            <img src=${el.smallImageUrls[0].replace(/s90$/,"s350")}>
                        </div>
                        <div class="info">
                            <span class='title'> Recipe: </span> ${el.recipeName} <br>
                            <span class='title'> Ingredients: </span> ${[...el.ingredients]} <br>
                            <span class='title'> Rating: ${el.rating}
                        </div>
                    </div>

                  </form>

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
          console.log(res);
          $(`#recipe${index}`).append(`<span class= 'title'> Sources: ${res.source.sourceRecipeUrl} </span>`);
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
    success: function (response) { displayFilter(response,filter,selector)},
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

function handleError (error) {
      console.log(error);
  }

function extractMetadata(response) {
    response = response.split(",").filter(function(chunk, index, array){
        return index != 0
    })
    response = response.join()
    response = response.split(")")[0];

    return JSON.parse(response);

}
