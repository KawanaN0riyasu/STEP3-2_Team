'use client'
import { useState, useEffect } from 'react';
import ZukanCard from '../../components/zukanCard';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
    const [zukans, setZukans] = useState([]);

    useEffect(() => {
        // FastAPIのエンドポイントにリクエストを送信してデータを取得する
        fetch('http://localhost:8000/get_zukans')
            .then(response => response.json())
            .then(data => setZukans(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <>
        <div className="flex justify-center items-center">
            {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
            <div className="artboard phone-4">

                {/*メニューバー（上部） */}
                <div style={{backgroundColor: '#FAE7BB'}} className="navbar rounded-md mt-1">
                    
                    <div className="flex">

                        {/*プロフィールアイコン */}{/*サイズ見直し！ */}
                        <div className="btn btn-ghost btn-circle avatar m-1">
                            <div className="w-10 rounded-full ">
                                {/*user_photo呼び出す？ */}
                                <Image src="/images/character_girl_normal.png" width={100} height={100} alt="user_photo" />
                            </div>
                        </div>  

                        {/*user_name呼び出す？*/}
                        <div className="text-lg m-1">yukiko*1210</div>

                        {/*メダル数はどこと連携する？ */}
                        <Image src="/images/medal_icon.png" width={30} height={30} alt="medal_icon" />
                        <Image src="/images/medal_icon.png" width={30} height={30} alt="medal_icon" />
                    
                        <Link href ="tomodachizukan_kuwa/">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                    <span className="badge badge-sm indicator-item">10</span>
                                </div>
                            </div>
                        </Link>

                        {/*設定 */}
                        <Link href ="setting_kuwa/">
                            <Image src="/images/setting_icon.png" width={20} height={20} alt="setting_icon"/>
                        </Link>

                    </div>
                </div>

                {/*ソート */}
                <div className="flex">
                    <select className="select select-bordered max-w-x ml-auto text-xs w-30 h-6 m-2"defaultValue="更新日が新しい順">
                        <option disabled>更新日が新しい順</option>
                        <option>登録数が多い順</option>
                        <option>友達登録が多い順</option>
                    </select>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        {zukans.map(zukan => (
                            <ZukanCard key={zukan.id} zukan={zukan} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;