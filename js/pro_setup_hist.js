// root_1 = 'https://ebs.tredcode.com'
route_1 = "/study-data"         // For Chart
route_2 = "/study-symbol"       // For DataTable (From 1 to 9)
route_3 = "/prevol-rank"       // For DataTable (From 10)

const update_time = () => {
    $.getJSON(root_1 + '/current?type=servertime', function (response) {
        response = response.split(":");
        $('.dtime').html(response[0] + ':' + (response[1]));
    });
}

// -----------------DATE TIME PICKER-------------------

const fetch_data = () => {
    var selectedDateTime = $('#select_date_time').val();
    var timestamp = Math.floor(new Date(selectedDateTime).getTime() / 1000);
    var ts = timestamp

    var currentTimestamp = Date.now();

    var dateTimeValue = $("#select_date_time").val();
    var timeString = dateTimeValue.split("T")[1];
    timeString = timeString.split(":").slice(0, 2).join(":");
    $('.dtime').text(timeString);

    getChartData_ps1(ts, currentTimestamp)
    getChartData_ps2(ts, currentTimestamp)

    var ajaxParams = dataTable.ajax.params();
    ajaxParams.ts = timestamp;
    ajaxParams._ = Date.now();
    dataTable.ajax.reload();

    var ajaxParams_2 = dataTable_2.ajax.params();
    ajaxParams_2.ts = timestamp;
    ajaxParams_2._ = Date.now();
    dataTable_2.ajax.reload();

    var ajaxParams_3 = dataTable_3.ajax.params();
    ajaxParams_3.ts = timestamp;
    ajaxParams_3._ = Date.now();
    dataTable_3.ajax.reload();

    var ajaxParams_4 = dataTable_4.ajax.params();
    ajaxParams_4.ts = timestamp;
    ajaxParams_4._ = Date.now();
    dataTable_4.ajax.reload();

    var ajaxParams_5 = dataTable_5.ajax.params();
    ajaxParams_5.ts = timestamp;
    ajaxParams_5._ = Date.now();
    dataTable_5.ajax.reload();

    var ajaxParams_6 = dataTable_6.ajax.params();
    ajaxParams_6.ts = timestamp;
    ajaxParams_6._ = Date.now();
    dataTable_6.ajax.reload();

    var ajaxParams_7 = dataTable_7.ajax.params();
    ajaxParams_7.ts = timestamp;
    ajaxParams_7._ = Date.now();
    dataTable_7.ajax.reload();

    var ajaxParams_8 = dataTable_8.ajax.params();
    ajaxParams_8.ts = timestamp;
    ajaxParams_8._ = Date.now();
    dataTable_8.ajax.reload();

    var ajaxParams_9 = dataTable_9.ajax.params();
    ajaxParams_9.ts = timestamp;
    ajaxParams_9._ = Date.now();
    dataTable_9.ajax.reload();

    var ajaxParams_10 = pm.ajax.params();
    ajaxParams_10.ts = timestamp;
    ajaxParams_10._ = Date.now();
    pm.ajax.reload();
}

const calculateTimestamp = () => {
    var selectedDateTime = $('#select_date_time').val();
    var timestamp = Math.floor(new Date(selectedDateTime).getTime() / 1000);
    return timestamp;
}

// -----------------CHART------------------

