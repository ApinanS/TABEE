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

/* Readings of Modules 6, 8, 9, 10, 11, 12, 13 and 14 rewritten for ETC programmes (ETAC procedure revision 3,
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
  W('ศึกษาทั่วไปที่เพียงพอต่อลักษณะบัณฑิตที่พึงประสงค์ (ตัวอย่างตาราง 5.1 ระบุขั้นต่ำ 24 หน่วยกิต)','General education sufficient for the desired graduate attributes (sample Table 5.1 shows a minimum of 24 credits)'),
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
  W('ตาราง 5.1 โครงสร้างหลักสูตรและหมวดหน่วยกิต ใช้นับ 45 หน่วยกิต แถวท้ายของตัวอย่างในคู่มือระบุขั้นต่ำรวม 120 หน่วยกิต หมวดวิศวกรรมและเทคโนโลยีวิศวกรรม 45 ศึกษาทั่วไป 24 และไม่ระบุตัวเลขของคณิตศาสตร์และวิทยาศาสตร์','Table 5.1: structure and credit categories, used for the 45-credit count; the sample’s last row gives minimums of 120 credits in total, 45 engineering and technology, 24 general education, and no figure for mathematics and science'),
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
 chk:[W('ปัญหางานวิศวกรรมทั่วไปต้องเข้าข้อ SP ใดเสมอ','Which SP must a broadly-defined problem always meet?'),W('Guideline 3.1.3 กำหนดให้ประเมิน PO ใดอย่างน้อย','Which POs must Guideline 3.1.3 assessment cover at least?')]},
13:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.6 และแบบรายงานส่วนที่ 7 · ETAC Guideline 3.1.1','ETAC procedure rev. 3, 6.6 and SER part 7 · ETAC Guideline 3.1.1'),
 goal:W('ตรวจว่าอาจารย์มีจำนวน คุณวุฒิ ภาระงาน และการพัฒนาวิชาชีพ รวมถึงประสบการณ์ภาคอุตสาหกรรมที่เป็นปัจจุบัน พอให้นักศึกษา ETC ได้ความรู้และเทคโนโลยีที่ใช้จริงในวิชาชีพ','Check that faculty numbers, qualifications, workload and professional development, including current industry experience, are enough for ETC students to learn the knowledge and technology used in practice.'),
 obj:[W('อ่านตาราง 6.1.1 6.1.2 และ 6.2 รวมคอลัมน์พัฒนาวิชาชีพ','Read Tables 6.1.1, 6.1.2 and 6.2, including the professional development column'),W('ตรวจประสบการณ์ภาคอุตสาหกรรมของอาจารย์เทียบกับวิชาที่สอน (SK4–SK6)','Check faculty industry experience against what they teach (SK4–SK6)'),W('แยก W C และ R ในเรื่องอาจารย์','Tell W, C and R apart for faculty matters')],
 sec:[
 {h:W('สิ่งที่เกณฑ์ข้อ 6 ต้องการ','What criterion 6 requires'),p:W('ข้อ 6.6 ของคู่มือ ETAC กำหนดให้มีอาจารย์เพียงพอ มีคุณวุฒิและความสามารถครอบคลุมเนื้อหาวิชาการและวิชาชีพ ให้คำปรึกษาใกล้ชิด พัฒนาวิชาชีพ และมีกิจกรรมกับสมาคมวิชาชีพและองค์กรภาคอุตสาหกรรมอย่างสม่ำเสมอ สำหรับหลักสูตร ETC คำว่า "วิชาชีพ" หนักกว่าหลักสูตรวิศวกร เพราะ SK4–SK6 คือความรู้และเทคโนโลยีที่ใช้ในการปฏิบัติงานจริง','Section 6.6 of the ETAC procedure requires enough faculty with qualifications and ability covering academic and professional content, close advising, professional development, and regular activity with professional bodies and industry. For ETC, “professional” weighs more than for engineers, because SK4–SK6 are knowledge and technology used in practice.')},
 {h:W('ตารางในแบบรายงานส่วนที่ 7','Tables in SER part 7'),b:[
  W('ตาราง 6.1.1 อาจารย์ประจำ และ 6.1.2 อาจารย์พิเศษ: คุณวุฒิ สาขา ปีที่จบ และประสบการณ์ ต้องครอบคลุมวิชาแกนและวิชาปฏิบัติทั้งหมด','Tables 6.1.1 (full-time) and 6.1.2 (part-time): qualification, field, year and experience, covering all core and practical courses'),
  W('ตาราง 6.2 ภาระงาน แยกชั่วโมงต่อสัปดาห์เป็น บริหาร สอน วิจัย พัฒนาวิชาชีพ และปรึกษา','Table 6.2 workload: hours per week split into administration, teaching, research, professional development and advising'),
  W('คอลัมน์พัฒนาวิชาชีพ หมายถึง การพัฒนาการปฏิบัติงานในสายวิชาชีพหรือในภาคอุตสาหกรรม และการอบรมจากสมาคมวิชาชีพ ช่องที่ว่างหรือเป็นศูนย์ทั้งคณะคือสัญญาณให้ถาม','The professional development column means practice in the profession or in industry and training from professional bodies; a column blank or zero for everyone is a cue to ask'),
  W('เอกสารประกอบ 3 ประวัติอาจารย์: ประสบการณ์วิชาชีพ ใบอนุญาตประกอบวิชาชีพ และสมาชิกสมาคมวิชาชีพ','Supporting document 3, faculty CVs: professional experience, licences and memberships')]},
 {h:W('ประสบการณ์ภาคอุตสาหกรรมที่เป็นปัจจุบัน','Current industry experience'),p:W('คู่มือไม่ได้กำหนดจำนวนปีหรือสัดส่วนอาจารย์ที่ต้องมีประสบการณ์อุตสาหกรรม PEV จึงดูจากความสอดคล้องกับวิชาที่สอน ไม่ตั้งตัวเลขเอง','The procedure sets no number of years or share of faculty with industry experience, so judge it against what each person teaches rather than inventing a figure.'),b:[
  W('อาจารย์ที่สอนวิชาเฉพาะทางและวิชาปฏิบัติ (SK4–SK6) เคยทำงาน ฝึกงาน หรือทำโครงการร่วมกับอุตสาหกรรมในเทคโนโลยีที่สอน ในช่วงที่ยังเป็นปัจจุบัน','Faculty teaching specialist and practical courses (SK4–SK6) have worked, trained or run projects with industry in that technology recently enough to be current'),
  W('มีแผนให้อาจารย์ที่ขาดประสบการณ์ได้ฝึกในสถานประกอบการ หรือดึงผู้เชี่ยวชาญจากอุตสาหกรรมเป็นอาจารย์พิเศษ','There is a plan to place faculty lacking experience in industry, or to bring in industry experts as part-time staff'),
  W('อาจารย์นิเทศฝึกงานและสหกิจศึกษาเข้าใจงานในสถานประกอบการพอจะประเมินตัวชี้วัดได้','Internship and co-op supervisors understand the workplace well enough to assess the indicators'),
  W('สัมภาษณ์นักศึกษาและพนักงานพี่เลี้ยงว่าสิ่งที่เรียนตรงกับเครื่องมือและวิธีทำงานที่ใช้จริงหรือไม่','Ask students and mentors whether what is taught matches the tools and methods actually used')]},
 {h:W('ความพอเพียงและการพัฒนาวิชาชีพ','Adequacy and professional development'),b:[
  W('หัวข้อ 3.2: หลักสูตรต้องวิเคราะห์ความพอเพียงด้านจำนวนและคุณภาพของอาจารย์จากผลการประเมิน PO ความเห็นนักศึกษา และความเห็นผู้ใช้บัณฑิต','Item 3.2: the programme analyses faculty adequacy using PO results, student feedback and employer feedback'),
  W('หัวข้อ 3.3: อบรมอาจารย์ใหม่เรื่องการให้คำแนะนำวิชาการ วิชาชีพ และจิตวิทยานักศึกษา','Item 3.3: induction of new faculty in academic, career and student-wellbeing advising'),
  W('หัวข้อ 4.1–4.2: กิจกรรมพัฒนาวิชาชีพรายคน และระบบงบประมาณที่เป็นรูปธรรม เช่น ประชุมวิชาการ อบรม ลาเพิ่มพูนความรู้','Items 4.1–4.2: each person’s development activities and a concrete budget system: conferences, training, study leave'),
  W('การพัฒนามีสองด้าน: เทคโนโลยีในวิชาชีพ และทักษะ OBE เช่น การเขียนรูบริกและการประเมินผลลัพธ์','Development has two sides: professional technology and OBE skills such as writing rubrics and assessing outcomes')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('อาจารย์ที่สอนวิชาเฉพาะทางส่วนใหญ่ไม่มีประสบการณ์อุตสาหกรรมในเทคโนโลยีที่สอน ไม่มีแผนแก้ และผู้ใช้บัณฑิตบอกว่าบัณฑิตใช้เครื่องมือในงานจริงไม่เป็น','Most specialist teachers lack industry experience in what they teach, there is no plan, and employers say graduates cannot use real tools'),'W'],
  [W('คอลัมน์พัฒนาวิชาชีพในตาราง 6.2 เป็นศูนย์เกือบทั้งคณะ แต่มีโครงการส่งอาจารย์ฝึกในสถานประกอบการเริ่มปีนี้','The development column in Table 6.2 is nearly all zero, but a faculty industry-placement scheme starts this year'),'C'],
  [W('มีโครงการให้อาจารย์ฝึกในอุตสาหกรรมทุก 3 ปีและทำอยู่จริง แต่ SER ไม่ได้รายงานไว้','Faculty go to industry every three years and do so, but the SER does not report it'),'R']]}}],
 ev:[[W('ตาราง 6.1.1 6.1.2 6.2 และประวัติอาจารย์ (เอกสารประกอบ 3)','Tables 6.1.1, 6.1.2, 6.2 and CVs (supporting document 3)'),W('อาจารย์: “ครั้งล่าสุดที่ได้ทำงานกับอุตสาหกรรมในเรื่องที่สอนคือเมื่อไร”','Faculty: “When did you last work with industry on what you teach?”')],
  [W('แผนและงบพัฒนาวิชาชีพ รายชื่อผู้ไปฝึกในสถานประกอบการ','Development plan and budget, list of faculty placed in industry'),W('ผู้บริหาร: “สนับสนุนให้อาจารย์ได้ประสบการณ์อุตสาหกรรมอย่างไร”','Leaders: “How do you help faculty gain industry experience?”')],
  [W('ผลการวิเคราะห์ความพอเพียงของอาจารย์ (หัวข้อ 3.2)','Faculty adequacy analysis (item 3.2)'),W('พนักงานพี่เลี้ยง: “สิ่งที่นักศึกษาเรียนมาตรงกับงานที่นี่แค่ไหน”','Mentor: “How well does what students learned match the work here?”')]],
 iss:[W('อาจารย์ขาดประสบการณ์ภาคอุตสาหกรรมที่เป็นปัจจุบันในวิชาที่สอน','Faculty lack current industry experience in what they teach'),W('ภาระงานสอนสูงจนไม่มีเวลาพัฒนาวิชาชีพ','Teaching load leaves no time for professional development'),W('ไม่ใช้ผล PO และความเห็นผู้ใช้บัณฑิตวิเคราะห์อัตรากำลัง','PO results and employer feedback not used in staffing analysis'),W('พึ่งอาจารย์พิเศษจากอุตสาหกรรมโดยไม่มีการกำกับคุณภาพการสอนและการประเมิน','Reliance on industry part-timers without oversight of teaching and assessment')],
 terms:[[W('พัฒนาวิชาชีพ','Professional development'),W('การพัฒนาการปฏิบัติงานในสายวิชาชีพหรือในภาคอุตสาหกรรม และการอบรมจากสมาคมวิชาชีพ (นิยามในตาราง 6.2)','Practice in the profession or industry and training from professional bodies (Table 6.2 definition)')],['Table 6.2',W('ตารางภาระงานอาจารย์ใน SER','Faculty workload table in the SER')],[W('เอกสารประกอบ 3','Supporting document 3'),W('ประวัติ ผลงาน และประสบการณ์วิชาชีพของอาจารย์','Faculty CVs, outputs and professional experience')]],
 ref:[W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.6 และแบบรายงานส่วนที่ 7 หัวข้อ 1–5','ETAC procedure rev. 3, 6.6 and SER part 7 items 1–5'),W('ETAC Guideline 3.1.1 (ประวัติและผลงานอาจารย์) และ 3.1.4','ETAC Guidelines 3.1.1 (faculty CVs) and 3.1.4')],
 chk:[W('คอลัมน์พัฒนาวิชาชีพในตาราง 6.2 หมายถึงอะไร','What does the professional development column in Table 6.2 mean?'),W('คู่มือ ETAC กำหนดจำนวนปีประสบการณ์อุตสาหกรรมของอาจารย์ไว้หรือไม่','Does the ETAC procedure set years of industry experience for faculty?')]},

14:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.7 และแบบรายงานส่วนที่ 8 · ETAC Guideline 3.1.1','ETAC procedure rev. 3, 6.7 and SER part 8 · ETAC Guideline 3.1.1'),
 goal:W('ตรวจว่าโรงฝึกงาน ห้องปฏิบัติการ เครื่องมือ และระบบความปลอดภัย พอ ทันสมัย ใช้งานได้จริง และปลอดภัย จนนักศึกษา ETC ฝึกทักษะการปฏิบัติงานได้','Check that workshops, labs, equipment and safety systems are sufficient, current, usable and safe enough for ETC students to build practical skills.'),
 obj:[W('ตรวจว่าเครื่องมือในโรงฝึกงานใกล้เคียงที่ใช้ในอุตสาหกรรมและเชื่อมกับรายวิชาและ PO','Check workshop equipment is close to industry practice and linked to courses and POs'),W('ตรวจระบบความปลอดภัยระหว่างคาบเรียนจริง และบันทึกซ่อมบำรุงย้อนหลัง 2 ปี','Check safety during real classes and two years of maintenance records'),W('ตัดสินระดับเมื่อพบความเสี่ยงต่อชีวิตหรือสุขภาพ','Decide the level when a life or health risk is found')],
 sec:[
 {h:W('สิ่งที่เกณฑ์ข้อ 7 ต้องการ','What criterion 7 requires'),p:W('ข้อ 6.7 กำหนดให้มีห้องเรียน ห้องปฏิบัติการ ห้องสมุด ห้องคอมพิวเตอร์ และครุภัณฑ์ที่เพียงพอและเหมาะสม และให้นักศึกษาได้เรียนรู้และใช้เครื่องมือและอุปกรณ์ในงานวิชาชีพที่ทันสมัย หลักสูตร ETC พึ่งโรงฝึกงานมากกว่าหลักสูตรวิศวกร เพราะ PO5 และ SK6 คือการใช้เครื่องมือและเทคโนโลยีในการปฏิบัติงาน','Section 6.7 requires sufficient, suitable classrooms, labs, library, computer rooms and equipment, and that students learn and use current professional tools. ETC programmes rely on workshops more than engineering ones, because PO5 and SK6 are about using tools and technology in practice.'),b:[
  W('เครื่องมือหลักใกล้เคียงกับที่ใช้ในอุตสาหกรรมปัจจุบัน และมีจำนวนพอให้นักศึกษาลงมือเอง ไม่ใช่ดูสาธิต','Main equipment is close to current industry practice and enough for students to work hands-on, not watch demonstrations'),
  W('รายการครุภัณฑ์ (เอกสารประกอบ 4) บอกว่าเครื่องใดใช้ในวิชาใดและสนับสนุน PO ใด','The equipment list (supporting document 4) shows which course and PO each item supports'),
  W('ซอฟต์แวร์มีลิขสิทธิ์พอกับจำนวนผู้ใช้ในช่วงที่ใช้หนัก เช่น ช่วงทำโครงงาน','Software licences cover peak use, such as capstone time')]},
 {h:W('ความปลอดภัยในโรงฝึกงาน','Workshop safety'),p:W('แบบรายงานหัวข้อ 1.3 ให้วิเคราะห์ความพอเพียงโดยเน้นอุปกรณ์ความปลอดภัย และชี้แจงมาตรการที่ใช้ระหว่างการเรียนการสอน ถ้าพบความเสี่ยงต่อชีวิตหรือสุขภาพที่ไม่มีการจัดการ ให้เป็น W หรือ D ทันที ไม่มีการผ่อนปรน','SER item 1.3 asks for adequacy analysis focused on safety equipment and the measures used during teaching. An unmanaged risk to life or health is W or D at once, with no allowance.'),b:[
  W('ดูระหว่างคาบเรียนจริง ไม่ใช่โรงฝึกงานที่จัดไว้สำหรับวันตรวจ','Observe during a real class, not a workshop staged for the visit'),
  W('การ์ดป้องกันเครื่องจักร ปุ่มหยุดฉุกเฉิน และอุปกรณ์ป้องกันส่วนบุคคลใช้งานได้และถูกใช้จริง','Machine guards, emergency stops and PPE work and are actually used'),
  W('อบรมความปลอดภัยก่อนใช้เครื่อง คู่มือการใช้เครื่องอยู่ที่เครื่อง และมีผู้ควบคุมระหว่างใช้งาน','Safety training before use, operating instructions at the machine, and supervision during use'),
  W('บันทึกอุบัติเหตุและการแก้ไขหลังเกิดเหตุ ถ้าเกิดซ้ำโดยไม่มีการแก้ไขคือสัญญาณร้ายแรง','Accident records and corrective actions; repeats with no correction are a serious signal'),
  W('ถามนักศึกษาตรง ๆ ว่าถ้าเกิดเหตุต้องทำอะไรและไปทางไหน','Ask students directly what to do and where to go in an emergency')]},
 {h:W('ซ่อมบำรุง คู่มือ และหลักฐาน 2 ปี','Maintenance, guides and two years of evidence'),b:[
  W('Guideline 3.1.1 ขอคู่มือการใช้อุปกรณ์ บันทึกการซ่อมบำรุงและการใช้งานครุภัณฑ์ และผลสำรวจความพึงพอใจต่อสิ่งอำนวยความสะดวก ย้อนหลังอย่างน้อย 2 ปี','Guideline 3.1.1 asks for equipment guides, maintenance and usage logs, and facility satisfaction surveys covering at least two years'),
  W('หัวข้อ 4: นโยบายและกระบวนงานซ่อมบำรุงและยกระดับเครื่องมือ บันทึกที่เพิ่งเริ่มไม่ถึง 2 ปีคือหลักฐานไม่ครบ','Item 4: policy and process for maintaining and upgrading equipment; logs started less than two years ago are incomplete evidence'),
  W('หัวข้อ 3: นักศึกษาได้รับคำแนะนำหรือคู่มือการใช้เครื่องมือในห้องปฏิบัติการ','Item 3: students receive guidance or manuals for lab equipment'),
  W('ห้องสมุดและระบบ IT: เวลาให้บริการ การเข้าถึงฐานข้อมูล และความพอเพียงต่อการเรียนรู้','Library and IT: opening hours, database access and adequacy for learning')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('เครื่องกลึงหลายเครื่องไม่มีการ์ดป้องกัน นักศึกษาไม่ใส่แว่นนิรภัยระหว่างคาบ และเกิดอุบัติเหตุ 2 ครั้งโดยไม่มีบันทึกการแก้ไข','Several lathes lack guards, students wear no safety glasses in class, and two accidents have no corrective record'),'D'],
  [W('บันทึกซ่อมบำรุงเพิ่งเริ่มได้ 1 ปี เครื่องหลักใช้งานได้และปลอดภัย','Maintenance logs began a year ago; main machines work and are safe'),'C'],
  [W('เครื่อง CNC มี 2 เครื่องสำหรับนักศึกษา 60 คน ทำให้ส่วนใหญ่ได้แค่ดูสาธิต','Two CNC machines for 60 students, so most only watch demonstrations'),'W'],
  [W('ห้องสมุดปิดเร็วในช่วงสอบ แต่มีฐานข้อมูลออนไลน์ใช้ได้ตลอด','The library closes early at exam time but online databases are always available'),'R']]}}],
 ev:[[W('รายการครุภัณฑ์ที่เชื่อมกับรายวิชาและ PO (เอกสารประกอบ 4)','Equipment list linked to courses and POs (supporting document 4)'),W('นักศึกษา: “เครื่องนี้ได้ใช้เองกี่ชั่วโมงในวิชานี้”','Students: “How many hours did you use this machine yourself?”')],
  [W('บันทึกซ่อมบำรุง บันทึกอุบัติเหตุ และการตรวจเครื่องจักร 2 ปี','Two years of maintenance, accident and machine-inspection records'),W('นายช่างเทคนิค: “ตรวจการ์ดและปุ่มหยุดฉุกเฉินบ่อยแค่ไหน ใครเซ็นรับรอง”','Technician: “How often are guards and e-stops checked, and who signs off?”')],
  [W('คู่มือความปลอดภัยและบันทึกการอบรมก่อนใช้เครื่อง','Safety manual and pre-use training records'),W('สังเกตระหว่างคาบ: อุปกรณ์ป้องกัน ทางหนีไฟ และผู้ควบคุม','Observe in class: PPE, exits and supervision')],
  [W('ผลสำรวจความพึงพอใจต่อสิ่งอำนวยความสะดวก 2 ปี','Two years of facility satisfaction surveys'),W('ผู้บริหาร: “ผลสำรวจนำไปจัดงบอย่างไร”','Leaders: “How do survey results drive the budget?”')]],
 iss:[W('ความปลอดภัยในโรงฝึกงานไม่ถูกปฏิบัติระหว่างคาบเรียน','Workshop safety not practised during classes'),W('เครื่องมือล้าสมัยหรือไม่พอให้นักศึกษาลงมือเอง','Equipment outdated or too few for hands-on work'),W('บันทึกซ่อมบำรุงไม่ถึง 2 ปี','Maintenance records under two years'),W('อุบัติเหตุซ้ำโดยไม่มีการแก้ไข','Repeat accidents with no correction')],
 terms:[[W('เอกสารประกอบ 4','Supporting document 4'),W('รายการครุภัณฑ์และอุปกรณ์ห้องปฏิบัติการพร้อมคำอธิบาย','List of lab equipment with descriptions')],[W('Safety Line','Safety line'),W('ความเสี่ยงต่อชีวิตหรือสุขภาพที่ไม่มีการจัดการ ทำให้เป็น W หรือ D ทันที','An unmanaged risk to life or health, which makes the finding W or D at once')],[W('ลงมือเอง','Hands-on'),W('นักศึกษาใช้เครื่องเองตามชั่วโมงที่วิชากำหนด','Students operate the machine for the hours the course sets')]],
 ref:[W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.7 และแบบรายงานส่วนที่ 8 หัวข้อ 1–6','ETAC procedure rev. 3, 6.7 and SER part 8 items 1–6'),W('ETAC Guideline 3.1.1 (คู่มือ บันทึกซ่อมบำรุง และผลสำรวจ ย้อนหลัง 2 ปี)','ETAC Guideline 3.1.1 (guides, maintenance logs, surveys, two years)')],
 chk:[W('Guideline 3.1.1 ขอหลักฐานด้านสิ่งอำนวยความสะดวกย้อนหลังกี่ปี','How many years of facility evidence does Guideline 3.1.1 ask for?'),W('พบเครื่องจักรไม่มีการ์ดป้องกันและเกิดอุบัติเหตุซ้ำโดยไม่แก้ไข ควรเป็นระดับใด','Unguarded machines and repeat accidents with no fix: which level?')]}
,
6:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.1 และแบบรายงานส่วนที่ 2 · ETAC Guideline 3.1.1','ETAC procedure rev. 3, 6.1 and SER part 2 · ETAC Guideline 3.1.1'),
 goal:W('ตรวจว่าระบบดูแลนักศึกษา ETC ทำงานจริงตลอดวงจร ตั้งแต่รับเข้า ปรับฐาน เทียบโอนจากสถาบันอื่นและแผนต่อเนื่อง จนถึงอนุมัติจบและใบระเบียน','Check that the ETC student system really works across the cycle: admission, bridging, transfer from other institutions and continuing plans, through to graduation and transcripts.'),
 obj:[W('ใช้หัวข้อ 1–7 ของแบบรายงานส่วนที่ 2 เป็น Checklist','Use SER part 2 items 1–7 as a checklist'),W('ตรวจการเทียบโอนของนักศึกษาแผนต่อเนื่องและจากสถาบันอื่นว่ามีหลักฐานผลลัพธ์เทียบเท่า','Check transfers for continuing-plan and external students have evidence of equivalent outcomes'),W('วิเคราะห์ใบระเบียนผลการศึกษาและแยก W C R','Analyse transcripts and tell W, C and R apart')],
 sec:[
 {h:W('สิ่งที่เกณฑ์ข้อ 1 ต้องการ','What criterion 1 requires'),p:W('ข้อ 6.1 ของคู่มือ ETAC ให้สถาบันแสดงกระบวนการประเมินผลการเรียนรู้ การให้คำแนะนำด้านการศึกษาและวิชาชีพวิศวกรรมและเทคโนโลยีวิศวกรรม และการติดตามให้นักศึกษามีผลลัพธ์ตามวัตถุประสงค์หลักสูตร พร้อมหลักเกณฑ์รับเข้าที่ชัดเจน การปรับฐานเมื่อจำเป็น และหลักเกณฑ์เทียบย้ายโอนหน่วยกิตจากสถาบันอื่น','Section 6.1 asks for processes to assess learning, advise on study and on engineering and engineering technology practice, and follow students to the programme’s outcomes, with clear admission rules, bridging where needed and rules for transferring credit from other institutions.')},
 {h:W('Checklist ตามแบบรายงานส่วนที่ 2','Checklist from SER part 2'),tbl:{cols:[W('หัวข้อ','Item'),W('สิ่งที่ PEV ดู','What the PEV looks at')],rows:[
  [W('1 การคัดเลือกและรับเข้า','1 Admission'),W('จำนวนรับและแผนรับแยกตามวิธีคัดเลือก อย่างน้อย 4 ปีการศึกษา วิเคราะห์ผลการเรียนตามช่องทางรับ และระบบปรับฐานถ้ารับนักศึกษาที่ยังไม่พร้อม','Intake and plans by route for at least four years, results analysed by route, and bridging if under-prepared students are admitted')],
  [W('2 การประเมินผลการเรียนรู้','2 Assessing learning'),W('จำนวนผู้สำเร็จการศึกษาอย่างน้อย 2 ปี และระบบตรวจวิชาบังคับก่อน พร้อมเอกสารตัวอย่าง','Graduates for at least two years, and the prerequisite check with sample documents')],
  [W('3 เทียบย้ายโอนจากสถาบันอื่น','3 Transfer from other institutions'),W('ประกาศหลักเกณฑ์และตัวอย่างผลการพิจารณาเทียบโอน','Published rules and sample transfer decisions')],
  [W('4 การให้คำปรึกษา','4 Advising'),W('ตารางนัด แฟ้มบันทึก การแจ้งเตือนนักศึกษาที่มีปัญหาการเรียน และการช่วยเหลือด้านทุน','Appointment schedules, advising files, alerts to struggling students and financial support')],
  [W('5 การศึกษาร่วมสถาบันและการฝึกในองค์กรอื่น','5 Joint study and placements'),W('การคิดหน่วยกิตของการฝึกงานในองค์กรหรือการแลกเปลี่ยน','How credit is counted for placements in organisations or exchanges')],
  [W('6 อนุมัติจบ','6 Graduation'),W('ตัวอย่างเอกสารอนุมัติจบและการตรวจสอบของผู้รับผิดชอบ','Sample graduation approvals and who checks them')],
  [W('7 ใบระเบียน','7 Transcripts'),W('ตัวอย่างทุกสาขาและแขนง ส่งแยกจากเล่มโดยไม่ระบุชื่อ พร้อมคำอธิบายการอ่าน','Samples for every major and track, sent separately and anonymised, with a reading guide')]]}},
 {h:W('แผนต่อเนื่องและการเทียบโอน','Continuing plans and transfers'),p:W('หลักสูตร ETC จำนวนมากมีแผนต่อเนื่องที่รับผู้จบ ปวส. และเทียบโอนรายวิชาจำนวนมาก คู่มือให้ตรวจผ่านหัวข้อ 3 (เทียบโอนจากสถาบันอื่น) PEV ดูว่าการเทียบโอนพานักศึกษากลุ่มนี้ไปถึง PO ครบเท่ากับแผนปกติ','Many ETC programmes run continuing plans for vocational-diploma holders, with large credit transfers. The procedure checks these under item 3; the PEV checks that transfers bring these students to all POs as fully as the regular plan.'),b:[
  W('มีตารางเทียบรายวิชาที่เทียบเนื้อหาและหน่วยกิต ไม่ใช่เทียบแค่ชื่อวิชา','A course-equivalence table comparing content and credits, not just titles'),
  W('รายวิชาปฏิบัติที่เทียบโอนมีหลักฐานว่านักศึกษาทำได้จริง เช่น ผลทดสอบสมรรถนะหรือผลงาน ไม่ใช่ดูเกรดอย่างเดียว','Transferred practical courses have evidence of competence, such as tests or work samples, not grades alone'),
  W('ผลการเรียนและผล PO ของนักศึกษาแผนต่อเนื่องถูกวิเคราะห์แยก (เชื่อมกับหัวข้อ 1.3 และเกณฑ์ข้อ 4)','Results and PO attainment of continuing-plan students are analysed separately (links to item 1.3 and criterion 4)'),
  W('หน่วยกิตที่เหลือเรียนยังครบ 45 หน่วยกิตของหมวดวิศวกรรมและเทคโนโลยีวิศวกรรมเมื่อรวมกับที่เทียบโอน (Module 11)','Remaining plus transferred credits still meet the 45 engineering and technology credits (Module 11)')]},
 {h:W('วิเคราะห์ใบระเบียน','Analysing transcripts'),b:[
  W('ชื่อหลักสูตรบนใบระเบียนตรงกับหลักสูตรที่ขอรับรอง และแยกแผนปกติกับแผนต่อเนื่องได้','The programme name matches the one under review, and regular and continuing plans can be told apart'),
  W('รายวิชาที่นับตรงกับโครงสร้างที่ประกาศของรุ่นนั้น วิชาบังคับก่อนเรียนก่อนจริง','Counted courses match that cohort’s published structure; prerequisites were taken first'),
  W('รายวิชาเทียบโอนแสดงบนใบระเบียนพร้อมเอกสารการพิจารณา','Transferred courses appear on the transcript with the decision records'),
  W('มีการฝึกงาน 210 ชั่วโมงหรือสหกิจศึกษาบนใบระเบียน และโครงงานรวบยอด','The 210-hour training or co-op and the capstone appear on the transcript'),
  W('สุ่มทั้งผู้ได้เกรดสูงและต่ำ และขอคำชี้แจงจากหลักสูตรให้เร็ว','Sample high and low achievers, and ask the programme early')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('นักศึกษาแผนต่อเนื่องเทียบโอนวิชาปฏิบัติ 37–38 หน่วยกิตจากเกรดอย่างเดียว ไม่มีผลทดสอบ และหลักสูตรไม่แยกวิเคราะห์ผลลัพธ์ของกลุ่มนี้','Continuing-plan students transfer 37–38 practical credits on grades alone, no tests, and their outcomes are not analysed separately'),'W'],
  [W('วิเคราะห์ผลการเรียนแยกตามช่องทางรับแล้ว พบกลุ่มหนึ่งตกสูง แต่ยังไม่ได้ปรับเกณฑ์รับหรือจัดปรับฐาน','Results analysed by admission route show high failure in one group, but no admission or bridging change yet'),'C'],
  [W('บันทึกการให้คำปรึกษาเป็นสมุดกระดาษ ค้นยาก แต่ครบ','Advising records are complete but on paper and hard to search'),'R']]}}],
 ev:[[W('ประกาศรับเข้า สถิติรับ คงอยู่ และพ้นสภาพแยกช่องทาง 4 ปี','Admission notices and intake, retention and dropout by route for four years'),W('ผู้บริหารหลักสูตร: “ข้อมูลนี้ทำให้ปรับเกณฑ์รับหรือการปรับฐานอย่างไร”','Leaders: “What did this data change in admission or bridging?”')],
  [W('ตารางเทียบโอนและผลการพิจารณาของนักศึกษาแผนต่อเนื่อง','Equivalence tables and decisions for continuing-plan students'),W('นักศึกษาแผนต่อเนื่อง: “วิชาที่เทียบโอน เคยทำงานอะไรมาบ้าง และมีการทดสอบไหม”','Continuing students: “What did the transferred courses involve, and were you tested?”')],
  [W('แฟ้มบันทึกการให้คำปรึกษาและการแจ้งเตือนนักศึกษา','Advising files and alerts to students'),W('อาจารย์ที่ปรึกษา: “รู้ได้อย่างไรว่านักศึกษามีปัญหา”','Adviser: “How do you know a student is struggling?”')],
  [W('เอกสารอนุมัติจบและใบระเบียนที่สุ่ม','Graduation approvals and sampled transcripts'),W('เจ้าหน้าที่ทะเบียน: “ระบบตรวจวิชาบังคับก่อนและชั่วโมงฝึกงานอย่างไร”','Registrar: “How does the system check prerequisites and training hours?”')]],
 iss:[W('เทียบโอนวิชาปฏิบัติจากเกรดโดยไม่มีหลักฐานสมรรถนะ','Practical courses transferred on grades without competence evidence'),W('มีข้อมูลรับเข้าแต่ไม่ได้วิเคราะห์ตามช่องทาง','Admission data collected but not analysed by route'),W('ใบระเบียนแยกแผนปกติกับแผนต่อเนื่องไม่ได้','Transcripts do not distinguish regular and continuing plans'),W('การให้คำปรึกษาไม่ครอบคลุมด้านวิชาชีพ','Advising does not cover professional matters')],
 terms:[[W('แผนต่อเนื่อง','Continuing plan'),W('แผนการศึกษาสำหรับผู้จบ ปวส. หรือเทียบเท่า ที่เทียบโอนรายวิชาแล้วเรียนต่อ','Study plan for vocational-diploma holders who transfer credit and continue')],[W('ปรับฐาน','Bridging'),W('การเสริมความรู้ก่อนหรือระหว่างเรียนเมื่อนักศึกษายังไม่พร้อม','Extra preparation before or during study for under-prepared students')],['Degree audit',W('การตรวจว่าเรียนครบตามหลักสูตรก่อนอนุมัติจบ','Check that all requirements are met before graduation')]],
 ref:[W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.1 และแบบรายงานส่วนที่ 2 หัวข้อ 1–7','ETAC procedure rev. 3, 6.1 and SER part 2 items 1–7'),W('ETAC Guideline 3.1.1 (เกณฑ์ข้อ 1)','ETAC Guideline 3.1.1 (criterion 1)')],
 chk:[W('แบบรายงานขอข้อมูลรับเข้าย้อนหลังกี่ปี','How many years of admission data does the SER ask for?'),W('การเทียบโอนวิชาปฏิบัติจากเกรดอย่างเดียวมีปัญหาอย่างไร','What is wrong with transferring practical courses on grades alone?')]},

10:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.4 และแบบรายงานส่วนที่ 5 · ETAC Guideline 3.1.1–3.1.3','ETAC procedure rev. 3, 6.4 and SER part 5 · ETAC Guidelines 3.1.1–3.1.3'),
 goal:W('ตรวจว่าเกณฑ์ข้อ 4 ของหลักสูตร ETC ทำงานจริง: ประเมิน PO ครบตามจำนวนวิธีที่ ETAC กำหนด แยกรายปี ตรวจย้อนได้ และนำผลไปปรับปรุงจนปิดวงจร','Check that an ETC programme’s criterion 4 works: every PO assessed with the number of methods ETAC requires, year by year, traceable, and used to improve until the loop closes.'),
 obj:[W('ใช้ข้อกำหนดจำนวนวิธีประเมินทางตรงและทางอ้อมต่อ PO ของแบบรายงานส่วนที่ 5','Apply SER part 5 rules on the number of direct and indirect methods per PO'),W('ใช้รายงาน Outcome Score (3.1.3) และผลตาม SK (3.1.2) เป็นหลักฐาน','Use the Outcome Score report (3.1.3) and SK-based results (3.1.2) as evidence'),W('ตรวจกระบวนการปรับปรุงทั้งระดับรายวิชาและระดับหลักสูตร','Check improvement at course and programme level')],
 sec:[
 {h:W('สิ่งที่เกณฑ์ข้อ 4 ต้องการ','What criterion 4 requires'),p:W('ข้อ 6.4 ให้หลักสูตรบันทึก ติดตาม และประเมินระดับความสำเร็จของผลลัพธ์ แล้วนำรายงานไปใช้อย่างเป็นระบบเพื่อพัฒนาต่อเนื่อง แบบรายงานส่วนที่ 5 แบ่งเป็น 1 การประเมินผลลัพธ์ และ 2 กระบวนงานและผลการพัฒนาต่อเนื่อง','Section 6.4 asks the programme to record, track and evaluate outcome attainment and use the reports systematically to improve. SER part 5 has two parts: assessing outcomes, and the improvement process and its results.')},
 {h:W('จำนวนวิธีประเมินต่อ PO','Assessment methods per PO'),p:W('แบบรายงานหัวข้อ 1.2 กำหนดให้แต่ละ PO มีการประเมินไม่น้อยกว่า 3 วิธี ทั้งทางตรงและทางอ้อม','SER item 1.2 requires at least three assessments per PO, both direct and indirect.'),
  tbl:{cols:[W('PO','PO'),W('ขั้นต่ำ','Minimum')],rows:[
  [W('PO1–PO3','PO1–PO3'),W('ทางตรงอย่างน้อย 2 วิธี และทางอ้อมอย่างน้อย 1 วิธี','At least 2 direct and 1 indirect')],
  [W('PO4–PO11','PO4–PO11'),W('ทางตรงอย่างน้อย 1 วิธีและทางอ้อมอย่างน้อย 2 วิธี หรือทางตรงอย่างน้อย 2 วิธีและทางอ้อมอย่างน้อย 1 วิธี','At least 1 direct and 2 indirect, or 2 direct and 1 indirect')]]}},
 {h:W('ผลการประเมินที่ตรวจย้อนได้','Traceable results'),b:[
  W('ระดับความสำเร็จที่คาดหวังของแต่ละ PO กำหนดไว้ก่อน และแสดงผลเทียบเป้า','Expected attainment for each PO is set in advance and results are shown against it'),
  W('ผลอย่างน้อย 2 ปีการศึกษาต่อเนื่อง แยกรายปี ไม่เฉลี่ยรวม','At least two consecutive years, shown per year, not averaged'),
  W('ตรวจย้อนได้ถึงที่มา ผ่าน Embedded Question แนบ SER หรือ Course Portfolio (หัวข้อ 1.7)','Results trace back to their source through embedded questions attached to the SER or the course portfolio (item 1.7)'),
  W('หลักฐานที่ Guideline 3.1.1 ขอ: รายงานผลลัพธ์และแนวทางแก้ไข Course Portfolio ทุกวิชา รายงาน Capstone Student Portfolio รายงานการประเมินทางอ้อม ความเห็นผู้มีส่วนได้ส่วนเสียต่อ Capstone และรายงานการประชุมพิจารณาผล','Guideline 3.1.1 evidence: outcome reports and actions, all course portfolios, the capstone report, student portfolios, indirect assessment reports, stakeholder views on the capstone, and meeting minutes on the results'),
  W('สำหรับ ETC: รายงาน Outcome Score (Guideline 3.1.3) และตาราง PO–SK (Guideline 3.1.2) เป็นหลักฐานทางตรงหลัก ผลฝึกงานหรือสหกิจใช้ได้เมื่อมีรูบริกของหลักสูตรผูกกับตัวชี้วัด','For ETC: the Outcome Score report (3.1.3) and PO–SK table (3.1.2) are the main direct evidence; internship or co-op results count only with a programme rubric tied to indicators')]},
 {h:W('ปิดวงจร','Closing the loop'),b:[
  W('หัวข้อ 2.1: ผลของ PO ทั้ง 11 ข้อทุกปีถูกนำไปใช้อย่างเป็นระบบ','Item 2.1: results for all 11 POs each year are used systematically'),
  W('หัวข้อ 2.2: กรรมการบริหารหลักสูตรนำผลไปพัฒนาทั้งระดับรายวิชาและระดับหลักสูตร และมีการแจ้งกลับไปยังรายวิชา','Item 2.2: the programme committee acts at course and programme level and feeds back to courses'),
  W('หัวข้อ 2.3: ผลของการปรับปรุงที่ทำแล้ว และแผนในอนาคต รวมการแจ้งผล PO ต่อผู้มีส่วนได้ส่วนเสีย (นักศึกษาและ IAC) เพื่อทบทวน PEO','Item 2.3: results of past changes and future plans, including sharing PO results with stakeholders (students and IAC) to review PEOs'),
  W('ผลต่ำกว่าเป้าไม่ใช่ประเด็นในตัวเอง แต่ต้องมีแนวทางแก้ที่ทำจริงและติดตามผล','Results below target are not a finding in themselves, but there must be real action and follow-up')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('PO6 PO7 และ PO10 วัดด้วยผล S/U ของสหกิจศึกษาเพียงวิธีเดียวซึ่งได้ร้อยละ 100 ทุกปี และสรุปว่าไม่ต้องปรับปรุง','PO6, PO7 and PO10 measured only by co-op S/U, 100% every year, concluding nothing needs improving'),'W'],
  [W('PO2 มีการประเมินทางตรงวิธีเดียวและทางอ้อมวิธีเดียว','PO2 has one direct and one indirect method'),'C'],
  [W('รายงาน Outcome Score ไม่มี PO8 แต่ PO8 ประเมินครบในรายวิชาอื่น','The Outcome Score report lacks PO8, but PO8 is fully assessed elsewhere'),'R']]}}],
 ev:[[W('ตารางผล PO แยกรายปี 2 ปี พร้อมจำนวนวิธีทางตรงและทางอ้อมต่อ PO','PO results per year for two years, with the number of direct and indirect methods per PO'),W('“PO นี้วัดทางตรงด้วยอะไรบ้าง”','“Which direct methods measure this PO?”')],
  [W('Course Portfolio และ Embedded Question ที่ผลอ้างถึง','Course portfolios and embedded questions the results cite'),W('สุ่มดูว่าข้อสอบหรือใบงานวัด PI และ SK ที่อ้างจริง','Sample whether the exam or job sheet measures the claimed PI and SK')],
  [W('รายงานการประชุมกรรมการบริหารหลักสูตรและ IAC','Programme committee and IAC minutes'),W('“ผล PO ปีที่แล้วทำให้เปลี่ยนอะไร และรู้ได้อย่างไรว่าได้ผล”','“What did last year’s PO results change, and how do you know it worked?”')]],
 iss:[W('PO บางข้อมีวิธีประเมินไม่ครบตามขั้นต่ำ','Some POs below the minimum number of methods'),W('ใช้ผล S/U หรือเกรดเป็นหลักฐานทางตรง','S/U or grades used as direct evidence'),W('เฉลี่ยรวมหลายปีหรือข้อมูลไม่ครบ 2 ปี','Years averaged, or under two years of data'),W('มีตารางปิดวงจรแต่ไม่มีมติหรือหลักฐานการทำจริง','A closing-the-loop table with no decisions or evidence of action')],
 terms:[[W('การประเมินทางตรง','Direct assessment'),W('วัดจากงานของนักศึกษา เช่น ข้อสอบ ใบงาน รายงาน ด้วยรูบริก','Measured from student work, such as exams, job sheets and reports, with rubrics')],[W('การประเมินทางอ้อม','Indirect assessment'),W('แบบสำรวจนักศึกษา ศิษย์เก่า หรือผู้ใช้บัณฑิต','Surveys of students, alumni or employers')],['Embedded Question',W('ข้อสอบหรือโจทย์เฉพาะข้อที่ใช้วัด PI แนบไว้กับ SER','A specific exam item or task used to measure a PI, attached to the SER')]],
 ref:[W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.4 และแบบรายงานส่วนที่ 5 หัวข้อ 1–3','ETAC procedure rev. 3, 6.4 and SER part 5 items 1–3'),W('ETAC Guideline 3.1.1 3.1.2 และ 3.1.3','ETAC Guidelines 3.1.1, 3.1.2 and 3.1.3')],
 chk:[W('PO1–PO3 ต้องมีการประเมินทางตรงอย่างน้อยกี่วิธี','How many direct methods must PO1–PO3 have at least?'),W('ผลประเมินต้องตรวจย้อนได้ผ่านอะไร','How must results be traceable?')]}
};
for(const k in R){const m=M[k];if(!m)continue;Object.assign(m,R[k]);m.sec=R[k].sec.concat([NOTE]);m.etcRead=true;}
})();

/* Readings of Modules 0–5, 7, 15, 16 and 17 rewritten for ETC programmes (ETAC procedure revision 3,
   13 June 2569, sections 2–11 and the SER template; Guidelines 3.1.1–3.1.4). Same pattern as the block
   above: replaces the TABEE reading, keeps videos and slides, last section says to follow this reading.
   Module 16 keeps TABEE's interview technique sections, the session cards (act) and the question bank. */
