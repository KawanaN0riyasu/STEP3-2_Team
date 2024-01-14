import { useState, useEffect, useMemo } from 'react';
import Cards from './06_card';

const API_ENDPOINT = 'http://localhost:8000/get_zukan_restaurants';

const buttonStyles = {
    行った: { width: '75px', fontSize: '10px', backgroundColor: '#FCAA00', color: 'white' },
    これから: { width: '75px', fontSize: '10px', backgroundColor: 'white', color: '#767676'},
    達成率: { width: '75px', fontSize: '10px', backgroundColor: '#767676', color: 'white' },
    フォロワー: { width: '75px', fontSize: '9px', backgroundColor: '#61C359', color: 'white' },
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
    const RestaurantsList = useMemo(() => {
        return zukan_restaurants.filter(zukan_restaurant => zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id);
    }, [zukan_restaurants, parsedDataFromLocalStorage.id]);

    const countMatchingRestaurants = useMemo(() => RestaurantsList.length, [RestaurantsList]);
    

    //const countMatchingRestaurants = RestaurantsIdList().length
    
    const countNotZeroVisitAchievements = () => {
        return zukan_restaurants.filter(( zukan_restaurant) =>  zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id &&  zukan_restaurant.visit_achievements !== 0).length;
    };

    const countZeroVisitAchievements = () => {
        return zukan_restaurants.filter(( zukan_restaurant) =>  zukan_restaurant.zukan_id === parsedDataFromLocalStorage.id &&  zukan_restaurant.visit_achievements === 0).length;
    };

    const visitAchievementsRate = countMatchingRestaurants !== 0
    ? `${(countNotZeroVisitAchievements() / countMatchingRestaurants * 100).toFixed(0)}%`
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
                        <button className="btn btn-sm mb-1" style={buttonStyles[item.label]}>
                            {item.label}
                        </button>
                        <p className="text-xl font-bold">{item.count}</p>
                    </div>
                ))}
            </div>

            <Cards restaurantsIDList={RestaurantsList} />
        </>
    );
};

export default ActivitiesResults;