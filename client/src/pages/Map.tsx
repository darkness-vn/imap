import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MapViewer from '../components/map/Map';

export default function Map () {

    const value = useSelector((state: RootState) => state.auth.auth);
    console.log(value)

    return <div className=''>
        <MapViewer /> 
    </div>
}