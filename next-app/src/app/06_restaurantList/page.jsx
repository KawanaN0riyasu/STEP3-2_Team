'use client'

import ActivitiesResults from '../../components/06_resultsOfActivities';
import Image from 'next/image';

const defaultImage = '/photo_up.png';

/*ここから*/
export default function Page(){
    const parsedDataFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("selectedZukan")) : null;

    return(
        <>
        {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
        <div className="artboard phone-4">

        {/*図鑑タイトル*/}
        <h1 className="card-title text-md mt-2 mb-2">
            {parsedDataFromLocalStorage && parsedDataFromLocalStorage.title
                ? parsedDataFromLocalStorage.title
                : 'データがありません'}
        </h1>
        <div className="flex items-center mt-2 mb-2">
            <p className="text-xs flex-grow">
            {parsedDataFromLocalStorage && parsedDataFromLocalStorage.description && (
                <>
                    <span>&lt;memo&gt;</span>
                    <br />
                    {parsedDataFromLocalStorage.description}
                </>
            )}
            </p>
            <figure className="flex-shrink-0" >
                <Image 
                    src={parsedDataFromLocalStorage && parsedDataFromLocalStorage.image
                        ? parsedDataFromLocalStorage.image
                        : defaultImage
                    } 
                    width={120} 
                    height={60}
                    alt="tokyo_asakusa" 
                    priority
                />
            </figure>
        </div>  

        {/*活動実績*/}
        <ActivitiesResults parsedDataFromLocalStorage={parsedDataFromLocalStorage} />

        {/*メニューバー（下部）*/}
        <div className="flex-none flex items-center bg-orange-100 pt-3 pb-3">

            <div className="flex-none flex-grow flex flex-col items-center">  
            <Image src="/images/profile_icon.png" width={30} height={30} alt="profile_icon"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/friendszukan_icon.png"
            width={30}
            height={30}
            alt="friendszukan_icon"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/map.png"
            width={30}
            height={30}
            alt="map"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/bell_icon.png"
            width={30}
            height={30}
            alt="bell_icon"/>
            </div>

            <div className="flex-none flex-grow flex flex-col items-center"> 
            <Image src="/images/setting_icon.png"
            width={30}
            height={30}
            alt="setting_icon"/>
            </div>

            </div>
        </div>
        </>
        )
    }