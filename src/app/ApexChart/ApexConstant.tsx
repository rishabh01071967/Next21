export const obj = ['1m', '5m', '15m', '30m', '1h', '3h', '4h', '6h', '12h', '1D', '1W', '1M'];
export const options: any = {
    title: {
        text: 'CandleStick Chart',
        align: 'center',
        style: {
            color: '#c4c7c9'
        }
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
export const section = 'hist';
export const BTC = 'BTC/USD';
