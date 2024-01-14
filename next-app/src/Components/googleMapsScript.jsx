import { useLoadScript } from "@react-google-maps/api";
import { useRef } from 'react'; 

const libraries = ["places"];

export function useGoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCzCWRo1T8I6JC_9C9LTafNKR_A-8W_VC4',
    libraries: libraries,
  });

  const isMounted = useRef(true);
  return { isLoaded, loadError, isMounted };
}