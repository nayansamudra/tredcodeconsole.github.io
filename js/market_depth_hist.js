// root_1 = 'https://ebs.tredcode.com'
route = '/study-data'

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

    getChartData2_backend(ts, currentTimestamp)
    getChartData3_backend(ts, currentTimestamp)

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
}

const calculateTimestamp = () => {
    var selectedDateTime = $('#select_date_time').val();
    var timestamp = Math.floor(new Date(selectedDateTime).getTime() / 1000);
    return timestamp;
}

// -----------------HIGH POWER STOCKS------------------

options6 = {
    bar: { groupWidth: 30, },
    series: [],
    chart: {
        height: 600,
        width: '100%',
        type: 'bar',
        events: {
            click: (event, chartContext, dataPointIndex) => {

                const toolbarElements = document.querySelectorAll("#barchart_depth_1 .apexcharts-toolbar");
                if (toolbarElements.length > 0 && toolbarElements[0].contains(event.target)) {
                    // If the clicked element is part of the toolbar, return without doing anything
                    return;
                }

                let temp = dataPointIndex['dataPointIndex']
                let Bar_name = dataPointIndex['globals']['categoryLabels'][temp];
                // Bar_name = Bar_name.replace("-", "_")
                // Bar_name = Bar_name.replace("&", "_")
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

    },
};

chart6 = new ApexCharts(document.querySelector("#barchart_depth_1"), options6);
chart6.render();

options7 = {
    bar: { groupWidth: 30, },
    series: [],
    chart: {
        height: 600,
        width: '100%',
        type: 'bar',
        events: {
            click: (event, chartContext, dataPointIndex) => {

                const toolbarElements = document.querySelectorAll("#barchart_depth_2 .apexcharts-toolbar");
                if (toolbarElements.length > 0 && toolbarElements[0].contains(event.target)) {
                    // If the clicked element is part of the toolbar, return without doing anything
                    return;
                }

                let temp = dataPointIndex['dataPointIndex']
                let Bar_name = dataPointIndex['globals']['categoryLabels'][temp];
                // Bar_name = Bar_name.replace("-", "_")
                // Bar_name = Bar_name.replace("&", "_")
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
    },
};

chart7 = new ApexCharts(document.querySelector("#barchart_depth_2"), options7);
chart7.render();

const getChartData2_backend = (ts, currentTimestamp) => {
    dataSet = [];
    $.ajax({
        url: root_1 + route + '/MONEYFLOW ABS B',
        type: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            // console.log("Hi i am from chart 1: " + localStorage.getItem('token') )
            var i = 0;
            $.each(response.data, function (key, value) {
                if (i >= 20) { return false }
                dataSet[i] = { x: value.Symbol, y: value.param_0 };
                i++;
            });

            chart6.updateSeries([{
                name: '% chg',
                data: dataSet
            }]);
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    });
}

const getChartData3_backend = (ts, currentTimestamp) => {
    dataSet = [];
    $.ajax({
        url: root_1 + route + '/MONEYFLOW REL B',
        type: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            // console.log("Hi i am from chart 2: " + localStorage.getItem('token') )

            var i = 0;
            $.each(response.data, function (key, value) {
                if (i >= 20) { return false }
                dataSet[i] = { x: value.Symbol, y: value.param_0 };
                i++;
                //dataSet.push([value.Symbol,Math.floor(value.param_0)]);
            });

            chart7.updateSeries([{
                name: '% chg',
                data: dataSet

            }])
            //  console.log(response);
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    });
}

// -------------------------- Datatable ------------------------

$.fn.dataTable.ext.errMode = 'none';

var dataTable;
var dataTable_2;
var dataTable_3;
var dataTable_4;
var dataTable_5;
var dataTable_6;

dataTable = $('#depth_1_highpowstocks').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": { searchPlaceholder: "Search Stock" },
    "ajax": {
        "url": root_1 + route + '/MONEYFLOW ABS',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },

    "columns": [
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
        let a = $('td:eq(3)', row).html()
        if (dtime_clock() == false) { $('td:eq(3)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(3)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(3)', row).css({ "color": "#f5bcb8" });
            $('td:eq(3)', row).css({ "background-color": "#8f290a" });
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

dataTable_2 = $('#depth_2_intradayboost').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/MONEYFLOW REL',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    "columns": [
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
        let a = $('td:eq(3)', row).html()
        if (dtime_clock() == false) { $('td:eq(3)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(3)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(3)', row).css({ "color": "#f5bcb8" });
            $('td:eq(3)', row).css({ "background-color": "#8f290a" });
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

dataTable_3 = $('#depth_3_toplevelstocks').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NEAR DAYS HIGH',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    "columns": [
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
    "order": [[4, "asc"]],
    "rowCallback": function (row, data) {
        let a = $('td:eq(3)', row).html()
        if (dtime_clock() == false) { $('td:eq(3)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(3)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(3)', row).css({ "color": "#f5bcb8" });
            $('td:eq(3)', row).css({ "background-color": "#8f290a" });
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

dataTable_4 = $('#depth_4_lowlevelstocks').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NEAR DAYS LOW',
        "type": "GET",
        "dataType": 'json',
        "data": function (d) {
            d.cast = "hist";
            d.ts = calculateTimestamp();
            d._ = Date.now();
        }
    },
    "columns": [
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
    "order": [[4, "asc"]],
    "rowCallback": function (row, data) {
        // console.log("4: "+localStorage.getItem('token'))
        let a = $('td:eq(3)', row).html()
        if (dtime_clock() == false) { $('td:eq(3)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(3)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(3)', row).css({ "color": "#f5bcb8" });
            $('td:eq(3)', row).css({ "background-color": "#8f290a" });
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

dataTable_5 = $('#depth_5_topgainer').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/GAINER',
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
        // console.log("5: "+localStorage.getItem('token'))
        let a = $('td:eq(3)', row).html()
        if (dtime_clock() == false) { $('td:eq(3)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(3)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(3)', row).css({ "color": "#f5bcb8" });
            $('td:eq(3)', row).css({ "background-color": "#8f290a" });
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

dataTable_6 = $('#depth_6_toploser').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/LOSSER',
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
    "order": [[3, "asc"]],
    "rowCallback": function (row, data) {
        // console.log("6: "+localStorage.getItem('token'))
        let a = $('td:eq(3)', row).html()
        if (dtime_clock() == false) { $('td:eq(3)', row).css({ "animation-name": "none" }); }
        if (a < 0) {
            if (dtime_clock() == true) { $('td:eq(3)', row).css({ "animation-name": "pink-light-bg" }); }
            $('td:eq(3)', row).css({ "color": "#f5bcb8" });
            $('td:eq(3)', row).css({ "background-color": "#8f290a" });
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



$(document).ready(function () {

    console.log = function () { };


    check_message();
    livequotei();

    try { document.querySelector("#updates_btn").addEventListener("click", function () { chat_update_manual(); }); } catch (e) { }
})