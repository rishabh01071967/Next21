"use client"
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import DropDown from './DropDown';
import CircularProgress from '@mui/material/CircularProgress';
import './ApexChart.css'
type HoveredData = {
  open: number;
  high: number;
  low: number;
  close: number;
}

const ApexChart = () => {
  const [chartData, setChartData] = useState<Array<Array<number>>>([]);
  const [hoveredData, setHoveredData] = useState<HoveredData | null>(null);
  const [color1, setBackgroundColor] = useState<string>('');
  const [candle, setCandle] = useState<string>('trade:5m:tBTCUSD');
  const section = 'hist';
  useEffect(() => {
    async function getChartData() {
      const response = await axios.get(`https://api-pub.bitfinex.com/v2/candles/${candle}/${section}`);
      console.log('resposnedata', response);
      setChartData(response.data);
    }
    getChartData()
  }, [candle]);

  const options: any = {
    // Chart options...
    chart: {
      type: 'candlestick',
      // height: '810px',
      events: {
        dataPointMouseEnter: (event: any, chartContext: any, { dataPointIndex, seriesIndex }: any) => {
          if (typeof window !== 'undefined') {
            const o = chartContext.w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const h = chartContext.w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            const l = chartContext.w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            const c = chartContext.w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            setHoveredData({ open: o, high: h, low: l, close: c });
            if ((c - o) > 0) {
              setBackgroundColor('green');
            }
            else {
              setBackgroundColor('red');
            }
          }
        },
      },
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: 'rgb(170, 170, 170)'
        },
      },
    },
    yaxis: {
      opposite: true,
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: 'rgb(170, 170, 170)'
        },
      },
    },
    candlestick: {
      wick: {
        useFillColor: true,
      }
    }
  };

  const series = [
    {
      data: chartData.map((entry: Array<number>) => ({
        x: new Date(entry[0]),
        y: [entry[1], entry[3], entry[4], entry[2]],
      })),
    },
  ];

  const handleCandle = (data: string) => {
    setCandle(`trade:${data}:tBTCUSD`)
  }

  return (
    <div className='apexContainer'>
      <div style={{ display: 'flex' }}>
        <DropDown handleCandle={handleCandle}></DropDown>
        <div style={{ paddingRight: '5px' }}>
          <h3>BTC/USD</h3>
        </div>
        <div>
          {hoveredData && (
            <div style={{ display: 'flex' }}>
              <h4 style={{ color: `${color1}` }}>Open: {hoveredData.open}</h4>
              <h4 style={{ color: `${color1}` }}>High: {hoveredData.high}</h4>
              <h4 style={{ color: `${color1}` }}>Low: {hoveredData.low}</h4>
              <h4 style={{ color: `${color1}` }}>Close: {hoveredData.close}</h4>
            </div>
          )}
        </div>
      </div>
      {chartData.length === 0 ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress></CircularProgress></div> : <div>
        <Chart options={options} series={series} type="candlestick" height='810px' />
      </div>}
    </div>
  );
};

export default ApexChart;