options5 = {
    bar: { groupWidth: 30, },
    series: [],
    chart: {
        height: 600,
        width: '100%',
        type: 'bar',
        events: {
            click: (event, chartContext, dataPointIndex) => {

                const toolbarElements = document.querySelectorAll("#prosetup_1_barchart .apexcharts-toolbar");
                if (toolbarElements.length > 0 && toolbarElements[0].contains(event.target)) {
                    // If the clicked element is part of the toolbar, return without doing anything
                    return;
                }

                let temp = dataPointIndex['dataPointIndex']
                let Bar_name = dataPointIndex['globals']['categoryLabels'][temp];

                console.log(Bar_name)
                tw_charts(Bar_name)
            }
        }
    },
    dataLabels: { enabled: false },
    title: { text: '', },
    noData: { text: 'Loading...' },

    plotOptions: {
        bar: {
            borderRadius: 8,
            opacity: 1,
            colors: {
                ranges: [{ from: -10, to: -0, color: '#FF5253' },
                { from: 10, to: 0, color: '#00D3C0' }],
                backgroundBarColors: ['#FFFFFF'],
                backgroundBarOpacity: 0.02,
            },

            columnWidth: '40%',
        }
    },
    yaxis: {
        title: { text: '', },
        labels: {
            style: {
                colors: '#FFFFFF'
            },
            rotate: -90,
        }
    },
    xaxis: {
        type: 'category',
        tickPlacement: 'on',
        labels: {
            minHeight: 150,
            maxHeight: 150,
            rotate: -90,
            offsetY: 0,
            rotateAlways: true,
            style: { colors: '#FFFFFF' }
        },

    }
};

chart_ps1 = new ApexCharts(document.querySelector("#prosetup_1_barchart"), options5);
chart_ps1.render();

const getChartData_ps1 = (ts, currentTimestamp) => {
    var dataSet = [];

    $.ajax({
        url: root_1 + route_1 + '/5 minute MOMENTUM SPIKE',
        type: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            // console.log("From Chart 1: "+localStorage.getItem('token').split('"').join(''))
            var i = 0;
            $.each(response.data, function (key, value) {
                if (i >= 20) { return false }
                dataSet[i] = { x: value.Symbol, y: value.param_0 };

                i++;
                //dataSet.push([value.Symbol,Math.floor(value.param_0)]);
            });

            chart_ps1.updateSeries([{
                name: '% chg',
                data: dataSet
            }])
        }
    });
}

// var options6 = {
//     bar: { groupWidth: 30, },
//     series: [],
//     chart: { height: 600, width: '100%', type: 'bar', },
//     dataLabels: { enabled: false },
//     title: { text: '', },
//     noData: { text: 'Loading...' },

//     plotOptions: {
//         bar: {
//             borderRadius: 8,
//             opacity: 1,
//             colors: {
//                 ranges: [{ from: -10, to: -0, color: '#FF5253' },
//                 { from: 10, to: 0, color: '#00D3C0' }],
//                 backgroundBarColors: ['#FFFFFF'],
//                 backgroundBarOpacity: 0.02,
//             },

//             columnWidth: '40%',
//         }
//     },
//     yaxis: {
//         title: { text: '', },
//         labels: {
//             style: {
//                 colors: '#FFFFFF'
//             },
//             rotate: -90,
//         }
//     },
//     xaxis: {
//         type: 'category',
//         tickPlacement: 'on',
//         labels: {
//             minHeight: 150,
//             maxHeight: 150,
//             rotate: -90,
//             offsetY: 0,
//             rotateAlways: true,
//             style: { colors: '#FFFFFF' }
//         },

//     }
// };

options6 = {
    bar: { groupWidth: 30, },
    series: [],
    chart: {
        height: 600,
        width: '100%',
        type: 'bar',
        events: {
            click: (event, chartContext, dataPointIndex) => {

                const toolbarElements = document.querySelectorAll("#prosetup_2_barchart .apexcharts-toolbar");
                if (toolbarElements.length > 0 && toolbarElements[0].contains(event.target)) {
                    // If the clicked element is part of the toolbar, return without doing anything
                    return;
                }

                let temp = dataPointIndex['dataPointIndex']
                let Bar_name = dataPointIndex['globals']['categoryLabels'][temp];

                console.log(Bar_name)
                tw_charts(Bar_name)
            }
        }
    },
    dataLabels: { enabled: false },
    title: { text: '', },
    noData: { text: 'Loading...' },

    plotOptions: {
        bar: {
            borderRadius: 8,
            opacity: 1,
            colors: {
                ranges: [{ from: -10, to: -0, color: '#FF5253' },
                { from: 10, to: 0, color: '#00D3C0' }],
                backgroundBarColors: ['#FFFFFF'],
                backgroundBarOpacity: 0.02,
            },

            columnWidth: '40%',
        }
    },
    yaxis: {
        title: { text: '', },
        labels: {
            style: {
                colors: '#FFFFFF'
            },
            rotate: -90,
        }
    },
    xaxis: {
        type: 'category',
        tickPlacement: 'on',
        labels: {
            minHeight: 150,
            maxHeight: 150,
            rotate: -90,
            offsetY: 0,
            rotateAlways: true,
            style: { colors: '#FFFFFF' }
        },

    }
};

