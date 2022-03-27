//saved tasks in localstorage
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

//unsaved tasks
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
  document.getElementById("currentDay").textContent = "Today is: " + moment().format('YYYY-MM-DD');
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

var auditTask = function(current_task) {
  // get current hour
  var current_time = moment().format("HH:mm");
  var current_hour = current_time.slice(0, 2);
  // get hour from task element
  var selected_task = current_task.parent(".row").children("h3");
  var selected_time = selected_task.text().slice(0, 2);
  current_task.removeClass("list-group-item-warning list-group-item-danger list-group-item-success");
  //incoming tasks
  if (current_hour < selected_time) {
    $(current_task).addClass("list-group-item-warning");
  } //current tasks
  else if (current_hour == selected_time) {
    $(current_task).addClass("list-group-item-danger");
  } //finished tasks
  else if (current_hour > selected_time) {
    $(current_task).addClass("list-group-item-success");
  }
};
// save text to temptasks when finish edit
$(".container").on("blur", "textarea", function() {
  var text = $(this).val();
  var current_id = this.id;
  temptasks[current_id] = text;
});
// add temptasks to savedtasks when click on button
$(".container").on("click", "button", function() {
  var current = ($(this).parent(".row").children("textarea"));
  var current_id = current[0].id;
  tasks[current_id] = temptasks[current_id];
  console.log(current);
  auditTask(current);
  saveTasks();
});

loadTasks();
