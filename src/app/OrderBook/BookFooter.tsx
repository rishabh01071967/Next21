import './OrderBook.css'
import {Real,FullBook} from './Constant'
const BookFooter = () => {
    return (
        <div className="footer">
            <h4>|{Real}</h4>
            <h4 style={{ color: '#82baf6' }}>{FullBook}</h4>
        </div>
    )
}
export default BookFooter