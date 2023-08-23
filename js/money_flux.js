// root = " https://testing.tcistudents.in";
// root_1 = "https://ebs.tredcode.com";

route = "/api/money_flux";

// Check Access API
const call_check_access_API = () => {
  try {
    let dhan = username(cookieValue_1)
    if (dhan[1] == 1) {
      $('#check_access_button').hide()
    } else if (dhan[1] == 0) {
      $('#check_access_button').show()
      $('.midcap_btn').attr('id', 'unAuth_midcap_btn')
      $('#unAuth_midcap_btn').text('>> GET MIDCAP')
      $('.sensex_btn').attr('id', 'unAuth_sensex_btn')
      $('#unAuth_sensex_btn').text('>> GET SENSEX')
    }
  } catch (error) {
    console.error()
  }
};

// Expiry API
const call_Expiry_API = (script) => {
  try {
    $.post(
      root + route + "/get_running_expiry",
      {
        script: script
      },
      function (data, status) {
        Expiry_data = data;
      }
    ).fail(function (response) {
      console.log("Error: " + response);
      $("#PCM_Color").removeClass();
      $("#PCM_Color").addClass(
        "semicircle-G5piCoZi semicircleNeutral-G5piCoZi"
      );
      $("#PCM_Arrow").removeClass();
      $("#PCM_Arrow").addClass(
        "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
      );
      $("#sentiment_dial_Color").removeClass();
      $("#sentiment_dial_Color").addClass(
        "semicircle-G5piCoZi semicircleNeutral-G5piCoZi"
      );
      $("#sentiment_dial_Arrow").removeClass();
      $("#sentiment_dial_Arrow").addClass(
        "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
      );
    });
    console.log("API FUNCTION CALL");
    var x = moment.unix(Expiry_data[0][0]).format("MMM-D");
    var y = moment.unix(Expiry_data[1][0]).format("MMM-D");
    $("#1st_dropdown_value").attr("value", x);
    $("#2nd_dropdown_value").attr("value", y);
    $("#1st_dropdown_value").text(x + " " + Expiry_data[0][1]);
    $("#2nd_dropdown_value").text(y + " " + Expiry_data[1][1]);
    Nifty_exp_1 = moment.unix(Expiry_data[0][0]).format("DDMMM");
    Nifty_exp_2 = moment.unix(Expiry_data[1][0]).format("DDMMM");
    return [Expiry_data, Nifty_exp_1, Nifty_exp_2];
  } catch (error) {
    console.error();
    $("#PCM_Color").removeClass();
    $("#PCM_Color").addClass("semicircle-G5piCoZi semicircleNeutral-G5piCoZi");
    $("#PCM_Arrow").removeClass();
    $("#PCM_Arrow").addClass(
      "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
    );
    $("#sentiment_dial_Color").removeClass();
    $("#sentiment_dial_Color").addClass(
      "semicircle-G5piCoZi semicircleNeutral-G5piCoZi"
    );
    $("#sentiment_dial_Arrow").removeClass();
    $("#sentiment_dial_Arrow").addClass(
      "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
    );
  }
};

// Candlestick API
const call_Candlestick_API = (script) => {
  try {
    $.post(
      root + route + "/chart",
      {
        script: script,
      },
      function (data, status) {
        Candle_data = data;
        if (Candle_data.length == 0) {
          Candle_data = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ];
        }
      }
    ).fail(function (response) {
      console.log("Error: " + response);
      Candle_data = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
    });
  } catch (error) {
    console.error();
    Candle_data = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
  }
  return Candle_data;
};

// Volume API
const call_Volume_API = (script, exp_date) => {
  try {
    $.post(
      root + route + "/op_histogram",
      {
        script: script,
        exp: exp_date,
      },
      function (data, status) {
        Volume_data = data;
      }
    ).fail(function (response) {
      console.log("Error: " + response);
      Volume_data = [];
    });
  } catch (error) {
    Volume_data = [];
    console.error();
  }
  return Volume_data;
};

// Heat Map API
const call_Heat_Map_API = (script) => {
  try {
    $.ajax({
      url: root_1 + `/study-data/Heat%20Map%20${script}`,
      method: "GET",
      success: function (data, status) {
        // Heat_Map = JSON.parse(data)["data"];   // For hs
        Heat_Map = data.data;                     // For ebs
      },
      error: function (response) {
        console.log("Error: " + response);
        Heat_Map = [];
      },
    });

    console.log("HeatMap API CALL");
    HeatMap = [];
    for (var i = 0; i < Heat_Map.length; i++) {
      if (Heat_Map[i].param_0 != -0 || Heat_Map[i].param_0 != 0) {
        HeatMap.push({
          x: Heat_Map[i].Symbol, // the date
          y: Heat_Map[i].param_0, // the Volume
        });
      }
    }
  } catch (error) {
    console.error();
    HeatMap = [];
  }
  return HeatMap;
};

// Dial API
const call_Dial_API = (script, exp_date, exp_type) => {
  $.post(
    root + route + "/op_dial",
    {
      script: script,
      exp: exp_date,
      exp_type: exp_type,
    },
    function (data, status) {
      Dial_data = data;
    }
  ).fail(function (response) {
    console.log("Error: " + response);
    Dial_data = [];
    console.log("1st TIME DIAL DATA = ", Dial_data);
  });

  if (Dial_data.length == 0) {
    Dial_data = [[0, 0, 0]];
    console.log("2nd TIME DIAL DATA = ", Dial_data);
  }

  if (parseFloat(Dial_data[0][2]) > 0) {
    console.log("1st TIME POSITIVE DATA PLOTTED");
    console.log(parseFloat(Dial_data[0][2]));
    $("#PCM_Color").removeClass();
    $("#PCM_Color").addClass("semicircle-G5piCoZi semicircleBuy-G5piCoZi");
    $("#PCM_Arrow").removeClass();
    $("#PCM_Arrow").addClass(
      "arrow-G5piCoZi arrowBuy-G5piCoZi arrowShudderBuy-G5piCoZi"
    );
  } else if (parseFloat(Dial_data[0][2]) < 0) {
    console.log("1st TIME NEGATIVE DATA PLOTTED");
    console.log(parseFloat(Dial_data[0][2]));
    $("#PCM_Color").removeClass();
    $("#PCM_Color").addClass("semicircle-G5piCoZi semicircleSell-G5piCoZi");
    $("#PCM_Arrow").removeClass();
    $("#PCM_Arrow").addClass(
      "arrow-G5piCoZi arrowSell-G5piCoZi arrowShudderSell-G5piCoZi"
    );
  } else if (parseFloat(Dial_data[0][2]) == 0) {
    console.log("1st TIME NEUTRAL");
    console.log(parseFloat(Dial_data[0][2]));
    $("#PCM_Color").removeClass();
    $("#PCM_Color").addClass("semicircle-G5piCoZi semicircleNeutral-G5piCoZi");
    $("#PCM_Arrow").removeClass();
    $("#PCM_Arrow").addClass(
      "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
    );
  }
  console.log("PCM DIAL FUNCTION CALL");
  return Dial_data;
};

