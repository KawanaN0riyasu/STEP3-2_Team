import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

const API_ENDPOINT = 'http://localhost:8000/get_restaurants';

const Cards = ({ restaurantsIDList }) => {
    const restaurantIds = Array.isArray(restaurantsIDList) ? restaurantsIDList.map(item => item.restaurant_id) : [];
    const [restaurants, setRestaurants] = useState([]);
    const [visitedRestaurants, setVisitedRestaurants] = useState([]);
    const [sortOrder, setSortOrder] = useState('updateDesc'); 
    const filterdList = (restaurantsIDList) => {
        return restaurantsIDList
            .filter(item => item.visit_achievements !== 0)
            .map(item => item.restaurant_id);
    };

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

    useEffect(() => {
        const filteredList = filterdList(restaurantsIDList);
        setVisitedRestaurants(filteredList);
    },  [restaurantsIDList]);

    // ソート順が変更されたときに実行
    useEffect(() => {
        const sortedRestaurants = [...restaurants];
        switch (sortOrder) {
            case 'visit':
                sortedRestaurants.sort((a, b) => {
                    // ソートロジックを実装
                    if (visitedRestaurants.includes(a.id) && !visitedRestaurants.includes(b.id)) {
                        return -1;
                    } else if (!visitedRestaurants.includes(a.id) && visitedRestaurants.includes(b.id)) {
                        return 1;
                    } else {
                        return a.id - b.id;
                    }
                });
                break;
            case 'nonvisit':
                sortedRestaurants.sort((a, b) => {
                    if (!visitedRestaurants.includes(a.id) && visitedRestaurants.includes(b.id)) {
                        return -1;
                    } else if (visitedRestaurants.includes(a.id) && !visitedRestaurants.includes(b.id)) {
                        return 1;
                    } else {
                        return a.id - b.id;
                    }
                });
                break;
            case 'UserRating':
                sortedRestaurants.sort((a, b) => b.rating - a.rating);
                break;
            // 'updateDesc' の場合はデフォルトで登録No順にソート
            default:
                sortedRestaurants.sort((a, b) => a.id - b.id);
                break;
        }

        setRestaurants(sortedRestaurants);
    }, [sortOrder, visitedRestaurants]);




    const RestaurantsList = () => {
        // 1〜16の店舗IDに基づいてフィルタリング
        return restaurants.filter(restaurant => restaurantIds.includes(restaurant.id));
    };

    return (
        <>
            {/*ソート */}
            <div className="flex">
                <select 
                    className="select select-bordered max-w-x ml-auto text-xs w-30 h-6 m-2"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="updateDesc">登録No順</option>
                    <option value="visit">行った優先</option>
                    <option value="nonvisit">これから優先</option>
                    <option value="UserRating">ユーザー評価高い順</option>
                </select>
            </div>
            {/* restaurantsをマップしてCardを生成 */}
            {RestaurantsList().map((restaurant, index) => (
                <div key={restaurant.id} className="card card-side bg-base-100" style={{ height: '200px', display: 'flex', marginBottom: '5px' }} >
                    <figure style={{ flex: 5, position: 'relative'}}>
                        {/*通し番号 */}
                        <p style={{ 
                            position: 'absolute', 
                            top: '5px', 
                            left: '10px',
                            fontSize: '20px', 
                            zIndex: '1' 
                        }}>
                            No.{index + 1}
                        </p>
                        {/* ここで、restaurant.imageを使用 */}
                        <Image 
                            src={restaurant.image} 
                            width={100} 
                            height={100} 
                            alt="no image" 
                            priority
                            style={{ 
                                height: '80%', 
                                marginTop: '20px', 
                                marginLeft: '20px',
                            }}
                        />
                    </figure>
                    <div className="card-body" style={{ flex: 5 }}>
                        {/*お店リスト */}
                        {visitedRestaurants.includes(restaurant.id) ? (
                            <button className="btn btn-xs btn-outline" style={{backgroundColor: '#FCAA00', color:'white'}}>行った</button>
                        ) : (
                            <button className="btn btn-xs btn-outline" style={{backgroundColor: 'white', color: '#767676'}}>これから</button>
                        )}
                        <h2>{restaurant.name}</h2>
                        <p style={{ fontSize: '12px' }}>{restaurant.address}</p>
                        <p style={{ fontSize: '12px' }}>ユーザー評価：{restaurant.rating}</p>
                        <div className="flex">
                            <button className="btn btn-xs mt-auto">詳細</button>
                            <button className="btn btn-xs mt-auto">削除</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Cards;