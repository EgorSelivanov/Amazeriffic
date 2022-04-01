var main = function (toDoObjects) {
	"use strict";
	var toDos = getDescription(toDoObjects); 
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
				console.log("Щелчок на вкладке Теги!");
				var organizedByTag = organizeByTags(toDoObjects);
				
				organizedByTag.forEach(function(tag){
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					})
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				console.log("Щелчок на 4 вкладке!");
				$(".content").append(
					'<input type="text" class="input-task">Описание</input><br>'+
					'<input type="text" class="input-tag">Теги</input><br>'+ 
					'<button class="add-task-btn">Добавить</button>'
				);
				var description;
				var newTags;
				$('.add-task-btn').on('click',function(){
					description = $('.input-task').val().trim();
					newTags = $('.input-tag').val().trim();
					if ((description != '') && (newTags != '')) {
						var tags = newTags.split(",");
						toDoObjects.push({"description":description, "tags":tags});
						toDos = getDescription(toDoObjects);
						alert('Новое задание "' + description + '" успешно добавлено!');
						$('.input-task').val("");
						$('.input-tag').val("");
					}
				});
				$(".input-task, .input-tag").keyup(function(event){
					if (event.keyCode == 13) {
						$(".add-task-btn").click();
					}
				})
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
};

var organizeByTags = function(toDoObjects) {
	//Создание пустого массива для тегов
	var tags = [];
	//перебираем все задачи toDos
	toDoObjects.forEach(function(toDo){
		//перебираем все теги для каждой задачи
		toDo.tags.forEach(function (tag) {
			//убеждаемся, что этого тега еще нет в массиве
			if (tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		});
	});

	var tagObjects = tags.map(function (tag){
		//находим все задачи, содержащие этот тег
		var toDosWithTag = [];
		toDoObjects.forEach(function (toDo){
			//проверка, что результат indexOf не равен -1
			if (toDo.tags.indexOf(tag) !== -1){
				toDosWithTag.push(toDo.description);
			}
		});
		//связываем каждый тег с объектом, который
		//содержит название тега и массив
		return {"name":tag, "toDos":toDosWithTag };
	});

	return tagObjects;
};

var getDescription = function(toDoObjects) {
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание
		// этой задачи
		return toDo.description;
	});
	return toDos;
}

$(document).ready(function () {
	$.getJSON("../todos.json", function (toDoObjects) {
		// вызов функции main с аргументом в виде объекта toDoObjects
		main(toDoObjects);
	});
});

