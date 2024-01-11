import Link from 'next/link';
import Image from 'next/image';
import ZukanCardRestaurantsCount from './zukanCardRestaurantsCount'; 

const ZukanCard = ({ zukan }) => {
    const defaultImage = '/photo_up.png';
    const handleButtonClick = () => {
        // ボタンがクリックされたときの処理
        localStorage.removeItem("selectedZukan");
        // ここでzukanをlocalStorageに保存する
        localStorage.setItem('selectedZukan', JSON.stringify(zukan));
    };

    return (
        <div className="card w-48 bg-base-100 shadow-xl m-1">
            <figure className="px-3 pt-3">
                {/* ここで `zukan.image` を使用して画像のURLを指定 */}
                <Image 
                    src={zukan.image || defaultImage} 
                    width={300} 
                    height={200} 
                    alt={zukan.title} 
                    priority 
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-md">{zukan.title}</h2>

                {/* ここで適切なデータを使用してカードの進捗を表示 */}
                <ZukanCardRestaurantsCount zukan={zukan} />

                <div className="card-actions">
                {/* ここで適切なリンク先を指定 */}
                    <Link href="06_restaurantList/">
                        <button className="btn btn-base-200" onClick={handleButtonClick}>図鑑を見る</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ZukanCard;