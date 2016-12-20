/**
 * Created by alpaca on 3/25/16.
 */
"use strict";

import plotly from "plotly";
import $ from "jquery";
 
function loadFile(name) {
  return new Promise((resolve, reject)=> {
    $.ajax(name, {dataType: "text"})
        .done((raw)=> {
          let x = [];
          let y = [];
          raw.split("\n").map((line)=> {
            if (!line.match(/^\d{4}-\d\d-\d\d \d{0,2}:\d\d:\d\d\s\d+\s/)) {
              console.log('Invalid input line', line);
              return false;
            }
            let t = line.split('\t');
            if (parseInt(t[1])>3000) {
              console.log('Invalid ppa value', t);
              return false;
            }
            x.push(t[0]);
            y.push(t[1]);
            return null;
          });
          resolve([{x: x, y: y}]);
        })
        .error(()=> {
          console.log("loading error ", arguments);
          alert("loading error");
          reject();
        });
  })
}

export function plot(target, filename = "example.log") {
  if (typeof(target) == 'string') target = document.getElementById(target);
  let dataPromise = loadFile(filename);
  let layout = {
    title: 'CO2 concentration',
    xaxis: {
      title: 'Time',
      showgrid: false
    },
    yaxis: {
      title: 'CO2 ppa'
    }
  };
  let config = {
    scrollZoom: true,
    autosizable: true,
    displayModeBar: true
  };
  dataPromise.then((data)=>plotly.plot(target, data, layout, config));
}
