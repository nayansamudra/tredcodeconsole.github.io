// root_1 = 'https://ebs.tredcode.com'
route_1 = "/study-data"         // PIE DONUT
route_2 = "/adv-dec"            // SEMI CIRCLE
route_3 = "/study-symbol"       // DATA TABLE

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

    getpieDount(ts, currentTimestamp)
    getpieDount1(ts, currentTimestamp)
    getpieDount3(ts, currentTimestamp)
    getpieDount4(ts, currentTimestamp)

    getChartData(ts, currentTimestamp)

    var ajaxParams = tendayhighbo.ajax.params();
    ajaxParams.ts = timestamp;
    ajaxParams._ = Date.now();
    tendayhighbo.ajax.reload();

    var ajaxParams_2 = tendaylowbo.ajax.params();
    ajaxParams_2.ts = timestamp;
    ajaxParams_2._ = Date.now();
    tendaylowbo.ajax.reload();

    var ajaxParams_3 = fiftydayhighbo.ajax.params();
    ajaxParams_3.ts = timestamp;
    ajaxParams_3._ = Date.now();
    fiftydayhighbo.ajax.reload();

    var ajaxParams_4 = fiftydaylowbo.ajax.params();
    ajaxParams_4.ts = timestamp;
    ajaxParams_4._ = Date.now();
    fiftydaylowbo.ajax.reload();
}

const calculateTimestamp = () => {
    var selectedDateTime = $('#select_date_time').val();
    var timestamp = Math.floor(new Date(selectedDateTime).getTime() / 1000);
    return timestamp;
}

// -----------------DONUT AND RADIAL CHART------------------

var options1 = {
    chart: { type: 'donut', height: '400' },
    series: [90, 40],
    labels: ['Advanced', 'Decline'],
    backgroundColor: 'transparent',
    pieHole: 0.5,
    colors: ['#00d3c0', '#ff5253'],
    pieSliceTextStyle: { color: '#ffffff' },
    sliceVisibilityThreshold: 0,
    fontSize: 17,
    chartArea: { top: 40, },
    pieSliceTextStyle: { fontSize: 12 },
    pieStartAngle: 50,
    isStacked: true,
    enableInteractivity: false,
    pieSliceBorderColor: 'transparent',
    legend: {
        position: 'bottom', alignment: 'end',
        labels: { colors: '#ffffff', useSeriesColors: false },
        itemMargin: { horizontal: 10, vertical: 20 },
        fontSize: 15,
        markers: { width: 12, height: 12, radius: 12, },
    },
    stroke: { colors: 'trasparant', width: 0, },
    plotOptions: {
        pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 50,
            customScale: 1.1,
            dataLabels: {
                offset: 0,
                minAngleToShowLabel: 50,
            },

            grid: { borderColor: "#000000" },

            donut: {
                size: '55%',
                labels: {
                    colors: '#ffffff', show: true,
                    name: { color: '#ffffff', fontSize: 14, },
                    value: { color: '#ffffff', fontSize: 14, },
                    //total: {color: '#ffffff',},
                },

            },

        }
    }
}

const randomize = (dataSet) => {
    i = 0;
    return chart1.w.globals.series.map(function () {

        return dataSet[i++];
    })
}
chart1 = new ApexCharts(document.querySelector("#donutchart"), options1);
chart1.render();

const getpieDount = (ts, currentTimestamp) => {
    dataSet = [];
    $.ajax({
        url: root_1 + route_1 + '/Nifty 50 ADVANCE DECLINE',
        method: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            var i = 0;
            var dataSet = [];

            $.each(response.data, function (key, value) {
                dataSet[0] = Math.floor(value.param_0);
                dataSet[1] = Math.floor(value.param_1);
            });

            chart1.updateSeries(randomize(dataSet));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

var options2 = {
    chart: {
        type: 'donut'
    },
    series: [30, 90],
    labels: ['Advanced', 'Decline'],
    backgroundColor: 'transparent',
    pieHole: 0.5,
    colors: ['#00d3c0', '#ff5253'],
    pieSliceTextStyle: { color: '#ffffff' },
    sliceVisibilityThreshold: 0,
    fontSize: 17,
    chartArea: { top: 50, },
    pieSliceTextStyle: { fontSize: 12 },
    pieStartAngle: -50,
    isStacked: true,
    enableInteractivity: true,
    pieSliceBorderColor: "transparent",
    legend: {
        position: 'bottom', alignment: 'end',
        labels: {
            colors: '#ffffff',
            useSeriesColors: false
        },
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,

                }
            }

        }
    }
}

