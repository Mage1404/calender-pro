var tasks = {
  "9":"",
  "10":"",
  "11":"",
  "12":"",
  "13":"",
  "14":"",
  "15":"",
  "16":"",
  "17":""
};

var temptasks = {
  "9":"",
  "10":"",
  "11":"",
  "12":"",
  "13":"",
  "14":"",
  "15":"",
  "16":"",
  "17":""
}

var loadTasks = function() {
  if (localStorage.length > 0) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  $.each(tasks, function(key, value) {
    if (value) {
      document.getElementById(key).textContent = value;
    } else {
      document.getElementById(key).textContent = "";
    }
    var current_task = "#" + key;
    auditTask($(current_task));
  });
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

var auditTask = function(current_task) {

  // get date from task element
  var current_time = moment().format("HH:mm");
  var current_hour = current_time.slice(0, 2);
  var selected_task = current_task.parent(".row").children("h3");
  var selected_time = selected_task.text().slice(0, 2);
  current_task.removeClass("list-group-item-warning list-group-item-danger list-group-item-success");

  if (current_hour < selected_time) {
    $(current_task).addClass("list-group-item-warning");
  } 
  else if (current_hour == selected_time) {
    $(current_task).addClass("list-group-item-danger");
  } else if (current_hour > selected_time) {
    $(current_task).addClass("list-group-item-success");
  }
};


$(".container").on("blur", "textarea", function() {
  var text = $(this).val();
  var current_id = this.id;
  temptasks[current_id] = text;
});

$(".container").on("click", "button", function() {
  var current = ($(this).parent(".row").children("textarea"));
  var current_id = current[0].id;
  tasks[current_id] = temptasks[current_id];
  console.log(current);
  auditTask(current);
  saveTasks();
});

loadTasks();