(function(){
const M=window.TR_MOD;if(!M)return;
const W=(t,e)=>[t,e];
const NOTE={h:W('ฉบับ ETC','ETC edition'),p:W('บทอ่านโมดูลนี้เขียนใหม่ตามคู่มือ ETAC ปรับปรุงครั้งที่ 3 และ ETAC Guideline 3.1.1–3.1.4 แล้ว วิดีโอและสไลด์ของโมดูลยังเป็นของ TABEE ระดับวิศวกร ถ้าเนื้อหาขัดกันให้ยึดบทอ่านนี้','This reading has been rewritten for the ETAC procedure (revision 3) and ETAC Guidelines 3.1.1–3.1.4. The module’s videos and slides are still TABEE’s engineer-level material; where they differ, follow this reading.'),etc:true};
const PROC=W('คู่มือขั้นตอนและวิธีการรับรองฯ หลักสูตรทางเทคโนโลยีวิศวกรรม ปรับปรุงครั้งที่ 3 (13 มิ.ย. 2569)','ETAC accreditation procedure, revision 3 (13 June 2569)');
const LV={cols:[W('ระดับ','Level'),W('ความหมายตามคู่มือ ETAC','Meaning in the ETAC procedure')],rows:[
 ['D',W('ข้อบกพร่อง: หลักฐานและการจัดการไม่เป็นไปตามข้อกำหนดของเกณฑ์ และไม่ผ่านการตรวจประเมิน หลักสูตรต้องชี้แจง แก้ไข และแสดงหลักฐาน','Deficiency: evidence and management do not meet the criterion; the item fails and the programme must explain, fix and show evidence')],
 ['W',W('ข้อด้อย: ยังคลาดเคลื่อนจากข้อกำหนดบางส่วน และกระทบความสำเร็จของผลลัพธ์การศึกษา หลักสูตรต้องชี้แจงและแก้ไข','Weakness: partly out of line with the criterion and affecting outcome attainment; the programme must explain and fix')],
 ['C',W('ข้อวิตกกังวล: ขณะตรวจเป็นไปตามข้อกำหนด แต่มีการจัดการบางส่วนที่อาจกระทบผลลัพธ์ และอาจกลายเป็นข้อด้อยได้','Concern: meets the criterion now, but some practice may affect outcomes and could become a weakness')],
 ['R',W('ข้อสังเกต: ผู้ตรวจอยากให้หลักสูตรพิจารณา ไม่กระทบการผ่านเกณฑ์','Remark: something for the programme to consider; does not affect compliance')],
 ['S',W('มีคำอธิบายพอเพียง: ประเด็นที่ถามแล้วได้คำชี้แจงและหลักฐานจนผ่านเกณฑ์','Resolved: the question raised was answered with evidence and now meets the criterion')]]};
const R={
0:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 4.4 · Module 18','ETAC procedure rev. 3, 4.4 · Module 18'),
 goal:W('รู้ว่าการอบรม PEV สำหรับหลักสูตรทางเทคโนโลยีวิศวกรรม (ETC) ประกอบด้วยอะไร ต้องเรียนอะไรก่อน และผู้ตรวจ ETC ต้องมีคุณสมบัติอย่างไร','Know what ETC evaluator training contains, what to study first and what an ETC evaluator must be.'),
 obj:[W('อธิบายโครงสร้างการอบรม: เรียนออนไลน์ ฝึกวิเคราะห์ และ Onsite','Describe the structure: online study, analysis practice and on-site'),W('บอกคุณสมบัติของผู้ตรวจประเมินตามคู่มือ ETAC ข้อ 4.4.2','State the evaluator qualifications in ETAC 4.4.2'),W('อ่านบทอ่านแบบผู้ตรวจ ETC คือมองหาหลักฐานระดับปัญหางานวิศวกรรมทั่วไป','Read as an ETC evaluator: look for evidence at the broadly-defined level')],
 sec:[
 {h:W('การอบรมมีสามส่วน','Three parts'),b:[
  W('เรียนออนไลน์: Module 18 (เกณฑ์ ETAC และ Sydney Accord) ก่อน แล้ว Module 0–17 ผ่านแบบทดสอบทุกโมดูล','Online: Module 18 (ETAC criteria and the Sydney Accord) first, then Modules 0–17, passing every quiz'),
  W('ฝึกวิเคราะห์: ใบระเบียน 5 ฉบับ การประเมินผลการตรวจ 10 สถานการณ์ และชุดฝึก SER จำลอง (IET และหลักสูตรฝึกเพิ่ม 4 หลักสูตร)','Analysis practice: five transcripts, ten finding scenarios and the mock SER lab (IET plus four extra programmes)'),
  W('Onsite 2 วัน: ตรวจเยี่ยมจำลองหลักสูตร IET ด้วย PEV Studio ฉบับ ETC ตั้งแต่ Pre-visit 1 ถึง Decision Meeting จำลอง','Two on-site days: a mock visit of the IET programme in PEV Studio ETC, from Pre-visit 1 to a mock Decision Meeting')]},
 {h:W('ทำไมต้องมีการอบรมแยกสำหรับ ETC','Why separate ETC training'),p:W('หลักสูตรทางเทคโนโลยีวิศวกรรมผลิตบัณฑิตตาม Sydney Accord ซึ่งแก้ปัญหางานวิศวกรรมทั่วไป (SP1–SP7) ด้วยเทคโนโลยีที่พัฒนาแล้ว ไม่ใช่ปัญหาที่ซับซ้อนระดับวิศวกร (Washington Accord) ผู้ตรวจที่คุ้นกับหลักสูตรวิศวกรมักตั้งเกณฑ์สูงเกินจริงหรือมองข้ามสิ่งที่ ETC ต้องมี เช่น การฝึกงาน 210 ชั่วโมง โรงฝึกงาน และประสบการณ์ภาคอุตสาหกรรมของอาจารย์','ET programmes produce Sydney Accord graduates who solve broadly-defined problems (SP1–SP7) with established technology, not engineer-level complex problems (Washington Accord). Evaluators used to engineering programmes tend to over-demand, or to miss what ETC must have: 210 hours of industry training, workshops and faculty industry experience.')},
 {h:W('คุณสมบัติของผู้ตรวจประเมิน (ข้อ 4.4.2)','Evaluator qualifications (4.4.2)'),b:[
  W('สำเร็จปริญญาตรีวิศวกรรมศาสตร์ขึ้นไปในสาขาที่เกี่ยวข้องกับหลักสูตรที่ตรวจ','At least a bachelor’s in engineering in a related field'),
  W('ได้รับการอบรมและผ่านการทดสอบเป็นผู้ตรวจประเมินของคณะอนุกรรมการฯ สภาวิศวกร','Trained and tested as an evaluator by the subcommittee of the Council of Engineers'),
  W('มีทัศนคติที่ดีต่อการศึกษาวิศวกรรมศาสตร์และการรับรอง','A positive attitude to engineering education and accreditation'),
  W('ผู้ทรงคุณวุฒิด้านการศึกษามีประสบการณ์สอนในหลักสูตรที่เน้นผลลัพธ์ หรือผู้ปฏิบัติวิชาชีพมีประสบการณ์ในสาขา หรือเป็นสมาชิกสมาคมวิชาชีพที่เกี่ยวข้อง','Educators with outcome-based teaching experience, or practitioners in the field, or members of a related professional society')]},
 {h:W('คณะผู้ตรวจ 3 คน','A team of three'),p:W('สภาวิศวกรแต่งตั้งคณะผู้ตรวจ 3 คน คือหัวหน้าคณะ 1 คนและผู้ตรวจ 2 คน ประกอบด้วยผู้ทรงคุณวุฒิทางการศึกษาและผู้ปฏิบัติวิชาชีพในสาขาของหลักสูตร (ข้อ 4.4) การอบรม Onsite จึงจัดทีมละ 3 คนแบบเดียวกัน','The Council appoints three evaluators: one chair and two members, mixing educators and practitioners in the field (4.4). On-site teams are formed the same way.')},
 {h:W('อ่านแบบผู้ตรวจ ETC','Read like an ETC evaluator'),b:[
  W('ทุกข้อความใน SER ถามว่า "หลักฐานอยู่ที่ไหน" และหลักฐานนั้นอยู่ระดับปัญหางานวิศวกรรมทั่วไปหรือไม่','For every claim in the SER ask “where is the evidence?” and whether it sits at the broadly-defined level'),
  W('ตัดสินตามเกณฑ์ ETAC ไม่เทียบกับหลักสูตรวิศวกรหรือสถาบันของตนเอง','Judge against ETAC criteria, not against engineering programmes or your own institution'),
  W('บันทึกตำแหน่งหลักฐาน (ส่วนที่ หัวข้อ ตาราง) ทุกครั้ง','Always note where the evidence is (part, item, table)')]}],
 ev:[[W('Module 18 และคู่มือ ETAC ปรับปรุงครั้งที่ 3','Module 18 and the ETAC procedure rev. 3'),W('อ่านก่อนเริ่ม Module 0','Read before Module 0')],[W('คู่มือการอบรม ETC ฉบับผู้เข้าอบรม','ETC training manual (trainee)'),W('บทที่ 1 เกณฑ์ผ่านการอบรม','Chapter 1: pass requirements')]],
 iss:[W('ข้ามโมดูล 18 แล้วใช้ความเข้าใจระดับวิศวกร','Skipping Module 18 and using engineer-level expectations'),W('ไม่ได้อ่านเอกสารของหลักสูตรตัวอย่างก่อนวัน Onsite','Not reading the sample programme documents before the on-site days')],
 terms:[['ETC',W('หลักสูตรทางเทคโนโลยีวิศวกรรม (Engineering Technology)','Engineering technology programme')],['ETAC',W('คณะทำงานกำกับการรับรองฯ หลักสูตรทางเทคโนโลยีวิศวกรรม (Engineering Technology Accreditation Commission)','Engineering Technology Accreditation Commission')],['PEV',W('ผู้ตรวจประเมินหลักสูตร (Program Evaluator)','Programme evaluator')]],
 ref:[PROC,W('Module 18 เกณฑ์ ETAC และ Sydney Accord','Module 18: ETAC criteria and the Sydney Accord')],
 chk:[W('คณะผู้ตรวจของ ETAC มีกี่คน ประกอบด้วยใคร','How many evaluators are on an ETAC team, and who?'),W('ผู้ตรวจต้องผ่านอะไรจากสภาวิศวกร','What must an evaluator pass with the Council?')]},

1:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 3.1 และ 3.3 · IEA GAPC 2021 (Sydney Accord)','ETAC procedure rev. 3, 3.1 and 3.3 · IEA GAPC 2021 (Sydney Accord)'),
 goal:W('เข้าใจการศึกษาเน้นผลลัพธ์ (OBE) และการรับรองเน้นผลลัพธ์ในบริบทหลักสูตรทางเทคโนโลยีวิศวกรรม','Understand outcome-based education and accreditation for engineering technology programmes.'),
 obj:[W('อธิบาย OBE และการออกแบบย้อนกลับ','Explain OBE and backward design'),W('บอกลักษณะหลักสูตร ETC ที่ขอรับรองได้ (ข้อ 3.3)','State what ETC programmes may apply (3.3)'),W('แยกระดับผลลัพธ์ของนักเทคโนโลยีวิศวกรรมกับวิศวกร','Tell the technologist outcome level from the engineer’s')],
 sec:[
 {h:W('จากสิ่งที่สอน สู่สิ่งที่นักศึกษาทำได้','From what is taught to what students can do'),p:W('การศึกษาเน้นผลลัพธ์เริ่มจากผลลัพธ์ที่บัณฑิตต้องทำได้ แล้วออกแบบหลักสูตร การสอน และการประเมินย้อนกลับมา การรับรองของ ETAC จึงประเมินจากผลลัพธ์การศึกษาและประสิทธิผลของกระบวนการจัดการคุณภาพ (ข้อ 3.1) ไม่ใช่นับว่าสอนวิชาอะไรบ้าง','OBE starts from what graduates must be able to do and designs curriculum, teaching and assessment backwards. ETAC therefore judges outcomes and the effectiveness of quality processes (3.1), not a list of courses taught.')},
 {h:W('ผลลัพธ์ระดับนักเทคโนโลยีวิศวกรรม','Outcomes at technologist level'),tbl:{cols:[W('ด้าน','Aspect'),W('หลักสูตร ETC (Sydney Accord)','ETC (Sydney Accord)'),W('หลักสูตรวิศวกร (Washington Accord)','Engineering (Washington Accord)')],rows:[
  [W('ระดับปัญหา','Problem level'),W('ปัญหางานวิศวกรรมทั่วไป SP1–SP7','Broadly-defined problems SP1–SP7'),W('ปัญหาที่ซับซ้อน WP1–WP7','Complex problems WP1–WP7')],
  [W('ความรู้','Knowledge'),W('SK1–SK9 เทคโนโลยีที่พัฒนาแล้วและใช้ในการปฏิบัติ','SK1–SK9: established technology used in practice'),W('WK1–WK9 รวมความรู้แนวหน้าและการวิจัย','WK1–WK9 including frontier knowledge and research')],
  [W('ผลลัพธ์','Outcomes'),W('PO 11 ข้อของ ETAC (SA1–SA11)','ETAC’s 11 POs (SA1–SA11)'),W('PO 12 ข้อ (WA1–WA11 และอื่น ๆ)','12 POs (WA-based)')],
  [W('การฝึกปฏิบัติ','Practice'),W('ต้องเพียงพอ ฝึกงาน 210 ชั่วโมงหรือสหกิจศึกษา','Must be sufficient: 210 hours of training or co-op'),W('ไม่กำหนดชั่วโมงเท่านี้','No such hour minimum')]]}},
 {h:W('หลักสูตรที่ขอรับรองได้ (ข้อ 3.3)','Programmes that may apply (3.3)'),b:[
  W('หลักสูตรเต็มเวลา ระดับปริญญาบัณฑิต ศึกษาไม่เกิน 5 ปี และไม่น้อยกว่า 120 หน่วยกิต','Full-time bachelor’s programmes, at most 5 years and at least 120 credits'),
  W('โครงสร้างมีพื้นฐานวิทยาศาสตร์ พื้นฐานวิศวกรรม และความรู้เฉพาะทาง เพื่อออกแบบและแก้ปัญหาในการประกอบวิชาชีพวิศวกรรมทั่วไป และมีการฝึกปฏิบัติที่เพียงพอ','Science and engineering fundamentals and specialist knowledge for design and problem solving in general practice, with sufficient practical training'),
  W('มีผู้สำเร็จการศึกษาไม่น้อยกว่า 2 รุ่น หลักสูตรใหม่ได้เพียงรับรองชั่วคราว','At least two graduating cohorts; new programmes can get only provisional accreditation'),
  W('หลักสูตรสหวิทยาการรับรองเพียงสาขาเดียว หลักสูตรหลายวิทยาเขตประเมินแยกรายวิทยาเขต','Interdisciplinary programmes are accredited in one discipline; multi-campus ones per campus')]},
 {h:W('การประเมินเน้นผลลัพธ์ (OBA)','Outcome-based assessment'),p:W('ผลลัพธ์ต้องวัดได้ด้วยตัวชี้วัด (PI) ที่ผูกกับแบบความรู้ SK และวัดทั้งทางตรงด้วยรูบริกจากงานจริงของนักศึกษา และทางอ้อมจากแบบสำรวจ (Guideline 3.1.2) เกรดรายวิชาหรือผล S/U ไม่ใช่หลักฐานผลลัพธ์','Outcomes need PIs tied to SK, measured directly with rubrics on real student work and indirectly through surveys (Guideline 3.1.2). Course grades or S/U are not outcome evidence.')}],
 ev:[[W('เอกสารหลักสูตรที่สภามหาวิทยาลัยอนุมัติ (เอกสารประกอบ 1)','Approved curriculum document (supporting document 1)'),W('หน่วยกิต ระยะเวลา และโครงสร้างตามข้อ 3.3','Credits, duration and structure per 3.3')],[W('ตาราง PLO–PO–SK','PLO–PO–SK table'),W('ผลลัพธ์อยู่ระดับ SA หรือคัดลอกระดับวิศวกร','Outcomes at SA level, or copied from engineering')]],
 iss:[W('ใช้ผลลัพธ์และความคาดหวังระดับวิศวกรกับหลักสูตร ETC','Applying engineer-level outcomes to an ETC programme'),W('ใช้เกรดเป็นหลักฐานผลลัพธ์','Using grades as outcome evidence')],
 terms:[['OBE',W('การศึกษาเน้นผลลัพธ์','Outcome-based education')],['SP',W('ลักษณะปัญหางานวิศวกรรมทั่วไป SP1–SP7','Broadly-defined problem characteristics SP1–SP7')],['Sydney Accord',W('ข้อตกลงสากลสำหรับนักเทคโนโลยีวิศวกรรม','International accord for engineering technologists')]],
 ref:[PROC,W('IEA Graduate Attributes and Professional Competencies (2021)','IEA Graduate Attributes and Professional Competencies (2021)')],
 chk:[W('หลักสูตร ETC ที่ขอรับรองต้องมีหน่วยกิตอย่างน้อยเท่าใด','What is the minimum credit load of an ETC programme?'),W('หลักสูตรใหม่ที่ยังไม่มีผู้จบได้ผลการรับรองแบบใด','What result can a new programme with no graduates get?')]},

2:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 3–4, 7 และ 11','ETAC procedure rev. 3, sections 3–4, 7 and 11'),
 goal:W('รู้จักองค์กรในระบบรับรองหลักสูตร ETC ของสภาวิศวกร วงรอบ ปฏิทิน และผลการรับรอง 5 แบบ','Know the bodies, cycle, calendar and five results of ETC accreditation by the Council of Engineers.'),
 obj:[W('บอกบทบาทของ TABEE, ETAC, คณะทำงานกลั่นกรอง และคณะผู้ตรวจ','State the roles of TABEE, ETAC, the intervener group and the PEV team'),W('เรียงปฏิทิน 18 กิจกรรมของรอบการรับรอง','Order the 18 activities of a cycle'),W('อธิบายผลการรับรอง 5 แบบและระยะเวลา','Explain the five results and their periods')],
 sec:[
 {h:W('การรับรองไม่ใช่การจัดอันดับ','Accreditation is not ranking'),p:W('สภาวิศวกรให้บริการรับรองตามคำร้องของสถาบันโดยสมัครใจ ภายใต้ระเบียบกรรมการสภาวิศวกรว่าด้วยการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ พ.ศ. 2560 เพื่อให้มั่นใจว่าบัณฑิตมีลักษณะที่พึงประสงค์ในการประกอบวิชาชีพ ผลคือผ่านหรือไม่ผ่านเกณฑ์ ไม่ใช่คะแนนเทียบกับสถาบันอื่น','The Council accredits voluntarily on request, under its 2560 regulation, to assure that graduates are fit for practice. The result is meeting the criteria or not, not a score against other institutions.')},
 {h:W('องค์กรในระบบ','Who does what'),tbl:{cols:[W('องค์กร','Body'),W('หน้าที่หลัก','Main role')],rows:[
  [W('คณะอนุกรรมการรับรองฯ (TABEE)','Accreditation subcommittee (TABEE)'),W('รับรองตามหลักเกณฑ์ พัฒนาระบบและผู้ตรวจ ให้ความเห็นชอบผลก่อนเสนอกรรมการสภาวิศวกร','Accredits, develops the system and evaluators, endorses results for the Council')],
  [W('คณะทำงานกำกับฯ หลักสูตรทางเทคโนโลยีวิศวกรรม (ETAC)','ETAC working group'),W('พัฒนาระบบและเอกสารของหลักสูตร ETC กำกับการดำเนินงาน จัดประชุมตัดสินผล','Develops the ETC system and documents, oversees the process, runs the decision meeting')],
  [W('คณะทำงานกลั่นกรองฯ (Intervener)','Intervener working group'),W('กลั่นกรอง SER ก่อนรับสมัคร และตรวจทานรายงานผลด้านความสม่ำเสมอ ผลประโยชน์ทับซ้อน และความเสี่ยงต่อการอุทธรณ์','Screens SERs for acceptance and reviews reports for consistency, conflicts of interest and appeal risk')],
  [W('คณะผู้ตรวจประเมิน (PEV team)','Programme evaluating team'),W('ตรวจเอกสาร ตรวจเยี่ยม และเขียนรายงานผลพร้อมเสนอผลการรับรอง','Reviews documents, visits and writes the report with a recommended result')],
  [W('อนุกรรมการประสานงานตรวจเยี่ยม','Visit coordinator'),W('เมื่อสถาบันขอรับรองหลายหลักสูตรพร้อมกัน ทำหน้าที่ประสานและนำการประชุมกับผู้บริหาร','When several programmes apply together, coordinates and leads the meetings with leaders')],
  [W('เจ้าหน้าที่สภาวิศวกร','Council staff'),W('นัดหมาย เอกสาร บันทึกการประชุม','Scheduling, documents, minutes')]]}},
 {h:W('วงรอบและปฏิทิน','Cycle and calendar'),p:W('วงรอบการรับรองครั้งละ 6 ปีการศึกษา เริ่มปีการศึกษา 2570 ปฏิทินมี 18 กิจกรรม','A six-year cycle from academic year 2570, with 18 activities.'),tbl:{cols:[W('ช่วง','When'),W('กิจกรรม','Activity')],rows:[
  [W('ก.ค. สัปดาห์ที่ 1','July, week 1'),W('สถาบันส่งหนังสือสมัครและ SER ในรูปแบบอิเล็กทรอนิกส์','Application and SER sent electronically')],
  [W('ส.ค.–ก.ย.','Aug–Sep'),W('คณะทำงานกลั่นกรองตอบรับ ชำระค่าธรรมเนียม แต่งตั้งคณะผู้ตรวจ','Screening, fees, PEV team appointed')],
  [W('ต.ค.–ธ.ค.','Oct–Dec'),W('ตรวจ SER ขอคำชี้แจงและเอกสารเพิ่ม (ส่งกลับสัปดาห์ที่ 4 พ.ย.) ตรวจรอบสอง นัดตรวจเยี่ยม','SER review, requests (returned by week 4 of Nov), second review, visit scheduled')],
  [W('ก.พ.–มี.ค.','Feb–Mar'),W('ตรวจเยี่ยม 2 วัน Fact Finding Report ภายใน 1 สัปดาห์ หลักสูตรชี้แจงภายใน 1 สัปดาห์','Two-day visit; Fact Finding Report within a week; programme reply within a week')],
  [W('เม.ย.–มิ.ย.','Apr–Jun'),W('เขียนรายงานผล คณะทำงานกลั่นกรองตรวจทาน (พ.ค.) Decision Meeting (มิ.ย.)','Report written, intervener review (May), Decision Meeting (June)')],
  [W('ก.ค.–ส.ค.','Jul–Aug'),W('TABEE เห็นชอบ กรรมการสภาวิศวกรอนุมัติ และแจ้งผล','TABEE endorsement, Council approval and notification')]]}},
 {h:W('ผลการรับรอง 5 แบบ','Five results'),tbl:{cols:[W('ผล','Result'),W('ระยะเวลาและเงื่อนไข','Period and conditions')],rows:[
  [W('รับรอง','Accredited'),W('6 ปี อาจต้องส่ง Interim Report (3 ปี) หรือรายงานการปรับปรุง','6 years; may need an interim report (3 years) or an improvement report')],
  [W('รับรองแบบมีเงื่อนไข','Conditional'),W('ไม่เกิน 3 ปี (2–3 ปีตามความเร่งด่วน) ส่งรายงานประเมินผลการปรับปรุงเพื่อติดตาม','Up to 3 years (2–3 by urgency); improvement report for follow-up')],
  [W('รับรองชั่วคราว','Provisional'),W('หลักสูตรใหม่ ต้องยื่นขอใหม่เมื่อมีผู้สำเร็จการศึกษา 2 รุ่น','New programmes; reapply after two graduating cohorts')],
  [W('รอผลการปรับปรุงแก้ไข','Pending improvement'),W('มีประเด็นที่ต้องแก้ก่อนตัดสิน','Issues to fix before a decision')],
  [W('ไม่รับรองหรือยกเลิกการรับรอง','Not accredited or withdrawn'),W('ไม่เป็นไปตามเกณฑ์','Criteria not met')]]}},
 {h:W('Decision Meeting','Decision Meeting'),p:W('หัวหน้าคณะผู้ตรวจนำเสนอรายงาน คณะทำงานกลั่นกรองนำเสนอความเห็นซึ่งอาจต่างกัน ที่ประชุมซักถามทั้งสองฝ่ายแล้วลงคะแนนลับ ผลถือเป็นสิ้นสุด แล้วเสนอ TABEE เห็นชอบและกรรมการสภาวิศวกรอนุมัติ','The team chair presents; the intervener group gives its view, which may differ; members question both, then vote by secret ballot. The vote is final and goes to TABEE and the Council.')}],
 ev:[[W('ปฏิทินการรับรองในคู่มือ ETAC ข้อ 7','Calendar in ETAC section 7'),W('ตรวจว่าเอกสารแต่ละรอบส่งตามกำหนด','Check each round was on time')],[W('ตารางผลการรับรองในข้อ 11','Results table in section 11'),W('ผลและภาระที่หลักสูตรต้องทำต่อ','Result and follow-up duties')]],
 iss:[W('สับสนบทบาท ETAC กับคณะทำงานกลั่นกรอง','Confusing ETAC with the intervener group'),W('คิดว่าคณะผู้ตรวจเป็นผู้ตัดสินผล','Thinking the PEV team decides the result')],
 terms:[['TABEE',W('คณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์','Thailand Accreditation Board for Engineering Education')],[W('Intervener','Intervener'),W('คณะทำงานกลั่นกรองรายงานผลการรับรอง','Report screening working group')],['Interim Report',W('รายงานความก้าวหน้าระหว่างวงรอบ','Progress report within a cycle')]],
 ref:[PROC],
 chk:[W('รับรองแบบมีเงื่อนไขมีระยะเวลาไม่เกินกี่ปี','At most how long is conditional accreditation?'),W('ใครลงคะแนนตัดสินผลการรับรอง','Who votes on the accreditation result?')]},

3:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6 และคำอธิบายสัญลักษณ์ในแบบรายการตรวจประเมิน','ETAC procedure rev. 3, section 6 and the checklist symbol key'),
 goal:W('มองเกณฑ์ 8 ข้อของ ETAC เป็นระบบพัฒนาคุณภาพต่อเนื่องเดียวกัน และใช้ระดับข้อค้นพบ D W C R S ตามคู่มือ','See ETAC’s eight criteria as one continuous-improvement system and use the D W C R S levels as defined.'),
 obj:[W('อธิบาย CQI สามระดับ','Explain the three CQI loops'),W('บอกสิ่งที่เปลี่ยนในแต่ละเกณฑ์สำหรับ ETC','State what changes in each criterion for ETC'),W('ใช้นิยามระดับข้อค้นพบของ ETAC','Apply ETAC’s finding definitions')],
 sec:[
 {h:W('CQI สามระดับ','Three CQI loops'),b:[
  W('ระดับรายวิชา: ผล CLO และ PI ใช้ปรับการสอนในภาคถัดไป','Course: CLO and PI results change next term’s teaching'),
  W('ระดับหลักสูตร: ผล PO รายปีใช้ปรับรายวิชาและโครงสร้าง (เกณฑ์ข้อ 4)','Programme: annual PO results change courses and structure (criterion 4)'),
  W('ระดับวัตถุประสงค์: ความเห็นของ IAC ศิษย์เก่า และผู้ใช้บัณฑิตใช้ทบทวน PEO (เกณฑ์ข้อ 2)','Objectives: IAC, alumni and employer input reviews the PEOs (criterion 2)')]},
 {h:W('เกณฑ์ 8 ข้อกับสิ่งที่ ETC ต้องมี','Eight criteria and what ETC needs'),tbl:{cols:[W('เกณฑ์','Criterion'),W('จุดที่ต้องดูในหลักสูตร ETC','ETC focus')],rows:[
  [W('1 นิสิตนักศึกษา','1 Students'),W('การรับและเทียบโอนจาก ปวส. การทดสอบสมรรถนะรายวิชาปฏิบัติ การตรวจผู้สำเร็จการศึกษา','Diploma intake and transfer, competency tests, graduation checks')],
  [W('2 วัตถุประสงค์','2 Objectives'),W('PEO บอกงานของนักเทคโนโลยีวิศวกรรม และทบทวนกับ IAC','PEOs describe technologist careers and are reviewed with an IAC')],
  [W('3 ผลลัพธ์','3 Outcomes'),W('PO 11 ข้อของ ETAC ตัวชี้วัดผูก SK (Guideline 3.1.2)','ETAC’s 11 POs with SK-linked PIs (Guideline 3.1.2)')],
  [W('4 การพัฒนาต่อเนื่อง','4 Improvement'),W('วัดทางตรงและทางอ้อมครบ ใช้ผล Capstone ตาม Guideline 3.1.3','Direct and indirect methods; Capstone results per Guideline 3.1.3')],
  [W('5 รายละเอียดหลักสูตร','5 Curriculum'),W('45 หน่วยกิต ฝึกงาน 210 ชั่วโมงหรือสหกิจ Capstone ระดับ SP','45 credits, 210 hours or co-op, SP-level capstone')],
  [W('6 คณาจารย์','6 Faculty'),W('ประสบการณ์ภาคอุตสาหกรรมที่เป็นปัจจุบัน','Current industry experience')],
  [W('7 สิ่งอำนวยความสะดวก','7 Facilities'),W('โรงฝึกงาน ความปลอดภัย และบันทึกซ่อมบำรุง 2 ปี','Workshops, safety and two years of maintenance records')],
  [W('8 การสนับสนุน','8 Support'),W('งบประมาณและนายช่างหรือครูปฏิบัติการเพียงพอ','Budget and enough technicians')]]}},
 {h:W('ระดับข้อค้นพบตามคู่มือ ETAC','ETAC finding levels'),tbl:LV},
 {h:W('หลักการของระบบที่ยั่งยืน','A sustainable system'),b:[
  W('มีผู้รับผิดชอบ ปฏิทิน และบันทึกการประชุมที่ตรวจย้อนได้','Owners, a calendar and traceable minutes'),
  W('ข้อมูลเก็บต่อเนื่องอย่างน้อย 2 ปี (Guideline 3.1.1)','Data kept for at least two years (Guideline 3.1.1)'),
  W('ผลการประเมินนำไปสู่การเปลี่ยนแปลงจริง และตรวจผลของการเปลี่ยนแปลง','Results lead to real changes, whose effect is checked')]}],
 ev:[[W('รายงานการประชุมกรรมการบริหารหลักสูตรและ IAC','Programme committee and IAC minutes'),W('การตัดสินใจที่อ้างผลการประเมิน','Decisions citing assessment results')],[W('แบบรายการตรวจประเมิน 79 ข้อ (Guideline 3.1.4)','79-item checklist (Guideline 3.1.4)'),W('ระดับรายข้อตามสัญลักษณ์ D W C R S','Item levels by D W C R S')]],
 iss:[W('ใช้ระดับตามความรู้สึก ไม่อ้างนิยาม','Levels by feel, not by definition'),W('มองแต่ละเกณฑ์แยกกัน ไม่เห็นว่าเกณฑ์ข้อ 4 เชื่อมทุกข้อ','Treating criteria separately, missing how criterion 4 links them')],
 terms:[['CQI',W('การพัฒนาคุณภาพอย่างต่อเนื่อง','Continuous quality improvement')],['IAC',W('คณะกรรมการที่ปรึกษาจากภาคอุตสาหกรรม','Industrial Advisory Committee')],['S',W('มีคำอธิบายพอเพียง (Resolved)','Resolved')]],
 ref:[PROC,W('ETAC Guideline 3.1.4 แบบรายการตรวจสอบ SER','ETAC Guideline 3.1.4')],
 chk:[W('ข้อวิตกกังวลต่างจากข้อด้อยอย่างไรตามนิยามของ ETAC','How does a concern differ from a weakness in ETAC’s definitions?'),W('สัญลักษณ์ S ใช้เมื่อใด','When is S used?')]},

4:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 4.4 และ 5','ETAC procedure rev. 3, 4.4 and 5'),
 goal:W('รู้หน้าที่ของคณะผู้ตรวจ ETAC ตั้งแต่ตรวจเอกสารเบื้องต้นจนถึง Decision Meeting','Know the ETAC team’s duties from the first document review to the Decision Meeting.'),
 obj:[W('บอกงานของคณะผู้ตรวจ 4 ส่วนตามข้อ 4.4.1','State the four duty areas in 4.4.1'),W('อธิบายสิ่งที่พูดและไม่พูดใน Exit meeting','Explain what is and is not said at the exit meeting'),W('บอกหน้าที่ของหัวหน้าคณะผู้ตรวจ','State the chair’s duties')],
 sec:[
 {h:W('งานของคณะผู้ตรวจ (ข้อ 4.4.1)','The team’s duties (4.4.1)'),b:[
  W('ตรวจเอกสารเบื้องต้น: ซักถามและขอเอกสารเพิ่ม ถ้าคำอธิบายหรือหลักฐานไม่ได้คุณภาพหรือส่งช้าเกินควร อาจเลื่อนหรือยกเลิกการตรวจเยี่ยม','Preliminary review: ask questions and request documents; poor or very late evidence may postpone or cancel the visit'),
  W('ตรวจเยี่ยม 2 วัน: Course Portfolio การสอน ห้องปฏิบัติการและความปลอดภัย ห้องสมุด ระบบสารสนเทศ และสัมภาษณ์ทุกกลุ่ม','Two-day visit: course portfolios, teaching, labs and safety, library, IT and interviews'),
  W('Exit meeting กับผู้บริหารสถาบันและหลักสูตร','Exit meeting with institution and programme leaders'),
  W('รายงาน: Fact Finding Report ให้สถาบันพิจารณา รายงานผลตามแบบที่กำหนด ตรวจทานกับคณะทำงานกลั่นกรอง และนำเสนอใน Decision Meeting','Reporting: Fact Finding Report, the formal report, intervener review and presentation at the Decision Meeting')]},
 {h:W('ก่อนตรวจเยี่ยม','Before the visit'),p:W('ถ้าเอกสารที่ขอไม่ใช่ประเด็นหลัก คณะผู้ตรวจให้หลักสูตรเตรียมไว้ในวันตรวจได้ ถ้าเอกสารแสดงชัดว่าผลลัพธ์และการจัดการไม่เป็นไปตามเกณฑ์ คณะผู้ตรวจอาจเสนอไม่รับรองโดยไม่ต้องตรวจเยี่ยม (ข้อ 5.1)','Minor requests can wait for the visit day. If the documents clearly show the criteria are not met, the team may recommend non-accreditation without a visit (5.1).')},
 {h:W('Exit meeting','Exit meeting'),b:[
  W('อธิบายกระบวนงานที่จะทำต่อโดยย่อ','Briefly explain the next steps'),
  W('แจ้งรายการข้อเท็จจริงที่พบ โดยไม่ต้องอธิบายหรือให้คำแนะนำในรายละเอียด','List the facts found, without detailed explanation or advice'),
  W('ไม่แจ้งผลการรับรอง เพราะผลตัดสินใน Decision Meeting','Do not announce a result; that is decided at the Decision Meeting')]},
 {h:W('หลังตรวจเยี่ยม','After the visit'),b:[
  W('Fact Finding Report ภายใน 1 สัปดาห์ หลักสูตรชี้แจงภายใน 1 สัปดาห์','Fact Finding Report within a week; programme reply within a week'),
  W('คณะผู้ตรวจประชุมสรุปตามแบบรายการตรวจประเมินและเขียนรายงานผล (เม.ย.)','Team summarises against the checklist and writes the report (April)'),
  W('หัวหน้าคณะประชุมกับคณะทำงานกลั่นกรอง (พ.ค.) ความเห็นไม่จำเป็นต้องตรงกัน','Chair meets the intervener group (May); views need not converge'),
  W('หัวหน้าคณะนำเสนอใน Decision Meeting (มิ.ย.)','Chair presents at the Decision Meeting (June)')]},
 {h:W('หัวหน้าคณะผู้ตรวจ (ข้อ 4.4.3)','Team chair (4.4.3)'),p:W('ประสานงานกับเจ้าหน้าที่ แนะนำทีมเรื่องขั้นตอน ประชุมสรุปผลและเขียนรายงาน ตรวจทานกับคณะทำงานกลั่นกรอง และนำเสนอใน Decision Meeting ควรมีประสบการณ์วิชาชีพ เคยบริหารหลักสูตรที่ได้รับรอง หรือเคยเป็นผู้ตรวจของสภาวิศวกร','Coordinates with staff, guides the team on procedure, leads the summary and report, works with the interveners and presents at the Decision Meeting. Should have professional experience, have led an accredited programme or have evaluated before.')},
 {h:W('ระดับข้อค้นพบ','Finding levels'),tbl:LV}],
 ev:[[W('แบบรายการตรวจประเมินและแบบรายงานผล','Checklist and report template'),W('ทุกระดับมีหลักฐานและตำแหน่งอ้างอิง','Every level has evidence and a reference')],[W('Fact Finding Report และคำชี้แจงของหลักสูตร','Fact Finding Report and programme reply'),W('ประเด็นใดเปลี่ยนเป็น S หลังคำชี้แจง','Which issues become S after the reply')]],
 iss:[W('ให้คำแนะนำหรือบอกผลใน Exit meeting','Advising or announcing results at the exit meeting'),W('ขอเอกสารกว้าง ๆ ไม่ระบุเกณฑ์และตำแหน่ง','Vague document requests without criterion or location')],
 terms:[['Fact Finding Report',W('รายงานข้อเท็จจริงจากการตรวจเยี่ยม','Report of facts found at the visit')],['Exit meeting',W('ประชุมสรุปปิดท้ายการตรวจเยี่ยม','Closing meeting of the visit')]],
 ref:[PROC],
 chk:[W('คณะผู้ตรวจเสนอไม่รับรองโดยไม่ตรวจเยี่ยมได้เมื่อใด','When may a team recommend non-accreditation without a visit?'),W('หลักสูตรต้องส่งคำชี้แจงต่อ Fact Finding Report ภายในกี่วัน','How soon must the programme reply to the Fact Finding Report?')]},

5:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 9 และแบบรายงานประเมินตนเอง · ETAC Guideline 3.1.1–3.1.4','ETAC procedure rev. 3, section 9 and the SER template · Guidelines 3.1.1–3.1.4'),
 goal:W('อ่านเล่ม SER ของหลักสูตร ETC ตามแบบรายงาน 10 ส่วน และรู้ว่าเอกสารเชิงประจักษ์ใดต้องมีในวันตรวจ','Read an ETC SER by its 10-part template and know which evidence must be ready on the visit day.'),
 obj:[W('บอก 10 ส่วนของ SER','Name the 10 parts of the SER'),W('ใช้ Guideline 3.1.1–3.1.4 ตรวจความครบ','Check completeness with Guidelines 3.1.1–3.1.4'),W('บอกเอกสารที่ต้องเตรียมในห้องเอกสาร','List what must be in the document room')],
 sec:[
 {h:W('SER 10 ส่วน','SER in 10 parts'),tbl:{cols:[W('ส่วน','Part'),W('เนื้อหา','Content')],rows:[
  ['1',W('ข้อมูลพื้นฐาน: ชื่อหลักสูตรและปริญญา ผู้รับผิดชอบ ประวัติ ความร่วมมือ สถานที่สอน การประชาสัมพันธ์ ผลการรับรองครั้งก่อน','Basic data: names, contacts, history, partnerships, sites, publicity, last accreditation')],
  ['2',W('เกณฑ์ข้อ 1 นิสิตนักศึกษา','Criterion 1 Students')],['3',W('เกณฑ์ข้อ 2 วัตถุประสงค์หลักสูตร','Criterion 2 Objectives')],['4',W('เกณฑ์ข้อ 3 ผลลัพธ์การศึกษา','Criterion 3 Outcomes')],
  ['5',W('เกณฑ์ข้อ 4 การพัฒนาต่อเนื่อง','Criterion 4 Improvement')],['6',W('เกณฑ์ข้อ 5 รายละเอียดหลักสูตร','Criterion 5 Curriculum')],['7',W('เกณฑ์ข้อ 6 คณาจารย์','Criterion 6 Faculty')],
  ['8',W('เกณฑ์ข้อ 7 สิ่งอำนวยความสะดวก','Criterion 7 Facilities')],['9',W('เกณฑ์ข้อ 8 การสนับสนุนของสถาบัน','Criterion 8 Support')],
  ['10',W('เอกสารประกอบ: เอกสารหลักสูตร ประมวลรายวิชา ประวัติอาจารย์ และอื่น ๆ','Supporting documents: curriculum, syllabi, faculty CVs and more')]]}},
 {h:W('แนวปฏิบัติ 4 ฉบับ','Four guidelines'),b:[
  W('3.1.1 เอกสารเชิงประจักษ์ที่ต้องเตรียมในวันตรวจ ย้อนหลังอย่างน้อย 2 ปี','3.1.1 evidence for the visit, at least two years back'),
  W('3.1.2 ผลลัพธ์รายวิชาและตัวชี้วัดที่สอดคล้องกับ SK','3.1.2 course outcomes and indicators aligned with SK'),
  W('3.1.3 รายงาน Outcome Score ของโครงงานรวบยอด','3.1.3 Capstone outcome score report'),
  W('3.1.4 แบบรายการตรวจสอบ SER 79 ข้อ ใช้ตรวจว่า SER ตอบทุกหัวข้อ','3.1.4 the 79-item SER checklist, to check every item is answered')]},
 {h:W('SER ที่ดีและไม่ดี','Good and poor SERs'),tbl:{cols:[W('SER ที่ดี','Good'),W('SER ที่ไม่ดี','Poor')],rows:[
  [W('ตอบตามหัวข้อของแบบรายงาน มีตารางและเลขอ้างอิงหลักฐาน','Follows the template with tables and evidence references'),W('เรียงหัวข้อเอง ข้ามหัวข้อ','Own order, missing items')],
  [W('ผลลัพธ์แยกรายปีอย่างน้อย 2 ปี','Results per year for at least two years'),W('เฉลี่ยรวมหลายปีหรือมีปีเดียว','Multi-year averages or a single year')],
  [W('บอกปัญหาของตนและแผนแก้','States its own problems and plans'),W('บรรยายแต่ข้อดี','Only strengths')]]}},
 {h:W('สิ่งที่สถาบันต้องเตรียมในวันตรวจ (ข้อ 9)','What the institution prepares (section 9)'),b:[
  W('Course Portfolio ทุกรายวิชาของหลักสูตร: ประมวลรายวิชา แผนการสอน เอกสารประกอบการสอน การบ้าน รายงาน บันทึกการวัดผล ตัวอย่างข้อสอบและสมุดคำตอบ','A course portfolio for every course: syllabus, plan, notes, assignments, reports, grade records, sample exams and scripts'),
  W('แฟ้มห้องปฏิบัติการ: ผู้รับผิดชอบ ตารางการใช้ คู่มือเครื่องมือ คู่มือความปลอดภัย แบบฝึก และตัวอย่างรายงาน','Lab files: owner, schedules, equipment and safety manuals, exercises and sample reports'),
  W('ผู้ตรวจประเมินจากเอกสารที่อ้างอิงได้ผ่านระบบเอกสารและการจัดเก็บของสถาบันเท่านั้น','Evaluators judge only from evidence traceable in the institution’s own records')]},
 {h:W('ถ้า SER ไม่ได้มาตรฐาน','If the SER falls short'),p:W('SER ที่รูปแบบไม่ตรงแบบรายงาน คุณภาพไม่พอ หรือข้อมูลไม่พอ อาจถูกปฏิเสธการสมัครและให้ยื่นใหม่ในปีถัดไป (ข้อ 3.4 และ 9)','An SER off template, of poor quality or lacking data may be refused, with reapplication the next year (3.4, 9).')}],
 ev:[[W('เล่ม SER คู่กับ Guideline 3.1.4','The SER beside Guideline 3.1.4'),W('หัวข้อใดไม่มีคำตอบหรือไม่มีหลักฐาน','Which items have no answer or evidence')],[W('บัญชีเอกสารห้องเอกสาร (Guideline 3.1.1)','Document room list (Guideline 3.1.1)'),W('แฟ้มที่ระบุว่ามี แต่เปิดแล้วไม่มีจริง','Files listed but not actually there')]],
 iss:[W('SER ไม่ใช้หัวข้อตามแบบรายงาน','SER not following the template'),W('ข้อมูลไม่ถึง 2 ปี','Less than two years of data'),W('ไม่มี Course Portfolio ครบทุกวิชา','Portfolios missing for some courses')],
 terms:[['SER',W('รายงานประเมินตนเองของสถาบันการศึกษา','Self-evaluation report')],['Course Portfolio',W('แฟ้มเอกสารรายวิชา','Course file')]],
 ref:[PROC,W('ETAC Guideline 3.1.1–3.1.4','ETAC Guidelines 3.1.1–3.1.4')],
 chk:[W('SER ของ ETAC มีกี่ส่วน ส่วนใดเป็นเกณฑ์ข้อ 4','How many parts has the SER, and which is criterion 4?'),W('หลักฐานในห้องเอกสารต้องย้อนหลังอย่างน้อยกี่ปี','How far back must document-room evidence go?')]},

7:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.2 และแบบรายงานส่วนที่ 3','ETAC procedure rev. 3, 6.2 and SER part 3'),
 goal:W('ตรวจวัตถุประสงค์หลักสูตร (PEO) ของหลักสูตร ETC ตามข้อกำหนด 4 ข้อของเกณฑ์ข้อ 2','Check an ETC programme’s PEOs against the four requirements of criterion 2.'),
 obj:[W('แยก PEO กับ PO','Tell PEOs from POs'),W('ตรวจกระบวนการทบทวน PEO ที่มี IAC มีส่วนร่วม','Check a PEO review involving the IAC'),W('ให้ระดับกรณีด้าน PEO','Grade PEO cases')],
 sec:[
 {h:W('PEO กับ PO','PEOs and POs'),p:W('PEO บอกสิ่งที่บัณฑิตทำได้ในการทำงานไม่กี่ปีหลังจบ เช่น ติดตั้ง ควบคุม และปรับปรุงระบบในโรงงาน หรือดูแลโครงการ ส่วน PO บอกสิ่งที่นักศึกษาทำได้เมื่อจบ PEO ของหลักสูตร ETC จึงควรพูดถึงงานของนักเทคโนโลยีวิศวกรรม ไม่ใช่การวิจัยหรือการออกแบบระบบใหม่ทั้งหมด','PEOs state what graduates do a few years into work, such as installing, running and improving plant systems or leading projects; POs state what students can do at graduation. ETC PEOs should describe technologist work, not research or whole new system design.')},
 {h:W('ข้อกำหนด 4 ข้อ (ข้อ 6.2)','Four requirements (6.2)'),b:[
  W('PEO สอดคล้องกับพันธกิจของสถาบันและเกณฑ์ และเผยแพร่แล้วก่อนเริ่มใช้','PEOs fit the mission and criteria, and are published before use'),
  W('มีกระบวนการกำหนดและทบทวน PEO เป็นประจำ ให้ตอบสนองสังคมและองค์กรที่ใช้บัณฑิต','A regular process sets and reviews PEOs to meet society’s and employers’ needs'),
  W('การสอนและการบริหารหลักสูตรทำให้ PEO สำเร็จ','Teaching and management make the PEOs achievable'),
  W('มีการประเมินความสำเร็จและใช้ผลทบทวนและพัฒนาหลักสูตร','Achievement is evaluated and used to review and improve')]},
 {h:W('สิ่งที่ SER ส่วนที่ 3 ต้องแสดง','What SER part 3 must show'),b:[
  W('พันธกิจ PEO และ PO พร้อมหลักฐานการเผยแพร่บนเว็บไซต์','Mission, PEOs and POs, with web publication'),
  W('ตารางเชื่อม PEO กับพันธกิจ','A PEO–mission table'),
  W('ผู้มีส่วนได้ส่วนเสียและหลักฐานว่า PEO ตอบความต้องการ (IAC ศิษย์เก่า และอื่น ๆ)','Stakeholders and evidence that PEOs meet their needs (IAC, alumni and others)'),
  W('กระบวนการทบทวนที่ IAC มีส่วนร่วมเป็นช่วง ๆ อย่างเป็นระบบ และใช้ผลประเมิน PO รายปีประกอบ','A systematic review with the IAC, using annual PO results')]},
 {h:W('จุดที่ต้องระวังในหลักสูตร ETC','ETC watch-points'),b:[
  W('ผู้ใช้บัณฑิตและสถานประกอบการสหกิจศึกษาเป็นผู้มีส่วนได้ส่วนเสียหลัก ควรมีเสียงในการทบทวน','Employers and co-op hosts are key stakeholders and should have a voice'),
  W('คู่มือไม่กำหนดรอบปีของการทบทวน ให้ดูว่าเป็นประจำและเป็นระบบ','The procedure sets no review interval; look for regularity and system'),
  W('PEO คัดลอกจากหลักสูตรวิศวกรเป็นสัญญาณว่าหลักสูตรยังไม่ชัดว่าผลิตใคร','PEOs copied from engineering programmes signal an unclear target graduate')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('ทบทวน PEO ทุก 4 ปี โดยใช้ข้อมูล 4 แหล่งและ IAC ร่วม','PEOs reviewed every 4 years with four data sources and the IAC'),W('ไม่มีประเด็น','No issue')],
  [W('ทบทวนในกรรมการหลักสูตรอย่างเดียว ไม่มีความเห็นภาคอุตสาหกรรม','Reviewed by the committee alone, no industry input'),'C'],
  [W('PEO เขียนถึงงานวิจัยและนวัตกรรมระดับแนวหน้า ไม่ตรงงานของบัณฑิตจริง','PEOs speak of frontier research, unlike graduates’ real jobs'),'W'],
  [W('PEO ปรับแล้วแต่หน้าเว็บยังเป็นฉบับเก่า','PEOs revised but the website shows the old ones'),'R']]}}],
 ev:[[W('รายงานการประชุม IAC และผลสำรวจศิษย์เก่าและผู้ใช้บัณฑิต','IAC minutes and alumni and employer surveys'),W('IAC: “ครั้งล่าสุดหลักสูตรถามความเห็นเรื่อง PEO เมื่อไร”','IAC: “When were you last asked about the PEOs?”')],[W('หน้าเว็บไซต์หลักสูตร','Programme website'),W('PEO ที่เผยแพร่ตรงกับเล่ม SER','Published PEOs match the SER')]],
 iss:[W('PEO เป็นผลลัพธ์ตอนจบ ไม่ใช่สิ่งที่ทำได้หลังทำงาน','PEOs written as graduation outcomes'),W('ไม่มี IAC หรือผู้ใช้บัณฑิตในการทบทวน','No IAC or employers in the review'),W('ไม่ได้เผยแพร่ PEO','PEOs not published')],
 terms:[['PEO',W('วัตถุประสงค์หลักสูตร','Programme educational objectives')],['IAC',W('คณะกรรมการที่ปรึกษาจากภาคอุตสาหกรรม','Industrial Advisory Committee')]],
 ref:[PROC],
 chk:[W('PEO ต้องเผยแพร่เมื่อใด','When must PEOs be published?'),W('คู่มือ ETAC กำหนดรอบการทบทวน PEO หรือไม่','Does ETAC fix a PEO review interval?')]},

