"use client"
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './OrderBook.css';
import Heading from './Heading';
import BookFooter from "./BookFooter";
import TableContent from "./TableContent";
import '../ApexChart/ApexChart.css';
import { request } from './Constant';

const OrderBook = () => {
    const [bids, setBids] = useState<{ [key: string]: Array<number> }>({});
    const [asks, setAsks] = useState<{ [key: string]: Array<number> }>({});
    const [loading, setLoading] = useState<boolean>(false);
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
            setLoading(true);
            socket.send(JSON.stringify(request));
        }
        socket.onmessage = (event) => {
            let lastjsonmessage = JSON.parse(event.data)
            if (lastjsonmessage && Array.isArray(lastjsonmessage)) {
                setLoading(false)
                let data = lastjsonmessage[1];
                if (data.length > 3) {
                    data.forEach((item: Array<number>, index: number) => {
                        calculate(item);
                    })
                }
                else if (data.length === 3) {
                    calculate(data);
                }
            }
        }
        socket.onclose = () => { }
        return () => {
            socket.close();
        }
    }, [])

    return (
        <div className="container">
            <div>
                <Heading/>
            </div>
            {loading ? <div className="circularLoading"><CircularProgress/></div> : <TableContent asks={asks} bids={bids} />}
            <BookFooter/>
        </div>
    )
}
export default OrderBook