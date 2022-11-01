"use strict";
$(document).ready(function () {
  console.log("test");

  var teamInfo = [];
  var currentProjects = [];
  var completedProjects = [];

  $("#submit").click(function () {
    var selectedTeam = $("#taskTableSel").find(":selected").text();
    var newTask = $("#newTask").val();
    newTask == ""
      ? alert("Task name cannot be empty")
      : getTableId(selectedTeam, newTask);
    $('#newTask').val("");
  });

  var getTableId = (selectedTeam, newTask) => {
    var tableId = "";
    switch (selectedTeam) {
      case "Team Info":
        tableId = "teamInfo";
        break;
      case "Current Project":
        tableId = "currentProjects";
        break;
      case "Completed Project":
        tableId = "completedProjects";
        break;
      default:
    }
    addNewRows(tableId, newTask);
  };

  var addNewRows = (tableId, newTask) => {
    var table = document.getElementById(tableId);
    let rand = Math.random().toFixed(4) * 100;
    let obj = { task_id: rand, task_name: newTask };
    var markup =
      "<tr><td><input type='checkbox' id='" +
      rand +
      "' name='record'>" +
      newTask +
      "</td></tr>";
    switch (tableId) {
      case "teamInfo":
        teamInfo.push(obj);
        break;
      case "currentProjects":
        currentProjects.push(obj);
        break;
      case "completedProjects":
        completedProjects.push(obj);
        break;
      default:
    }
    $(table).append(markup);
  };

  $(".delete-row").click(function () {
    $("table tbody")
      .find('input[name="record"]')
      .each(function () {
        if ($(this).is(":checked")) {
          var id = $(this).closest("table").attr("id");
          var elemId = $(this).parents("tr")[0].children[0].children[0].id;
          switch (id) {
            case "teamInfo":
              teamInfo = teamInfo.filter((obj) => obj.task_id != elemId);
              break;
            case "currentProjects":
              currentProjects = currentProjects.filter(
                (obj) => obj.task_id != elemId
              );
              break;
            case "completedProjects":
              completedProjects = completedProjects.filter(
                (obj) => obj.task_id != elemId
              );
              break;
            default:
          }
          $(this).parents("tr").remove();
        }
      });
  });

  var $table_id = $("#teamInfo");
  var originTable = "";
  var destinationTable = "";
  $("tbody.table_body")
    .sortable({
      connectWith: ".table_body",
      items: "> tr:not(:first)",
      appendTo: $table_id,
      helper: "clone",
      zIndex: 999990,
      start: function (ui, event) {
        originTable = $(this)[0].innerText.replace(/\n/g, "");
      },
      stop: function (ui, event) {
        var id = parseFloat(event.item[0].children[0].children[0].id);
        var elem;
        destinationTable = event.item[0].closest("table").id;
        switch (originTable) {
          case "Team Info":
            elem = teamInfo.find((obj) => obj.task_id == id);
            switch (destinationTable) {
              case "teamInfo":
                teamInfo.push(elem);
                break;
              case "currentProjects":
                currentProjects.push(elem);
                break;
              case "completedProjects":
                completedProjects.push(elem);
                break;
              default:
            }
            teamInfo = teamInfo.filter((obj) => obj.task_id != id);
            break;
          case "Current Project":
            elem = currentProjects.find((obj) => obj.task_id == id);
            switch (destinationTable) {
              case "teamInfo":
                teamInfo.push(elem);
                break;
              case "currentProjects":
                currentProjects.push(elem);
                break;
              case "completedProjects":
                completedProjects.push(elem);
                break;
              default:
            }
            currentProjects = currentProjects.filter((obj) => obj.task_id != id);
            break;
          case "Completed Project":
            elem = completedProjects.find((obj) => obj.task_id == id);
            switch (destinationTable) {
              case "teamInfo":
                teamInfo.push(elem);
                break;
              case "currentProjects":
                currentProjects.push(elem);
                break;
              case "completedProjects":
                completedProjects.push(elem);
                break;
              default:
            }
            completedProjects = completedProjects.filter((obj) => obj.task_id != id);
            break;
          default:
        }
      },
    })
    .disableSelection();
});
