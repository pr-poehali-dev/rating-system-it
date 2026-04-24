import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "dashboard" | "profiles" | "tasks" | "rating" | "reports" | "history" | "panel";

type Student = {
  id: number; name: string; avatar: string; score: number;
  level: string; tasks: number; badge: string; trend: string; category: string;
};

type Task = {
  id: number; title: string; category: string; deadline: string;
  points: number; status: "active" | "upcoming" | "closed"; submissions: number; description: string;
};

type HistoryEntry = {
  id: number; student: string; action: string; subject: string;
  score: number | null; date: string; avatar: string; type: "plus" | "minus" | "achievement";
};

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: "Алёна Соколова", avatar: "АС", score: 94, level: "Эксперт", tasks: 28, badge: "🏆", trend: "+5", category: "Отлично" },
  { id: 2, name: "Дмитрий Волков", avatar: "ДВ", score: 87, level: "Продвинутый", tasks: 24, badge: "⭐", trend: "+3", category: "Хорошо" },
  { id: 3, name: "Мария Петрова", avatar: "МП", score: 82, level: "Продвинутый", tasks: 21, badge: "🎯", trend: "+7", category: "Хорошо" },
  { id: 4, name: "Иван Козлов", avatar: "ИК", score: 76, level: "Средний", tasks: 18, badge: "📚", trend: "-2", category: "Удовлетворительно" },
  { id: 5, name: "Полина Орлова", avatar: "ПО", score: 91, level: "Эксперт", tasks: 26, badge: "💎", trend: "+4", category: "Отлично" },
  { id: 6, name: "Артём Новиков", avatar: "АН", score: 68, level: "Начинающий", tasks: 15, badge: "🌱", trend: "+1", category: "Удовлетворительно" },
  { id: 7, name: "Кирилл Смирнов", avatar: "КС", score: 89, level: "Продвинутый", tasks: 22, badge: "🚀", trend: "+6", category: "Хорошо" },
  { id: 8, name: "Анастасия Лебедева", avatar: "АЛ", score: 73, level: "Средний", tasks: 17, badge: "💡", trend: "+2", category: "Удовлетворительно" },
];

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Алгоритмы сортировки", category: "Алгоритмы", deadline: "25 апр", points: 20, status: "active", submissions: 14, description: "Реализовать QuickSort, MergeSort и BubbleSort на Python. Сравнить временную сложность." },
  { id: 2, title: "Основы SQL", category: "Базы данных", deadline: "27 апр", points: 15, status: "active", submissions: 9, description: "Написать 10 запросов SELECT с JOIN, GROUP BY, HAVING к базе данных интернет-магазина." },
  { id: 3, title: "REST API на Flask", category: "Веб-разработка", deadline: "30 апр", points: 30, status: "upcoming", submissions: 0, description: "Создать REST API с эндпоинтами CRUD для управления задачами. Документация в Swagger." },
  { id: 4, title: "Объектно-ориентированное программирование", category: "Программирование", deadline: "22 апр", points: 25, status: "closed", submissions: 22, description: "Реализовать систему классов для банка: Account, SavingsAccount, CreditAccount с наследованием." },
  { id: 5, title: "HTML/CSS Адаптивный макет", category: "Веб-разработка", deadline: "28 апр", points: 12, status: "active", submissions: 7, description: "Сверстать адаптивную карточку товара с Flexbox/Grid. Поддержка мобильных устройств обязательна." },
  { id: 6, title: "Сетевые протоколы TCP/IP", category: "Сети", deadline: "2 мая", points: 18, status: "upcoming", submissions: 0, description: "Написать реферат по стеку протоколов TCP/IP. Разобрать модель OSI, привести примеры." },
  { id: 7, title: "Git и система контроля версий", category: "DevOps", deadline: "5 мая", points: 10, status: "upcoming", submissions: 0, description: "Создать репозиторий, сделать 10 осмысленных коммитов, создать ветку feature и смерджить в main." },
  { id: 8, title: "Кибербезопасность: основы", category: "Безопасность", deadline: "20 апр", points: 22, status: "closed", submissions: 18, description: "Провести аудит безопасности тестового сайта. Найти и описать уязвимости XSS, SQL Injection." },
];

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 1, student: "Алёна Соколова", action: "Сдала задание", subject: "Алгоритмы сортировки", score: 20, date: "24 апр", avatar: "АС", type: "plus" },
  { id: 2, student: "Полина Орлова", action: "Получила достижение", subject: "Мастер кода", score: null, date: "24 апр", avatar: "ПО", type: "achievement" },
  { id: 3, student: "Дмитрий Волков", action: "Сдал задание", subject: "Основы SQL", score: 14, date: "23 апр", avatar: "ДВ", type: "plus" },
  { id: 4, student: "Мария Петрова", action: "Выполнила задание", subject: "ООП", score: 23, date: "23 апр", avatar: "МП", type: "plus" },
  { id: 5, student: "Иван Козлов", action: "Штраф за просрочку", subject: "Кибербезопасность", score: -5, date: "22 апр", avatar: "ИК", type: "minus" },
  { id: 6, student: "Кирилл Смирнов", action: "Сдал задание", subject: "HTML/CSS макет", score: 12, date: "21 апр", avatar: "КС", type: "plus" },
];

