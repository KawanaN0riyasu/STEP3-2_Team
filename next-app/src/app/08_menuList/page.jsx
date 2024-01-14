/*import */
import Image from 'next/image'
import BottomAppBar from '../../components/BottomAppBar'; //下部メニューバー追加
import Mockupphone from '../../components/mockupphone'; //デモ用スマホ画面追加

/*ここから*/
export default function Page() {
    return (
      <>
        <Mockupphone>{/*デモ用スマホ画面追加*/}
        <div style={{  position: 'absolute', bottom: '0', width: '100%', zIndex: '100' }}>
        <BottomAppBar />{/*下部メニューバー*/}
        </div>

        {/*お店データ */}
        <div className="title" style={{margin:'50px 10px 10px 10px'}}>
          <h1 style={{borderBottom: '1px dotted #767676'}}>あんみつの深緑堂</h1>
          <p style={{fontSize:'10px'}}>〒131-0033 東京都墨田区向島５丁目２７−１７ 東屋マンション 102</p>
        </div>
        
        {/*料理データ */}
        <div className="cardall" style={{margin:'10px'}}>
        <div className="card lg:card-side bg-base-100 shadow-xl">     
          <figure><img src='/images/anmitsu.jpeg' alt="Album" style={{width:'100%',height:'100%'}}/></figure>
            <div className="card-body" style={{ width: '100%', flex: '0 0 50%', boxSizing: 'border-box',  overflow: 'hidden' ,padding:'10px'}}>
              <h2 className="card-title" style={{ fontSize: '14px', borderBottom: '1px dotted #767676'}}>季節のあんみつ</h2>
              <li style={{ fontSize: '10px'}}>★★★★★</li>
              <li style={{ fontSize: '10px'}}>フルーツがたっぷりで美味しかった！ほうじ茶セットがお得で良かった。</li>
              <li style={{ fontSize: '10px'}}>作成日：2023年12月1日</li>
            <div className="flex-column">
              <button className="btn btn-xs mt-1 mr-1">更新</button>
              <button className="btn btn-xs mt-1 mr-1">削除</button>
            </div> 
          <div className="card-actions justify-end"></div>
          </div>
          </div>
        </div>


        <div className="cardall" style={{margin:'10px'}}>
        <div className="card lg:card-side bg-base-100 shadow-xl">     
          <figure><img src="/images/parfait.jpeg" alt="Album" style={{width:'100%',height:'100%'}}/></figure>
            <div className="card-body" style={{ width: '100%', flex: '0 0 50%', boxSizing: 'border-box',  overflow: 'hidden' ,padding:'10px'}}>
              <h2 className="card-title" style={{ fontSize: '14px', borderBottom: '1px dotted #767676'}}>抹茶パフェ</h2>
              <li style={{ fontSize: '10px'}}>★★★★☆</li>
              <li style={{ fontSize: '10px'}}>抹茶のアイスが濃厚で美味しい。量が多いので、お腹をすかしていくこと！</li>
              <li style={{ fontSize: '10px'}}>作成日：2024年01月13日</li>
            <div className="flex-column">
              <button className="btn btn-xs mt-1 mr-1">更新</button>
              <button className="btn btn-xs mt-1 mr-1">削除</button>
            </div> 
            <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div> 
        
        </Mockupphone>
      </>
    );
  }