// Calculation Function
const calculation_for_Exp_1 = (vol_data, Bar_data) => {
  // Data for Volume (For 1st dropdown value)
  if (vol_data.length != 0) {
    Array_1 = [];
    Array_2 = [];
    len_1 = vol_data.length;
    for (var i = 0; i < len_1; i++) {
      for (var j = 0; j < vol_data[0].length; j++) {
        if (
          i != len_1 - 1 &&
          parseFloat(vol_data[i][0]) == parseFloat(vol_data[i + 1][0])
        ) {
          i = i + 1;
        }
        Array_2.push(parseFloat(vol_data[i][j]));
        j = j + 1;
      }
      Array_1.push(Array_2);
      Array_2 = [];
      // console.log(Array_1.length);
    }
    console.log(Array_1);
  } else if (vol_data.length == 0) {
    Array_1 = [
      [0, 0],
      [0, 0],
    ];
  }

  // For Sentiment Dial (Calculation Part)
  if (Array_1.length != 0) {
    Nifty_exp_1_A = 0;
    Nifty_exp_1_B = 0;
    Nifty_exp_1_Dial = 0;
    for (var i = 0; i < Array_1.length; i++) {
      if (Array_1[i][1] > 0) {
        Nifty_exp_1_A = Nifty_exp_1_A + Array_1[i][1];
      } else if (Array_1[i][1] < 0) {
        Nifty_exp_1_B = Nifty_exp_1_B + Array_1[i][1];
      }
    }
    console.log("Nifty_exp_1_A = ", Nifty_exp_1_A);
    console.log("Nifty_exp_1_B = ", Math.abs(Nifty_exp_1_B));
    if (Nifty_exp_1_A > Math.abs(Nifty_exp_1_B)) {
      Nifty_exp_1_Dial = Nifty_exp_1_A / Math.abs(Nifty_exp_1_B);
      console.log("Nifty_exp_1_Dial = ", Nifty_exp_1_Dial);
    } else if (Nifty_exp_1_A < Math.abs(Nifty_exp_1_B)) {
      Nifty_exp_1_Dial = -Math.abs(Nifty_exp_1_B) / Nifty_exp_1_A;
      console.log("Nifty_exp_1_Dial = ", Nifty_exp_1_Dial);
    }

    if (Nifty_exp_1_Dial > 0) {
      $("#sentiment_dial_Color").removeClass();
      $("#sentiment_dial_Color").addClass(
        "semicircle-G5piCoZi semicircleBuy-G5piCoZi"
      );
      $("#sentiment_dial_Arrow").removeClass();
      $("#sentiment_dial_Arrow").addClass(
        "arrow-G5piCoZi arrowBuy-G5piCoZi arrowShudderBuy-G5piCoZi"
      );
    } else if (Nifty_exp_1_Dial < 0) {
      $("#sentiment_dial_Color").removeClass();
      $("#sentiment_dial_Color").addClass(
        "semicircle-G5piCoZi semicircleSell-G5piCoZi"
      );
      $("#sentiment_dial_Arrow").removeClass();
      $("#sentiment_dial_Arrow").addClass(
        "arrow-G5piCoZi arrowSell-G5piCoZi arrowShudderSell-G5piCoZi"
      );
    } else if (Nifty_exp_1_Dial == 0) {
      $("#sentiment_dial_Color").removeClass();
      $("#sentiment_dial_Color").addClass(
        "semicircle-G5piCoZi semicircleNeutral-G5piCoZi"
      );
      $("#sentiment_dial_Arrow").removeClass();
      $("#sentiment_dial_Arrow").addClass(
        "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
      );
    }
  }

  if (Dial_data[0][0] == 0 && Dial_data[0][1] == 0 && Dial_data[0][2] == 0) {
    console.log("Dial Data is Empty");
    Dial_data = [0, 0, Nifty_exp_1_Dial];
    console.log("3rd TIME DIAL DATA = ", Dial_data);
    if (parseFloat(Dial_data[2]) > 0) {
      console.log(parseFloat(Dial_data[2]));
      console.log("2nd TIME POSITIVE DATA PLOTTED");
      $("#PCM_Color").removeClass();
      $("#PCM_Color").addClass("semicircle-G5piCoZi semicircleBuy-G5piCoZi");
      $("#PCM_Arrow").removeClass();
      $("#PCM_Arrow").addClass(
        "arrow-G5piCoZi arrowBuy-G5piCoZi arrowShudderBuy-G5piCoZi"
      );
    } else if (parseFloat(Dial_data[2]) < 0) {
      console.log(parseFloat(Dial_data[2]));
      console.log("2nd TIME NEGATIVE DATA PLOTTED");
      $("#PCM_Color").removeClass();
      $("#PCM_Color").addClass("semicircle-G5piCoZi semicircleSell-G5piCoZi");
      $("#PCM_Arrow").removeClass();
      $("#PCM_Arrow").addClass(
        "arrow-G5piCoZi arrowSell-G5piCoZi arrowShudderSell-G5piCoZi"
      );
    } else if (parseFloat(Dial_data[2]) == 0) {
      console.log(parseFloat(Dial_data[2]));
      console.log("2nd TIME NEUTRAL");
      $("#PCM_Color").removeClass();
      $("#PCM_Color").addClass(
        "semicircle-G5piCoZi semicircleNeutral-G5piCoZi"
      );
      $("#PCM_Arrow").removeClass();
      $("#PCM_Arrow").addClass(
        "arrow-G5piCoZi arrowNeutral-G5piCoZi arrowShudderNeutral-G5piCoZi"
      );
    }
  }
};

// Highchart color function
const VolumeBarColor = (point) => {
  if (point > 0) {
    if (compare < point) {
      compare = point;
      return "#0DAD8D";
    } else {
      compare = point;
      return "#ace0d8";
    }
  } else if (point < 0) {
    if (compare < point) {
      compare = point;
      return "#e9c0bb";
    } else {
      compare = point;
      return "#F15B46";
    }
  }
};

