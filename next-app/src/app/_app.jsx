import { SearchProvider } from '../context/SearchContext';

function MyApp({ Component, pageProps }) {
    return (
        <SearchProvider>
        <Component {...pageProps} />
        </SearchProvider>
    );
}

export default MyApp;