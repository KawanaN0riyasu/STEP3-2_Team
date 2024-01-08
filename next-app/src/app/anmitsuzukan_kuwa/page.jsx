/*anmitsuzukan_kuwa*/
/*import */
import Link from 'next/link'
import Image from 'next/image'
import BottomAppBar from '../../components/BottomAppBar';//下部メニューバー追加（01/08)
import Mockupphone from '../../components/mockupphone';//デモ用スマホ画面追加（01/08)


/*メタデータ */
export const metadata = {
    title: '浅草×あんみつ'
}

export default function Page(){
    return(
        <> 
        <Mockupphone>{/*スマホ画面 */}
    
                {/*図鑑タイトル*/}

                <div className="flex items-center m-3 p-3" style={{ borderBottom: '1px dotted #767676' }}>
                    <Image src="/images/mogumogu.png" width={50} height={50} alt="mogumogu"/>
                    <h1 className="card-title m-2">浅草あんみつ図鑑</h1>
                </div> 

                <div className="flex items-center m-3">
                    <p className="text-xs mr-2">東京に友達が来た時、一緒に行くあんみつ屋さんまとめ図鑑。有名どころ&老舗多め。</p>
        
                    <Image 
                        src="/images/tokyo_asakusa.jpg"
                        width={100}
                        height={100}
                        alt="tokyo_asakusa"/>
                    
                </div>  

                {/*数値データ→DB呼び出し*/}
                <div className="flex-none flex items-center bg-orange-100 p-3 ml-3 mr-3 rounded-md">

                    <div className="flex-none flex-grow flex flex-col items-center"> 
                    <div className="badge" style={{fontSize:'0.5rem',backgroundColor:'#FCAA00'}}>体験済み</div> 
                    <p className="text-xl font-bold">10軒</p>
                    </div>

                    <div className="flex-none flex-grow flex flex-col items-center"> 
                    <div className="badge" style={{fontSize:'0.5rem'}}>未体験</div> 
                    <p className="text-xl font-bold">25軒</p>
                    </div>

                    <div className="flex-none flex-grow flex flex-col items-center"> 
                    <div className="badge" style={{fontSize:'0.5rem',backgroundColor:'#767676',color:'#FFFFFF'}}>達成率</div> 
                    <p className="text-xl font-bold">40%</p>
                    </div>

                    <div className="flex-none flex-grow flex flex-col items-center"> 
                        <div className="badge" style={{fontSize:'0.5rem',backgroundColor:'#23CB57'}}>フォロワー</div> 
                    <p className="text-xl font-bold">03人</p>
                    </div>

                </div>


                {/*ソート */}
                <div className="flex">
                <select className="select select-bordered max-w-x ml-auto text-xs w-30 h-5 m-2">
                <option disabled selected>更新日が新しい順</option>
                <option>登録数が多い順</option>
                <option>友達登録が多い順</option>
                </select>
                </div>

                {/*お店リスト */}

                <div className="card card-side bg-base-100 pt-1 pl-3 pr-3">
                    <figure>
                        <Image src="/images/anmitsu.jpeg" width={100} height={100} alt="anmitsu"/>
                    </figure>
                    <div className="card-body p-3">
                    <div className="badge" style={{fontSize:'0.5rem',backgroundColor:'#FCAA00'}}>体験済み</div> 
                            <Link href ="myzukan/">
                            <h2 className="link m-1">あんみつの深緑堂</h2>
                            </Link>  
                        <div className="flex">
                            <button className="btn btn-xs mt-auto">更新</button>
                            <button className="btn btn-xs mt-auto">削除</button>
                        </div>
                    </div>
                </div>

                <div className="card card-side bg-base-100 pt-1 pl-3 pr-3">
                    <figure>
                        <Image src="/images/anmitsu.jpeg" width={100} height={100} alt="anmitsu"/>
                    </figure>
                    <div className="card-body p-3">
                    <div className="badge" style={{fontSize:'0.5rem',backgroundColor:'#FCAA00'}}>体験済み</div>
                            <Link href ="myzukan/">
                            <h2 className="link m-1">浅草いづ美</h2>
                            </Link>  
                        <div className="flex">
                            <button className="btn btn-xs mt-auto">更新</button>
                            <button className="btn btn-xs mt-auto">削除</button>
                        </div>
                    </div>
                </div>


                <div className="card card-side bg-base-100 pt-1 pl-3 pr-3">
                    <figure>
                        <Image src="/images/anmitsu.jpeg" width={100} height={100} alt="anmitsu"/>
                    </figure>
                    <div className="card-body p-3">
                    <div className="badge" style={{fontSize:'0.5rem'}}>未体験</div>
                            <Link href ="myzukan/">
                            <h2 className="link m-1">鈴の木</h2>
                            </Link>  
                        <div className="flex">
                            <button className="btn btn-xs mt-auto">更新</button>
                            <button className="btn btn-xs mt-auto">削除</button>
                        </div>
                    </div>
                </div>

                {/*下部メニューバー*/}
                <div style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: '100' }}>
                    <BottomAppBar />
                </div>
        </Mockupphone>
        </>
        )
    }