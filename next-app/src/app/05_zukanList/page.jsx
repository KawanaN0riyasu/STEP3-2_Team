'use client'
import { useState, useEffect } from 'react';
import ZukanCard from '../../components/zukanCard';
import Link from 'next/link';
import Image from 'next/image';
import Mockupphone from '../../components/mockupphone'; //デモ用スマホ画面追加
import BottomAppBar from '../../components/BottomAppBar'; //下部メニューバー追加

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
        <Mockupphone> {/*デモ用スマホ画面*/}

        <div style={{  position: 'absolute', bottom: '0', width: '100%', zIndex: '100', marginLeft:'6px' }}>
            <BottomAppBar />{/*下部メニューバー*/}
        </div>
        

                {/*メニューバー（上部） */}
                <div className="navbar" style={{backgroundColor: '#FAE7BB', paddingTop: '10px'}}>
                    <div className="flex">
                        {/*プロフィールアイコン */}
                        <div className="profile" style={{display:'flex', alignItems: 'center',margin:'10px'}}>
                        <div className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ">  
                                <Image 
                                    src="/images/character_girl_normal.png" 
                                    width={120} 
                                    height={120} 
                                    alt="user_photo"
                                    priority
                                    loading="eager"
                                />
                            </div>
                        </div>  
                        <div className="text-lg">yukiko*1210</div>
                        </div>
                        <div className='medals' style={{ display: 'flex', alignItems: 'center',maring:'10px'}}>
                            <Image src="/images/medal_icon.png" width={30} height={30} alt="medal_icon" />
                            <Image src="/images/medal_icon.png" width={30} height={30} alt="medal_icon" />
                        </div>
                    </div>
                </div>
                
                {/*ソート */}
                <div className="flex">
                    <select 
                        className="select select-bordered max-w-x ml-auto text-xs w-30 h-6 m-2" 
                        defaultValue="更新日が新しい順"
                    >
                        <option disabled>更新日が新しい順</option>
                        <option>登録数が多い順</option>
                        <option>友達登録が多い順</option>
                    </select>
                </div>
                
                <div>
                    <div className="grid grid-cols-2 gap-1">
                        {zukans.map(zukan => (
                            <ZukanCard key={zukan.id} zukan={zukan} />
                        ))}
                    </div>
                </div>
     </Mockupphone>
    );
};

export default Home;