// split the data set into ohlc and Volume
const ohlc_and_Volume = (candlestick_data) => {
  try {
    if (counter_for_Nifty_3min == 0) {
      counter_for_Nifty_3min += 1;
      ohlc = [];
      Volume = [];
      dataLength = candlestick_data.length;
      console.log(dataLength);

      let First_candle_time = parseFloat(
        moment.unix(parseFloat(candlestick_data[0][0])).format("h.mm")
      );
      console.log("First_candle_time = " + First_candle_time);
      let First_Histo_time = parseFloat(
        moment.unix(Array_1[0][0]).format("h.mm")
      );
      console.log("First_Histo_time = " + First_Histo_time);

      if (First_candle_time < First_Histo_time) {
        console.log("start from First_candle_time");
        console.log("Add to Histogram");
        console.log(First_Histo_time - First_candle_time);
        var start = moment
          .unix(parseFloat(candlestick_data[0][0]))
          .format("h:mm");
        var end = moment.unix(Array_1[0][0]).format("h:mm");

        var mins = moment
          .utc(moment(end, "h:mm:").diff(moment(start, "h:mm")))
          .format("mm");
        console.log("mins = ", mins);

        How_many_times_addition = Math.round(parseFloat(mins) / 3) - 1;
        console.log("How_many_times_addition = " + How_many_times_addition);
        Dummy = [];
        Dummy_1 = [];
        for (var i = 0; i < How_many_times_addition; i++) {
          Dummy.push(parseFloat(candlestick_data[i + 1][0]), 0);
          Dummy_1.push(Dummy);
          Dummy = [];
          console.log(Dummy_1);
        }
        for (var i = 0; i < Array_1.length; i++) {
          Dummy_1.push(Array_1[i]);
        }
        console.log(Dummy_1);
        Array_1 = [];
        Array_1 = Dummy_1;
      } else if (First_candle_time >= First_Histo_time) {
        Dummy_1 = [];
        console.log("start from First_Histo_time");
        console.log("Remove from Histogram");
        var end = moment
          .unix(parseFloat(candlestick_data[0][0]))
          .format("h:mm");
        var start = moment.unix(Array_1[0][0]).format("h:mm");

        var mins = moment
          .utc(moment(end, "h:mm:").diff(moment(start, "h:mm")))
          .format("mm");
        console.log("mins = ", mins);

        How_many_times_addition = Math.round(parseFloat(mins) / 3) + 1;
        console.log("How_many_times_addition = " + How_many_times_addition);
        for (var i = How_many_times_addition; i < Array_1.length; i++) {
          Dummy_1.push(Array_1[i]);
        }
        Array_1 = [];
        Array_1 = Dummy_1;
        console.log(Array_1);
      }

      let Last_candle_time = parseFloat(
        moment
          .unix(parseFloat(candlestick_data[candlestick_data.length - 1][0]))
          .format("h.mm")
      );
      console.log("Last_candle_time = " + Last_candle_time);
      let Last_Histo_time = parseFloat(
        moment.unix(Array_1[Array_1.length - 1][0]).format("h.mm")
      );
      console.log("Last_Histo_time = " + Last_Histo_time);

      if (Last_candle_time >= Last_Histo_time) {
        console.log(Last_candle_time, Last_Histo_time);
        console.log("Add to Histogram");
        console.log(Last_Histo_time + Last_candle_time);

        var end = moment
          .unix(parseFloat(candlestick_data[candlestick_data.length - 1][0]))
          .format("h:mm");
        var start = moment.unix(Array_1[Array_1.length - 1][0]).format("h:mm");

        var mins = moment
          .utc(moment(end, "h:mm:").diff(moment(start, "h:mm")))
          .format("mm");
        console.log("mins = ", mins);

        How_many_times_addition = Math.round(parseFloat(mins) / 3) + 1;
        console.log("How_many_times_addition = " + How_many_times_addition);
        Dummy = [];
        Dummy_1 = [];
        sample = [];
        sample = Array_1;
        len = sample.length + How_many_times_addition - 1;
        for (var i = sample.length - 1; i < len; i++) {
          Dummy.push(parseFloat(sample[i][0]) + 180, 0);
          sample.push(Dummy);
          Dummy = [];
          console.log(sample[sample.length - 1]);
        }
        Array_1 = sample;
        console.log(Array_1);
      } else if (Last_candle_time < Last_Histo_time) {
        Dummy_1 = [];
        console.log("start from Last_Histo_time");
        console.log("Remove from Histogram");
        console.log("Last_candle_time = " + Last_candle_time);
        console.log("Last_Histo_time = " + Last_Histo_time);

        var start = moment
          .unix(parseFloat(candlestick_data[candlestick_data.length - 1][0]))
          .format("h:mm");
        var end = moment.unix(Array_1[Array_1.length - 1][0]).format("h:mm");

        var mins = moment
          .utc(moment(end, "h:mm:").diff(moment(start, "h:mm")))
          .format("mm");
        console.log("mins = ", mins);

        How_many_times_subtraction = Math.round(parseFloat(mins) / 3) - 1;
        console.log(
          "How_many_times_subtraction = " + How_many_times_subtraction
        );
        for (var i = 0; i < How_many_times_subtraction; i++) {
          Array_1.pop();
          console.log(Array_1);
        }
      }

      for (var i = 0; i < dataLength; i += 1) {
        // console.log(i);
        ohlc.push([
          parseFloat(Array_1[i][0]), // the date
          parseFloat(candlestick_data[i][1]), // open
          parseFloat(candlestick_data[i][2]), // high
          parseFloat(candlestick_data[i][3]), // low
          parseFloat(candlestick_data[i][4]), // close
        ]);
      }
      Time = parseFloat(Array_1[Array_1.length - 1]) + 180;
      for (var i = dataLength; i < 125; i += 1) {
        temp_time = moment.unix(Time).format("HH.mm");
        temp_time = parseFloat(temp_time);
        // console.log(temp_time)
        if (temp_time <= 15.3) {
          ohlc.push([
            parseFloat(Time), // the date
            parseFloat(NaN), // open
            parseFloat(NaN), // high
            parseFloat(NaN), // low
            parseFloat(NaN), // close
          ]);
        }
        Time = Time + 180;
      }

      ohlc_temp = ohlc;
      // adding NaN before the data START --> FOR CANDLESTICK
      if (ohlc.length < 125) {
        ohlc_new = [];
        prev_time = moment.unix(ohlc[0][0]).format("HH.mm");
        prev_time = parseFloat(prev_time);
        Timestamp = parseFloat(ohlc[0][0]);
        while (prev_time > 9.18) {
          Timestamp = Timestamp - 180;
          ohlc_new.push([
            parseFloat(Timestamp), // the date
            parseFloat(NaN), // open
            parseFloat(NaN), // high
            parseFloat(NaN), // low
            parseFloat(NaN), // close
          ]);
          prev_time = moment.unix(Timestamp).format("HH.mm");
          prev_time = parseFloat(prev_time);
        }

        ohlc_new_1 = [];
        for (var i = ohlc_new.length - 1; i >= 0; i--) {
          ohlc_new_1.push(ohlc_new[i]);
        }
        for (var i = 0; i < ohlc.length; i++) {
          ohlc_new_1.push(ohlc[i]);
        }
        ohlc = ohlc_new_1;
      }

      for (var i = 0; i < Array_1.length; i++) {
        Volume.push({
          x: parseFloat(Array_1[i][0]), // the date
          y: parseFloat(Array_1[i][1]), // the Volume
          color: VolumeBarColor(parseFloat(Array_1[i][1])),
        });
      }
      Time = parseFloat(Array_1[Array_1.length - 1]) + 180;
      for (var i = dataLength; i < 125; i += 1) {
        var temp_time = moment.unix(Time).format("HH.mm");
        temp_time = parseFloat(temp_time);
        if (temp_time <= 15.3) {
          Volume.push({
            x: parseFloat(Time), // the date
            y: parseFloat(NaN), // the Volume
            color: VolumeBarColor(parseFloat(0)),
          });
        }
        Time = Time + 180;
      }

      Volume_temp = Volume;
      // adding NaN before the data START --> FOR VOLUME
      if (Volume.length < 125) {
        Volume_new = [];
        prev_time = moment.unix(Volume[0]["x"]).format("HH.mm");
        prev_time = parseFloat(prev_time);
        Timestamp = parseFloat(Volume[0]["x"]);
        while (prev_time > 9.18) {
          Timestamp = Timestamp - 180;
          Volume_new.push({
            x: parseFloat(Timestamp), // the date
            y: parseFloat(NaN), // the Volume
            color: VolumeBarColor(parseFloat(0)),
          });
          prev_time = moment.unix(Timestamp).format("HH.mm");
          prev_time = parseFloat(prev_time);
        }

        Volume_new_1 = [];
        for (var i = Volume_new.length - 1; i >= 0; i--) {
          Volume_new_1.push(Volume_new[i]);
        }
        for (var i = 0; i < Volume.length; i++) {
          Volume_new_1.push(Volume[i]);
        }

        Volume = Volume_new_1;
      }
      console.log("OHLC AND VOLUME FUNCTION CALL");
    }
  } catch (error) {
    console.error();
    ohlc = [];
    Volume = [];
    Array_1 = [
      [0, 0],
      [0, 0],
    ];
    for (var i = 0; i < 2; i += 1) {
      ohlc.push([
        parseFloat($.now()), // the date
        parseFloat(NaN), // open
        parseFloat(NaN), // high
        parseFloat(NaN), // low
        parseFloat(NaN), // close
      ]);
    }
    for (var i = 0; i < 2; i++) {
      Volume.push({
        x: parseFloat($.now()), // the date
        y: parseFloat(NaN), // the Volume
      });
    }
  }
};

// Chart Update function
const update_all_chart = (title, ohlc, Volume) => {
  highchart.update({
    tooltip: {
      split: true,
      formatter: function () {
        tooltipArray = "";
        return tooltipArray;
      },
    },
    series: [
      {
        type: "candlestick",
        name: "AAPL",
        data: ohlc,
        dataGrouping: {
          enabled: false,
        },
      },
      {
        type: "column",
        name: "Volume",
        data: Volume,
        yAxis: 1,
        dataGrouping: {
          enabled: false,
        },
      },
    ],
  }),
    chart_2.updateSeries([
      {
        data: HeatMap,
      },
    ]);
};

