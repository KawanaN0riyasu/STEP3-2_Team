/*アプリTOP*/
/*import */
import Link from 'next/link'
import Image from 'next/image'

/*メタデータ */
export const metadata = {
  title: 'もぐもぐ図鑑'
}

/*ここから*/
export default function Page() {
  return (
    <>
      <div className="mockup-phone">
        <div className="camera"></div> 
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            <div style={{ backgroundColor: "#FCAA00", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
              <div className="sm-phone-4">
                <Image src="/images/top.png" width={432} height={315} alt="top" />
                <Link href="01_menu/">
                  <div className="flex items-center justify-center">
                    <button className="btn btn-ghost font-bold text-lg">START</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}