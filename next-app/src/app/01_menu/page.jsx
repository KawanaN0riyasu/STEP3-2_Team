'use client'
import React from 'react';
import Link from 'next/link';
import MenuButton from '../../components/MenuButton';
import Mockupphone from '../../components/mockupphone';//デモ用スマホ画面追加（01/08)

const Menu = () => {
    const handleButtonClick = (title) => {
        // ボタンがクリックされたときの処理をここに追加
        console.log(`${title} ボタンがクリックされました`);
    };

    return (
        <>
            <Mockupphone> {/*スマホ画面 */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: '70vh',
                        width: '95%',
                        textAlign: 'center', // text-align を追加
                    }}
                >
                    <h1 style={{ 
                        width: '95%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginTop: '30px', 
                        marginBottom: '20px', 
                        borderBottom: '2px solid #FFA500', 
                        paddingBottom: '10px',
                        fontWeight: 'bold',
                    }}>
                        もぐもぐ図鑑 Menu
                    </h1>
                    <Link 
                        href="/02_mapSearch" 
                        passHref 
                        style={{
                            width: '48%',
                            height: '40%',
                            margin: '2px',
                        }}
                    >
                        <MenuButton title="MAP検索" onClick={() => handleButtonClick("MAP検索")} />
                    </Link>
                    <Link 
                        href="/05_zukanList"
                        passHref 
                        style={{
                            width: '48%',
                            height: '40%',
                            margin: '2px',
                        }}
                    >
                        <MenuButton title="My図鑑" onClick={() => handleButtonClick("My図鑑")} />
                    </Link>
                    <Link 
                        href="/02_mapSearch"
                        passHref 
                        style={{
                            width: '48%',
                            height: '40%',
                            margin: '2px',
                        }}
                    >
                        <MenuButton title="ともだち" onClick={() => handleButtonClick("ともだち")} />
                    </Link>
                    <Link 
                        href="/02_mapSearch"
                        passHref 
                        style={{
                            width: '48%',
                            height: '40%',
                            margin: '2px',
                        }}
                    >
                        <MenuButton title="その他" onClick={() => handleButtonClick("その他")} />
                    </Link>
                </div>
            </Mockupphone>
            </>
    );
};

export default Menu;