// function for 15min data
const ohlc_and_Volume_15min = (candlestick_data) => {
  try {
    if (counter_for_Nifty_15min == 0) {
      counter_for_Nifty_15min += 1;
      candlestick_data_15min = []; // for Candlestick
      sample = [];
      console.log("ohlc: ", ohlc);
      numberArray_1 = ohlc_temp;
      let Quotient = Math.trunc(candlestick_data.length / 5);
      let Remainder = candlestick_data.length % 5;
      let Last_i_position = Quotient * 5;
      console.log("Last i position = ", Last_i_position);
      for (var i = 0; i < candlestick_data.length; i++) {
        sample.push(numberArray_1[i][0], numberArray_1[i][1]);
        for (var j = 2; j < 4; j++) {
          // console.log('i = ', i)
          // console.log('j = ', j)
          if (j == 3) {
            if (i == Last_i_position) {
              if (Remainder == 1) {
                dummy_i = i;
                i = Last_i_position;
                // console.log('Remainder = ', Remainder)
                sample.push(numberArray_1[i][j]);
                i = dummy_i;
              } else if (Remainder == 2) {
                dummy_i = i;
                i = Last_i_position;
                // console.log('Remainder = ', Remainder)
                if (numberArray_1[i][j] <= numberArray_1[i + 1][j]) {
                  console.log("entered in if");
                  sample.push(numberArray_1[i][j]);
                } else if (numberArray_1[i + 1][j] <= numberArray_1[i][j]) {
                  console.log("entered in else");
                  sample.push(numberArray_1[i + 1][j]);
                }
                i = dummy_i;
              } else if (Remainder == 3) {
                dummy_i = i;
                i = Last_i_position;
                // console.log('Remainder = ', Remainder)
                if (
                  numberArray_1[i][j] <= numberArray_1[i + 1][j] &&
                  numberArray_1[i][j] <= numberArray_1[i + 2][j]
                ) {
                  sample.push(numberArray_1[i][j]);
                } else if (
                  numberArray_1[i + 1][j] <= numberArray_1[i][j] &&
                  numberArray_1[i + 1][j] <= numberArray_1[i + 2][j]
                ) {
                  sample.push(numberArray_1[i + 1][j]);
                } else if (
                  numberArray_1[i + 2][j] <= numberArray_1[i][j] &&
                  numberArray_1[i + 2][j] <= numberArray_1[i + 1][j]
                ) {
                  sample.push(numberArray_1[i + 2][j]);
                }
                i = dummy_i;
              } else if (Remainder == 4) {
                // console.log('Remainder = ', Remainder)
                if (
                  numberArray_1[i][j] <= numberArray_1[i + 1][j] &&
                  numberArray_1[i][j] <= numberArray_1[i + 2][j] &&
                  numberArray_1[i][j] <= numberArray_1[i + 3][j]
                ) {
                  sample.push(numberArray_1[i][j]);
                } else if (
                  numberArray_1[i + 1][j] <= numberArray_1[i][j] &&
                  numberArray_1[i + 1][j] <= numberArray_1[i + 2][j] &&
                  numberArray_1[i + 1][j] <= numberArray_1[i + 3][j]
                ) {
                  sample.push(numberArray_1[i + 1][j]);
                } else if (
                  numberArray_1[i + 2][j] <= numberArray_1[i][j] &&
                  numberArray_1[i + 2][j] <= numberArray_1[i + 1][j] &&
                  numberArray_1[i + 2][j] <= numberArray_1[i + 3][j]
                ) {
                  sample.push(numberArray_1[i + 2][j]);
                } else if (
                  numberArray_1[i + 3][j] <= numberArray_1[i][j] &&
                  numberArray_1[i + 3][j] <= numberArray_1[i + 1][j] &&
                  numberArray_1[i + 3][j] <= numberArray_1[i + 2][j]
                ) {
                  sample.push(numberArray_1[i + 3][j]);
                }
              }
            } else {
              if (
                numberArray_1[i][j] <= numberArray_1[i + 1][j] &&
                numberArray_1[i][j] <= numberArray_1[i + 2][j] &&
                numberArray_1[i][j] <= numberArray_1[i + 3][j] &&
                numberArray_1[i][j] <= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i][j]);
              } else if (
                numberArray_1[i + 1][j] <= numberArray_1[i][j] &&
                numberArray_1[i + 1][j] <= numberArray_1[i + 2][j] &&
                numberArray_1[i + 1][j] <= numberArray_1[i + 3][j] &&
                numberArray_1[i + 1][j] <= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i + 1][j]);
              } else if (
                numberArray_1[i + 2][j] <= numberArray_1[i][j] &&
                numberArray_1[i + 2][j] <= numberArray_1[i + 1][j] &&
                numberArray_1[i + 2][j] <= numberArray_1[i + 3][j] &&
                numberArray_1[i + 2][j] <= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i + 2][j]);
              } else if (
                numberArray_1[i + 3][j] <= numberArray_1[i][j] &&
                numberArray_1[i + 3][j] <= numberArray_1[i + 1][j] &&
                numberArray_1[i + 3][j] <= numberArray_1[i + 2][j] &&
                numberArray_1[i + 3][j] <= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i + 3][j]);
              } else if (
                numberArray_1[i + 4][j] <= numberArray_1[i][j] &&
                numberArray_1[i + 4][j] <= numberArray_1[i + 1][j] &&
                numberArray_1[i + 4][j] <= numberArray_1[i + 2][j] &&
                numberArray_1[i + 4][j] <= numberArray_1[i + 3][j]
              ) {
                sample.push(numberArray_1[i + 4][j]);
              }
            }
          } else if (j == 2) {
            if (i == Last_i_position) {
              if (Remainder == 1) {
                dummy_i = i;
                i = Last_i_position;
                // console.log('Remainder = ', Remainder)
                sample.push(numberArray_1[i][j]);
                i = dummy_i;
              } else if (Remainder == 2) {
                dummy_i = i;
                i = Last_i_position;
                // console.log('Remainder = ', Remainder)
                if (numberArray_1[i][j] >= numberArray_1[i + 1][j]) {
                  console.log("entered in if");
                  sample.push(numberArray_1[i][j]);
                } else if (numberArray_1[i + 1][j] >= numberArray_1[i][j]) {
                  console.log("entered in else");
                  sample.push(numberArray_1[i + 1][j]);
                }
                i = dummy_i;
              } else if (Remainder == 3) {
                dummy_i = i;
                i = Last_i_position;
                // console.log('Remainder = ', Remainder)
                if (
                  numberArray_1[i][j] >= numberArray_1[i + 1][j] &&
                  numberArray_1[i][j] >= numberArray_1[i + 2][j]
                ) {
                  sample.push(numberArray_1[i][j]);
                } else if (
                  numberArray_1[i + 1][j] >= numberArray_1[i][j] &&
                  numberArray_1[i + 1][j] >= numberArray_1[i + 2][j]
                ) {
                  sample.push(numberArray_1[i + 1][j]);
                } else if (
                  numberArray_1[i + 2][j] >= numberArray_1[i][j] &&
                  numberArray_1[i + 2][j] >= numberArray_1[i + 1][j]
                ) {
                  sample.push(numberArray_1[i + 2][j]);
                }
                i = dummy_i;
              } else if (Remainder == 4) {
                // console.log('Remainder = ', Remainder)
                if (
                  numberArray_1[i][j] >= numberArray_1[i + 1][j] &&
                  numberArray_1[i][j] >= numberArray_1[i + 2][j] &&
                  numberArray_1[i][j] >= numberArray_1[i + 3][j]
                ) {
                  sample.push(numberArray_1[i][j]);
                } else if (
                  numberArray_1[i + 1][j] >= numberArray_1[i][j] &&
                  numberArray_1[i + 1][j] >= numberArray_1[i + 2][j] &&
                  numberArray_1[i + 1][j] >= numberArray_1[i + 3][j]
                ) {
                  sample.push(numberArray_1[i + 1][j]);
                } else if (
                  numberArray_1[i + 2][j] >= numberArray_1[i][j] &&
                  numberArray_1[i + 2][j] >= numberArray_1[i + 1][j] &&
                  numberArray_1[i + 2][j] >= numberArray_1[i + 3][j]
                ) {
                  sample.push(numberArray_1[i + 2][j]);
                } else if (
                  numberArray_1[i + 3][j] >= numberArray_1[i][j] &&
                  numberArray_1[i + 3][j] >= numberArray_1[i + 1][j] &&
                  numberArray_1[i + 3][j] >= numberArray_1[i + 2][j]
                ) {
                  sample.push(numberArray_1[i + 3][j]);
                }
              }
            } else {
              if (
                numberArray_1[i][j] >= numberArray_1[i + 1][j] &&
                numberArray_1[i][j] >= numberArray_1[i + 2][j] &&
                numberArray_1[i][j] >= numberArray_1[i + 3][j] &&
                numberArray_1[i][j] >= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i][j]);
              } else if (
                numberArray_1[i + 1][j] >= numberArray_1[i][j] &&
                numberArray_1[i + 1][j] >= numberArray_1[i + 2][j] &&
                numberArray_1[i + 1][j] >= numberArray_1[i + 3][j] &&
                numberArray_1[i + 1][j] >= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i + 1][j]);
              } else if (
                numberArray_1[i + 2][j] >= numberArray_1[i][j] &&
                numberArray_1[i + 2][j] >= numberArray_1[i + 1][j] &&
                numberArray_1[i + 2][j] >= numberArray_1[i + 3][j] &&
                numberArray_1[i + 2][j] >= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i + 2][j]);
              } else if (
                numberArray_1[i + 3][j] >= numberArray_1[i][j] &&
                numberArray_1[i + 3][j] >= numberArray_1[i + 1][j] &&
                numberArray_1[i + 3][j] >= numberArray_1[i + 2][j] &&
                numberArray_1[i + 3][j] >= numberArray_1[i + 4][j]
              ) {
                sample.push(numberArray_1[i + 3][j]);
              } else if (
                numberArray_1[i + 4][j] >= numberArray_1[i][j] &&
                numberArray_1[i + 4][j] >= numberArray_1[i + 1][j] &&
                numberArray_1[i + 4][j] >= numberArray_1[i + 2][j] &&
                numberArray_1[i + 4][j] >= numberArray_1[i + 3][j]
              ) {
                sample.push(numberArray_1[i + 4][j]);
              }
            }
          }
        }
        if (i < Last_i_position) {
          // console.log("i=", i);
          sample.push(numberArray_1[i + 4][4]);
          candlestick_data_15min.push(sample);
          sample = [];
          i = i + 4;
          console.log(candlestick_data_15min);
          ohlc_temp_15min = candlestick_data_15min;
        } else if (i == Last_i_position) {
          console.log("u r on last i position");
          if (Remainder == 1) {
            dummy_i_new = i;
            i = Last_i_position;
            sample.push(numberArray_1[i][4]);
            candlestick_data_15min.push(sample);
            i = dummy_i_new;
          } else if (Remainder == 2) {
            dummy_i_new = i;
            i = Last_i_position;
            sample.push(numberArray_1[i + 1][4]);
            candlestick_data_15min.push(sample);
            i = dummy_i_new;
          } else if (Remainder == 3) {
            dummy_i_new = i;
            i = Last_i_position;
            sample.push(numberArray_1[i + 2][4]);
            candlestick_data_15min.push(sample);
            i = dummy_i_new;
          } else if (Remainder == 4) {
            dummy_i_new = i;
            i = Last_i_position;
            sample.push(numberArray_1[i + 3][4]);
            candlestick_data_15min.push(sample);
            i = dummy_i_new;
          } // console.log("i
          console.log("15min Time Frame");
          console.log(candlestick_data_15min);
          i = i + 5;
          console.log(candlestick_data_15min);
          ohlc_temp_15min = candlestick_data_15min;
        }
      }
      ohlc = ohlc_temp_15min;
      ohlc_temp = ohlc;
      if (ohlc.length < 25) {
        ohlc_new = [];
        prev_time = moment.unix(ohlc[0][0]).format("HH.mm");
        prev_time = parseFloat(prev_time);
        Timestamp = parseFloat(ohlc[0][0]);
        while (prev_time > 9.18) {
          Timestamp = Timestamp - 900;
          ohlc_new.push([
            parseFloat(Timestamp), // the date
            parseFloat(NaN), // open
            parseFloat(NaN), // high
            parseFloat(NaN), // low
            parseFloat(NaN), // close
          ]);
          prev_time = moment.unix(Timestamp).format("HH.mm");
          prev_time = parseFloat(prev_time);
        }

        ohlc_new_1 = [];
        for (var i = ohlc_new.length - 1; i >= 0; i--) {
          ohlc_new_1.push(ohlc_new[i]);
        }
        for (var i = 0; i < ohlc.length; i++) {
          ohlc_new_1.push(ohlc[i]);
        }
        ohlc = ohlc_new_1;
      }

      Volume_15min = [];
      sum = 0;
      let Quotient_1 = Math.trunc(Array_1.length / 5);
      let Remainder_1 = Array_1.length % 5;
      let Last_i_position_1 = Quotient_1 * 5;
      for (var i = 0; i < Array_1.length; i++) {
        if (i != Last_i_position_1) {
          vol_15min =
            parseFloat(Array_1[i][1]) +
            parseFloat(Array_1[i + 1][1]) +
            parseFloat(Array_1[i + 2][1]) +
            parseFloat(Array_1[i + 3][1]) +
            parseFloat(Array_1[i + 4][1]);
          Volume_15min.push({
            x: parseFloat(Array_1[i][0]), // the date
            y: parseFloat(vol_15min), // the Volume
            color: VolumeBarColor(parseFloat(vol_15min)),
          });
          i = i + 4;
        } else if (i == Last_i_position_1) {
          for (var j = i; j < i + Remainder_1; j++) {
            sum = sum + Array_1[j][1];
          }
          Volume_15min.push({
            x: parseFloat(Array_1[i][0]), // the date
            y: parseFloat(sum), // the Volume
            color: VolumeBarColor(parseFloat(sum)),
          });
          i = i + 4;
        }
      }
      console.log(Volume_15min);
      Volume = Volume_15min;
      sum = 0;
      Volume_temp = Volume;
      if (Volume.length < 25) {
        Volume_new = [];
        prev_time = moment.unix(Volume[0]["x"]).format("HH.mm");
        prev_time = parseFloat(prev_time);
        Timestamp = parseFloat(Volume[0]["x"]);
        while (prev_time > 9.18) {
          Timestamp = Timestamp - 900;
          Volume_new.push({
            x: parseFloat(Timestamp), // the date
            y: parseFloat(NaN), // the Volume
            color: VolumeBarColor(parseFloat(0)),
          });
          prev_time = moment.unix(Timestamp).format("HH.mm");
          prev_time = parseFloat(prev_time);
        }

        Volume_new_1 = [];
        for (var i = Volume_new.length - 1; i >= 0; i--) {
          Volume_new_1.push(Volume_new[i]);
        }
        for (var i = 0; i < Volume.length; i++) {
          Volume_new_1.push(Volume[i]);
        }
        Volume = Volume_new_1;
      }
    }
  } catch (error) {
    console.error();
    ohlc = [];
    Volume = [];
    for (var i = 0; i < 2; i += 1) {
      ohlc.push([
        parseFloat($.now()), // the date
        parseFloat(NaN), // open
        parseFloat(NaN), // high
        parseFloat(NaN), // low
        parseFloat(NaN), // close
      ]);
    }
    for (var i = 0; i < 2; i++) {
      Volume.push({
        x: parseFloat($.now()), // the date
        y: parseFloat(NaN), // the Volume
      });
    }
  }
};

