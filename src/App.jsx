import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, BarChart3, 
  Settings, MessageSquare, Bell, ChevronDown, CheckCircle2,
  AlertCircle, AlertTriangle, UserPlus, UploadCloud, Search,
  Filter, MessageCircle, FileText, ChevronRight, MonitorPlay, 
  ShieldAlert, GraduationCap, CheckSquare, ShieldCheck, 
  Activity, Briefcase, Sliders, Database, Zap,
  TrendingUp, TrendingDown, Clock, UserCheck, DollarSign, Star,
  Link as LinkIcon, Plus, Trash2, DownloadCloud, PlayCircle, Video,
  ChevronLeft, FileSpreadsheet, PhoneCall, Shield, UserCog,
  Target, Edit3, Check, X, FileUp, Award, Layers
} from 'lucide-react';

// --- MOCK DATA ---
const currentPrograms = ["KDT 서비스 기획 5기", "KDT 프론트엔드 10기", "KDT 데이터 분석 24기"];

const mockStudents = [
  { id: 1, name: "김커널", email: "kernel.k@email.com", program: "KDT 데이터 분석 24기", status: "안전", riskScore: 15, progress: 92, streak: 14, attendance: "100%", assignments: "8/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["학습 참여도 최상위 수준"], quizAvg: 95, currentScore: 88, targetScore: 80, lateCount: 0, absenceCount: 0, birthDate: "1995.05.15", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123", hrdCardNum: "1234-5678-9012-3456", paymentHistory: "자비부담금 0원 (전액지원)", major: "컴퓨터공학과", commChannel: true },
  { id: 2, name: "이배포", email: "deploy.l@email.com", program: "KDT 데이터 분석 24기", status: "주의", riskScore: 45, progress: 78, streak: 3, attendance: "85%", assignments: "6/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["최근 1주일 진도율 하락세", "퀴즈 1회 미제출"], quizAvg: 75, currentScore: 72, targetScore: 80, lateCount: 1, absenceCount: 1, birthDate: "1996.08.22", phone: "010-2345-6789", address: "경기도 성남시 분당구 역삼로 45", hrdCardNum: "2345-6789-0123-4567", paymentHistory: "자비부담금 0원 (전액지원)", major: "경영학과 (비전공)", commChannel: true },
  { id: 3, name: "박서버", email: "server.p@email.com", program: "KDT 데이터 분석 24기", status: "위험", riskScore: 85, progress: 45, streak: 0, attendance: "60%", assignments: "3/8", completionPrediction: "위험", otCompleted: false, riskReasons: ["3일 연속 미출석", "과제 2건 연속 미제출", "진도율 권장 대비 -20%"], quizAvg: 45, currentScore: 50, targetScore: 80, lateCount: 2, absenceCount: 5, birthDate: "1998.11.03", phone: "010-3456-7890", address: "인천광역시 수원시 판교로 67", hrdCardNum: "3456-7890-1234-5678", paymentHistory: "자비부담금 0원 (전액지원)", major: "수학과", commChannel: false },
  { id: 4, name: "최데이터", email: "data.c@email.com", program: "KDT 데이터 분석 24기", status: "안전", riskScore: 5, progress: 98, streak: 21, attendance: "100%", assignments: "8/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["특이사항 없음 (우수)"], quizAvg: 98, currentScore: 95, targetScore: 80, lateCount: 0, absenceCount: 0, birthDate: "1994.02.19", phone: "010-4567-8901", address: "서울특별시 송파구 정자일로 89", hrdCardNum: "4567-8901-2345-6789", paymentHistory: "자비부담금 0원 (전액지원)", major: "통계학과", commChannel: true },
  { id: 5, name: "정클라우드", email: "cloud.j@email.com", program: "KDT 데이터 분석 24기", status: "주의", riskScore: 55, progress: 65, streak: 1, attendance: "70%", assignments: "5/8", completionPrediction: "위험", otCompleted: true, riskReasons: ["오프라인 결석 2회", "팀 프로젝트 참여 저조 리포트"], quizAvg: 65, currentScore: 60, targetScore: 80, lateCount: 3, absenceCount: 2, birthDate: "1997.07.30", phone: "010-5678-9012", address: "서울특별시 마포구 올림픽로 101", hrdCardNum: "5678-9012-3456-7890", paymentHistory: "자비부담금 0원 (전액지원)", major: "영문학과 (비전공)", commChannel: true },
];

const mockDropouts = [
  { id: 101, name: "최포기", email: "giveup@email.com", program: "KDT 프론트엔드 10기", dropDate: "2023-10-15", reason: "조기 취업", counselingCount: 3 },
  { id: 102, name: "박이탈", email: "run@email.com", program: "KDT 데이터 분석 24기", dropDate: "2023-10-20", reason: "학습 난이도", counselingCount: 5 },
  { id: 103, name: "강제적", email: "out@email.com", program: "KDT 서비스 기획 5기", dropDate: "2023-10-22", reason: "출결 미달(제적)", counselingCount: 2 },
];

const mockQnA = [
  { id: 1, student: "박서버", title: "과제 제출 기한 연장 문의", status: "답변대기", date: "2023-10-27" },
  { id: 2, student: "이배포", title: "VOD 강의 재생 오류", status: "답변완료", date: "2023-10-26" },
  { id: 3, student: "김커널", title: "특강 자료 요청", status: "답변완료", date: "2023-10-25" },
];

// --- HELPER COMPONENTS ---
const Badge = ({ children, type = "default", className = "" }) => {
  const types = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    vod: "bg-blue-50 text-blue-700 border border-blue-200",
    live: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    peer: "bg-purple-50 text-purple-700 border border-purple-200",
    offline: "bg-gray-100 text-gray-700 border border-gray-300",
    skill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${types[type] || types.default} ${className}`}>
      {children}
    </span>
  );
};

const KpiCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-gray-500 font-medium text-sm group-hover:text-indigo-600 transition-colors">{title}</div>
      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><Icon size={20} /></div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm flex items-center gap-1 font-medium">
      {trend === 'up' && <span className="text-green-600 flex items-center"><Activity size={14} className="mr-1"/>상승</span>}
      {trend === 'down' && <span className="text-red-500 flex items-center"><ShieldAlert size={14} className="mr-1"/>하락</span>}
      {trend === 'neutral' && <span className="text-gray-500 flex items-center">-</span>}
      <span className="text-gray-400 font-normal">| {subtext}</span>
    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`w-10 h-5.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-indigo-500' : 'bg-gray-200'}`}
    style={{ height: '22px' }}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
  </div>
);

// --- MAIN APPLICATION ---
export default function App() {
  const [activeMenu, setActiveMenu] = useState('admin_setup');
  const [selectedProgram, setSelectedProgram] = useState(currentPrograms[2]);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  const handleNavigateToStudent = (student) => {
    setSelectedStudentForDetail(student);
    setActiveMenu('op_students');
  };

  const menuSections = [
    {
      title: "ADMINISTRATION",
      description: "프로그램 기획 및 데이터 관리",
      menus: [
        { id: 'admin_dashboard', label: '관리자 대시보드', icon: LayoutDashboard },
        { id: 'admin_setup', label: '프로그램 셋업', icon: Settings },
        { id: 'admin_recruitment', label: '모집 & 선발', icon: UserPlus },
        { id: 'admin_instructors', label: '강사/멘토 관리', icon: GraduationCap },
        { id: 'admin_operators', label: '운영자 배정', icon: ShieldCheck },
        { id: 'admin_analytics', label: '성과 분석 리포트', icon: BarChart3 },
      ]
    },
    {
      title: "OPERATION",
      description: "실시간 수강생 및 학습 운영",
      menus: [
        { id: 'op_dashboard', label: '운영자 대시보드', icon: Activity },
        { id: 'op_students', label: '수강생 관리 (CRM)', icon: Users },
        { id: 'op_attendance', label: '출결 & 학습 관리', icon: CheckSquare },
        { id: 'op_qna', label: '운영 상담 & 공지', icon: MessageSquare },
        { id: 'op_instructors', label: '강사/멘토 일정', icon: Calendar },
        { id: 'op_career', label: '취업 관리 지원', icon: Briefcase },
        { id: 'op_settings', label: '운영자 설정', icon: Sliders },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="p-6 flex items-center justify-center border-b border-gray-100 h-16 box-border">
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 bg-[#FF2D55] text-white rounded-bl-xl rounded-tr-xl flex items-center justify-center font-bold text-lg italic" style={{ clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }}>K</div>
             <span className="font-bold text-xl tracking-tight text-[#111827]">Kernel<span className="font-normal text-gray-500 ml-1">Academy</span></span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-5 mb-2">
                <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">{section.title}</h3>
                <p className="text-[10px] text-gray-400">{section.description}</p>
              </div>
              <ul className="space-y-0.5 px-3">
                {section.menus.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = activeMenu === menu.id;
                  return (
                    <li key={menu.id}>
                      <button
                        onClick={() => {
                          setActiveMenu(menu.id);
                          if (menu.id === 'op_students') setSelectedStudentForDetail(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                        {menu.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">M</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Super Admin</p>
            <p className="text-xs text-gray-500 truncate">통합 마스터 계정</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                className="appearance-none bg-white border border-gray-200 hover:border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 block w-64 p-2 pr-8 font-semibold shadow-sm transition-all cursor-pointer"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {currentPrograms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-indigo-500 pointer-events-none transition-colors" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-green-700 tracking-wider">LMS SYNCED</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"><Zap size={20} /></button>
            <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF2D55] rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]">
          {activeMenu === 'admin_setup' && <AdminProgramSetup />}
          {activeMenu === 'admin_operators' && <AdminOperatorMgmt />}
          {activeMenu === 'op_students' && <OperatorStudentMgmt selectedStudentForDetail={selectedStudentForDetail} setSelectedStudentForDetail={setSelectedStudentForDetail} />}
          {activeMenu === 'op_attendance' && <OperatorAttendanceMgmt onStudentClick={handleNavigateToStudent} />}
          {activeMenu === 'op_qna' && <OperatorQnAMgmt />}
          {activeMenu === 'admin_dashboard' && <AdminDashboard />}
          {activeMenu === 'op_dashboard' && <OperatorDashboard />}

          {['admin_recruitment', 'admin_instructors', 'admin_analytics', 'op_instructors', 'op_career', 'op_settings'].includes(activeMenu) && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Database size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">개발 예정 메뉴</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                해당 기능은 <strong>OS 플랫폼 Phase 2</strong> 업데이트 시 반영될 예정입니다.<br/>
              </p>
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50">
                기획 문서 확인하기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// ADMINISTRATION COMPONENTS
// ============================================================================

function AdminOperatorMgmt() {
  const [activeTab, setActiveTab] = useState('mapping');

  // Mock data for Operators
  const operators = [
    { id: 1, name: "김마스터", email: "master@kernel.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "이관리", email: "manager@kernel.com", role: "관리자", status: "Active" },
    { id: 3, name: "박운영", email: "op1@kernel.com", role: "운영자", status: "Active" },
    { id: 4, name: "최지원", email: "op2@kernel.com", role: "운영자", status: "Absent" },
    { id: 5, name: "정강사", email: "inst@kernel.com", role: "강사", status: "Active" },
    { id: 6, name: "한멘토", email: "mentor@kernel.com", role: "강사", status: "Active" },
  ];

  // Mock data for Permissions (Matrix)
  const [permissions, setPermissions] = useState([
    { menu: "관리자 대시보드", super: true, admin: true, op: false, inst: false },
    { menu: "프로그램 셋업 (생성/수정)", super: true, admin: true, op: false, inst: false },
    { menu: "운영자 배정 및 권한 설정", super: true, admin: false, op: false, inst: false },
    { menu: "운영자 대시보드 (KPI)", super: true, admin: true, op: true, inst: false },
    { menu: "수강생 관리 (CRM 조회/수정)", super: true, admin: true, op: true, inst: false },
    { menu: "출결 관리 및 점수 입력", super: true, admin: true, op: true, inst: true },
    { menu: "운영 상담 (QnA 답변)", super: true, admin: true, op: true, inst: true },
  ]);

  const togglePermission = (idx, roleKey) => {
    const newPerms = [...permissions];
    if (roleKey !== 'super') {
      newPerms[idx][roleKey] = !newPerms[idx][roleKey];
      setPermissions(newPerms);
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Super Admin': return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[11px] font-black border border-purple-200">SUPER</span>;
      case '관리자': return <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[11px] font-bold border border-indigo-200">관리자</span>;
      case '운영자': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-bold border border-blue-200">운영자</span>;
      case '강사': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold border border-emerald-200">강사/멘토</span>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">운영자 배정 및 권한</h1>
          </div>
          <p className="text-gray-500 text-sm">코호트별 운영진을 매핑하고 직책(Role)에 따른 플랫폼 접근 권한을 제어합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
            <UserPlus size={16} /> 신규 운영자 등록
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'mapping' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            코호트 배정 및 운영자 목록
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'permissions' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            역할별 권한 설정
          </button>
        </div>

        {/* Tab 1: Cohort Mapping & Operator List */}
        {activeTab === 'mapping' && (
          <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#F8FAFC]">
            <div className="mb-8">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><UserCog size={18} className="text-indigo-600"/> 운영 중인 코호트 배정</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[
                  { name: "KDT 데이터 분석 24기", main: "박운영", backup: "최지원" },
                  { name: "KDT 프론트엔드 10기", main: "최지원", backup: "박운영", hasWarning: true },
                  { name: "KDT 서비스 기획 5기", main: "이관리", backup: "-" },
                ].map((cohort, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-gray-800">{cohort.name}</span>
                      {cohort.hasWarning && <Badge type="warning" className="animate-pulse">백업 부재중</Badge>}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">메인 담당 운영자</label>
                        <select className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 font-medium cursor-pointer" defaultValue={cohort.main}>
                          <option value="-">미지정</option>
                          {operators.filter(o => o.role !== '강사').map(o => <option key={o.id} value={o.name}>{o.name} ({o.role})</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">부재 시 백업 (대체자)</label>
                        <select className={`w-full text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 font-medium cursor-pointer ${cohort.hasWarning ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-gray-50 border border-gray-200'}`} defaultValue={cohort.backup}>
                          <option value="-">미지정</option>
                          {operators.filter(o => o.role !== '강사').map(o => <option key={o.id} value={o.name}>{o.name} {o.status === 'Absent' ? '(부재중)' : ''}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800">전체 운영자 목록</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="이름 검색" className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none w-48 shadow-sm" />
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-white text-gray-500 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 pl-6">운영진 정보</th>
                    <th className="p-4">역할 (Role)</th>
                    <th className="p-4">상태</th>
                    <th className="p-4">계정 권한 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {operators.filter(op => op.role !== '강사').map(op => (
                    <tr key={op.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-xs shadow-sm ${op.status === 'Absent' ? 'bg-gray-200 text-gray-500' : 'bg-indigo-100 text-indigo-700'}`}>
                            {op.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{op.name}</div>
                            <div className="text-[10px] text-gray-500">{op.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{getRoleBadge(op.role)}</td>
                      <td className="p-4">
                        {op.status === 'Active' ? 
                          <span className="flex items-center gap-1.5 text-xs font-bold text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> 활동중</span> : 
                          <span className="flex items-center gap-1.5 text-xs font-bold text-red-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> 부재중 (휴가 등)</span>
                        }
                      </td>
                      <td className="p-4">
                        <button className="text-xs font-bold text-gray-500 hover:text-indigo-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                          정보 수정
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Permissions Matrix */}
        {activeTab === 'permissions' && (
          <div className="flex-1 flex flex-col bg-[#F8FAFC] p-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-indigo-50/30 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Shield size={18} className="text-indigo-600"/> 플랫폼 메뉴 접근 권한 제어</h3>
                  <p className="text-xs text-gray-500 mt-1">Super Admin은 모든 권한을 가지며 수정할 수 없습니다. 변경 사항은 즉시 반영됩니다.</p>
                </div>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
                  권한 설정 저장
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="p-4 pl-6 text-sm font-bold text-gray-700 w-1/3">메뉴 및 기능</th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('Super Admin')}
                          <span className="text-[10px] text-gray-400 font-medium">모든 권한</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('관리자')}
                          <span className="text-[10px] text-gray-400 font-medium">프로그램 기획/총괄</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('운영자')}
                          <span className="text-[10px] text-gray-400 font-medium">실무 매니저</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('강사')}
                          <span className="text-[10px] text-gray-400 font-medium">학습 채점/피드백</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {permissions.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-gray-800 text-sm">{perm.menu}</td>
                        <td className="p-4">
                          <div className="flex justify-center opacity-50 cursor-not-allowed" title="Super Admin은 수정 불가">
                            <ToggleSwitch checked={perm.super} onChange={() => {}} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.admin} onChange={() => togglePermission(idx, 'admin')} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.op} onChange={() => togglePermission(idx, 'op')} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.inst} onChange={() => togglePermission(idx, 'inst')} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminProgramSetup() {
  const [step, setStep] = useState(2); // 변경: 바로 2단계 확인을 위해 초기값을 2로 설정
  const steps = ["기본 정보", "세부 정보", "시간표 설정", "수료 기준", "과제/퀴즈/진단 등록", "게이미피케이션"];

  const StepHeader = ({ title, badgeText }) => (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
       <div className="flex items-center gap-3">
         <h2 className="text-lg font-bold text-gray-900">{title}</h2>
         <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold border border-indigo-100">{badgeText}</span>
       </div>
       <div className="flex gap-2">
         <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
           <FileSpreadsheet size={14} className="text-green-600" /> 엑셀 Import
         </button>
         <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
           <DownloadCloud size={14} className="text-gray-500" /> 엑셀 Export
         </button>
       </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">프로그램 셋업</h1>
          </div>
          <p className="text-gray-500 text-sm">LMS에 반영될 모든 콘텐츠의 원본 데이터를 설정하고 일괄 배포합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm">임시 저장</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Zap size={16} /> 설정 완료 및 LMS 반영
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex justify-between">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-500 z-0 transition-all duration-300 ease-in-out rounded-full" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setStep(i + 1)}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-200 ${
                step > i + 1 ? 'bg-indigo-600 border-indigo-100 text-white shadow-md' : 
                step === i + 1 ? 'bg-white border-indigo-500 text-indigo-600 shadow-md scale-110' : 'bg-white border-gray-100 text-gray-400 group-hover:border-gray-200'
              }`}>
                {step > i + 1 ? <CheckCircle2 size={18} /> : i + 1}
              </div>
              <span className={`text-[13px] font-bold ${step === i + 1 ? 'text-indigo-700' : 'text-gray-500'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[500px] flex flex-col">
        {step === 1 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 1. 기본 정보 설정 (입과 요청 시트 기준)" badgeText="HRD-Net / LMS 기본 연동" />

            {/* 기본 정보 필드 */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">홍보 과정명 기수 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="KDT 데이터 분석 부트캠프 24기"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">사업 약자</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="KDT DA"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">HRD-Net 과정명 회차</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="빅데이터 분석 실무자 양성과정 5회차"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">훈련과정 ID (HRD 연동용)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="G20200041773"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">수강 시작일</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="2024-10-27" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">수강 종료일</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="2025-04-15" />
              </div>
            </div>

            {/* 입과 요청 사항 필수강의 (커스터마이징) */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded border-2 border-indigo-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-sm"></div>
                </div>
                <h3 className="text-sm font-bold text-indigo-700">입과 요청 사항 필수강의(커스터마이징)</h3>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-4 gap-0 border-b border-gray-100 bg-gray-50 px-4 py-2">
                  <span className="text-xs font-bold text-gray-500">수강 기간</span>
                  <span className="text-xs font-bold text-gray-500">강의 유형</span>
                  <span className="text-xs font-bold text-gray-500">입과 요청 강의명</span>
                  <span className="text-xs font-bold text-gray-500">원코스 ID</span>
                </div>
                <div className="grid grid-cols-4 gap-0 px-4 py-3 items-center">
                  <div className="pr-4">
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="25.4.1 ~ 25.11.8"/>
                  </div>
                  <div className="pr-4">
                    <select className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer">
                      <option>필수</option>
                      <option>선택</option>
                      <option>권장</option>
                    </select>
                  </div>
                  <div className="pr-4">
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="데이터 분석 부트캠프"/>
                  </div>
                  <div>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="C21001"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 입과 요청 사항 권장 / 리워드 강의 (비커스터마이징) */}
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full border-2 border-orange-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                <h3 className="text-sm font-bold text-orange-700">입과 요청 사항 권장 / 리워드 강의(비커스터마이징)</h3>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-3 gap-0 border-b border-gray-100 bg-gray-50 px-4 py-2">
                  <span className="text-xs font-bold text-gray-500">수강 기간</span>
                  <span className="text-xs font-bold text-gray-500">강의 유형</span>
                  <span className="text-xs font-bold text-gray-500">원코스 강의</span>
                </div>
                <div className="grid grid-cols-3 gap-0 px-4 py-3 items-center">
                  <div className="pr-4">
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="25.4.1 ~ 25.11.8"/>
                  </div>
                  <div className="pr-4">
                    <select className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer">
                      <option>권장</option>
                      <option>필수</option>
                      <option>리워드</option>
                    </select>
                  </div>
                  <div>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="파이썬 기초 완강"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 수강생 명단 */}
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="text-sm font-bold text-gray-700">수강생 명단</h3>
              </div>
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors">
                  <UploadCloud size={16} className="text-indigo-500"/> 엑셀 파일 업로드
                </button>
                <span className="text-sm text-gray-400">(추후 등록 가능)</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 2. 세부 정보" badgeText="시간표 자동 생성 조건" />

            {/* 1. 훈련 기간 및 일과 시간 설정 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Clock size={16} className="text-indigo-600"/> 훈련 기간 및 일과 시간 설정
               </h3>
               <div className="grid grid-cols-2 gap-6">
                 {/* 훈련 기간 */}
                 <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500">훈련 시작일 / 종료일</label>
                   <div className="flex items-center gap-2">
                     <input type="date" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="2024-10-27" />
                     <span className="text-gray-400">~</span>
                     <input type="date" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="2025-04-15" />
                   </div>
                 </div>
                 {/* 일과 시간 */}
                 <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500">일일 훈련 시간 (Core Time)</label>
                   <div className="flex items-center gap-2">
                     <input type="time" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="09:00" />
                     <span className="text-gray-400">~</span>
                     <input type="time" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="18:00" />
                   </div>
                 </div>
                 {/* 세션 단위 */}
                 <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500">세션(교시) 운영 단위</label>
                   <select className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 bg-white outline-none cursor-pointer">
                     <option>1시간 (60분)</option>
                     <option>50분 단위 (10분 휴식)</option>
                     <option>1.5시간 (90분)</option>
                     <option>2시간 (120분)</option>
                   </select>
                 </div>
                 {/* 점심 시간 */}
                 <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500">점심 시간 설정</label>
                   <div className="flex items-center gap-2">
                     <input type="time" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="12:00" />
                     <span className="text-gray-400">~</span>
                     <input type="time" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="13:00" />
                   </div>
                 </div>
               </div>
            </div>

            {/* 2. 예외 및 공휴일 조건 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Calendar size={16} className="text-indigo-600"/> 자동 생성 예외 조건 설정
               </h3>
               <div className="space-y-4">
                 <label className="flex items-center gap-2 cursor-pointer w-max">
                   <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer" defaultChecked />
                   <span className="text-sm font-medium text-gray-800">대한민국 법정 공휴일 자동 제외 (휴강 처리)</span>
                 </label>

                 <div className="pt-2">
                   <label className="text-xs font-bold text-gray-500 mb-2 block">특정 제외 날짜 (회사 창립기념일, 별도 휴무일 등)</label>
                   <div className="flex items-center gap-2 mb-3">
                     <input type="date" className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" />
                     <input type="text" placeholder="제외 사유 (예: 창립기념일)" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" />
                     <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 border border-indigo-200 transition-colors">추가</button>
                   </div>
                   {/* 추가된 날짜 목록 Mock */}
                   <div className="flex flex-wrap gap-2">
                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-50 text-xs font-semibold text-gray-700 border border-gray-200 shadow-sm">
                       2024-12-31 (종무식) <button className="text-gray-400 hover:text-red-500 transition-colors"><X size={14}/></button>
                     </span>
                   </div>
                 </div>
               </div>
            </div>

            {/* 3. 연동된 필수 VOD 패키지 */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Database size={16} className="text-indigo-600"/> 입과 필수 강의 (VOD 패키지) 연동 현황
              </h3>
              <p className="text-xs text-gray-500 mb-4">Step 1의 기본 정보에서 설정된 입과 필수 강의가 이 과정의 기본 콘텐츠로 매핑됩니다.</p>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                  <Badge type="vod" className="!px-3 !py-1.5 !text-xs">VOD 연동</Badge>
                  <div>
                    <span className="text-sm font-bold text-gray-800 block mb-1">데이터 분석 부트캠프 (필수 수강)</span>
                    <span className="text-xs text-gray-500 flex items-center gap-2">
                      <span>패키지 ID: <strong>C21001</strong></span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>권장 수강 기간: 25.4.1 ~ 25.11.8</span>
                    </span>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-2 rounded border border-indigo-100 transition-colors">
                  연동 내역 확인
                </button>
              </div>
            </div>

            {/* 4. 동기식 일정 CSV 업로드 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-center mb-5">
                 <div>
                   <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-1">
                     <UploadCloud size={16} className="text-indigo-600"/> 스케줄 데이터 업로드 (CSV/Excel)
                   </h3>
                   <p className="text-xs text-gray-500">지정된 훈련 일자와 시간에 맞춰 기 작성된 강의 일정 데이터를 업로드합니다.</p>
                 </div>
                 <button className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-200 bg-white font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
                   <DownloadCloud size={14}/> 양식 다운로드
                 </button>
               </div>
               
               <div className="grid grid-cols-2 gap-5">
                 <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer group">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-200 transition-all shadow-sm">
                     <Video size={20} />
                   </div>
                   <span className="text-sm font-bold text-gray-800 mb-1.5">실시간 강의 리스트</span>
                   <span className="text-xs text-gray-500 mb-4 text-center">Zoom 등 LIVE로 진행되는<br/>강의 및 특강 일정 파일</span>
                   <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold shadow-sm group-hover:border-blue-300 transition-colors">
                     파일 선택...
                   </button>
                 </div>

                 <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-purple-50/50 hover:border-purple-300 transition-colors cursor-pointer group">
                   <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-purple-200 transition-all shadow-sm">
                     <Layers size={20} />
                   </div>
                   <span className="text-sm font-bold text-gray-800 mb-1.5">오프라인 / 과제 / 프로젝트</span>
                   <span className="text-xs text-gray-500 mb-4 text-center">기타 모든 비동기식 이벤트 및<br/>오프라인 모임 일정 파일</span>
                   <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold shadow-sm group-hover:border-purple-300 transition-colors">
                     파일 선택...
                   </button>
                 </div>
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 3. 주간/월간 시간표 캘린더 세팅" badgeText="학생용 LMS 시간표 UI 매핑" />
            
            <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
               <div className="flex items-center gap-6">
                 <div className="flex items-center bg-white border border-gray-300 rounded px-2 py-1.5 shadow-sm">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={16}/></button>
                    <span className="font-bold text-sm text-gray-800 px-3">Week 6 (12.1 ~ 12.5)</span>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={16}/></button>
                 </div>
                 
                 <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-blue-400"></span> 온라인(VOD)</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-emerald-400"></span> 실시간(Live)</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-gray-400 bg-gray-400"></span> 오프라인</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-purple-400"></span> 피어세션</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-red-400"></span> 과제/제출</span>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-indigo-100 transition-colors">
                   <UploadCloud size={16}/> 시간표 일괄 업로드 (CSV)
                 </button>
                 <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors">
                   <DownloadCloud size={16}/> 시간표 양식 다운로드
                 </button>
               </div>
            </div>

            {/* FULL CALENDAR GRID RESTORED */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm flex flex-col min-w-[900px]">
               {/* Headers */}
               <div className="flex border-b border-gray-200 bg-white">
                  <div className="w-[80px] border-r border-gray-200 p-3 text-center text-[11px] font-bold text-gray-400 flex items-center justify-center">WEEK 6</div>
                  <div className="flex-1 border-r border-gray-200 p-3 text-center text-sm font-bold text-gray-800">월 <span className="text-gray-400 font-medium ml-1">12.1</span></div>
                  <div className="flex-1 border-r border-gray-200 bg-red-50/20 p-3 text-center text-sm font-bold text-red-500 flex items-center justify-center gap-1">
                     화 <span className="font-medium text-red-300">12.2</span> <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mb-0.5"></span>
                  </div>
                  <div className="flex-1 border-r border-gray-200 p-3 text-center text-sm font-bold text-gray-800">수 <span className="text-gray-400 font-medium ml-1">12.3</span></div>
                  <div className="flex-1 border-r border-gray-200 p-3 text-center text-sm font-bold text-gray-800">목 <span className="text-gray-400 font-medium ml-1">12.4</span></div>
                  <div className="flex-1 p-3 text-center text-sm font-bold text-gray-800">금 <span className="text-gray-400 font-medium ml-1">12.5</span></div>
               </div>
               
               {/* Row 1: 09:00 - 12:00 */}
               <div className="flex border-b border-gray-200 min-h-[110px]">
                  <div className="w-[80px] border-r border-gray-200 p-2 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center gap-1"><span>09:00</span><span>12:00</span></div>
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-emerald-300 rounded p-2.5 flex flex-col bg-emerald-50/30 hover:border-emerald-400 transition-colors">
                      <Badge type="live" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-emerald-100">LIVE</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-emerald-200/50 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="프로젝트 OT (이지훈)" />
                        <LinkIcon size={12} className="text-indigo-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                     <div className="h-full border border-gray-300 rounded p-2.5 flex flex-col bg-white hover:border-gray-400 transition-colors">
                      <Badge type="offline" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px]">오프라인</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="강남 3호점 201호" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-2">
                     <div className="h-full border border-purple-200 rounded p-2.5 flex flex-col bg-purple-50/10 hover:border-purple-300 transition-colors">
                      <Badge type="peer" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-white">PEER</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="프로젝트를 통한 SQL 실력 완성하기"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-purple-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="게더타운 그룹 룸" />
                        <LinkIcon size={12} className="text-purple-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Row 2: 점심 */}
               <div className="flex border-b border-gray-200 h-[36px] bg-gray-50/50">
                  <div className="w-[80px] border-r border-gray-200 p-1 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center"><span>12:00</span><span>13:00</span></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex-1 flex justify-center items-center text-[11px] text-gray-300 font-bold ${i < 4 ? 'border-r border-gray-200' : ''}`}>점심</div>
                  ))}
               </div>

               {/* Row 3: 13:00 - 18:00 */}
               <div className="flex border-b border-gray-200 min-h-[140px]">
                  <div className="w-[80px] border-r border-gray-200 p-2 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center gap-1"><span>13:00</span><span>18:00</span></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2 relative">
                    <div className="h-full border-2 border-emerald-500 rounded p-2.5 flex flex-col bg-white shadow-sm relative hover:border-emerald-600 transition-colors">
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-gray-100 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-emerald-300 rounded p-2.5 flex flex-col bg-emerald-50/30 hover:border-emerald-400 transition-colors">
                      <Badge type="live" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-emerald-100">LIVE</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-emerald-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10} className="text-emerald-600"/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-emerald-700" defaultValue="zoom.us/j/123456789" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                     <div className="h-full border border-emerald-300 rounded p-2.5 flex flex-col bg-emerald-50/30 hover:border-emerald-400 transition-colors">
                      <Badge type="live" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-emerald-100">LIVE</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-emerald-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10} className="text-emerald-600"/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-emerald-700" defaultValue="zoom.us/j/123456789" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-2">
                     <div className="h-full border border-purple-200 rounded p-2.5 flex flex-col bg-purple-50/10 hover:border-purple-300 transition-colors">
                      <Badge type="peer" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-white">PEER</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="프로젝트를 통한 SQL 실력 완성하기"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-purple-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="프로젝트 멘토링 (이지훈)" />
                        <LinkIcon size={12} className="text-purple-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Row 4: 저녁 */}
               <div className="flex border-b border-gray-200 h-[36px] bg-gray-50/50">
                  <div className="w-[80px] border-r border-gray-200 p-1 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center"><span>18:00</span><span>19:00</span></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex-1 flex justify-center items-center text-[11px] text-gray-300 font-bold ${i < 4 ? 'border-r border-gray-200' : ''}`}>저녁</div>
                  ))}
               </div>

               {/* Row 5: 19:00 - 21:00 */}
               <div className="flex border-b border-gray-200 min-h-[90px]">
                  <div className="w-[80px] border-r border-gray-200 p-2 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center gap-1"><span>19:00</span><span>21:00</span></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-blue-200 rounded p-2.5 flex flex-col bg-blue-50/10 hover:border-blue-300 transition-colors">
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-blue-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-blue-700" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-blue-200 rounded p-2.5 flex flex-col bg-blue-50/10 hover:border-blue-300 transition-colors">
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-blue-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-blue-700" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                     <div className="h-full border border-blue-200 rounded p-2.5 flex flex-col bg-blue-50/10 hover:border-blue-300 transition-colors">
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-blue-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-blue-700" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-2">
                     <div className="h-full border border-purple-200 rounded p-2.5 flex flex-col bg-purple-50/10 hover:border-purple-300 transition-colors">
                      <Badge type="peer" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-white">PEER</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="프로젝트를 통한 SQL 실력 완성하기"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-purple-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="게더타운 그룹 룸" />
                        <LinkIcon size={12} className="text-purple-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Row 6: 과제 */}
               <div className="flex border-gray-200 min-h-[46px] bg-red-50/5">
                  <div className="w-[80px] border-r border-gray-200 p-2 flex items-center justify-center text-[11px] font-bold text-red-500">과제</div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2 flex items-center relative">
                    <span className="text-[11px] font-bold text-gray-300 pl-2">3-4. SQL Quiz 4</span>
                    <CheckCircle2 size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"/>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-1.5 flex items-center">
                    <div className="w-full h-full border border-red-200 rounded text-[11px] text-gray-500 bg-red-50/50 flex items-center px-3 font-medium">3-5. SQL Quiz 5</div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-1.5 flex items-center">
                    <div className="w-full h-full border border-red-200 rounded text-[11px] text-gray-500 bg-red-50/50 flex items-center px-3 font-medium">3-6. SQL Quiz 6</div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-1.5 flex items-center">
                    <div className="w-full h-full border border-red-200 rounded text-[11px] text-gray-500 bg-red-50/50 flex items-center px-3 font-medium">3-7. SQL Quiz 7</div>
                  </div>
                  
                  <div className="flex-1 p-2"></div>
               </div>
            </div>

            {/* Editing Panel for Selected Date */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-4 flex gap-6 items-start shadow-sm">
               <div className="w-48">
                 <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Calendar size={16} className="text-indigo-600"/> 선택된 일자</h4>
                 <p className="text-2xl font-black text-indigo-700">12월 2일 (화)</p>
                 <p className="text-xs text-gray-500 mt-2">일정을 추가하거나 수정하면 LMS 시간표 카드에 즉시 반영됩니다.</p>
               </div>
               <div className="flex-1 space-y-3">
                 <div className="flex flex-col gap-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative">
                   <div className="flex items-center gap-3">
                     <select className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-1 outline-none cursor-pointer">
                        <option value="vod">VOD</option>
                        <option value="live">LIVE</option>
                     </select>
                     <input type="text" className="font-bold text-sm text-gray-900 border-none bg-transparent outline-none flex-1" defaultValue="SQL 실무 적용 실습 (13:00 ~ 18:00)" />
                     <div className="flex items-center gap-2 w-64 bg-gray-50 px-2 py-1.5 rounded border border-gray-200">
                       <LinkIcon size={14} className="text-gray-400"/>
                       <input type="text" className="text-xs bg-transparent border-none outline-none flex-1" defaultValue="https://lms.fastcampus.co.kr/c/123" placeholder="수강 링크 URL 삽입"/>
                     </div>
                     <button className="text-gray-400 hover:text-red-500 ml-2"><Trash2 size={16}/></button>
                   </div>
                   
                   <div className="mt-2 bg-gray-50 rounded border border-gray-100 p-3">
                     <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mb-2">
                       <FileText size={14}/> 학습 목표 및 상세 내용
                     </label>
                     <textarea 
                       className="w-full text-sm text-gray-700 bg-transparent border-none outline-none resize-none" 
                       rows="2" 
                       defaultValue="집계 함수와 그룹화(GROUP BY)를 활용하여 비즈니스 요약 통계 지표를 뽑아내는 실습을 진행합니다."
                       placeholder="LMS 모달에 노출될 상세 내용을 입력하세요."
                     ></textarea>
                   </div>
                 </div>
                 <button className="w-full py-2.5 bg-white border border-dashed border-gray-300 text-gray-500 font-bold text-sm rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex justify-center items-center gap-1.5 shadow-sm">
                   <Plus size={16}/> 새 일정 추가
                 </button>
               </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 4. 과정 수료 기준 세팅" badgeText="LMS 포트폴리오 성적표 연동" />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                <span className="font-bold text-gray-700">기본 수료 기준 (총점)</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="70" className="w-16 p-1.5 border border-gray-300 rounded text-center font-bold"/> <span className="text-sm font-medium">점 이상</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 flex items-center justify-between">
                <span className="font-bold text-indigo-900">우수 수료 기준 (총점)</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="80" className="w-16 p-1.5 border border-indigo-300 rounded text-center font-bold text-indigo-700"/> <span className="text-sm font-medium text-indigo-700">점 이상인 상위 5인</span>
                </div>
              </div>
            </div>

            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-100 font-bold text-gray-700">
                <tr>
                  <th className="border border-gray-200 p-2 w-1/5">항목</th>
                  <th className="border border-gray-200 p-2 w-1/5">세팅 방식</th>
                  <th className="border border-gray-200 p-2 w-1/6">총 배점</th>
                  <th className="border border-gray-200 p-2">세부 내용</th>
                  <th className="border border-gray-200 p-2 w-1/6">세부 배점</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center">출석률</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500">자동 연동</td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="20" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="고용24 기준 출석률 연동" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="20" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center">온라인 강의</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500">자동 연동</td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="10" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="본과정 필수 강의 완강률" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="10" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center" rowSpan="2">과제</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500" rowSpan="2">OS 채점 입력</td>
                  <td className="border border-gray-200 p-2 text-center" rowSpan="2"><input type="number" defaultValue="30" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="과제 1 (Python 전처리)" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="15" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="과제 2 (SQL 데이터 추출)" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="15" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center">프로젝트</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500">OS 채점 입력</td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="40" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="파이널 프로젝트 (팀 단위 평가)" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="40" className="w-12 border p-1 text-center"/></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
             <StepHeader title="Step 5. 과제/퀴즈/스킬 진단 매핑" badgeText="학습 성과 측정 도구 설정" />
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">Step 2와 Step 3에서 확정된 강의 타임라인에 퀴즈, 과제, 그리고 <strong className="text-cyan-600">스킬매치(Skill Match) 진단</strong>을 매핑합니다.</p>
              <button className="px-4 py-2 bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-cyan-100 transition-colors">
                 <Target size={16}/> 사전/사후 스킬매치 진단 추가
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {[
                { date: "10.27 (일)", time: "09:00-10:00", title: "부트캠프 오리엔테이션", type: "LIVE", skillMatch: "사전 진단 (Level 1-2 기준)" },
                { date: "12.01 (월)", time: "13:00-18:00", title: "SQL 실무 적용 실습", type: "VOD", hasQuiz: true, hasAssign: false },
                { date: "12.02 (화)", time: "13:00-18:00", title: "SQL 패턴 10가지", type: "VOD", hasQuiz: false, hasAssign: true },
              ].map((lec, idx) => (
                <div key={idx} className={`flex items-center border-b border-gray-100 p-4 transition-colors ${lec.skillMatch ? 'bg-cyan-50/20' : 'hover:bg-gray-50'}`}>
                  <div className="w-32 flex flex-col gap-1 border-r border-gray-100 pr-4">
                    <span className="text-xs font-bold text-gray-500">{lec.date}</span>
                    <span className="text-[11px] text-gray-400">{lec.time}</span>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge type={lec.type.toLowerCase()}>{lec.type}</Badge>
                      <span className="font-bold text-sm text-gray-900">{lec.title}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {lec.skillMatch ? (
                      <>
                        <button className="px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm hover:bg-emerald-100 transition-colors">
                          <CheckCircle2 size={14} className="text-emerald-600"/> +출석 퀴즈
                        </button>
                        <button className="px-3 py-1.5 bg-pink-50 border border-pink-300 text-pink-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm hover:bg-pink-100 transition-colors">
                          <Plus size={14} className="text-pink-600"/> +과제 추가
                        </button>
                      </>
                    ) : (
                      <>
                        {lec.hasQuiz ? (
                           <button className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded flex items-center gap-1"><CheckCircle2 size={12}/> 3-4. SQL Quiz 4</button>
                        ) : (
                           <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded flex items-center gap-1"><Plus size={12}/> 퀴즈 추가</button>
                        )}
                        {lec.hasAssign ? (
                           <button className="px-3 py-1.5 bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold rounded flex items-center gap-1"><FileText size={12}/> Python 기초 과제</button>
                        ) : (
                           <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded flex items-center gap-1"><Plus size={12}/> 과제 추가</button>
                        )}
                        <button className="px-3 py-1.5 bg-cyan-50 border border-cyan-300 text-cyan-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm hover:bg-cyan-100 transition-colors">
                          <Target size={12} className="text-cyan-600"/> +스킬매치
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 6. 게이미피케이션" badgeText="LMS 기여도·레벨 자동 연동" />

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><Zap size={18} className="text-yellow-500"/> XP 적립 규칙 설정</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">VOD 강의 1강 완료 시</div>
                  <div className="flex items-center gap-2"><input type="number" defaultValue="10" className="w-20 border border-gray-300 rounded p-1.5 text-center font-bold"/> <span className="text-gray-500 font-medium">XP</span></div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">과제 기한 내 제출 시</div>
                  <div className="flex items-center gap-2"><input type="number" defaultValue="50" className="w-20 border border-gray-300 rounded p-1.5 text-center font-bold"/> <span className="text-gray-500 font-medium">XP</span></div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">연속 출석(Streak) 보너스</div>
                  <div className="flex items-center gap-2"><input type="number" defaultValue="100" className="w-20 border border-gray-300 rounded p-1.5 text-center font-bold"/> <span className="text-gray-500 font-medium">XP</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            이전 단계
          </button>
          <button 
            disabled={step === steps.length}
            onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
          >
            다음 단계 <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