15:{abet:W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 6.8 และแบบรายงานส่วนที่ 9','ETAC procedure rev. 3, 6.8 and SER part 9'),
 goal:W('ตรวจการนำองค์กร งบประมาณ บุคลากรสายสนับสนุน และการพัฒนาอาจารย์ของหลักสูตร ETC ตามเกณฑ์ข้อ 8','Check leadership, budget, support staff and faculty development of an ETC programme under criterion 8.'),
 obj:[W('บอก 5 หัวข้อของ SER ส่วนที่ 9','Name the five items of SER part 9'),W('ประเมินความพอเพียงของนายช่างและงบซ่อมบำรุง','Judge whether technicians and maintenance budget suffice'),W('ให้ระดับกรณีด้านการสนับสนุน','Grade support cases')],
 sec:[
 {h:W('ไม่ได้วัดความร่ำรวย','Not a wealth test'),p:W('เกณฑ์ข้อ 8 ถามว่าทรัพยากรพอให้หลักสูตรบรรลุผลลัพธ์อย่างต่อเนื่องหรือไม่ ไม่ได้เทียบว่าสถาบันใดมีงบมากกว่า หลักฐานที่ดีคืองบที่ผูกกับผลการประเมินผลลัพธ์และแผนการจัดหา','Criterion 8 asks whether resources let the programme reach its outcomes consistently, not who has more money. Good evidence ties budget to assessment results and a resourcing plan.')},
 {h:W('ห้าหัวข้อใน SER ส่วนที่ 9','Five items in SER part 9'),tbl:{cols:[W('หัวข้อ','Item'),W('สิ่งที่ต้องแสดง','What to show')],rows:[
  [W('1 การนำองค์กร','1 Leadership'),W('บทบาทผู้บริหารระดับมหาวิทยาลัย คณะ และภาควิชาในการบริหารและตัดสินใจเรื่องหลักสูตร','Roles of university, faculty and department leaders in running the programme')],
  [W('2 งบประมาณ','2 Budget'),W('กระบวนการทำงบที่ใช้ผลการประเมินผลลัพธ์ การสนับสนุนต่อเนื่อง งบสอน งบซ่อมบำรุงและยกระดับครุภัณฑ์ และการประเมินความพอเพียง','Budgeting using outcome results, continuity, teaching funds, maintenance and upgrades, and a sufficiency check')],
  [W('3 บุคลากรสายสนับสนุน','3 Support staff'),W('การประเมินความพอเพียงของเจ้าหน้าที่ ผู้ช่วยสอน ครูปฏิบัติการและช่างเทคนิค การจ้างและอบรม','Sufficiency of clerical staff, TAs, technicians; hiring and training')],
  [W('4 การรับและพัฒนาอาจารย์','4 Faculty recruitment'),W('กระบวนการรับอาจารย์ การทดแทน และการจูงใจ','Recruitment, replacement and retention')],
  [W('5 การพัฒนาวิชาชีพของอาจารย์','5 Professional development'),W('ทุนอบรม สัมมนา ลาเขียนผลงาน และการฝึกในภาคอุตสาหกรรม','Funding for training, seminars, sabbaticals and industry placements')]]}},
 {h:W('จุดที่ต้องดูในหลักสูตร ETC','ETC watch-points'),b:[
  W('ครูปฏิบัติการและช่างเทคนิคเพียงพอต่อจำนวนชั่วโมงปฏิบัติและโรงฝึกงาน','Enough technicians for the practical hours and workshops'),
  W('งบซ่อมบำรุงและเปลี่ยนเครื่องมือมีแผนต่อเนื่อง ไม่พึ่งงบครั้งเดียว','Maintenance and replacement are planned, not one-off grants'),
  W('สิทธิ์ซอฟต์แวร์อุตสาหกรรมต่ออายุทันเวลา','Industry software licences renewed on time'),
  W('งบให้อาจารย์ไปฝึกในภาคอุตสาหกรรม (เชื่อมกับเกณฑ์ข้อ 6)','Funding for faculty industry placements (links to criterion 6)')]},
 {h:W('กรณีตัวอย่าง','Cases'),tbl:{cols:[W('สถานการณ์','Situation'),W('ระดับ','Level')],rows:[
  [W('งบครุภัณฑ์ลดลงต่อเนื่อง 3 ปี ห้องปฏิบัติการใช้เครื่องที่ชำรุด ผลลัพธ์ PO5 ต่ำกว่าเกณฑ์','Equipment budget falling for 3 years; broken kit in use; PO5 below target'),'W'],
  [W('นายช่าง 1 คนดูแลโรงฝึกงาน 3 แห่ง มีแผนจ้างเพิ่มแต่ยังไม่อนุมัติ','One technician for three workshops; hiring planned, not approved'),'C'],
  [W('สิทธิ์ซอฟต์แวร์ต่ออายุล่าช้า 2 เดือนเมื่อปีก่อน ปีนี้ได้งบผูกพัน 3 ปีแล้ว','Licence renewed 2 months late last year; 3-year funding now in place'),'R'],
  [W('งบลดลงแต่ผลลัพธ์ครบและเครื่องมือยังทันสมัย มีแผนชัด','Budget down but outcomes met, kit current, clear plan'),W('ไม่มีประเด็น','No issue')]]}}],
 ev:[[W('ตารางงบประมาณ 3 ปีและแผนจัดหา','Three-year budget and procurement plan'),W('หัวหน้าภาควิชา: “ผลประเมินผลลัพธ์ปีนี้ส่งผลต่องบอย่างไร”','Head: “How did this year’s outcome results shape the budget?”')],[W('อัตรากำลังสายสนับสนุน','Support staffing'),W('นายช่าง: “ดูแลกี่ห้อง มีเวลาซ่อมบำรุงตามแผนไหม”','Technician: “How many rooms do you cover, and is there time for planned maintenance?”')]],
 iss:[W('ไม่มีหลักฐานว่างบผูกกับผลการประเมิน','No link from budget to assessment'),W('นายช่างไม่พอ ส่งผลต่อความปลอดภัยและการซ่อมบำรุง','Too few technicians, hurting safety and maintenance'),W('ไม่มีงบพัฒนาวิชาชีพของอาจารย์','No faculty development funds')],
 terms:[[W('การนำองค์กร','Program leadership'),W('ผู้บริหารที่มีอำนาจและความรับผิดชอบต่อคุณภาพหลักสูตร','Leaders with authority and responsibility for programme quality')],[W('ครูปฏิบัติการ','Technician'),W('บุคลากรที่ดูแลการฝึกปฏิบัติและเครื่องมือ','Staff running practical training and equipment')]],
 ref:[PROC],
 chk:[W('SER ส่วนที่ 9 มีกี่หัวข้อ','How many items in SER part 9?'),W('งบประมาณที่ดีควรผูกกับอะไร','What should a good budget be tied to?')]},

