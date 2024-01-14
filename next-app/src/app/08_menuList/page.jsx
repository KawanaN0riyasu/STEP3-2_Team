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

        <div className="title" style={{margin:'50px 10px 10px 10px'}}>
        <h1 style={{borderBottom: '1px dotted #767676'}}>あんみつの深緑堂</h1>
        <p style={{fontSize:'10px'}}>〒131-0033 東京都墨田区向島５丁目２７−１７ 東屋マンション 102</p>
        </div>

        <div className="menu" style={{ display: 'flex'}}>
          <Image src="/images/anmitsu.jpeg" width={100} height={315} alt="top" style={{margin:'10px'}}/>
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
          <p>季節のあんみつ</p>
          <p>★★★★★</p>
          <p>作成日：2024年01月13日</p>
          <div className="flex">
            <button className="btn btn-xs mt-auto">更新</button>
            <button className="btn btn-xs mt-auto">削除</button>
          </div>
          </div>

          <Image src="/images/parfait.webp" width={100} height={315} alt="top" style={{margin:'10px'}}/>
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
          <p>抹茶パフェ</p>
          <p>★★★★☆</p>
          <p>作成日：2024年01月12日</p>
          <div className="flex">
            <button className="btn btn-xs mt-auto">更新</button>
            <button className="btn btn-xs mt-auto">削除</button>
          </div>
          </div>

        </div>
        </Mockupphone>
      </>
    );
  }