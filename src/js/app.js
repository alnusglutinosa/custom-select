import sayHello from './lib/sayHello.js';
import './lib/jquery.mCustomScrollbar.js';

sayHello();



$('.cities__select').each(function() {

  var $this = $(this);
  var numberOfOptions = $(this).children('option').length; // Кол-во опций

  // Скрыть select
  $this.addClass('select-hidden');

  // Добавить input
  $this.after('<div class="form-user__item  form-user__item--select  select-styled  select-styled--not-selected"></div>');

  var $styledSelect = $this.next('.select-styled');

  // Текст первого эл-та
  $styledSelect.text($this.children('option').eq(0).text());

  // Вставить выпадающий список после инпута
  var $list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter($styledSelect);

  // Заполнить значеня
  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  var $listItems = $list.children('li');

  $styledSelect.click(function(e) {
    e.stopPropagation();
    $(this).toggleClass('is-active').next('ul.select-options').toggle();
  });

  $listItems.click(function(e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass('is-active');

    $styledSelect.removeClass('select-styled--not-selected');

    var option_rel = $(this).attr('rel');
    $this.val(option_rel);
    $list.hide();

    var option_select = $this.children('option[value="' + option_rel+ '"]');
    console.log(option_select);

    $this.children('option').attr('selected', false);
    option_select.attr('selected', true);

    // console.log($this.val());
  });


  // $(document).click(function() {
  //   $styledSelect.removeClass('is-active');
  //   $list.hide();
  // });

  $(document).mouseup(function(e) { // событие клика по веб-документу
    //var div = $("#popup"); // тут указываем ID элемента
    var div = $this;

    if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
      // div.hide(); // скрываем его
			   $styledSelect.removeClass('is-active');
    		   $list.hide();
    }
  });


});


$(window).on('load',function() {
  $('.select-options').mCustomScrollbar({
    theme:'dark'
  });


});