const ohlc_and_Volume_15min_addition = (Addition, length) => {
  try {
    Time = parseFloat(ohlc[ohlc.length - 1]) + Addition;
    for (var i = ohlc.length; i < length; i++) {
      temp_time = moment.unix(Time).format("HH.mm");
      temp_time = parseFloat(temp_time);
      // console.log(temp_time)
      if (temp_time <= 15.3) {
        ohlc.push([
          parseFloat(Time), // the date
          parseFloat(NaN), // open
          parseFloat(NaN), // high
          parseFloat(NaN), // low
          parseFloat(NaN), // close
        ]);
      }
      Time = Time + Addition;
    }
    Time = parseFloat(Volume[Volume.length - 1].x) + Addition;
    for (var i = Volume.length; i < length; i += 1) {
      var temp_time = moment.unix(Time).format("HH.mm");
      temp_time = parseFloat(temp_time);
      if (temp_time <= 15.3) {
        Volume.push({
          x: parseFloat(Time), // the date
          y: parseFloat(NaN), // the Volume
          color: VolumeBarColor(parseFloat(0)),
        });
      }
      Time = Time + Addition;
    }
  } catch (error) {
    console.error();
    ohlc = [];
    Volume = [];
    for (var i = 0; i < 2; i += 1) {
      ohlc.push([
        parseFloat($.now()), // the date
        parseFloat(NaN), // open
        parseFloat(NaN), // high
        parseFloat(NaN), // low
        parseFloat(NaN), // close
      ]);
    }
    for (var i = 0; i < 2; i++) {
      Volume.push({
        x: parseFloat($.now()), // the date
        y: parseFloat(NaN), // the Volume
      });
    }
  }
};

