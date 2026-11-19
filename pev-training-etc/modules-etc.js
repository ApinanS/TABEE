/* ETC Training Studio: one extra section per TABEE module (0–17) that says what changes for
   engineering technology programmes (ETAC, Sydney Accord). Facts follow Module 18 and the ETAC
   procedure (revision 3, 13 June 2569) and Guidelines 3.1.1–3.1.4. Loaded after modules.js. */
(function(){
const E={
0:{p:['การอบรม ETC ใช้โมดูล 0–17 ของ TABEE เป็นพื้นฐาน แล้วเพิ่ม Module 18 ว่าด้วยเกณฑ์ ETAC และ Sydney Accord ซึ่งต้องอ่านก่อนเข้าอบรม Onsite','The ETC course uses TABEE Modules 0–17 as the base and adds Module 18 on the ETAC criteria and the Sydney Accord, which must be read before the on-site training.'],
 b:[['หลักสูตรตัวอย่างใน Onsite คือเทคโนโลยีวิศวกรรมอุตสาหการ (IET) หลักสูตรสมมติ','The on-site case is a fictitious Industrial Engineering Technology (IET) programme'],
    ['ใช้ PEV Studio ฉบับ ETC (79 ข้อตามแบบรายการตรวจประเมินของ ETAC) แทน PEV Studio ของ TABEE','Use PEV Studio ETC (79 items from the ETAC checklist) instead of the TABEE edition']]},
1:{p:['หลัก OBE และ OBA ใช้เหมือนเดิม สิ่งที่ต่างคือระดับของผลลัพธ์: บัณฑิตหลักสูตรทางเทคโนโลยีวิศวกรรมต้องแก้ปัญหางานวิศวกรรมทั่วไป (Broadly-defined) ตาม Sydney Accord ไม่ใช่ปัญหาทางวิศวกรรมที่ซับซ้อนของ Washington Accord','OBE and OBA apply as before. What changes is the level: engineering technology graduates solve broadly-defined engineering problems (Sydney Accord), not the complex problems of the Washington Accord.']},
2:{p:['หลักสูตร ETC อยู่ใต้คู่มือขั้นตอนและวิธีการรับรองฯ ปรับปรุงครั้งที่ 3 ของสภาวิศวกร มีคณะทำงาน ETAC กำกับ เทียบกับ Sydney Accord ของ IEA','ETC programmes fall under the Council of Engineers procedure, revision 3, overseen by the ETAC commission and benchmarked to the IEA Sydney Accord.'],
 b:[['วงรอบ 6 ปี เริ่มปีการศึกษา 2570 ปฏิทิน 18 กิจกรรมตั้งแต่ ก.ค. ถึง ส.ค. ปีถัดไป','Six-year cycle starting academic year 2570; 18 activities from July to August the following year'],
    ['ผลการรับรอง 5 แบบ: รับรอง 6 ปี · รับรองแบบมีเงื่อนไขไม่เกิน 3 ปี · รับรองชั่วคราว · รอผลการปรับปรุงแก้ไข 1 ปี · ไม่รับรองหรือยกเลิก (รายละเอียดใน Module 18)','Five results: accredited 6 years · conditional up to 3 years · provisional · pending improvement 1 year · not accredited or withdrawn (see Module 18)']]},
3:{p:['เกณฑ์ 8 ข้อ ระดับข้อค้นพบ D W C R และวงจร CQI สามระดับใช้เหมือน TABEE เกณฑ์ข้อ 3 และ 4 ของ ETC ต้องผูกตัวชี้วัดกับแบบความรู้ SK1–SK9 (Guideline 3.1.2)','The eight criteria, the D W C R levels and three-level CQI are the same as TABEE. ETC criteria 3 and 4 tie the indicators to the SK1–SK9 knowledge profile (Guideline 3.1.2).']},
4:{p:['บทบาทของ PEV และระดับข้อค้นพบเหมือนเดิม ลำดับหลังตรวจเยี่ยมของ ETAC: Fact Finding Report ภายใน 1 สัปดาห์ หลักสูตรชี้แจงภายใน 1 สัปดาห์ แล้วผ่านคณะทำงานกลั่นกรองฯ ก่อน Decision Meeting','PEV roles and finding levels are unchanged. After the ETAC visit: Fact Finding Report within one week, the programme replies within one week, then the screening committee before the Decision Meeting.']},
5:{p:['SER ของหลักสูตร ETC เขียนตามแบบรายการตรวจสอบ SER (Guideline 3.1.4) และมีเอกสารประกอบที่ ETAC กำหนดเพิ่ม','ETC self-study reports follow the SER checklist (Guideline 3.1.4), with additional ETAC documents.'],
 b:[['Guideline 3.1.1 เอกสารเชิงประจักษ์ที่ต้องเตรียมในวันตรวจ (ห้องเอกสาร)','Guideline 3.1.1: evidence for the document room'],
    ['Guideline 3.1.2 ผลลัพธ์รายวิชาและตัวชี้วัดที่สอดคล้องกับ SK','Guideline 3.1.2: course outcomes and indicators aligned with SK'],
    ['Guideline 3.1.3 รายงาน Outcome Score ของโครงงานรวบยอด','Guideline 3.1.3: Capstone outcome score report']]},
6:{p:['การตรวจเกณฑ์ข้อ 1 และใบระเบียนเหมือนเดิม หลักสูตร ETC จำนวนมากรับนักศึกษาแผนต่อเนื่องจาก ปวส. จึงควรตรวจว่าการเทียบโอนรายวิชาภาคปฏิบัติมีหลักฐานว่านักศึกษาทำได้จริง ไม่ใช่ดูเกรดอย่างเดียว','Criterion 1 and transcript checks are the same. Many ETC programmes admit vocational-diploma students, so check that transfer of practical courses rests on evidence of competence, not grades alone.']},
7:{p:['PEO ต้องบอกสิ่งที่บัณฑิตทำได้ในงานเทคโนโลยีวิศวกรรมภายในไม่กี่ปีหลังจบ ผู้มีส่วนได้ส่วนเสียควรรวมสถานประกอบการที่รับบัณฑิตและฝึกงาน','PEOs should state what graduates do in engineering technology work a few years after graduation; stakeholders should include the employers and placement hosts.']},
8:{p:['ผลลัพธ์การศึกษา 11 ข้อของ ETAC เขียนให้สอดคล้องกับ Sydney Accord (SA1–SA11) และเรียงตามลำดับของ TABEE ซึ่งต่างจากลำดับ SA ของ IEA แบบความรู้คือ SK1–SK9 แทนแบบความรู้ระดับวิศวกร','The 11 ETAC outcomes follow the Sydney Accord (SA1–SA11) in TABEE order, which differs from the IEA SA order. The knowledge profile is SK1–SK9 instead of the engineer-level profile.'],
 b:[['PO6 ทำงานเป็นทีม (SA8) · PO7 สื่อสาร (SA9) · PO8 วิศวกรกับโลก (SA6) · PO9 จรรยาบรรณ (SA7)','PO6 teamwork (SA8) · PO7 communication (SA9) · PO8 engineer and the world (SA6) · PO9 ethics (SA7)']]},
9:{p:['ตัวชี้วัดของแต่ละ PO ต้องสอดคล้องกับ SK ที่กำหนด (Guideline 3.1.2) สัญญาณที่พบบ่อยคือตัวชี้วัดคัดลอกจากหลักสูตรระดับวิศวกร เช่น เขียนถึงปัญหาที่ซับซ้อนหรือการวิจัย ซึ่งอยู่ผิดระดับ','Each PO’s indicators must match the assigned SK (Guideline 3.1.2). A common signal is indicators copied from an engineer-level programme, mentioning complex problems or research, which is the wrong level.']},
10:{p:['การปิดวงจรในเกณฑ์ข้อ 4 ตรวจเหมือนเดิม รายงาน Outcome Score ของโครงงานรวบยอด (Guideline 3.1.3) เป็นหลักฐานทางตรงที่ใช้ได้ ถ้าใช้ผลจากฝึกงานหรือสหกิจศึกษา ต้องมีเกณฑ์ประเมินที่ผูกกับตัวชี้วัด ไม่ใช่แบบฟอร์มของสถานประกอบการอย่างเดียว','Closing the loop is checked the same way. The Capstone outcome score report (Guideline 3.1.3) is usable direct evidence. If practicum or co-op results are used, the rubric must be tied to the indicators, not only the employer’s form.']},
11:{p:['ข้อกำหนดเฉพาะของเกณฑ์ข้อ 5 สำหรับ ETC','ETC-specific requirements in criterion 5'],
 b:[['หมวดความรู้พื้นฐานทางวิศวกรรม เฉพาะทางวิศวกรรมและเทคโนโลยีวิศวกรรม รวมการฝึกปฏิบัติ ไม่น้อยกว่า 45 หน่วยกิต','Engineering fundamentals, specialised engineering and engineering technology, including practice: at least 45 credits'],
    ['ฝึกงานในภาคอุตสาหกรรมไม่น้อยกว่า 210 ชั่วโมง หรือมีสหกิจศึกษา ถ้าใช้สหกิจศึกษาประเมินผลลัพธ์ ต้องเทียบเท่ากับนักศึกษาที่ไม่ได้ไป','Industrial practicum of at least 210 hours, or co-op; if co-op is used to assess outcomes it must be equivalent for students who do not go']]},
12:{p:['โครงงานรวบยอดของ ETC ต้องเป็นปัญหางานวิศวกรรมทั่วไป: เข้าข้อ SP1 และบางข้อของ SP2–SP7 ทำเป็นกลุ่ม 3–5 คน โจทย์จากสถานการณ์จริง และบูรณาการอย่างน้อย 2 สาขาย่อย งานประจำของโรงงานไม่ถึงระดับ แม้จะทำในโรงงานจริง','ETC capstones must be broadly-defined problems: SP1 plus some of SP2–SP7, groups of 3–5, real situations, at least two sub-disciplines. Routine plant work does not qualify, even when done in a real plant.']},
13:{p:['นอกจากจำนวน คุณวุฒิ และภาระงาน ให้ตรวจประสบการณ์ภาคอุตสาหกรรมที่เป็นปัจจุบันของอาจารย์ และความทันสมัยของความรู้ SK4–SK6 ที่สอน','Besides numbers, qualifications and workload, check faculty members’ current industrial experience and how up to date the SK4–SK6 knowledge they teach is.']},
14:{p:['หลักสูตร ETC พึ่งโรงฝึกงานและห้องปฏิบัติการมาก ดูว่าเครื่องมือใกล้เคียงที่ใช้ในอุตสาหกรรมปัจจุบัน มีการบำรุงรักษา และกฎความปลอดภัยถูกปฏิบัติจริงระหว่างคาบเรียน','ETC programmes rely heavily on workshops and laboratories. Check that equipment is close to current industrial practice, is maintained, and that safety rules are followed during class.']},
15:{p:['ตรวจเหมือนเดิม และดูว่างบประมาณและบุคลากรสายสนับสนุน เช่น นายช่างเทคนิค เพียงพอต่อการบำรุงรักษาโรงฝึกงานและเครื่องมือ','Checked as before; also see that the budget and support staff, such as technicians, are enough to maintain the workshops and equipment.']},
16:{p:['ในวันตรวจเยี่ยมหลักสูตร ETC ให้เวลากับพนักงานพี่เลี้ยง อาจารย์นิเทศ นายช่างเทคนิค และการเดินดูโรงฝึกงานระหว่างคาบเรียนมากขึ้น เพราะหลักฐานของผลลัพธ์จำนวนมากเกิดในที่เหล่านี้ คำว่า “ปัญหาที่ซับซ้อน” ในแนวคำถามให้อ่านเป็นปัญหางานวิศวกรรมทั่วไป (SP1–SP7)','On an ETC visit give more time to workplace supervisors, co-op advisers, technicians and walking the workshops during class, because much of the outcome evidence is there. Read “complex problems” in the question guides as broadly-defined problems (SP1–SP7).']},
17:{p:['Onsite ของ ETC ใช้เคส IET สไลด์บรรยายฉบับ ETC และ PEV Studio ฉบับ ETC งานก่อนอบรมคือเรียน Module 0–18 แล้วกด “เริ่มฝึก” ที่เคส IET ทำ Auto Check และ Save ไฟล์มาวันอบรม','The ETC on-site uses the IET case, the ETC lecture decks and PEV Studio ETC. Pre-work: Modules 0–18, then press “Start practice” on the IET case, run Auto Check and bring the saved file.']}
};
const M=window.TR_MOD||{};
for(const k in E){const m=M[k];if(!m||!m.sec)continue;const e=E[k];
  m.sec.push({h:['สำหรับหลักสูตร ETC (ETAC · Sydney Accord)','For ETC programmes (ETAC · Sydney Accord)'],p:e.p,b:e.b,etc:true});}
})();

