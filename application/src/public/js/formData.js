/**
 * These functions are needed to maintain form persistency across page reloads.
 * 
 * @author Ibraheem Chaudry 
 */



function saveForm() {

    //nothing to work with, get out of here
    if(typeof window.sessionStorage ==="undefined"){return;}

    //Attirbutes to save from the form
    saveValues("input");
    saveValues("select");
    saveValues('textarea')


    return true;
}


function loadForm() {

    //nothing to work with, get out of here
    if(typeof window.sessionStorage ==="undefined"){return;}


    //Attibutes to load after form reload
    setValues("input");
    setValues("select");
    setValues("textarea");

}


function saveValues(tag){

    var inputs=document.getElementsByTagName(tag);

    for(var i=0;i<inputs.length;i++){
        window.sessionStorage.setItem(inputs[i].name, inputs[i].value);
    }

}


function setValues(tag){

    var inputs=document.getElementsByTagName(tag);

    for(var i=0;i<inputs.length;i++){
        inputs[i].value = window.sessionStorage.getItem(inputs[i].name);
        }
}


