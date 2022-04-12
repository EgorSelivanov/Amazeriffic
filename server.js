var express = require("express"),
	http = require("http"),
	// импортируем библиотеку mongoose
	mongoose = require("mongoose"),
	app = express(),
	toDosController = require("./controllers/todos_controller.js"),
	usersController = require("./controllers/users_controller.js"),
	toDos = [
		{
		"description" : "Купить продукты",
		"tags" : [ "шопинг", "рутина" ]
		},
		{
		"description" : "Сделать несколько новых задач",
		"tags" : [ "писательство", "работа" ]
		},
		{
		"description" : "Подготовиться к лекции в понедельник",
		"tags" : [ "работа", "преподавание" ]
		},
		{
		"description" : "Ответить на электронные письма",
		"tags" : [ "работа" ]
		},
		{
		"description" : "Вывести Грейси на прогулку в парк",
		"tags" : [ "рутина", "питомцы" ]
		},
		{
		"description" : "Закончить писать книгу",
		"tags" : [ "писательство", "работа" ]
		},
		{
		"description" : "Сделать веб",
		"tags" : [ "учеба" ]
		}
	];

app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));

// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded({ extended: true}));

// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// Это модель Mongoose для задач
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);
// начинаем слушать запросы
http.createServer(app).listen(3000);

// этот маршрут замещает наш файл
// todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		if (err !== null) {
			console.log("ERROR" + err);
		}
		else {
			res.json(toDos);
		}
	});
});


app.post("/todos", function (req, res) {
	console.log(req.body);
	
	var newToDo = new ToDo({
		"description":req.body.description,
		"tags":req.body.tags
	});
	
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			// клиент ожидает, что будут возвращены все задачи,
			// поэтому для сохранения совместимости сделаем дополнительный запрос
			ToDo.find({}, function (err, result) {
				if (err !== null) {
					// элемент не был сохранен
					res.send("ERROR");
				}
				else {
					res.json(result);
				}
			});
		}
	});
});

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy);

app.get("/user/:username/todos.json", toDosController.index);
app.post("/user/:username/todos", toDosController.create);
app.put("/user/:username/todos/:id", toDosController.update);
app.delete("/user/:username/todos/:id", toDosController.destroy);