/* Quiz items of Modules 3, 8, 9, 11, 12 and 16 that test engineer-level ideas (complex problems WP, TK)
   get an ETC wording: broadly-defined problems (SP1–SP7) and SK1–SK9. Correct answer positions unchanged. */
(function(){
const Q=(window.TR_DATA||{}).quiz||{}, X=window.TR_QX||{};
const O={
'3.0':{q:'หากผลการประเมินทางตรง (Direct Assessment) ในวิชาโครงงานรวบยอด พบว่านักศึกษาไม่สามารถแก้ปัญหางานวิศวกรรมทั่วไป (Broadly-defined) ได้ตามเกณฑ์ แต่ผลสำรวจความพึงพอใจของนักศึกษา (Indirect Assessment) อยู่ในระดับ "ดีมาก" ในฐานะประธานหลักสูตร ท่านควรดำเนินการแก้ไขอย่างไรจึงจะถือเป็นการทำ CQI ที่ถูกต้องตามหลักการ OBA?'},
'8.0':{q:'ในการประเมิน PO 2 (การวิเคราะห์ปัญหา) และ PO 3 (การออกแบบ) ท่านพบว่าโจทย์โครงงานรวบยอดของหลักสูตร ETC ส่วนใหญ่เป็นการนำโปรแกรมสำเร็จรูปมาคำนวณตามขั้นตอนปกติ (Routine) โดยไม่มีประเด็นทางเทคนิคหรือไม่ใช่ทางเทคนิคที่ขัดกัน ท่านจะตัดสินความสอดคล้องกับลักษณะปัญหางานวิศวกรรมทั่วไป (SP1–SP7) อย่างไร?',
 c:['ให้ผ่านเกณฑ์เนื่องจากมีการใช้ซอฟต์แวร์ทางวิศวกรรมที่ทันสมัยตาม PO 5 แล้ว','ระบุเป็นข้อด้อย (Weakness) เนื่องจากโจทย์ไม่ถึงระดับปัญหางานวิศวกรรมทั่วไป','ให้ผ่านเกณฑ์แบบมีข้อสังเกต (Remark) เพราะนักศึกษาสามารถหาคำตอบที่ถูกต้องตามหลักวิชาการได้','ระบุเป็นข้อวิตกกังวล (Concern) เนื่องจากไม่มีการวิเคราะห์ปัญหาทางวิศวกรรม'],
 s:'วิธีคิด: ETAC ให้โครงงานรวบยอดเป็นปัญหางานวิศวกรรมทั่วไป ต้องเข้าข้อ SP1 และบางข้อของ SP2–SP7 งานคำนวณตามขั้นตอนปกติเป็นงานประจำ ไม่ถึงระดับ แม้จะใช้ซอฟต์แวร์ที่ทันสมัย'},
'8.1':{c:['เปลี่ยนชื่อ PLOs ทั้ง 7 ข้อให้ตรงกับชื่อ POs ของ TABEE ทั้ง 11 ข้อทันที','ทำตาราง Mapping PLOs (7 ข้อ) เข้ากับ POs 11 ข้อของ ETAC พร้อมอธิบายความสอดคล้องเชิงพฤติกรรมและแบบความรู้ (SK) ให้ครบถ้วน','รายงานเฉพาะ PLOs ข้อที่ตรงกับ TABEE Pos','สร้างตาราง Mapping ใหม่ระหว่าง TABEE POs 11 ข้อกับรายวิชาในหลักสูตร'],
 s:'วิธีคิด: หลักสูตรตั้ง PLOs เองได้ แต่ต้องพิสูจน์ผ่านตาราง Mapping ว่าครอบคลุม PO 11 ข้อของ ETAC และแบบความรู้ SK1–SK9 ตามที่ Guideline 3.1.2 กำหนด'},
'8.2':{q:'แบบความรู้ (Knowledge Profile - SK) ในเกณฑ์ข้อ 3 ของ ETAC มีบทบาทสำคัญที่สุดอย่างไรในการประเมินผลลัพธ์การศึกษา?',
 s:'วิธีคิด: SK1–SK9 ของ Sydney Accord คือกรอบความรู้ที่ตัวชี้วัดของแต่ละ PO ต้องสอดคล้อง (Guideline 3.1.2) เช่น PO 1 ผูกกับ SK1–SK4 SK เน้นความรู้ที่ใช้กับเทคโนโลยีที่พัฒนาแล้ว ไม่ใช่ความรู้เชิงลึกระดับวิศวกร (WK)'},
'9.1':{q:'หากหลักสูตร ETC ตั้ง PI สำหรับ PO 2 (การวิเคราะห์ปัญหา) ว่า "นักศึกษาสามารถหาคำตอบของโจทย์ในตำราเรียนได้ถูกต้อง" แต่เมื่อตรวจ Course Portfolio กลับพบว่าโจทย์เหล่านั้นไม่มีลักษณะ SP1–SP7 ของปัญหางานวิศวกรรมทั่วไป ท่านจะตัดสินความเหมาะสมของ PI นี้อย่างไร?',
 c:['เป็น PI ที่ดีมากเพราะนักศึกษาสามารถทำคะแนนได้สูงและตรวจสอบความถูกต้องได้ง่าย','เป็น PI ที่ไม่เหมาะสม เนื่องจากไม่สะท้อนระดับสมรรถนะของปัญหางานวิศวกรรมทั่วไป','ให้ผ่านเกณฑ์เนื่องจากนักศึกษามีความเชี่ยวชาญในการใช้สูตรคำนวณตามแบบความรู้ SK','เป็น PI ที่เพียงพอสำหรับชั้นปีที่ 1 และ 2 แต่ต้องปรับปรุงในชั้นปีสุดท้าย'],
 s:'วิธีคิด: PI ต้องบอกพฤติกรรมและระดับของปัญหาให้ชัด โจทย์ในตำราที่มีคำตอบเดียวเป็นงานประจำ ไม่ถึงระดับปัญหางานวิศวกรรมทั่วไป (SP1–SP7) ที่ ETAC กำหนด'},
'9.5':{c:['PI คือหัวข้อวิชาที่ต้องเรียนเพื่อให้ได้หน่วยกิตครบตามเกณฑ์','PI คือรอยต่อที่เชื่อมระหว่างผลลัพธ์ระดับกว้าง (PO) ไปสู่ผลลัพธ์ระดับรายวิชา (CLO) และแบบความรู้ (SK)','PI คือการวัดผลเฉพาะในส่วนของวิชาศึกษาทั่วไป (General Education) เท่านั้น','PI คือผลการประเมินความพึงพอใจของคณะกรรมการ IAB'],
 s:'วิธีคิด: PI ย่อย PO ให้เล็กลง เพื่อจับคู่กับความรู้ที่สอนในรายวิชา (SK ตาม Guideline 3.1.2) และกำหนดกิจกรรมการสอน (TLA) ให้สอดคล้องกัน'},
'9.9':{q:'ในตารางเชื่อม PO กับ PI ของเกณฑ์ข้อ 3 สำหรับหลักสูตร ETC หลักสูตรต้องระบุสิ่งใดควบคู่กับ PI เสมอเพื่ออ้างอิงระดับของความรู้?',
 c:['รายชื่อหนังสืออ้างอิง','รหัสแบบความรู้ (Knowledge Profile - SK)','วัตถุประสงค์ของหลักสูตร (PEO)','รายชื่ออาจารย์ผู้สอน'],
 s:'วิธีคิด: Guideline 3.1.2 ของ ETAC กำหนดให้ตัวชี้วัดของแต่ละ PO สอดคล้องกับ SK ที่กำหนด'},
'11.3':{q:'หัวใจสำคัญของโครงงานรวบยอดในเกณฑ์ข้อ 5 ของหลักสูตร ETC ที่แตกต่างจากโครงงานวิจัยทั่วไปคืออะไร?',
 c:['เป็นวิชาที่นักศึกษาต้องทำวิจัยในห้องแล็บเพียงลำพังเพื่อแสดงผลลัพธ์การศึกษาว่านักศึกษาสามารถแก้ปัญหาได้เองโดยลำพัง','เป็นจุดหลอมรวมความรู้ที่ต้องเผชิญกับข้อจำกัดที่สมจริงและแก้ปัญหางานวิศวกรรมทั่วไปจากสถานการณ์จริง','เป็นวิชาที่แสดงทักษะการเขียนรายงานและการนำเสนอรายงาน','เป็นวิชาที่เน้นการสร้างสิ่งประดิษฐ์เพื่อนำไปขายในเชิงพาณิชย์เพียงอย่างเดียว'],
 s:'วิธีคิด: ETAC ให้โครงงานรวบยอดทำเป็นกลุ่ม 3–5 คน โจทย์จากสถานการณ์จริง บูรณาการอย่างน้อย 2 สาขาย่อย และเป็นปัญหางานวิศวกรรมทั่วไป (SP1 และบางข้อของ SP2–SP7)'},
'12.0':{c:['ให้ผ่านเกณฑ์เนื่องจากนักศึกษาได้ฝึกปฏิบัติงานในสถานประกอบการจริง ซึ่งเป็นประสบการณ์ที่มีค่าสูง','ระบุเป็น Weakness เนื่องจากขาดการพิสูจน์ "การบูรณาการความรู้" และ "การแก้ปัญหางานวิศวกรรมทั่วไป" ด้วยเกณฑ์ที่หลักสูตรกำกับและเทียบเท่านักศึกษาที่ไม่ได้ไปสหกิจ','ให้ผ่านเกณฑ์แบบมีข้อวิตกกังวล (Concern) เพื่อให้หลักสูตรปรับปรุงวิธีให้คะแนนในปีถัดไป','ระบุเป็น Remark เพื่อแนะนำให้เปลี่ยนจากการส่งรายงานเป็นการนำเสนอผ่านวิดีโอแทน'],
 s:'วิธีคิด: ETAC ยอมให้ใช้สหกิจศึกษาประเมินผลลัพธ์ได้เมื่อเทียบเท่ากับนักศึกษาที่ไม่ได้ไป โจทย์ต้องเป็นปัญหางานวิศวกรรมทั่วไป และมีเกณฑ์ที่ผูกกับตัวชี้วัด การให้พี่เลี้ยงประเมินคนเดียวโดยไม่มีระบบกำกับจากหลักสูตรจึงไม่พอ'},
'12.1':{c:['เป็น Weakness เนื่องจากขาดคุณลักษณะของงานออกแบบและปัญหางานวิศวกรรมทั่วไป (SP1–SP7) ตามกรอบ Sydney Accord','เป็น Remark เนื่องจากนักศึกษาสามารถแสดงทักษะการวิจัยขั้นสูงและการวิเคราะห์ข้อมูลได้อย่างดีเยี่ยม','เป็น Sufficiency เนื่องจากงานวิจัยถือเป็นส่วนหนึ่งของหัวข้อทางวิศวกรรม (Engineering Topics) อยู่แล้ว','เป็น Concern เนื่องจากนักศึกษาอาจจะไม่มีความรู้เรื่องราคาวัสดุอุปกรณ์แต่สามารถสอบผ่านวิชาการออกแบบได้'],
 s:'วิธีคิด: โครงงานรวบยอดของ ETC ต้องเป็นงานที่เผชิญข้อจำกัดจริงและเป็นปัญหางานวิศวกรรมทั่วไป (SP2 มีประเด็นที่ไม่ใช่ทางเทคนิคขัดกัน เช่น เศรษฐศาสตร์ ความปลอดภัย กฎหมาย) การทดลองที่ไม่คำนึงถึงบริบทการปฏิบัติงานจึงไม่ถึงระดับ'},
'12.5':{c:['ช่วยให้อาจารย์มีภาระงานน้อยลงเพราะจำนวนนักศึกษาที่ลงเรียน Capstone ลดลง','เป็นกลไกที่รับประกันว่านักศึกษามีสมรรถนะพื้นฐาน (Scaffolding) ที่จำเป็นเพียงพอต่อการแก้ปัญหางานวิศวกรรมทั่วไปในชั้นปีสุดท้าย','ช่วยให้มหาวิทยาลัยสามารถเก็บค่าธรรมเนียมการเรียนเพิ่มได้จากการเรียนซ้ำวิชาบังคับก่อน','ทำให้ตารางเรียนของนักศึกษาไม่ซับซ้อนและจบการศึกษาได้ตามเวลา 4 ปี']},
'12.10':{c:['ให้ผ่าน เนื่องจากนักศึกษาสามารถสร้างชิ้นงานที่ใช้งานได้จริง (Working Prototype)','ระบุเป็น Weakness เนื่องจากโครงงานเป็นงานประจำ ไม่ถึงระดับปัญหางานวิศวกรรมทั่วไป (Broadly-defined)','ให้ผ่านแบบมีข้อสังเกต (Remark) เพราะนักศึกษาสามารถอธิบายทฤษฎีพื้นฐานได้อย่างแม่นยำ','ตัดสินให้ผ่านเนื่องจากเป็นดุลพินิจของอาจารย์ที่ปรึกษาโครงงานในการกำหนดระดับความยาก'],
 s:'วิธีคิด: โครงงานของ ETC ต้องเข้าข้อ SP1 (ใช้ความรู้ SK4–SK6 กับเทคโนโลยีที่พัฒนาแล้ว) และบางข้อของ SP2–SP7 งานที่ทำตามขั้นตอนตายตัวจึงไม่ถึงระดับ'},
'12.11':{c:['จำนวนชั่วโมงการปฏิบัติงานในโรงงานต้องไม่น้อยกว่า 600 ชั่วโมง','โจทย์จากสถานประกอบการต้องเป็นปัญหางานวิศวกรรมทั่วไป (SP1–SP7) และประเมินด้วย Rubric ราย PO ที่เทียบเท่ากับนักศึกษาที่ไม่ได้ไปสหกิจ','การประเมินจากพี่เลี้ยงที่ดูแลนักศึกษาว่ามีความรู้ ทักษะและทัศนคติเพียงพอที่จะปฏิบัติงานได้','แบบรายงานการฝึกสหกิจและแบบรายงานนิเทศนักศึกษาที่ลงนามโดยอาจารย์นิเทศแล้ว'],
 s:'วิธีคิด: ETAC ให้ใช้สหกิจศึกษาประเมินผลลัพธ์ได้เมื่อเทียบเท่ากับนักศึกษาที่ไม่ได้ไป PEV ต้องเห็นกลไกที่ทำให้โจทย์ในสถานประกอบการไม่ใช่งานประจำ และวัด PO ได้จริง'},
'12.14':{q:'ข้อใดคือลักษณะ SP6 ของปัญหางานวิศวกรรมทั่วไปในมิติของผู้มีส่วนได้ส่วนเสีย?',
 c:['ปัญหาที่มีอาจารย์ที่ปรึกษาเพียงคนเดียว','ปัญหาที่มีผู้มีส่วนได้ส่วนเสียหลากหลายกลุ่มที่ต้องคำนึงถึง','ปัญหาที่มีข้อมูลครบถ้วนสมบูรณ์ในตำราเรียน','ปัญหาที่สามารถแก้ได้โดยใช้สูตรคำนวณเพียงสูตรเดียว'],
 s:'วิธีคิด: SP6 คือมีผู้มีส่วนได้ส่วนเสียหลากหลาย ส่วนประเด็นที่ขัดกันอยู่ใน SP2 (เทียบกับ WP ของระดับวิศวกรที่ความต้องการขัดกันกว้างกว่า)'},
'12.15':{q:'ในรายงาน SER ของหลักสูตร ETC ควรแสดงหลักฐานใดในเกณฑ์ข้อ 5 เพื่อให้ PEV เห็นว่าโครงงานทั้งหมดถึงระดับปัญหางานวิศวกรรมทั่วไป?',
 c:['รายชื่อนักศึกษาและบทบาทในการทำโครงงานของนักศึกษาแต่ละคน','ตารางลักษณะ SP1–SP7 ของทุกโครงงาน (ในรายงาน Outcome Score ตาม Guideline 3.1.3)','รายชื่อโครงงานทั้งหมดพร้อมกับอาจารย์ที่ปรึกษาของโครงงานนั้น ๆ','รายการครุภัณฑ์ทั้งหมดที่มีอยู่ในห้องปฏิบัติการ'],
 s:'วิธีคิด: ตาราง SP1–SP7 ของทุกโครงงานช่วยให้ PEV เห็นว่าหลักสูตรกลั่นกรองหัวข้อให้ถึงระดับที่ ETAC (Sydney Accord) กำหนด'},
'x16.8':{q:'โครงงานรวบยอดของหลักสูตร ETC มีลักษณะ SP3, SP5 และ SP7 แต่ไม่มี SP1 PEV ควรสรุปอย่างไร',
 c:['ยังไม่ถึงระดับปัญหางานวิศวกรรมทั่วไป เพราะต้องมี SP1 และบางข้อของ SP2–SP7','ถึงระดับ เพราะมีมากกว่า 2 ข้อ','ถึงระดับ เพราะ SP3 สำคัญที่สุด','ไม่ต้องพิจารณา เพราะตารางนี้เป็นทางเลือก'],
 s:'เอกสารผนวก 1 ของคู่มือ ETAC: ปัญหางานวิศวกรรมทั่วไปต้องเข้าข้อ SP1 (ใช้ความรู้ SK4 SK5 หรือ SK6 กับเทคโนโลยีที่พัฒนาแล้ว) และบางข้อของ SP2–SP7'}
};
for(const k in O){const x=k[0]==='x';const [m,i]=(x?k.slice(1):k).split('.');const bank=x?X[m]:Q[m];const it=bank&&bank[+i];if(!it)continue;Object.assign(it,O[k]);}
})();

