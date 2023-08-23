// root_1 = 'https://ebs.tredcode.com'
route = "/study-data"

const update_time = () => {
    $.getJSON(root_1 + '/current?type=servertime', function (response) {
        response = response.split(":");
        $('.dtime').html(response[0] + ':' + (response[1]));
    });

}

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
                var element = document.getElementById(temp_id);
                setTimeout(function () {
                    element.scrollIntoView(true);
                }, 500);

                setTimeout(function () {
                    $('html,body').animate({
                        scrollTop: $(window).scrollTop() - scroll_offset
                    });
                }, 1500);

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

const getChartData_sec1 = () => {
    dataSet = [];
    $.ajax({
        url: root_1 + route + '/SECTORIAL VIEW',
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

            chart_sec1.updateSeries([{
                name: '% chg',
                data: dataSet

            }])
            //  console.log(response);
        }
    });

}

$.fn.dataTable.ext.errMode = 'none';

$('#sectorial_1_nifty50').DataTable({
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
$("#sectorial_1_nifty50_ip").keyup(function () {
    $('#sectorial_1_nifty50').dataTable().fnFilter(this.value);
});

$('#sectorial_2_bnknifty').DataTable({
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
$("#sectorial_2_bnknifty_ip").keyup(function () {
    $('#sectorial_2_bnknifty').dataTable().fnFilter(this.value);
});

$('#sectorial_3_niftyauto').DataTable({
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
$("#sectorial_3_niftyauto_ip").keyup(function () {
    $('#sectorial_3_niftyauto').dataTable().fnFilter(this.value);
});

$('#sectorial_4_niftyfinserv').DataTable({
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
$("#sectorial_4_niftyfinserv_ip").keyup(function () {
    $('#sectorial_4_niftyfinserv').dataTable().fnFilter(this.value);
});

$('#sectorial_5_niftyfmcg').DataTable({
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
$("#sectorial_5_niftyfmcg_ip").keyup(function () {
    $('#sectorial_5_niftyfmcg').dataTable().fnFilter(this.value);
});

$('#sectorial_6_niftyit').DataTable({
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
$("#sectorial_6_niftyit_ip").keyup(function () {
    $('#sectorial_6_niftyit').dataTable().fnFilter(this.value);
});

$('#sectorial_7_niftymedia').DataTable({
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
$("#sectorial_7_niftymedia_ip").keyup(function () {
    $('#sectorial_7_niftymedia').dataTable().fnFilter(this.value);
});

$('#sectorial_8_niftymetal').DataTable({
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
$("#sectorial_8_niftymetal_ip").keyup(function () {
    $('#sectorial_8_niftymetal').dataTable().fnFilter(this.value);
});

$('#sectorial_9_niftypharma').DataTable({
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
$("#sectorial_9_niftypharma_ip").keyup(function () {
    $('#sectorial_9_niftypharma').dataTable().fnFilter(this.value);
});

$('#sectorial_10_niftypsubank').DataTable({
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
$("#sectorial_10_niftypsubank_ip").keyup(function () {
    $('#sectorial_10_niftypsubank').dataTable().fnFilter(this.value);
});

$('#sectorial_11_pvtbank').DataTable({
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
$("#sectorial_11_pvtbank_ip").keyup(function () {
    $('#sectorial_11_pvtbank').dataTable().fnFilter(this.value);
});

$('#sectorial_12_reality').DataTable({
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
$("#sectorial_12_reality_ip").keyup(function () {
    $('#sectorial_12_reality').dataTable().fnFilter(this.value);
});

$('#sectorial_13_energy').DataTable({
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
$("#sectorial_13_energy_ip").keyup(function () {
    $('#sectorial_13_energy').dataTable().fnFilter(this.value);
});


$(document).ready(function () {
    console.log = function () { };
    check_access();
    check_message();
    livequotei();
    update_time();
    getChartData_sec1();
    try { document.querySelector("#updates_btn").addEventListener("click", function () { chat_update_manual(); }); } catch (e) { }
});
setInterval(function () { check_message(); }, 25000);
setInterval(function () { if (dtime_clock() == false) { return } update_time(); }, 50000);
setInterval(function () { if (dtime_clock() == false) { return } livequotei(); }, 45000);
setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#sectorial_1_nifty50').DataTable().ajax.reload();
    $('#sectorial_2_bnknifty').DataTable().ajax.reload();
}, 47000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#sectorial_3_niftyauto').DataTable().ajax.reload();
    $('#sectorial_4_niftyfinserv').DataTable().ajax.reload();
}, 49000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#sectorial_5_niftyfmcg').DataTable().ajax.reload();
    $('#sectorial_6_niftyit').DataTable().ajax.reload();
}, 51000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#sectorial_7_niftymedia').DataTable().ajax.reload();
    $('#sectorial_8_niftymetal').DataTable().ajax.reload();
}, 53000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#sectorial_9_niftypharma').DataTable().ajax.reload();
    $('#sectorial_10_niftypsubank').DataTable().ajax.reload();
}, 55000);

setInterval(function () {
    if (dtime_clock() == false) { return }
    $('#sectorial_11_pvtbank').DataTable().ajax.reload();
    $('#sectorial_12_reality').DataTable().ajax.reload();
}, 57000);