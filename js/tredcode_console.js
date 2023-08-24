root = "https://testing.tcistudents.in"
route = "/api/journal"

//-------------Add Trades------------------------
const add_trade = () => {
    let trade_type = ($('#checkbox').is(':checked')) ? 'Short' : 'Long';
    let entry_ts = Math.floor(new Date($('#Entry_date_time').val()).getTime() / 1000);
    let exit_ts = Math.floor(new Date($('#Exit_date_time').val()).getTime() / 1000);
    let symbol_Ticker = $('#Symbol_Ticker').val()
    let entry_price = $('#Entry_price').val()
    let exit_price = $('#Exit_price').val()
    let quantity = $('#Quantity').val()
    let find_Trade = $('#Find_Trade').val()
    let entry_reason = $('#Entry_reason').val()
    let exit_reason = $('#Exit_reason').val()
    let mistakes = $('#Mistakes').val()

    // input validation
    if (entry_ts == "" || exit_ts == "" || symbol_Ticker == '' || entry_price == '' || exit_price == '' || quantity == '') {
        alert("Please Enter all fields!");
        // $('#exampleModal3').modal('show');
        // $('#exampleModal3 .modal-body').text('Please Enter all fields');
        return;
    } else if (quantity == '0' || quantity == 0) {
        alert("Quantity cannot be zero");
        return;
    } else if (exit_ts < entry_ts) {
        alert("Exit Date should be greater than Entry Date");
        return;
    }

    data_dict = {
        'trade_type': trade_type,
        'entry_ts': entry_ts,
        'exit_ts': exit_ts,
        'symbol_Ticker': symbol_Ticker,
        'entry_price': entry_price,
        'exit_price': exit_price,
        'quantity': quantity,
        'find_Trade': find_Trade,
        'entry_reason': entry_reason,
        'exit_reason': exit_reason,
        'mistakes': mistakes
    };

    data = JSON.stringify(data_dict);

    $.post(
        root + route + "/curd_journal",
        { 'op': 'create', 'data': data },
        function (data, status) {
            if (data == "success") {
                alert("Trade added Successfully!");

                $("input[type='datetime-local']").val("");
                $("input[type='text']").val("");
                $("input[type='number']").val("");
                $("textarea").val("");

                view_trade()
            } else {
                alert("Unable to add Trade");
            }
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
}


//-------------Update Trades------------------------
const update_trade = (trade_id1, entry_ts1, exit_ts1, data1) => {

    console.log("trade_id", trade_id1)
    console.log("entry_ts1", entry_ts1)
    console.log("exit_ts1", exit_ts1)
    console.log("data1", data1)

    $('#add_trade').click()

    $('#update_trade_submit').removeClass().addClass('btn btn-outline-light')
    $('#add_trade_submit').removeClass().addClass('btn btn-outline-light d-none')

    $('#exampleModal1 .modal-title').text('Update Trade Inputs:')

    trade_id = trade_id1

    var timestamp = entry_ts1; // Your timestamp
    var date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    $('#Entry_date_time').val(formattedDateTime);

    var timestamp = exit_ts1; // Your timestamp
    var date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    $('#Exit_date_time').val(formattedDateTime);

    if (data1['trade_type'] == 'Long') {
        $('#checkbox').prop('checked', false);
        $('#exampleModal1 .modal-header').css('background-color', '#6bd368')
        $('#exampleModal1 .modal-footer').css('background-color', '#6bd368')
    } else if (data1['trade_type'] == 'Short') {
        $('#checkbox').prop('checked', true);
        $('#exampleModal1 .modal-header').css('background-color', '#fc5c5d')
        $('#exampleModal1 .modal-footer').css('background-color', '#fc5c5d')
    }

    $('#Symbol_Ticker').val(data1['symbol_Ticker'])
    $('#Entry_price').val(data1['entry_price'])
    $('#Exit_price').val(data1['exit_price'])
    $('#Quantity').val(data1['quantity'])
    $('#Find_Trade').val(data1['find_Trade'])
    $('#Entry_reason').val(data1['entry_reason'])
    $('#Exit_reason').val(data1['exit_reason'])
    $('#Mistakes').val(data1['mistakes'])
}

const update_trade_API = (trade_id) => {

    let trade_type = ($('#checkbox').is(':checked')) ? 'Short' : 'Long';
    let entry_ts = Math.floor(new Date($('#Entry_date_time').val()).getTime() / 1000);
    let exit_ts = Math.floor(new Date($('#Exit_date_time').val()).getTime() / 1000);
    let symbol_Ticker = $('#Symbol_Ticker').val()
    let entry_price = $('#Entry_price').val()
    let exit_price = $('#Exit_price').val()
    let quantity = $('#Quantity').val()
    let find_Trade = $('#Find_Trade').val()
    let entry_reason = $('#Entry_reason').val()
    let exit_reason = $('#Exit_reason').val()
    let mistakes = $('#Mistakes').val()

    // input validation
    if (entry_ts == "" || exit_ts == "" || symbol_Ticker == '' || entry_price == '' || exit_price == '' || quantity == '') {
        alert("Please Enter all fields!");
        return;
    } else if (quantity == '0' || quantity == 0) {
        alert("Quantity cannot be zero");
        return;
    } else if (exit_ts < entry_ts) {
        alert("Exit Date should be greater than Entry Date");
        return;
    }

    data_dict = {
        'trade_id': trade_id,
        'trade_type': trade_type,
        'entry_ts': entry_ts,
        'exit_ts': exit_ts,
        'symbol_Ticker': symbol_Ticker,
        'entry_price': entry_price,
        'exit_price': exit_price,
        'quantity': quantity,
        'find_Trade': find_Trade,
        'entry_reason': entry_reason,
        'exit_reason': exit_reason,
        'mistakes': mistakes
    };

    data = JSON.stringify(data_dict);

    $.post(
        root + route + "/curd_journal",
        { 'op': 'update', 'data': data },
        function (data, status) {
            if (data == "success") {
                alert("Trade updated Successfully!");

                $("input[type='datetime-local']").val("");
                $("input[type='text']").val("");
                $("input[type='number']").val("");
                $("textarea").val("");

                view_trade()
            } else {
                alert("Unable to update Trade");
            }

            $('#update_trade_submit').removeClass().addClass('btn btn-outline-light d-none')
            $('#add_trade_submit').removeClass().addClass('btn btn-outline-light')

            $('#exampleModal1 .modal-title').text('Add Trade Inputs:')

            $('#add_n_update_trade_close').click()
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
}

//-------------View Trades------------------------
const view_trade = () => {
    trade_type = ($('#checkbox1').is(':checked')) ? 'Select' : 'All';

    entry_ts = Math.floor(new Date($('#Entry_date').val()).getTime() / 1000);
    exit_ts = Math.floor(new Date($('#Exit_date').val()).getTime() / 1000);

    if (trade_type == 'All') {
        data_dict = {}
        exit_ts = Date.now() / 1000
    } else {
        if ($('#Entry_date').val() == "" || $('#Exit_date').val() == "") {
            alert("Please Enter all fields!");
            return;
        } else {
            data_dict = {
                'start_time': entry_ts,
                'end_time': exit_ts,
            };
        }
    }

    data = JSON.stringify(data_dict);

    $.post(
        root + route + "/curd_journal",
        { 'op': 'read', 'data': data },
        function (data, status) {
            view_trade_data = data
            if (status == "success") {
                $('#view_trade_close').click()
                if (view_trade_data.length != 0) {
                    print_view_data()
                    all_stats()
                    dataTable()
                    dataTable_monthly()
                    $('#chart_and_table').show()
                } else {
                    alert('No Data / Empty Array');
                }
            } else {
                alert("Error");
            }
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
}

const print_view_data = () => {
    print_data = []
    var temp = {}
    for (var i = 0; i < view_trade_data.length; i++) {
        parse_data = JSON.parse(view_trade_data[i][4])
        if (parse_data['trade_type'] == 'Long') {
            count = (parseFloat(parse_data['exit_price']) - parseFloat(parse_data['entry_price'])) * parseFloat(parse_data['quantity'])
        } else if (parse_data['trade_type'] == 'Short') {
            count = (parseFloat(parse_data['entry_price']) - parseFloat(parse_data['exit_price'])) * parseFloat(parse_data['quantity'])
        }
        temp['count'] = count
        // temp['count'] = Math.abs(count)
        temp['date'] = moment.unix(view_trade_data[i][3]).format('YYYY-MM-DD')
        print_data.push(temp)
        temp = {}
    }

    resultMap = {};
    print_data.forEach(entry => {
        if (resultMap.hasOwnProperty(entry.date)) {
            resultMap[entry.date].count += entry.count;
            resultMap[entry.date].no_of_trades += 1;
        } else {
            resultMap[entry.date] = {
                count: entry.count,
                date: entry.date,
                no_of_trades: 1
            };
        }
    });
    resultArray = Object.values(resultMap);

    $("#CalendarHeatmap").CalendarHeatmap('updateDates', resultArray);

    count_Array = []
    for (var i = 0; i < resultArray.length; i++) {
        count_Array.push(resultArray[i]['count'])
        x_axis.push(resultArray[i]['date'])
        y_axis.push(resultArray[i]['count'])
        x_axis1.push(resultArray[i]['date'])
        y_axis1.push(resultArray[i]['count'])
    }
    let value = checkArrayValues(count_Array)

    x_axis = x_axis.reverse()
    y_axis = y_axis.reverse()
    x_axis1 = x_axis1.reverse()
    y_axis1 = y_axis1.reverse()
    var sum = 0;
    var cumulativeArray = [];
    for (var i = 0; i < y_axis.length; i++) {
        sum += y_axis[i];
        cumulativeArray.push(sum);
    }

    y_axis = cumulativeArray

    if (value == 'Negative') {
        positiveArray = count_Array;
        minValue = Math.min(...positiveArray);
        maxValue = Math.max(...positiveArray);
        numSubranges = 3;
        subranges = calculateSubranges(minValue, maxValue, numSubranges);
        subranges1 = []
        temp = {}
        for (var i = 0; i < subranges.length; i++) {
            temp['start'] = subranges[i]['start']
            temp['end'] = subranges[i]['end']
            if (i == 0) {
                temp['color'] = '#f90e03'
            } else if (i == 1) {
                temp['color'] = '#fe5858'
            } else if (i == 2) {
                temp['color'] = '#ff8a8a'
            }
            subranges1.push(temp)
            temp = {}
        }
    } else if (value == 'Positive') {
        positiveArray = count_Array;
        minValue = Math.min(...positiveArray);
        maxValue = Math.max(...positiveArray);
        numSubranges = 3;
        subranges = calculateSubranges(minValue, maxValue, numSubranges);
        subranges1 = []
        temp = {}
        for (var i = 0; i < subranges.length; i++) {
            temp['start'] = subranges[i]['start']
            temp['end'] = subranges[i]['end']
            if (i == 0) {
                temp['color'] = '#8ed98e'
            } else if (i == 1) {
                temp['color'] = '#6bd368'
            } else if (i == 2) {
                temp['color'] = '#33d026'
            }
            subranges1.push(temp)
            temp = {}
        }
    } else if (value == 'Mixed') {
        positiveArray = count_Array;
        minValue = Math.min(...positiveArray);
        maxValue = -0.1
        numSubranges = 3;
        subranges = calculateSubranges(minValue, maxValue, numSubranges);
        subranges1 = []
        temp = {}
        for (var i = 0; i < subranges.length; i++) {
            temp['start'] = subranges[i]['start']
            temp['end'] = subranges[i]['end']
            if (i == 0) {
                temp['color'] = '#f90e03'
            } else if (i == 1) {
                temp['color'] = '#fe5858'
            } else if (i == 2) {
                temp['color'] = '#ff8a8a'
            }
            subranges1.push(temp)
            temp = {}
        }
        subranges1.push({ 'start': 0, 'end': 0, 'color': '#ecebeb' })
        minValue = 0.1
        maxValue = Math.max(...positiveArray);
        numSubranges = 3;
        subranges = calculateSubranges(minValue, maxValue, numSubranges);
        temp = {}
        for (var i = 0; i < subranges.length; i++) {
            temp['start'] = subranges[i]['start']
            temp['end'] = subranges[i]['end']
            if (i == 0) {
                temp['color'] = '#8ed98e'
            } else if (i == 1) {
                temp['color'] = '#6bd368'
            } else if (i == 2) {
                temp['color'] = '#33d026'
            }
            subranges1.push(temp)
            temp = {}
        }
    }

    const chDays = document.querySelectorAll('.ch-day');
    chDays.forEach(day => {
        const dataVal = parseInt(day.getAttribute('data-val'));
        if (!isNaN(dataVal)) {
            for (const range of subranges1) {
                if (dataVal >= range.start && dataVal <= range.end) {
                    day.style.backgroundColor = range.color;
                    break; // Exit the loop once a matching range is found
                }
            }
        }
    });

    const chlvls = document.querySelectorAll('.ch-lvl');
    chlvls.forEach(day => {
        day.setAttribute('title', '')
    });

    resize_function()
    updateCalendar(exit_ts)

    // ---- updating Equity Curve - canvas chart (chart.js) 
    function addData(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
            dataset.data = y_axis;
        });
        chart.update();
    }
    addData(chart_1);

    // ----- updating bar chart - ApexchartChart
    dayCounts = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0
    };
    resultArray.forEach(function (item) {
        var date = new Date(item.date);
        var dayOfWeek = date.toLocaleDateString('en-IN', { weekday: 'long' });
        // Check if the day of the week is Monday, Tuesday, Wednesday, Thursday, or Friday
        if (dayCounts.hasOwnProperty(dayOfWeek)) {
            dayCounts[dayOfWeek] += item.count;
        }
    });

    apexchart.updateSeries([{
        data: Object.values(dayCounts)
    }])

    apexchart_Daily_PnL.updateOptions({
        xaxis: {
            type: 'Text',
            categories: x_axis1,
        }
    })
    apexchart_Daily_PnL.updateSeries([{
        data: y_axis1
    }])
}

const all_stats = () => {

    var smallestExitTimestamp = Number.MAX_SAFE_INTEGER;
    var largestExitTimestamp = Number.MIN_SAFE_INTEGER;

    for (var i = 0; i < view_trade_data.length; i++) {
        var entryTimestamp = parseInt(view_trade_data[i][3]);
        var exitTimestamp = parseInt(view_trade_data[i][3]);

        if (entryTimestamp < smallestExitTimestamp) {
            smallestExitTimestamp = entryTimestamp;
        }

        if (exitTimestamp > largestExitTimestamp) {
            largestExitTimestamp = exitTimestamp;
        }
    }

    // Calculting value and storing in result dict
    result = {
        "Total_Profit": 0,
        "Total_Trades": 0,
        "Avg_Winner": 0,
        "Avg_Losser": 0,
        "Biggest_Winner": 0,
        "Biggest_Loss": 0,
        "Average_pnl": 0,
        "Risk_Reward": 0
    };

    profitMakingCount = 0;
    lossMakingCount = 0;
    sumProfitMakingTrades = 0;
    sumLossMakingTrades = 0;

    for (var i = 0; i < resultArray.length; i++) {
        var entry = resultArray[i];
        result.Total_Profit += entry.count;
        result.Total_Trades += entry.no_of_trades;

        if (entry.count > result.Biggest_Winner) {
            result.Biggest_Winner = entry.count;
        }
        if (entry.count < result.Biggest_Loss) {
            result.Biggest_Loss = entry.count;
        }
        if (entry.count > 0) {
            profitMakingCount += entry.no_of_trades;
            sumProfitMakingTrades += entry.count;
        } else if (entry.count < 0) {
            lossMakingCount += entry.no_of_trades;
            sumLossMakingTrades += entry.count;
        }
    }

    if (resultArray.length > 0) {
        result.Avg_Winner = (sumProfitMakingTrades / profitMakingCount);
        if (isNaN(result.Avg_Winner)) { result.Avg_Winner = 0 }

        result.Avg_Losser = (sumLossMakingTrades / lossMakingCount);
        if (isNaN(result.Avg_Losser)) { result.Avg_Losser = 0 }

        result.Average_pnl = (result.Total_Profit / result.Total_Trades);
        if (isNaN(result.Average_pnl)) { result.Average_pnl = 0 }
    }



    // Converting Amount into newly format for Lakhs(L), for Crore (Cr), for thousand (k)
    function formatCurrency(value) {
        var floatValue = parseFloat(value);
        var symbol = floatValue >= 0 ? '₹' : '- ₹';
        floatValue = Math.abs(floatValue);
        var formattedValue = '';

        if (floatValue >= 10000000) {
            formattedValue = (floatValue / 10000000).toFixed(2) + 'Cr';
        } else if (floatValue >= 100000) {
            formattedValue = (floatValue / 100000).toFixed(2) + 'L';
        } else if (floatValue >= 1000) {
            formattedValue = (floatValue / 1000).toFixed(2) + 'k';
        } else {
            formattedValue = floatValue.toFixed(2);
        }

        var oldValueWithSymbol = value >= 0 ? '₹' + floatValue.toFixed(2) : '- ₹' + floatValue.toFixed(2);

        return [symbol + formattedValue, value, oldValueWithSymbol];
    }

    for (var key in result) {
        if (key !== 'Risk_Reward' && key !== 'Total_Trades') {
            result[key] = formatCurrency(result[key]);
        }
    }

    $('.selected_range').show()

    $('#All_stats_Entry_date').text(moment.unix(smallestExitTimestamp).format('YYYY-MM-DD'))
    $('#All_stats_Exit_date').text(moment.unix(largestExitTimestamp).format('YYYY-MM-DD'))

    $('#total_profits').text(result.Total_Profit[0])
    $('#avg_winner').text(result.Avg_Winner[0])
    $('#avg_losser').text(result.Avg_Losser[0])
    $('#biggest_win').text(result.Biggest_Winner[0])
    $('#biggest_win1').text(result.Biggest_Winner[0])
    $('#biggest_loss').text(result.Biggest_Loss[0])
    $('#biggest_loss1').text(result.Biggest_Loss[0])
    $('#avg_pnl').text(result.Average_pnl[0])

    $('#total_profits').attr('title', result.Total_Profit[2])
    $('#avg_winner').attr('title', result.Avg_Winner[2])
    $('#avg_losser').attr('title', result.Avg_Losser[2])
    $('#biggest_win').attr('title', result.Biggest_Winner[2])
    $('#biggest_win1').attr('title', result.Biggest_Winner[2])
    $('#biggest_loss').attr('title', result.Biggest_Loss[2])
    $('#biggest_loss1').attr('title', result.Biggest_Loss[2])
    $('#avg_pnl').attr('title', result.Average_pnl[2])

    $('#total_trades').text(result.Total_Trades)
    $('#risk_reward').text('1:' + Math.abs(parseFloat(parseFloat(result.Avg_Winner[1]).toFixed(2) / parseFloat(result.Avg_Losser[1]).toFixed(2)).toFixed(2)))

    if (result.Total_Profit >= 0) {
        $('#total_profits').css('color', 'rgb(123, 219, 123)')
    } else {
        $('#total_profits').css('color', 'rgb(252, 92, 93)')
    }

    if (result.Average_pnl >= 0) {
        $('#avg_pnl').css('color', 'rgb(123, 219, 123)')
    } else {
        $('#avg_pnl').css('color', 'rgb(252, 92, 93)')
    }
}

const dataTable = () => {

    if (Array.isArray(view_trade_data)) {
        if (view_trade_data.length != 0) {
            data_table_array = []
            for (var i = 0; i < view_trade_data.length; i++) {
                parse_data = JSON.parse(view_trade_data[i][4])
                if (parse_data['trade_type'] == 'Long') {
                    status1 = (parseFloat(parse_data['exit_price']) - parseFloat(parse_data['entry_price'])) * parseFloat(parse_data['quantity'])
                } else if (parse_data['trade_type'] == 'Short') {
                    status1 = (parseFloat(parse_data['entry_price']) - parseFloat(parse_data['exit_price'])) * parseFloat(parse_data['quantity'])
                }

                if (parseFloat(status1).toFixed(2) >= 0) {
                    data_table_array.push([
                        'WIN',
                        moment.unix(view_trade_data[i][2]).format('MMM DD, YYYY HH:mm'),
                        moment.unix(view_trade_data[i][3]).format('MMM DD, YYYY HH:mm'),
                        parse_data['symbol_Ticker'],
                        parse_data['entry_price'],
                        parse_data['exit_price'],
                        parse_data['quantity'],
                        parse_data['trade_type'],
                        status1,
                        `<i class="fa-solid fa-trash" onclick="delete_trade(${view_trade_data[i][0]})" style="cursor:pointer"></i>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-pen-to-square" onclick='update_trade(${view_trade_data[i][0]}, ${view_trade_data[i][2]}, ${view_trade_data[i][3]}, ${view_trade_data[i][4]})' style="cursor:pointer"></i>`
                    ])
                } else {
                    data_table_array.push([
                        'LOSS',
                        moment.unix(view_trade_data[i][2]).format('MMM DD, YYYY HH:mm'),
                        moment.unix(view_trade_data[i][3]).format('MMM DD, YYYY HH:mm'),
                        parse_data['symbol_Ticker'],
                        parse_data['entry_price'],
                        parse_data['exit_price'],
                        parse_data['quantity'],
                        parse_data['trade_type'],
                        status1,
                        `<i class="fa-solid fa-trash" onclick="delete_trade(${view_trade_data[i][0]})" style="cursor:pointer"></i>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-pen-to-square" onclick='update_trade(${view_trade_data[i][0]}, ${view_trade_data[i][2]}, ${view_trade_data[i][3]}, ${view_trade_data[i][4]})' style="cursor:pointer"></i>`
                    ])
                }
            }

            if (counter_for_data_table == 0) {
                counter_for_data_table += 1;
                data_table = $("#dataTable").DataTable({
                    data: data_table_array,
                    columnDefs: [
                        { targets: [0, 1, 2, 3, 4, 5, 6, 7, 8], className: "dt-body-start" },
                    ],
                    fnRowCallback: function (nRow, aData) {
                        if (aData[0] == 'WIN') {
                            $("td:eq(0)", nRow).html("<div class='px-1 py-1 rounded' style='background: rgb(123, 219, 123); color:#257125'>" + aData[0] + "</div>");
                        } else {
                            $("td:eq(0)", nRow).html("<div class='px-1 py-1 rounded' style='background: rgb(252, 92, 93); color:#712525'>" + aData[0] + "</div>");
                        }

                        if (aData[7] == 'Long') {
                            $("td:eq(7)", nRow).html("<div class='mx-2 my-2 px-1 py-1 rounded' style='border:1px solid rgb(123, 219, 123)'>" + aData[7] + "</div>");
                        } else {
                            $("td:eq(7)", nRow).html("<div class='mx-2 my-2 px-1 py-1 rounded' style='border:1px solid rgb(252, 92, 93)'>" + aData[7] + "</div>");
                        }

                        if (aData[8] >= 0) {
                            $("td:eq(8)", nRow).html("<div class='px-1 py-1' style='color:#7BDB7B'>₹" + aData[8] + "</div>");
                        } else {
                            $("td:eq(8)", nRow).html("<div class='px-1 py-1' style='color:#FC5C5D'>- ₹" + Math.abs(aData[8]) + "</div>");
                        }

                        $("td:eq(3)", nRow).html("<div class='px-1 py-1' style='color:#ffbd5a'>" + aData[3] + "</div>");
                        $("td:eq(6)", nRow).html("<div class='px-1 py-1' style='color:#ffbd5a'>" + aData[6] + "</div>");

                        $("td:eq(4)", nRow).html("<div class='px-1 py-1'>₹" + aData[4] + "</div>");
                        $("td:eq(5)", nRow).html("<div class='px-1 py-1'>₹" + aData[5] + "</div>");
                    },
                    autoWidth: false,
                    paging: false,
                    info: false,
                    ordering: false,
                    order: [[1, "asc"]],
                    searching: false,
                });
            } else if (counter_for_data_table > 0) {
                console.log("Data is updating");
                data_table.clear();
                data_table.rows.add(data_table_array);
                data_table.draw();
            }
        }
    }



}

const dataTable_monthly = () => {

    if (Array.isArray(resultArray)) {
        if (resultArray.length != 0) {

            function getYearMonth(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
                return `${year}-${month < 10 ? '0' + month : month}`;
            }

            function createMonthlyTotalArray(resultArray) {
                const monthlyTotals = {};

                resultArray.forEach(entry => {
                    const yearMonth = getYearMonth(entry.date);
                    if (!monthlyTotals[yearMonth]) {
                        monthlyTotals[yearMonth] = 0;
                    }
                    monthlyTotals[yearMonth] += entry.count;
                });

                const years = Array.from(new Set(resultArray.map(entry => getYearMonth(entry.date).split('-')[0])));
                const months = Array.from({ length: 12 }, (_, index) => index + 1);

                const resultArray1 = [];

                years.forEach(year => {
                    const yearTotal = [year];
                    let yearlyTotal = 0;
                    months.forEach(month => {
                        const yearMonth = `${year}-${month < 10 ? '0' + month : month}`;
                        if (monthlyTotals[yearMonth]) {
                            yearTotal.push(monthlyTotals[yearMonth]);
                            yearlyTotal += monthlyTotals[yearMonth];
                        } else {
                            yearTotal.push(0);
                        }
                    });
                    yearTotal.push(yearlyTotal);
                    resultArray1.push(yearTotal);
                });

                const verticalTotalRow = ['Total'];
                months.forEach(month => {
                    let monthTotal = 0;
                    years.forEach(year => {
                        const yearMonth = `${year}-${month < 10 ? '0' + month : month}`;
                        if (monthlyTotals[yearMonth]) {
                            monthTotal += monthlyTotals[yearMonth];
                        }
                    });
                    verticalTotalRow.push(monthTotal);
                });

                const grandTotal = verticalTotalRow.slice(1).reduce((total, value) => total + value, 0);
                verticalTotalRow.push(grandTotal);

                resultArray1.push(verticalTotalRow);

                resultArray1.sort((a, b) => b[0] - a[0]);

                return resultArray1;
            }

            data_table_array_monthly = createMonthlyTotalArray(resultArray);


            if (counter_for_data_table_monthly == 0) {
                counter_for_data_table_monthly += 1;
                data_table_monthly = $("#Monthly_dataTable").DataTable({
                    data: data_table_array_monthly,
                    columnDefs: [
                        { targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], className: "dt-body-start" },
                    ],
                    fnRowCallback: function (nRow, aData) {

                        $("td:eq(0)", nRow).html("<div class='px-1 py-1' style='color:#ffbd5a'>" + aData[0] + "</div>");
                        for (var j = 0; j < data_table_array_monthly.length; j++) {
                            for (var i = 1; i < 14; i++) {
                                if (aData[i] > 0) {
                                    $(`td:eq(${i})`, nRow).html("<div class='mx-1 my-1 px-1 py-1 rounded' style='color:rgb(123, 219, 123)'>" + aData[i] + "</div>");
                                } else if (aData[i] < 0) {
                                    $(`td:eq(${i})`, nRow).html("<div class='mx-1 my-1 px-1 py-1 rounded' style='color:rgb(252, 92, 93)'>" + aData[i] + "</div>");
                                } else if (aData[i] == 0) {
                                    $(`td:eq(${i})`, nRow).html("<div class='mx-1 my-1 px-1 py-1 rounded' style='color:#fff'>" + aData[i] + "</div>");
                                }
                            }
                        }
                    },
                    autoWidth: false,
                    paging: false,
                    info: false,
                    order: [[0, "asc"]],
                    ordering: false,
                    searching: false,
                });
            } else if (counter_for_data_table > 0) {
                console.log("Data is updating");
                data_table_monthly.clear();
                data_table_monthly.rows.add(data_table_array_monthly);
                data_table_monthly.draw();
            }
        }
    }



}


// All array value are +ve, -ve or mix
function checkArrayValues(arr) {
    let allPositive = true;
    let allNegative = true;

    for (const value of arr) {
        if (value > 0) {
            allNegative = false;
        } else if (value < 0) {
            allPositive = false;
        }
    }

    if (allPositive) {
        return "Positive";
    } else if (allNegative) {
        return "Negative";
    } else {
        return "Mixed";
    }
}

function calculateSubranges(min, max, numSubranges) {
    const rangeSize = (max - min + 1) / numSubranges;
    const subranges = [];

    for (let i = 0; i < numSubranges; i++) {
        const startValue = min + i * rangeSize;
        const endValue = startValue + rangeSize - 1;
        // subranges.push({ start: startValue.toFixed(0), end: endValue.toFixed(0) });
        subranges.push({ start: parseInt(startValue), end: parseInt(endValue) });
    }

    return subranges;
}

function extractTimestamp(text) {
    const datePattern = /([A-Za-z]{3} \d{1,2}, \d{4})/;
    const match = text.match(datePattern);
    if (match) {
        const dateString = match[1];
        const date = new Date(dateString);
        const timestamp = date.getTime() / 1000;
        return timestamp;
    }
    return null;
}


//-------------Delete Trades------------------------
const delete_trade = (trade_id) => {

    console.log(trade_id)

    if (confirm("are you sure")) { } else { return; }

    data_dict = {
        'trade_id': trade_id
    };

    data = JSON.stringify(data_dict);

    $.post(
        root + route + "/curd_journal",
        { 'op': 'delete', 'data': data },
        function (data, status) {
            console.log(data, status)
            if (data == "success") {
                view_trade()
                setTimeout(() => {
                    alert("Trade deleted Successfully!");
                }, 200);
            } else {
                alert("Unable to delete Trade");
            }
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
}






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

    if ($(window).width() < 540) {
        $('.ch-day').width(9) //15px
        $('.ch-day').height(9)

        $('.ch-week').width(11)
        $('.ch-day-labels').width(11) //17px

        $('.ch-day-label').css('line-height', '11px')  // 17px
    } else {
        $('.ch-day').width(15)
        $('.ch-day').height(15)

        $('.ch-week').width(17)
        $('.ch-day-labels').width(17)

        $('.ch-day-label').css('line-height', '17px')
    }
}

$(document).ready(function () {

    // console.log = function () { }

    previous_timestamp = 0

    x_axis = []
    y_axis = []

    x_axis1 = []
    y_axis1 = []

    counter_for_data_table = 0
    counter_for_data_table_monthly = 0

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    // Set default values for entry and exit date fields
    const entryDate = new Date();
    entryDate.setHours(14, 45, 0); // Set hours, minutes, and seconds  9:15 AM (extra 5.30 hours i had to add in code)
    document.getElementById('Entry_date_time').value = entryDate.toISOString().slice(0, 16);

    const exitDate = new Date();
    exitDate.setHours(21, 0, 0); // Set hours, minutes, and seconds  3:30 PM (extra 5.30 hours i had to add in code)
    document.getElementById('Exit_date_time').value = exitDate.toISOString().slice(0, 16);

    // Set default values for entry and exit date fields
    $('.disable_color').css('color', '#9f9f9f');
    $('#select_range').css('color', '#9f9f9f');
    $('#Entry_date').attr('disabled', 'true');
    $('#Exit_date').attr('disabled', 'true');
    // $('#Entry_date').val(new Date().toISOString().slice(0, 10))
    // $('#Exit_date').val(new Date().toISOString().slice(0, 10))

    $('.ch-year').addClass('d-flex justify-content-center')

    // -------------- SUGGESTION STRAT ------------------//
    $.post(root + "/api/journal/instr_list", function (data, status) {
        console.log(data, status)
    }).done(function (response) {
        response = JSON.parse(response)
        Stockname = []
        for (var i = 0; i < response.length; i++) {
            Stockname.push({ "stockName": response[i] })
        }
        $("#Symbol_Ticker").fuzzyComplete(Stockname);
    }).fail(function (response) {
        console.log("Error: " + response);
    });
    // -------------- SUGGESTION END ------------------//

    // -------- chartjs linechart initialization

    var ctx = document.getElementById("linechart").getContext('2d');

    var gradientAbove = ctx.createLinearGradient(0, 0, 0, 300);
    gradientAbove.addColorStop(0, 'rgba(51, 208, 38, 1)');
    gradientAbove.addColorStop(1, 'rgba(5, 55, 3, 0.01');

    var gradientBelow = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBelow.addColorStop(1, 'rgba(255, 35, 35, 1)');
    gradientBelow.addColorStop(0, 'rgba(5, 35, 35, 0)');

    chart_1 = new Chart(ctx, {
        type: "line",
        data: {
            labels: x_axis,
            datasets: [
                {
                    fill: {
                        target: "origin",
                        above: gradientAbove,
                        below: gradientBelow,
                    },
                    backgroundColor: '#1c1c1c',
                    data: y_axis,
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 0,
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    position: 'right',
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    }
                },
                x: {
                    ticks: {
                        display: true,
                        maxTicksLimit: 10,
                        padding: 15,
                        color: "white",
                    },
                    grid: {
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                    }
                },
            },
            plugins: {
                tooltip: {
                    mode: 'interpolate',
                    intersect: false,
                    enabled: true,
                    displayColors: false,
                    titleColor: "white",
                    titleSpacing: 3,
                    TitleFont: {
                        weight: "bold",
                    },
                    backgroundColor: "black",
                    bodyFont: {
                        weight: "bold",
                    },
                    callbacks: {
                        labelTextColor: function (context) {
                            const value = context.dataset.data[context.dataIndex];
                            return value >= 0 ? "rgba(51, 208, 38, 1)" : "rgba(255, 35, 35, 1)"; // Green for positive values, red for negative values
                        },
                        label: function (context) {
                            const value = context.dataset.data[context.dataIndex];
                            if (parseFloat(value) >= 0) {
                                return '₹' + parseFloat(value);
                            } else {
                                return '- ₹' + Math.abs(parseFloat(value));
                            }
                        },
                    },
                },
                crosshair: {
                    line: {
                        color: '#e7e7e7',  // crosshair line color
                        width: 1        // crosshair line width
                    },
                    sync: {
                        enabled: true,            // enable trace line syncing with other charts
                        group: 1,                 // chart group
                        suppressTooltips: false   // suppress tooltips when showing a synced tracer
                    },
                },
                legend: {
                    display: false,
                    color: '#1c1c1c',
                    legendText: 'MTM Value'
                },
                title: {
                    display: true,
                    text: "",
                    align: "start",
                    color: "white",
                    font: {
                        size: 20,
                    },
                    padding: { bottom: 25 },
                },
            },
        },
    });


    // ------ Apexchart
    var options = {
        series: [{
            name: 'MTM Value',
            data: []
        }],
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: 0,
                        to: 100000000,
                        color: '#7bdb7b'
                    }, {
                        from: -100000000,
                        to: 0,
                        color: '#fc5c5d'
                    }]
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: '#fff',
                },
                formatter: function (y) {
                    if (y >= 0) {
                        var final = '₹' + Math.abs(y.toFixed(2))
                    } else {
                        var final = '- ₹' + Math.abs(y.toFixed(2))
                    }
                    return final
                }
            }
        },
        xaxis: {
            type: 'Text',
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            labels: {
                show: true,
                style: {
                    colors: '#fff',
                }
            }
        },
        grid: {
            show: false
        }
    };

    apexchart = new ApexCharts(document.querySelector("#bar_chart_apexchart"), options);
    apexchart.render();

    var options_1 = {
        series: [{
            name: 'MTM Value',
            data: []
        }],
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: 0,
                        to: 100000000,
                        color: '#7bdb7b'
                    }, {
                        from: -100000000,
                        to: 0,
                        color: '#fc5c5d'
                    }]
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: '#fff',
                },
                formatter: function (y) {
                    if (y >= 0) {
                        var final = '₹' + Math.abs(y.toFixed(2))
                    } else {
                        var final = '- ₹' + Math.abs(y.toFixed(2))
                    }
                    return final
                }
            }
        },
        xaxis: {
            type: 'Text',
            categories: [],
            labels: {
                show: true,
                style: {
                    colors: '#fff',
                }
            }
        },
        grid: {
            show: false
        }
    };

    apexchart_Daily_PnL = new ApexCharts(document.querySelector("#barchart"), options_1);
    apexchart_Daily_PnL.render();

    // ------- Calendar HeatMap
    $("#CalendarHeatmap").CalendarHeatmap([], {
        title: "",
        months: 12,
        labels: {
            days: true,
            custom: {
                weekDayLabels: "dd"
            }
        },
        legend: {
            minLabel: "Max Loss",
            maxLabel: "Max Profit",
        },
        tooltips: {
            show: false
        },
    });
    resize_function()
});

