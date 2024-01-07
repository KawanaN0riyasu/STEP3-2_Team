import { useState, useEffect } from 'react';

const API_ENDPOINT = 'http://localhost:8000/get_zukan_restaurants';

const Button = ({ restaurant }) => {
    const [zukan_restaurants, setZukan_restaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(data => setZukan_restaurants(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const Zukan_restaurant = () => {
        return zukan_restaurants.find(zukan_restaurant => zukan_restaurant.restaurant_id === restaurant.id);
    };

    // Zukan_restaurant.visit_achievements の値に基づいて表示するボタンのラベルを設定
    const getButtonLabel = () => {
        const visitAchievements = Zukan_restaurant()?.visit_achievements || 0;
        return visitAchievements === 0 ? 'これから' : '行った';
    };
    return (
        <>
            {/*お店リスト */}
            <button className="btn btn-xs btn-outline">{getButtonLabel()}</button>
        </>
    );
};

export default Button;
