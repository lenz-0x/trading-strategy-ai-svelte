import {formatDollar, formatUnixTimestamp,} from "$lib/helpers/formatters";

/**
 * A modified OHLC example from uPlot
 *
 * The original OHLC: https://github.com/leeoniya/uPlot/blob/master/demos/candlestick-ohlc.html
 *
 * Resizing: https://github.com/leeoniya/uPlot/blob/master/demos/resize.html
 *
 * Currently hardcoded to handle only 1 chart per page.
 */


// Dynamically loaded uPlot reference that is set when the first draw call received
let uPlot = null;

// The current window.addEventListener callback for resizes
let resizeCallback = null;


function throttle(cb, limit) {
    var wait = false;

    return () => {
        if (!wait) {
            requestAnimationFrame(cb);
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    }
}


function fmtUSD(val, dec) {
    return "$" + val.toFixed(dec).replace(/\d(?=(\d{3})+(?:\.|$))/g, "$&,");
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// column-highlights the hovered x index
function columnHighlightPlugin({ className, style = {backgroundColor: "rgba(51,204,255,0.3)"} } = {}) {
    let underEl, overEl, highlightEl, currIdx;

    function init(u) {
        underEl = u.under;
        overEl = u.over;

        highlightEl = document.createElement("div");

        className && highlightEl.classList.add(className);

        uPlot.assign(highlightEl.style, {
            pointerEvents: "none",
            display: "none",
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            ...style
        });

        underEl.appendChild(highlightEl);

        // show/hide highlight on enter/exit
        overEl.addEventListener("mouseenter", () => {highlightEl.style.display = null;});
        overEl.addEventListener("mouseleave", () => {highlightEl.style.display = "none";});
    }

    function update(u) {
        if (currIdx !== u.cursor.idx) {
            currIdx = u.cursor.idx;

            let [iMin, iMax] = u.series[0].idxs;

            const dx    = iMax - iMin;
            const width = (u.bbox.width / dx) / devicePixelRatio;
            const xVal  = u.scales.x.distr == 2 ? currIdx : u.data[0][currIdx];
            const left  = u.valToPos(xVal, "x") - width / 2;

            highlightEl.style.transform = "translateX(" + Math.round(left) + "px)";
            highlightEl.style.width = Math.round(width) + "px";
        }
    }

    return {
        opts: (u, opts) => {
            uPlot.assign(opts, {
                cursor: {
                    x: false,
                    y: false,
                }
            });
        },
        hooks: {
            init: init,
            setCursor: update,
        }
    };
}

// converts the legend into a simple tooltip
// https://github.com/leeoniya/uPlot/issues/580
function legendAsTooltipPlugin({ className, style = { backgroundColor:"rgba(255, 249, 196, 0.92)", color: "black" } } = {}) {
    let legendEl;

    function init(u, opts) {
        legendEl = u.root.querySelector(".u-legend");

        legendEl.classList.remove("u-inline");
        className && legendEl.classList.add(className);

        uPlot.assign(legendEl.style, {
            textAlign: "left",
            pointerEvents: "none",
            display: "none",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 100,
            boxShadow: "2px 2px 10px rgba(0,0,0,0.5)",
            ...style
        });

        // hide series color markers
        const idents = legendEl.querySelectorAll(".u-marker");

        for (let i = 0; i < idents.length; i++)
            idents[i].style.display = "none";

        const overEl = u.over;
        overEl.style.overflow = "visible";

        // move legend into plot bounds
        overEl.appendChild(legendEl);

        // show/hide tooltip on enter/exit
        overEl.addEventListener("mouseenter", () => {legendEl.style.display = null;});
        overEl.addEventListener("mouseleave", () => {legendEl.style.display = "none";});

        // let tooltip exit plot
    //	overEl.style.overflow = "visible";
    }

    function update(u) {
        const { left, top } = u.cursor;
        legendEl.style.transform = "translate(" + left + "px, " + top + "px)";
    }

    return {
        hooks: {
            init: init,
            setCursor: update,
        }
    };
}


// draws candlestick symbols (expects data in OHLC order)
function candlestickPlugin() {

    const gap = 2;
    const shadowColor = "#000000";
    const bearishColor = "#cc0000";
    const bullishColor = "#458b00";
    const volumeBearishColor = "#bea6a0";
    const volumeBullishColor = "#a6ae9d";
    const bodyMaxWidth = 20;
    const shadowWidth = 2;
    const bodyOutline = 1;

    function drawCandles(u) {
        u.ctx.save();

        const offset = (shadowWidth % 2) / 2;

        u.ctx.translate(offset, offset);

        let [iMin, iMax] = u.series[0].idxs;

        let vol0AsY = u.valToPos(0, "vol", true);

        for (let i = iMin; i <= iMax; i++) {
            let xVal         = u.scales.x.distr == 2 ? i : u.data[0][i];
            let open         = u.data[1][i];
            let high         = u.data[2][i];
            let low          = u.data[3][i];
            let close        = u.data[4][i];
            let vol          = u.data[5][i];

            let timeAsX      = u.valToPos(xVal,  "x", true);
            let lowAsY       = u.valToPos(low,   "y", true);
            let highAsY      = u.valToPos(high,  "y", true);
            let openAsY      = u.valToPos(open,  "y", true);
            let closeAsY     = u.valToPos(close, "y", true);
            let volAsY       = u.valToPos(vol, "vol", true);


            // shadow rect
            let shadowHeight = Math.max(highAsY, lowAsY) - Math.min(highAsY, lowAsY);
            let shadowX      = timeAsX - (shadowWidth / 2);
            let shadowY      = Math.min(highAsY, lowAsY);

            u.ctx.fillStyle = shadowColor;
            u.ctx.fillRect(
                Math.round(shadowX),
                Math.round(shadowY),
                Math.round(shadowWidth),
                Math.round(shadowHeight),
            );

            // body rect
            let columnWidth  = u.bbox.width / (iMax - iMin);
            let bodyWidth    = Math.min(bodyMaxWidth, columnWidth - gap);
            let bodyHeight   = Math.max(closeAsY, openAsY) - Math.min(closeAsY, openAsY);
            let bodyX        = timeAsX - (bodyWidth / 2);
            let bodyY        = Math.min(closeAsY, openAsY);
            let bodyColor    = open > close ? bearishColor : bullishColor;

            u.ctx.fillStyle = shadowColor;
            u.ctx.fillRect(
                Math.round(bodyX),
                Math.round(bodyY),
                Math.round(bodyWidth),
                Math.round(bodyHeight),
            );

            u.ctx.fillStyle = bodyColor;
            u.ctx.fillRect(
                Math.round(bodyX + bodyOutline),
                Math.round(bodyY + bodyOutline),
                Math.round(bodyWidth - bodyOutline * 2),
                Math.round(bodyHeight - bodyOutline * 2),
            );

            // volume rect
            const volumeColour = open > close ? volumeBearishColor : volumeBullishColor;
            u.ctx.fillStyle = volumeColour;
            u.ctx.fillRect(
                Math.round(bodyX),
                Math.round(volAsY),
                Math.round(bodyWidth),
                Math.round(vol0AsY - volAsY),
            );
        }

        u.ctx.translate(-offset, -offset);

        u.ctx.restore();
    }

    return {
        opts: (u, opts) => {
            uPlot.assign(opts, {
                cursor: {
                    points: {
                        show: false,
                    }
                }
            });

            opts.series.forEach(series => {
                series.paths = () => null;
                series.points = {show: false};
            });
        },
        hooks: {
            draw: drawCandles,
        }
    };
}


// gold prices from https://www.investing.com/commodities/gold-historical-data
// Date,Open,High,Low,Close
/*
const data = [
    [1546300800,1546387200,1546473600,1546560000,1546819200,1546905600,1546992000,1547078400,1547164800,1547424000,1547510400,1547596800,1547683200,1547769600,1547942400,1548028800,1548115200,1548201600,1548288000,1548374400,1548633600,1548720000,1548806400,1548892800,1548979200,1549238400,1549324800,1549411200,1549497600,1549584000,1549843200,1549929600,1550016000,1550102400,1550188800,1550361600,1550448000,1550534400,1550620800,1550707200,1550793600,1551052800,1551139200,1551225600,1551312000,1551398400,1551657600,1551744000,1551830400,1551916800,1552003200,1552262400,1552348800,1552435200,1552521600,1552608000,1552867200,1552953600,1553040000,1553126400,1553212800,1553472000,1553558400,1553644800,1553731200,1553817600,1554076800,1554163200,1554249600,1554336000,1554422400,1554681600,1554768000,1554854400,1554940800,1555027200,1555286400,1555372800,1555459200,1555545600,1555632000,1555891200,1555977600,1556064000,1556150400,1556236800,1556496000,1556582400,1556668800,1556755200,1556841600,1557100800,1557187200,1557273600,1557360000,1557446400,1557705600,1557792000,1557878400,1557964800,1558051200,1558310400,1558396800,1558483200,1558569600,1558656000,1558828800,1558915200,1559001600,1559088000,1559174400,1559260800,1559520000,1559606400,1559692800,1559779200,1559865600,1560124800,1560211200,1560297600,1560384000,1560470400,1560729600,1560816000,1560902400,1560988800,1561075200,1561334400,1561420800,1561507200,1561593600,1561680000,1561939200,1562025600,1562112000,1562198400,1562284800,1562544000,1562630400,1562716800,1562803200,1562889600,1563148800,1563235200,1563321600,1563408000,1563494400,1563753600,1563840000,1563926400,1564012800,1564099200,1564358400,1564444800,1564531200,1564617600,1564704000,1564963200,1565049600,1565136000,1565222400,1565308800,1565568000,1565654400,1565740800,1565827200,1565913600,1566172800,1566259200,1566345600,1566432000,1566518400,1566777600,1566864000,1566950400,1567036800,1567123200,1567296000,1567382400,1567468800,1567555200,1567641600,1567728000,1567987200,1568073600,1568160000,1568246400,1568332800,1568592000,1568678400,1568764800,1568851200,1568937600,1569196800,1569283200,1569369600,1569456000,1569542400,1569801600,1569888000,1569974400,1570060800,1570147200,1570406400,1570492800,1570579200,1570665600,1570752000,1571011200,1571097600,1571184000,1571270400,1571356800,1571616000,1571702400,1571788800,1571875200,1571961600],
    [1284.7,1319.9,1318.7,1328,1317.6,1321.6,1314.3,1325,1319.3,1323.1,1324.7,1321.3,1323.5,1322,1281.3,1281.95,1311.1,1315,1314,1313.1,1331.9,1334.2,1341.3,1350.6,1349.8,1346.4,1343.4,1344.9,1335.6,1337.9,1342.5,1337,1338.6,1337,1340.4,1324.65,1324.35,1349.5,1371.3,1367.9,1351.3,1357.8,1356.1,1356,1347.6,1339.1,1320.6,1311.8,1314,1312.4,1312.3,1323.5,1319.1,1327.2,1332.1,1320.3,1323.1,1328,1330.9,1338,1333,1335.3,1345.2,1341.1,1332.5,1314,1314.4,1310.7,1314,1313.1,1315,1313.7,1320,1326.5,1329.2,1314.2,1312.3,1309.5,1297.4,1293.7,1277.9,1295.8,1295.2,1290.3,1294.2,1298,1306.4,1299.8,1302.3,1297,1289.6,1302,1300.7,1303.5,1300.5,1303.2,1306,1318.7,1315,1314.5,1304.1,1294.7,1293.7,1291.2,1290.2,1300.4,1284.2,1284.25,1301.8,1295.9,1296.2,1304.4,1323.1,1340.9,1341,1348,1351.4,1351.4,1343.5,1342.3,1349,1357.6,1357.1,1354.7,1361.4,1375.2,1403.5,1414.7,1433.2,1438,1423.6,1424.4,1418,1399.5,1435.5,1421.25,1434.1,1412.4,1409.8,1412.2,1433.4,1418.4,1429,1428.8,1420.6,1441,1460.4,1441.7,1438.4,1431,1439.3,1427.4,1431.9,1439.5,1443.7,1425.6,1457.5,1451.2,1481.1,1486.7,1512.1,1515.9,1509.2,1522.3,1513,1526.6,1533.9,1523,1506.3,1518.4,1512.4,1508.8,1545.4,1537.3,1551.8,1549.4,1536.9,1535.25,1537.95,1535.2,1556,1561.4,1525.6,1516.4,1507,1493.9,1504.9,1506.5,1513.1,1506.5,1509.7,1502,1506.8,1521.5,1529.8,1539.8,1510.9,1511.8,1501.7,1478,1485.4,1505.6,1511.6,1518.6,1498.7,1510.9,1510.8,1498.3,1492,1497.7,1484.8,1494.2,1495.6,1495.6,1487.5,1491.1,1495.1,1506.4],
    [1284.75,1320.6,1327,1330.8,1326.8,1321.6,1326,1328,1325.8,1327.1,1326,1326,1323.5,1322.1,1282.7,1282.95,1315.8,1316.3,1314,1333.2,1334.7,1341.7,1353.2,1354.6,1352.2,1346.4,1345.7,1344.9,1340.7,1344.2,1342.7,1342.1,1345.2,1342,1350,1324.95,1330.75,1369.6,1374.3,1368.4,1359.8,1359,1357,1356,1353.4,1340.6,1322.3,1314.1,1316.1,1312.9,1325.7,1323.5,1326.3,1336,1332.1,1330.1,1330.4,1334.7,1341.1,1344.2,1338.8,1348.4,1345.6,1342.8,1334.7,1322.3,1319.3,1314.7,1316.6,1316.4,1315,1325.4,1328.3,1332.2,1329.2,1316.9,1312.3,1309.5,1299.6,1296.9,1277.9,1299.5,1296.2,1298.4,1302.5,1308.7,1306.4,1305.9,1307,1297.2,1301.7,1305,1305.3,1310.2,1307,1308,1319.8,1321.7,1318.7,1316.2,1305.9,1295.8,1293.8,1293.7,1304.2,1302,1285.15,1286.85,1304,1302,1305.2,1323,1344.1,1345.2,1360.1,1355.3,1363.8,1353,1344.7,1353.6,1358,1373.6,1358.2,1369.6,1377.6,1408.9,1425.5,1435.9,1453.7,1438,1426,1439.1,1418,1435,1452.6,1426.65,1437.5,1421.5,1414.1,1433.3,1441.3,1431.4,1433.9,1432.4,1440.8,1462.3,1467,1443.5,1444,1442.9,1447,1437.6,1440.8,1445.7,1447.8,1458.2,1461.9,1481.8,1486.8,1522.7,1521.3,1521.1,1531.5,1546.1,1534.9,1537.7,1538.6,1523.6,1518.8,1518.4,1514.6,1540.3,1565,1554.5,1556.6,1559.8,1541.9,1542.9,1540.05,1558.9,1566.2,1561.9,1536.2,1523.8,1509.1,1506.2,1532.2,1516.6,1519.7,1515,1519.5,1512.1,1524.5,1534.4,1543.3,1543.3,1542.8,1519.5,1507.2,1493.5,1511.4,1525.8,1522.2,1518.8,1515.3,1518,1522.3,1508,1501.5,1503,1495.5,1501.1,1497.9,1498.7,1492.1,1499.4,1506.9,1520.9],
    [1282.85,1315,1318.7,1309.6,1317.6,1312.9,1312.4,1319.1,1319,1321,1318.1,1321.3,1319.9,1312,1280.5,1276.15,1308,1309.9,1308.5,1312.3,1329.3,1333.1,1340.2,1347,1345.9,1338,1340.8,1335,1332,1337.9,1333,1336.8,1333.2,1329.9,1340.4,1323.85,1324.05,1349,1366.3,1351.2,1349.1,1352.4,1350.7,1344.3,1338.9,1316.3,1308.4,1306.9,1309.6,1306.7,1312.3,1315.4,1319,1327.2,1317.2,1320,1323,1328,1323,1327.8,1331.7,1335.3,1336.6,1331.8,1311.4,1310,1309.5,1308,1310.6,1302.8,1306.6,1313.7,1320,1322.8,1311,1312.1,1303.6,1293.9,1293.5,1291,1277.9,1294.1,1286,1289.1,1293.5,1296.9,1298,1299.6,1292.9,1285.1,1288.5,1296.3,1297.2,1298.4,1298.6,1302,1300.3,1312,1310.8,1301.9,1292,1291.1,1286.3,1289.2,1289.9,1297.4,1283.65,1283.25,1292.9,1295.9,1290.8,1304.2,1322.7,1336.1,1341,1343.5,1345.8,1340.3,1335.1,1341.5,1347.6,1352.8,1348.2,1353.7,1356.5,1373.3,1398,1414.7,1427,1416.4,1412.7,1420.1,1396.4,1398.8,1426.6,1412.85,1400.7,1406,1399.8,1404.4,1415.5,1417.2,1421.9,1415,1413.7,1428.1,1434,1435.7,1427.5,1429.4,1423.9,1425.6,1427.5,1434.8,1422.3,1412.1,1442.5,1448.8,1468.2,1484.3,1501.6,1506.2,1498.6,1488.9,1504.5,1518.3,1513.9,1503.3,1503,1506.5,1502.1,1503,1534.8,1535.3,1541.4,1528.6,1525.6,1535.25,1528.15,1528,1542.6,1514.3,1510.7,1505.5,1492.1,1492.9,1496.8,1493.1,1503.4,1500.9,1490.7,1496.3,1505.3,1505.3,1517.9,1507.4,1507.1,1493.3,1470.5,1465,1480.5,1501.7,1501.4,1493.3,1492.1,1505.1,1495.7,1478,1487.1,1480.8,1480.6,1487,1488.3,1484.8,1484,1490.7,1490.4,1503.1],
    [1283.35,1315.3,1326.1,1317.4,1321.5,1317.4,1323.5,1319.2,1321.3,1323.3,1319.7,1325.1,1323.6,1313.8,1282.05,1279.05,1314.2,1315.2,1310.8,1329.1,1334.5,1340.2,1340.5,1350,1347.1,1344.3,1344.6,1339.7,1339.4,1343.7,1337,1338.9,1340.1,1338.7,1346.8,1324.25,1329.55,1369.6,1372.5,1352.4,1357.6,1354.2,1353.4,1346,1341,1323.8,1311.9,1309.1,1312.2,1310.7,1324.3,1315.7,1322.4,1333.8,1319.4,1327.1,1325.8,1330.9,1325.8,1331.6,1336.5,1346.7,1339.2,1334.7,1313.3,1316.5,1312.4,1313.4,1313.3,1312.2,1313.7,1319.9,1326.3,1331.9,1311.3,1313.4,1309.4,1295.2,1294.7,1294.1,1277.9,1295.8,1291.2,1297.4,1297.7,1306.8,1299.4,1303.6,1302.2,1289.9,1299.2,1301.8,1303.6,1299.5,1303.2,1305.3,1319.5,1313.6,1315.1,1303.5,1293,1294.6,1290.4,1291.4,1302.7,1301,1284.15,1284.95,1294.3,1297.9,1304.1,1322.6,1339.3,1340.1,1344.9,1354,1357.4,1340.7,1342.7,1348.2,1355.1,1355.9,1354.2,1362.1,1360.1,1408.3,1411.2,1429.5,1430.1,1426.8,1423.4,1425.1,1400.8,1419.8,1432.9,1423.55,1412.1,1412.2,1412.8,1424.9,1419.3,1424.8,1426.1,1423.6,1435.9,1440.8,1439.4,1439.7,1434.5,1436.5,1427.5,1432.2,1433.3,1441.8,1437.8,1432.4,1457.5,1476.5,1484.2,1519.6,1509.5,1508.5,1517.2,1514.1,1527.8,1531.2,1523.6,1511.6,1515.7,1515.7,1508.5,1537.6,1537.2,1551.8,1549.1,1536.9,1529.4,1538.05,1535.15,1555.9,1560.4,1525.5,1515.5,1511.1,1499.2,1503.2,1507.4,1499.5,1511.5,1513.4,1515.8,1506.2,1515.1,1531.5,1540.2,1512.3,1515.2,1506.4,1472.9,1489,1507.9,1513.8,1512.9,1504.4,1503.9,1512.8,1500.9,1488.7,1497.6,1483.5,1494,1498.3,1494.1,1488.1,1487.5,1495.7,1504.7,1505.3],
];*/

export function clearChart(elem) {
    // Clear any existing uPlot diagrams within the element
    const children = elem.querySelectorAll(".uplot");
    children.forEach(function(child) {
        elem.removeChild(child)
    });

    if(resizeCallback) {
        window.removeEventListener("resize", resizeCallback);
        resizeCallback = null;
    }
}


export function drawCandleStickChart(_uPlot, title, elem, data) {

    console.log("Starting drawCandleStickChart", title);
    uPlot = _uPlot;

    clearChart(elem);
    // random volume data
    // data.push(data[0].map(v => randInt(10, 250)));

    let maxVol = Math.max.apply(null, data[5]);

    const fmtDate = uPlot.fmtDate("{YYYY}-{MM}-{DD}");
    const tzDate = ts => uPlot.tzDate(new Date(ts * 1e3), "Etc/UTC");

    function getSize() {
        // return {
        //    width: window.innerWidth - 100,
        //    height: window.innerHeight - 200,
        //}


        return {
            width: elem.offsetWidth,
            height: elem.offsetHeight,
        }
    }

    const size = getSize();

    // A hack tp make the chart more suitable for mobile
    // We do not dynamically manipulate axes
    // so you get whatever size you have on the page load
    const largeScreen = size.width > 900;
    let axes;

    // SHIB price is in very small decimals $0.0000363
    // dynamically adjust price axis label widths if the price is very low
    let priceColumnWidth = 55;
    if(data) {
        // The open price of the first tick
        if(data[1]) {
            const firstOpenPrice = data[1][0];
            if(firstOpenPrice) {
                if(firstOpenPrice < 0.001) {
                    priceColumnWidth = 80;
                }
            }
        }
    }

    if(largeScreen) {
        axes = [
            {},
            {
                //label: "Price",
                side: 1,
                space: 40,
                size: priceColumnWidth,
                gap: 0,
                //values: (u, vals) => vals.map(v => fmtUSD(v, 0)),
                values: (u, vals) => vals.map(v => formatDollar(v)),
            },
            {
                // label: "Volume",
                space: 40,
                size: 75,
                scale: 'vol',
                grid: {show: false},
                values: (u, vals) => vals.map(v => formatDollar(v, 2, 4)),
            },
        ];
    } else {
        // No label on mobile
        axes = [
            {},
            {
                space: 40,
                size: 40,
                scale: 'vol',
                grid: {show: false},
            },
            {
                side: 1,
                space: 40,
                size: 40,
                gap: 0,
                values: (u, vals) => vals.map(v => fmtUSD(v, 0)),
            },
        ];
    }

    const opts = {
        ...size,
        title: title,
        tzDate,
        plugins: [
            columnHighlightPlugin(),
            legendAsTooltipPlugin(),
            candlestickPlugin()
        ],
        scales: {
            x: {
                distr: 2,
            },
            vol: {
                range: [0, maxVol * 3],
            },
        },
        series: [
            {
                label: "Time",
                value: (u, ts) => formatUnixTimestamp(ts),
            },
            {
                label: "Open",
                value: (u, v) => formatDollar(v),
            },
            {
                label: "High",
                value: (u, v) => formatDollar(v, 2),
            },
            {
                label: "Low",
                value: (u, v) => formatDollar(v, 2),
            },
            {
                label: "Close",
                value: (u, v) => formatDollar(v, 2),
            },
            {
                label: "Volume",
                scale: 'vol',
                value: (u, v) => formatDollar(v),
            },
        ],
        axes: axes,
    };

    let u = new uPlot(opts, data, elem);

    // console.log("uPlot draw complete", u);
    resizeCallback = throttle(() => u.setSize(getSize()), 100);

    window.addEventListener("resize", resizeCallback);
    //window.addEventListener("resize", e => {u.setSize(getSize());
    //});
}