$(window).on("resize", function () {
    resize_function()
})

$('.modal').on('shown.bs.modal', function () {
    $('html').css('overflow', 'hidden')
}).on('hidden.bs.modal', function () {
    $('html').attr('style', 'overflow-x:hidden !important; overflow-y:auto !important')
    $('body').css('overflow-x', 'clip')
});

$(document).on("click", ".ch-day", function () {
    let text = $(this).attr('title')
    const output1 = extractTimestamp(text)
    if (previous_timestamp != 0) {

        current_click_month = moment.unix(output1).format('MM')
        previous_click_month = moment.unix(previous_timestamp).format('MM')
        if (current_click_month != previous_click_month) {
            updateCalendar(output1)

            data_table.clear();
            data_table.rows.add(data_table_array);
            data_table.draw();
        }
    }
});


//---------------------------------- ONE month Calendar part -----------------------------------------//

$(function (e) {
    calendar = $("#calendar").calendarGC({
        dayBegin: 0,
        events: getHoliday(),
    });
});

const getHoliday = () => {
    var d = new Date();
    var totalDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
    events = [];

    for (var i = 1; i <= totalDay; i++) {
        var newDate = new Date(d.getFullYear(), d.getMonth(), i);
        if (newDate.getDay() == 0) {   //if Sunday
            events.push({
                date: newDate,
                eventName: 'Sun',
                dateColor: "#ffbd5a",
            });
            events.push({
                date: newDate,
                eventName: 'Sun',
                dateColor: "#ffbd5a"
            });
        }

        if (newDate.getDay() == 6) {   //if Saturday
            events.push({
                date: newDate,
                eventName: 'Sat',
                dateColor: "#ffbd5a"
            });
            events.push({
                date: newDate,
                eventName: 'Sat',
                dateColor: "#ffbd5a"
            });
        }
    }
    return events;
}

