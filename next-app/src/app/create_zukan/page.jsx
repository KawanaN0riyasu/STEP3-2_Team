'use client'
import React from 'react';
import {useState} from "react";
import Image from 'next/image'
import photoUPImage from '/public/photo_up.png';//仮

const create_zukan = (e) => {
  const[zukan_name, setName] =useState("")
  const[zukan_memo, setMemo] =useState("")
  const zukanSubmit = async (e) => {
    e.preventDefault();
    try{
      await fetch("http://localhost:3001",
      {
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify({
          zukan_name: zukan_name,
          zukan_memo: zukan_memo,
      }),
    });
  }catch(err){

    }
  };
  return (
 <div class="grid">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={zukanSubmit}>
    <div class="m-3 grid-item gap-4">
      <p>作成日：</p>
    </div>
    <div class="m-3 grid-item gap-4">
      <input  className="input input-bordered w-full max-w-xs" value={zukan_name} onChange={(e)=>setName(e.target.value)} type="text" name="zukan_name" placeholder="図鑑名を入力" required/>
    </div>
    <div class="m-3 grid-item gap-4 item-center">
      <Image className="md:block" src={photoUPImage} alt="アップロード" />
    </div>
    <div class="m-3 grid-item">
      <input  className="textarea textarea-bordered textarea-lg w-full max-w-xs" value={zukan_memo} onChange={(e)=>setMemo(e.target.value)} type="text" name="zukan_memo" placeholder="メモを入力" required/>
    </div>
    <div class="m-3 grid-item">
      <button className="btn btn-wide btn-warning">図鑑をつくる</button>
    </div>
  </form>

 </div>
  )
}

export default create_zukan
