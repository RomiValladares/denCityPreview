/* file for the property-search page */
$(document).ready(function () {
  $("#hidden-property-tags-input").tagsManager({
    tagClass: "tm-tag-info"
  });
 $("#hidden-property-tags-input").tagsManager('pushTag', 'Amplio');
 $("#hidden-property-tags-input").tagsManager('pushTag', 'Luminoso');
 
 $("#hidden-main-photo-tags-input").tagsManager({
    tagClass: "tm-tag-success"
  });
 $("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Comedor');
 $("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Ventana');
 $("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Vista al mar');
});