const updateCalendar = (date) => {
    previous_timestamp = date
    console.log("date", date)
    events = []
    for (var i = 0; i < resultArray.length; i++) {
        var floatValue = parseFloat(resultArray[i]['count'])
        var symbol = floatValue >= 0 ? '₹' : '- ₹';
        floatValue = Math.abs(floatValue);
        var formattedValue = '';

        if (floatValue >= 10000000) {
            formattedValue = (floatValue / 10000000).toFixed(1) + 'Cr';
        } else if (floatValue >= 100000) {
            formattedValue = (floatValue / 100000).toFixed(1) + 'L';
        } else if (floatValue >= 1000) {
            formattedValue = (floatValue / 1000).toFixed(1) + 'k';
        } else {
            formattedValue = floatValue.toFixed(1);
        }

        var oldValueWithSymbol = parseFloat(resultArray[i]['count']) >= 0 ? '₹' + floatValue.toFixed(2) : '- ₹' + floatValue.toFixed(2);

        events.push({
            date: new Date(resultArray[i]['date']),
            eventName: `${symbol + formattedValue}`,
            className: `badge mtm_value`,
            dateColor: '#fff',
            titleName: `${oldValueWithSymbol}`
        })
        events.push({
            date: new Date(resultArray[i]['date']),
            eventName: `${resultArray[i]['no_of_trades']} Trades`,
            className: `badge`,
            dateColor: '#fff',
            titleName: `${resultArray[i]['no_of_trades']} Trades`
        })
    }

    var d = new Date(moment.unix(date).format('YYYY-MM-DD'));
    var totalDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();

    for (var i = 1; i <= totalDay; i++) {
        var newDate = new Date(d.getFullYear(), d.getMonth(), i);
        if (newDate.getDay() == 0) {   //if Sunday
            events.push({
                date: newDate,
                eventName: "Sun",
                className: `badge`,
                dateColor: "#ffbd5a"
            }); events.push({
                date: newDate,
                eventName: "Sun",
                className: `badge`,
                dateColor: "#ffbd5a"
            });
        }

        if (newDate.getDay() == 6) {   //if Saturday
            events.push({
                date: newDate,
                eventName: "sat",
                className: `badge`,
                dateColor: "#ffbd5a"
            }); events.push({
                date: newDate,
                eventName: "sat",
                className: `badge`,
                dateColor: "#ffbd5a"
            });
        }
    }

    calendar.setEvents(events);
    calendar.setDate(moment.unix(date).format('YYYY-MM-DD'));
    background_color_one_month_cal()
}

