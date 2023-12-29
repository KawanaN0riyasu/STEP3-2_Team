/*import */
import Link from 'next/link'
import Image from 'next/image'
import styles from '../page.module.css'

/*メタデータ */
export const metadata = {
    title: '浅草×あんみつ'
}


/*ここから*/
export default function Page(){
    return(
        <>
        {/*スマホサイズ指定 */}
        <div className="artboard phone-4">

        {/*図鑑タイトル*/}
        <h1 className="card-title text-md mt-2 mb-2">浅草×あんみつ図鑑</h1>
        
        <div className="flex items-center mt-2 mb-2">
            <p className="text-xs">東京に友達が来た時、一緒に行くあんみつ屋さんまとめ図鑑。有名どころ&老舗多め。</p>
            <figure>
                <Image src="/images/tokyo_asakusa.jpg" width={200} height={100} alt="tokyo_asakusa"/>
            </figure>
        </div>  

        {/*数値データ*/}
        <div className="flex-none flex items-center bg-orange-100 pt-3 pb-3">

            <div className="flex-none flex-grow flex flex-col items-center">  
            <button className="btn btn-sm btn-outline mb-1">行った</button>
            <p className="text-xl font-bold">10</p>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <button className="btn btn-sm btn-outline mb-1">これから</button>
            <p className="text-xl font-bold">25</p>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <button className="btn btn-sm btn-outline mb-1">達成率</button>
            <p className="text-xl font-bold">40</p>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <button className="btn btn-sm btn-outline mb-1">登録数</button>
            <p className="text-xl font-bold">03</p>
            </div>

        </div>


        {/*ソート */}
        <div className="flex">
        <select className="select select-bordered max-w-x ml-auto text-xs w-30 h-6 m-2">
          <option disabled selected>更新日が新しい順</option>
          <option>登録数が多い順</option>
          <option>友達登録が多い順</option>
        </select>
        </div>

        {/*お店リスト */}

        <div className="card card-side bg-base-100">
            <figure>
                <Image src="/images/anmitsu.jpeg" width={100} height={100} alt="anmitsu"/>
            </figure>
            <div className="card-body">
                <button className="btn btn-xs btn-outline">行った</button>
                    <Link href ="myzukan/">
                    <h2 className="link m-1">あんみつの深緑堂</h2>
                    </Link>  
                <div className="flex">
                    <button className="btn btn-xs mt-auto">更新</button>
                    <button className="btn btn-xs mt-auto">削除</button>
                </div>
            </div>
        </div>

        <div className="card card-side bg-base-100">
            <figure>
                <Image src="/images/anmitsu.jpeg" width={100} height={100} alt="anmitsu"/>
            </figure>
            <div className="card-body">
                <button className="btn btn-xs btn-outline">行った</button>
                    <Link href ="myzukan/">
                    <h2 className="link m-1">浅草いづ美</h2>
                    </Link>  
                <div className="flex">
                    <button className="btn btn-xs mt-auto">更新</button>
                    <button className="btn btn-xs mt-auto">削除</button>
                </div>
            </div>
        </div>


        <div className="card card-side bg-base-100">
            <figure>
                <Image src="/images/anmitsu.jpeg" width={100} height={100} alt="anmitsu"/>
            </figure>
            <div className="card-body">
                <button className="btn btn-xs btn-outline">これから</button>
                    <Link href ="myzukan/">
                    <h2 className="link m-1">鈴の木</h2>
                    </Link>  
                <div className="flex">
                    <button className="btn btn-xs mt-auto">更新</button>
                    <button className="btn btn-xs mt-auto">削除</button>
                </div>
            </div>
        </div>

        {/*メニューバー（下部）*/}
        <div className="flex-none flex items-center bg-orange-100 pt-3 pb-3">

            <div className="flex-none flex-grow flex flex-col items-center">  
            <Image src="/images/profile_icon.png"
            width={30}
            height={30}
            alt="profile_icon"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/friendszukan_icon.png"
            width={30}
            height={30}
            alt="friendszukan_icon"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/map.png"
            width={30}
            height={30}
            alt="map"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/bell_icon.png"
            width={30}
            height={30}
            alt="bell_icon"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/setting_icon.png"
            width={30}
            height={30}
            alt="setting_icon"/>
            </div>

            </div>
        </div>
        </>
        )
    }