root = "https://testing.tcistudents.in"
root_1 = "https://ebs.tredcode.com"
route_dhan = "/dhan"
main_route = "/api/admin"             // (Chat Box)
main_route_1 = "/live_price"           // (LIVE PRICE)

// -------------------LOGOUT-----------------------

const rmCookie = (name) => { document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; }

const logout = () => {
  rmCookie("td_token")
  window.location.replace('/')
}

const showLogout = () => {
  $('.navbar-dropdown').toggle()
}


// -------------------SIDEBAR TOGGLER-----------------------

const toggle_sidebar = () => { $("#sidebar").toggleClass("active") }


// -------------------CHAT BOX (MESSAGE BOX)-----------------------
not_audio = new Audio('./sound/notification.wav');

const img_open = (url) => {
  window.open(url)
}

const toggle_updates_window = (flag = false) => {
  if (flag == true) { $(".fixed_updates_window").fadeOut(); return }
  $("#updates_btn img").attr("src", "img/msg.png");
  $("#updates_btn").removeClass("afixed_updates_btn_hover")
  $(".fixed_updates_window").fadeToggle()

  setTimeout(function () {
    $(".fixed_updates_window_body").scrollTop($(".fixed_updates_window_body")[0].scrollHeight);
  }, message_timeout);
}

const push_msg = (msg_str, date) => {
  $(".fixed_updates_window_body").append(msg_str)
}

const clear_msg = () => {
  $(".fixed_updates_window_body > div").remove()
}

const print_signal_data = () => {
  for (var i = (signal_data.length - 1); i >= 0; i--) {
    if (signal_data[i][1] == '') {
      console.log("image not there")
      msg_str = `<div class="chat-message">
                    ${signal_data[i][2]}
                    <span class="chat-time">${moment.unix(signal_data[i][0]).format('YYYY-MM-DD HH:mm')}</span>
                  </div>`
    }
    else if (signal_data[i][2] == '') {
      console.log("text not there")
      msg_str = `<div class="chat-message">
                    <img src="${signal_data[i][1]}" style="width: 200px;height: 200px;" onclick="img_open('${signal_data[i][1]}')">
                    <span class="chat-time">${moment.unix(signal_data[i][0]).format('YYYY-MM-DD HH:mm')}</span>
                  </div>`
    }
    else if (signal_data[i][1] != '' && signal_data[i][2] != '') {
      console.log("image and text both are there")
      msg_str = `<div class="chat-message">
                    <img src="${signal_data[i][1]}" style="width: 200px;height: 200px;" onclick="img_open('${signal_data[i][1]}')">
                    ${signal_data[i][2]}
                    <span class="chat-time">${moment.unix(signal_data[i][0]).format('YYYY-MM-DD HH:mm')}</span>
                  </div>`
    }
    push_msg(msg_str)
  }
}

const call_signal_API = () => {
  $.post(root + main_route + "/get_signal_chat", function (data, status) {
    signal_data = data
    First_counter_for_new_message = false
  }).done(() => {
    print_signal_data()
  }).fail(function (xhr, status, error) {
    // Handle error or failure response
    console.log('Request failed:', error);
    signal_data = []
  });
}

const chat_update_manual = () => {
  clear_msg()
  if (First_counter_for_new_message) {
    call_signal_API()
  }
  else if (counter_for_new_message) {
    call_signal_API()
  }
  else {
    print_signal_data()
  }

  if (counter_for_new_message) {
    counter_for_new_message = false
    $.post(root + main_route + "/unset_signal_self", function (data, status) {
      console.log("data send");
    }).fail(function (xhr, status, error) {
      // Handle error or failure response
      console.log('Request failed:', error);
    })
  }

  setTimeout(function () {
    $(".fixed_updates_window_body").scrollTop($(".fixed_updates_window_body")[0].scrollHeight);
  }, message_timeout);
}

const check_message = () => {
  $.post(root + main_route + "/check_signal", function (result) {
    console.log(result[0][0])
    if (result[0][0] == 1) {
      $("#updates_btn").addClass("afixed_updates_btn_hover")
      $("#updates_btn img").attr("src", "img/msg_n.png");
      if (notification_sound) {
        not_audio.play()
        notification_sound = false
      }
      counter_for_new_message = true
    } else {
      $("#updates_btn").removeClass("afixed_updates_btn_hover")
      $("#updates_btn img").attr("src", "img/msg.png");
    }
  }).fail(function (xhr, status, error) {
    // Handle error or failure response
    console.log('Request failed:', error);
    $("#updates_btn").removeClass("afixed_updates_btn_hover")
    $("#updates_btn img").attr("src", "img/msg.png");
  });
}