const background_color_one_month_cal = () => {
    var tdElements = document.querySelectorAll('td div.gc-event.badge.mtm_value');

    // Loop through each selected <div> element
    tdElements.forEach(function (divElement) {
        var tdElement = divElement.parentElement; // Get the parent <td> element
        var content = (divElement.textContent.trim()); // Parse content as a float

        content = content.replace(/[^0-9-]/g, '');
        console.log(content)

        if (!isNaN(content)) {
            if (content > 0) {
                tdElement.style.backgroundColor = '#7bdb7b'; // Set background color to green for positive numbers
            } else if (content < 0) {
                tdElement.style.backgroundColor = '#fc5c5d'; // Set background color to red for negative numbers
            }
        }
    });
}

$(document).on("click", ".slider1", function () {
    if ($('#checkbox1').is(':checked')) {
        console.log('checked');
        $('.disable_color').css('color', '#9f9f9f');
        $('#select_range').css('color', '#9f9f9f');
        $('#all').css('color', '#fff');
        $('#Entry_date').attr('disabled', 'true');
        $('#Exit_date').attr('disabled', 'true');
    } else {
        console.log('not checked');
        $('.disable_color').css('color', '#fff');
        $('#select_range').css('color', '#fff');
        $('#all').css('color', '#9f9f9f');
        $('#Entry_date').removeAttr('disabled');
        $('#Exit_date').removeAttr('disabled');
    }
})

