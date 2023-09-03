import SettingsIcon from '@mui/icons-material/Settings';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import './OrderBook.css'
import HeadingContent from './HeadingContent';
import '../ApexChart/ApexChart.css';
import {BTC,OrderBook} from './Constant'
const Heading = () => {
    return (
        <div className='headingContainer'>
            <div className='flexContent'>
                <h3 style={{ color: 'azure' }}>{OrderBook}</h3>
                <h5>{BTC}</h5>
            </div>
            <div className='flexContent'>
                <HeadingContent><SettingsIcon /></HeadingContent>
                <HeadingContent><ZoomInIcon /></HeadingContent>
                <HeadingContent><ZoomOutIcon /></HeadingContent>
            </div>
        </div>
    )
}
export default Heading