const ALL_ACHIEVEMENTS = [
  { id: 1, icon: "🏆", title: "Лучший студент", desc: "Топ-1 по рейтингу", earned: true, color: "from-yellow-500 to-orange-500" },
  { id: 2, icon: "🔥", title: "Серия 7 дней", desc: "Активность 7 дней подряд", earned: true, color: "from-orange-500 to-red-500" },
  { id: 3, icon: "💎", title: "Перфекционист", desc: "Полный балл за задание", earned: true, color: "from-blue-500 to-violet-500" },
  { id: 4, icon: "⚡", title: "Спидран", desc: "Сдать задание за 1 час", earned: false, color: "from-teal-500 to-green-500" },
  { id: 5, icon: "📚", title: "Книгочей", desc: "50 выполненных заданий", earned: false, color: "from-pink-500 to-rose-500" },
  { id: 6, icon: "🎯", title: "Снайпер", desc: "10 заданий без ошибок", earned: false, color: "from-violet-500 to-purple-500" },
  { id: 7, icon: "🚀", title: "Мастер кода", desc: "5 заданий по программированию", earned: true, color: "from-indigo-500 to-blue-500" },
  { id: 8, icon: "🛡️", title: "Хакер-защитник", desc: "Задание по кибербезопасности", earned: false, color: "from-red-500 to-rose-600" },
  { id: 9, icon: "🗄️", title: "Архитектор БД", desc: "3 задания по базам данных", earned: false, color: "from-cyan-500 to-teal-500" },
  { id: 10, icon: "🌐", title: "Веб-мастер", desc: "5 заданий по веб-разработке", earned: false, color: "from-green-500 to-emerald-500" },
  { id: 11, icon: "🔗", title: "Командный игрок", desc: "Участие в 3 командных проектах", earned: false, color: "from-amber-500 to-yellow-500" },
  { id: 12, icon: "🤖", title: "ИИ-исследователь", desc: "Выполнить задание по ML", earned: false, color: "from-fuchsia-500 to-pink-500" },
];

const criteria = [
  { name: "Своевременность", weight: 30, color: "gradient-violet" },
  { name: "Качество работы", weight: 40, color: "gradient-teal" },
  { name: "Активность", weight: 20, color: "gradient-orange" },
  { name: "Доп. задания", weight: 10, color: "gradient-pink" },
];

const navItems = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "profiles", label: "Профили", icon: "Users" },
  { id: "tasks", label: "Задания", icon: "ClipboardList" },
  { id: "rating", label: "Рейтинг", icon: "Trophy" },
  { id: "reports", label: "Отчёты", icon: "BarChart3" },
  { id: "history", label: "История", icon: "History" },
  { id: "panel", label: "Панель", icon: "Settings2" },
];

const categoryColors: Record<string, string> = {
  "Отлично": "text-teal-400 bg-teal-400/10",
  "Хорошо": "text-violet-400 bg-violet-400/10",
  "Удовлетворительно": "text-orange-400 bg-orange-400/10",
};