$(document).on("click", ".event", (e) => {
    data = e
    var text = data['currentTarget'].innerText
    var lines = text.split('\n');
    var Date = lines[0];
    var Month = moment.unix(previous_timestamp).format('MMM')
    var Year = moment.unix(previous_timestamp).format('YYYY')
    clicked_date = Month + ' ' + Date + ', ' + Year

    filteredArray = data_table_array.filter(function (item) {
        var dateTime = moment(item[2], "MMM DD, YYYY HH:mm");
        var datePart = dateTime.format("MMM DD, YYYY");

        return datePart === clicked_date;
    });

    data_table.clear();
    data_table.rows.add(filteredArray);
    data_table.draw();
})

$(document).on("click", ".data_Table_1", () => {
    data_table.clear();
    data_table.rows.add(data_table_array);
    data_table.draw();
})

$(document).on("click", ".bar_chart", () => {

})


//-----------------------Modal form-------------------------//
$('.btn-close1').hover(
    function () {
        $(this).addClass('bg-white'); // Add class on mouseenter
    },
    function () {
        $(this).removeClass('bg-white'); // Remove class on mouseleave
    }
);

$(document).on("click", ".slider", function () {
    if ($('#checkbox').is(':checked')) {
        console.log('checked');
        // $('#long_text').css('color', '#6bd368');
        $('#long_text').css('color', '#fff');
        $('#short_text').css('color', '#fff');
        $('#exampleModal1 .modal-header').css('background-color', '#6bd368')
        $('#exampleModal1 .modal-footer').css('background-color', '#6bd368')
    } else {
        console.log('not checked');
        $('#long_text').css('color', '#fff');
        // $('#short_text').css('color', '#fc5c5d');
        $('#short_text').css('color', '#fff');
        $('#exampleModal1 .modal-header').css('background-color', '#fc5c5d')
        $('#exampleModal1 .modal-footer').css('background-color', '#fc5c5d')
    }
})