const randomize1 = (dataSet) => {
    i = 0;
    return chart2.w.globals.series.map(function () {

        return dataSet[i++];
    })
}
var chart2 = new ApexCharts(document.querySelector("#donutchart1"), options1);
chart2.render();

const getpieDount1 = (ts, currentTimestamp) => {
    dataSet = [];

    $.ajax({
        url: root_1 + route_1 + '/FO ADVANCE DECLINE',
        method: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            var i = 0;

            $.each(response.data, function (key, value) {
                dataSet[0] = Math.floor(value.param_0);
                dataSet[1] = Math.floor(value.param_1);

            });
            chart2.updateSeries(randomize1(dataSet))
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });

    ///
}

// semichart.js

var options3 = {
    series: [76],
    chart: {
        type: 'radialBar', offsetY: -20, height: 240,
        sparkline: { enabled: true }
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: '#343260',
                strokeWidth: '90%',
                margin: 5, // margin is in pixels
                dropShadow: {
                    enabled: false,
                    top: 2,
                    left: 0,
                    color: '#fff',
                    opacity: 1,
                    blur: 2
                }
            },
            dataLabels: {
                name: { show: false },
                value: { offsetY: -2, fontSize: '18px', color: '#fff', }
            },
            hollow: {
                margin: 15,
                size: "65%"
            },

        }
    },
    grid: {
        padding: {
            top: 10
        }
    },
    fill: {
        background: '#6c63ff',
    },
    labels: ['Average Results'],
};
nvtupgroupcurrentvalue = '0';
const randomize3 = (dataSet) => {

    i = 0;
    return chart3.w.globals.series.map(function () {

        return dataSet[i++]; //Math.floor(Math.random() * (100 - 1 + 1)) + 1
    })
}
chart3 = new ApexCharts(document.querySelector("#nftadgrouthp"), options3);
chart3.render();

