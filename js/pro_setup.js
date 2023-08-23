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


options5 = {
    bar: { groupWidth: 30, },
    series: [],
    // chart: { height: 600, width: '100%', type: 'bar', },
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

const getChartData_ps1 = () => {
    var dataSet = [];

    $.ajax({
        url: root_1 + route_1 + '/5 minute MOMENTUM SPIKE',
        type: 'GET',
        dataType: 'json',
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
    // chart: { height: 600, width: '100%', type: 'bar', },
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

const getChartData_ps2 = () => {
    var dataSet = [];

    $.ajax({
        url: root_1 + route_1 + '/10 minute MOMENTUM SPIKE',
        type: 'GET',
        dataType: 'json',
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

// // Attach click event listener to chart 1
// document.querySelector("#prosetup_1_barchart").addEventListener("click", (event) => {
//     const toolbarElements = document.querySelectorAll(".apexcharts-toolbar");
//     if (toolbarElements.length > 0 && toolbarElements[0].contains(event.target)) {
//         // If the clicked element is part of the toolbar, return without doing anything
//         return;
//     }

//     // Proceed with the original onclick logic for chart 1
//     let dataPointIndex = chart_ps1.w.globals.selectedDataPoints[0];
//     if (dataPointIndex !== undefined) {
//         let temp = dataPointIndex;
//         let Bar_name = chart_ps1.w.globals.categoryLabels[temp];
//         console.log("Chart 1 - " + Bar_name);
//         tw_charts(Bar_name);
//     }
// });

// // Attach click event listener to chart 2
// document.querySelector("#prosetup_2_barchart").addEventListener("click", (event) => {
//     const toolbarElements = document.querySelectorAll(".apexcharts-toolbar");
//     if (toolbarElements.length > 0 && toolbarElements[0].contains(event.target)) {
//         // If the clicked element is part of the toolbar, return without doing anything
//         return;
//     }

//     // Proceed with the original onclick logic for chart 2
//     let dataPointIndex = chart_ps2.w.globals.selectedDataPoints[0];
//     if (dataPointIndex !== undefined) {
//         let temp = dataPointIndex;
//         let Bar_name = chart_ps2.w.globals.categoryLabels[temp];
//         console.log("Chart 2 - " + Bar_name);
//         tw_charts(Bar_name);
//     }
// });


// ---------------------------------------------------- DATATABLE ----------------------------------------------//


$.fn.dataTable.ext.errMode = 'none';

$('#prosetup_1_downsidelomintra').DataTable({
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
$("#prosetup_1_downsidelomintra_ip").keyup(function () {
    $('#prosetup_1_downsidelomintra').dataTable().fnFilter(this.value);
});

$('#prosetup_2_upsidelomintra').DataTable({
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
$("#prosetup_2_upsidelomintra_ip").keyup(function () {
    $('#prosetup_2_upsidelomintra').dataTable().fnFilter(this.value);
});

$('#prosetup_3_downsidelomswing').DataTable({
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
$("#prosetup_3_downsidelomswing_ip").keyup(function () {
    $('#prosetup_3_downsidelomswing').dataTable().fnFilter(this.value);
});

$('#prosetup_4_upsidelomswing').DataTable({
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
$("#prosetup_4_upsidelomswing_ip").keyup(function () {
    $('#prosetup_4_upsidelomswing').dataTable().fnFilter(this.value);
});

$('#prosetup_5_multiresistancebo').DataTable({
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
$("#prosetup_5_multiresistancebo_ip").keyup(function () {
    $('#prosetup_5_multiresistancebo').dataTable().fnFilter(this.value);
});

$('#prosetup_6_multisupportbo').DataTable({
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
$("#prosetup_6_multisupportbo_ip").keyup(function () {
    $('#prosetup_6_multisupportbo').dataTable().fnFilter(this.value);
});

$('#prosetup_7_multiresistancebo_eod').DataTable({
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
$("#prosetup_7_multiresistancebo_eod_ip").keyup(function () {
    $('#prosetup_7_multiresistancebo_eod').dataTable().fnFilter(this.value);
});

$('#prosetup_8_multisupportbo_eod').DataTable({
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
$("#prosetup_8_multisupportbo_eod_ip").keyup(function () {
    $('#prosetup_8_multisupportbo_eod').dataTable().fnFilter(this.value);
});

$('#prosetup_9_dailycontraction').DataTable({
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
$("#prosetup_9_dailycontraction_ip").keyup(function () {
    $('#prosetup_9_dailycontraction').dataTable().fnFilter(this.value);
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
$("#prosetup_10_premarket_ip").keyup(function () {
    $('#prosetup_10_premarket').dataTable().fnFilter(this.value);
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

    check_access();

    check_message();
    livequotei();
    update_time();
    getChartData_ps1();
    getChartData_ps2();
    try { document.querySelector("#updates_btn").addEventListener("click", function () { chat_update_manual(); }); } catch (e) { }
});
setInterval(function () { check_message(); }, 25000);
setInterval(function () { if (dtime_clock() == false) { return } update_time(); }, 50000);
setInterval(function () { if (dtime_clock() == false) { return } livequotei(); }, 45000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#prosetup_1_downsidelomintra').DataTable().ajax.reload();
    $('#prosetup_2_upsidelomintra').DataTable().ajax.reload();
}, 47000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#prosetup_3_downsidelomswing').DataTable().ajax.reload();
    $('#prosetup_4_upsidelomswing').DataTable().ajax.reload();
}, 49000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#prosetup_5_multiresistancebo').DataTable().ajax.reload();
    $('#prosetup_6_multisupportbo').DataTable().ajax.reload();
}, 51000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#prosetup_7_multiresistancebo_eod').DataTable().ajax.reload();
    $('#prosetup_8_multisupportbo_eod').DataTable().ajax.reload();
}, 53000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#prosetup_9_dailycontraction').DataTable().ajax.reload();
    $('#prosetup_10_premarket').DataTable().ajax.reload();
}, 55000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    getChartData_ps1();
    getChartData_ps2();
}, 57000);