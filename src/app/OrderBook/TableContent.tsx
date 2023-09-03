import './OrderBook.css'
import { Price, Count, Amount, Total } from './Constant'
type TableContent = {
    asks: { [key: string]: Array<number> };
    bids: { [key: string]: Array<number> };
}

const TableContent = ({ asks, bids }: TableContent) => {
    let totalAsks = 0;
    let totalBids = 0;
    return (
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>{Count}</th>
                        <th>{Amount}</th>
                        <th>{Total}</th>
                        <th>{Price}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(bids).map((item: Array<number>, index: number) => {
                        totalBids += item[2];
                        return (
                            <tr key={index} style={{ textAlign: 'center', backgroundImage: `linear-gradient(to left, rgb(49, 68, 50) ${totalBids * 3}%, rgb(27, 38, 45) 0%)` }} >
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
                        <th>{Price}</th>
                        <th>{Total}</th>
                        <th>{Amount}</th>
                        <th>{Count}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(asks).map((item: Array<number>, index: number) => {
                        totalAsks = Math.abs(item[2]) + totalAsks;
                        return (
                            <tr key={index} style={{ textAlign: 'center', backgroundImage: `linear-gradient(to right, #402c33 ${totalAsks * 3}%, #1b262d 0%)` }}>
                                <td>{item[0]}</td>
                                <td>{totalAsks.toFixed(2)}</td>
                                <td>{Math.abs(Number(item[2].toFixed(2)))}</td>
                                <td>{item[1]}</td>
                            </tr>
                        );
                    })}

                </tbody>

            </table>
        </div>
    )
}
export default TableContent