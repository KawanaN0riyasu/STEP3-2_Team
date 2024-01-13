/*アプリTOP*/
/*import */
import Link from 'next/link'
import Image from 'next/image'
import Mockupphone from '../../components/mockupphone';//デモ用スマホ画面追加

/*メタデータ */
export const metadata = {
  title: 'もぐもぐ図鑑'
}

/*ここから*/
export default function Page() {
  return (
    <>
      <Mockupphone>{/*デモ用スマホ画面追加*/}
        <div style={{ backgroundColor: "#FCAA00", height: "569px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="sm-phone-4">
            <Image src="/images/top.png" width={432} height={315} alt="top" />
            <Link href="02_mapSearch/">
              <div className="flex items-center justify-center">
                <button className="btn btn-ghost font-bold text-lg">START</button>
              </div>
            </Link>
          </div>
        </div>
      </Mockupphone>
    </>
  );
}