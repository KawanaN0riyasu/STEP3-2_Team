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
      <div style={{ backgroundColor: "#FCAA00", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

      {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
      <div className="sm-phone-4">

      <Image src="/images/top.svg" width={375} height={375} alt="top" />
      
      <Link href="myzukan_kuwa/">
        <div className="flex items-center justify-center">
          <button className="btn btn-ghost font-bold text-lg">START</button>
        </div>
      </Link>

      </div>
      </div>
    </>
  )
}