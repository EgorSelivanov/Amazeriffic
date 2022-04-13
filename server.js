var express = require("express"),
	http = require("http"),
	// импортируем библиотеку mongoose
	mongoose = require("mongoose"),
	app = express(),
	toDosController = require("./controllers/todos_controller.js"),
	usersController = require("./controllers/users_controller.js");

app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));

// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded({ extended: true}));

// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic',{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true
}).then(res => {
	console.log("DB connected");
}).catch(err => {
	console.log("ERROR" + err);
});

// начинаем слушать запросы
http.createServer(app).listen(3000);


app.get("/todos.json", toDosController.index);
app.get("/todos/:id", toDosController.show); 
app.post("/todos", toDosController.create);
app.put("/todos/:id", toDosController.update);
app.delete("/todos/:id", toDosController.destroy);

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy);

app.get("/users/:username/todos.json", toDosController.index);
app.post("/users/:username/todos", toDosController.create);
app.put("/users/:username/todos/:id", toDosController.update);
app.delete("/users/:username/todos/:id", toDosController.destroy);