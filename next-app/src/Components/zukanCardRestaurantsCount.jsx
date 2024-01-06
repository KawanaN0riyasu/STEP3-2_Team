import { useState, useEffect } from 'react';

const ZukanCardRestaurantsCount = ({ zukan }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // FastAPIのエンドポイントにリクエストを送信してデータを取得する
        fetch('http://localhost:8000/get_zukan_restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // zukan.id と一致する zukanRestaurants の数をカウントする関数
    const countMatchingRestaurants = () => {
        return restaurants.filter((restaurant) => restaurant.zukan_id === zukan.id).length;
    };

    const countZeroVisitAchievements = () => {
        return restaurants.filter((restaurant) => restaurant.zukan_id === zukan.id && restaurant.visit_achievements !== 0).length;
    };

    return (
        <div className="number flex items-center">
            <div className="completed text-lg">{countZeroVisitAchievements()}</div>
            <div className="notcompleted text-sm ml-1">/{countMatchingRestaurants()}軒</div>
        </div>
    );
};
    
export default ZukanCardRestaurantsCount;