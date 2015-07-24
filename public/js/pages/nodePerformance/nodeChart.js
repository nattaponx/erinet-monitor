/**
 * PDC Performance view
 * Author: Nattapon Thathong
 */
define(["performance/nodeModel"], function(nodemodel){

	return{

		init: function(container, chartType, master){
			//console.log('init nodeChart >>' + container);

			var placeholder = $("#"+container);
			// for time series charts
			placeholder.css('height', "90%");
 			placeholder.css('width', "90%"); 

			//////////////////////////////
			// realtime line chart config
			if(chartType == 'realtime_linechart'){

				var data = [];
				var now = new Date().getTime();
				updateInterval = 1000;
				var totalPoints = 30;

				function GetData() {
				    data.shift(); //to remove first item of array
				 
				    while (data.length < totalPoints) {     
				        var y = Math.random() * 100;
				        var temp = [now += updateInterval, y]; //data format [x, y]
				 
				        data.push(temp);
				    }
				}

			    var dataSpec = [{ data: data }];
			    var options = {
			    	series: {
				        lines: { show: true, lineWidth: 2, fill: true, color: '#819FF7'},
				        shadowSize: 1
				    },
				    xaxis: {
				        mode: "time",
				        tickSize: [5, "second"],
				        tickFormatter: function (v, axis) {
				            var date = new Date(v);
				            if (date.getSeconds() % 5 == 0) {
				                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				                return hours + ":" + minutes + ":" + seconds;
				            } else {
				                return "";
				            }
				        },
				        axisLabel: "Time",
				        axisLabelUseCanvas: true,
				        axisLabelFontSizePixels: 12,
				        axisLabelFontFamily: 'ericssonFont',
				        axisLabelPadding: 10
				    },
				    yaxis: {
				        min: 0,
				        max: 100,
				        tickSize: 25,
				        tickFormatter: function (v, axis) {
				            if (v % 25 == 0) {
				                return v + "";
				            } else {
				                return "";
				            }
				        },
				        //axisLabel: "Number of Bearers",
				        axisLabelUseCanvas: true,
				        axisLabelFontSizePixels: 12,
				        axisLabelFontFamily: 'ericssonFont',
				        axisLabelPadding: 10
				    },
				    grid: {
				    	clickable: true,
				    	hoverable: true,
				    	borderWidth: {top: 1, right: 1, bottom: 1, left: 1},
    					borderColor: {top: "#D8D8D8", left: "#D8D8D8"}
				    },
				    colors: ['#A9BCF5']
			    };


			    GetData();
			    $.plot($("#"+container), dataSpec, options);

			    function update(){
			    	GetData();
					$.plot(placeholder, dataSpec, options)
					setTimeout(update, updateInterval);
			    }
			    update();
			}

			//////////////////////////////
			// realtime gauge chart config
			else if(chartType == 'realtime_gaugechart'){
				var g = new JustGage({
    				id: container, //container
    				value: getRandomInt(0, 100) + " %",
				    min: 0,
				    max: 100,
				    label: "CPU Loads",
				    relativeGaugeSize: true
			    	// title: "Visitors"
				});
		        setInterval(function() {
					g.refresh(getRandomInt(50, 100));
		          	//g2.refresh(getRandomInt(50, 100));          
		        }, 1000);
			}

			//////////////////////////////
			// time series chart
			else if(chartType == 'timechart'){
			    var data = [
					[20121218,1690.600],[20121217,1682.600],[20121214,1691.600],[20121213,1691.600],[20121212,1703.350],[20121211,1702.050],[20121210,1700.050],[20121207,1694.100],[20121206,1681.650],[20121205,1697.550],[20121204,1697.550],[20121203,1709.500],[20121130,1720.450],[20121129,1711.000],[20121128,1730.450],[20121127,1741.900],[20121126,1738.400],[20121123,1722.150],[20121122,1721.450],[20121121,1714.500],[20121120,1724.450],[20121119,1715.500],[20121116,1705.050],[20121115,1714.500],[20121114,1718.700],[20121113,1717.500],[20121112,1725.650],[20121109,1725.450],[20121108,1710.500],[20121107,1719.450],[20121106,1676.650],[20121105,1671.650],[20121102,1700.050],[20121101,1712.000],[20121031,1706.050],[20121030,1702.550],[20121029,1705.050],[20121026,1696.550],[20121025,1703.050],[20121024,1702.550],[20121023,1713.500],[20121022,1716.000],[20121019,1725.450],[20121018,1740.900],[20121017,1742.900],[20121016,1732.900],[20121015,1738.400],[20121012,1759.100],[20121011,1757.500],[20121009,1766.300],[20121008,1762.300],[20121005,1780.750],[20121004,1777.750],[20121003,1762.800],[20121002,1765.800],[20121001,1758.800],[20120928,1770.250],[20120927,1749.350],[20120926,1753.850],[20120925,1755.850],[20120924,1750.850],[20120921,1764.800],[20120920,1750.850],[20120919,1767.800],[20120918,1748.350],[20120917,1759.300],[20120914,1762.800],[20120913,1720.950],[20120912,1725.950],[20120911,1720.450],[20120910,1725.450],[20120907,1685.600],[20120906,1694.550],[20120905,1682.100],[20120904,1683.600],[20120903,1678.950],[20120831,1648.750],[20120830,1650.950],[20120829,1657.200],[20120828,1651.750],[20120827,1663.200],[20120824,1654.250],[20120823,1656.250],[20120822,1627.850],[20120821,1613.500],[20120820,1610.400],[20120817,1609.400],[20120816,1594.000],[20120815,1593.000],[20120814,1606.950],[20120813,1614.700],[20120810,1602.950],[20120809,1607.400],[20120808,1597.950],[20120807,1604.450],[20120806,1597.950],[20120803,1583.000],[20120801,1608.900],[20120731,1610.900],[20120730,1609.400],[20120727,1610.100],[20120726,1594.950],[20120725,1579.050],[20120724,1567.600],[20120723,1568.600],[20120720,1577.050],[20120719,1575.050],[20120718,1574.050],[20120717,1584.000],[20120716,1580.050],[20120713,1564.600],[20120712,1559.600],[20120711,1570.550],[20120710,1576.050],[20120709,1574.550],[20120706,1591.000],[20120705,1608.900],[20120704,1605.450],[20120703,1599.950],[20120702,1583.000],[20120629,1565.100],[20120628,1566.600],[20120627,1561.600],[20120626,1575.050],[20120625,1564.100],[20120622,1553.650],[20120621,1593.000],[20120620,1608.900],[20120619,1622.850],[20120618,1609.400],[20120615,1616.400],[20120614,1610.900],[20120613,1604.950],[20120612,1585.000],[20120611,1589.500],[20120608,1564.100],[20120607,1613.900],[20120606,1618.900],[20120605,1604.950],[20120604,1609.400],[20120601,1548.150],[20120531,1556.150],[20120530,1540.200],[20120529,1571.050],[20120528,1573.050],[20120525,1555.150],[20120524,1551.650],[20120523,1550.150],[20120522,1577.550],[20120521,1586.500],[20120518,1564.100],[20120517,1540.700],[20120516,1521.250],[20120515,1550.150],[20120514,1567.600],[20120511,1569.100],[20120510,1587.000],[20120509,1585.000],[20120508,1623.650],[20120507,1631.150],[20120504,1624.850],[20120503,1637.800],[20120502,1646.750],[20120430,1653.750],[20120427,1642.800],[20120426,1641.800],[20120425,1635.800],[20120424,1627.850],[20120423,1626.850],[20120420,1633.800],[20120419,1634.800],[20120418,1643.000],[20120417,1640.800],[20120416,1636.800],[20120413,1666.700],[20120412,1649.250],[20120411,1649.750],[20120410,1639.800],[20120409,1635.800],[20120406,1622.450],[20120405,1615.900],[20120403,1670.150],[20120402,1658.000],[20120330,1655.750],[20120329,1654.750],[20120328,1667.700],[20120327,1680.150],[20120326,1655.750],[20120323,1637.300],[20120322,1642.800],[20120321,1645.750],[20120320,1647.750],[20120319,1653.750],[20120316,1651.750],[20120315,1639.800],[20120314,1662.700],[20120313,1694.200],[20120312,1697.550],[20120309,1697.550],[20120308,1679.150],[20120307,1666.200],[20120306,1694.100],[20120305,1702.550],[20120303,1703.150],[20120302,1709.000],[20120301,1707.000],[20120229,1777.250],[20120224,1766.300],[20120223,1764.300],[20120222,1748.350],[20120221,1733.400],[20120220,1723.450],[20120217,1724.450],[20120216,1713.500],[20120215,1717.500],[20120214,1707.500],[20120213,1721.950],[20120210,1721.450],[20120209,1729.450],[20120208,1740.400],[20120207,1718.500],[20120206,1722.250],[20120204,1715.100],[20120203,1747.350],[20120202,1736.900],[20120201,1724.450],[20120131,1727.050],[20120130,1720.450],[20120120,1647.750],[20120119,1654.750],[20120118,1648.250],[20120117,1651.750],[20120116,1635.300],[20120113,1637.800],[20120112,1639.300],[20120111,1636.800],[20120110,1612.900],[20120109,1607.900],[20120106,1616.400],[20120105,1614.400],[20120104,1594.950],[20120103,1582.050],[20120102,1550.750],[20111230,1560.100],[20111229,1542.200],[20111228,1580.550],[20111227,1586.600],[20111226,1603.550],[20111223,1603.950],[20111222,1603.950],[20111221,1622.150],[20111220,1591.500],[20111219,1586.000]
    			];

    			function toUTC(d) {        
			        strd = d.toString();
			        var y = strd.substring(0, 4);
			        var m = strd.substring(4, 6);
			        var d = strd.substring(6, 8);

			        var n = new Date(parseInt(y), parseInt(m) - 1, parseInt(d) - 1);
			        return new Date(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 0, 0, 0);
			    }

			    /* turn dates to ticks */
    			for(var i=0;i<data.length;i++){
        			data[i][0] = toUTC(data[i][0]);
    			}

				var detailOptions = {            
		            series: {
		                lines: { show: true, lineWidth: 2 },
		                shadowSize: 0
		            },
		            grid: {
				    	margin: 5,
				    	clickable: true,
				    	hoverable: true,
				    	borderWidth: 2,
				    	wborderWidth: {top: 1, right: 1, bottom: 1, left: 1},
    					borderColor: {top: "#D8D8D8", left: "#D8D8D8"}
				    },
		            yaxis:{
		            },
		            xaxis:{
		                mode:"time",
		                axisLabel: "Time",
		                axisLabelFontFamily: 'ericssonFont',
		                axisLabelUseCanvas: true,
				        axisLabelFontSizePixels: 12,
				        axisLabelPadding: 10
		            },
		            selection:{
		                mode: "x"
		            }
				};
				var masterOptions = {            
		            series: {
		                lines: { show: true, lineWidth: 2 },                
		                shadowSize: 0
		            },
		            grid: {                
				    	margin: 5,
				    	clickable: true,
				    	hoverable: true,
				    	borderWidth: {top: 1, right: 1, bottom: 1, left: 1},
    					borderColor: {top: "#D8D8D8", left: "#D8D8D8"}
		            },
		            yaxis:{
		            	show: false
		            },
		            xaxis:{
		                mode:"time",
		                show: false                
		            },
		            selection:{
		                mode: "x"
		            }
    			};

    			 var dataDetail = [{
	                data:data, 
	                color:"#E80000"
            	}];

			    var plotDetail = $.plot($("#"+container), dataDetail, detailOptions);

			    var plotMaster = $.plot($("#"+master),
			        [{data:data, color:"#E80000"}], masterOptions);


				placeholder.bind("plotselected", function (event, ranges) {        
			        plotDetail = $.plot(placeholder, dataDetail,
			                      $.extend(true, {}, detailOptions, {
			                          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
			                      }));

			        plotMaster.setSelection(ranges, true);
			    });

				$(".chart-position-master").bind("plotselected", function (event, ranges) {
         			plotDetail.setSelection(ranges);
    			});
			}

			//////////////
			// tooltips //
			//////////////
			placeholder.bind("plothover", function (event, pos, item) {
				var previousPoint = 0;
                if (item) {
                    if (previousPoint != item.dataIndex) {

                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(0); // decimals

                        showTooltip(item.pageX, item.pageY, "" + y);
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;            
                }
            });

			function showTooltip(x, y, contents) {
                $("<div id='tooltip'>" + contents + "</div>").css({
                    position: "absolute",
                    display: "none",
                    top: y - 20,
                    left: x + 10,
                    border: "0px solid #fdd",
                    "border-radius": "2px",
                    padding: "2px 10px 2px 10px",
                    color: "#fff",
                    "background-color": "#000000", //#fee
                    opacity: 0.80
                }).appendTo("body").fadeIn(100);
            }


		// end of init
		},				
	}			
});