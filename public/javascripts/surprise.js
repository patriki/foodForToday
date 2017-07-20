
let currentQuestion=1;
const totalQuestions=5;

const answers={};

$(document).ready(()=>{
  

    $(".question").hide();
    $(`.question${currentQuestion}`).show();

    $("button").on("click", (e)=> {
        e.preventDefault();
        answers[`question${currentQuestion}`]=$(`.question${currentQuestion} input[type='radio']:checked`).val();

        $(`.question${currentQuestion}`).fadeOut( function () {
                if (currentQuestion == totalQuestions) {
                    console.log("The end")

                    $(".background-darkener").hide();
                    
                     $.ajax({
                        url: `http://api.yummly.com/v1/api/recipes?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88&q=onion&requirePictures=true`,
                        method: "GET",
                        success: showRecipes,
                        error: handleError
                     });
                    
                } else {
                    currentQuestion = currentQuestion + 1;
                    $(`.question${currentQuestion}`).fadeIn();
                }

        });
      
        console.log(currentQuestion);
        console.log(answers);
    })


})