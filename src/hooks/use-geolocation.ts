
import { useEffect, useState } from 'react';
import { Coordinates } from '../api/types';

interface GeoLocationState {
    coordinates: Coordinates | null
    error: string | null
    isLoading: boolean
}


export function useGeoLocation() {
    const [locationData, setlocationData] = useState<GeoLocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    })

    const getLocation = () => {
        setlocationData((prev) => ({
            ...prev,
            isLoading: true,
            error: null
        }))

        if (!navigator.geolocation) {
            setlocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false
            })
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setlocationData({
              coordinates: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
              error: null,
              isLoading: false
            });
        }, (error) => {
            let errorMessage: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please enable location access"
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location Information is Unavailable"
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request Timed Out"
                    break;
                default:
                errorMessage = "An uknown error occurred"
            }

            setlocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false
            })
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    useEffect(() => {
        getLocation()
    }, [])

    return {
        ...locationData,
        getLocation
    }
}