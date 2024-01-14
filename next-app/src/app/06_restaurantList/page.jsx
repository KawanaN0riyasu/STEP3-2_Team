'use client'

import ActivitiesResults from '../../components/06_resultsOfActivities';
import Image from 'next/image';
import Mockupphone from '../../components/mockupphone'; //デモ用スマホ画面追加
import BottomAppBar from '../../components/BottomAppBar'; //下部メニューバー追加

const defaultImage = '/photo_up.png';

/*ここから*/
export default function Page(){
    const parsedDataFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("selectedZukan")) : null;

    return(
        <Mockupphone> {/*デモ用スマホ画面*/}

        <div style={{  position: 'absolute', bottom: '0', width: '100%', zIndex: '100'}}>
            <BottomAppBar />{/*下部メニューバー*/}
        </div>

        {/*図鑑タイトル*/}
        <h1 className="card-title text-md mt-7 ml-2">
            {parsedDataFromLocalStorage && parsedDataFromLocalStorage.title
                ? parsedDataFromLocalStorage.title
                : 'データがありません'}
        </h1>
        <div className="flex items-center m-2">
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
        </Mockupphone>
        )
    }