$(document).on("click", "#add_trade", function () {
    $('#update_trade_submit').removeClass().addClass('btn btn-outline-light d-none')
    $('#add_trade_submit').removeClass().addClass('btn btn-outline-light')
    $('#exampleModal1 .modal-title').text('Add Trade Inputs:')

    $('#checkbox').prop('checked', false);
    $("input[type='datetime-local']").val("");
    $("input[type='text']").val("");
    $("input[type='number']").val("");
    $("textarea").val("");
    $('#exampleModal1 .modal-header').css('background-color', '#6bd368')
    $('#exampleModal1 .modal-footer').css('background-color', '#6bd368')
})

//------- character upto 300 only
var maxChars = 300;

$("textarea").on("input", function () {
    var $this = $(this);
    var remainingChars = maxChars - $this.val().length;

    if (remainingChars >= 0) {
        $this.siblings(".char-count").text(remainingChars + " characters remaining");
    } else {
        // Trim the content to the maximum limit
        $this.val($this.val().substring(0, maxChars));
        $this.siblings(".char-count").text("0 characters remaining");
    }
});




//---------- Trade Submit
document.querySelector("#add_trade_submit").addEventListener("click", () => {
    add_trade();
});

//---------- Trade View
document.querySelector("#view_trade_submit").addEventListener("click", () => {
    view_trade();
});

//---------- Trade Update
document.querySelector("#update_trade_submit").addEventListener("click", () => {
    update_trade_API(trade_id);
});

//---------- Show Individual Day
document.querySelector("#individual_day_curve").addEventListener("click", () => {
    $('#individual_day_curve').removeClass('gb_active').addClass('gb_active')
    $('#equity_curve').removeClass('gb_active')

    $('#show_hide_chart').removeClass().addClass('d-none')
    $('#show_hide_apexchart').removeClass()
});

//---------- Show Equity Curve
document.querySelector("#equity_curve").addEventListener("click", () => {
    $('#individual_day_curve').removeClass('gb_active')
    $('#equity_curve').removeClass('gb_active').addClass('gb_active')

    $('#show_hide_chart').removeClass()
    $('#show_hide_apexchart').removeClass().addClass('d-none')
});