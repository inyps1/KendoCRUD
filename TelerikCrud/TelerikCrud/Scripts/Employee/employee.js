$(document).ready(function () {

    $('#btnSubmit').on('click', function () {
        var empName = $('#txtName').val();
        var myModel = {
            Id: $('#hdnId').val(),
            Name: empName,
        }
        $.ajax({
            url: '/Home/SaveEmployee/',
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(myModel),
            dataType: "json",
            contentType: "application/json;",
        }).done(function (data) {
            alert(data);
            bindEmployeeGridLarge();
            $('#txtName').val('');
        }).fail(function () {
            alert('Failed');
        });
    });

    bindEmployeeGridLarge();
    function bindEmployeeGridLarge() {
        $("#employeeGrid").kendoGrid({
            sortable: true,
            pageable: true,
            filterable: true,

            dataSource: {
                transport: {
                    read: "/Home/GetAllEmployees",
                    dataType: "json"
                },
                pageSize: 10,
            },
            height: 580,
            columns: [

            { field: "Id", title: "ID", filterable: false, width: "60px" },
             { field: "Name", title: "Employee Name", filterable: true, },
              {
                  field: "Id", title: "Options", sortable: false, filterable: false,
                  template: '<a class="delete-link k-button"><span class="glyphicon glyphicon-remove"></span> </a> | <a class="Edit-link k-button"><span class="glyphicon glyphicon-pencil"></span> </a> '
              }
            ],
            dataBound: function (event) {
                $(".delete-link").click(function (e) {
                    e.preventDefault();

                    if (confirm("Do you want to delete this record?")) {


                        var grid = $("#employeeGrid").data("kendoGrid");
                        var dataItem = grid.dataItem($(this).closest("tr"));


                        $.post("/Home/DeleteEmployee", { id: dataItem.Id })
                              .done(function (data) {
                                  alert(data);
                                  bindEmployeeGridLarge();
                              });

                    }

                });

                $(".Edit-link").click(function (e) {
                    e.preventDefault();
                    var grid = $("#employeeGrid").data("kendoGrid");
                    var dataItem = grid.dataItem($(this).closest("tr"));
                    $('#txtName').val(dataItem.Name);
                    $('#hdnId').val(dataItem.Id);
                 
                    //ClearAll();
                });
            }


        });
    }//eof

});