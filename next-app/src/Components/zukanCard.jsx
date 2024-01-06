import Link from 'next/link';
import Image from 'next/image';
import ZukanCardRestaurantsCount from './zukanCardRestaurantsCount'; 

const ZukanCard = ({ zukan }) => {
    const defaultImage = '/photo_up.png';
    return (
        <div className="card w-48 bg-base-100 shadow-xl m-1">
            <figure className="px-3 pt-3">
                {/* ここで `zukan.image` を使用して画像のURLを指定 */}
                <Image src={zukan.image || defaultImage} width={300} height={200} alt={zukan.title} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-md">{zukan.title}</h2>

                {/* ここで適切なデータを使用してカードの進捗を表示 */}
                <ZukanCardRestaurantsCount zukan={zukan} />

                <div className="card-actions">
                {/* ここで適切なリンク先を指定 */}
                    <Link href="anmitsuzukan_kuwa/">
                        <button className="btn btn-base-200">図鑑を見る</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ZukanCard;