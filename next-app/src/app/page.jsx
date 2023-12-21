import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
 <div>
  <div>下層ページ用リンク</div>

  <Link href="/create_zukan"><button className="btn Wide button">図鑑を作る</button></Link>
 </div>
  )
}
