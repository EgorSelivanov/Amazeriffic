var main = function () {
	"use strict";
	var toDos = [
	"Закончить писать эту книгу",
	"Вывести Грейси на прогулку в парк", 
	"Ответить на электронные письма", 
	"Подготовиться к лекции в понедельник", 
	"Обновить несколько новых задач", 
	"Купить продукты"
	];
	//переберем все элементы span внутри вкладок
	$(".tabs a span").toArray().forEach(function (element) {
		//создаем обработку щелчков для этого элемента
		$(element).on("click", function () {
			//поскольку мы используем версию элемента jQuery,
			//нужно создать временную переменную,
			//чтобы избежать постоянного обновления
			var $element = $(element);
			//делаем элементы неактивными
			$(".tabs a span").removeClass("active");
			//делаем активным выбранный элемент
			$element.addClass("active");
			//очищаем основное содержание, чтобы переопределить его
			$("main .content").empty();
			//проверка, является ли предок элемента
			//первым потомком своего собственного предка
			if ($element.parent().is(":nth-child(1)")) {
				console.log("Щелчок на первой вкладке!");
				for (var i = toDos.length-1; i > -1; i--) { 
					$(".content").append($("<li>").text(toDos[i]));
				}
			} else if ($element.parent().is(":nth-child(2)")) {
				console.log("Щелчок на второй вкладке!");
				toDos.forEach(function (todo) { 
					$(".content").append($("<li>").text(todo));
				});
			} else if ($element.parent().is(":nth-child(3)")) {
				console.log("Щелчок на третьей вкладке!");
				$(".content").append(
					'<input type="text" class="input-task">'+
					'<button class="add-task-btn">Добавить</button>'
				);
				var newTask;
				$('.add-task-btn').on('click',function(){
					newTask = $('.input-task').val();
					if (newTask != '') {
						toDos.push( newTask);
						alert('Новое задание "' + newTask + '" успешно добавлено!');
						$('.input-task').val("");
					}
				})
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
};
$(document).ready(main);