const getpieDount3 = (ts, currentTimestamp) => {
    dataSet = [];

    $.ajax({
        url: root_1 + route_2 + '/NIFTY',
        method: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            var i = 0;

            if (response.data[0]['param_0'] > 0) {
                $('#nftadgrouthp').html('<div id="progress-bar" class="progress-bar"><div class="left"></div><div class="right"><div class="back"></div></div><div class="barOverflow"><div class="bar"></div></div> <span id="nadgrouthbar">' + response.data[0]['param_0'] + '</span>% <br> Advance Growth</div>');
                $('#nftadgrouthspan').html('<span></span> Advance % Growth from Yest. Close');
                datanftadgrout = true;
                dataSet[0] = response.data[0]['param_0'];

            }
            else if (response.data[0]['param_1'] > 0) {

                dataSet[0] = response.data[0]['param_1'];

                $('#nftadgrouthp').html('<div id="progress-bar" class="progress-bar"><div class="left"></div><div class="right"><div class="back"></div></div><div class="barOverflow"><div class="bar"></div></div> <span id="nadgrouthbar">' + response.data[0]['param_1'] + '</span>% <br> Decline Growth</div>');
                $('#nftadgrouthspan').html('<span></span> Decline % Growth from Yest. Close');
                datanftadgrout = true;
            }
            chart3.updateSeries(randomize3(dataSet))
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

var options4 = {
    series: [76],
    chart: {
        type: 'radialBar', offsetY: -20, height: 240,
        sparkline: { enabled: true }
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: '#343260',
                strokeWidth: '90%',
                margin: 5, // margin is in pixels
                dropShadow: {
                    enabled: false,
                    top: 2,
                    left: 0,
                    color: '#fff',
                    opacity: 1,
                    blur: 2
                }
            },
            dataLabels: {
                name: { show: false },
                value: { offsetY: -2, fontSize: '18px', color: '#fff', }
            },
            hollow: {
                margin: 15,
                size: "65%"
            },

        }
    },
    grid: {
        padding: {
            top: 10
        }
    },
    fill: {
        background: '#6c63ff',
    },
    labels: ['Average Results'],
};
foupgroupcurrentvalue = '0';
const randomize4 = (dataSet) => {
    // console.log(dataSet);

    i = 0;
    return chart4.w.globals.series.map(function () {

        return dataSet[i++]; //Math.floor(Math.random() * (100 - 1 + 1)) + 1
    })
}
chart4 = new ApexCharts(document.querySelector("#fotadgrouthp"), options4);
chart4.render();

const getpieDount4 = (ts, currentTimestamp) => {
    dataSet = [];

    $.ajax({
        url: root_1 + route_2 + '/FO',
        method: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {

            var i = 0;
            datafoupgroup = true;
            if (response.data[0]['param_0'] > 0) {
                $('#fotadgrouthp').html('<div id="progress-bar1" class="progress-bar"><div class="left"></div><div class="right"><div class="back"></div></div><div class="barOverflow"><div class="bar"></div></div> <span id="nadgrouthbar">' + response.data[0]['param_0'] + '</span>% <br> Advance Growth</div>');
                datafoupgroup = true;
                foupgroupcurrentvalue = response.data[0]['param_0'];
                $('#fotadgrouthspan').html('<span></span> Advance % Growth from Yest. Close');
                dataSet[0] = response.data[0]['param_0'];

            }
            else if (response.data[0]['param_1'] > 0) {

                dataSet[0] = response.data[0]['param_1'];
                foupgroupcurrentvalue = response.data[0]['param_1'];
                $('#fotadgrouthp').html('<div id="progress-bar1" class="progress-bar"><div class="left"></div><div class="right"><div class="back"></div></div><div class="barOverflow"><div class="bar"></div></div> <span id="nadgrouthbar">' + response.data[0]['param_1'] + '</span>% <br> Decline Growth</div>');
                $('#fotadgrouthspan').html('<span></span> Decline % Growth from Yest. Close');
                datafoupgroup = true;
            }

            chart4.updateSeries(randomize4(dataSet))
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

// -------------------------- Datatable ------------------------

$.fn.dataTable.ext.errMode = 'none';

tendayhighbo = $('#tendayhighbo').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_3 + '/10 DAY HIGH BO?count=5',
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
        {
            data: 'param_4',
            render: function (data, type) {
                return data.split(" ")[0]
            }
        },
    ],
    "order": [[5, "desc"]],
    "rowCallback": function (row, data) {
        // console.log("callb fire1")
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

tendaylowbo = $('#tendaylowbo').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_3 + '/10 DAY LOW BO?count=5',
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
        {
            data: 'param_4',
            render: function (data, type) {
                return data.split(" ")[0]
            }
        },
    ],
    "order": [[5, "desc"]],
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

fiftydayhighbo = $('#fiftydayhighbo').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_3 + '/50 DAY HIGH BO?count=5',
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
        {
            data: 'param_4',
            render: function (data, type) {
                return data.split(" ")[0]
            }
        },
    ],
    "order": [[5, "desc"]],
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

fiftydaylowbo = $('#fiftydaylowbo').DataTable({
    "lengthMenu": [[-1], ["All"]],
    "lengthChange": false,
    "bPaginate": false,
    "scrollX": true,
    "bInfo": false,
    "language": {
        searchPlaceholder: "Search Stock"
    },
    "ajax": {
        "url": root_1 + route_3 + '/50 DAY LOW BO?count=5',
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
        {
            data: 'param_4',
            render: function (data, type) {
                return data.split(" ")[0]
            }
        },
    ],
    "order": [[5, "desc"]],
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



// barchart.js

var options5 = {
    bar: { groupWidth: 30, },
    series: [],
    chart: { height: 600, width: '100%', type: 'bar', },
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
chart5 = new ApexCharts(document.querySelector("#barchart"), options5);
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        chart5.render();
        getChartData();
    }, 700);

});


function getChartData(ts, currentTimestamp) {
    $.ajax({
        url: root_1 + route_1 + '/MAJOR INDEX WEEKLY PERFORMANCE',
        method: 'GET',
        dataType: 'json',
        data: {
            cast: 'hist',
            ts: ts,
            _: currentTimestamp
        },
        success: function (response) {
            var i = 0;
            $.each(response.data, function (key, value) {
                dataSet[i] = { x: value.Symbol, y: value.param_0 };

                i++;
                //dataSet.push([value.Symbol,Math.floor(value.param_0)]);
            });
            chart5.updateSeries([{
                name: '% chg',
                data: dataSet

            }])
            //  console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });


}

$(document).ready(function () {
    console.log = function () { };
    check_message();
    livequotei();
    try { document.querySelector("#updates_btn").addEventListener("click", function () { chat_update_manual(); }); } catch (e) { }
});