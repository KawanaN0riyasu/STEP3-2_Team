/*アプリTOP*/
import Link from 'next/link'
import Image from 'next/image'
import Mockupphone from '../../components/mockupphone';//デモ用スマホ画面追加（01/08)

/*メタデータ */
export const metadata = {
  title: 'もぐもぐ図鑑'
}

export default function Page() {
  return (
    <>
    <Mockupphone> {/*デモ用スマホ画面 */}
      <div style={{ backgroundColor: "#FCAA00", height: "569px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="sm-phone-4 mx-auto">
          <Image src="/images/top.png" width={432} height={320} alt="top" />
          <Link href="01_menu/">
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