const statusColors: Record<string, string> = {
  active: "text-teal-400 bg-teal-400/10",
  upcoming: "text-violet-400 bg-violet-400/10",
  closed: "text-gray-400 bg-gray-400/10",
};

const statusLabels: Record<string, string> = {
  active: "Активно", upcoming: "Скоро", closed: "Завершено",
};

function getCategory(score: number) {
  if (score >= 90) return "Отлично";
  if (score >= 75) return "Хорошо";
  return "Удовлетворительно";
}

function getLevel(score: number) {
  if (score >= 90) return "Эксперт";
  if (score >= 80) return "Продвинутый";
  if (score >= 70) return "Средний";
  return "Начинающий";
}

/* ─── Modal ─── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-2xl animate-slide-up"
        style={{ background: "hsl(230 22% 12%)", border: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-rubik font-bold text-lg text-white">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-muted-foreground">
            <Icon name="X" size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── Input ─── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white bg-white/5 border border-border focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-muted-foreground";

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
export default function Index() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);

  const notifications = [
    { id: 1, text: "Алёна Соколова сдала задание «Алгоритмы»", time: "5 мин назад", type: "success", icon: "CheckCircle" },
    { id: 2, text: "Добавлено новое задание «REST API на Flask»", time: "1 час назад", type: "info", icon: "PlusCircle" },
    { id: 3, text: "Иван Козлов просрочил задание", time: "3 часа назад", type: "warning", icon: "AlertCircle" },
    { id: 4, text: "Полина Орлова получила достижение «Мастер кода»", time: "Вчера", type: "achievement", icon: "Trophy" },
  ];

  function addHistory(entry: Omit<HistoryEntry, "id">) {
    setHistory(prev => [{ ...entry, id: Date.now() }, ...prev]);
  }

  function updateScore(studentId: number, delta: number, subject: string, actionLabel: string, type: "plus" | "minus") {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const newScore = Math.max(0, Math.min(100, s.score + delta));
      const newCategory = getCategory(newScore);
      const newLevel = getLevel(newScore);
      return { ...s, score: newScore, category: newCategory, level: newLevel, trend: (delta >= 0 ? "+" : "") + delta };
    }));
    const st = students.find(s => s.id === studentId);
    if (st) {
      addHistory({ student: st.name, avatar: st.avatar, action: actionLabel, subject, score: delta, date: "Сейчас", type });
    }
  }

  function addTask(t: Omit<Task, "id" | "submissions">) {
    setTasks(prev => [...prev, { ...t, id: Date.now(), submissions: 0 }]);
  }

  function updateTask(id: number, t: Partial<Task>) {
    setTasks(prev => prev.map(x => x.id === id ? { ...x, ...t } : x));
  }

  function deleteTask(id: number) {
    setTasks(prev => prev.filter(x => x.id !== id));
  }

  const sharedProps = { students, tasks, history, updateScore, addTask, updateTask, deleteTask, addHistory };

  return (
    <div className="flex h-screen bg-background bg-mesh overflow-hidden font-golos">
      <aside
        className={`flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} shrink-0`}
        style={{ background: "hsl(230 25% 6%)", borderRight: "1px solid hsl(var(--border))" }}
      >
        <div className="flex items-center gap-3 p-5 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-violet flex items-center justify-center shrink-0 glow-violet">
            <span className="text-white font-rubik font-bold text-lg">E</span>
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <div className="font-rubik font-bold text-lg text-white leading-none">EduRate</div>
              <div className="text-xs text-muted-foreground">Информационные технологии</div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActive(item.id as Section)}
              className={`nav-item w-full ${active === item.id ? "active" : ""} ${!sidebarOpen ? "justify-center" : ""}`}>
              <Icon name={item.icon} size={20} />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button className="nav-item w-full justify-center" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={18} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div>
            <h1 className="font-rubik font-bold text-xl text-white">{navItems.find(n => n.id === active)?.label}</h1>
            <p className="text-sm text-muted-foreground">24 апреля 2026 · Информационные технологии</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="relative w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-violet-500/30 transition-all"
                onClick={() => setNotifOpen(!notifOpen)}>
                <Icon name="Bell" size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl glass border border-border p-4 z-50 animate-slide-up space-y-2">
                  <div className="font-rubik font-semibold text-sm text-white mb-3">Уведомления</div>
                  {notifications.map(n => (
                    <div key={n.id} className="flex gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.type === "success" ? "bg-teal-400/15 text-teal-400" : n.type === "warning" ? "bg-orange-400/15 text-orange-400" : n.type === "achievement" ? "bg-yellow-400/15 text-yellow-400" : "bg-violet-400/15 text-violet-400"}`}>
                        <Icon name={n.icon} size={15} fallback="Bell" />
                      </div>
                      <div>
                        <p className="text-xs text-foreground leading-snug">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass cursor-pointer hover:border-violet-500/30 transition-all">
              <div className="w-7 h-7 rounded-lg gradient-violet flex items-center justify-center">
                <span className="text-white text-xs font-bold">АП</span>
              </div>
              <span className="text-sm font-medium text-foreground">Преподаватель</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {active === "dashboard" && <Dashboard {...sharedProps} />}
          {active === "profiles" && <Profiles {...sharedProps} />}
          {active === "tasks" && <Tasks {...sharedProps} />}
          {active === "rating" && <Rating students={students} />}
          {active === "reports" && <Reports students={students} tasks={tasks} />}
          {active === "history" && <HistorySection history={history} />}
          {active === "panel" && <Panel />}
        </main>
      </div>
    </div>
  );
}

/* ─── Shared props type ─── */
type SharedProps = {
  students: Student[]; tasks: Task[]; history: HistoryEntry[];
  updateScore: (id: number, delta: number, subject: string, action: string, type: "plus" | "minus") => void;
  addTask: (t: Omit<Task, "id" | "submissions">) => void;
  updateTask: (id: number, t: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  addHistory: (e: Omit<HistoryEntry, "id">) => void;
};

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */
function Dashboard({ students, tasks, history }: SharedProps) {
  const avg = Math.round(students.reduce((a, s) => a + s.score, 0) / students.length);
  const activeTasks = tasks.filter(t => t.status === "active").length;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Студентов", value: students.length.toString(), icon: "Users", color: "gradient-violet", glow: "glow-violet", sub: "8 активных" },
          { label: "Заданий активно", value: activeTasks.toString(), icon: "ClipboardList", color: "gradient-teal", glow: "glow-teal", sub: `${tasks.length} всего заданий` },
          { label: "Средний балл", value: avg.toString(), icon: "TrendingUp", color: "gradient-orange", glow: "glow-orange", sub: "▲ +4 к прошлой неделе" },
          { label: "Достижений", value: "47", icon: "Trophy", color: "gradient-pink", glow: "", sub: "12 в этом месяце" },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="font-rubik font-bold text-3xl text-white">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${s.color} ${s.glow} flex items-center justify-center`}>
                <Icon name={s.icon} size={18} className="text-white" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 stat-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-rubik font-semibold text-white">Топ студентов</h3>
            <span className="text-xs text-muted-foreground">По общему баллу</span>
          </div>
          <div className="space-y-2">
            {[...students].sort((a, b) => b.score - a.score).slice(0, 6).map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
                <span className={`font-rubik font-bold text-lg w-6 text-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-muted-foreground"}`}>{i + 1}</span>
                <div className="w-9 h-9 rounded-xl gradient-violet flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{s.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{s.name}</p>
                  <div className="progress-bar mt-1">
                    <div className="progress-fill gradient-violet" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
                <span className={`badge-achievement text-xs ${categoryColors[s.category]}`}>{s.category}</span>
                <div className="text-right">
                  <p className="font-rubik font-bold text-white">{s.score}</p>
                  <p className={`text-xs ${s.trend.startsWith("+") ? "text-teal-400" : "text-red-400"}`}>{s.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-3">Последние события</h3>
            <div className="space-y-2">
              {history.slice(0, 4).map(h => (
                <div key={h.id} className="flex items-center gap-2 py-2 border-b border-border last:border-0">
                  <div className="w-7 h-7 rounded-lg gradient-violet flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{h.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{h.student.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground truncate">{h.subject}</p>
                  </div>
                  {h.score !== null ? (
                    <span className={`text-xs font-bold ${h.score > 0 ? "text-teal-400" : "text-red-400"}`}>{h.score > 0 ? `+${h.score}` : h.score}</span>
                  ) : <span>🏆</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-3">Дедлайны</h3>
            {tasks.filter(t => t.status === "active").slice(0, 3).map(t => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <p className="text-xs text-foreground truncate mr-2">{t.title}</p>
                <span className="text-xs text-orange-400 shrink-0">{t.deadline}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PROFILES — начисление/штраф
══════════════════════════════════════ */
function Profiles({ students, tasks, updateScore }: SharedProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [modal, setModal] = useState<"points" | "penalty" | null>(null);
  const [amount, setAmount] = useState("10");
  const [reason, setReason] = useState("");
  const [taskRef, setTaskRef] = useState("");

  const sel = students.find(s => s.id === selected);

  function handleSubmit() {
    if (!selected || !reason.trim()) return;
    const delta = modal === "penalty" ? -Math.abs(parseInt(amount) || 0) : Math.abs(parseInt(amount) || 0);
    const action = modal === "penalty" ? "Штраф: " + reason : "Начислено: " + reason;
    updateScore(selected, delta, taskRef || reason, action, modal === "penalty" ? "minus" : "plus");
    setModal(null);
    setAmount("10"); setReason(""); setTaskRef("");
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {students.map((s, i) => (
          <div key={s.id}
            className={`stat-card cursor-pointer animate-slide-up ${selected === s.id ? "border-violet-500/50 glow-violet" : ""}`}
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => setSelected(selected === s.id ? null : s.id)}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl gradient-violet flex items-center justify-center shrink-0">
                <span className="text-white font-rubik font-bold text-sm">{s.avatar}</span>
              </div>
              <div className="min-w-0">
                <p className="font-rubik font-semibold text-white text-sm truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.level}</p>
              </div>
              <span className="ml-auto text-xl shrink-0">{s.badge}</span>
            </div>
            <div className="progress-bar mb-2">
              <div className="progress-fill gradient-violet" style={{ width: `${s.score}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-rubik font-bold text-xl text-white">{s.score}</span>
              <span className={`badge-achievement text-xs ${categoryColors[s.category]}`}>{s.category}</span>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div className="stat-card animate-slide-up border-violet-500/30">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-violet flex items-center justify-center glow-violet">
                <span className="text-white font-rubik font-bold text-lg">{sel.avatar}</span>
              </div>
              <div>
                <h2 className="font-rubik font-bold text-xl text-white">{sel.name}</h2>
                <p className="text-muted-foreground text-sm">{sel.level} · {sel.badge} · {sel.tasks} заданий</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModal("points")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-teal text-white text-sm font-medium glow-teal hover:opacity-90 transition-opacity">
                <Icon name="Plus" size={15} /> Начислить баллы
              </button>
              <button onClick={() => setModal("penalty")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-all">
                <Icon name="Minus" size={15} /> Штраф
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Балл", value: sel.score, color: "text-white" },
              { label: "Заданий", value: sel.tasks, color: "text-white" },
              { label: "Уровень", value: sel.level, color: "text-violet-400" },
              { label: "Тренд месяца", value: sel.trend, color: sel.trend.startsWith("+") ? "text-teal-400" : "text-red-400" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-white/5">
                <p className={`font-rubik font-bold text-xl ${item.color}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && sel && (
        <Modal title={modal === "points" ? `Начислить баллы — ${sel.name}` : `Штраф — ${sel.name}`} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Field label="Количество баллов">
              <input className={inputCls} type="number" min="1" max="50" value={amount}
                onChange={e => setAmount(e.target.value)} placeholder="10" />
            </Field>
            <Field label="Причина / Задание">
              <input className={inputCls} value={reason} onChange={e => setReason(e.target.value)}
                placeholder={modal === "points" ? "Выполнено задание «Алгоритмы»" : "Просрочено задание, нарушение..."} />
            </Field>
            <Field label="Ссылка на задание (необязательно)">
              <select className={inputCls} value={taskRef} onChange={e => setTaskRef(e.target.value)}>
                <option value="">— Выбрать задание —</option>
                {tasks.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
              </select>
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 text-muted-foreground text-sm hover:bg-white/10 transition-all">
                Отмена
              </button>
              <button onClick={handleSubmit}
                className={`flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all ${modal === "points" ? "gradient-teal glow-teal hover:opacity-90" : "bg-red-500 hover:bg-red-600"}`}>
                {modal === "points" ? `+${amount} баллов` : `-${amount} баллов`}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   TASKS — CRUD
══════════════════════════════════════ */
const CATEGORIES = ["Алгоритмы", "Базы данных", "Веб-разработка", "Программирование", "Сети", "DevOps", "Безопасность", "Машинное обучение", "Операционные системы", "Другое"];

function Tasks({ students, tasks, addTask, updateTask, deleteTask }: SharedProps) {
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "closed">("all");
  const [form, setForm] = useState({ title: "", category: "Алгоритмы", deadline: "", points: "15", status: "active" as Task["status"], description: "" });

  function openAdd() {
    setForm({ title: "", category: "Алгоритмы", deadline: "", points: "15", status: "active", description: "" });
    setEditId(null); setModal("add");
  }

  function openEdit(t: Task) {
    setForm({ title: t.title, category: t.category, deadline: t.deadline, points: t.points.toString(), status: t.status, description: t.description });
    setEditId(t.id); setModal("edit");
  }

  function openDelete(id: number) { setEditId(id); setModal("delete"); }

  function handleSave() {
    if (!form.title.trim() || !form.deadline.trim()) return;
    const data = { title: form.title, category: form.category, deadline: form.deadline, points: parseInt(form.points) || 10, status: form.status, description: form.description };
    if (modal === "add") addTask(data);
    else if (modal === "edit" && editId) updateTask(editId, data);
    setModal(null);
  }

  const filtered = tasks.filter(t => filter === "all" || t.status === filter);

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["all", "active", "upcoming", "closed"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "gradient-violet text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>
              {f === "all" ? `Все (${tasks.length})` : f === "active" ? `Активные (${tasks.filter(t => t.status === "active").length})` : f === "upcoming" ? `Скоро (${tasks.filter(t => t.status === "upcoming").length})` : `Завершённые (${tasks.filter(t => t.status === "closed").length})`}
            </button>
          ))}
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-violet text-white text-sm font-medium glow-violet hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={15} /> Добавить задание
        </button>
      </div>

      {filtered.map((t, i) => (
        <div key={t.id} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${t.status === "active" ? "gradient-teal" : t.status === "upcoming" ? "gradient-violet" : "bg-muted"}`}>
              <Icon name="Code2" size={18} className="text-white" fallback="ClipboardList" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="font-rubik font-semibold text-white">{t.title}</p>
                <span className={`badge-achievement text-xs ${statusColors[t.status]}`}>{statusLabels[t.status]}</span>
                <span className="badge-achievement text-xs text-blue-400 bg-blue-400/10">{t.category}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{t.description}</p>
              <p className="text-xs text-muted-foreground">Дедлайн: {t.deadline} · {t.submissions} из {students.length} сдали</p>
              {t.status === "active" && (
                <div className="progress-bar mt-2">
                  <div className="progress-fill gradient-teal" style={{ width: `${(t.submissions / students.length) * 100}%` }} />
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="font-rubik font-bold text-white text-xl">{t.points}</p>
              <p className="text-xs text-muted-foreground">баллов</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(t)}
                className="w-8 h-8 rounded-lg bg-violet-400/10 text-violet-400 flex items-center justify-center hover:bg-violet-400/20 transition-all">
                <Icon name="Pencil" size={14} />
              </button>
              <button onClick={() => openDelete(t.id)}
                className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 flex items-center justify-center hover:bg-red-400/20 transition-all">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="ClipboardList" size={40} className="mx-auto mb-3 opacity-30" />
          <p>Заданий нет</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Modal title={modal === "add" ? "Новое задание" : "Редактировать задание"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Field label="Название задания">
              <input className={inputCls} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Алгоритмы сортировки" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Категория">
                <select className={inputCls} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Статус">
                <select className={inputCls} value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Task["status"] })}>
                  <option value="upcoming">Скоро</option>
                  <option value="active">Активно</option>
                  <option value="closed">Завершено</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Дедлайн">
                <input className={inputCls} value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })}
                  placeholder="30 апр" />
              </Field>
              <Field label="Баллы за задание">
                <input className={inputCls} type="number" min="1" max="100" value={form.points}
                  onChange={e => setForm({ ...form, points: e.target.value })} />
              </Field>
            </div>
            <Field label="Описание">
              <textarea className={`${inputCls} resize-none`} rows={3} value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Подробное описание задания..." />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-muted-foreground text-sm hover:bg-white/10 transition-all">Отмена</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl gradient-violet text-white text-sm font-medium hover:opacity-90 transition-opacity">
                {modal === "add" ? "Создать задание" : "Сохранить изменения"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {modal === "delete" && (
        <Modal title="Удалить задание?" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Это действие необратимо. Задание «{tasks.find(t => t.id === editId)?.title}» будет удалено.</p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-muted-foreground text-sm hover:bg-white/10 transition-all">Отмена</button>
              <button onClick={() => { if (editId) deleteTask(editId); setModal(null); }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all">
                Удалить
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   RATING
══════════════════════════════════════ */
function Rating({ students }: { students: Student[] }) {
  const sorted = [...students].sort((a, b) => b.score - a.score);
  const top3 = [sorted[1], sorted[0], sorted[2]].filter(Boolean);
  const heights = ["h-24", "h-36", "h-20"];
  const medals = ["🥈", "🥇", "🥉"];
  const places = [2, 1, 3];
  const gradients = ["gradient-blue", "gradient-violet glow-violet", "gradient-orange"];

  return (
    <div className="animate-fade-in">
      <div className="flex items-end justify-center gap-6 mb-8 h-44">
        {top3.map((s, pos) => (
          <div key={s.id} className="flex flex-col items-center gap-2">
            <span className="text-2xl">{medals[pos]}</span>
            <div className="w-14 h-14 rounded-2xl gradient-violet flex items-center justify-center">
              <span className="text-white font-bold font-rubik">{s.avatar}</span>
            </div>
            <p className="text-xs font-medium text-white text-center w-20 truncate">{s.name.split(" ")[0]}</p>
            <div className={`w-20 ${heights[pos]} rounded-t-2xl ${gradients[pos]} flex items-start justify-center pt-3`}>
              <span className="font-rubik font-bold text-white text-xl">#{places[pos]}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="stat-card space-y-2">
        <h3 className="font-rubik font-semibold text-white mb-4">Полный рейтинг</h3>
        {sorted.map((s, i) => (
          <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
            <span className={`font-rubik font-bold text-xl w-8 text-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-muted-foreground"}`}>{i + 1}</span>
            <div className="w-10 h-10 rounded-xl gradient-violet flex items-center justify-center">
              <span className="text-white text-xs font-bold">{s.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-white">{s.name}</p>
              <div className="progress-bar mt-1">
                <div className="progress-fill gradient-violet" style={{ width: `${s.score}%` }} />
              </div>
            </div>
            <span className="font-rubik font-bold text-white text-xl">{s.score}</span>
            <span className={`text-sm font-medium w-10 text-right ${s.trend.startsWith("+") ? "text-teal-400" : "text-red-400"}`}>{s.trend}</span>
            <span className={`badge-achievement text-xs ${categoryColors[s.category]}`}>{s.category}</span>
            <span className="text-xl">{s.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   REPORTS
══════════════════════════════════════ */
function Reports({ students, tasks }: { students: Student[]; tasks: Task[] }) {
  const bars = [65, 80, 72, 90, 84, 76, 88, 95, 83, 79, 91, 87];
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const excellent = students.filter(s => s.score >= 90).length;
  const good = students.filter(s => s.score >= 75 && s.score < 90).length;
  const satisf = students.filter(s => s.score < 75).length;
  const total = students.length;

  const catStats = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-rubik font-semibold text-white mb-6">Средний балл по месяцам</h3>
          <div className="flex items-end gap-1.5 h-40">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md gradient-violet transition-all duration-700" style={{ height: `${h}%`, opacity: i === 3 ? 1 : 0.55 }} />
                <span className="text-xs text-muted-foreground" style={{ fontSize: "10px" }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3 className="font-rubik font-semibold text-white mb-6">Распределение успеваемости</h3>
          <div className="space-y-4">
            {[
              { label: "Отлично (90–100)", count: excellent, color: "gradient-teal" },
              { label: "Хорошо (75–89)", count: good, color: "gradient-violet" },
              { label: "Удовлетворительно", count: satisf, color: "gradient-orange" },
            ].map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{c.label}</span>
                  <span className="text-muted-foreground">{c.count} чел. ({Math.round(c.count / total * 100)}%)</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${c.color}`} style={{ width: `${(c.count / total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-rubik font-semibold text-white">Критерии оценивания</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {criteria.map((c, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5">
                <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mx-auto mb-2`}>
                  <span className="font-rubik font-bold text-white">{c.weight}%</span>
                </div>
                <p className="text-xs font-medium text-white">{c.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-rubik font-semibold text-white">Заданий по категориям</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-teal text-white text-xs font-medium hover:opacity-90">
              <Icon name="Download" size={13} /> Экспорт
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(catStats).map(([cat, count], i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{cat}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 progress-bar">
                    <div className="progress-fill gradient-violet" style={{ width: `${(count / tasks.length) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-4 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   HISTORY
══════════════════════════════════════ */
function HistorySection({ history }: { history: HistoryEntry[] }) {
  return (
    <div className="animate-fade-in space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{history.length} событий</p>
      </div>
      {history.map((h, i) => (
        <div key={h.id} className="stat-card flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${h.type === "plus" ? "gradient-teal" : h.type === "minus" ? "bg-red-500/20" : "gradient-violet"}`}>
            <span className="text-white text-xs font-bold">{h.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white"><span className="font-semibold">{h.student}</span><span className="text-muted-foreground mx-1">·</span>{h.action}</p>
            <p className="text-xs text-muted-foreground">{h.subject}</p>
          </div>
          <div className="text-right shrink-0">
            {h.score !== null ? (
              <p className={`font-rubik font-bold text-lg ${h.score > 0 ? "text-teal-400" : "text-red-400"}`}>{h.score > 0 ? `+${h.score}` : h.score}</p>
            ) : <span className="text-xl">🏆</span>}
            <p className="text-xs text-muted-foreground">{h.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   PANEL
══════════════════════════════════════ */
function Panel() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-rubik font-semibold text-white mb-5">Система достижений ИТ</h3>
          <div className="grid grid-cols-2 gap-3">
            {ALL_ACHIEVEMENTS.map((a) => (
              <div key={a.id} className={`p-3 rounded-2xl text-center transition-all ${a.earned ? `bg-gradient-to-br ${a.color}` : "bg-white/5 opacity-40"}`}>
                <div className="text-2xl mb-1.5">{a.icon}</div>
                <p className="text-xs font-semibold text-white">{a.title}</p>
                <p className="text-xs text-white/70 mt-0.5">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-4">Настройки системы</h3>
            <div className="space-y-3">
              {[
                { label: "Автоматические уведомления", enabled: true },
                { label: "Напоминания о дедлайнах", enabled: true },
                { label: "Публичный рейтинг", enabled: false },
                { label: "Экспорт отчётов", enabled: true },
                { label: "Достижения за задания ИТ", enabled: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">{s.label}</span>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer ${s.enabled ? "gradient-violet" : "bg-muted"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${s.enabled ? "left-5" : "left-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-4">Шкала оценок</h3>
            <div className="space-y-2">
              {[
                { range: "90–100", label: "Отлично", color: "text-teal-400 bg-teal-400/10" },
                { range: "75–89", label: "Хорошо", color: "text-violet-400 bg-violet-400/10" },
                { range: "60–74", label: "Удовлетворительно", color: "text-orange-400 bg-orange-400/10" },
                { range: "0–59", label: "Неудовлетворительно", color: "text-red-400 bg-red-400/10" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{c.range} баллов</span>
                  <span className={`badge-achievement text-xs ${c.color}`}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-violet text-white font-medium glow-violet hover:opacity-90 transition-opacity">
            <Icon name="Download" size={16} /> Экспорт всех данных
          </button>
        </div>
      </div>
    </div>
  );
}
