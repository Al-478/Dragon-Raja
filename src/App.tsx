import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  Brain,
  ChevronRight,
  ClipboardCheck,
  Crosshair,
  Crown,
  Download,
  Dumbbell,
  FileText,
  Fingerprint,
  FlaskConical,
  Gavel,
  KeyRound,
  Landmark,
  Library,
  LockKeyhole,
  MailOpen,
  Printer,
  Radar,
  RotateCcw,
  ScanLine,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from "lucide-react";

type Dimension = "blood" | "execution" | "stability" | "danger";
type NoticeLanguage = "en" | "zh";
type SiteLanguage = "zh" | "en";
type Answer = {
  label: string;
  detail: string;
  scores: Record<Dimension, number>;
};

type Question = {
  title: string;
  brief: string;
  answers: Answer[];
};

type Result = {
  grade: "S" | "A" | "B" | "C";
  department: string;
  stabilityIndex: number;
  missionFit: number;
  riskNote: string;
  applicantCode: string;
  admissionId: string;
  issueDate: string;
  bloodScore: number;
  dangerScore: number;
};

const navItems: Array<{ zh: string; en: string; id: string }> = [
  { zh: "流程", en: "Process", id: "process" },
  { zh: "学院档案", en: "Academy", id: "academy" },
  { zh: "空间档案", en: "Campus", id: "campus" },
  { zh: "教学理念", en: "Doctrine", id: "doctrine" },
  { zh: "秘党档案", en: "Society", id: "secret" },
  { zh: "血统评估", en: "Assessment", id: "assessment" },
  { zh: "诺玛终端", en: "Norma", id: "terminal" },
  { zh: "密函", en: "Letter", id: "notice" },
];

