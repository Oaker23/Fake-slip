"use client"
import type { NextPage } from 'next'
import { useState } from 'react';
import Head from 'next/head'

import { saveAs } from 'file-saver'
import { toJpeg } from "html-to-image"
import { copyImageToClipboard } from 'copy-image-clipboard';
import QRCode from 'qrcode'


const Home: NextPage = () => {

  const bankList =
  [
    {
      bank_name: "ธ.กสิกรไทย",
      bank_image: "https://github.com/Oaker23/Fake-slip/blob/main/logo/images.png"    
    },
    {
      bank_name: "ธ.ไทยพาณิชย์",
      bank_image: "https://media.discordapp.net/attachments/1088285744897986570/1158838074697068594/58ff478cab628905.png"
    },
    {
      bank_name: "ธ.ออมสิน",
      bank_image: "https://media.discordapp.net/attachments/1088285744897986570/1158838074445402214/88fc7c2b74940f5e.png"
    },
    {
      bank_name: "ธ.กรุงไทย",
      bank_image: "https://media.discordapp.net/attachments/1088285744897986570/1158838074130825387/26c190790121bc8f.png"
    },
    {
      bank_name: "ธ.กรุงศรี",
      bank_image: "https://media.discordapp.net/attachments/1088285744897986570/1158838073879179314/cfdcfbec26548b33.png"
    },
    {
      bank_name: "ธ.กรุงเทพ",
      bank_image: "https://media.discordapp.net/attachments/1088285744897986570/1158838073589764177/94a706060f511415.png"
    },
    {
      bank_name: "พร้อมเพย์",
      bank_image: "https://media.discordapp.net/attachments/1088285744897986570/1158838073099038872/857c1d7e7a2f61ff.png"
    },
  ]
  
  
  const [saver, setSaver] = useState(false);
  
  const [date, setDate] = useState("[ยังไม่ได้กรอก]");
  const [money, setMoney] = useState("1.00");
  
  const [NameA, setNameA] = useState("[ยังไม่ได้กรอก]");
  const [bankFlagA, _A] = useState("ธ.กสิกรไทย");
  const [bankNumbA, setbankNumbA] = useState("[ยังไม่ได้กรอก]");
  
  const [NameB, setNameB] = useState("[ยังไม่ได้กรอก]");
  const [bankFlagB, setBankFlagB] = useState("[ยังไม่ได้เลือก]");
  const [bankImageB, setBankImageB] = useState("[ยังไม่ได้เลือก]");
  const [bankNumbB, setbankNumbB] = useState("[ยังไม่ได้กรอก]");

  const [order, setOrder] = useState("[ยังไม่ได้กรอก]");
  const [qrCode, setQrCode] = useState("");

  // ปรับคุณภาพของลรูปที่ออกมา 0 - 1
  let qualityVal: number = 0.9;

  // donwload รูป
  const downloadImage = () => {

    let slip = document.getElementById("slipp") as HTMLElement;
    toJpeg(slip, {quality: qualityVal}).then((dataurl) => {
      saveAs(dataurl, "slip.jpg");
    });
    return;

  }

  // copy รูป
  const copyImage = () => {

    setSaver(true);
    let slip = document.getElementById("slipp") as HTMLElement;
    toJpeg(slip, {quality: qualityVal}).then((dataurl) => {
      copyImageToClipboard(dataurl);
      setSaver(false);
    });
    return;

  }

  // สร้างเลขที่ทำรายการ
  const qrCodex = (text: string) => {

    if (text) {
      text = text.toLocaleUpperCase();
      QRCode.toDataURL(text, { errorCorrectionLevel: 'H', margin: 0.1, width: 280}).then(url => {
        setQrCode(url);
        setOrder(text);
      });
    }

    return;

  }

  const changeMoney = (money: string) => {

    if (money.match(/^[0-9]*$/)) {
      money = parseFloat(money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }).replace("$","");
      setMoney(money);
    }

    return;

  }

  const sBank = (bank_name: string) => {

    bankList.filter((i) => {
      if (i.bank_name === bank_name) {
        setBankFlagB(i.bank_name);
        setBankImageB(i.bank_image);
        console.log(bankImageB);
      }
    })

  }

  return (
    <div>
      <Head>
        <title>เว็บปลอมสลิป</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/app/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt&display=swap" rel="stylesheet" />
      </Head>

      <main className="m-2 container">
        <div className="flex space-x-2">
          <div className="border-2 border-purple-500 rounded px-3 py-2 w-[34rem]">
              <div className="text-center text-2xl">
                ข้อมูลของสลิป
              </div>
              <div className="mt-2">
                <div>
                  <p className="text-lg">วันที่เวลา [ 25 ต.ค. 66 10:90 น. ]</p>
                  <input onChange={(e) => { e.target.value.length === 0 ? setDate("[ยังไม่ได้กรอก]") : setDate(e.target.value) }} placeholder="วันที่เวลา" type="text"  className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>

                <div>
                  <p className="text-lg">เลขที่ทำรายการกับ QrCode [ 013210138431VOR76310 ]</p>
                  <input onChange={(e) => {qrCodex(e.target.value)}} maxLength={20} placeholder="เลขที่ทำรายการพร้อม [QrCode]" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>
                
                <div>
                  <p className="text-lg">จำนวนเงิน [ ใส่แค่เลขเดี๋ยวมันจะแปลงเลขให้เอง ]</p>
                  <input defaultValue={"1"} onChange={(e) => { e.target.value === "1.00" ? changeMoney("[ยังไม่ได้กรอก]") : changeMoney(e.target.value) }} placeholder="จำนวนเงิน" type="number" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>
              </div>
          </div>

          <div className="border-2 border-purple-500 rounded px-3 py-2 w-[34rem]">
            <div className="text-center text-2xl">
                ข้อมูลของผู้โอน
              </div>
              <div className="mt-2">
                <div>
                  <p className="text-lg">ชื่อ [ นาย กสิกร บ ]</p>
                  <input onChange={(e) => { e.target.value.length === 0 ? setNameA("[ยังไม่ได้กรอก]") : setNameA(e.target.value) }} placeholder="ชื่อผู้โอน" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>

                <div>
                  <p className="text-lg">หมายเลขธนาคาร  [ xxx-x-x2846-x ]</p>
                  <input onChange={(e) => { e.target.value.length === 0 ? setbankNumbA("[ยังไม่ได้กรอก]") : setbankNumbA(e.target.value) }} placeholder="หมายเลขธนาคาร" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>
              </div>
          </div>

          <div className="border-2 border-purple-500 rounded px-3 py-2 w-[34rem]">
            <div className="text-center text-2xl">
                ข้อมูลของผู้รับ
              </div>
              <div className="mt-2">
                <div>
                  <p className="text-lg">ชื่อ [ น.ส. พิมพ์ภัทรา วิชัยกุล ]</p>
                  <input onChange={(e) => { e.target.value.length === 0 ? setNameB("[ยังไม่ได้กรอก]") : setNameB(e.target.value) }} placeholder="ชื่อผู้โอน" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>
                <div>
                  <p className="text-lg">รูปธนาคาร</p>
                  <select onChange={(e) => {sBank(e.target.value)}}>
                    <option selected>เลือกด้วยครับ</option>
                  {bankList.map((data, index) =>
                    <option key={index} defaultValue={data.bank_name}>
                      {data.bank_name}
                    </option>
                    )}
                  </select>
                </div>
                <div>
                  <p className="text-lg">หมายเลขธนาคาร  [ xxx-x-x7428-x ]</p>
                  <input onChange={(e) => { e.target.value.length === 0 ? setbankNumbB("[ยังไม่ได้กรอก]") : setbankNumbB(e.target.value) }} placeholder="หมายเลขธนาคาร" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
                </div>
              </div>
          </div>
        </div>

        <div className="mt-2 flex space-x-2">
          <button onClick={() => {downloadImage()}} className="px-3 py-1 border-2 border-black rounded-md">Download</button>
          <button onClick={() => {copyImage()}} className="px-3 py-1 border-2 border-black rounded-md">{ saver === true ? "Copied" : "Copy" }</button>
        </div>
      </main>

      <div id="slipp" className="w-[996px] h-[1226px] bg-[url('../public/kplus_none_draw.jpg')] bg-cover bg-no-repeat bg-center relative">
        <div className="absolute text-[#505050] text-[39px] left-[68px] top-[96px]">
          <p className="kbank_light">{date}</p>
        </div>

        <div className="absolute text-[39px] left-[240px] top-[239px]">
          <p className="kbank_semibold text-[#545454]">{NameA}</p>
          <p className="kbank_light text-[#535353] mt-[2px] drop-shadow">{bankFlagA}</p>
          <p className="kbank_light text-[#535353] mt-[1px] drop-shadow">{bankNumbA}</p>
        </div>

        <div className="text-[39px]">
          <div className="logo">
            {
              bankFlagB !== "[ยังไม่ได้เลือก]"
              ? <img className="absolute left-[46px] top-[548px]" src={bankImageB} alt={bankFlagB} />
              : <h1 className="absolute kbank_semibold font-sm text-[#545454] left-[46px] top-[548px]">ยังไม่ได้เลือก</h1>
            }
          </div>
          <div className="infomation absolute left-[240px] top-[548px]">
            <p className="kbank_semibold text-[#545454]">{NameB}</p>
            <p className="kbank_light text-[#535353] mt-[2px] drop-shadow">{bankFlagB}</p>
            <p className="kbank_light text-[#535353] mt-[1px] drop-shadow">{bankNumbB}</p>
          </div>
        </div>

        <div className="absolute text-[37px] text-[#5b5b5b] left-[176px] top-[863px]">
          <p className="kbank_semibold">{order}</p>
        </div>

        <div className="absolute text-[38px] text-[#535353] right-[391px] top-[985px]">
          <p className="kbank_semibold">{money} บาท</p>
        </div>


        <div className="absolute text-[38px] text-[#535353] right-[391px] top-[1109px]">
          <p className="kbank_semibold">0.00 บาท</p> 
        </div>

        <div className="absolute left-[674px] top-[841px]">
          <img src={qrCode} alt="" />
        </div>
      </div>
    </div>

  )
}

export default Home
