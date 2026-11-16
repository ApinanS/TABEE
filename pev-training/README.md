# TABEE PEV Training Studio (ฉบับผู้เข้ารับการฝึกอบรม)

ฉบับนี้ไม่มีเฉลยของชุดฝึก SER เฉลยใบระเบียน คู่มือวิทยากร และซองเอกสารเพิ่มเติม ใช้เผยแพร่ให้ผู้เข้ารับการฝึกอบรมได้

## วิธีขึ้น GitHub Pages
1. สร้าง repository แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (ให้ `index.html` อยู่ชั้นบนสุด)
2. Settings › Pages › Deploy from a branch › เลือก `main` และ `/ (root)` แล้ว Save
3. เปิดจากลิงก์ `https://<ชื่อผู้ใช้>.github.io/<ชื่อ repo>/`

ทุกหน้าเป็นไฟล์ HTML ธรรมดา ลิงก์ภายในเป็นลิงก์สัมพัทธ์ทั้งหมด ไม่ต้องใช้ Claude

## โครงสร้าง
- `index.html` หน้า Studio · `modules.js`, `data.js` เนื้อหาและคลังข้อสอบ
- `decks/` สไลด์ประกอบ Module 16, Module 17 และทุกช่วงของ Onsite (HTML ชุดละไฟล์)
- `trx/ser/` เล่ม SER 7 หลักสูตรแบบอ่านบนเว็บ · `trx-data.js` ข้อมูลฝึกวิเคราะห์ใบระเบียน
- `files/` เอกสารของหลักสูตรสมมติ (Word และ PDF)
- `links.js` ลิงก์ภายนอก แก้ที่ไฟล์นี้ไฟล์เดียว

## ลิงก์ภายนอก
- วิดีโอ: YouTube ของสภาวิศวกร (playlist https://www.youtube.com/playlist?list=PLQ_e0l-u6mxo) เล่นในหน้าโมดูลและนับเวลาดูได้เฉพาะเมื่อเปิดจากเว็บ (GitHub Pages) ต้องดูถึง 90% แบบทดสอบจึงเปิด ถ้าเปิดจากไฟล์ในเครื่อง (ดับเบิลคลิก index.html) YouTube ไม่ยอมเล่นในหน้า ปุ่มจะพาไปดูบน YouTube และแบบทดสอบไม่ล็อก
- Quiz & Poll และกระดาน Brainstorm: https://apinans.github.io/TABEE/
- PEV Studio: https://apinans.github.io/TABEE/pevstudio/ (ฉบับผู้อบรม อยู่ในโฟลเดอร์ `pevstudio/`) กำหนดที่ค่า `pevStudio` ใน `links.js`