/* Readings of Modules 8, 9, 11 and 12 rewritten for ETC programmes (ETAC procedure revision 3,
   Guidelines 3.1.2–3.1.4). They replace the TABEE readings in this studio; the TABEE videos and
   slides of these modules stay, so the last section says to follow this reading when they differ. */
(function(){
const M=window.TR_MOD;if(!M)return;
const W=(t,e)=>[t,e];
const NOTE={h:W('ฉบับ ETC','ETC edition'),p:W('บทอ่านโมดูลนี้เขียนใหม่ตามคู่มือ ETAC ปรับปรุงครั้งที่ 3 และ ETAC Guideline 3.1.1–3.1.4 แล้ว วิดีโอและสไลด์ของโมดูลยังเป็นของ TABEE ระดับวิศวกร ถ้าเนื้อหาขัดกันให้ยึดบทอ่านนี้','This reading has been rewritten for the ETAC procedure (revision 3) and ETAC Guidelines 3.1.1–3.1.4. The module’s videos and slides are still TABEE’s engineer-level material; where they differ, follow this reading.'),etc:true};
const R={
8:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.3 · ETAC Guideline 3.1.2 และ 3.1.4','ETAC procedure rev. 3, 6.3 · ETAC Guidelines 3.1.2 and 3.1.4'),
 goal:W('ตรวจความเชื่อมโยงระหว่างผลลัพธ์ของหลักสูตร (PLO) ผลลัพธ์การศึกษา 11 ข้อของ ETAC และแบบความรู้ SK1–SK9','Check the links between the programme’s PLOs, ETAC’s 11 programme outcomes and knowledge profiles SK1–SK9.'),
 obj:[W('จำ PO 11 ข้อของ ETAC ลำดับของข้อ และ SK ที่กำกับแต่ละข้อ','Know ETAC’s 11 POs, their order and the SK attached to each'),
      W('ตรวจตาราง PLO–PO และรายวิชา–PO–SK ตาม Guideline 3.1.2','Check the PLO–PO and course–PO–SK tables per Guideline 3.1.2'),
      W('จับผลลัพธ์และตัวชี้วัดที่อยู่ผิดระดับ และเกรดที่ใช้แทนหลักฐานผลลัพธ์','Spot outcomes and indicators at the wrong level, and grades used as outcome evidence')],
 sec:[
 {h:W('ผลลัพธ์การศึกษา 11 ข้อของ ETAC','ETAC’s 11 programme outcomes'),p:W('เกณฑ์ข้อ 3 ของคู่มือ ETAC กำหนดผลลัพธ์ 11 ข้อที่สอดคล้องกับ Sydney Accord (2021) ทุกข้อเขียนที่ระดับปัญหางานวิศวกรรมทั่วไป ลำดับของข้อเรียงตาม TABEE ซึ่งต่างจากลำดับ SA ของ IEA ตั้งแต่ PO6 ถึง PO9 ตัวชี้วัดของแต่ละ PO ต้องสอดคล้องกับ SK ในคอลัมน์ขวา','Criterion 3 of the ETAC procedure sets 11 outcomes aligned with the Sydney Accord (2021), all written at the level of broadly-defined problems. They follow TABEE’s order, which differs from the IEA SA order for PO6–PO9. Each PO’s indicators must match the SK in the right-hand column.'),
  tbl:{cols:[W('PO','PO'),W('หัวข้อ','Outcome'),W('SA','SA'),W('SK','SK')],rows:[
  ['PO1',W('ความรู้ทางด้านวิศวกรรม และพื้นฐานทางคณิตศาสตร์และวิทยาศาสตร์','Engineering knowledge'),'SA1','SK1–SK4'],
  ['PO2',W('การวิเคราะห์ปัญหาทางวิศวกรรม','Problem analysis'),'SA2','SK1–SK4'],
  ['PO3',W('การออกแบบและพัฒนาเพื่อหาคำตอบของปัญหา','Design and development of solutions'),'SA3','SK5'],
  ['PO4',W('การพิจารณาตรวจสอบ','Investigation'),'SA4','SK8'],
  ['PO5',W('การใช้เครื่องมือทันสมัย','Tool usage'),'SA5','SK2, SK6'],
  ['PO6',W('การทำงานร่วมกันเป็นทีม','Team work'),'SA8','SK9'],
  ['PO7',W('การติดต่อสื่อสาร','Communication'),'SA9','–'],
  ['PO8',W('ความรับผิดชอบของวิศวกรต่อโลก','The engineer and the world'),'SA6','SK1, SK5, SK7'],
  ['PO9',W('จรรยาบรรณวิชาชีพ','Ethics'),'SA7','SK9'],
  ['PO10',W('การบริหารงานวิศวกรรม','Project management'),'SA10','–'],
  ['PO11',W('การเรียนรู้ตลอดชีพ','Lifelong learning'),'SA11','SK8']]}},
 {h:W('แบบความรู้ SK1–SK9','Knowledge profiles SK1–SK9'),p:W('ความรู้ของหลักสูตร ETC เน้นเทคโนโลยีที่พัฒนาแล้วและใช้ในการปฏิบัติวิชาชีพ ไม่ใช่ความรู้แนวหน้าหรือการวิจัยแบบ WK ของหลักสูตรวิศวกร','ETC knowledge centres on established technology used in practice, not the research-frontier knowledge of the engineer-level WK.'),
  tbl:{cols:[W('SK','SK'),W('ความรู้ (สรุปจากคู่มือ ETAC)','Knowledge (summarised from the ETAC procedure)')],rows:[
  ['SK1',W('ทฤษฎีวิทยาศาสตร์ธรรมชาติที่เหมาะกับสาขา และการตระหนักถึงสังคมศาสตร์ที่เกี่ยวข้อง','Natural science suited to the sub-discipline, with awareness of relevant social sciences')],
  ['SK2',W('คณิตศาสตร์ การวิเคราะห์เชิงตัวเลข การวิเคราะห์ข้อมูล สถิติ และวิทยาการคอมพิวเตอร์ เพื่อใช้แบบจำลองที่เหมาะกับสาขา','Mathematics, numerical analysis, data analysis, statistics and computing to support suitable models')],
  ['SK3',W('หลักพื้นฐานทางวิศวกรรมของสาขา','Engineering fundamentals of the sub-discipline')],
  ['SK4',W('กรอบทฤษฎีและความรู้เฉพาะทางวิศวกรรมของสาขา','Specialist engineering knowledge and theory of the sub-discipline')],
  ['SK5',W('ความรู้ที่รองรับการออกแบบและการปฏิบัติงานด้วยเทคโนโลยี รวมการใช้ทรัพยากร ผลกระทบสิ่งแวดล้อม ต้นทุนตลอดวงจรชีวิต และคาร์บอนสุทธิเป็นศูนย์','Knowledge supporting design and operations with technology, including resources, environmental impact, whole-life cost and net zero')],
  ['SK6',W('เทคโนโลยีทางวิศวกรรมที่ใช้ในการปฏิบัติวิชาชีพของสาขา','Engineering technologies used in practice in the sub-discipline')],
  ['SK7',W('บทบาทของเทคโนโลยีในสังคม ความปลอดภัยสาธารณะ และการพัฒนาอย่างยั่งยืน','The role of technology in society, public safety and sustainable development')],
  ['SK8',W('การค้นคว้าเอกสารเกี่ยวกับเทคโนโลยีปัจจุบันของสาขา และการคิดเชิงวิพากษ์','Literature on current technology in the discipline, and critical thinking')],
  ['SK9',W('จรรยาบรรณ ความรับผิดชอบ และการปฏิบัติที่เคารพความหลากหลาย','Ethics, responsibilities and inclusive conduct')]]}},
 {h:W('ตรวจการเชื่อมโยง','Checking the links'),b:[
  W('PLO ของหลักสูตรไม่ต้องใช้ถ้อยคำเดียวกับ PO แต่ต้องมีตาราง PLO–PO ที่ครอบคลุมครบ 11 ข้อ','PLOs need not copy the PO wording, but a PLO–PO table must cover all 11'),
  W('แต่ละ PO มีรายวิชาที่สอนและประเมินจริง ไม่ใช่แค่ติ๊กในตาราง Mapping (Outcome Sprinkling)','Each PO has courses that really teach and assess it, not ticks in a map (outcome sprinkling)'),
  W('ตัวชี้วัดของแต่ละ PO ระบุ SK และครบทุก SK ที่ตารางกำหนด (Guideline 3.1.2) แถว SK ที่ว่างคือช่องว่างของหลักฐาน','Each PO’s indicators name their SK and cover every SK the table requires (Guideline 3.1.2); an empty SK row is an evidence gap'),
  W('PO7 และ PO10 ไม่มี SK กำกับ จึงไม่ต้องหาตัวชี้วัดที่ผูก SK ให้สองข้อนี้','PO7 and PO10 carry no SK, so do not look for SK-linked indicators there'),
  W('PO6 PO7 และ PO10 ต้องวัดทางตรงด้วยรูบริก ผล S/U ของฝึกงานหรือสหกิจศึกษาอย่างเดียวไม่พอ','PO6, PO7 and PO10 need direct rubric-based measures; an S/U from internship or co-op alone is not enough')]},
 {h:W('สัญญาณว่าหลักฐานอยู่ผิดระดับ','Signs of a level mismatch'),b:[
  W('PLO หรือ CLO เขียนถึงปัญหาที่ซับซ้อน งานวิจัยแนวหน้า หรือ WK ซึ่งคัดลอกจากหลักสูตรวิศวกร','PLOs or CLOs talk of complex problems, frontier research or WK, copied from an engineering programme'),
  W('ใช้ลำดับ SA ของ IEA แทนลำดับของ ETAC ทำให้ PO6–PO9 สลับกัน และ SK ผูกผิดข้อ','IEA SA order used instead of ETAC’s, so PO6–PO9 are swapped and SKs land on the wrong PO'),
  W('ตาราง SK มีครบทุกแถว แต่ไม่มีตัวชี้วัดหรือผลการวัดในแถวนั้น','Every SK row is listed, but some rows have no indicator or result')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('แถว SK1 ใน PO1 และ PO8 ว่าง หลักสูตรอ้างว่าวิชาฟิสิกส์ครอบคลุม แต่ไม่ได้ประเมิน','SK1 rows in PO1 and PO8 empty; the programme says physics covers it but does not assess it'),'C'],
  [W('PLO ทุกข้อคัดลอกจากหลักสูตรวิศวกรรมระดับ Washington Accord และ CLO ของวิชาหลักเขียนถึงปัญหาที่ซับซ้อน','All PLOs copied from a Washington Accord programme; core CLOs speak of complex problems'),'W'],
  [W('PO7 และ PO10 ไม่มีตัวชี้วัดที่ผูก SK','PO7 and PO10 have no SK-linked indicators'),W('ไม่มีประเด็น','No issue')]]}}],
 ev:[[W('ตาราง PLO–PO และตาราง PO–SK–PI ตาม Guideline 3.1.2','PLO–PO and PO–SK–PI tables per Guideline 3.1.2'),W('“ตัวชี้วัดใดวัด SK4 ใน PO1”','“Which indicator measures SK4 under PO1?”')],
  [W('CLO ของรายวิชาที่ใช้ประเมินตัวชี้วัด','CLOs of the courses that assess indicators'),W('อาจารย์: “CLO นี้ต่างจากของหลักสูตรวิศวกรอย่างไร”','Faculty: “How does this CLO differ from the engineering programme’s?”')],
  [W('Course Portfolio ของวิชาที่ติ๊ก PO6 และ PO7','Portfolios of courses ticked for PO6 and PO7'),W('นักศึกษา: “งานกลุ่มในวิชานี้ประเมินรายคนอย่างไร”','Students: “How is group work graded per person here?”')]],
 iss:[W('ไม่ครอบคลุม PO 11 ข้อของ ETAC หรือใช้ลำดับ SA ของ IEA','Not covering ETAC’s 11 POs, or using the IEA SA order'),W('แถว SK ว่างหรือมีแต่ชื่อ ไม่มีตัวชี้วัด','Empty SK rows, or rows with no indicator'),W('ผลลัพธ์เขียนที่ระดับวิศวกร','Outcomes written at engineer level'),W('ไม่มีการวัด PO6 PO7 PO10 ทางตรง','No direct measures of PO6, PO7 and PO10')],
 terms:[['SA',W('ผลลัพธ์ของบัณฑิตตาม Sydney Accord (SA1–SA11)','Sydney Accord graduate attributes SA1–SA11')],['SK',W('แบบความรู้ของหลักสูตร ETC (SK1–SK9)','ETC knowledge profile SK1–SK9')],['PLO',W('ผลลัพธ์ระดับหลักสูตรที่หลักสูตรกำหนดเอง','The programme’s own outcomes')],[W('อยู่ผิดระดับ','Level mismatch'),W('หลักฐานหรือข้อความเขียนที่ระดับของข้อตกลงอื่น','Evidence or wording pitched at another accord’s level')]],
 ref:[W('คู่มือขั้นตอนและวิธีการรับรองฯ หลักสูตรทางเทคโนโลยีวิศวกรรม ปรับปรุงครั้งที่ 3 ข้อ 6.3','ETAC procedure rev. 3, 6.3'),W('ETAC Guideline 3.1.2 การประเมินผลลัพธ์รายวิชาที่สอดคล้องกับแบบความรู้','ETAC Guideline 3.1.2'),W('ETAC Guideline 3.1.4 แบบรายการตรวจสอบรายงานประเมินตนเอง','ETAC Guideline 3.1.4')],
 chk:[W('PO ใดของ ETAC ไม่มี SK กำกับ','Which ETAC POs carry no SK?'),W('PO6 ของ ETAC ตรงกับ SA ข้อใด','Which SA does ETAC’s PO6 correspond to?')]},

