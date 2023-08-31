import SettingsIcon from '@mui/icons-material/Settings';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import './OrderBook.css'
const Heading = () => {
    return (
        <div className='headingContainer'>
            <div style={{ display: 'flex' }}>
                <h3 style={{ color: 'azure' }}>OrderBook</h3>
                <h5>BTC/USD</h5>
            </div>
            <div style={{ display: 'flex' }}>
                <div className='heading'>
                    <SettingsIcon></SettingsIcon>
                </div>
                <div className='heading'>
                    <ZoomInIcon></ZoomInIcon>
                </div>
                <div className='heading'>
                    <ZoomOutIcon></ZoomOutIcon>
                </div>
            </div>
        </div>
    )
}
export default Heading