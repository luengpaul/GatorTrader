/**
 * These functions are used to send item details to the popup modal for displaying details 
 * 
 * @author Ibraheem Chaudry
 */


$(document).on("click", ".openModal", function () {
    var itemImageSrc ="/post_images/resized/"+ $(this).data('img');
    console.log(itemImageSrc);
    $(".modal-body #modalImage").attr("src", itemImageSrc);

    var itemid= $(this).data('itemid')

    var name= $(this).data('name')
    document.getElementById("itemHeader").innerHTML = name

    var price= $(this).data('price')
    document.getElementById("itemPrice").innerHTML= price

    var description= $(this).data('description')
    document.getElementById("itemDescription").innerHTML= description

    console.log("This is what click function recieves "+ itemid)
    $(".modal-footer #modal-itemid").attr("value", itemid);
});

