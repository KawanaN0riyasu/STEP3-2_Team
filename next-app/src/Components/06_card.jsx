import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './06_button';

const API_ENDPOINT = 'http://localhost:8000/get_restaurants';

const Cards = ({ restaurantIds }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const RestaurantsList = () => {
        // 1〜16の店舗IDに基づいてフィルタリング
        return restaurants.filter(restaurant => restaurantIds.includes(restaurant.id));
    };

    return (
        <>
            {/* restaurantsをマップしてCardを生成 */}
            {RestaurantsList().map((restaurant) => (
                <div key={restaurant.id} className="card card-side bg-base-100" style={{ height: '200px', display: 'flex', marginBottom: '5px' }} >
                    <figure style={{ flex: 5 }}>
                        {/* ここで、restaurant.imageを使用 */}
                        <Image 
                            src={restaurant.image} 
                            width={100} 
                            height={100} 
                            alt="no image" 
                            priority
                            style={{ height: '80%'}}
                        />
                    </figure>
                    <div className="card-body" style={{ flex: 5 }}>
                        <Button restaurant={restaurant} />
                        <h2>{restaurant.name}</h2>
                        <p style={{ fontSize: '12px' }}>{restaurant.address}</p>
                        <p style={{ fontSize: '12px' }}>ユーザー評価：{restaurant.rating}</p>
                        <div className="flex">
                            <button className="btn btn-xs mt-auto">更新</button>
                            <button className="btn btn-xs mt-auto">削除</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Cards;