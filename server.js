var express = require('express');
var stylus = require('stylus');
var cors = require('cors');
var fs = require("fs");
var bodyParser = require('body-parser');
var Guid = require('guid');
var taskService = require('./server/services/task.js')
var lessonService = require('./server/services/lesson.js')
var employeeService = require('./server/services/employee.js')
var projectService = require('./server/services/project.js')
var groupService = require('./server/services/group.js')
var port = process.env.PORT || 3030;
var environment = process.env.NODE_ENV || 'development';
var app = express();
var compile = function(str, path) {
	return stylus(str).set('filename', path)
};
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cors());
app.use(stylus.middleware(
	{
		src : __dirname + '/public',
		compile : compile
	}
));
//deliver static content from the public directory
app.use(express.static(__dirname + '/public/'));
app.set('port', port);
//use server routing for partials so that the Jade view engine can resolve the HTML
app.get('/partials/:partialPath', function(request, response){
	response.render('partials/' + request.params.partialPath);
});

app.post('/api/task/', function(request, response){
  var task = JSON.parse(JSON.stringify(request.body));
  taskService.post(task).then(function(data) {
    response.json(data);
  })
});

app.get('/api/task/:name', function(request, response){
	taskService.getbyName(request.params.name).then(function(result){
		response.json(result);
	});
})

app.get('/api/gettaskbyID/:id', function(request, response){
	taskService.getbyID(request.params.id).then(function(result){
		response.json(result);
	});
})

app.get('/api/tasks/', function(request, response){
	taskService.getAllTasks().then(function(result){
		response.json(result);
	});
})

app.get('/api/tasksForEmployee/:id', function(request, response){
	taskService.getTasksForEmployee(request.params.id).then(function(result){
		var tasks = [];
		for(index = 0; index < result.length; index++){
			tasks[index] = result[index].task_name;
		}
		response.json(tasks);
	});
})

app.get('/api/tasksForProject/:id', function(request, response){
	taskService.getTasksForProject(request.params.id).then(function(result){
		var tasks = [];
		for(index = 0; index < result.length; index++){
			tasks[index] = result[index].task_name;
		}
		response.json(tasks);
	});
})
//////////////////////////////////////////////////////////////
app.post('/api/employee/', function(request, response){
  var employee = JSON.parse(JSON.stringify(request.body));
  employeeService.post(employee).then(function(data) {
    response.json(data);
  })
});

app.get('/api/employee/:name', function(request, response){
	employeeService.getbyName(request.params.name).then(function(result){
		response.json(result);
	});
})

app.get('/api/getEmployeeByID/:id', function(request, response){
	employeeService.getbyID(request.params.id).then(function(result){
		response.json(result);
	});
})

app.get('/api/employees/', function(request, response){
	employeeService.getAllEmployees().then(function(result){
		response.json(result);
	});
})

app.get('/api/employeesInGroup/:id', function(request, response){
	employeeService.getEmployeesInGroup(request.params.id).then(function(result){
		var employees = [];
		for(index = 0; index < result.length; index++){
			employees[index] = (result[index].employee_first_name + " " + result[index].employee_last_name);
		}
		response.json(employees);
	});
})
/////////////////////////////////////////////////////////////
app.post('/api/project/', function(request, response){
  var project = JSON.parse(JSON.stringify(request.body));
  projectService.post(project).then(function(data) {
    response.json(data);
  });
})

app.get('/api/project/:name', function(request, response){
	projectService.getbyName(request.params.name).then(function(result){
		response.json(result);
	});
})

app.get('/api/getProjectByID/:id', function(request, response){
	projectService.getByID(request.params.id).then(function(result){
		response.json(result);
	});
})

app.get('/api/projects/', function(request, response){
	projectService.getAllProjects().then(function(result){
		response.json(result);
	});
})
/////////////////////////////////////////////////////////////
app.post('/api/group/', function(request, response){
  var group = JSON.parse(JSON.stringify(request.body));
  groupService.post(group).then(function(data) {
    response.json(data);
  });
})

app.get('/api/group/:name', function(request, response){
	groupService.getbyName(request.params.name).then(function(result){
		response.json(result);
	});
})

app.get('/api/getgroupbyID/:id', function(request, response){
	groupService.getbyID(request.params.id).then(function(result){
		response.json(result);
	});
})

app.get('/api/groups/', function(request, response){
	groupService.getAllGroups().then(function(result){
		response.json(result);
	});
})
//////////////////////////////////////////////////////////////
app.post('/api/lesson/', function(request, response){
  var lesson = JSON.parse(JSON.stringify(request.body));
  lessonService.post(lesson).then(function(data) {
    response.json(data);
  })
});

app.get('/api/lesson/:name', function(request, response){
	lessonService.getbyName(request.params.name).then(function(result){
		response.json(result);
	});
})

app.get('/api/getlessonbyID/:id', function(request, response){
	lessonService.getbyID(request.params.id).then(function(result){
		response.json(result);
	});
})

app.get('/api/lessons/', function(request, response){
	lessonService.getAllLessons().then(function(result){
		response.json(result);
	});
})

app.get('/api/lessonsForEmployee/:id', function(request, response){
	lessonService.getLessonsForEmployee(request.params.id).then(function(result){
		var lessons = [];
		for(index = 0; index < result.length; index++){
			lessons[index] = result[index].lesson_name;
		}
		response.json(lessons);
	})
})
////////////////////////////////////////////////////////////
app.get('/api/tasksDummy/', function(request, response){
   var object = {
      "task1" : {
         "name" : "Harvest Oil",
         "description" : "get it from the ground",
         "id": 1
      },
      "task2" : {
         "name" : "Stay Safe",
         "description" : "dont get hurt dummy",
         "id": 2
      },
      "task3" : {
         "name" : "Have Fun",
         "description" : "Money=Happiness!",
         "id": 3
      },
   }
   response.json(object);
  });

	app.get('/api/oil/', function(request, response){
	   response.json("This is a project about oil.");
	  });

app.get('*', function(request, response) {
	response.render('index');
})

app.listen(port);
