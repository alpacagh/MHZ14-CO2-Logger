(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "plotly", "jquery"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("plotly"), require("jquery"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.plotly, global.jquery);
    global.buildGraph = mod.exports;
  }
})(this, function (exports, _plotly, _jquery) {
  /**
   * Created by alpaca on 3/25/16.
   */
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.plot = plot;

  var _plotly2 = _interopRequireDefault(_plotly);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function loadFile(name) {
    var _arguments = arguments;

    return new Promise(function (resolve, reject) {
      _jquery2.default.ajax(name, { dataType: "text" }).done(function (raw) {
        var x = [];
        var y = [];
        raw.split("\n").map(function (line) {
          if (!line.match(/^\d{4}-\d\d-\d\d \d{0,2}:\d\d:\d\d\s\d+\s/)) {
            console.log('Invalid input line', line);
            return false;
          }
          var t = line.split('\t');
          if (parseInt(t[1]) > 3000) {
            console.log('Invalid ppa value', t);
            return false;
          }
          x.push(t[0]);
          y.push(t[1]);
          return null;
        });
        resolve([{ x: x, y: y }]);
      }).error(function () {
        console.log("loading error ", _arguments);
        alert("loading error");
        reject();
      });
    });
  }

  function plot(target) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "example.log";

    if (typeof target == 'string') target = document.getElementById(target);
    var dataPromise = loadFile(filename);
    var layout = {
      title: 'CO2 concentration',
      xaxis: {
        title: 'Time',
        showgrid: false
      },
      yaxis: {
        title: 'CO2 ppa'
      }
    };
    var config = {
      scrollZoom: true,
      autosizable: true,
      displayModeBar: true
    };
    dataPromise.then(function (data) {
      return _plotly2.default.plot(target, data, layout, config);
    });
  }
});

//# sourceMappingURL=buildGraph-compiled.js.map