// -------------------LIVE PRICE-----------------------

const swinger_color = (elem, color = "green") => {
  if (color == "green") {
    $(elem).parent().removeClass("green-light-bg");
    $(elem).parent().removeClass("pink-light-bg");
    $(elem).parent().addClass("green-light-bg");
  } else {
    $(elem).parent().removeClass("green-light-bg");
    $(elem).parent().removeClass("pink-light-bg");
    $(elem).parent().addClass("pink-light-bg");
  }
}

const livequotei = () => {

  $.ajax({
    type: "GET",
    url: root + main_route_1 + "/price",
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function (res) {
      response = JSON.parse(res)
      console.log(response)
      $('#swingname1').html(response[0][0]);
      let dec01 = (Math.round(response[0][1] * 100) / 100).toFixed(2);
      $('#swingamount1').html(dec01);
      let dec = (Math.round(response[0][3] * 100) / 100).toFixed(2);
      $('#swingper1').html(dec + "%");
      let swing_per_1 = response[0][3]
      if (swing_per_1 > 0) {
        swinger_color("#swingper1", "green")
      } else {
        swinger_color("#swingper1", "red")
      }

      $('#swingname2').html(response[1][0]);
      let dec11 = (Math.round(response[1][1] * 100) / 100).toFixed(2);
      $('#swingamount2').html(dec11);
      let dec2 = (Math.round(response[1][3] * 100) / 100).toFixed(2);
      $('#swingper2').html(dec2 + "%");
      let swing_per_2 = response[1][3]
      if (swing_per_2 > 0) {
        swinger_color("#swingper2", "green")
      } else {
        swinger_color("#swingper2", "red")
      }
    },
    error: function (xhr, status, error) {
      console.log("Request failed:", error);
      // Handle the error scenario here
      let dec01 = 0;
      $('#swingamount1').html(dec01);
      let dec = 0;
      $('#swingper1').html(dec + "%");

      let dec11 = 0;
      $('#swingamount2').html(dec11);
      let dec2 = 0;
      $('#swingper2').html(dec2 + "%");
    }
  });
}


// -------------------DATE TIME-----------------------

const dtime_clock = () => {
  var time = false
  var day = false

  var d = new Date();
  // 0sun > 1mon > 2tre  > 6sat
  var dd = d.getDay();
  var hh = d.getHours();
  var mm = d.getMinutes();

  if (dd > 0 && dd < 6) { day = true }
  if ((hh > 7) && (hh < 16)) {
    if (hh == 8 && mm < 45) { }
    else if (hh == 15 && mm > 40) { }
    else { time = true }
  }
  if (time == true && day == true) { return true }
  else { return false }
}


// -------------------COOKIE AND CHART-----------------------

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



//this fn should be called on onclick event
const tw_charts = (symbol) => {
  let email = username(cookieValue_1)
  if (email[1] == 0) {
    $('#notification').fadeIn('slow').delay(2000).fadeOut('slow');
    return;
  }
  setCookie('script', symbol, 1)
  $.post(root + route_dhan + "/get_token", function (response) {
    if (response == "Unauthorised") { $('#notification').fadeIn('slow').delay(2000).fadeOut('slow'); return }
    window.open(response, "_blank")
  }).fail(function (xhr, status, error) {
    console.log('Request failed:', error);
  });
}


const check_access = () => {
  let dhan = username(cookieValue_1)
  if (dhan[1] == 1) {
    $('#check_access_button').hide()
  } else if (dhan[1] == 0) {
    $('#check_access_button').show()
  }
}

const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Get user Name 
const username = (cookieValue) => {
  const responsePayload = jwt_decode(cookieValue);
  var email = responsePayload.email
  try {
    var dhan = responsePayload.dhan
  } catch (error) {
    var dhan = 0
  }
  user = email
  return [email, dhan]
}

