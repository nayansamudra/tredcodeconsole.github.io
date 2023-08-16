
function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    var out = String(date.getFullYear()) + "-";
    if (date.getMonth() + 1 < 10)
        out += "0" + String(date.getMonth() + 1);
    else
        out += String(date.getMonth() + 1);
    out += "-";
    if (date.getDate() < 10)
        out += "0" + String(date.getDate());
    else
        out += String(date.getDate());
    return out;
}

var events = (Math.random() * 200).toFixed(0);
var data = [];
for (var i = 0; i < events; i++) {
    var current = new Date();
    var rndStart = new Date(current.getFullYear() - 1, current.getMonth() - 5, current.getDate());
    data.push({
        count: parseInt((Math.random() * 200).toFixed(0)),
        date: randomDate(rndStart.valueOf(), current.valueOf())
    });
}



$("#heatmap-5").CalendarHeatmap([], {
    title: "Interactive",
    months: (new Date()).getMonth() + 1,
    labels: {
        days: true,
        custom: {
            weekDayLabels: "dd"
        }
    },
    legend: {
        minLabel: "Max Loss",
        maxLabel: "Max Profit",

    }
});

$("#heatmap-5-random").on("click", function () {

    var events = (Math.random() * 200).toFixed(0);
    var data = [];
    for (var i = 0; i < events; i++) {
        var current = new Date();
        var rndStart = new Date(current.getFullYear() - 1, current.getMonth() - 5, current.getDate());
        data.push({
            count: parseInt((Math.random() * 200).toFixed(0)),
            date: randomDate(rndStart.valueOf(), current.valueOf())
        });
    }

    console.log(data)

    $("#heatmap-5").CalendarHeatmap('updateDates', data);

    resize_function()
});

$("#heatmap-5-empty").on("click", function () {
    $("#heatmap-5").CalendarHeatmap('updateDates', []);
    resize_function()
});

$("#heatmap-5-append").on("click", function () {
    var events = (Math.random() * 10).toFixed(0);
    var data = [];
    for (var i = 0; i < events; i++) {
        var current = new Date();
        var rndStart = new Date(current.getFullYear() - 1, current.getMonth() - 5, current.getDate());
        data.push({
            count: parseInt((Math.random() * 200).toFixed(0)),
            date: randomDate(rndStart.valueOf(), current.valueOf())
        });
    }
    $("#heatmap-5").CalendarHeatmap('appendDates', data);
    resize_function()
});

$("#heatmap-5-wkday").on("click", function () {
    var labels = $("#heatmap-5").CalendarHeatmap('getOptions').labels;
    $("#heatmap-5").CalendarHeatmap('updateOptions', {
        labels: {
            days: (labels.days === true) ? false : true
        }
    });

    resize_function()
});

resize_function = () => {
    let month_length = $(".ch-month").length;

    if ($(window).width() < 1610 && month_length == 12) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 1610 && month_length == 12) {
        $('.ch-year').addClass('d-flex justify-content-center')
    } 

    if ($(window).width() < 1500 && month_length == 11) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 1500 && month_length == 11) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 1370 && month_length == 10) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 1370 && month_length == 10) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 1205 && month_length == 9) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 1205 && month_length == 9) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 1090 && month_length == 8) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 1090 && month_length == 8) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }
    
    if ($(window).width() < 885 && month_length == 7) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 885 && month_length == 7) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 773 && month_length == 6) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 773 && month_length == 6) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 660 && month_length == 5) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 660 && month_length == 5) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 550 && month_length == 4) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 550 && month_length == 4) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if ($(window).width() < 430 && month_length == 3) {
        $('.ch-year').removeClass('d-flex justify-content-center')
    } else if ($(window).width() >= 430 && month_length == 3) {
        $('.ch-year').addClass('d-flex justify-content-center')
    }

    if($(window).width() < 540) {
        $('.ch-day').width(9) //15px
        $('.ch-day').height(9)

        $('.ch-week').width(11)
        $('.ch-day-labels').width(11) //17px

        $('.ch-day-label').css('line-height','11px')  // 17px
    } else {
        $('.ch-day').width(15)
        $('.ch-day').height(15)

        $('.ch-week').width(17)
        $('.ch-day-labels').width(17)

        $('.ch-day-label').css('line-height','17px')
    }
}

$(document).ready(function () {
    // Set default values for entry and exit date fields
    const entryDate = new Date();
    entryDate.setHours(14, 45, 0); // Set hours, minutes, and seconds  9:15 AM (extra 5.30 hours i had to add in code)
    document.getElementById('Entry_date_time').value = entryDate.toISOString().slice(0, 16);

    const exitDate = new Date();
    exitDate.setHours(21, 0, 0); // Set hours, minutes, and seconds  3:30 PM (extra 5.30 hours i had to add in code)
    document.getElementById('Exit_date_time').value = exitDate.toISOString().slice(0, 16);

    // Set default values for entry and exit date fields
    $('#Entry_date').val(new Date().toISOString().slice(0, 10))
    $('#Exit_date').val(new Date().toISOString().slice(0, 10))

    $('.ch-year').addClass('d-flex justify-content-center')
    resize_function()
})

$(window).on("resize", function () {
    resize_function()
})

$('.modal').on('shown.bs.modal', function () {
    $('html').css('overflow', 'hidden')
}).on('hidden.bs.modal', function () {
    $('html').attr('style', 'overflow-x:hidden !important; overflow-y:auto !important')
    $('body').css('overflow-x', 'clip')
});
