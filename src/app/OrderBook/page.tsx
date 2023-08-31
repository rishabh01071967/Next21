"use client"
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './OrderBook.css';
import Heading from './Heading';
const OrderBook = () => {
    const [bids, setBids] = useState<{ [key: string]: Array<number> }>({});
    const [asks, setAsks] = useState<{ [key: string]: Array<number> }>({});
    const [loading, setLoading] = useState(false);
    let totalAsks = 0;
    let totalBids = 0;
    const request = {
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        len: '25',
        prec: 'P0'
    };
    function calculate(data: Array<number>) {
        let [price, count, amount] = data;
        if (count > 0) {
            if (amount > 0) {
                setBids(prevBids => {
                    return {
                        ...prevBids,
                        [price]: data
                    };
                });
            }
            else {
                setAsks(prevAsks => {
                    return {
                        ...prevAsks,
                        [price]: data
                    }
                })
            }
        }
        else {
            if (amount === 1) {
                setBids(prevBids => {
                    if (prevBids.hasOwnProperty(price)) {
                        const updatedBids = { ...prevBids };
                        delete updatedBids[price];
                        return updatedBids;
                    }
                    return prevBids;
                });
            }
            else {
                setAsks(prevAsks => {
                    if (prevAsks.hasOwnProperty(price)) {
                        const updatedAsks = { ...prevAsks };
                        delete updatedAsks[price];
                        return updatedAsks;
                    }
                    return prevAsks;
                });
            }
        }

    }

    useEffect(() => {
        let socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
        socket.onopen = () => {
            console.log('socketopen');
            setLoading(true);
            socket.send(JSON.stringify(request));
        }
        socket.onmessage = (event) => {
            console.log('message');
            let lastjsonmessage = JSON.parse(event.data)
            if (lastjsonmessage && Array.isArray(lastjsonmessage)) {
                setLoading(false)
                let data = lastjsonmessage[1];
                if (data.length > 3) {
                    console.log('greater');
                    data.forEach((item: Array<number>, index: number) => {
                        calculate(item);
                    })
                }
                else if (data.length === 3) {
                    // console.log('3');
                    calculate(data);
                }
            }
        }

        socket.onclose = () => {
            console.log('close')
        }

        return () => {
            socket.close();
        }
    }, [])

    return (
        <div className="container">
            <div>
                <Heading></Heading>
            </div>
            {loading ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress></CircularProgress></div> : <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>count</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(bids).map((item: Array<number>, index: number) => {
                            totalBids += item[2];
                            return (
                                <tr key={index} style={{ textAlign: 'center', backgroundImage: `linear-gradient(to left, rgb(49, 68, 50) ${totalBids * 5}%, rgb(27, 38, 45) 0%)` }} >
                                    <td>{item[1]}</td>
                                    <td>{item[2].toFixed(2)}</td>
                                    <td>{totalBids.toFixed(2)}</td>
                                    <td>{item[0]}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Amount</th>
                            <th>count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(asks).map((item: Array<number>, index: number) => {
                            totalAsks = Math.abs(item[2]) + totalAsks;
                            return (
                                <tr key={index} style={{ textAlign: 'center', backgroundImage: `linear-gradient(to right, #402c33 ${totalAsks * 5}%, #1b262d 0%)` }}>
                                    <td>{item[0]}</td>
                                    <td>{totalAsks.toFixed(2)}</td>
                                    <td>{Math.abs(Number(item[2].toFixed(2)))}</td>
                                    <td>{item[1]}</td>
                                </tr>
                            );
                        })}

                    </tbody>

                </table>
            </div>}
            <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: '15px' }}>
                <h4>| REALTIME</h4>
                <h4 style={{ color: '#82baf6' }}>FULL BOOK </h4>
            </div>

        </div>
    )
}
export default OrderBook