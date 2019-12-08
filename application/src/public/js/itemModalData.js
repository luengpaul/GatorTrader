/**
 * These functions are used to send item details to the popup modal for displaying details 
 * 
 * @author Ibraheem Chaudry
 */


//This function send the image source to item display modal
$(document).on("click", ".openModal", function () {
    var itemImageSrc ="/post_images/resized/"+ $(this).data('img');
    console.log(itemImageSrc);
    $(".modal-body #modalImage").attr("src", itemImageSrc);

    var itemid= $(this).data('itemid')
    console.log("This is what click function recieves "+ itemid)

    $(".modal-footer #modal-itemid").attr("value", itemid);
});


const ATTRIBUTES = ['name', 'price','description'];

$('[data-toggle="modal"]').on('click', function (e) {
    // convert target (e.g. the button) to jquery object
    const $target = $(e.target);
    console.log($target);
    console.log('Target');
    // modal targeted by the button
    const modalSelector = $target.data('target');
    // iterate over each possible data-* attribute
    ATTRIBUTES.forEach(function (attributeName) {
    // retrieve the dom element corresponding to current attribute
    const $modalAttribute = $(modalSelector + ' #modal-' + attributeName);
    console.log($modalAttribute)
    const dataValue = $target.data(attributeName);
    console.log(dataValue)
    // if the attribute value is empty, $target.data() will return undefined.
    $modalAttribute.text(dataValue || '');
    });
});
