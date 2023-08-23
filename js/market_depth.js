// root_1 = 'https://ebs.tredcode.com'
route = '/study-data'

const update_time = () => {
    $.getJSON(root_1 + '/current?type=servertime', function (response) {
        response = response.split(":");
        $('.dtime').html(response[0] + ':' + (response[1]));
    });

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
                    console.log('u clicked on toolbar')
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

// Chart 1
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
                    console.log('u clicked on toolbar')
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

// Chart 2
chart7 = new ApexCharts(document.querySelector("#barchart_depth_2"), options7);
chart7.render();

const getChartData2 = () => {
    dataSet = [];
    $.ajax({
        url: root_1 + route + '/MONEYFLOW ABS B',
        // url: 'http://localhost/new_tredcode_testing/extra/market_depth.txt',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
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

const getChartData3 = () => {
    dataSet = [];
    $.ajax({
        url: root_1 + route + '/MONEYFLOW REL B',
        // url: 'http://localhost/new_tredcode_testing/extra/market_depth.txt',
        type: 'GET',
        dataType: 'json',
        success: function (response) {

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

$('#depth_1_highpowstocks').DataTable({
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
$("#depth_1_highpowstocks_ip").keyup(function () {
    $('#depth_1_highpowstocks').dataTable().fnFilter(this.value);
});


$('#depth_2_intradayboost').DataTable({
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
$("#depth_2_intradayboost_ip").keyup(function () {
    $('#depth_2_intradayboost').dataTable().fnFilter(this.value);
});


$('#depth_3_toplevelstocks').DataTable({
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
$("#depth_3_toplevelstocks_ip").keyup(function () {
    $('#depth_3_toplevelstocks').dataTable().fnFilter(this.value);
});


$('#depth_4_lowlevelstocks').DataTable({
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
$("#depth_4_lowlevelstocks_ip").keyup(function () {
    $('#depth_4_lowlevelstocks').dataTable().fnFilter(this.value);
});


$('#depth_5_topgainer').DataTable({
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
$("#depth_5_topgainer_ip").keyup(function () {
    $('#depth_5_topgainer').dataTable().fnFilter(this.value);
});


$('#depth_6_toploser').DataTable({
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
$("#depth_6_toploser_ip").keyup(function () {
    $('#depth_6_toploser').dataTable().fnFilter(this.value);
});


$(document).ready(function () {

    console.log = function () { };

    check_access();

    check_message();
    livequotei();
    update_time();
    getChartData2();
    getChartData3();

    try { document.querySelector("#updates_btn").addEventListener("click", function () { chat_update_manual(); }); } catch (e) { }
})



// ------------------ Update Code ------------------- 

setInterval(function () { check_message(); }, 25000);
setInterval(function () { if (dtime_clock() == false) { return } update_time(); }, 40000);
setInterval(function () { if (dtime_clock() == false) { return } livequotei(); }, 44000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#depth_1_highpowstocks').DataTable().ajax.reload();
    $('#depth_2_intradayboost').DataTable().ajax.reload();
}, 47000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#depth_3_toplevelstocks').DataTable().ajax.reload();
    $('#depth_4_lowlevelstocks').DataTable().ajax.reload();
}, 50000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#depth_5_topgainer').DataTable().ajax.reload();
    $('#depth_6_toploser').DataTable().ajax.reload();
}, 53000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    getChartData2();
    getChartData3();
}, 55000);