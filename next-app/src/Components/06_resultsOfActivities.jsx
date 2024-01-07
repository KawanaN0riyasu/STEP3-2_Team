import { useState, useEffect } from 'react';
import Cards from './06_card';

const API_ENDPOINT = 'http://localhost:8000/get_zukan_restaurants';

const buttonStyle = {
    width: '83px',
    fontSize: '11px',
};

const ActivitiesResults = ({ parsedDataFromLocalStorage }) => {
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

    // zukan.id と一致する zukanRestaurants を抽出する関数
    const RestaurantsIdList = () => {
        return zukan_restaurants.filter((zukan_restaurant) => zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id).map((restaurant) => restaurant.restaurant_id);
    };

    const countMatchingRestaurants = () => {
        return zukan_restaurants.filter(( zukan_restaurant) =>  zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id).length;
    };
    
    const countNotZeroVisitAchievements = () => {
        return zukan_restaurants.filter(( zukan_restaurant) =>  zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id &&  zukan_restaurant.visit_achievements !== 0).length;
    };

    const countZeroVisitAchievements = () => {
        return zukan_restaurants.filter(( zukan_restaurant) =>  zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id &&  zukan_restaurant.visit_achievements === 0).length;
    };

    const visitAchievementsRate = countMatchingRestaurants() !== 0
    ? `${(countNotZeroVisitAchievements() / countMatchingRestaurants() * 100).toFixed(0)}%`
    : 'N/A';
    
    return (
        <>
            <div className="flex-none flex items-center bg-orange-100 pt-3 pb-3 rounded-md">
                {[
                    { label: '行った', count: countNotZeroVisitAchievements() },
                    { label: 'これから', count: countZeroVisitAchievements() },
                    { label: '達成率', count: visitAchievementsRate },
                    { label: 'フォロワー', count: '04人' },
                ].map((item, index) => (
                    <div key={index} className="flex-none flex-grow flex flex-col items-center">
                        <button className="btn btn-sm btn-outline mb-1" style={buttonStyle}>
                            {item.label}
                        </button>
                        <p className="text-xl font-bold">{item.count}</p>
                    </div>
                ))}
            </div>

            {/*ソート */}
            <div className="flex">
            <select 
                className="select select-bordered max-w-x ml-auto text-xs w-30 h-6 m-2"
                defaultValue="updateDesc"
            >
                <option value="updateDesc">更新日が新しい順</option>
                <option value="registerNum">登録数が多い順</option>
                <option value="friendNum">友達登録が多い順</option>
            </select>
            </div>
            <Cards restaurantIds={RestaurantsIdList()} />
        </>
    );
};

export default ActivitiesResults;