// function for 30min data
const ohlc_and_Volume_30min = () => {
  try {
    if (counter_for_Nifty_30min == 0) {
      counter_for_Nifty_30min += 0;
      console.log("30 MIN FUNCTION CALL");
      counter_for_Nifty_30min += 1;
      ohlc_and_Volume_15min(Candle_data);
      console.log("ohlc = ", ohlc);
      candlestick_data_30min = []; // for Candlestick
      sample_1 = [];
      ohlc = ohlc_temp
      let Quotient_New = Math.trunc(ohlc.length / 2);
      let Remainder_New = ohlc.length % 2;
      let Last_i_position_New = Quotient_New * 2;
      console.log("Last_i_position_New:", Last_i_position_New);
      console.log("Quotient_New = ", Quotient_New);
      console.log("ohlc = ", ohlc);
      console.log("ohlc length:", ohlc.length);
      data_length = ohlc.length;
      for (var i = 0; i < data_length; i++) {
        console.log("going in the loop for", i, "times");
        sample_1.push(ohlc[i][0], ohlc[i][1]);
        for (var j = 2; j < 4; j++) {
          // console.log("i = ", i);
          // console.log('j = ', j)
          if (j == 3) {
            if (i == Last_i_position_New) {
              if (Remainder_New == 1) {
                dummy_i = i;
                i = Last_i_position_New;
                // console.log('Remainder = ', Remainder)
                sample_1.push(ohlc[i][j]);
                i = dummy_i;
              }
            } else {
              if (ohlc[i][j] <= ohlc[i + 1][j]) {
                sample_1.push(ohlc[i][j]);
              } else if (ohlc[i + 1][j] <= ohlc[i][j]) {
                sample_1.push(ohlc[i + 1][j]);
              }
            }
          } else if (j == 2) {
            if (i == Last_i_position_New) {
              if (Remainder_New == 1) {
                dummy_i = i;
                i = Last_i_position_New;
                // console.log('Remainder = ', Remainder)
                sample_1.push(ohlc[i][j]);
                i = dummy_i;
              }
            } else {
              if (ohlc[i][j] >= ohlc[i + 1][j]) {
                sample_1.push(ohlc[i][j]);
              } else if (ohlc[i + 1][j] >= ohlc[i][j]) {
                sample_1.push(ohlc[i + 1][j]);
              }
            }
          }
        }
        if (i < Last_i_position_New) {
          // console.log('i=',i)
          sample_1.push(ohlc[i + 1][4]);
          candlestick_data_30min.push(sample_1);
          sample_1 = [];
          i = i + 1;
          console.log(candlestick_data_30min);
          ohlc_1 = candlestick_data_30min;
        } else if (i == Last_i_position_New) {
          if (Remainder_New == 1) {
            dummy_i_new = i;
            i = Last_i_position_New;
            sample_1.push(ohlc[i][4]);
            candlestick_data_30min.push(sample_1);
            i = dummy_i_new;
          }
          console.log("30min Time Frame");
          console.log(candlestick_data_30min);
          // i = i + 2
          ohlc_1 = candlestick_data_30min;
        }
      }
      ohlc = ohlc_1;
      if (ohlc.length < 13) {
        ohlc_temp = ohlc;
        ohlc_new = [];
        prev_time = moment.unix(ohlc[0][0]).format("HH.mm");
        prev_time = parseFloat(prev_time);
        Timestamp = parseFloat(ohlc[0][0]);
        while (prev_time > 9.18) {
          Timestamp = Timestamp - 1800;
          ohlc_new.push([
            parseFloat(Timestamp), // the date
            parseFloat(NaN), // open
            parseFloat(NaN), // high
            parseFloat(NaN), // low
            parseFloat(NaN), // close
          ]);
          prev_time = moment.unix(Timestamp).format("HH.mm");
          prev_time = parseFloat(prev_time);
        }

        ohlc_new_1 = [];
        for (var i = ohlc_new.length - 1; i >= 0; i--) {
          ohlc_new_1.push(ohlc_new[i]);
        }
        for (var i = 0; i < ohlc.length; i++) {
          ohlc_new_1.push(ohlc[i]);
        }
        ohlc = ohlc_new_1;
      }

      Volume_2_exp_2_30min = [];
      sum = 0;
      let Quotient_1 = Math.trunc(Array_1.length / 10);
      let Remainder_1 = Array_1.length % 10;
      let Last_i_position_1 = Quotient_1 * 10;
      for (var i = 0; i < Array_1.length; i++) {
        if (i != Last_i_position_1) {
          sum = 0;
          for (var j = i; j < i + 10; j++) {
            sum = sum + Array_1[j][1];
          }
          Volume_2_exp_2_30min.push({
            x: parseFloat(Array_1[i][0]), // the date
            y: parseFloat(sum), // the Volume
            color: VolumeBarColor(parseFloat(sum)),
          });
          i = i + 9;
        } else if (i == Last_i_position_1) {
          sum = 0;
          for (var j = i; j < i + Remainder_1; j++) {
            sum = sum + Array_1[j][1];
          }
          Volume_2_exp_2_30min.push({
            x: parseFloat(Array_1[i][0]), // the date
            y: parseFloat(sum), // the Volume
            color: VolumeBarColor(parseFloat(sum)),
          });
          i = i + 9;
          sum = 0;
        }
      }
      Volume = Volume_2_exp_2_30min;

      if (Volume.length < 13) {
        Volume_temp = Volume;
        Volume_new = [];
        prev_time = moment.unix(Volume[0]["x"]).format("HH.mm");
        prev_time = parseFloat(prev_time);
        Timestamp = parseFloat(Volume[0]["x"]);
        while (prev_time > 9.18) {
          Timestamp = Timestamp - 1800;
          Volume_new.push({
            x: parseFloat(Timestamp), // the date
            y: parseFloat(NaN), // the Volume
            color: VolumeBarColor(parseFloat(0)),
          });
          prev_time = moment.unix(Timestamp).format("HH.mm");
          prev_time = parseFloat(prev_time);
        }

        Volume_new_1 = [];
        for (var i = Volume_new.length - 1; i >= 0; i--) {
          Volume_new_1.push(Volume_new[i]);
        }
        for (var i = 0; i < Volume.length; i++) {
          Volume_new_1.push(Volume[i]);
        }
        Volume = Volume_new_1;
      }
    }
  } catch (error) {
    console.error();
    ohlc = [];
    Volume = [];
    for (var i = 0; i < 2; i += 1) {
      ohlc.push([
        parseFloat($.now()), // the date
        parseFloat(NaN), // open
        parseFloat(NaN), // high
        parseFloat(NaN), // low
        parseFloat(NaN), // close
      ]);
    }
    for (var i = 0; i < 2; i++) {
      Volume.push({
        x: parseFloat($.now()), // the date
        y: parseFloat(NaN), // the Volume
      });
    }
  }
};

