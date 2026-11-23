# TABEE Studio

ชุดเครื่องมือของ TABEE เผยแพร่ผ่าน GitHub Pages หน้าแรก (`index.html`) คือ **TABEE Studio** ต้นแบบหน้าจอของระบบงานรับรอง (TABEE AMS) ที่รวมทุกส่วนไว้ในที่เดียว

## TABEE Studio (หน้าแรก)
ไฟล์อยู่ที่ `index.html` และโฟลเดอร์ `studio/` ทำงานในเบราว์เซอร์ทั้งหมด ไม่มีเซิร์ฟเวอร์ ข้อมูลที่กรอกเก็บใน localStorage และไฟล์ที่อัปโหลดเก็บใน IndexedDB ของเครื่องผู้ใช้ ข้อมูลตัวอย่างเป็นข้อมูลสมมติ

| ส่วน | หน้าจอ |
|---|---|
| 1 หลักสูตร | แฟ้มหลักสูตร เลือก EAC (Washington Accord) หรือ ETC (Sydney Accord) ยื่น SER และเอกสารแนบ ออกเลขรับและล็อกเอกสาร |
| 2 คณะกลั่นกรอง | Auto Check SER ด้วยกฎชุดเดียวกับ PEV Studio บอกส่วนที่ขาดและส่วนที่ควรปรับปรุง แบบกลั่นกรองรายเกณฑ์ ลงผลรับ / ขอเอกสารเพิ่ม / ไม่รับ |
| 3 PEV | อบรม (EAC, ETC) ลงทะเบียน แฟ้มสะสมผลงาน และระบบเลือกคณะผู้ตรวจ (สาขาตรง ไม่มี COI พร้อมรับงาน กระจายภาระงาน) |
| 4 PEV Studio | ทางเข้า PEV Studio EAC และ ETC และการบันทึกผลรายเกณฑ์ส่งต่อให้คณะกลั่นกรอง |
| 5 ตัดสินผล | ตรวจทานผลประเมิน ตารางความสม่ำเสมอข้ามหลักสูตร และ Decision Meeting |
| อื่น ๆ | Workflow 26 ขั้น ทะเบียนหลักสูตรที่รับรอง บันทึกการใช้งาน และการสลับบทบาท |

- `studio/app.js` หน้าจอทั้งหมด · `studio/data.js` ค่าคงที่และข้อมูลตัวอย่าง · `studio/style.css` ใช้ token และฟอนต์ชุดเดียวกับ `pevstudio/`
- `studio/worker.js` + `studio/engine.js` คือ Auto Check ที่รันใน Web Worker โดยโหลด `checklist.js` และ `rules.js` จาก `pevstudio/` (EAC) หรือ `pevstudio-etc/` (ETC) โดยตรง `engine.js` คัดลอกจาก `pevstudio/js/app.js` สร้างใหม่ได้ด้วย `sh studio/build-engine.sh`
- ข้อจำกัด: ยังไม่มีบัญชีผู้ใช้และฐานข้อมูลกลาง ข้อมูลไม่ข้ามเครื่อง ขั้นการเงิน การนัดตรวจเยี่ยม และสายอนุมัติหลัง Decision Meeting แสดงเป็นขั้นในแถบความคืบหน้าเท่านั้น

## ENG · หลักสูตรวิศวกรรมศาสตร์ (Washington Accord)
- `pev-training/` PEV Training Studio ฉบับผู้อบรม (Module 0–17, SER lab, workshop)
- `pevstudio/` PEV Studio ฉบับผู้อบรม เครื่องมือประเมินหลักสูตรตาม PEV Worksheet ทำงานในเบราว์เซอร์ ไม่เรียก AI และไม่ส่งข้อมูลออก
- `assesstrain/` การประเมินผลการตรวจ 10 สถานการณ์คละเกณฑ์
- `assesstrain1/` ถึง `assesstrain8/` อุ่นเครื่อง Onsite รายเกณฑ์ข้อ 1–8

## ETC · หลักสูตรเทคโนโลยีวิศวกรรม (Sydney Accord)
- `pev-training-etc/` ETC PEV Training Studio ฉบับผู้อบรม
- `pevstudio-etc/` PEV Studio ETC ฉบับผู้อบรม (`pevstudio-sa/` เป็นหน้า redirect มาที่นี่)
- `assesstrain-etc/` และ `assesstrain-etc1/` ถึง `assesstrain-etc8/` จอ Quiz & Poll ชุด ETC

## ใช้ร่วมกัน
- `brainstorm/` กระดาน Brainstorm Onsite 3 รอบ ผู้อบรมสแกน QR แล้วพิมพ์ความเห็นจากมือถือ
- `ci/` รูปประกอบเคสอุ่นเครื่อง

ฉบับวิทยากร (มีเฉลย เช่น `trx-key.js`) ไม่อยู่ใน repo นี้ เนื้อหาเป็นกรณีสมมติเพื่อการฝึกอบรม
