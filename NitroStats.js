// ==UserScript==
// @name        Nitro Stats
// @author      krook
// @description Add script in Tampermonkey
// @match       https://nitrogensports.eu/mywagerslog/
// @version     0.1
// @require     https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

(function() {
  'use strict';
  loadCanvas();
  createChart();

}());



function loadCanvas() {
        var canvas = document.createElement('canvas');
        canvas.id     = "myChart";
        canvas.width  = 1224;
        canvas.height = 768;
        canvas.style.zIndex   = 8;
        canvas.style.position = "absolute";
        canvas.style.border   = "1px solid";
        document.body.appendChild(canvas);
    }

function createChart() {
    var total = [];
    var tables = $('table');
    var size = [];
    //console.log($('table:eq(21) tr:eq(0) td:eq(4)').text());
    $.each(tables, function (index, value) {
        if(index < tables.length/2) size.push(index);
        if(total.length !== 0) {
            if(!isNaN(parseFloat($(value).find("tr:eq(0)").find("td:eq(4)").text()))) {
                if($(value).find("tr:eq(0)").find("td:eq(5)").text() == 'win') {
                    //if win add win and push
                    total.push(total[total.length-1] + parseFloat($(value).find("tr:eq(0)").find("td:eq(4)").text()));
                }
                else {
                    //if lose subtract bet and push
                    total.push(total[total.length-1] - parseFloat($(value).find("tr:eq(0)").find("td:eq(3)").text()));
                }

            }
        }
        else {
            if(!isNaN(parseFloat($(value).find("tr:eq(0)").find("td:eq(4)").text()))) {
               total.push(parseFloat($(value).find("tr:eq(0)").find("td:eq(4)").text()));
              }
        }
    });

    var ctx = document.getElementById('myChart').getContext('2d');

     var options =  {
         scales: {
            xAxes: [{
                afterTickToLabelConversion: function(data){
                    var xLabels = data.ticks;
                    xLabels.forEach(function (labels, i) {
                        if (!(i % 50 === 0)){
                            xLabels[i] = '';
                        }
                    });
                }
            }]
        }
     };

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: size,
            datasets: [{
                label: 'Total',
                data: total,
                backgroundColor: "rgba(153,255,51,0.4)"
            }, {
                label: 'NBA',
                data: [.1, .2, .3, .4, .5, .6, .7],
                backgroundColor: "rgba(255,0,45,0.4)"
            }, {
                label: 'CSGO',
                data: [.1, .2, .3, .4, .5, .6, .7],
                backgroundColor: "rgba(255,45,0,0.4)"
            }, {
                label: 'Tennis',
                data: [.1, .2, .3, .4, .5, .6, .7],
                backgroundColor: "rgba(200,100, 80,0.4)"
            }]
        },
        options: options
    });
}
