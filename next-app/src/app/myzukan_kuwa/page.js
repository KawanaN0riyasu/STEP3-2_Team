/*import */
import Link from 'next/link'
import Image from 'next/image'
import styles from '../page.module.css'

/*メタデータ */
export const metadata = {
    title: 'MY図鑑'
}

/*ここから*/
export default function Page(){
    return(
        <>
        {/*SPサイズにする */}
          <div className="artboard phone-4">
        {/*メニューバー（上部） */}
          <div className="navbar bg-orange-100 justify-between">

        {/*プロフィールアイコン */}
          <div className="flex-auto">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="/images/character_girl_normal.png" />
            </div>
            </div>  

            <p>yukiko*1210</p>
        
            <Image src="/images/medal_icon.png"
            width={30}
            height={30}
            alt="medal_icon"/>
     
            <Image src="/images/medal_icon.png"
            width={30}
            height={30}
            alt="medal_icon"/>  
             

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="badge badge-sm indicator-item">10</span>
            </div>
            </div>
         
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

        {/*図鑑 1段目*/}
        <div className="card_container1 flex">

        <div className="card w-48 bg-base-100 shadow-xl m-1">
          <figure className="px-5 pt-5">
            <Image src="/images/tokyo_asakusa.jpg" width={300} height={200} alt="tokyo_asakusa"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-sm mt-2">浅草×あんみつ</h2>
            <p>10/25</p>
            <div className="card-actions">
              <Link href ="yukiko*1210_001/">
              <button className="btn btn-base-200">図鑑を見る</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card w-48 bg-base-100 shadow-xl m-1">
          <figure className="px-5 pt-5">
            <Image src="/images/ramen.webp" width={300} height={200} alt="ramen"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-sm mt-2">池袋×ラーメン</h2>
            <p>10/15</p>
            <div className="card-actions">
              <Link href ="yukiko*1210_001/">
              <button className="btn btn-base-200">図鑑を見る</button>
              </Link>
            </div>
          </div>
        </div>

        </div>

        {/*図鑑 2段目*/}
        <div className="card_container2 flex">

        <div className="card w-48 bg-base-100 shadow-xl m-2">
          <figure className="px-5 pt-5">
            <Image src="/images/sinzyuku_okonomi.jpeg" width={300} height={200} alt="sinzyuku_okonomi"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-sm mt-2">新宿×お好み焼き</h2>
            <p>10/50</p>
            <div className="card-actions">
              <Link href ="yukiko*1210_001/">
              <button className="btn btn-base-200">図鑑を見る</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card w-48 bg-base-100 shadow-xl m-2">
          <figure className="px-5 pt-5">
            <Image src="/images/umeda_bread.jpeg" width={300} height={200} alt="umeda_bread"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-sm mt-2">梅田×パン屋</h2>
            <p>8/12</p>
            <div className="card-actions">
              <Link href ="yukiko*1210_001/">
              <button className="btn btn-base-200">図鑑を見る</button>
              </Link>
            </div>
          </div>
        </div>

        </div>

        </div>
      </>
    )
}