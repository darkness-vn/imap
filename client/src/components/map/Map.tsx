import Map, { GeolocateControl } from "react-map-gl"
import mapboxgl from "mapbox-gl"
import { useRef, useEffect, useState } from "react";
import axios from "axios"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOXTOKEN

interface Props {

}

// mé hóa ra là do CSS nên nó ko hiện (( =
// ca 2 cach viet deu hoat dong binh thuong nha nhung cach viet ref nhu vay se kho hon chut

const MapViewer: React.FC<Props> = () => {

    const mapContainer = useRef<any>()
    const [arroundUsers, setArroundUsers] = useState<Array<any>>([])
    const map = useRef<mapboxgl.Map>();
    const [lng, setLng] = useState(-70.9)
    const [lat, setLat] = useState(42.35)
    const [zoom, setZoom] = useState(9)

    useEffect(() => {
        if (map.current) return
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/scholar99/cldjoa3vv000b01o01l1pwbq4',
            center: [lng, lat],
            zoom: zoom
        })

        map.current?.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true
            })
        )
    });

    const handleFind = () => {
        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {

            const you = JSON.parse(localStorage.getItem("auth")!)

            const { data } = await axios.post("http://localhost:8888/api/map/arround", {
                ...you,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            setArroundUsers(data)
            viewUser(data)
        })
    }

    const viewUser = (data: any) => {
        data.map((item: any) => {
            new mapboxgl.Marker()
                .setLngLat([item._doc.position.lng, item._doc.position.lat])
                //@ts-ignore
                .addTo(map.current);
        })
    }

    return <div className="">
        <button onClick={handleFind} className="fixed z-10 top-3 left-3">Find user</button>
        <div ref={mapContainer} className="map-container" />
        {arroundUsers?.length > 0 && <div className="fixed p-4 space-y-4 z-20 top-3 left-3 rounded-lg bg-gray-700">
            {
                arroundUsers.map((i: any) => {
                    return <div key={i._doc._id} className="cursor-pointer bg-gray-500 px-2 flex space-x-4">
                        <p>{i._doc.username}</p>
                        <p>Khoảng cách: {i.distance}km</p>
                    </div>
                })
            }
            <div className="bg-red-500 px-2 flex space-x-4 text-center">Close</div>
        </div>}
    </div>
}

export default MapViewer