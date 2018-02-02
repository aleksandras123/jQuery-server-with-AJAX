$(function(){
  $("#listButton").click(showList);
  $("#newButton").click(addRecord);




});
let allData=[];


function showList()
{
  $("#myContent").empty();
  $.ajax({
          type: "GET",
          url: "http://192.168.1.81:8080/list",
          success: function(data){
            allData=data;
            let table = $('<table>');
            for (let i = 0; i < data.length; i++) {
              let row=$('<tr>');
              let cell=$('<td>');
              // id
              cell.text(data[i].id);
              row.append(cell);
              // Name
              cell=$('<td>');
              cell.text(data[i].userName);
              row.append(cell);
              // mail
              cell=$('<td>');
              cell.text(data[i].eMail);
              row.append(cell);
              // age
              cell=$('<td>');
              cell.text(data[i].age);
              row.append(cell);
              // del
              cell=$('<td>');
              let delButton=$('<button>delete</button>');
              cell.append(delButton);
              row.append(cell);
              delButton.attr('value',data[i].id);
              delButton.click(deleteRecord);


              //update
              cell=$('<td>');
              let updateButton=$('<button>update</button>');
              cell.append(updateButton);
              row.append(cell);
              updateButton.attr('value',data[i].id);
              updateButton.click(updateClick);


              table.append(row);
            }
            $('#myContent').append(table);
          console.log(data);
          },
          error: function(response){
            alert("Error");
          },
      });
}

 // add

function addRecord()
{
//   $("#myContent").empty();
//
//   let formDiv=$('<div>');
//
//   formDiv.append($('<input type="hidden" id="id">'));
//   // Name
//   formDiv.append($('<h4>userName</h4>'));
//   formDiv.append($('<input id="userName">'));
//   formDiv.append($('<p>'));
//   // Mail
//   formDiv.append($('<h4>eMail</h4>'));
//   formDiv.append($('<input id="eMail">'));
//   formDiv.append($('<p>'));
//   // age
//   formDiv.append($('<h4>age</h4>'));
//   formDiv.append($('<input id="age">'));
//   formDiv.append($('<p>'));
// //  button save
//   let saveButton = $('<button>Save</button>');
//   saveButton.click(saveClick);
//   formDiv.append(saveButton);
// // button cancel
//   let cancelButton = $('<button>Cancel</button>');
//   cancelButton.click(cancelClick);
//   formDiv.append(cancelButton);
//
//   $('#myContent').append(formDiv);

addTable();


}

// SAVE

function saveClick()
{
  let o={
    userName: $('#userName').val(),
    eMail: $('#eMail').val(),
    age: parseInt($('#age').val())
  }

    let url="http://192.168.1.81:8080/add";
    let uid=$('#userId');
    if (uid.length>0) {
      o.id=parseInt(uid.val());
      url="http://192.168.1.81:8080/update";
    }


  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(o),
    success: function(data){
      if (data.error)
        alert("Data Error")
      else
        showList()
    },
      error: function(){
        alert("Error");},

    dataType: "json",

    contentType: "application/json"
  });

}
// CANCEL

function cancelClick()
{
  $("#myContent").empty();

}

// DELETE

function deleteRecord(){
  $.ajax({
    type: "POST",
    url: "http://192.168.1.81:8080/delete",
    data: JSON.stringify({
      id:parseInt(this.value)
    }),
    success: function(data){
      if (data.error)
        alert("Data Error")
      else
        showList()
    },
      error: function(){
        alert("Error");},

    dataType: "json",

    contentType: "application/json"
  });
}

//UPDATE
function updateClick()
{

  let o;
  for (var i = 0; i < allData.length; i++) {
    if (allData[i].id==this.value) {
      o=allData[i];
      break;
    }
  }
//   $("#myContent").empty();
//
//   let formDiv=$('<div>');
//
//
//   // ID
//   let d=($('<input type="hidden" id="userId">'));
//   d.val(allData[i].id)
//   formDiv.append(d);
//     // Name
//   formDiv.append($('<h4>userName</h4>'));
//   let a=($('<input id="userName">'));
//   a.val(allData[i].userName);
//   formDiv.append(a);
//   formDiv.append($('<p>'));
//   // Mail
//   formDiv.append($('<h4>eMail</h4>'));
//   let b=($('<input id="eMail">'));
//   b.val(allData[i].eMail);
//   formDiv.append(b);
//   formDiv.append($('<p>'));
//   // age
//   formDiv.append($('<h4>age</h4>'));
//   let c=($('<input id="age">'));
//   c.val(allData[i].age);
//   formDiv.append(c);
//   formDiv.append($('<p>'));
//
//   let saveButton = $('<button>Save</button>');
//   saveButton.click(saveClick);
//   formDiv.append(saveButton);
// // button cancel
//   let cancelButton = $('<button>Cancel</button>');
//   cancelButton.click(cancelClick);
//   formDiv.append(cancelButton);
//
//   $('#myContent').append(formDiv);

// MANO BANDYMAS
addTable(o);

}


function addTable(o)

{

    $("#myContent").empty();
    let formDiv=$('<div>');


    // ID
    let d=($('<input type="hidden" id="userId">'));
    if ('undefined'!=typeof(o)) {
      d.val(o.id)
      formDiv.append(d);
    }
      // Name
    formDiv.append($('<h4>userName</h4>'));
    let a=($('<input id="userName">'));
    if('undefined'!=typeof(o)){
      a.val(o.userName);
    }
    formDiv.append(a);

    // Mail
    formDiv.append($('<h4>eMail</h4>'));
    let b=($('<input id="eMail">'));
    if ('undefined'!=typeof(o)) {
      b.val(o.eMail);
    }
    formDiv.append(b);

    // age

    formDiv.append($('<h4>age</h4>'));
    let c=($('<input id="age">'));
    if ('undefined'!=typeof(o)) {
      c.val(o.age);
    }
    formDiv.append(c);

    let saveButton = $('<button>Save</button>');
    saveButton.click(saveClick);
    formDiv.append(saveButton);
  // button cancel
    let cancelButton = $('<button>Cancel</button>');
    cancelButton.click(cancelClick);
    formDiv.append(cancelButton);


    $('#myContent').append(formDiv);

}
