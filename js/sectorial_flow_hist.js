// root_1 = 'https://ebs.tredcode.com'
route = "/study-data"

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

    getChartData_sec1(ts, currentTimestamp)

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

    var ajaxParams_10 = dataTable_10.ajax.params();
    ajaxParams_10.ts = timestamp;
    ajaxParams_10._ = Date.now();
    dataTable_10.ajax.reload();

    var ajaxParams_11 = dataTable_11.ajax.params();
    ajaxParams_11.ts = timestamp;
    ajaxParams_11._ = Date.now();
    dataTable_11.ajax.reload();  

    var ajaxParams_12 = dataTable_12.ajax.params();
    ajaxParams_12.ts = timestamp;
    ajaxParams_12._ = Date.now();
    dataTable_12.ajax.reload();

    var ajaxParams_13 = dataTable_13.ajax.params();
    ajaxParams_13.ts = timestamp;
    ajaxParams_13._ = Date.now();
    dataTable_13.ajax.reload();  

}

const calculateTimestamp = () => {
    var selectedDateTime = $('#select_date_time').val();
    var timestamp = Math.floor(new Date(selectedDateTime).getTime() / 1000);
    return timestamp;
}


// -----------------Sectorial View------------------


const sectorial_1_barchart_dict = {
    "NIFTY": 1,
    "BANKNIFTY": 1,
    "NIFTYAUTO": 2,
    "NIFTYFINSERVICE": 2,
    "NIFTYFMCG": 3,
    "CNXIT": 3,
    "NIFTYMEDIA": 4,
    "NIFTYMETAL": 4,
    "CNXPHARMA": 5,
    "NIFTYPSUBANK": 5,
    "NIFTYPVTBANK": 6,
    "CNXREALTY": 6,
    "CNXENERGY": 7,
}

const sectorial_1_barchart_dict_mob = {
    "NIFTY": 1,
    "BANKNIFTY": 11,
    "NIFTYAUTO": 2,
    "NIFTYFINSERVICE": 22,
    "NIFTYFMCG": 3,
    "CNXIT": 33,
    "NIFTYMEDIA": 4,
    "NIFTYMETAL": 44,
    "CNXPHARMA": 5,
    "NIFTYPSUBANK": 55,
    "NIFTYPVTBANK": 6,
    "CNXREALTY": 66,
    "CNXENERGY": 7,
}

options5 = {
    bar: { groupWidth: 30, },
    series: [],
    chart: {
        height: 650,
        width: '100%',
        type: 'bar',
        events: {
            dataPointSelection(event, chartContext, config) {
                var selection = chartContext.data.twoDSeriesX[config.dataPointIndex]
                console.log(chartContext.data.twoDSeriesX[config.dataPointIndex])
                console.log(sectorial_1_barchart_dict[selection])
                // diffrent for mob and dsk
                var scroll_offset = 100
                if (window.innerWidth > 575) { var temp_id = "table_row_" + sectorial_1_barchart_dict[selection] }
                else {
                    var temp_id = "table_row_" + sectorial_1_barchart_dict[selection]
                    var tab_index = String(sectorial_1_barchart_dict_mob[selection])
                    if (tab_index.length > 1) { console.log("double hit "); scroll_offset = -800 }
                    else { console.log("no hit " + tab_index + " len:" + tab_index.length) }
                }
                // document.getElementById(temp_id).scrollIntoView(true);
                // window.scrollBy(0, -50);
                var element = document.getElementById(temp_id);
                element.scrollIntoView(true);

                $('html,body').animate({
                    scrollTop: $(window).scrollTop() - scroll_offset
                });

            },
        },
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

var chart_sec1 = new ApexCharts(document.querySelector("#sectorial_1_barchart"), options5);
chart_sec1.render();

const getChartData_sec1 = (ts, currentTimestamp) => {
    dataSet = [];
    $.ajax({
        url: root_1 + route + '/SECTORIAL VIEW',
        type: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            var i = 0;
            $.each(response.data, function (key, value) {
                if (i >= 20) { return false }
                dataSet[i] = { x: value.Symbol, y: value.param_0 };

                i++;
                //dataSet.push([value.Symbol,Math.floor(value.param_0)]);
            });

            chart_sec1.updateSeries([{
                name: '% chg',
                data: dataSet

            }])
            //  console.log(response);
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
var dataTable_7;
var dataTable_8;
var dataTable_9;
var dataTable_10;
var dataTable_11;
var dataTable_12;
var dataTable_13;

dataTable = $('#sectorial_1_nifty50').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY 50',
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

dataTable_2 = $('#sectorial_2_bnknifty').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "autowidth": true,
    "language": {
        searchPlaceholder: "Search Stock"
    },

    "ajax": {
        "url": root_1 + route + '/NIFTY BANK',
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
        // console.log("callb fire2")
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

dataTable_3 = $('#sectorial_3_niftyauto').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY AUTO',
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
        // console.log("callb fire3")
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

dataTable_4 = $('#sectorial_4_niftyfinserv').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY FIN SERV',
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
        // console.log("callb fire4")
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

dataTable_5 = $('#sectorial_5_niftyfmcg').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY FMCG',
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
        // console.log("callb fire5")
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

dataTable_6 = $('#sectorial_6_niftyit').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY IT',
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
        // console.log("callb fire6")
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

dataTable_7 = $('#sectorial_7_niftymedia').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY MEDIA',
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
        // console.log("callb fire7")
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

dataTable_8 = $('#sectorial_8_niftymetal').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY METAL',
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
        // console.log("callb fire8")
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

dataTable_9 = $('#sectorial_9_niftypharma').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY PHARMA',
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
        // console.log("callb fire9")
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

dataTable_10 = $('#sectorial_10_niftypsubank').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY PSU BANK',
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
        // console.log("callb fire10")
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

dataTable_11 = $('#sectorial_11_pvtbank').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY PVT BANK',
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
        // console.log("callb fire11")
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

dataTable_12 = $('#sectorial_12_reality').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY REALITY',
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
        // console.log("callb fire12")
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

dataTable_13 = $('#sectorial_13_energy').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route + '/NIFTY ENERGY',
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
        // console.log("callb fire12")
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
});
