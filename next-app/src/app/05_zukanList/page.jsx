/*myzukan_kuwa*/
/*import */
import Link from 'next/link'
import Image from 'next/image'

/*メタデータ */
export const metadata = {
    title: 'MY図鑑'
}

/*ここから*/
export default function Page(){
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

                {/*図鑑 1段目*/}
                <div className="card_container1 flex">

                    {/*図鑑 1段目左*/}
                    <div className="card w-48 bg-base-100 shadow-xl m-1">
                        <figure className="px-3 pt-3">
                            <Image src="/images/tokyo_asakusa.jpg" width={300} height={200} alt="tokyo_asakusa"/>
                        </figure>
                        <div className="card-body items-center text-center">
                        
                            <h2 className="card-title text-md">浅草あんみつ図鑑</h2>

                            <div className="number flex items-center">
                                <div className="completed text-lg">10</div>
                                <div className="notcompleted text-sm ml-1">/25軒</div>
                            </div>

                            <div className="card-actions">
                                <Link href ="anmitsuzukan_kuwa/">
                                    <button className="btn btn-base-100">図鑑を見る</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/*図鑑 1段目右*/}
                    <div className="card w-48 bg-base-100 shadow-xl m-1">
                        <figure className="px-3 pt-3">
                            <Image src="/images/ramen.webp" width={300} height={200} alt="ramen"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-md">池袋ラーメン図鑑</h2>

                            <div className="number flex items-center">
                                <div className="completed text-lg">10</div>
                                <div className="notcompleted text-sm ml-1">/25軒</div>
                            </div>

                            <div className="card-actions">
                                <Link href ="anmitsuzukan_kuwa/">
                                    <button className="btn btn-base-200">図鑑を見る</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/*図鑑 2段目*/}
                <div className="card_container2 flex">

                    {/*図鑑 2段目左*/}
                    <div className="card w-48 bg-base-100 shadow-xl m-2">
                        <figure className="px-3 pt-3">
                            <Image src="/images/sinzyuku_okonomi.jpeg" width={300} height={200} alt="sinzyuku_okonomi"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-md">新宿お好み焼き図鑑</h2>

                            <div className="number flex items-center">
                                <div className="completed text-lg">10</div>
                                <div className="notcompleted text-sm ml-1">/25軒</div>
                            </div>

                            <div className="card-actions">
                                <Link href ="anmitsuzukan_kuwa/">
                                    <button className="btn btn-base-200">図鑑を見る</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/*図鑑 2段目右*/}
                    <div className="card w-48 bg-base-100 shadow-xl m-2">
                        <figure className="px-3 pt-3">
                            <Image src="/images/umeda_bread.jpeg" width={300} height={200} alt="umeda_bread"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-md">梅田パン屋図鑑</h2>

                            <div className="number flex items-center">
                                <div className="completed text-lg">10</div>
                                <div className="notcompleted text-sm ml-1">/25軒</div>
                            </div>

                            <div className="card-actions">
                                <Link href ="anmitsuzukan_kuwa/">
                                    <button className="btn btn-base-200">図鑑を見る</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/*図鑑 ３段目*/}
                <div className="card_container3 flex">

                    {/*図鑑 ３段目左*/}
                    <div className="card w-48 bg-base-100 shadow-xl m-1">
                        <figure className="px-3 pt-3">
                            <Image src="/images/tokyo_asakusa.jpg" width={300} height={200} alt="tokyo_asakusa"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-md">浅草あんみつ図鑑</h2>

                            <div className="number flex items-center">
                                <div className="completed text-lg">10</div>
                                <div className="notcompleted text-sm ml-1">/25軒</div>
                            </div>

                            <div className="card-actions">
                                <Link href ="anmitsuzukan_kuwa/">
                                    <button className="btn btn-base-100">図鑑を見る</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/*図鑑 3段目右*/}
                    <div className="card w-48 bg-base-100 shadow-xl m-1">
                        <figure className="px-3 pt-3">
                            <Image src="/images/ramen.webp" width={300} height={200} alt="ramen"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-md">池袋ラーメン図鑑</h2>

                            <div className="number flex items-center">
                                <div className="completed text-lg">10</div>
                                <div className="notcompleted text-sm ml-1">/25軒</div>
                            </div>

                            <div className="card-actions">
                                <Link href ="anmitsuzukan_kuwa/">
                                    <button className="btn btn-base-200">図鑑を見る</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>       


            </div>
        </div>
        </>
    )
}