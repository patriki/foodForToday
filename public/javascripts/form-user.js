$(document).ready( ()=> {
    //Create forms

    createForms('diet','shortDescription');
    createForms('allergy','shortDescription');

    setUpUserInfo("allergy");
    setUpUserInfo("diet");

});
