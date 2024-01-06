'use client'
import { useState, useEffect } from 'react';
import ZukanCard from '../../components/zukanCard';
import Link from 'next/link';
import Image from 'next/image';



const badgeStyle = {
    width: '23%',
    textAlign: 'center',
    fontSize: '25px',
};


export default function Page() {
    return (
        <>
        <div className="flex justify-center items-center">
            {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
            <div className="artboard phone-4" style={{backgroundColor: 'white'}}>

                {/* 図鑑名 */}
                <div style={{backgroundColor: 'transparent'}} className="navbar rounded-md mt-1">
                    {/* 左側の文章 */}
                    <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: '10px' }}>
                        {/* ここに文章のコンテンツを追加 */}
                        <div style={{ fontSize: '25px'}}>浅草あんみつ図鑑</div>
                        <div>友達と一緒に行くあんみつ屋さん。有名どころ&老舗多め</div>
                    </div>
                    {/* 右側の写真 */}
                    <div style={{ flex: 3 }}>
                        <Image src="/images/top.png" width={70} height={70} alt="top" />
                    </div>
                </div>

                {/* レコード表示 */}
                <div style={{ backgroundColor: '#FAE7BB', paddingTop: '10px ', marginBottom: '10px',borderRadius: '8px', }}>
                    {/* 1行目 */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        margin: '0 auto',  // 中央寄せを追加
                        width: '90%',      // 必要に応じて変更
                    }}>
                        <div className="badge" style={{ width: '23%' }}>登録数</div>
                        <div className="badge" style={{ width: '23%' }}>行った</div>
                        <div className="badge" style={{ width: '23%' }}>これから</div>
                        <div className="badge" style={{ width: '23%' }}>達成率</div>
                    </div>

                    {/* 2行目 */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        margin: '0 auto',  // 中央寄せを追加
                        width: '90%',      // 必要に応じて変更
                    }}>
                        <div style={badgeStyle}>10</div>
                        <div style={badgeStyle}>25</div>
                        <div style={badgeStyle}>40</div>
                        <div style={badgeStyle}>3</div>
                    </div>
                </div>

                {/*ソート */}
                <div className="flex" style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', marginBottom: '10px' }}>
                    <select className="select select-bordered max-w-x ml-auto text-xs w-30 h-6 m-2"defaultValue="更新日順">
                        <option disabled>更新日順</option>
                        <option>登録数が多い順</option>
                        <option>友達登録が多い順</option>
                    </select>
                </div>

                {/*図鑑カード */}
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
                    <div className="card-body">
                        <div>
                            <button style={{ 
                                width: '80px', 
                                backgroundColor: '#FAE7BB' 
                            }}>行った</button>
                        </div>
                        <h2 className="card-title">浅草いづ美</h2>
                        <p>更新日: 2024年1月10日</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}