$(document).ready(function () {
  call_check_access_API()
  check_access();

  setInterval(function () { check_message(); }, 25000);
  setInterval(function () { if (dtime_clock() == false) { return; } livequotei(); }, 44000);

  try {
    document.querySelector("#updates_btn").addEventListener("click", function () {
      chat_update_manual();
    });
  } catch (e) { }

  $.ajaxSetup({ async: false }); // to stop async

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

  check_message();
  livequotei();

  console.log = function () { };

  a = $("#Candlestick_container").height();
  console.log(a);
  b = $("#Top_Bar").height();
  console.log(b);
  c = $("#Dials_Rows").height();
  console.log(c);
  d = a - (c + $(".money_flux").height());
  console.log("d = ", d);
  e = a - (c + $(".money_flux").height()) + 150;
  console.log("e = ", e);
  f = $(document).width();
  console.log("width = ", f);

  compare = 0;
  counter_for_Nifty_3min = 0;
  counter_for_Nifty_15min = 0;
  counter_for_Nifty_30min = 0;
  console.log("ready!");

  call_Expiry_API("NIFTY 50");
  call_Candlestick_API("NIFTY 50");
  call_Volume_API("NIFTY 50", Nifty_exp_1);
  call_Heat_Map_API("Nifty50");
  call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
  calculation_for_Exp_1(Volume_data);
  ohlc_and_Volume(Candle_data);

  // create the chart
  highchart = Highcharts.stockChart("chart", {
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: "#000000",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      candlestick: {
        color: "red",
        upColor: "green",
      },
      Volume: {
        color: "red",
        upColor: "green",
      },
    },
    chart: {
      backgroundColor: "#1c1c1c",
      zooming: {
        mouseWheel: false,
      },
    },

    toolbar: {
      enabled: false,
    },
    yAxis: [
      {
        labels: {
          formatter: function () {
            return "";
          },
        },
        top: "8%",
        height: "52%",
        lineWidth: 0,
        gridLineWidth: 0,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          formatter: function () {
            return "";
          },
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 0,
        gridLineWidth: 0,
      },
    ],
    tooltip: {
      split: true,
      formatter: function () {
        tooltipArray = "";
        return tooltipArray;
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return moment.unix(this.value).format("h:mm a");
        },
        style: {
          color: "#ffffff", // Set the x-axis labels color to white
        },
      },
      lineColor: "#ffffff",
    },
    series: [
      {
        type: "candlestick",
        name: "AAPL",
        data: ohlc,
        dataGrouping: {
          enabled: false,
        },
      },
      {
        type: "column",
        name: "Volume",
        data: Volume,
        yAxis: 1,
        dataGrouping: {
          enabled: false,
        },
      },
    ],
  });

  // Apexchart Bar [Bottom Right Chart]
  var options = {
    series: [
      {
        data: HeatMap,
      },
    ],
    legend: {
      show: false,
    },
    chart: {
      height: d,
      type: "treemap",
      events: {
        dataPointSelection: (event, chartContext, dataPointIndex) => {
          let temp = dataPointIndex["dataPointIndex"];
          let HeatMap_name =
            dataPointIndex["w"]["globals"]["categoryLabels"][temp];
          console.log(HeatMap_name);
          tw_charts(HeatMap_name);
        },
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (text, op) {
        return [text, op.value];
      },
    },
    plotOptions: {
      treemap: {
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: -6,
              to: 0,
              color: "#ff6c6c",
            },
            {
              from: 0.001,
              to: 6,
              color: "#42b142",
            },
          ],
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: e,
            type: "treemap",
            toolbar: {
              show: false,
            },
          },
        },
      },
    ],
  };

  chart_2 = new ApexCharts(document.querySelector("#chart_2"), options);
  chart_2.render();

  // Screen Sizing

  if ($(window).width() < 1500 && $(window).width() > 530) {
    $(".speedometerWrapper-G5piCoZi")
      .removeClass("G5piCoZi")
      .addClass("small-G5piCoZi");
  } else if ($(window).width() < 510 && $(window).width() > 370) {
    $(".speedometerWrapper-G5piCoZi")
      .removeClass("small-G5piCoZi")
      .addClass("G5piCoZi");
  } else if ($(window).width() < 370) {
    $(".speedometerWrapper-G5piCoZi")
      .removeClass("G5piCoZi")
      .addClass("small-G5piCoZi");
  }

  if ($(window).width() > 1500) {
    $(".speedometerWrapper-G5piCoZi")
      .removeClass("small-G5piCoZi")
      .addClass("G5piCoZi");
  } else if ($(window).width() > 510 && $(window).width() < 1500) {
    $(".speedometerWrapper-G5piCoZi")
      .removeClass("G5piCoZi")
      .addClass("small-G5piCoZi");
  }

  $(window).resize(function () {
    if ($(window).width() < 1500 && $(window).width() > 530) {
      $(".speedometerWrapper-G5piCoZi")
        .removeClass("G5piCoZi")
        .addClass("small-G5piCoZi");
    } else if ($(window).width() < 510 && $(window).width() > 370) {
      $(".speedometerWrapper-G5piCoZi")
        .removeClass("small-G5piCoZi")
        .addClass("G5piCoZi");
    } else if ($(window).width() < 370) {
      $(".speedometerWrapper-G5piCoZi")
        .removeClass("G5piCoZi")
        .addClass("small-G5piCoZi");
    }

    if ($(window).width() > 1500) {
      $(".speedometerWrapper-G5piCoZi")
        .removeClass("small-G5piCoZi")
        .addClass("G5piCoZi");
    } else if ($(window).width() > 510 && $(window).width() < 1500) {
      $(".speedometerWrapper-G5piCoZi")
        .removeClass("G5piCoZi")
        .addClass("small-G5piCoZi");
    }
  });

  // On click Function of 5 BUTTONS [NIFTY 50, NIFTY BANK, NIFTY FIN SERVICE, MIDCAP, SENSEX]
  $("#nifty_btn").click(function () {
    $("#Candlestick_title").text("Nifty 50");
    compare = 0;
    counter_for_Nifty_3min = 0;
    $('#nifty_banknifty').show();
    $('#midcap_body_row').hide();
    $("#nifty_btn").addClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#midcap_btn").removeClass("gb_active");
    $("#unAuth_midcap_btn").removeClass("gb_active");
    $("#sensex_btn").removeClass("gb_active");
    $("#unAuth_sensex_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);
    $("#Time_Frame").prop("selectedIndex", 0);
    call_Expiry_API("NIFTY 50");
    call_Candlestick_API("NIFTY 50");
    call_Volume_API("NIFTY 50", Nifty_exp_1);
    call_Heat_Map_API("Nifty50");
    call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
    calculation_for_Exp_1(Volume_data);
    ohlc_and_Volume(Candle_data);
    update_all_chart("Nifty 50", ohlc, Volume);
  });
  $("#bnknifty_btn").click(function () {
    $("#Candlestick_title").text("Nifty Bank");
    compare = 0;
    counter_for_Nifty_3min = 0;
    $('#nifty_banknifty').show();
    $('#midcap_body_row').hide();
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").addClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#midcap_btn").removeClass("gb_active");
    $("#unAuth_midcap_btn").removeClass("gb_active");
    $("#sensex_btn").removeClass("gb_active");
    $("#unAuth_sensex_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);
    $("#Time_Frame").prop("selectedIndex", 0);
    call_Expiry_API("NIFTY BANK");
    call_Candlestick_API("NIFTY BANK");
    call_Volume_API("NIFTY BANK", Nifty_exp_1);
    call_Heat_Map_API("BNF");
    call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
    calculation_for_Exp_1(Volume_data);
    ohlc_and_Volume(Candle_data);
    update_all_chart("Nifty Bank", ohlc, Volume);
  });
  $("#finnifty_btn").click(function () {
    $("#Candlestick_title").text("Nifty Fin Service");
    compare = 0;
    counter_for_Nifty_3min = 0;
    $('#nifty_banknifty').show();
    $('#midcap_body_row').hide();
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").addClass("gb_active");
    $("#midcap_btn").removeClass("gb_active");
    $("#unAuth_midcap_btn").removeClass("gb_active");
    $("#sensex_btn").removeClass("gb_active");
    $("#unAuth_sensex_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);
    $("#Time_Frame").prop("selectedIndex", 0);
    call_Expiry_API("NIFTY FIN SERVICE");
    call_Candlestick_API("NIFTY FIN SERVICE");
    call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
    call_Heat_Map_API("FINNIFTY");
    call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
    calculation_for_Exp_1(Volume_data);
    ohlc_and_Volume(Candle_data);
    update_all_chart("Nifty Fin Service", ohlc, Volume);
  });
  $("#midcap_btn").click(function () {
    $("#Candlestick_title").text("Midcap");
    compare = 0;
    counter_for_Nifty_3min = 0;
    $('#nifty_banknifty').show();
    $('#midcap_body_row').hide();
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#midcap_btn").addClass("gb_active");
    $("#unAuth_midcap_btn").removeClass("gb_active");
    $("#sensex_btn").removeClass("gb_active");
    $("#unAuth_sensex_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);
    $("#Time_Frame").prop("selectedIndex", 0);
    call_Expiry_API("NIFTY MID SELECT");
    call_Candlestick_API("NIFTY MID SELECT");
    call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
    call_Heat_Map_API("MIDCAP");
    call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
    calculation_for_Exp_1(Volume_data);
    ohlc_and_Volume(Candle_data);
    update_all_chart("Nifty Midcap", ohlc, Volume);
  });
  $("#unAuth_midcap_btn").click(function () {
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#midcap_btn").removeClass("gb_active");
    $("#unAuth_midcap_btn").addClass("gb_active");
    $("#sensex_btn").removeClass("gb_active");
    $("#unAuth_sensex_btn").removeClass("gb_active");

    $('#nifty_banknifty').hide();
    $('#midcap_body_row').show();

    $('#span_text_for_unauth').text('Get Midcap and other features for Free by opening Dhan account using our link')
  });
  $("#sensex_btn").click(function () {
    $("#Candlestick_title").text("Sensex");
    compare = 0;
    counter_for_Nifty_3min = 0;
    $('#nifty_banknifty').show();
    $('#midcap_body_row').hide();
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#midcap_btn").removeClass("gb_active");
    $("#unAuth_midcap_btn").removeClass("gb_active");
    $("#sensex_btn").addClass("gb_active");
    $("#unAuth_sensex_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);
    $("#Time_Frame").prop("selectedIndex", 0);
    call_Expiry_API("SENSEX");
    call_Candlestick_API("SENSEX");
    call_Volume_API("SENSEX", Nifty_exp_1);
    call_Heat_Map_API("SENSEX");
    call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
    calculation_for_Exp_1(Volume_data);
    ohlc_and_Volume(Candle_data);
    update_all_chart("Nifty Sensex", ohlc, Volume);
  });
  $("#unAuth_sensex_btn").click(function () {
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#midcap_btn").removeClass("gb_active");
    $("#unAuth_midcap_btn").removeClass("gb_active");
    $("#sensex_btn").removeClass("gb_active");
    $("#unAuth_sensex_btn").addClass("gb_active");

    $('#nifty_banknifty').hide();
    $('#midcap_body_row').show();

    $('#span_text_for_unauth').text('Get Sensex and other features for Free by opening Dhan account using our link');
  });

  //Expiry Change
  $("#Expiry").change(function () {
    var x = $("#Expiry").prop("selectedIndex");
    var y = $("#Time_Frame").prop("selectedIndex");
    // console.log(x, y);
    if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Sensex", ohlc, Volume);
    }
  });

  //Time Frame Change
  $("#Time_Frame").change(function () {
    var x = $("#Expiry").prop("selectedIndex");
    var y = $("#Time_Frame").prop("selectedIndex");
    if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;
      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("sensex", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Sensex", ohlc, Volume);
    }
  });

  setInterval(function () {
    var x = $("#Expiry").prop("selectedIndex");
    var y = $("#Time_Frame").prop("selectedIndex");
    if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY 50");
      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY 50");
      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY BANK");
      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY BANK");
      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY FIN SERVICE");
      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY FIN SERVICE");
      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY MID SELECT");
      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY MID SELECT");
      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("SENSEX");
      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 0) {
      compare = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("SENSEX");
      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY 50");
      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY 50");
      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY BANK");
      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY BANK");
      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY FIN SERVICE");
      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY FIN SERVICE");
      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY MID SELECT");
      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("NIFTY MID SELECT");
      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("SENSEX");
      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 1) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;

      call_Candlestick_API("SENSEX");
      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_15min(Candle_data);
      ohlc_and_Volume_15min_addition(900, 25);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY 50");
      call_Volume_API("NIFTY 50", Nifty_exp_2);
      call_Dial_API("NIFTY 50", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#nifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY 50");
      call_Volume_API("NIFTY 50", Nifty_exp_1);
      call_Dial_API("NIFTY 50", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty 50", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY BANK");
      call_Volume_API("NIFTY BANK", Nifty_exp_2);
      call_Dial_API("NIFTY BANK", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#bnknifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY BANK");
      call_Volume_API("NIFTY BANK", Nifty_exp_1);
      call_Dial_API("NIFTY BANK", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Bank", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY FIN SERVICE");
      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_2);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#finnifty_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY FIN SERVICE");
      call_Volume_API("NIFTY FIN SERVICE", Nifty_exp_1);
      call_Dial_API("NIFTY FIN SERVICE", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Fin Service", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY MID SELECT");
      call_Volume_API("NIFTY MID SELECT", Nifty_exp_2);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#midcap_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("NIFTY MID SELECT");
      call_Volume_API("NIFTY MID SELECT", Nifty_exp_1);
      call_Dial_API("NIFTY MID SELECT", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Nifty Midcap", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 1 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("SENSEX");
      call_Volume_API("SENSEX", Nifty_exp_2);
      call_Dial_API("SENSEX", Nifty_exp_2, Expiry_data[1][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Sensex", ohlc, Volume);
    } else if ($("#sensex_btn").hasClass("gb_active") && x == 0 && y == 2) {
      compare = 0;
      counter_for_Nifty_15min = 0;
      counter_for_Nifty_3min = 0;
      counter_for_Nifty_30min = 0;

      call_Candlestick_API("SENSEX");
      call_Volume_API("SENSEX", Nifty_exp_1);
      call_Dial_API("SENSEX", Nifty_exp_1, Expiry_data[0][1]);
      calculation_for_Exp_1(Volume_data);
      ohlc_and_Volume(Candle_data);
      ohlc_and_Volume_30min();
      ohlc_and_Volume_15min_addition(1800, 13);
      update_all_chart("Sensex", ohlc, Volume);
    }
  }, 180000);

  setInterval(function () {
    if ($("#nifty_btn").hasClass("gb_active")) {
      call_Heat_Map_API("Nifty50");
      chart_2.updateSeries([
        {
          data: HeatMap,
        },
      ]);
    } else if ($("#bnknifty_btn").hasClass("gb_active")) {
      call_Heat_Map_API("BNF");
      chart_2.updateSeries([
        {
          data: HeatMap,
        },
      ]);
    } else if ($("#finnifty_btn").hasClass("gb_active")) {
      call_Heat_Map_API("FINNIFTY");
      chart_2.updateSeries([
        {
          data: HeatMap,
        },
      ]);
    } else if ($("#midcap_btn").hasClass("gb_active")) {
      call_Heat_Map_API("MIDCAP");
      chart_2.updateSeries([
        {
          data: HeatMap,
        },
      ]);
    } else if ($("#sensex_btn").hasClass("gb_active")) {
      call_Heat_Map_API("SENSEX");
      chart_2.updateSeries([
        {
          data: HeatMap,
        },
      ]);
    }
  }, 60000);
});