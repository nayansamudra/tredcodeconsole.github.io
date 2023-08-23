//---------- Add Member
const add_member = () => {
    var email = $("#email_input").val();
    var role = $('input[type="radio"]:checked').val();
    var data_dict = {};

    // input validation
    if (email == "") {
        alert("Please Enter all fields!");
        return;
    }

    if ($("#p1").is(":checked")) { p1_value = 1 } else { p1_value = 0 }
    if ($("#p2").is(":checked")) { p2_value = 1 } else { p2_value = 0 }
    if ($("#p3").is(":checked")) { p3_value = 1 } else { p3_value = 0 }
    if ($("#p4").is(":checked")) { p4_value = 1 } else { p4_value = 0 }
    if ($("#idx").is(":checked")) { idx_value = 1 } else { idx_value = 0 }
    if ($("#mf").is(":checked")) { mf_value = 1 } else { mf_value = 0 }

    data_dict = {
        'p1': p1_value,
        'p2': p2_value,
        'p3': p3_value,
        'p4': p4_value,
        'idx': idx_value,
        'mf': mf_value
    };

    data = JSON.stringify(data_dict);

    $.post(
        root + main_route + "/insert_replace_user",
        { email: email, role: role, access: data },
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if (data == "success") {
                alert("User added Successfully!");
                Fetch_All_Members();
                $("#email_input").val("");
                $("#submit").show();
            } else {
                alert("Unable to add User");
            }
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
};


//---------- Delete Member
const del_member = (email) => {
    if (confirm("Are you Sure?")) { }
    else { return }
    $.post(
        root + main_route + "/delete_user",
        { email: email },
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            Fetch_All_Members();
            $("#email_input").val("");
            $("#submit").show();
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
};


//---------- Fetch All Member
const Fetch_All_Members = () => {
    $.post(root + main_route + "/get_tredcode_users", function (data, status) {
        All_Member = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < All_Member.length; i++) {
            // data pre preprocessing
            let ts = All_Member[i][0];
            let email = All_Member[i][1];
            let roles = All_Member[i][2];
            let access = All_Member[i][3];
            All_Member[i][0] = moment.unix(All_Member[i][0]).format("DD-MMM HH:mm A");
            All_Member[i][1] = email;
            All_Member[i][2] = roles;
            All_Member[i][3] = shorten(access);
            var str =
                `<button class="m-2" onclick="del_member('${email}')">&nbsp;Delete&nbsp;</button>`;
            All_Member[i][4] = str;
        }
        if (All_Member) {
            if (counter_for_datatable == 0) {
                counter_for_datatable += 1;
                datatable = $("#userDatatable").DataTable({
                    paging: true,
                    pageLength: 50,
                    info: false,
                    scrollX: true,
                    scrollY: 550,
                    order: false,
                });
            }
            datatable.clear();
            datatable.rows.add(All_Member);
            datatable.draw();
        }
    }).fail(function (response) {
        console.log("Error: " + response);
    });
};



//---------- Blog Submit
document.querySelector("#submit").addEventListener("click", () => {
    add_member();
});



//---------- Shorten Function
const shorten = (text, length = 75) => {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    temp.push(text);
    text = text.substring(0, length);
    return text + "...";
};



//---------- Show_Hide Table
const show_hide = () => {
    counter_for_show_hide += 1;
    if (counter_for_show_hide % 2 == 0) {
        $('.wrapper_1_button').text('Hide')
        $('#table_datatable').show()
    }
    else {
        $('.wrapper_1_button').text('Show')
        $('#table_datatable').hide()
    }
}




//---------- On Ready - Refresh
$(document).ready(function () {
    console.log = function () { };
    $.ajaxSetup({ async: false }); // to stop async

    $("#submit").show();

    counter_for_datatable = 0;
    counter_for_show_hide = 0;
    temp = [];

    Fetch_All_Members();

    $("#userDatatable tbody").on("click", "td", function () {
        var cell = $(this);
        var text = cell.text();

        if (
            cell.children().length === 0 &&
            cell.contents().length === 1 &&
            cell.contents()[0].nodeType === Node.TEXT_NODE
        ) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    console.log("Text copied to clipboard: " + text);
                    $('#notification').text('Text copied to clipboard')
                    $('#notification').fadeIn('slow').delay(2000).fadeOut('slow');
                })
                .catch((err) => {
                    console.error("Failed to copy text: " + err);
                    $('#notification').text('Failed to copy text')
                    $('#notification').fadeIn('slow').delay(2000).fadeOut('slow');
                });
        }
    });

});