17:{abet:W('คู่มือการอบรม ETC · คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 4.4 และ 5.2','ETC training manual · ETAC procedure rev. 3, 4.4 and 5.2'),
 goal:W('รู้ว่าการอบรม Onsite 2 วันกับเคส IET ทำอะไรในแต่ละช่วง ต้องเตรียมอะไร ใช้เอกสารใด และวิทยากรประเมินจากอะไร','Know what each on-site slot does with the IET case, what to prepare, which documents to use and how you are assessed.'),
 obj:[W('บอกผลลัพธ์การเรียนรู้ของการตรวจเยี่ยมจำลอง','State the learning outcomes of the mock visit'),W('อธิบายลำดับงาน 2 วันตั้งแต่ Pre-visit 1 ถึง Decision Meeting จำลอง','Explain the two days from Pre-visit 1 to the mock Decision Meeting'),W('ทำงานมอบหมายก่อนอบรม: อ่านเอกสารของหลักสูตร IET และทำ Auto Check ใน PEV Studio ฉบับ ETC','Finish the pre-work: read the IET documents and run Auto Check in PEV Studio ETC'),W('บอกเกณฑ์ 20 คะแนนที่วิทยากรใช้','State the 20-point scheme')],
 sec:[
 {h:W('รูปแบบการอบรม','Format'),p:W('Onsite เป็นการตรวจเยี่ยมจำลองที่ใกล้การตรวจจริง ผู้เข้าอบรมจัดทีม 3 คน (หัวหน้าคณะ 1 คนและผู้ตรวจ 2 คน ตามข้อ 4.4) ทุกทีมประเมินหลักสูตรเทคโนโลยีวิศวกรรมอุตสาหการ (IET) มหาวิทยาลัยเทคโนโลยีวนาธาร ซึ่งเป็นหลักสูตรสมมติ ตั้งแต่อ่านเล่ม SER จนเสนอผลใน Decision Meeting จำลอง บันทึกทุกขั้นใน PEV Studio ฉบับ ETC วิทยากรเป็นผู้ประสานงาน ตอบจดหมายขอเอกสาร และสวมบทบาทคนของหลักสูตร','On-site is a mock visit as close to real as possible. Teams of three (a chair and two evaluators, as in 4.4) all evaluate the fictitious Industrial Engineering Technology (IET) programme of Wanathan University of Technology, from the SER to a mock Decision Meeting, recording every step in PEV Studio ETC. Facilitators coordinate, answer document requests and play programme staff.')},
 {h:W('สิ่งที่จะทำได้เมื่อจบการอบรม','What you will be able to do'),b:[
  W('วางแผนการตรวจเยี่ยมที่ครบกิจกรรมตามข้อ 5.2 และเป็นมิตร','Plan a cordial visit that covers every activity in 5.2'),
  W('ตัดสินระดับข้อค้นพบตามนิยามของ ETAC และตามระดับปัญหางานวิศวกรรมทั่วไป','Grade findings by ETAC definitions at the broadly-defined level'),
  W('สัมภาษณ์อาจารย์ นักศึกษา ครูปฏิบัติการ พนักงานพี่เลี้ยง ผู้ใช้บัณฑิตและศิษย์เก่า','Interview faculty, students, technicians, mentors, employers and alumni'),
  W('เขียนข้อค้นพบและ Exit Statement ที่บอกข้อเท็จจริงโดยไม่ให้คำแนะนำในรายละเอียด','Write findings and an exit statement that state facts without detailed advice'),
  W('จัดทำ Fact Finding Report และนำเสนอใน Decision Meeting จำลอง','Write a Fact Finding Report and present at a mock Decision Meeting')]},
 {h:W('กำหนดการ 2 วัน','The two days'),p:W('วันที่ 1 ประเมินจากเอกสาร วันที่ 2 ตรวจเยี่ยมจำลองจนถึงการตัดสิน แต่ละช่วงมีสไลด์ฉบับ ETC ในหน้า Onsite','Day 1 reviews documents; Day 2 runs the mock visit to the decision. Each slot has an ETC slide deck on the Onsite page.'),tbl:{cols:[W('วัน','Day'),W('เวลา','Time'),W('กิจกรรม','Activity'),W('ผลที่ได้','Output')],rows:[
  [W('วันที่ 1','Day 1'),'08:00–08:30',W('เปิดการอบรม กติกา ความลับ และ COI จัดทีม','Opening, rules, confidentiality, COI, teams'),W('รายชื่อทีมใน PEV Studio','Team in PEV Studio')],
  [W('วันที่ 1','Day 1'),'08:30–12:00',W('ประเมินเกณฑ์ข้อ 1–4 (Pre-visit 1) อุ่นเครื่องด้วย Quiz & Poll กรณีศึกษา ETC','Criteria 1–4 (Pre-visit 1) after ETC Quiz & Poll warm-ups'),W('ระดับ PV1 ข้อ 1–4','PV1, criteria 1–4')],
  [W('วันที่ 1','Day 1'),'13:00–15:00',W('ประเมินเกณฑ์ข้อ 5–8 (Pre-visit 1)','Criteria 5–8 (Pre-visit 1)'),W('ระดับ PV1 ครบ 8 เกณฑ์','PV1 for all eight')],
  [W('วันที่ 1','Day 1'),'15:00–15:45',W('รวมผลทีมและเขียนจดหมายขอเอกสาร ไม่เกิน 8 รายการ','Merge results and write the request, up to 8 items'),W('แบบรายการขอเอกสารเพิ่มเติม','Document request')],
  [W('วันที่ 1','Day 1'),'15:45–17:00',W('Pre-visit 2 และแผนตรวจเยี่ยม เลือกสัมภาษณ์ 4 จาก 8 กลุ่ม ดูสถานที่ 2 จาก 4 แห่ง','Pre-visit 2 and visit plan: 4 of 8 groups, 2 of 4 places'),W('ระดับ PV2 แผน และคำถาม','PV2, plan and questions')],
  [W('วันที่ 1','Day 1'),'17:00–17:30',W('สรุปวันที่ 1 ด้วยกระดาน Brainstorm','Day 1 wrap-up on the brainstorm board'),'–'],
  [W('วันที่ 2','Day 2'),'08:00–10:00',W('ประชุมคณะ แล้วตรวจเยี่ยมจำลอง: โรงฝึกงาน ห้องเอกสาร และการสัมภาษณ์','Team meeting, then the mock visit: workshop, document room and interviews'),W('ข้อเท็จจริงจากวันตรวจ','Visit facts')],
  [W('วันที่ 2','Day 2'),'10:15–11:30',W('ประชุมคณะ ชี้แจงกับประธานหลักสูตร Exit Statement และ Exit meeting จำลอง','Team meeting, programme chair, exit statement and mock exit meeting'),W('Exit Statement','Exit statement')],
  [W('วันที่ 2','Day 2'),'11:30–12:00',W('เทียบกับเฉลย','Compare with the key'),'–'],
  [W('วันที่ 2','Day 2'),'13:00–14:00',W('Fact Finding Report และคำชี้แจงของหลักสูตร','Fact Finding Report and programme reply'),W('Fact Finding Report','Fact Finding Report')],
  [W('วันที่ 2','Day 2'),'14:00–15:30',W('Decision Meeting จำลอง ประเมินและปิดการอบรม','Mock Decision Meeting, assessment and close'),W('ไฟล์งานของทีม (.json)','Team file (.json)')]]}},
 {h:W('งานที่ต้องเสร็จก่อนอบรม','Due before the training'),b:[
  W('เรียน Module 18 แล้ว Module 0–17 ผ่านแบบทดสอบทุกโมดูล (ถูกอย่างน้อย 4 จาก 5 ข้อ) โดยเฉพาะ Module 16','Module 18, then Modules 0–17, passing every quiz (4 of 5), especially Module 16'),
  W('อ่านเอกสารของหลักสูตร IET ทั้งหมดในหัวข้อถัดไป ใช้เวลาประมาณ 5–6 ชั่วโมง','Read all IET documents listed next, about 5–6 hours'),
  W('ตรวจใบระเบียน IET 5 ฉบับในหน้า ฝึกวิเคราะห์ › ใบระเบียนผลการศึกษา','Check the five IET transcripts on the Analysis › Transcripts page'),
  W('เปิด PEV Studio ฉบับ ETC กด "เริ่มฝึก" ที่เคส IET ทำ Auto Check แล้ว Save ไฟล์มาวันอบรม','Open PEV Studio ETC, start the IET case, run Auto Check and save the file')]},
 {h:W('เอกสารของหลักสูตร IET','IET documents'),p:W('อ่านเล่ม SER ครบ 8 เกณฑ์ จดจุดที่สงสัยพร้อมเกณฑ์และตำแหน่ง อ่านใบระเบียนเทียบกับเกณฑ์สำเร็จการศึกษา และอ่านเอกสารตามแนวปฏิบัติ ETAC 3 ฉบับคู่กับเกณฑ์ข้อ 3 4 และ 5 ซองเอกสาร ช-1 ถึง ช-6 จะได้รับในวันอบรมหลังทีมส่งจดหมายขอเอกสาร','Read the whole SER and note doubts with criterion and location, check the transcripts against graduation rules, and read the three guideline documents with criteria 3, 4 and 5. Envelope documents ช-1 to ช-6 come on the day, after your request.'),files:[
  ['etc-files/IET/pdf/IET_SER_trainee.pdf',['เล่ม SER หลักสูตร IET ฉบับผู้อบรม','IET SER, trainee edition']],
  ['etc-files/IET/pdf/IET_transcripts.pdf',['ใบระเบียนผลการศึกษา 5 ราย','Five transcripts']],
  ['etc-files/IET/pdf/IET_capstone_trainee.pdf',['รายงาน Outcome Score on Capstone (Guideline 3.1.3)','Capstone outcome score report (Guideline 3.1.3)']],
  ['etc-files/IET/pdf/IET_sk_trainee.pdf',['การประเมินผลลัพธ์ตามแบบความรู้ SK (Guideline 3.1.2)','Outcome assessment by SK (Guideline 3.1.2)']],
  ['etc-files/IET/pdf/IET_docroom_trainee.pdf',['บัญชีเอกสารห้องเอกสาร (Guideline 3.1.1)','Document room list (Guideline 3.1.1)']],
  ['etc-files/IET/pdf/IET_SER_facilitator.pdf',['เล่ม SER ฉบับวิทยากร (มีเฉลย)','SER, facilitator edition (with key)'],1],
  ['etc-files/IET/pdf/IET_envelope.pdf',['ซองเอกสารเพิ่มเติม ช-1 ถึง ช-6','Envelope ช-1 to ช-6'],1],
  ['etc-files/IET/pdf/IET_rolecards.pdf',['บัตรบทบาท 12 บทบาท','Twelve role cards'],1]]},
 {h:W('สิ่งที่ต้องนำไป','What to bring'),b:[
  W('คอมพิวเตอร์พกพาและสายชาร์จ ใช้ PEV Studio ฉบับ ETC ตลอดสองวัน','Laptop and charger for PEV Studio ETC'),
  W('ไฟล์งาน PEV Studio (.json) ที่ทำ Auto Check และ Save แล้ว','Your saved PEV Studio file (.json) after Auto Check'),
  W('โทรศัพท์มือถือสำหรับ Quiz & Poll และกระดาน Brainstorm','A phone for Quiz & Poll and the brainstorm board'),
  W('บันทึกจุดที่สงสัยในเล่ม SER','Your notes on the SER')]},
 {h:W('กติการะหว่างอบรม','Ground rules'),b:[
  W('พูดอย่างตั้งใจ ฟังอย่างใส่ใจ และให้ทุกเสียงได้พูด','Speak with intention, listen with attention, let every voice be heard'),
  W('เริ่มและเลิกตรงเวลา','Start and finish on time'),
  W('รักษาความลับและแจ้งผลประโยชน์ทับซ้อน (ข้อ 3.10 และ 3.12) เหมือนการตรวจจริง','Keep confidentiality and declare conflicts of interest (3.10, 3.12) as in a real visit'),
  W('ตัดสินจากหลักฐานและเกณฑ์ ETAC ไม่เทียบกับหลักสูตรวิศวกรหรือสถาบันของตน','Judge on evidence and ETAC criteria, not against engineering programmes or your own institution')]},
 {h:W('การประเมินระหว่างอบรม','Assessment during training'),p:W('วิทยากรให้คะแนนงานของทีม 20 คะแนนตามคู่มือวิทยากร และสังเกตสมรรถนะ PEV 6 ด้าน ผลใช้ประกอบการพิจารณาขึ้นทะเบียนเป็นผู้ตรวจ ซึ่งคู่มือ ETAC กำหนดให้ต้องผ่านการอบรมและการทดสอบ (ข้อ 4.4.2)','Facilitators score team work out of 20 and observe six PEV competencies; results support registration, which requires training and a test (4.4.2).'),tbl:{cols:[W('งาน','Work'),W('คะแนน','Points')],rows:[
  [W('ระดับข้อค้นพบสุดท้ายรายเกณฑ์','Final level per criterion'),'5'],[W('การอ้างหลักฐานประกอบข้อค้นพบ','Evidence cited'),'4'],[W('จดหมายขอเอกสารเพิ่มเติม','Document request'),'4'],[W('แผนตรวจเยี่ยม','Visit plan'),'4'],[W('การเขียนข้อค้นพบ','Finding statements'),'3']]}}],
 ev:[[W('ไฟล์ PEV Studio ฉบับ ETC ที่ทำ Auto Check แล้ว','Your PEV Studio ETC file after Auto Check'),W('นำมาวันแรก','Bring on day 1')],[W('คู่มือการอบรม ETC บทที่ 7','ETC training manual, chapter 7'),W('ตารางกิจกรรม Onsite','On-site schedule')]],
 iss:[W('มาโดยยังไม่ได้อ่าน SER ของ IET ทั้งเล่ม','Arriving without reading the IET SER'),W('ไม่ได้ทำ Auto Check หรือไม่ได้ Save ไฟล์','No Auto Check or no saved file'),W('เขียนคำขอเอกสารกว้าง ๆ ไม่ระบุเกณฑ์และตำแหน่ง','Vague requests without criterion or location'),W('ให้ระดับตามมาตรฐานหลักสูตรวิศวกร','Grading to engineering-programme standards')],
 terms:[['PV1, PV2',W('ระดับข้อค้นพบหลัง Pre-visit 1 และ 2','Finding levels after Pre-visit 1 and 2')],['COI',W('ผลประโยชน์ทับซ้อน','Conflict of interest')]],
 ref:[W('คู่มือการอบรม ETC ฉบับผู้เข้าอบรม บทที่ 7','ETC training manual (trainee), chapter 7'),PROC],
 chk:[W('งานมอบหมายก่อนอบรมให้อ่านเอกสารชุดใด','Which documents does the pre-work cover?'),W('PV1 และ PV2 ต่างกันอย่างไร','How do PV1 and PV2 differ?'),W('วิทยากรให้คะแนน 20 คะแนนจากอะไรบ้าง','What makes up the 20 points?')]}
};
for(const k in R){const m=M[k];if(!m)continue;Object.assign(m,R[k]);m.sec=R[k].sec.concat([NOTE]);m.etcRead=true;}

/* Module 16: new opening sections from ETAC 5.2; TABEE interview techniques, session cards and question bank kept. */
const m16=M[16];
if(m16&&m16.sec){
 const keep=m16.sec.filter((s,i)=>i>0&&!s.etc);
 const intro=[
 {h:W('การตรวจเยี่ยม 2 วันตามคู่มือ ETAC (ข้อ 5.2)','The two-day visit in ETAC 5.2'),p:W('การตรวจเยี่ยมใช้เวลา 2 วัน และมีวันที่ 0 ช่วงเย็นสำหรับประชุมคณะ กรณีติดตามผลในวงรอบอาจประเมินจากรายงานความก้าวหน้าอย่างเดียว หรือตรวจเยี่ยม 1 วัน กำหนดการปรับได้แต่ต้องทำกิจกรรมให้ครบ ตารางด้านล่างคือตัวอย่างในคู่มือ','The visit takes two days, with a Day 0 evening team meeting. Follow-ups may use a progress report only or a one-day visit. Timings may change but every activity must happen. The table shows the procedure’s sample.'),tbl:{cols:[W('วัน','Day'),W('เวลา','Time'),W('กิจกรรมตามตัวอย่างของ ETAC','Activity in the ETAC sample')],rows:[
  [W('วันที่ 0','Day 0'),'18:00–21:00',W('คณะผู้ตรวจและอนุกรรมการประสานงานวางแผนและทบทวนประเด็น','Team and coordinator plan and review issues')],
  [W('วันที่ 1','Day 1'),'09:00–10:30',W('ประชุมผู้บริหารสถาบันและหลักสูตร ฟังการนำเสนอ และซักถามเนื้อหา SER','Leaders’ meeting, presentations and SER questions')],
  [W('วันที่ 1','Day 1'),'10:30–12:00',W('ดูการเรียนการสอน อุปกรณ์ ความปลอดภัยในห้องปฏิบัติการ ห้องสมุด และระบบสารสนเทศ','Classes, equipment, lab safety, library and IT')],
  [W('วันที่ 1','Day 1'),'13:00–14:45',W('ทบทวนข้อซักถาม แล้วตรวจ Course Portfolio และเอกสารหลักฐาน','Review questions, then course portfolios and evidence')],
  [W('วันที่ 1','Day 1'),'14:45–17:00',W('สัมภาษณ์ศิษย์เก่าและผู้ใช้บัณฑิต บัณฑิต และนักศึกษา','Alumni and employers, recent graduates, students')],
  [W('วันที่ 1','Day 1'),'18:00–21:00',W('สรุปข้อเท็จจริงและร่าง Exit meeting','Summarise facts, draft the exit meeting')],
  [W('วันที่ 2','Day 2'),'09:00–12:00',W('ประชุมผู้บริหาร สัมภาษณ์อาจารย์ แล้วสัมภาษณ์เจ้าหน้าที่ ผู้ช่วยสอน และครูปฏิบัติการ','Leaders, faculty interviews, then staff, TAs and technicians')],
  [W('วันที่ 2','Day 2'),'13:00–14:00',W('ตรวจ Course Portfolio ต่อ และสัมภาษณ์หัวหน้าภาควิชาหรือผู้บริหารหลักสูตร','More portfolios; head of department or programme lead')],
  [W('วันที่ 2','Day 2'),'14:00–16:00',W('เตรียมและจัด Exit meeting','Prepare and hold the exit meeting')]]}},
 {h:W('สิ่งที่ต้องได้จากวันตรวจในหลักสูตร ETC','What an ETC visit must establish'),b:[
  W('ดูโรงฝึกงานหรือห้องปฏิบัติการระหว่างคาบจริง: การ์ด ปุ่มหยุดฉุกเฉิน PPE และสมุดซ่อมบำรุง','See a workshop or lab in a live class: guards, emergency stops, PPE and the maintenance log'),
  W('สัมภาษณ์ครูปฏิบัติการหรือนายช่าง และพนักงานพี่เลี้ยงหรืออาจารย์นิเทศของฝึกงานและสหกิจศึกษา','Interview technicians, and internship or co-op mentors and supervisors'),
  W('ฟังการนำเสนอโครงงานรวบยอดหรือเปิดรายงาน Outcome Score (Guideline 3.1.3) ดูว่าโจทย์ถึงระดับ SP','Hear a capstone presentation or open the outcome score report (3.1.3) and check the SP level'),
  W('เปิดแฟ้มในห้องเอกสารตามบัญชี Guideline 3.1.1 ย้อนหลังอย่างน้อย 2 ปี','Open document-room files per Guideline 3.1.1, at least two years back'),
  W('ใน Exit meeting แจ้งข้อเท็จจริงที่พบ ไม่อธิบายหรือแนะนำในรายละเอียด และไม่บอกผล','At the exit meeting state facts only, without detailed advice or a result')]},
 {h:W('ตารางช่วงในหน้านี้','The session cards below'),p:W('การ์ดช่วงต่อจากนี้เป็นตารางของการอบรม ซึ่งจัดให้ใกล้การตรวจจริงและสัมพันธ์กับสไลด์ Mock-up ของเคส IET เวลาต่างจากตัวอย่างของ ETAC เล็กน้อย และมีช่วงนำเสนอโครงงานรวบยอดแยกออกมา ในการตรวจจริงให้ยึดกำหนดการที่คณะผู้ตรวจตกลงกับสถาบัน โดยต้องครบกิจกรรมตามข้อ 5.2','The cards that follow are the training timetable, linked to the IET mock-up decks. Times differ a little from the ETAC sample and the capstone presentation has its own slot. On a real visit, follow the schedule agreed with the institution, covering every activity in 5.2.')}];
 m16.sec=intro.concat(keep,[NOTE]);
 m16.abet=W('คู่มือ ETAC ปรับปรุงครั้งที่ 3 ข้อ 4.4.1 และ 5.2 · ABET Module 5 (เทคนิคการสัมภาษณ์)','ETAC procedure rev. 3, 4.4.1 and 5.2 · ABET Module 5 (interview technique)');
 m16.goal=W('ตรวจเยี่ยมหลักสูตร ETC 2 วันให้ครบกิจกรรมตามคู่มือ ETAC ใช้การสัมภาษณ์และการดูสถานที่ยืนยันหรือหักล้างประเด็นจาก SER','Run a two-day ETC visit covering every ETAC activity, using interviews and site checks to confirm or rule out SER issues.');
 m16.etcRead=true;
}
})();