chart_ps2 = new ApexCharts(document.querySelector("#prosetup_2_barchart"), options6);
chart_ps2.render();

const getChartData_ps2 = (ts, currentTimestamp) => {
    var dataSet = [];

    $.ajax({
        url: root_1 + route_1 + '/10 minute MOMENTUM SPIKE',
        type: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            // console.log("From Chart 2: "+localStorage.getItem('token').split('"').join(''))

            var i = 0;
            $.each(response.data, function (key, value) {
                if (i >= 20) { return false }
                dataSet[i] = { x: value.Symbol, y: value.param_0 };

                i++;
                //dataSet.push([value.Symbol,Math.floor(value.param_0)]);
            });

            chart_ps2.updateSeries([{
                name: '% chg',
                data: dataSet

            }])
            //  console.log(response);

        }
    }
    );

}


// -----------------Datatable------------------

$.fn.dataTable.ext.errMode = 'none';

var dataTable;
var dataTable_2;
var dataTable_3;
var dataTable_4;
var dataTable_5;
var dataTable_6;
var dataTable_7;
var dataTable_8;
var dataTable_9;

dataTable = $('#prosetup_1_downsidelomintra').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI BULL DIV 15 MIN?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire1")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },
});

dataTable_2 = $('#prosetup_2_upsidelomintra').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI BEAR DIV 15 MIN?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire2")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_3 = $('#prosetup_3_downsidelomswing').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI BULL DIV 1 HR?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire3")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_4 = $('#prosetup_4_upsidelomswing').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI BEAR DIV 1 HR?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire4")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_5 = $('#prosetup_5_multiresistancebo').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/2 DAY HIGH BREAK LIVE?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire5")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_6 = $('#prosetup_6_multisupportbo').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/2 DAY LOW BREAK LIVE?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire6")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_7 = $('#prosetup_7_multiresistancebo_eod').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI 2 day high EOD?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire7")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_8 = $('#prosetup_8_multisupportbo_eod').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI 2 day low EOD?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire8")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

dataTable_9 = $('#prosetup_9_dailycontraction').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_2 + '/TCI NR7 INSIDER EOD?count=5',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[4, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire9")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

// Last Working day Need to enter in pre martek URL

pm = $('#prosetup_10_premarket').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_3 + '/latest/NIFTY',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    columns: [
        {
            data: 'Symbol'
        },
        {
            data: 'param_0'
        },
        {
            data: 'param_1'
        },
        {
            data: 'param_2'
        },
        {
            data: 'param_3'
        },

    ],
    "order": [[3, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("call fire10")
        let a = $('td:eq(1)', row).html()
        if (dtime_clock() == false) { $('td:eq(1)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(1)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(1)', row).css({ "color": "#f5bcb8" });
            $('td:eq(1)', row).css({ "background-color": "#8f290a" });
        }
        //Dhan Api Code
        $('td:eq(0)', row).css('cursor', 'pointer');
        $('td:eq(0)', row).off('click').on('click', function () {
            var symbol = $(this).html();
            // do something with symbol value
            console.log(symbol)
            tw_charts(symbol)
        });
    },

});

const pre_mkt_change = (type) => {
    const url = type === "Nifty" ? root_1 + route_3 + '/latest/NIFTY' : root_1 + route_3 + '/latest/FO';
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            pm.ajax.url(url).load();
        }
    });
};

$(document).ready(function () {
    console.log = function () { };
    check_message();
    livequotei();

    try { document.querySelector("#updates_btn").addEventListener("click", function () { chat_update_manual(); }); } catch (e) { }
});