const siteCopy = {
  zh: {
    brand: "卡塞尔学院招生部",
    navLabel: "页面导航",
    backHome: "返回首屏",
    languageLabel: "切换网站语言",
    sealedMeta: "CASSELL COLLEGE / ADMISSIONS DIVISION",
    fileNo: "档案编号：CC-ADMISSION-071",
    sealedIntro: "你的档案已被诺玛标记。开启密函前，背景影像将保持清晰。",
    opening: "诺玛接入中",
    openLetter: "打开入学密函",
    heroTitle: "秘密招生档案",
    heroIntro: "这不是公开报名入口。你的档案已被诺玛标记，卡塞尔学院招生部将读取血统异常、危险直觉与任务适配度。",
    heroQuote: "密函已开启。诺玛将把你的候选资料同步至秘党招生链路。",
    startAssessment: "开始血统评估",
    viewProcess: "查看招生流程",
    enterArchive: "进入学院档案",
    statusOpen: "招生状态：秘密开放",
    candidateClearance: "候选权限：BLACK CARD / PENDING",
    normaWaiting: "诺玛链路：等待开启",
    fileNumberShort: "档案编号：CC-ADMISSION-071",
    normaListening: "诺玛链路：已监听",
    candidatePending: "候选人状态：待评估",
    internalClearance: "筛查级别：秘党内部",
    missionDirection: "任务方向：屠龙序列",
    fileProgress: "档案读取进度",
    bloodPotential: "血统潜能：采样中",
    executionSampling: "执行力：采样中",
    stabilitySampling: "稳定性：采样中",
    dangerWatch: "危险倾向：重点观察",
    normaReading: "诺玛读取中",
    executionBriefTitle: "执行部任务简报",
    equipmentCatalogTitle: "装备部异常物品目录",
    historyScheduleTitle: "龙族历史课课程表",
    sequenceObservationTitle: "言灵序列观察",
    rulesTitle: "新生入学禁令",
    noticeSwitchLabel: "密函语言切换",
    noticeEnglish: "EN",
    noticeChinese: "中文",
    lockedNotice: "密函尚未签发。请先完成血统评估。",
    downloadNotice: "下载密函",
    printNotice: "打印密函",
    resetTest: "重新测试",
    resultReady: "预入学密档已生成",
    bloodGrade: "血统评级",
    recommendedDept: "推荐部门",
    stabilityIndex: "心理稳定指数",
    missionFit: "任务适配度",
    riskNote: "风险备注",
    noticeId: "密函编号",
    viewNotice: "查看密函",
    footerLeft: "个人本地预览项目，非官方站点。",
    footerRight: "所有交互与档案编号均为原型模拟，不构成真实招生入口。",
    processTitle: "招生流程",
    processText: "所有步骤由卡塞尔学院招生部、诺玛系统与秘党备案链路共同确认。",
    academyTitle: "学院介绍",
    academyText: "学院不是避难所。它是秩序、知识与战场之间的薄线。",
    campusTitle: "卡塞尔空间档案",
    campusText: "空间档案不再按素材逐张堆叠，而是压缩成入学动线、诺玛中枢、封存区、装备部与校长权限五个关键节点。",
    campusBriefTitle: "山中学院、地下网络与入学路线被合并为一张可阅读的内部地图。",
    campusBriefText:
      "其余地点改为节点索引：它们仍存在于学院系统里，但不再用大量图片抢占版面。诺玛只向候选人展示必要路径，真正的空间权限在入学后逐级解锁。",
    doctrineTitle: "教学理念",
    doctrineText:
      "学院的课程不只是知识分类，而是把候选人一步步推向真实世界。言灵、血统、历史与执行任务在这里被合并成同一套纪律。",
    oathTitle: "凡王之血，必以剑终",
    oathText: "所有被选中的人，都必须先理解这句话的重量，再理解自己为什么被选中。",
    spiritTitle: "言灵排行档案",
    spiritText: "所有带有龙族言灵排行、序列与炼金武器信息的图片集中放在这里，不再散落到其他栏目。",
    secretTitle: "秘党系统档案",
    secretText: "以下内容只向通过初筛的候选人开放。诺玛会记录你的每一次停留、展开和复读。",
    terminalTitle: "诺玛档案终端",
    assessmentTitle: "入学测试",
    assessmentText: "逐题读取。回答不可撤回，但可在结果生成后重新测试。",
    noticeTitle: "诺玛入学密函",
    noticeText: "完成测试后，密函将根据诺玛评估结果动态签发。",
  },
  en: {
    brand: "Cassell College Admissions Division",
    navLabel: "Page navigation",
    backHome: "Back to hero",
    languageLabel: "Switch site language",
    sealedMeta: "CASSELL COLLEGE / ADMISSIONS DIVISION",
    fileNo: "File No.: CC-ADMISSION-071",
    sealedIntro: "Your file has been marked by Norma. The background image will remain clear before the letter is opened.",
    opening: "Norma linking",
    openLetter: "Open sealed letter",
    heroTitle: "Classified Admissions File",
    heroIntro: "This is not a public application portal. Your file has been marked by Norma, and the Cassell College Admissions Division will read bloodline anomalies, danger intuition, and mission fit.",
    heroQuote: "The sealed letter is open. Norma will synchronize your candidate data into the secret party selection chain.",
    startAssessment: "Start Bloodline Assessment",
    viewProcess: "View Process",
    enterArchive: "Enter Academy Archive",
    statusOpen: "Admissions status: classified open",
    candidateClearance: "Candidate clearance: BLACK CARD / PENDING",
    normaWaiting: "Norma link: waiting",
    fileNumberShort: "File No.: CC-ADMISSION-071",
    normaListening: "Norma link: listening",
    candidatePending: "Candidate status: pending assessment",
    internalClearance: "Screening level: secret party internal",
    missionDirection: "Mission direction: dragon-slaying sequence",
    fileProgress: "File reading progress",
    bloodPotential: "Bloodline potential: sampling",
    executionSampling: "Execution: sampling",
    stabilitySampling: "Stability: sampling",
    dangerWatch: "Danger tendency: priority watch",
    normaReading: "Norma reading",
    executionBriefTitle: "Execution Briefings",
    equipmentCatalogTitle: "Equipment Anomaly Catalog",
    historyScheduleTitle: "Dragon History Schedule",
    sequenceObservationTitle: "Word Spirit Sequence Watch",
    rulesTitle: "Freshman Entry Prohibitions",
    noticeSwitchLabel: "Letter language switch",
    noticeEnglish: "EN",
    noticeChinese: "ZH",
    lockedNotice: "The sealed file has not been issued. Complete the bloodline assessment first.",
    downloadNotice: "Download letter",
    printNotice: "Print letter",
    resetTest: "Retake test",
    resultReady: "Pre-admission classified file generated",
    bloodGrade: "Bloodline Grade",
    recommendedDept: "Recommended Department",
    stabilityIndex: "Stability Index",
    missionFit: "Mission Fit",
    riskNote: "Risk Note",
    noticeId: "Sealed File No.",
    viewNotice: "View Letter",
    footerLeft: "Local preview prototype. Not an official site.",
    footerRight: "All interactions and file numbers are simulated and do not form a real admissions portal.",
    processTitle: "Admissions Process",
    processText: "Every step is confirmed by the Cassell College Admissions Division, Norma, and the secret party archive chain.",
    academyTitle: "Academy Overview",
    academyText: "The academy is not a refuge. It is the thin line between order, knowledge, and the battlefield.",
    campusTitle: "Cassell Spatial Archive",
    campusText:
      "The spatial archive is condensed into five key nodes: arrival route, Norma core, sealed zones, equipment division, and principal clearance.",
    campusBriefTitle: "The mountain academy, underground network, and arrival route are merged into one readable internal map.",
    campusBriefText:
      "Other locations now appear as indexed nodes. They still exist in the academy system, but no longer consume the page with image stacks. Norma reveals only the necessary route to candidates; true spatial clearance unlocks after enrollment.",
    doctrineTitle: "Teaching Doctrine",
    doctrineText:
      "Courses are not merely categories of knowledge. They push candidates toward the real world, where word spirits, bloodline, history, and missions become one discipline.",
    oathTitle: "The blood of kings must end by the sword",
    oathText: "Every chosen candidate must understand the weight of this oath before understanding why they were chosen.",
    spiritTitle: "Word Spirit Ranking Archive",
    spiritText: "Images containing word-spirit rankings, sequences, and alchemical weapon records are gathered here instead of scattered across sections.",
    secretTitle: "Secret Society System Archive",
    secretText: "The following files are available only to candidates who pass initial screening. Norma records every pause, expansion, and reread.",
    terminalTitle: "Norma Archive Terminal",
    assessmentTitle: "Admission Assessment",
    assessmentText: "Read one question at a time. Answers cannot be withdrawn, but the test can be retaken after results are generated.",
    noticeTitle: "Norma Sealed Admission File",
    noticeText: "After the assessment, the sealed file is dynamically issued according to Norma's evaluation.",
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

type SiteCopyText = (typeof siteCopy)[SiteLanguage];

const processSteps = [
  ["01", "血统初筛", "已开放", "采集异常梦境、危险直觉与遗传谱系信号。"],
  ["02", "诺玛数据库匹配", "加密运行", "交叉比对全球招生名单、校董会备案与风险标签。"],
  ["03", "面试邀请", "条件触发", "招生专员将确认申请人对未知世界的承受阈值。"],
  ["04", "心理稳定性评估", "必要环节", "确认候选人在高压、污染与目击事件后的行为边界。"],
  ["05", "入学通知", "动态签发", "通过者获得临时学籍、课程授权与学院通行等级。"],
  ["06", "执行部备案", "延后审查", "具备任务适配度者进入执行部观察名单。"],
];

const processStepsEn = [
  ["01", "Bloodline Screening", "Open", "Collect abnormal dreams, danger intuition, and hereditary sequence signals."],
  ["02", "Norma Database Match", "Encrypted", "Cross-check global candidate lists, board records, and risk tags."],
  ["03", "Interview Notice", "Conditional", "A recruiter confirms the applicant's threshold for the unknown world."],
  ["04", "Stability Assessment", "Required", "Verify behavioral boundaries after pressure, contamination, and witnessed incidents."],
  ["05", "Admission Notice", "Dynamic", "Qualified candidates receive temporary student status, course clearance, and campus access."],
  ["06", "Execution Archive", "Deferred", "Mission-fit candidates enter the Execution Department observation list."],
];

const terminalCardsEn = [
  ["Student Status", "Candidate / Pre-enrollment Pool", "Synced at 04:32"],
  ["Bloodline Drift", "Stable Rise / Retest Required", "Norma advises observation"],
  ["Mission Clearance", "Temporary Level C", "Field work requires mentor signature"],
  ["Course Access", "Dragon History, Tactical Basics", "Equipment classes pending"],
  ["Campus Pass", "Library East Wing Open", "Underground zones sealed"],
];

const oathItemsEn = [
  ["Explore the Unknown", "EXPLORARE"],
  ["Understand the World", "INTELLIGERE"],
  ["Protect the Peace", "PROTEGERE"],
  ["Surpass the Self", "SUPERARE"],
];

const secretSocietyFilesEn = [
  ["Secret Party System", "An invisible order maintained by ancient families, the board, and academy action agencies. Candidates are permitted to know only what is necessary."],
  ["Bloodline File", "Norma records bloodline fluctuation, word-spirit trigger probability, and loss-of-control risk. Higher ratings mean deeper archiving."],
  ["Dragon-slaying Mandate", "Academy training is not decoration. It is a long war against dragon resurgence, unstable hybrids, and abnormal events."],
];

const missionBriefingsEn = [
  ["Execution Brief", "Field Code EX-09", "Suspected dragon relic exposure. Candidate may join only as logistics observer."],
  ["Campus Lockdown Record", "Control Code NC-14", "Library underground access frozen. Equipment Division passage requires secondary signature."],
  ["Interview Officer Note", "Selection Code AD-26", "Candidate reacts strongly to danger sources. Prioritize psychological stability assessment."],
];

const equipmentRecordsEn = [
  ["Alchemical Magazine", "Equipment Code K-17", "Mentor-only item. Students may not disassemble or inspect it privately."],
  ["Black Card Terminal", "Norma Auth Medium", "Used for tickets, courses, dormitory access, and temporary mission clearance."],
  ["Sealed Sample Vial", "Contamination Grade B", "Approach only after completing the Dragon History foundation unit."],
];

const courseScheduleEn = [
  ["Mon 08:30", "Dragon History", "Library East Wing / Required"],
  ["Wed 19:40", "Tactical Training", "Underground Range / Tardiness archived"],
  ["Fri 22:10", "Norma Clearance", "Online Terminal / Recording forbidden"],
];

const wordSpiritRecordsEn = [
  ["Sequence 001", "Imperial Command", "An extreme sample of bloodline pressure and mental command. Discussion allowed only in theory class."],
  ["Sequence 011", "Bronze Throne", "Reinforces bone, muscle, and impact resistance. Training requires dual mentor filing."],
  ["Sequence 030", "Royal Wind Thread", "High-speed airflow and cutting field. Candidates may only read incident reviews."],
  ["Sequence 059", "Sickle Weasel", "High-sensitivity hearing and scouting field. Commonly used in pre-mission search drills."],
  ["Sequence 089", "Blazing Fire", "A high-temperature combustion field. Practice rights are jointly restricted by Equipment and Execution."],
];

const campusRulesEn = [
  "Do not disclose academy entrances, courses, or mission records to ordinary people.",
  "Do not enter the Equipment Division, ice cellar, or library sealed areas without clearance.",
  "Do not challenge classmates or mentors using bloodline rating as leverage.",
  "Do not leave assigned areas after a Norma alert.",
];

const doctrineItemsEn = [
  { title: "The blood of kings must end by the sword", code: "DOCTRINE / OATH-01", text: "This is not a slogan. It is the first lesson given to freshmen: bloodline brings power, and also the risk that must be ended." },
  { title: "Word spirits are not talent shows", code: "DOCTRINE / WORD-02", text: "The academy treats word spirits as weapons, evidence, and disease. Any awakened ability must enter Norma's record." },
  { title: "Knowledge before glory", code: "DOCTRINE / HISTORY-03", text: "Dragon history is not folklore. It trains students to keep judgment before fear." },
  { title: "Mission before impulse", code: "DOCTRINE / EXEC-04", text: "The Execution Department permits courage, not loss of control. The closer to truth, the more the process matters." },
];


const academyModules: Array<{
  title: string;
  icon: LucideIcon;
  level: string;
  text: string;
}> = [
  {
    title: "执行部",
    icon: Crosshair,
    level: "高危外勤",
    text: "处理龙类事件、失控混血种与不可公开现场。纪律优先于个人判断。",
  },
  {
    title: "装备部",
    icon: FlaskConical,
    level: "管制实验",
    text: "研发炼金武器、战术载具与特殊弹药。申请记录会被永久留档。",
  },
  {
    title: "图书馆",
    icon: Library,
    level: "知识封存",
    text: "保存龙族历史、言灵目录与秘党旧案。阅读权限按血统与稳定性分级。",
  },
  {
    title: "校董会",
    icon: Gavel,
    level: "最高审议",
    text: "决定学院资金、任务边界与关键人员处置。多数会议不对学生公开。",
  },
  {
    title: "诺玛系统",
    icon: Brain,
    level: "全域监察",
    text: "持续监控学籍、课程、任务与异常波动。系统沉默通常比警报更值得注意。",
  },
  {
    title: "战术训练课",
    icon: Dumbbell,
    level: "必修",
    text: "近身、枪械、撤离与协同演练。缺席者将被重新评估任务资格。",
  },
  {
    title: "龙族历史课",
    icon: Landmark,
    level: "核心课程",
    text: "理解敌人、血统与秘党代价。课程不保证旁听者睡眠质量。",
  },
];

const terminalCards = [
  ["学籍状态", "候选人 / 预入学池", "同步于 04:32"],
  ["血统波动", "稳定上行 / 需复测", "诺玛建议：观察"],
  ["任务权限", "Level C 临时授权", "外勤需导师签字"],
  ["课程授权", "龙族历史、战术基础", "装备课待审"],
  ["校园通行等级", "图书馆东翼开放", "地下区封锁"],
];

const oathItems = [
  ["探索未知", "EXPLORARE"],
  ["理解世界", "INTELLIGERE"],
  ["守护和平", "PROTEGERE"],
  ["超越自我", "SUPERARE"],
];

const secretSocietyFiles = [
  ["秘党体系", "由古老家族、校董会与学院行动机构共同维持的隐秘秩序。候选人只被允许知道必要部分。"],
  ["血统谱系", "诺玛将记录血统波动、言灵诱发概率与失控风险。评级越高，备案越深。"],
  ["屠龙使命", "学院训练不是荣誉装饰，而是面向龙类复苏、混血种失控与异常事件的长期战争。"],
];

const missionBriefings = [
  ["执行部任务简报", "外勤编号 EX-09", "疑似龙类遗迹暴露，候选人只可参与后勤观察。"],
  ["校园封锁记录", "内控编号 NC-14", "图书馆地下区权限冻结，装备部通行需二次签名。"],
  ["面试官备注", "招生编号 AD-26", "候选人对危险源反应明显，建议优先安排心理稳定性评估。"],
];

const equipmentRecords = [
  ["炼金弹匣", "装备部临时编号 K-17", "仅限导师持有，学生不得私自拆检。"],
  ["黑卡终端", "诺玛认证介质", "用于车票、课程、宿舍与临时任务权限确认。"],
  ["封存样本瓶", "污染等级 B", "靠近前需完成龙族历史课基础单元。"],
];

const courseSchedule = [
  ["周一 08:30", "龙族历史课", "图书馆东翼 / 必修"],
  ["周三 19:40", "战术训练课", "地下训练场 / 迟到备案"],
  ["周五 22:10", "诺玛权限课", "线上终端 / 不允许录屏"],
];

const wordSpiritRecords = [
  ["序列 001", "皇帝", "血统威压与精神敕令的极端样本，只允许在理论课中讨论。"],
  ["序列 011", "青铜御座", "强化骨骼、肌肉与抗击打能力，训练场需双导师备案。"],
  ["序列 030", "风王之瞳", "高速气流与切割域，候选人只能阅读事故复盘。"],
  ["序列 059", "镰鼬", "高敏听觉与侦察域，常用于执行部前置搜索训练。"],
  ["序列 089", "君焰", "高温燃烧域，装备部与执行部共同限制实践权限。"],
];

const campusRules = [
  "不得向普通人透露学院入口、课程和任务记录。",
  "不得私自进入装备部、地下冰窖、图书馆封存区。",
  "不得以血统评级挑衅同级或导师。",
  "不得在诺玛警报后离开指定区域。",
];

const emblemSrc = `${import.meta.env.BASE_URL}cassell-world-tree-emblem.jpg`;
const sealedHeroSrc = `${import.meta.env.BASE_URL}hero-sealed-campus-generated.png`;
const invitationReferenceSrc = `${import.meta.env.BASE_URL}invitation-reference.png`;
const sealedLetterEnSrc = `${import.meta.env.BASE_URL}notice/sealed-letter-en-clean.png`;
const sealedLetterZhSrc = `${import.meta.env.BASE_URL}notice/sealed-letter-zh-clean.png`;
const admissionThemeSrc = `${import.meta.env.BASE_URL}audio/admission-theme.mp3`;
const swordManifestSrc = `${import.meta.env.BASE_URL}materials/processed/sword-oath.jpg`;
let admissionThemeAudio: HTMLAudioElement | null = null;

const doctrineItems = [
  {
    title: "凡王之血，必以剑终",
    code: "DOCTRINE / OATH-01",
    text: "这不是口号，而是秘党给新生上的第一堂课：血统带来力量，也带来必须被终结的风险。",
  },
  {
    title: "言灵不是天赋表演",
    code: "DOCTRINE / WORD-02",
    text: "学院把言灵视为武器、证据与病灶。任何能力觉醒都必须进入诺玛记录。",
  },
  {
    title: "知识先于荣誉",
    code: "DOCTRINE / HISTORY-03",
    text: "龙族历史课不是为了讲述传说，而是训练学生在恐惧前保持判断。",
  },
  {
    title: "任务高于冲动",
    code: "DOCTRINE / EXEC-04",
    text: "执行部允许勇气，但不奖励失控。越接近真相，越要服从流程。",
  },
];

const academyVisuals = [
  {
    title: "楚子航执行档案",
    code: "VIS-10 / ZIHANG",
    src: `${import.meta.env.BASE_URL}materials/processed/agent-chen.jpg`,
    text: "识别为冷色学生档案与执行部气质。归属判断：适合作为雨夜事件后的行动人员备案。",
  },
  {
    title: "恺撒精英样本",
    code: "VIS-11 / CAESAR",
    src: `${import.meta.env.BASE_URL}materials/processed/agent-caesar.jpg`,
    text: "识别为学院精英、社团领袖与贵族派系视觉。归属判断：适合放在校董会与学生组织档案。",
  },
  {
    title: "绘梨衣血统观察",
    code: "VIS-12 / ERI",
    src: `${import.meta.env.BASE_URL}materials/processed/agent-eri.jpg`,
    text: "识别为高危血统、孤立保护与纯白人物意象。归属判断：更适合“血统风险”而不是普通招生宣传。",
  },
  {
    title: "路明非候选人线索",
    code: "VIS-14 / MINGFEI",
    src: `${import.meta.env.BASE_URL}materials/processed/agent-mingfei.jpg`,
    text: "识别为被诺玛标记的候选人档案。归属判断：适合放入新生观察样本，不再挤在终端区重复展示。",
  },
];

const wordSpiritVisuals = [
  {
    title: "言灵排行总览",
    code: "VIS-03 / SPIRIT",
    src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-01-wide.jpg`,
    text: "言灵序列被诺玛归档为能力与风险并存的目录，候选人只允许阅读公开层级。",
  },
  {
    title: "言灵谱系上位段",
    code: "VIS-04 / SPIRIT",
    src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-02-wide.jpg`,
    text: "高位言灵牵涉血统稳定、领域压制与失控风险，进入课程前需完成基础备案。",
  },
  {
    title: "言灵风险观察",
    code: "VIS-05 / SPIRIT",
    src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-03-wide.jpg`,
    text: "诺玛按序列、触发条件与事故记录交叉标注，不把能力当成表演项目。",
  },
  {
    title: "炼金刀剑档案",
    code: "VIS-06 / ALCHEMY",
    src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-04-wide.jpg`,
    text: "识别为武器、火焰与古老序列感。归属判断：可并入装备部和七宗罪一类炼金武器课程。",
  },
  {
    title: "言灵课程封存页",
    code: "VIS-07 / SPIRIT",
    src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-05-wide.jpg`,
    text: "课程页只显示摘要，实践授权由血统评级、导师签名与诺玛记录共同决定。",
  },
];

const campusPlaces = [
  {
    title: "雨夜入学路线",
    code: "P2 + P14 / ARRIVAL ROUTE",
    src: `${import.meta.env.BASE_URL}materials/generated/cassell-arrival.png`,
    text: "把芝加哥转接、专列抵达与学院大门合并成一条入学动线，作为候选人从普通世界进入卡塞尔的第一幕。",
  },
  {
    title: "诺玛中央控制室",
    code: "P3 / NORMA CONTROL",
    src: `${import.meta.env.BASE_URL}materials/campus-cinematic/norma-control-room.jpg`,
    text: "负责权限、课程、异常警报与候选人档案同步。它不再只是截图，而是空间档案里的系统中枢。",
  },
  {
    title: "冰窖封存区",
    code: "P5 / ICE CELLAR",
    src: `${import.meta.env.BASE_URL}materials/campus-cinematic/ice-cellar.jpg`,
    text: "危险样本、禁忌文献与失控记录集中封存，普通新生只会在诺玛终端看到它的权限影子。",
  },
  {
    title: "装备部管制层",
    code: "P10-P11 / EQUIPMENT",
    src: `${import.meta.env.BASE_URL}materials/campus-cinematic/equipment-department-01.jpg`,
    text: "炼金武器、弹药与非公开课程的实际所在地。空间气质更偏实验室与军械库，而不是普通校舍。",
  },
  {
    title: "校长办公室",
    code: "P12 / PRINCIPAL OFFICE",
    src: `${import.meta.env.BASE_URL}materials/campus-cinematic/principal-office.jpg`,
    text: "密函签发、校董会压力与昂热校长权限的交汇点，适合作为空间档案的最后一道人工判断。",
  },
];

const campusNodes = [
  ["P1", "学院鸟瞰", "作为本栏背景保留，用来建立山中学院、封闭边界与地下系统的整体尺度。"],
  ["P4", "守夜人论坛", "改为信息节点，不再单独占用图片卡，避免论坛截图破坏学院空间感。"],
  ["P6", "安铂馆", "归入社交与校董会动线，适合在学院介绍和秘党档案之间作为文字线索。"],
  ["P7", "诺顿馆", "归入龙族历史课程与馆舍命名体系，不再重复展示相近建筑卡。"],
  ["P8", "卡塞尔食堂", "保留为日常生活节点，用文字补足真实校园感。"],
  ["P9", "英灵殿", "转入教学理念与牺牲叙事，不再挤进空间图片墙。"],
  ["P13", "地下剖面图", "已从页面删除，只保留为诺玛权限和冰窖封锁的背景设定。"],
];

const academyModulesEn: Array<{ title: string; icon: LucideIcon; level: string; text: string }> = [
  { title: "Execution Department", icon: Crosshair, level: "High-risk field work", text: "Handles dragon incidents, unstable hybrids, and non-public scenes. Discipline precedes personal judgment." },
  { title: "Equipment Division", icon: FlaskConical, level: "Controlled experiments", text: "Develops alchemical weapons, tactical vehicles, and special ammunition. Applications are permanently archived." },
  { title: "Library", icon: Library, level: "Sealed knowledge", text: "Stores dragon history, word-spirit catalogs, and old secret party files. Reading clearance is graded by bloodline and stability." },
  { title: "Board of Trustees", icon: Gavel, level: "Highest review", text: "Decides academy funds, mission boundaries, and key personnel handling. Most meetings are closed to students." },
  { title: "Norma System", icon: Brain, level: "Full-domain watch", text: "Monitors enrollment, courses, missions, and abnormal fluctuations. Norma's silence is often more important than an alarm." },
  { title: "Tactical Training", icon: Dumbbell, level: "Required", text: "Close combat, firearms, evacuation, and coordination drills. Absences trigger mission qualification review." },
  { title: "Dragon History", icon: Landmark, level: "Core course", text: "Understand enemies, bloodline, and the cost of the secret party. The course does not guarantee peaceful sleep." },
];

const academyVisualsEn = [
  { title: "Chu Zihang Execution File", code: "VIS-10 / ZIHANG", src: `${import.meta.env.BASE_URL}materials/processed/agent-chen.jpg`, text: "Identified as a cold student file with Execution Department temperament. Suitable for post-rain incident action personnel records." },
  { title: "Caesar Elite Sample", code: "VIS-11 / CAESAR", src: `${import.meta.env.BASE_URL}materials/processed/agent-caesar.jpg`, text: "Identified as academy elite, society leader, and noble faction visual. Suitable for board and student organization files." },
  { title: "Eri Bloodline Observation", code: "VIS-12 / ERI", src: `${import.meta.env.BASE_URL}materials/processed/agent-eri.jpg`, text: "Identified as a high-risk bloodline and protected subject image. Better suited to bloodline risk than public recruitment." },
  { title: "Lu Mingfei Candidate Trace", code: "VIS-14 / MINGFEI", src: `${import.meta.env.BASE_URL}materials/processed/agent-mingfei.jpg`, text: "Identified as a candidate marked by Norma. Suitable for freshman observation samples without repeating in the terminal section." },
];

const wordSpiritVisualsEn = [
  { title: "Word Spirit Ranking Overview", code: "VIS-03 / SPIRIT", src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-01-wide.jpg`, text: "Word-spirit sequences are archived by Norma as a catalog of ability and risk. Candidates may read only public tiers." },
  { title: "Upper Sequence Segment", code: "VIS-04 / SPIRIT", src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-02-wide.jpg`, text: "High-ranking word spirits involve bloodline stability, field suppression, and loss-of-control risk." },
  { title: "Word Spirit Risk Observation", code: "VIS-05 / SPIRIT", src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-03-wide.jpg`, text: "Norma cross-marks sequences, trigger conditions, and incident records. Abilities are never treated as performance." },
  { title: "Alchemical Blade File", code: "VIS-06 / ALCHEMY", src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-04-wide.jpg`, text: "Recognized as a weapon, flame, and ancient sequence file. It may be merged into Equipment Division course records." },
  { title: "Word Spirit Course Cover", code: "VIS-07 / SPIRIT", src: `${import.meta.env.BASE_URL}materials/processed/spirit-top-05-wide.jpg`, text: "Only summaries are shown. Practice clearance is decided by bloodline rating, mentor signature, and Norma record." },
];

const campusPlacesEn = [
  { title: "Rain-night Arrival Route", code: "P2 + P14 / ARRIVAL ROUTE", src: `${import.meta.env.BASE_URL}materials/generated/cassell-arrival.png`, text: "Combines Chicago transfer, special train arrival, and the academy gate into the first scene where a candidate leaves the ordinary world." },
  { title: "Norma Central Control", code: "P3 / NORMA CONTROL", src: `${import.meta.env.BASE_URL}materials/campus-cinematic/norma-control-room.jpg`, text: "Synchronizes clearance, courses, alerts, and candidate files. It is the system core of the spatial archive." },
  { title: "Ice Cellar Sealed Area", code: "P5 / ICE CELLAR", src: `${import.meta.env.BASE_URL}materials/campus-cinematic/ice-cellar.jpg`, text: "Dangerous samples, forbidden documents, and loss-of-control records are sealed here. Freshmen see only its permission shadow." },
  { title: "Equipment Control Floor", code: "P10-P11 / EQUIPMENT", src: `${import.meta.env.BASE_URL}materials/campus-cinematic/equipment-department-01.jpg`, text: "Alchemical weapons, ammunition, and restricted courses live here. The space feels more like a lab and arsenal than a dormitory." },
  { title: "Principal's Office", code: "P12 / PRINCIPAL OFFICE", src: `${import.meta.env.BASE_URL}materials/campus-cinematic/principal-office.jpg`, text: "The crossing point of sealed letters, board pressure, and principal clearance. It is the final human judgment in the archive." },
];

const campusNodesEn = [
  ["P1", "Academy Aerial", "Kept as the section background to establish the scale of the mountain academy, sealed boundary, and underground system."],
  ["P4", "Night Watch Forum", "Changed to an information node instead of a standalone image card to preserve spatial focus."],
  ["P6", "Amber Hall", "Folded into social and board movement routes, serving as a textual clue between academy and secret society archives."],
  ["P7", "Norton Hall", "Merged with dragon history courses and building nomenclature, avoiding repeated architecture cards."],
  ["P8", "Cassell Dining Hall", "Kept as a daily-life node to add credible campus texture through text."],
  ["P9", "Valhalla", "Moved into teaching doctrine and sacrifice narrative rather than crowding the spatial image wall."],
  ["P13", "Underground Section", "Removed from the page and retained only as a Norma clearance and ice-cellar setting."],
];

const questionsEn: Question[] = [
  { title: "You feel watched in an unfamiliar district, but see no visible source.", brief: "Norma is marking danger intuition and bloodline perception.", answers: [
    { label: "Record the environment and leave", detail: "Preserve evidence first and avoid meaningless contact.", scores: { blood: 2, execution: 3, stability: 3, danger: 1 } },
    { label: "Actively search for the source", detail: "You prefer confirming threats before they approach.", scores: { blood: 4, execution: 3, stability: 1, danger: 3 } },
    { label: "Ignore the feeling", detail: "You trust only visible facts and reject abnormal judgment.", scores: { blood: 0, execution: 1, stability: 4, danger: 0 } },
    { label: "Create chaos to test reactions", detail: "Aggressive strategy with unpredictable side effects.", scores: { blood: 3, execution: 2, stability: 0, danger: 5 } },
  ]},
  { title: "An interviewer orders an immediate evacuation without explanation.", brief: "Command-chain compliance is being checked.", answers: [
    { label: "Obey, then ask later", detail: "You accept field command priority.", scores: { blood: 1, execution: 5, stability: 3, danger: 1 } },
    { label: "Request explanation first", detail: "You retain judgment but may miss the window.", scores: { blood: 1, execution: 2, stability: 4, danger: 1 } },
    { label: "Watch what others do", detail: "You reduce risk through group feedback.", scores: { blood: 0, execution: 1, stability: 3, danger: 0 } },
    { label: "Refuse and take control", detail: "Control desire increases mission accident probability.", scores: { blood: 3, execution: 2, stability: 0, danger: 5 } },
  ]},
  { title: "You first see biological remains that cannot be explained.", brief: "Psychological stability and unknown-response are being read.", answers: [
    { label: "Isolate and photograph the scene", detail: "Your process awareness is clear.", scores: { blood: 2, execution: 4, stability: 4, danger: 1 } },
    { label: "Approach and sample it", detail: "High curiosity, with rising contamination risk.", scores: { blood: 4, execution: 3, stability: 1, danger: 4 } },
    { label: "Call public emergency services", detail: "Public-system involvement may expand exposure.", scores: { blood: 0, execution: 1, stability: 3, danger: 1 } },
    { label: "Destroy the remains", detail: "Decisive but unauthorized.", scores: { blood: 2, execution: 2, stability: 1, danger: 5 } },
  ]},
  { title: "A companion shows signs of losing control during a mission.", brief: "Sacrifice judgment and boundary awareness are being assessed.", answers: [
    { label: "Call support and restrict movement", detail: "You prioritize life and scene control.", scores: { blood: 1, execution: 4, stability: 5, danger: 1 } },
    { label: "Continue the mission and monitor", detail: "Mission priority, but risk accumulates.", scores: { blood: 3, execution: 4, stability: 2, danger: 3 } },
    { label: "Abort the mission immediately", detail: "Conservative choice lowers loss but may miss the target.", scores: { blood: 0, execution: 2, stability: 4, danger: 0 } },
    { label: "Apply the worst-case protocol", detail: "You can act, and Norma will record it.", scores: { blood: 4, execution: 5, stability: 0, danger: 5 } },
  ]},
  { title: "You are assigned a course that will never appear on the public schedule.", brief: "Rule acceptance is being verified.", answers: [
    { label: "Attend on time and stay silent", detail: "You understand internal order.", scores: { blood: 1, execution: 5, stability: 4, danger: 1 } },
    { label: "Ask why the course exists", detail: "You need rationale to maintain trust.", scores: { blood: 1, execution: 3, stability: 4, danger: 1 } },
    { label: "Ask friends for clues", detail: "Information spread harms secrecy.", scores: { blood: 0, execution: 1, stability: 3, danger: 2 } },
    { label: "Try to bypass clearance", detail: "Norma has flagged this behavior.", scores: { blood: 3, execution: 2, stability: 0, danger: 5 } },
  ]},
  { title: "During training, your reaction to danger is abnormally fast.", brief: "Bloodline potential is being sampled again.", answers: [
    { label: "Report the abnormality", detail: "Transparent records reduce later misjudgment.", scores: { blood: 4, execution: 3, stability: 4, danger: 1 } },
    { label: "Hide it and observe limits", detail: "Active bloodline, lowered trust metric.", scores: { blood: 5, execution: 2, stability: 1, danger: 4 } },
    { label: "Reduce training intensity", detail: "Clear self-protection.", scores: { blood: 2, execution: 1, stability: 4, danger: 0 } },
    { label: "Challenge harder drills", detail: "Growth rises; so does accident probability.", scores: { blood: 5, execution: 4, stability: 1, danger: 4 } },
  ]},
  { title: "You receive an admission letter showing only your name abbreviation.", brief: "The sealed entrance is identifying you.", answers: [
    { label: "Verify the source before opening", detail: "You accept the abnormal without abandoning caution.", scores: { blood: 2, execution: 4, stability: 5, danger: 1 } },
    { label: "Open it immediately", detail: "Instinct first, protection insufficient.", scores: { blood: 3, execution: 2, stability: 1, danger: 3 } },
    { label: "Delete the message", detail: "You reject the unknown entrance.", scores: { blood: 0, execution: 1, stability: 4, danger: 0 } },
    { label: "Trace the sender node", detail: "Technical impulse with clearance risk.", scores: { blood: 2, execution: 3, stability: 2, danger: 4 } },
  ]},
  { title: "The mission objective conflicts with ordinary people's safety.", brief: "Mission fit and ethical boundaries are being analyzed together.", answers: [
    { label: "Request a route adjustment", detail: "You try to preserve both objective and public safety.", scores: { blood: 1, execution: 4, stability: 5, danger: 1 } },
    { label: "Protect ordinary people first", detail: "High stability; uncertain mission completion.", scores: { blood: 0, execution: 2, stability: 5, danger: 0 } },
    { label: "Complete the mission first", detail: "Execution may understand; psychology will review.", scores: { blood: 3, execution: 5, stability: 1, danger: 4 } },
    { label: "Take all consequences alone", detail: "Personal-hero tendency is obvious; unsupervised action is unsuitable.", scores: { blood: 4, execution: 3, stability: 0, danger: 5 } },
  ]},
];


const questions: Question[] = [
  {
    title: "你在陌生街区感到被注视，但没有任何可见来源。",
    brief: "诺玛正在标记危险直觉与血统感知。",
    answers: [
      {
        label: "记录环境并离开",
        detail: "优先保留证据，避免无意义接触。",
        scores: { blood: 2, execution: 3, stability: 3, danger: 1 },
      },
      {
        label: "主动寻找来源",
        detail: "你倾向确认威胁，而不是等待威胁靠近。",
        scores: { blood: 4, execution: 3, stability: 1, danger: 3 },
      },
      {
        label: "忽略感觉",
        detail: "你相信可见事实，排斥异常判断。",
        scores: { blood: 0, execution: 1, stability: 4, danger: 0 },
      },
      {
        label: "制造混乱测试反应",
        detail: "策略激进，副作用不可预测。",
        scores: { blood: 3, execution: 2, stability: 0, danger: 5 },
      },
    ],
  },
  {
    title: "面试官要求你立即服从一条原因不明的撤离指令。",
    brief: "命令链服从度正在校验。",
    answers: [
      {
        label: "执行，事后追问",
        detail: "你承认现场命令优先级。",
        scores: { blood: 1, execution: 5, stability: 3, danger: 1 },
      },
      {
        label: "要求解释后再行动",
        detail: "你保留独立判断，但可能错过窗口。",
        scores: { blood: 1, execution: 2, stability: 4, danger: 1 },
      },
      {
        label: "观察其他人行动",
        detail: "你倾向以群体反馈降低风险。",
        scores: { blood: 0, execution: 1, stability: 3, danger: 0 },
      },
      {
        label: "拒绝并接管现场",
        detail: "强控制欲会提升任务事故概率。",
        scores: { blood: 3, execution: 2, stability: 0, danger: 5 },
      },
    ],
  },
  {
    title: "你第一次看到无法解释的生物残骸。",
    brief: "心理稳定性与未知反应正在读取。",
    answers: [
      {
        label: "隔离现场并拍照",
        detail: "流程意识清晰。",
        scores: { blood: 2, execution: 4, stability: 4, danger: 1 },
      },
      {
        label: "靠近采样",
        detail: "探索倾向强，污染风险同步上升。",
        scores: { blood: 4, execution: 3, stability: 1, danger: 4 },
      },
      {
        label: "立刻报警",
        detail: "公共系统介入可能扩大暴露。",
        scores: { blood: 0, execution: 1, stability: 3, danger: 1 },
      },
      {
        label: "销毁残骸",
        detail: "果断但缺乏授权。",
        scores: { blood: 2, execution: 2, stability: 1, danger: 5 },
      },
    ],
  },
  {
    title: "同伴在任务中出现失控征兆。",
    brief: "牺牲判断与边界意识正在评估。",
    answers: [
      {
        label: "呼叫支援并限制行动",
        detail: "你优先保留同伴生命与现场控制。",
        scores: { blood: 1, execution: 4, stability: 5, danger: 1 },
      },
      {
        label: "继续任务，保持监视",
        detail: "任务优先，但风险累积。",
        scores: { blood: 3, execution: 4, stability: 2, danger: 3 },
      },
      {
        label: "立即终止任务",
        detail: "保守决策降低损失，也可能错失目标。",
        scores: { blood: 0, execution: 2, stability: 4, danger: 0 },
      },
      {
        label: "按最坏预案处理",
        detail: "你能下手，但诺玛会记录这件事。",
        scores: { blood: 4, execution: 5, stability: 0, danger: 5 },
      },
    ],
  },
  {
    title: "你被分配到一门不会公开写入课表的课程。",
    brief: "规则接受度正在校验。",
    answers: [
      {
        label: "按时到场，不传播",
        detail: "你理解学院内部秩序。",
        scores: { blood: 1, execution: 5, stability: 4, danger: 1 },
      },
      {
        label: "询问课程目的",
        detail: "你需要合理解释来维持信任。",
        scores: { blood: 1, execution: 3, stability: 4, danger: 1 },
      },
      {
        label: "向朋友求证",
        detail: "信息扩散倾向不利于保密。",
        scores: { blood: 0, execution: 1, stability: 3, danger: 2 },
      },
      {
        label: "尝试破解权限",
        detail: "诺玛已标红该行为。",
        scores: { blood: 3, execution: 2, stability: 0, danger: 5 },
      },
    ],
  },
  {
    title: "训练中你发现自己对危险动作反应异常迅速。",
    brief: "血统潜能正在二次采样。",
    answers: [
      {
        label: "主动报告异常",
        detail: "透明记录降低后续误判。",
        scores: { blood: 4, execution: 3, stability: 4, danger: 1 },
      },
      {
        label: "隐藏能力观察边界",
        detail: "血统活跃，但信任指标下降。",
        scores: { blood: 5, execution: 2, stability: 1, danger: 4 },
      },
      {
        label: "减少训练强度",
        detail: "自我保护明确。",
        scores: { blood: 2, execution: 1, stability: 4, danger: 0 },
      },
      {
        label: "挑战更高难度",
        detail: "成长速度提升，事故概率同样提升。",
        scores: { blood: 5, execution: 4, stability: 1, danger: 4 },
      },
    ],
  },
  {
    title: "你收到一份只显示你姓名缩写的入学密邮。",
    brief: "机密入口识别正在运行。",
    answers: [
      {
        label: "验证源头后打开",
        detail: "你能接受异常，但不放弃审慎。",
        scores: { blood: 2, execution: 4, stability: 5, danger: 1 },
      },
      {
        label: "立即打开",
        detail: "直觉优先，防护不足。",
        scores: { blood: 3, execution: 2, stability: 1, danger: 3 },
      },
      {
        label: "删除邮件",
        detail: "你拒绝未知入口。",
        scores: { blood: 0, execution: 1, stability: 4, danger: 0 },
      },
      {
        label: "追踪发送节点",
        detail: "技术倾向明显，权限风险上升。",
        scores: { blood: 2, execution: 3, stability: 2, danger: 4 },
      },
    ],
  },
  {
    title: "任务目标与普通人的安全发生冲突。",
    brief: "任务适配度与伦理边界正在合并分析。",
    answers: [
      {
        label: "请求调整任务路径",
        detail: "你尝试同时保全目标与公众。",
        scores: { blood: 1, execution: 4, stability: 5, danger: 1 },
      },
      {
        label: "优先保护普通人",
        detail: "稳定性高，任务完成率不确定。",
        scores: { blood: 0, execution: 2, stability: 5, danger: 0 },
      },
      {
        label: "优先完成任务",
        detail: "执行部会理解，心理部门会复查。",
        scores: { blood: 3, execution: 5, stability: 1, danger: 4 },
      },
      {
        label: "独自承担全部后果",
        detail: "个人英雄倾向明显，不适合无监督行动。",
        scores: { blood: 4, execution: 3, stability: 0, danger: 5 },
      },
    ],
  },
];

function sumScores(selected: number[]) {
  return selected.reduce<Record<Dimension, number>>(
    (total, answerIndex, questionIndex) => {
      const scores = questions[questionIndex].answers[answerIndex]?.scores;
      if (!scores) return total;
      total.blood += scores.blood;
      total.execution += scores.execution;
      total.stability += scores.stability;
      total.danger += scores.danger;
      return total;
    },
    { blood: 0, execution: 0, stability: 0, danger: 0 },
  );
}

function makeResult(selected: number[], language: SiteLanguage): Result {
  const scores = sumScores(selected);
  const grade = scores.blood >= 29 ? "S" : scores.blood >= 22 ? "A" : scores.blood >= 14 ? "B" : "C";
  const stabilityIndex = Math.max(18, Math.min(98, Math.round((scores.stability / 36) * 100 - scores.danger * 0.8)));
  const missionFit = Math.max(
    12,
    Math.min(99, Math.round(scores.execution * 2.3 + scores.blood * 1.1 - scores.danger * 0.7 + 12)),
  );
  const departmentKey =
    scores.execution >= 29 && scores.danger <= 22
      ? "execution"
      : scores.danger >= 27
        ? "tactical"
        : scores.stability >= 30
          ? "archive"
          : "equipment";
  const departmentMap = {
    zh: {
      execution: "执行部",
      tactical: "战术分析组",
      archive: "档案馆",
      equipment: "装备部",
    },
    en: {
      execution: "Execution Department",
      tactical: "Tactical Analysis Unit",
      archive: "Archive Division",
      equipment: "Equipment Division",
    },
  };
  const riskKey =
    grade === "S" ? "highBlood" : scores.danger >= 27 ? "highDanger" : stabilityIndex < 55 ? "lowStability" : "pool";
  const riskNoteMap = {
    zh: {
      highBlood: "血统响应极强，建议限制单独外勤；高潜能不等同于低风险。",
      highDanger: "危险倾向偏高，需导师监护与心理复测。",
      lowStability: "稳定指数不足，暂缓高压任务授权。",
      pool: "可进入预入学池，持续观察血统波动。",
    },
    en: {
      highBlood: "Bloodline response is extremely strong. Solo field work should be restricted; high potential is not low risk.",
      highDanger: "Danger tendency is elevated. Mentor supervision and psychological retesting are required.",
      lowStability: "Stability index is insufficient. High-pressure mission clearance is deferred.",
      pool: "Candidate may enter the pre-enrollment pool while bloodline fluctuation remains under observation.",
    },
  };
  const department = departmentMap[language][departmentKey];
  const riskNote = riskNoteMap[language][riskKey];
  const seed = selected.map((value) => value + 1).join("");
  const issueDate = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return {
    grade,
    department,
    stabilityIndex,
    missionFit,
    riskNote,
    applicantCode: `CND-${seed.slice(0, 4)}-${Math.max(101, scores.blood * 7 + scores.execution)}`,
    admissionId: `CC-${new Date().getFullYear()}-${seed}-${scores.danger + 17}`,
    issueDate,
    bloodScore: scores.blood,
    dangerScore: scores.danger,
  };
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function drawWorldTreeMark(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  ctx.save();
  ctx.fillStyle = "#123f33";
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(3, radius * 0.04);
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.02, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.76, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineCap = "round";
  ctx.lineWidth = radius * 0.1;
  ctx.beginPath();
  ctx.moveTo(x, y + radius * 0.48);
  ctx.lineTo(x, y - radius * 0.2);
  ctx.stroke();
  const branches = [
    [-0.06, -0.18, -0.48, -0.54],
    [0.06, -0.18, 0.48, -0.54],
    [-0.02, 0.02, -0.62, -0.06],
    [0.02, 0.02, 0.62, -0.06],
    [0, -0.24, 0, -0.68],
    [0, 0.54, -0.42, 0.72],
    [0, 0.54, 0.42, 0.72],
  ];
  branches.forEach(([sx, sy, ex, ey]) => {
    ctx.beginPath();
    ctx.moveTo(x + sx * radius, y + sy * radius);
    ctx.lineTo(x + ex * radius, y + ey * radius);
    ctx.stroke();
    if (ey < 0.2) {
      ctx.beginPath();
      ctx.arc(x + ex * radius, y + ey * radius, radius * 0.07, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.lineWidth = radius * 0.045;
  ctx.beginPath();
  ctx.moveTo(x - radius * 0.52, y + radius * 0.55);
  ctx.bezierCurveTo(x - radius * 0.18, y + radius * 0.74, x + radius * 0.18, y + radius * 0.74, x + radius * 0.52, y + radius * 0.55);
  ctx.stroke();
  ctx.font = `${Math.max(10, radius * 0.14)}px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.fillText("CASSELL", x, y + radius * 0.93);
  ctx.restore();
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  let line = "";
  const segments = text.includes(" ") ? text.split(" ") : Array.from(text);
  const joiner = text.includes(" ") ? " " : "";
  segments.forEach((segment) => {
    const next = line ? `${line}${joiner}${segment}` : segment;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = segment;
      y += lineHeight;
      return;
    }
    line = next;
  });
  if (line) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function getNoticeCopy(result: Result, language: NoticeLanguage) {
  if (language === "zh") {
    return {
      seal: "诺玛入学密函",
      paperTitle: "致被诺玛标记之人：",
      paperLines: [
        "谨以卡塞尔学院与秘党评议之名，",
        "确认你血脉中的异常回响已被诺玛记录。",
        "你被召请越过普通世界的边界，",
        `以 ${result.grade} 级候选权限进入预入学序列。`,
      ],
      lowerLines: [
        `密函编号：${result.admissionId}`,
        "请持黑卡权限抵达芝加哥，不得向未标记者展示此函。",
        "卡塞尔不召唤旁观者，只召唤愿意拔剑的人。",
      ],
      signature: "希尔伯特·让·昂热",
      signatureTitle: "卡塞尔学院校长",
    };
  }

  return {
    seal: "NORMA SEALED FILE",
    paperTitle: "To the Marked Candidate,",
    paperLines: [
      "By authority of Cassell College,",
      "Norma has confirmed the mark in your blood.",
      "You are summoned beyond the ordinary world,",
      `under Grade ${result.grade} candidate clearance.`,
    ],
    lowerLines: [
      `Sealed File: ${result.admissionId}`,
      "Arrive in Chicago under Black Card clearance. Reveal this letter to no unmarked eyes.",
      "Cassell does not call spectators, but those willing to draw the sword.",
    ],
    signature: "Hilbert Ron Anjou",
    signatureTitle: "Principal of Cassell College",
  };
}

function App() {
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const previewMode = searchParams?.get("preview") ?? null;
  const previewSection = searchParams?.get("section") ?? null;
  const previewLanguage: NoticeLanguage = searchParams?.get("lang") === "zh" ? "zh" : "en";
  const previewSectionClass = previewSection ? ` app-preview-${previewSection}` : "";
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(Boolean(previewMode));
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [noticeLanguage, setNoticeLanguage] = useState<NoticeLanguage>(previewLanguage);
  const [siteLanguage, setSiteLanguage] = useState<SiteLanguage>("zh");
  const copy = siteCopy[siteLanguage];
  const content = {
    processSteps: siteLanguage === "zh" ? processSteps : processStepsEn,
    academyModules: siteLanguage === "zh" ? academyModules : academyModulesEn,
    terminalCards: siteLanguage === "zh" ? terminalCards : terminalCardsEn,
    oathItems: siteLanguage === "zh" ? oathItems : oathItemsEn,
    secretSocietyFiles: siteLanguage === "zh" ? secretSocietyFiles : secretSocietyFilesEn,
    missionBriefings: siteLanguage === "zh" ? missionBriefings : missionBriefingsEn,
    equipmentRecords: siteLanguage === "zh" ? equipmentRecords : equipmentRecordsEn,
    courseSchedule: siteLanguage === "zh" ? courseSchedule : courseScheduleEn,
    wordSpiritRecords: siteLanguage === "zh" ? wordSpiritRecords : wordSpiritRecordsEn,
    campusRules: siteLanguage === "zh" ? campusRules : campusRulesEn,
    doctrineItems: siteLanguage === "zh" ? doctrineItems : doctrineItemsEn,
    academyVisuals: siteLanguage === "zh" ? academyVisuals : academyVisualsEn,
    wordSpiritVisuals: siteLanguage === "zh" ? wordSpiritVisuals : wordSpiritVisualsEn,
    campusPlaces: siteLanguage === "zh" ? campusPlaces : campusPlacesEn,
    campusNodes: siteLanguage === "zh" ? campusNodes : campusNodesEn,
    questions: siteLanguage === "zh" ? questions : questionsEn,
  };
  const [selected, setSelected] = useState<number[]>(previewMode === "complete" ? Array(questions.length).fill(0) : []);
  const isComplete = selected.length === content.questions.length;
  const result = useMemo(() => (isComplete ? makeResult(selected, siteLanguage) : null), [isComplete, selected, siteLanguage]);
  const progress = Math.round((selected.length / content.questions.length) * 100);
  const activeQuestion = content.questions[currentQuestion];

  useEffect(() => {
    document.title = copy.brand;
  }, [copy.brand]);

  useEffect(() => {
    if (!previewMode) return;
    const scrollToPreviewTarget = () => {
      const target = previewSection || window.location.hash.slice(1);
      const element = target ? document.getElementById(target) : null;
      if (element) window.scrollTo(0, Math.max(0, element.offsetTop - 76));
    };
    window.setTimeout(scrollToPreviewTarget, 350);
    window.setTimeout(scrollToPreviewTarget, 1600);
  }, [previewMode, previewSection]);

  const answerQuestion = (answerIndex: number) => {
    const next = [...selected];
    next[currentQuestion] = answerIndex;
    setSelected(next);
    if (currentQuestion < content.questions.length - 1) {
      window.setTimeout(() => setCurrentQuestion((question) => question + 1), 180);
    }
  };

  const resetTest = () => {
    setSelected([]);
    setCurrentQuestion(0);
    setIsEnvelopeOpen(true);
    setIsEnvelopeOpening(false);
    scrollToSection("assessment");
  };

  const openEnvelope = () => {
    if (isEnvelopeOpening || isEnvelopeOpen) return;
    setIsEnvelopeOpening(true);
    const audio = admissionThemeAudio ?? new Audio(admissionThemeSrc);
    admissionThemeAudio = audio;
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;
    void audio.play().catch(() => undefined);
    window.setTimeout(() => {
      setIsEnvelopeOpen(true);
      setIsEnvelopeOpening(false);
    }, 2600);
  };

  const downloadNotice = async () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = noticeLanguage === "zh" ? sealedLetterZhSrc : sealedLetterEnSrc;
    link.download = `${result.admissionId}-${noticeLanguage === "zh" ? "录取密函-中文" : "sealed-letter-en"}.png`;
    link.click();
  };

  const printNotice = () => {
    if (!result) return;
    window.print();
  };

  return (
    <div className={`app theme-archive ${isEnvelopeOpen ? "app-opened" : "app-sealed"}${previewSection ? ` app-preview${previewSectionClass}` : ""}`}>
      <header className="topbar">
        <button className="brand" onClick={() => scrollToSection("hero")} aria-label={copy.backHome}>
          <img src={emblemSrc} alt="" />
          <span>{copy.brand}</span>
        </button>
        <nav aria-label={copy.navLabel}>
          {navItems.map(({ zh, en, id }) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {siteLanguage === "zh" ? zh : en}
            </button>
          ))}
        </nav>
        <button
          className="site-language-toggle"
          type="button"
          aria-label={copy.languageLabel}
          aria-pressed={siteLanguage === "en"}
          onClick={() => setSiteLanguage((language) => (language === "zh" ? "en" : "zh"))}
        >
          中文/English
        </button>
      </header>

      <main>
        <section
          id="hero"
          className="hero hero-cinematic"
          style={{ ["--hero-bg" as string]: `url(${sealedHeroSrc})` }}
        >
          {!isEnvelopeOpen ? (
            <div className="sealed-gate section-shell">
              <div className="sealed-meta">
                <img src={emblemSrc} alt="" />
                <span>{copy.sealedMeta}</span>
                <strong>{copy.fileNo}</strong>
              </div>
              <div className={`envelope-stage ${isEnvelopeOpening ? "envelope-stage-opening" : ""}`} aria-label="未开封入学密函">
                <div className="envelope-card">
                  <div className="envelope-flap" />
                  <div className="envelope-body">
                    <img src={emblemSrc} alt="" />
                    <span>CONFIDENTIAL</span>
                    <h1>{copy.brand}</h1>
                    <p>{copy.sealedIntro}</p>
                    <button className="open-envelope-button" onClick={openEnvelope} disabled={isEnvelopeOpening}>
                      <MailOpen size={20} />
                      {isEnvelopeOpening ? copy.opening : copy.openLetter}
                    </button>
                  </div>
                  <div className="wax-lock">CC</div>
                </div>
                {isEnvelopeOpening && (
                  <div className="opening-bridge" aria-hidden="true">
                    <div className="opening-paper">
                      <span>Norma has marked your file</span>
                      <strong>BLACK CARD CLEARANCE</strong>
                    </div>
                    <div className="opening-scan" />
                    <div className="opening-readout">
                      <span>NORMA LINK ESTABLISHED</span>
                      <span>Candidate route: Chicago / Cassell</span>
                      <span>Sealed file unfolding</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="sealed-status">
                <span>{copy.statusOpen}</span>
                <span>{copy.candidateClearance}</span>
                <span>{copy.normaWaiting}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="hero-inner section-shell">
                <div className="admission-poster">
              <div className="poster-topline">
                <img src={emblemSrc} alt="" />
                <div>
                  <span>CASSELL COLLEGE</span>
                  <strong>{copy.brand}</strong>
                </div>
              </div>
              <h1>{copy.heroTitle}</h1>
              <p>{copy.heroIntro}</p>
              <div className="poster-quote">{copy.heroQuote}</div>
              <div className="hero-actions">
                <button className="primary-action" onClick={() => scrollToSection("assessment")}>
                  <ScanLine size={18} />
                  {copy.startAssessment}
                </button>
                <button className="secondary-action" onClick={() => scrollToSection("process")}>
                  <ClipboardCheck size={18} />
                  {copy.viewProcess}
                </button>
                <button className="ghost-action" onClick={() => scrollToSection("terminal")}>
                  <Terminal size={18} />
                  {copy.enterArchive}
                </button>
              </div>
                </div>

                <aside className="norma-panel" aria-label="诺玛机密终端">
              <div className="norma-panel-head">
                <LockKeyhole size={18} />
                <span>NORMA / ADMISSION LINK</span>
              </div>
              <div className="norma-scan">
                <img src={emblemSrc} alt="" />
                <span className="scan-line" />
              </div>
              <div className="terminal-readout">
                <span>{copy.statusOpen}</span>
                <span>{copy.fileNumberShort}</span>
                <span>{copy.normaListening}</span>
                <span>{copy.candidateClearance}</span>
              </div>
              <div className="dossier-strip" aria-label="首屏机密状态">
                <span>{copy.candidatePending}</span>
                <span>{copy.internalClearance}</span>
                <span>{copy.missionDirection}</span>
              </div>
                </aside>
              </div>
              <div className="oath-bar section-shell">
                {content.oathItems.map(([title, subtitle]) => (
                  <div key={title}>
                    <span>{title}</span>
                    <strong>{subtitle}</strong>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {isEnvelopeOpen && (
          <>
        <section id="process" className="section-shell process-section">
          <div className="section-heading">
            <span>ADMISSION DOSSIER</span>
            <h2>{copy.processTitle}</h2>
            <p>{copy.processText}</p>
          </div>
          <div className="process-grid">
            {content.processSteps.map(([index, title, status, detail]) => (
              <article className="process-row" key={index}>
                <div className="process-index">{index}</div>
                <div>
                  <div className="row-title">
                    <h3>{title}</h3>
                    <span>{status}</span>
                  </div>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="academy" className="academy-section">
          <div className="section-shell">
            <div className="section-heading">
              <span>CAMPUS CLEARANCE</span>
              <h2>{copy.academyTitle}</h2>
              <p>{copy.academyText}</p>
            </div>
            <div className="academy-grid">
              {content.academyModules.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="academy-module" key={item.title}>
                    <div className="module-icon">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span>{item.level}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="section-visual-triptych academy-visuals">
              {content.academyVisuals.map((item) => (
                <article className="section-visual-card" key={item.code}>
                  <img src={item.src} alt={item.title} />
                  <div>
                    <span>{item.code}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="campus" className="section-shell campus-map-section">
          <div className="section-heading">
            <span>CASSELL SPATIAL ARCHIVE</span>
            <h2>{copy.campusTitle}</h2>
            <p>{copy.campusText}</p>
          </div>
          <div className="campus-brief">
            <div>
              <span>ARCHIVE MAP / REBUILT</span>
              <h3>{copy.campusBriefTitle}</h3>
            </div>
            <p>{copy.campusBriefText}</p>
          </div>
          <div className="campus-place-grid">
            {content.campusPlaces.map((item, index) => (
              <article className={`campus-place-card ${index === 0 ? "campus-place-card-featured" : ""}`} key={item.code}>
                <img src={item.src} alt={item.title} />
                <div>
                  <span>{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="campus-node-ledger">
            {content.campusNodes.map(([code, title, detail]) => (
              <article key={code}>
                <span>{code}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="doctrine" className="doctrine-section">
          <div className="section-shell doctrine-layout">
            <div className="doctrine-copy">
              <span>TEACHING DOCTRINE</span>
              <h2>{copy.doctrineTitle}</h2>
              <p>{copy.doctrineText}</p>
            </div>
            <div className="doctrine-manifest" style={{ ["--manifest-bg" as string]: `url(${swordManifestSrc})` }}>
              <div className="manifest-mark">OATH</div>
              <h3>{copy.oathTitle}</h3>
              <p>{copy.oathText}</p>
            </div>
            <div className="doctrine-grid">
              {content.doctrineItems.map((item) => (
                <article className="doctrine-card" key={item.code}>
                  <span>{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="word-spirit-gallery">
              <div className="section-heading inline-heading">
                <span>WORD SPIRIT RANKING</span>
                <h2>{copy.spiritTitle}</h2>
                <p>{copy.spiritText}</p>
              </div>
              <div className="word-spirit-grid">
                {content.wordSpiritVisuals.map((item) => (
                <article className="section-visual-card word-spirit-card" key={item.code}>
                  <img src={item.src} alt={item.title} />
                  <div>
                    <span>{item.code}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section id="secret" className="section-shell secret-section">
          <div className="section-heading">
            <span>SECRET SOCIETY ARCHIVE</span>
            <h2>{copy.secretTitle}</h2>
            <p>{copy.secretText}</p>
          </div>
          <div className="classified-grid">
            {content.secretSocietyFiles.map(([title, text]) => (
              <article className="classified-file" key={title}>
                <Crown size={22} />
                <span>CONFIDENTIAL</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="intel-layout">
            <div className="intel-panel">
              <div className="intel-title">
                <ShieldAlert size={20} />
                <h3>{copy.executionBriefTitle}</h3>
              </div>
              {content.missionBriefings.map(([title, code, text]) => (
                <div className="intel-row" key={code}>
                  <span>{code}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="intel-panel">
              <div className="intel-title">
                <KeyRound size={20} />
                <h3>{copy.equipmentCatalogTitle}</h3>
              </div>
              {content.equipmentRecords.map(([title, code, text]) => (
                <div className="intel-row" key={code}>
                  <span>{code}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="intel-panel">
              <div className="intel-title">
                <BookOpen size={20} />
                <h3>{copy.historyScheduleTitle}</h3>
              </div>
              {content.courseSchedule.map(([time, title, place]) => (
                <div className="schedule-row" key={time}>
                  <span>{time}</span>
                  <strong>{title}</strong>
                  <p>{place}</p>
                </div>
              ))}
            </div>
            <div className="intel-panel word-spirit-panel">
              <div className="intel-title">
                <FlaskConical size={20} />
                <h3>{copy.sequenceObservationTitle}</h3>
              </div>
              {content.wordSpiritRecords.map(([code, title, text]) => (
                <div className="sequence-row" key={code}>
                  <span>{code}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rules-ledger">
            <div>
              <ScrollText size={22} />
              <h3>{copy.rulesTitle}</h3>
            </div>
            <ol>
              {content.campusRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </div>
        </section>

        <section id="assessment" className="section-shell assessment-section">
          <div className="section-heading compact">
            <span>NORMA ASSESSMENT</span>
            <h2>{copy.assessmentTitle}</h2>
            <p>{copy.assessmentText}</p>
          </div>
          <div className="assessment-layout">
            <aside className="assessment-status">
              <div className="status-orb">
                <Fingerprint size={38} />
                <span>{progress}%</span>
              </div>
              <p>{copy.fileProgress}</p>
              <div className="meter">
                <span style={{ width: `${progress}%` }} />
              </div>
              <ul>
                <li>{copy.bloodPotential}</li>
                <li>{copy.executionSampling}</li>
                <li>{copy.stabilitySampling}</li>
                <li>{copy.dangerWatch}</li>
              </ul>
            </aside>

            {!isComplete ? (
              <div className="question-panel">
                <div className="question-meta">
                  <span>
                    QUESTION {String(currentQuestion + 1).padStart(2, "0")} /{" "}
                    {String(content.questions.length).padStart(2, "0")}
                  </span>
                  <span>{copy.normaReading}</span>
                </div>
                <h3>{activeQuestion.title}</h3>
                <p>{activeQuestion.brief}</p>
                <div className="answer-grid">
                  {activeQuestion.answers.map((answer, index) => (
                    <button key={answer.label} onClick={() => answerQuestion(index)}>
                      <strong>{answer.label}</strong>
                      <span>{answer.detail}</span>
                      <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              result && <ResultPanel result={result} onReset={resetTest} copy={copy} />
            )}
          </div>
        </section>

        <section id="terminal" className="terminal-section">
          <div className="section-shell">
            <div className="terminal-header">
              <div>
                <span>NORMA ARCHIVE TERMINAL</span>
                <h2>{copy.terminalTitle}</h2>
              </div>
              <div className="live-indicator">
                <span />
                SCANNING
              </div>
            </div>
            <div className="terminal-grid">
              {content.terminalCards.map(([title, value, meta]) => (
                <article className="terminal-card" key={title}>
                  <div className="terminal-card-head">
                    <Radar size={20} />
                    <span>{title}</span>
                  </div>
                  <strong>{value}</strong>
                  <p>{meta}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="notice" className="section-shell notice-section">
          <div className="section-heading compact">
            <span>NORMA SEALED FILE</span>
            <h2>{copy.noticeTitle}</h2>
            <p>{copy.noticeText}</p>
          </div>
          {result ? (
            <div className="notice-layout">
              <AdmissionNotice language={noticeLanguage} />
              <div className="notice-actions">
                <div className="notice-language-switch" aria-label={copy.noticeSwitchLabel}>
                  <button
                    className={noticeLanguage === "en" ? "active" : ""}
                    type="button"
                    onClick={() => setNoticeLanguage("en")}
                  >
                    {copy.noticeEnglish}
                  </button>
                  <button
                    className={noticeLanguage === "zh" ? "active" : ""}
                    type="button"
                    onClick={() => setNoticeLanguage("zh")}
                  >
                    {copy.noticeChinese}
                  </button>
                </div>
                <button className="primary-action" onClick={downloadNotice}>
                  <Download size={18} />
                  {copy.downloadNotice}
                </button>
                <button className="secondary-action" onClick={printNotice}>
                  <Printer size={18} />
                  {copy.printNotice}
                </button>
                <button className="secondary-action" onClick={resetTest}>
                  <RotateCcw size={18} />
                  {copy.resetTest}
                </button>
              </div>
            </div>
          ) : (
            <div className="locked-notice">
              <LockKeyhole size={28} />
              <span>{copy.lockedNotice}</span>
            </div>
          )}
        </section>
          </>
        )}
      </main>

      <footer>
        <span>{copy.footerLeft}</span>
        <span>{copy.footerRight}</span>
      </footer>
    </div>
  );
}

function ResultPanel({ result, onReset, copy }: { result: Result; onReset: () => void; copy: SiteCopyText }) {
  return (
    <div className="result-panel">
      <div className="result-stamp">
        <BadgeCheck size={24} />
        {copy.resultReady}
      </div>
      <div className="result-grid">
        <ResultMetric icon={ShieldCheck} label={copy.bloodGrade} value={result.grade} />
        <ResultMetric icon={Landmark} label={copy.recommendedDept} value={result.department} />
        <ResultMetric icon={Activity} label={copy.stabilityIndex} value={`${result.stabilityIndex}`} />
        <ResultMetric icon={Crosshair} label={copy.missionFit} value={`${result.missionFit}%`} />
      </div>
      <div className="risk-note">
        <AlertTriangle size={20} />
        <div>
          <strong>{copy.riskNote}</strong>
          <p>{result.riskNote}</p>
        </div>
      </div>
      <div className="result-id">
        <span>{copy.noticeId}</span>
        <strong>{result.admissionId}</strong>
      </div>
      <div className="result-actions">
        <button className="primary-action" onClick={() => scrollToSection("notice")}>
          <FileText size={18} />
          {copy.viewNotice}
        </button>
        <button className="secondary-action" onClick={onReset}>
          <RotateCcw size={18} />
          {copy.resetTest}
        </button>
      </div>
    </div>
  );
}

function ResultMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="result-metric">
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AdmissionNotice({ language }: { language: NoticeLanguage }) {
  const noticeSrc = language === "zh" ? sealedLetterZhSrc : sealedLetterEnSrc;
  return (
    <article className="admission-notice">
      <div className="notice-scene single-paper-scene">
        <img className="sealed-letter-image" src={noticeSrc} alt={language === "zh" ? "中文录取密函" : "English admission letter"} />
      </div>

    </article>
  );
}

export default App;