9:{abet:W('ETAC Guideline 3.1.2 · คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.3–6.4','ETAC Guideline 3.1.2 · ETAC procedure rev. 3, 6.3–6.4'),
 goal:W('ประเมินว่าตัวชี้วัด (PI) ของหลักสูตร ETC วัดได้จริง อยู่ระดับปัญหางานวิศวกรรมทั่วไป และผูกกับ SK ตาม Guideline 3.1.2','Judge whether an ETC programme’s PIs are measurable, pitched at broadly-defined problems and tied to SK per Guideline 3.1.2.'),
 obj:[W('เขียนและวิจารณ์ PI ระดับ ETC','Write and critique ETC-level PIs'),W('ใช้ตารางตาม Guideline 3.1.2 เป็นแผนที่ไปตรวจ Course Portfolio','Use the Guideline 3.1.2 table as a map to the course portfolios'),W('แยกกรณี W C และ R ด้านตัวชี้วัด','Tell W, C and R apart in PI matters')],
 sec:[
 {h:W('PI ระดับ ETC','PIs at ETC level'),p:W('PI คือข้อความที่สังเกตและวัดได้ว่านักศึกษาทำอะไรได้ สำหรับหลักสูตร ETC บริบทของ PI อยู่ที่การประยุกต์เทคโนโลยีที่พัฒนาแล้ว วิธีวิเคราะห์ที่ยอมรับแล้ว และมาตรฐานการปฏิบัติงาน ทุก PI ระบุ SK ที่รองรับ','A PI is an observable, measurable statement of what students can do. For ETC it sits in applying established technology, accepted analysis methods and practice standards, and every PI names its supporting SK.'),
  tbl:{cols:[W('ผิดระดับหรือวัดไม่ได้','Wrong level or unmeasurable'),W('ระดับ ETC ที่วัดได้','Measurable, ETC level')],rows:[
  [W('วิเคราะห์ปัญหาวิศวกรรมที่ซับซ้อนที่ไม่มีคำตอบชัดเจน โดยใช้งานวิจัยแนวหน้า','Analyse complex problems with no clear answer using frontier research'),W('วิเคราะห์สาเหตุปัญหาคุณภาพในสายการผลิตด้วยเครื่องมือคุณภาพและข้อมูลจริง และสรุปสาเหตุที่มีหลักฐาน (PO2 · SK4)','Analyse a production quality problem with quality tools and real data and reach an evidenced cause (PO2 · SK4)')],
  [W('เข้าใจหลักความปลอดภัย','Understand safety principles'),W('ประเมินความเสี่ยงของงานในโรงฝึกงานตามมาตรฐานความปลอดภัย และเลือกมาตรการควบคุมได้ (PO8 · SK7)','Assess a workshop task’s risk against a safety standard and choose controls (PO8 · SK7)')],
  [W('ใช้ซอฟต์แวร์ได้','Can use software'),W('ใช้ซอฟต์แวร์ CAD/CAM หรือโปรแกรมจำลองแก้ปัญหาที่กำหนด และบอกข้อจำกัดของผลได้ (PO5 · SK2, SK6)','Use CAD/CAM or simulation on a set problem and state the result’s limits (PO5 · SK2, SK6)')]]}},
 {h:W('ตารางตาม Guideline 3.1.2 คือแผนที่ของ PEV','The Guideline 3.1.2 table is the PEV’s map'),b:[
  W('แต่ละ PO แยกแถวตาม SK ที่กำหนด ทุกแถวมี PI วิธีวัดทางตรง วิธีวัดทางอ้อม แหล่งข้อมูล ผลย้อนหลัง และเกณฑ์ความสำเร็จที่หลักสูตรตั้ง','Each PO is split into rows by its SK; each row has the PI, direct and indirect measures, data source, past results and the programme’s target'),
  W('ตาราง CLO ของรายวิชาที่ประเมิน PI บอกว่าจะไปเปิด Course Portfolio ของวิชาใด','The CLO table of the assessing courses tells you which portfolios to open'),
  W('ตารางสรุปผลและแนวทางปรับปรุงต่อไปยังเกณฑ์ข้อ 4 ถ้าผลต่ำกว่าเกณฑ์แต่ไม่มีแนวทางปรับปรุง เป็นประเด็นของเกณฑ์ข้อ 4','The results-and-actions table feeds criterion 4; results below target with no action are a criterion 4 matter')]},
 {h:W('Checklist ของ PEV','PEV checklist'),b:[
  W('PI ทุกตัวระบุ SK และไม่มีแถว SK ที่ว่าง','Every PI names its SK and no SK row is empty'),
  W('วิธีวัดทางตรงเป็นงานจริงของนักศึกษา เช่น ใบงาน การสอบปฏิบัติ รายงาน พร้อมรูบริก ไม่ใช่เกรดรายวิชา','Direct measures are real student work (job sheets, practical tests, reports) with rubrics, not course grades'),
  W('PI ที่ผล S/U ร้อยละ 100 ทุกปีคือวัดไม่ได้ ไม่ใช่ผ่านเกณฑ์','A PI at 100% S/U every year is not measured, not met'),
  W('รายวิชาที่ใช้วัดเป็นวิชาบังคับที่นักศึกษาทุกคนเรียน','Assessing courses are compulsory for every student'),
  W('PI ในฝึกงานหรือสหกิจศึกษามีรูบริกของอาจารย์ ไม่ใช่แบบประเมินของสถานประกอบการอย่างเดียว','Internship or co-op PIs use the faculty’s rubric, not only the employer’s form'),
  W('เปิดตัวอย่างงานนักศึกษาดูว่าระดับของงานตรงกับข้อความของ PI','Open sample student work to see its level matches the PI wording')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('PI ทำงานเป็นทีม สื่อสาร และบริหารงาน วัดด้วยผล S/U ของสหกิจศึกษา ได้ร้อยละ 100 ทุกปี ขณะที่ผู้ใช้บัณฑิตให้การสื่อสาร 3.4 จาก 5','Team, communication and management PIs measured by co-op S/U at 100% every year, while employers rate communication 3.4/5'),'W'],
  [W('ข้อความ PI ของ PO2 เขียนถึงปัญหาที่ซับซ้อนและการวิจัย แต่ใบงานที่ใช้วัดอยู่ระดับ ETC ถูกต้อง','PO2 PI wording speaks of complex problems and research, but the job sheets used are at the right ETC level'),'C'],
  [W('PI ด้านเครื่องมือทันสมัยวัดในวิชาเลือกที่นักศึกษาเรียนประมาณครึ่งรุ่น','The modern-tools PI is measured in an elective taken by about half the cohort'),'R']]}}],
 ev:[[W('ตาราง PO–SK–PI พร้อมผล 3 ปี','PO–SK–PI table with three years of results'),W('“ตั้งเกณฑ์ร้อยละนี้จากอะไร”','“How was this target set?”')],
  [W('ใบงาน ข้อสอบปฏิบัติ และรูบริกของ PI ที่สุ่ม','Job sheets, practical tests and rubrics of sampled PIs'),W('อาจารย์: “นักศึกษาที่ได้ระดับ 2 กับ 3 ต่างกันอย่างไร”','Faculty: “What separates level 2 from level 3?”')],
  [W('แบบประเมินฝึกงานและสหกิจศึกษา','Internship and co-op assessment forms'),W('อาจารย์นิเทศ: “ใครให้คะแนนตัวชี้วัดนี้”','Supervisor: “Who scores this indicator?”')]],
 iss:[W('PI ใช้คำกริยาที่วัดไม่ได้ หรือเขียนที่ระดับวิศวกร','Unmeasurable verbs, or engineer-level wording'),W('PI ไม่ระบุ SK หรือแถว SK ว่าง','PIs without SK, or empty SK rows'),W('นับว่าผ่านจากเกรดหรือผล S/U','Counting a PI as met from grades or S/U'),W('ฝึกงานหรือสหกิจประเมินโดยสถานประกอบการฝ่ายเดียว','Internship or co-op assessed by the employer alone')],
 terms:[['PI',W('ตัวชี้วัดสมรรถนะที่สังเกตและวัดได้','Observable, measurable performance indicator')],[W('การวัดทางตรง','Direct measure'),W('ประเมินจากงานของนักศึกษาด้วยรูบริกหรือข้อสอบ','Assessment of student work with rubrics or tests')],[W('การวัดทางอ้อม','Indirect measure'),W('แบบสำรวจนักศึกษา ศิษย์เก่า หรือผู้ใช้บัณฑิต','Surveys of students, alumni or employers')],[W('เกณฑ์ความสำเร็จ','Target'),W('ร้อยละของนักศึกษาที่คาดว่าจะผ่าน PI ซึ่งหลักสูตรกำหนดและอธิบายที่มา','The share of students expected to meet a PI, set and justified by the programme')]],
 ref:[W('ETAC Guideline 3.1.2 การประเมินผลลัพธ์รายวิชาที่สอดคล้องกับแบบความรู้','ETAC Guideline 3.1.2'),W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.3 และ 6.4','ETAC procedure rev. 3, 6.3 and 6.4')],
 chk:[W('PI ที่ผล S/U ร้อยละ 100 ทุกปีบอกอะไร','What does a PI at 100% S/U every year tell you?'),W('ตารางใดบอกว่าต้องเปิด Course Portfolio ของวิชาใด','Which table tells you which portfolios to open?')]},

11:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.5 และแบบรายงานเกณฑ์ข้อ 5','ETAC procedure rev. 3, 6.5 and the criterion 5 SER section'),
 goal:W('ตรวจโครงสร้างหลักสูตร ETC ตามเกณฑ์ข้อ 5 ของ ETAC: 45 หน่วยกิต ฝึกงาน 210 ชั่วโมงหรือสหกิจศึกษา และโครงงานรวบยอด และดูว่าลำดับรายวิชาพานักศึกษาไปถึง PO ได้จริง','Check an ETC curriculum against ETAC criterion 5 — 45 credits, 210 hours of industrial training or co-op, and a capstone — and whether the course sequence leads to the POs.'),
 obj:[W('นับหน่วยกิตหมวดวิศวกรรมพื้นฐาน เฉพาะทางและเทคโนโลยีวิศวกรรมให้ถูก','Count the engineering fundamentals, specialist and engineering technology credits correctly'),W('ตรวจหลักฐานฝึกงาน 210 ชั่วโมงหรือสหกิจศึกษา และการประเมินผลลัพธ์จากงานนี้','Check evidence of 210 hours or co-op and how outcomes are assessed there'),W('อ่านตาราง 5.1 และ 5.2 และ Course Portfolio','Read Tables 5.1 and 5.2 and the course portfolios')],
 sec:[
 {h:W('ข้อกำหนดของเกณฑ์ข้อ 5 (ETAC)','What ETAC criterion 5 requires'),p:W('หลักสูตรต้องกำหนดแบบความรู้ในปริมาณและคุณภาพที่เพียงพอตามวัตถุประสงค์หลักสูตร และมีโครงสร้างครอบคลุม 4 ส่วน','The programme must set a sufficient knowledge profile for its objectives and a structure with four parts.'),b:[
  W('คณิตศาสตร์ พื้นฐานวิทยาศาสตร์ และปฏิบัติการ ที่เพียงพอและเหมาะสม (คู่มือไม่กำหนดหน่วยกิตขั้นต่ำเป็นตัวเลข)','Mathematics, basic science and laboratory work, sufficient and appropriate (no minimum credit figure is set)'),
  W('ความรู้พื้นฐานทางวิศวกรรม เฉพาะทางวิศวกรรมและเทคโนโลยีวิศวกรรม รวมปฏิบัติการ ไม่น้อยกว่า 45 หน่วยกิต (หรือเทียบเท่า 1½ ปีการศึกษา) นับรวมโครงงานรวบยอด','Engineering fundamentals, specialist and engineering technology subjects with labs: at least 45 credits (or 1½ years), capstone included'),
  W('ศึกษาทั่วไปที่เพียงพอต่อลักษณะบัณฑิตที่พึงประสงค์','General education sufficient for the desired graduate attributes'),
  W('ฝึกงานในภาคอุตสาหกรรมไม่น้อยกว่า 210 ชั่วโมง หรือสหกิจศึกษา และโครงงานรวบยอดชั้นปีที่ 4 ที่แก้ปัญหางานวิศวกรรมทั่วไป','Industrial training of at least 210 hours or co-op, and a year-4 capstone on broadly-defined problems')]},
 {h:W('นับ 45 หน่วยกิต','Counting the 45 credits'),b:[
  W('นับวิชาวิศวกรรมพื้นฐาน เฉพาะทาง เทคโนโลยีวิศวกรรม ปฏิบัติการที่เกี่ยวข้อง และโครงงานรวบยอด ไม่นับศึกษาทั่วไป คณิตศาสตร์ และวิทยาศาสตร์พื้นฐาน','Count engineering fundamentals, specialist, engineering technology, related labs and the capstone; not general education, mathematics or basic science'),
  W('ไม่ต้องคำนวณหน่วยกิตแฝงคณิตวิทยาศาสตร์แบบ TABEE เพราะ ETAC ไม่ได้กำหนดเป็นตัวเลข แต่ต้องดูว่า SK1 และ SK2 มีตัวชี้วัดรองรับ (Module 8–9)','There is no TABEE-style embedded math/science credit count, since ETAC sets no figure, but SK1 and SK2 still need indicators (Modules 8–9)'),
  W('แผนต่อเนื่องหรือเทียบโอนจาก ปวส. ต้องมีตารางเทียบรายวิชาและหลักฐานว่าผลลัพธ์เทียบเท่า (เชื่อมกับเกณฑ์ข้อ 1)','Continuing plans and transfer from vocational diplomas need a course-equivalence table and evidence of equivalent outcomes (links to criterion 1)'),
  W('ถ้ามีหลักสูตรเก่าและหลักสูตรปรับปรุงในช่วงที่ประเมิน ต้องแสดงตารางของทั้งสองหลักสูตร','If old and revised curricula overlap the review period, both tables must be shown')]},
 {h:W('ฝึกงาน 210 ชั่วโมงหรือสหกิจศึกษา','210 hours of industrial training or co-op'),b:[
  W('ดูหลักฐานชั่วโมงจริง เช่น ใบลงเวลา ไม่ใช่เฉพาะที่เขียนในแผนการศึกษา','Look for actual hours, such as time sheets, not only the study plan'),
  W('SER ต้องอธิบายการจัดฝึกงานและการฝึกแก้ปัญหางานวิศวกรรมทั่วไปที่ใช้ความรู้จากรายวิชาและการฝึกงาน','The SER must explain how training is organised and how students practise broadly-defined problems using courses and training'),
  W('ถ้าใช้สหกิจศึกษาประเมินผลลัพธ์ ต้องแสดงว่าประเมินเทียบเท่ากับนักศึกษาที่ไม่ได้ไปสหกิจ','If co-op is used to assess outcomes, show it is equivalent to the assessment of students who did not go'),
  W('การประเมินควรมีรูบริกของอาจารย์ที่ผูกกับตัวชี้วัด ไม่ใช่แบบประเมินของสถานประกอบการอย่างเดียว','Assessment should use a faculty rubric tied to indicators, not only the employer’s form')]},
 {h:W('ตาราง 5.1 5.2 และ Course Portfolio','Tables 5.1, 5.2 and course portfolios'),b:[
  W('ตาราง 5.1 โครงสร้างหลักสูตรและหมวดหน่วยกิต ใช้นับ 45 หน่วยกิต','Table 5.1: structure and credit categories, used for the 45-credit count'),
  W('ตาราง 5.2 วิชาบังคับก่อน ดูว่าลำดับรายวิชาสอดคล้องกับผลลัพธ์','Table 5.2: prerequisites, checked against the outcomes'),
  W('Course Portfolio: ประมวลรายวิชา ตำรา ตัวอย่างงานนักศึกษา และข้อสอบพร้อมการตรวจ','Course portfolio: syllabus, texts, sample student work and marked exams'),
  W('วิชาปฏิบัติใช้เครื่องมือและเทคโนโลยีที่ใช้จริงในอุตสาหกรรม (SK6 เชื่อมกับเกณฑ์ข้อ 7)','Practical courses use tools and technology used in industry (SK6, links to criterion 7)')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('หมวดวิศวกรรมพื้นฐาน เฉพาะทาง และเทคโนโลยีวิศวกรรมรวม 42 หน่วยกิตรวมโครงงาน','Engineering fundamentals, specialist and technology subjects total 42 credits with the capstone'),'D'],
  [W('สหกิจศึกษาใช้เป็นหลักฐาน PO6 และ PO7 แต่ประเมินด้วยแบบของสถานประกอบการฝ่ายเดียว','Co-op used as evidence for PO6 and PO7 but assessed only on the employer’s form'),'W'],
  [W('นักศึกษาเทียบโอนจาก ปวส. 36 หน่วยกิต มีตารางเทียบรายวิชาและผลทดสอบสมรรถนะครบ','Diploma transfers of 36 credits with a full equivalence table and competency test results'),W('ไม่มีประเด็น','No issue')]]}}],
 ev:[[W('ตาราง 5.1 5.2 และแผนการศึกษาทุกแผน','Tables 5.1, 5.2 and every study plan'),W('“วิชาใดบ้างที่นับใน 45 หน่วยกิต”','“Which courses count towards the 45 credits?”')],
  [W('ใบลงเวลาและแบบประเมินฝึกงานหรือสหกิจศึกษา','Training time sheets and assessment forms'),W('พนักงานพี่เลี้ยง: “นักศึกษาทำงานอะไรในช่วงฝึก”','Mentor: “What work did the student do?”')],
  [W('ตารางเทียบโอนและผลทดสอบของนักศึกษาแผนต่อเนื่อง','Transfer tables and tests for continuing-plan students'),W('นักศึกษาแผนต่อเนื่อง: “วิชาที่เทียบโอนเคยเรียนอะไรบ้าง”','Continuing student: “What did the transferred courses cover?”')]],
 iss:[W('หน่วยกิตหมวดวิศวกรรมและเทคโนโลยีวิศวกรรมไม่ถึง 45','Engineering and technology credits under 45'),W('ไม่มีหลักฐานชั่วโมงฝึกงานจริง','No evidence of actual training hours'),W('สหกิจศึกษาประเมินไม่เทียบเท่าโครงงาน','Co-op assessed below the capstone standard'),W('เทียบโอนโดยไม่มีหลักฐานผลลัพธ์เทียบเท่า','Transfers without evidence of equivalent outcomes')],
 terms:[[W('45 หน่วยกิต','45 credits'),W('หน่วยกิตขั้นต่ำของหมวดวิศวกรรมและเทคโนโลยีวิศวกรรมรวมปฏิบัติการ','Minimum for engineering and technology subjects with labs')],[W('210 ชั่วโมง','210 hours'),W('ชั่วโมงฝึกงานในภาคอุตสาหกรรมขั้นต่ำ ถ้าไม่มีสหกิจศึกษา','Minimum industrial training without co-op')],['Table 5.1',W('ตารางโครงสร้างหลักสูตรใน SER','Curriculum structure table')],['Table 5.2',W('ตารางวิชาบังคับก่อนใน SER','Prerequisite table')]],
 ref:[W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.5','ETAC procedure rev. 3, 6.5'),W('แบบรายงานประเมินตนเอง เกณฑ์ข้อ 5 หัวข้อ 1–7 และ ETAC Guideline 3.1.4','SER criterion 5 items 1–7 and ETAC Guideline 3.1.4')],
 chk:[W('วิชาใดไม่นับใน 45 หน่วยกิต','Which courses do not count towards 45 credits?'),W('สหกิจศึกษาใช้ประเมินผลลัพธ์ได้เมื่อใด','When may co-op be used to assess outcomes?')]},

12:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.5 และเอกสารผนวก 1 ข้อ 24 · ETAC Guideline 3.1.3','ETAC procedure rev. 3, 6.5 and Appendix 1 item 24 · ETAC Guideline 3.1.3'),
 goal:W('ตัดสินได้ว่าโครงงานรวบยอดเป็นปัญหางานวิศวกรรมทั่วไปจริง และประเมินผลลัพธ์รายบุคคลตาม Guideline 3.1.3','Judge whether capstone projects are genuinely broadly-defined problems and are assessed per student under Guideline 3.1.3.'),
 obj:[W('แยกงานประจำ ปัญหางานวิศวกรรมทั่วไป และปัญหาที่ซับซ้อน ด้วย SP1–SP7','Tell routine work, broadly-defined and complex problems apart with SP1–SP7'),W('ใช้รูปแบบรายงาน Outcome Score on Capstone (Guideline 3.1.3)','Use the Outcome Score on Capstone format (Guideline 3.1.3)'),W('ตรวจตาราง SP ของทุกโครงงานและตารางคะแนนรายคน','Check the SP table of every project and the per-student scores')],
 sec:[
 {h:W('โครงงานรวบยอดของ ETC','The ETC capstone'),p:W('เกณฑ์ข้อ 5 กำหนดให้มีโครงงานชั้นปีที่ 4 ที่ออกแบบและแก้ปัญหางานวิศวกรรมทั่วไป โดยใช้ความรู้และการฝึกปฏิบัติที่เรียนมาคู่กับมาตรฐานงานวิศวกรรมและเทคโนโลยีวิศวกรรม ภายใต้เงื่อนไขของงานจริง','Criterion 5 requires a year-4 project that designs for and solves broadly-defined problems, using prior learning and practice with engineering and technology standards under real conditions.'),b:[
  W('ทำงานกลุ่ม 3–5 คน (เอกสารผนวก 1 ข้อ 24)','Groups of 3–5 (Appendix 1 item 24)'),
  W('โจทย์จากสถานการณ์จริงหรือส่วนหนึ่งของสถานการณ์จริง และบูรณาการความรู้อย่างน้อย 2 สาขาย่อย','A real or partly real brief integrating at least two sub-disciplines'),
  W('ใช้ความรู้และประสบการณ์จากการฝึกในภาคอุตสาหกรรม','Draws on industrial training'),
  W('นับอยู่ในหมวด 45 หน่วยกิต','Counts within the 45 credits')]},
 {h:W('ระดับของโจทย์','The level of the brief'),p:W('ปัญหางานวิศวกรรมทั่วไปต้องเข้าข้อ SP1 และบางข้อของ SP2–SP7 (เอกสารผนวก 1) อย่าใช้นิยามปัญหาที่ซับซ้อน (WP) กับหลักสูตร ETC จนตัดสินว่าทุกโครงงานไม่ถึงระดับ Guideline 3.1.3 ข้อ 3 ยังพิมพ์นิยามปัญหาที่ซับซ้อนไว้ ให้ใช้ SP1–SP7 ตามเอกสารผนวก 1','A broadly-defined problem meets SP1 and some of SP2–SP7 (Appendix 1). Do not apply the complex-problem (WP) definition to ETC and fail every project. Guideline 3.1.3 item 3 still prints the complex definition; use SP1–SP7 from Appendix 1.'),
  tbl:{cols:[W('ด้าน','Aspect'),W('งานประจำ (ไม่ถึงระดับ)','Routine work (not enough)'),W('ปัญหางานวิศวกรรมทั่วไป (ETC)','Broadly-defined (ETC)'),W('ปัญหาที่ซับซ้อน (วิศวกร)','Complex (engineer)')],rows:[
  [W('ความรู้','Knowledge'),W('ทำตามขั้นตอนตายตัว','Follows a fixed procedure'),W('SK4 SK5 หรือ SK6 กับเทคโนโลยีที่พัฒนาแล้ว (SP1)','SK4, SK5 or SK6 with established technology (SP1)'),W('ความรู้เชิงลึกระดับแนวหน้า','Deep, frontier knowledge')],
  [W('วิธีแก้','Solution'),W('มีคำตอบเดียว ไม่ต้องตัดสินใจ','One answer, no judgement'),W('วิธีวิเคราะห์และแบบจำลองที่พิสูจน์แล้ว รูปแบบที่ยอมรับแล้ว (SP3, SP4)','Proven methods and models, accepted approaches (SP3, SP4)'),W('ไม่มีคำตอบชัดเจน ต้องคิดริเริ่ม','No obvious answer, original thinking')],
  [W('ข้อขัดแย้ง','Conflicts'),W('ไม่มี','None'),W('ประเด็นเทคนิคกับไม่ใช่เทคนิคขัดกัน ผู้มีส่วนได้ส่วนเสียหลากหลาย (SP2, SP6)','Technical and non-technical issues conflict; varied stakeholders (SP2, SP6)'),W('ความต้องการขัดแย้งกว้าง','Wide-ranging conflicting needs')],
  [W('มาตรฐาน','Standards'),W('ครบตามมาตรฐาน','Fully codified'),W('บางส่วนไม่อยู่ในมาตรฐาน (SP5)','Partly outside standards (SP5)'),W('อาจไม่มีมาตรฐานกำกับ','May have no governing standard')],
  [W('ตัวอย่าง','Example'),W('จับเวลาการทำงานแล้วบันทึกลงแบบฟอร์ม','Timing jobs and filling in a form'),W('ปรับสมดุลสายการผลิตด้วยการศึกษาเวลาและแบบจำลอง ภายใต้ข้อจำกัดต้นทุนและความปลอดภัย','Rebalancing a line with time study and simulation under cost and safety limits'),W('ออกแบบระบบการผลิตแบบใหม่ที่ยังไม่มีแนวทาง','Designing a new production system with no precedent')]]}},
 {h:W('การนำเสนอตาม Guideline 3.1.3','Reporting under Guideline 3.1.3'),b:[
  W('ตารางคุณลักษณะ SP1–SP7 ของทุกโครงงาน','An SP1–SP7 table for every project'),
  W('ประเมินอย่างน้อย PO2 PO3 PO4 PO6 PO7 และ PO8 ผ่าน PI และเพิ่ม PO อื่นได้','Assess at least PO2, PO3, PO4, PO6, PO7 and PO8 through PIs; others may be added'),
  W('ตารางที่ 1 รายโครงงาน: PI ค่าถ่วงน้ำหนัก คะแนนกลุ่ม และคะแนนนักศึกษารายคน','Table 1 per project: PIs, weights, group score and each student’s score'),
  W('ตารางที่ 2 ทุกทีมและค่าเฉลี่ย เป็นคะแนนจริงจากรูบริก ไม่ใช่คะแนนรวมของรูปเล่ม','Table 2 all teams with averages, real rubric scores rather than report totals'),
  W('แสดงข้อสอบหรือรูบริกครบทุก PI ที่ใช้','Show the test or rubric for every PI used')]},
 {h:W('สหกิจศึกษาแทนโครงงานรวบยอด','Co-op in place of the capstone'),p:W('ทำได้เมื่อแสดงว่าการประเมินผลลัพธ์ในสหกิจศึกษาเทียบเท่ากับนักศึกษาที่ทำโครงงาน คือมีการกลั่นกรองโจทย์ให้ถึงระดับ SP และใช้รูบริกราย PI เดียวกัน','Allowed when outcome assessment in co-op is shown to equal that of capstone students: briefs screened to SP level and the same per-PI rubric used.')},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('ตาราง SP ติ๊ก SP1 ให้โครงงานจับเวลาแล้วบันทึกลงแบบฟอร์ม 7 เรื่อง และทุกเรื่องได้ระดับ 3','The SP table ticks SP1 for seven time-and-record projects, all scored at level 3'),'W'],
  [W('รายงาน Outcome Score ไม่มี PI ของ PO8','The Outcome Score report has no PO8 indicator'),'C'],
  [W('PI ทำงานเป็นทีมให้คะแนนเดียวทั้งกลุ่ม ไม่มีการประเมินรายคน','The team-work PI gives one score per group, nothing per student'),'C'],
  [W('กลุ่มละ 3–4 คน','Groups of 3–4'),W('ไม่มีประเด็น','No issue')]]}}],
 ev:[[W('ตาราง SP1–SP7 ของทุกโครงงาน 2 ปี','SP1–SP7 tables for all projects over two years'),W('สุ่มเล่มที่ติ๊ก SP มากที่สุดและน้อยที่สุดมาเปิดดู','Open the projects with the most and fewest SP ticks')],
  [W('รูบริก ตารางที่ 1 และ 2 และใบให้คะแนนของกรรมการ','Rubrics, Tables 1 and 2 and examiners’ score sheets'),W('กรรมการ: “แยกคะแนนรายคนในกลุ่มอย่างไร”','Examiner: “How are individual scores separated?”')],
  [W('หนังสือหรือความเห็นของสถานประกอบการเจ้าของโจทย์','Letters or comments from the sponsoring company'),W('นักศึกษา: “ใช้มาตรฐานใด และมีข้อจำกัดอะไรที่ขัดกัน”','Students: “Which standard did you use, and which constraints conflicted?”')]],
 iss:[W('งานประจำของโรงงานถูกนับเป็นโครงงานรวบยอด','Routine factory work counted as a capstone'),W('ใช้คะแนนรวมของรูปเล่มแทนคะแนนราย PI','Report totals used instead of per-PI scores'),W('ขาด PO ที่ Guideline 3.1.3 กำหนด','POs required by Guideline 3.1.3 missing'),W('ใช้นิยาม WP ตัดสินโครงงาน ETC','Judging ETC projects by the WP definition')],
 terms:[[W('โครงงานรวบยอด','Capstone'),W('โครงงานกลุ่มชั้นปีที่ 4 ที่แก้ปัญหางานวิศวกรรมทั่วไป','Year-4 group project on a broadly-defined problem')],['SP1–SP7',W('ลักษณะของปัญหางานวิศวกรรมทั่วไป (เอกสารผนวก 1)','Characteristics of broadly-defined problems (Appendix 1)')],['Outcome Score',W('รายงานคะแนนผลลัพธ์ของ Capstone ตาม Guideline 3.1.3','Capstone outcome score report per Guideline 3.1.3')]],
 ref:[W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.5 และเอกสารผนวก 1 ข้อ 16 และ 24','ETAC procedure rev. 3, 6.5 and Appendix 1 items 16 and 24'),W('ETAC Guideline 3.1.3 Report Outcome Score on Capstone Design Project','ETAC Guideline 3.1.3')],
 chk:[W('ปัญหางานวิศวกรรมทั่วไปต้องเข้าข้อ SP ใดเสมอ','Which SP must a broadly-defined problem always meet?'),W('Guideline 3.1.3 กำหนดให้ประเมิน PO ใดอย่างน้อย','Which POs must Guideline 3.1.3 assessment cover at least?')]}
};
for(const k in R){const m=M[k];if(!m)continue;Object.assign(m,R[k]);m.sec=R[k].sec.concat([NOTE]);m.etcRead=true;}
})();
