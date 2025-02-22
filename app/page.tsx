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
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338910376426868857/slip_1_copy_3.png?ex=67b36475&is=67b212f5&hm=cfa445789b21819fbfba4d9dd22ab339ff9a29a5b6435e8e8272c5965d07a4f2&"    
    },
    {
      bank_name: "ธ.ไทยพาณิชย์",
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338905326141046905/slip_1_copy_2.png?ex=67b35fc1&is=67b20e41&hm=32a85b30cc6c79df0966b6150d2c6c0f5cb3c1257dd8f0eff1501a596eb3b50d&"
    },
    {
      bank_name: "ธ.ออมสิน",
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338912408177082459/slip_1_copy_4.png?ex=67b36659&is=67b214d9&hm=e9b85e451d94c4fd8afa2d49bc566b4ed69582ed1e2421078eb4d9d3fdf53bdc&"
    },
    {
      bank_name: "ธ.กรุงไทย",
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338913538839805972/slip_1_copy_5.png?ex=67b36767&is=67b215e7&hm=b3cb6290317d94e7404fe4965bbfb4eb78c3ae870249046872a5fd5858939b5c&"
    },
    {
      bank_name: "ธ.กรุงศรี",
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338915870369386517/slip_1_copy_6.png?ex=67b36993&is=67b21813&hm=d28a11dc9fdd4a969477f2ec5eb861276f79785c064631cf42e1a3cdf3821635&"
    },
    {
      bank_name: "ธ.กรุงเทพ",
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338916564459716648/slip_1_copy_7.png?ex=67b36a38&is=67b218b8&hm=31f35402866f887646830f1405daca9826d51933e554ceab66be5937184ca61a&"
    },
    {
      bank_name: "พร้อมเพย์",
      bank_image: "https://cdn.discordapp.com/attachments/1330771391829774393/1338917362979569686/slip_1_copy_8.png?ex=67b36af7&is=67b21977&hm=3c19bddab1319ee2318be6c1b1a5856ee6a5f4b9cecabb094b40eea09fd18555&"
    },
  ]


  const [saver, setSaver] = useState(false);

  const [date, setDate] = useState("[ยังไม่ได้กรอก]");
  const [money, setMoney] = useState("1.00");

  const [NameA, setNameA] = useState("[ยังไม่ได้กรอก]");
  const [bankFlagA, setBankFlagA] = useState("ธ.กสิกรไทย");
  const [bankNumbA, setbankNumbA] = useState("[ยังไม่ได้กรอก]");

  const [NameB, setNameB] = useState("[ยังไม่ได้กรอก]");
  const [bankFlagB, setBankFlagB] = useState("");
  const [bankImageB, setBankImageB] = useState<string | null>(null);
  const [bankNumbB, setbankNumbB] = useState("[ยังไม่ได้กรอก]");

  const [order, setOrder] = useState("[ยังไม่ได้กรอก]");
  const [qrCode, setQrCode] = useState("");

  // ปรับคุณภาพของลรูปที่ออกมา 0 - 1
  let qualityVal: number = 0.9;

  // donwload รูป
  const downloadImage = () => {
    let slip = document.getElementById("slipp");
    if (!slip) return;
    toJpeg(slip, { quality: qualityVal }).then((dataurl) => {
      saveAs(dataurl, "slip.jpg");
    });
  };
  

  // copy รูป
  const copyImage = () => {
    let slip = document.getElementById("slipp");
    if (!slip) return;
    setSaver(true);
    toJpeg(slip, { quality: qualityVal }).then((dataurl) => {
      copyImageToClipboard(dataurl);
      setSaver(false);
    });
  };

  // สร้างเลขที่ทำรายการ
  const qrCodex = (text: string) => {
    if (!text.trim()) {
      setQrCode("");
      setOrder("[ยังไม่ได้กรอก]");
      return;
    }
    text = text.toUpperCase();
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H', margin: 0.1, width: 280 })
      .then(url => {
        setQrCode(url);
        setOrder(text);
      })
      .catch(err => console.error("QR Code generation failed", err));
  };

  const changeMoney = (money: string) => {
    if (!money.trim()) {
      setMoney("0.00");
      return;
    }
    const num = parseFloat(money);
    if (!isNaN(num)) {
      setMoney(num.toLocaleString("th-TH", { minimumFractionDigits: 2 }));
    } else {
      setMoney("0.00");
    }
  };

  const sBank = (bank_name: string) => {
    const selectedBank = bankList.find((i) => i.bank_name === bank_name);
    if (selectedBank) {
      setBankFlagB(selectedBank.bank_name);
      setBankImageB(selectedBank.bank_image);
    }
  };
  

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
                <input onChange={(e) => { e.target.value.length === 0 ? setDate("[ยังไม่ได้กรอก]") : setDate(e.target.value) }} placeholder="วันที่เวลา" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
              </div>

              <div>
                <p className="text-lg">เลขที่ทำรายการกับ QrCode [ 013210138431VOR76310 ]</p>
                <input onChange={(e) => { qrCodex(e.target.value) }} maxLength={20} placeholder="เลขที่ทำรายการพร้อม [QrCode]" type="text" className="placeholder:text-gray-500 px-2 py-1 outline-none border-2 border-yellow-400 rounded-md" />
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
                <select value={bankFlagB || ""} onChange={(e) => sBank(e.target.value)}>
                  <option value="" disabled>เลือกด้วยครับ</option>
                  {bankList.map((data, index) => (
                    <option key={index} value={data.bank_name}>
                      {data.bank_name}
                    </option>
                  ))}
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
          <button onClick={() => { downloadImage() }} className="px-3 py-1 border-2 border-black rounded-md">Download</button>
          <button onClick={() => { copyImage() }} className="px-3 py-1 border-2 border-black rounded-md">{saver === true ? "Copied" : "Copy"}</button>
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
            {bankImageB ? (
              <img className="absolute left-[-18px] top-[515px]" src={bankImageB} alt={bankFlagB} />
            ) : (
              <h1 className="absolute kbank_semibold font-sm text-[#545454] left-[46px] top-[548px]">
                ยังไม่ได้เลือก
              </h1>
            )}


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
