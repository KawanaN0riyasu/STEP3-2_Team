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
        <h1 style={{margin:'30px'}}>あんみつの深緑堂</h1>
        <p style={{margin:'30px'}}>〒131-0033 東京都墨田区向島５丁目２７−１７ 東屋マンション 102</p>
        <Image src="/images/anmitsu.jpeg" width={100} height={315} alt="top" style={{margin:'30px'}}/>
        <Image src="/images/anmitsu.jpeg" width={100} height={315} alt="top" style={{margin:'30px'}}/>
        <Image src="/images/anmitsu.jpeg" width={100} height={315} alt="top" style={{margin:'30px'}}/>
        </Mockupphone>
      </>
    );
  }