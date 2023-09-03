"use client"
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic"
import axios from 'axios';
import DropDown from './DropDown';
import CircularProgress from '@mui/material/CircularProgress';
import './ApexChart.css';
import { options, section, BTC } from './ApexConstant'
type HoveredData = {
  open: number;
  high: number;
  low: number;
  close: number;
}
type chartProper = {
  color1: string,
  hoveredData: HoveredData | null
}
const DynamicChart = dynamic(() => import('react-apexcharts'));
const ApexChart = () => {
  const [chartData, setChartData] = useState<Array<Array<number>>>([]);
  const [chartProperties, setChartProperties] = useState<chartProper>({ color1: '', hoveredData: null })
  const [candle, setCandle] = useState<string>('trade:5m:tBTCUSD');
  useEffect(() => {
    async function getChartData() {
      const response = await axios.get(`https://api-pub.bitfinex.com/v2/candles/${candle}/${section}`);
      setChartData(response.data);
    }
    getChartData()
  }, [candle]);

  options['chart'] = {
    type: 'candlestick',
    events: {
      dataPointMouseEnter: (event: any, chartContext: any, { dataPointIndex, seriesIndex }: any) => {
        const o = chartContext.w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = chartContext.w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = chartContext.w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = chartContext.w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        const ohlcData = { open: o, high: h, low: l, close: c };
        const updatedChartData = { ...chartProperties };
        updatedChartData.hoveredData = { ...ohlcData };
        if ((c - o) > 0) {
          updatedChartData.color1 = 'green';
        }
        else {
          updatedChartData.color1 = 'red';
        }
        setChartProperties(updatedChartData);
      },
    },
  }
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
      <div className='flexContent'>
        <DropDown handleCandle={handleCandle} />
        <div className='btcHeading'>
          <h3>{BTC}</h3>
        </div>
        <div>
          {chartProperties['hoveredData'] && (
            <div className='flexContent'>
              <h4 style={{ color: `${chartProperties['color1']}` }}>Open: {chartProperties['hoveredData'].open}</h4>
              <h4 style={{ color: `${chartProperties['color1']}` }}>High: {chartProperties['hoveredData'].high}</h4>
              <h4 style={{ color: `${chartProperties['color1']}` }}>Low: {chartProperties['hoveredData'].low}</h4>
              <h4 style={{ color: `${chartProperties['color1']}` }}>Close: {chartProperties['hoveredData'].close}</h4>
            </div>
          )}
        </div>
      </div>
      {chartData.length === 0 ? <div className='circularLoading'><CircularProgress/></div> : <div>
        {typeof window !== 'undefined' && <DynamicChart options={options} series={series} type="candlestick" height='720px' />}
      </div>}
    </div>
  );
};

export default ApexChart;