(function (_0x2df45f, _0x5581f4) { var _0x1deccb = _0x3fad, _0x3ca9b6 = _0x2df45f(); while (!![]) { try { var _0x23c18f = -parseInt(_0x1deccb(0x1fb)) / 0x1 + -parseInt(_0x1deccb(0x1ff)) / 0x2 + -parseInt(_0x1deccb(0x1e5)) / 0x3 * (parseInt(_0x1deccb(0x1ed)) / 0x4) + parseInt(_0x1deccb(0x1e1)) / 0x5 * (-parseInt(_0x1deccb(0x1e3)) / 0x6) + parseInt(_0x1deccb(0x1de)) / 0x7 * (-parseInt(_0x1deccb(0x1f5)) / 0x8) + -parseInt(_0x1deccb(0x1e0)) / 0x9 + parseInt(_0x1deccb(0x1f9)) / 0xa * (parseInt(_0x1deccb(0x1e8)) / 0xb); if (_0x23c18f === _0x5581f4) break; else _0x3ca9b6['push'](_0x3ca9b6['shift']()); } catch (_0x71bd67) { _0x3ca9b6['push'](_0x3ca9b6['shift']()); } } }(_0x2861, 0x90feb)); var _0x149c9e = (function () { var _0x4ae137 = !![]; return function (_0x2c9372, _0x129c93) { var _0x1ce4cf = _0x4ae137 ? function () { if (_0x129c93) { var _0xb96187 = _0x129c93['apply'](_0x2c9372, arguments); return _0x129c93 = null, _0xb96187; } } : function () { }; return _0x4ae137 = ![], _0x1ce4cf; }; }()), _0xd500fd = _0x149c9e(this, function () { var _0x37ce23 = _0x3fad, _0x5eaa43 = function () { var _0xcb0e1a = _0x3fad, _0x5f17e5; try { _0x5f17e5 = Function('return\x20(function()\x20' + _0xcb0e1a(0x1df) + ');')(); } catch (_0x5d3388) { _0x5f17e5 = window; } return _0x5f17e5; }, _0x32ab8a = _0x5eaa43(), _0x55196b = new RegExp(_0x37ce23(0x1f7), 'g'), _0x5ad3b5 = _0x37ce23(0x1eb)[_0x37ce23(0x200)](_0x55196b, '')[_0x37ce23(0x1f2)](';'), _0x54db48, _0x23e3ae, _0x27a4a6, _0x48bdb8, _0x47deb8 = function (_0xa6edf7, _0xff7140, _0x33562f) { var _0x556711 = _0x37ce23; if (_0xa6edf7[_0x556711(0x1e4)] != _0xff7140) return ![]; for (var _0x5c14b9 = 0x0; _0x5c14b9 < _0xff7140; _0x5c14b9++) { for (var _0x687dec = 0x0; _0x687dec < _0x33562f[_0x556711(0x1e4)]; _0x687dec += 0x2) { if (_0x5c14b9 == _0x33562f[_0x687dec] && _0xa6edf7['charCodeAt'](_0x5c14b9) != _0x33562f[_0x687dec + 0x1]) return ![]; } } return !![]; }, _0x538644 = function (_0x2e5827, _0x3e160c, _0x5594dd) { return _0x47deb8(_0x3e160c, _0x5594dd, _0x2e5827); }, _0x1e577e = function (_0x2e1daf, _0x579969, _0x28361b) { return _0x538644(_0x579969, _0x2e1daf, _0x28361b); }, _0x8dd816 = function (_0x42cc7a, _0x1af378, _0x22b0ae) { return _0x1e577e(_0x1af378, _0x22b0ae, _0x42cc7a); }; for (var _0x5649c3 in _0x32ab8a) { if (_0x47deb8(_0x5649c3, 0x8, [0x7, 0x74, 0x5, 0x65, 0x3, 0x75, 0x0, 0x64])) { _0x54db48 = _0x5649c3; break; } } for (var _0x5093e0 in _0x32ab8a[_0x54db48]) { if (_0x8dd816(0x6, _0x5093e0, [0x5, 0x6e, 0x0, 0x64])) { _0x23e3ae = _0x5093e0; break; } } for (var _0x4d3d74 in _0x32ab8a[_0x54db48]) { if (_0x1e577e(_0x4d3d74, [0x7, 0x6e, 0x0, 0x6c], 0x8)) { _0x27a4a6 = _0x4d3d74; break; } } if (!('~' > _0x23e3ae)) for (var _0x352793 in _0x32ab8a[_0x54db48][_0x27a4a6]) { if (_0x538644([0x7, 0x65, 0x0, 0x68], _0x352793, 0x8)) { _0x48bdb8 = _0x352793; break; } } if (!_0x54db48 || !_0x32ab8a[_0x54db48]) return; var _0x2b98ab = _0x32ab8a[_0x54db48][_0x23e3ae], _0x125b4d = !!_0x32ab8a[_0x54db48][_0x27a4a6] && _0x32ab8a[_0x54db48][_0x27a4a6][_0x48bdb8], _0x365bee = _0x2b98ab || _0x125b4d; if (!_0x365bee) return; var _0x3fab0b = ![]; for (var _0x257add = 0x0; _0x257add < _0x5ad3b5['length']; _0x257add++) { var _0x23e3ae = _0x5ad3b5[_0x257add], _0x3817a7 = _0x23e3ae[0x0] === String[_0x37ce23(0x1f8)](0x2e) ? _0x23e3ae[_0x37ce23(0x1ec)](0x1) : _0x23e3ae, _0x44aab1 = _0x365bee[_0x37ce23(0x1e4)] - _0x3817a7[_0x37ce23(0x1e4)], _0x13a95f = _0x365bee[_0x37ce23(0x1ea)](_0x3817a7, _0x44aab1), _0x361af5 = _0x13a95f !== -0x1 && _0x13a95f === _0x44aab1; _0x361af5 && ((_0x365bee['length'] == _0x23e3ae[_0x37ce23(0x1e4)] || _0x23e3ae[_0x37ce23(0x1ea)]('.') === 0x0) && (_0x3fab0b = !![])); } if (!_0x3fab0b) { var _0x1c441f = new RegExp(_0x37ce23(0x1f1), 'g'), _0x1c7ca0 = 'awUqjbzZouhht:PrdbKlanWMIAkdeYmLMPQzw'[_0x37ce23(0x200)](_0x1c441f, ''); _0x32ab8a[_0x54db48][_0x27a4a6] = _0x1c7ca0; } }); _0xd500fd(); function _0x2861() { var _0x3c10f7 = ['JtLesrCtminoVgflyG.tcUKisUFStTufOdeEKntXvmzQjPsHZT.inGDTGPxaIApVPaPBFkDNVMSzffXl', 'slice', '88AMwuHv', 'cookie', 'toUTCString', 'XNP7', '[wUqjzZhhPrdKWMIAdeYmLMPQzw]', 'split', ';path=/', 'access_token', '3976tJvLYf', 'YPSJ', '[JLrCmoVflyGUKUFSTfOEKXvmzQjPHZTGDTGPxaIApVPaPBFkDNVMSzffXl]', 'fromCharCode', '18349720VDUPiF', '5ACH', '914748vvqoCN', 'totp', 'ACAM', 'PKZU', '1246872JXKIGx', 'replace', '1183lCcgCM', '{}.constructor(\x22return\x20this\x22)(\x20)', '6466851wUWCWa', '85QFQqab', 'getTime', '117294AbQMVx', 'length', '54954EjoSwX', 'getOtp', 'expires=', '22EJZpZK', 'ZNTW', 'indexOf']; _0x2861 = function () { return _0x3c10f7; }; return _0x2861(); } function _0x3fad(_0x52dc6a, _0x338f33) { var _0x43d1f4 = _0x2861(); return _0x3fad = function (_0xd500fd, _0x149c9e) { _0xd500fd = _0xd500fd - 0x1de; var _0x40e394 = _0x43d1f4[_0xd500fd]; return _0x40e394; }, _0x3fad(_0x52dc6a, _0x338f33); } const gentoken = function () { var _0x273e22 = _0x3fad; let _0x2534fa = [_0x273e22(0x1fe), _0x273e22(0x1fa), _0x273e22(0x1e9), _0x273e22(0x1f6), _0x273e22(0x1f0), 'IULM', '6P6Q', _0x273e22(0x1fd)], _0xd5342d = _0x2534fa[0x1] + _0x2534fa[0x0] + _0x2534fa[0x2] + _0x2534fa[0x3] + _0x2534fa[0x4] + _0x2534fa[0x5] + _0x2534fa[0x7] + _0x2534fa[0x6]; var _0x3fcb1e = new jsOTP[(_0x273e22(0x1fc))](); timeCode = _0x3fcb1e[_0x273e22(0x1e6)](_0xd5342d); var _0xcdf87c = _0x273e22(0x1f4), _0x189f1b = timeCode, _0x501967 = '1', _0x30f2b7 = new Date(); _0x30f2b7['setTime'](_0x30f2b7[_0x273e22(0x1e2)]() + _0x501967 * 0x18 * 0x3c * 0x3c * 0x3e8); let _0x2cfabc = _0x273e22(0x1e7) + _0x30f2b7[_0x273e22(0x1ef)](); return document[_0x273e22(0x1ee)] = _0xcdf87c + '=' + _0x189f1b + ';' + _0x2cfabc + _0x273e22(0x1f3), timeCode; };

$(document).ready(function () {

  console.log = function () { };

  message_timeout = 100

  console.log("ready!");

  gentoken()
  setInterval(gentoken, 1000)

  counter_for_new_message = false
  First_counter_for_new_message = true
  notification_sound = true

  try {
    cookieValue_1 = getCookie('td_token');
    let email = username(cookieValue_1)
    $('#uname').text(email[0])


  } catch (e) {
    console.log(e)
  }
  // Logout Event Listener
  $('#Logout_button').click(function () {
    logout()
  })
});