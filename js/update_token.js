//---------- Add Member
const update_token = () => {
    var xsrf = $("#xsrf_input").val();
    var csrf = $('#csrf_input').val();

    // input validation
    if (xsrf == "" || csrf == "") {
        alert("Please Enter all fields!");
        return;
    }

    $.post(
        root + main_route + "/update_xsrf_csrf",
        { xsrf: xsrf, csrf: csrf },
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if (data == "success") {
                alert("Update Successfully!");
                $(":input").val("");
                $("#submit").show();
            } else {
                alert("Unable to Update");
            }
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
};



//---------- Blog Submit
document.querySelector("#submit").addEventListener("click", () => {
    update_token();
});


//---------- On Ready - Refresh
$(document).ready(function () {
    console.log = function () { };
    $.ajaxSetup({ async: false }); // to stop async

    $("#submit").show();

    counter_for_datatable = 0;
    counter_for_show_hide = 0;
    temp = [];

});