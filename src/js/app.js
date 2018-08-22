import sayHello from './lib/sayHello.js';
import './lib/jquery.mCustomScrollbar.js';

sayHello();


/**
* Создать селект
*/
function createDefaultSelect(select) {

  select.addClass('select-hidden'); // Скрыть select

  // Добавить input
  select.after('<div class="form-user__item  select-styled  select-styled--not-selected"></div>');

  var styledSelect = select.next('.select-styled');

  // Текст первого эл-та
  styledSelect.text(select.children('option').eq(0).text());

  return styledSelect;
}


/**
* Создать список
*/
function createListSelect(select, styledSelect) {

  var numberOfOptions = select.children('option').length; // Кол-во опций

  // Вставить выпадающий список после инпута
  var list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter(styledSelect);

  // Заполнить значеня
  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: select.children('option').eq(i).text()
    }).appendTo(list);
  }

  return list;
}


$('.cities__select').each(function() {

  var select = $(this);
  var styledSelect = createDefaultSelect(select);
  var list = createListSelect(select, styledSelect);
  var listItems = list.children('li');


  styledSelect.click(function(e) {
    e.stopPropagation();

    $(this).toggleClass('is-active');
    list.toggle();
  });


  listItems.click(function(e) {
    e.stopPropagation();
    styledSelect.text($(this).text()).removeClass('is-active');

    styledSelect.removeClass('select-styled--not-selected');

    // Установить селект нативному элементу
    var option_index = $(this).index();
    var native_option_select = select.children('option:eq(' + option_index+ ')');

    select.children('option').attr('selected', false);
    native_option_select.attr('selected', true);

  });


  $(document).mouseup(function(e) { // событие клика по веб-документу
    var div = select;

    if (!div.is(e.target) // если клик был не по нашему блоку
      && (!styledSelect.is(e.target))
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
      styledSelect.removeClass('is-active');
      list.hide();
    }
  });


});


$(window).on('load',function() {
  $('.select-options').mCustomScrollbar({
    theme:'dark'
  });
});
