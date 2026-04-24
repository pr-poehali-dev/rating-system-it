import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "dashboard" | "profiles" | "tasks" | "rating" | "reports" | "history" | "panel";

const students = [
  { id: 1, name: "Алёна Соколова", avatar: "АС", score: 94, level: "Эксперт", tasks: 28, badge: "🏆", trend: "+5", category: "Отлично" },
  { id: 2, name: "Дмитрий Волков", avatar: "ДВ", score: 87, level: "Продвинутый", tasks: 24, badge: "⭐", trend: "+3", category: "Хорошо" },
  { id: 3, name: "Мария Петрова", avatar: "МП", score: 82, level: "Продвинутый", tasks: 21, badge: "🎯", trend: "+7", category: "Хорошо" },
  { id: 4, name: "Иван Козлов", avatar: "ИК", score: 76, level: "Средний", tasks: 18, badge: "📚", trend: "-2", category: "Удовлетворительно" },
  { id: 5, name: "Полина Орлова", avatar: "ПО", score: 91, level: "Эксперт", tasks: 26, badge: "💎", trend: "+4", category: "Отлично" },
  { id: 6, name: "Артём Новиков", avatar: "АН", score: 68, level: "Начинающий", tasks: 15, badge: "🌱", trend: "+1", category: "Удовлетворительно" },
];

const tasks = [
  { id: 1, title: "Алгоритмы сортировки", category: "Программирование", deadline: "25 апр", points: 20, status: "active", submissions: 14 },
  { id: 2, title: "Математический анализ #5", category: "Математика", deadline: "27 апр", points: 15, status: "active", submissions: 9 },
  { id: 3, title: "История ВОВ — реферат", category: "История", deadline: "30 апр", points: 10, status: "upcoming", submissions: 0 },
  { id: 4, title: "Физика — лаб. работа №3", category: "Физика", deadline: "22 апр", points: 25, status: "closed", submissions: 22 },
  { id: 5, title: "Английский: эссе B2", category: "Английский", deadline: "28 апр", points: 12, status: "active", submissions: 7 },
];

const notifications = [
  { id: 1, text: "Алёна Соколова сдала задание «Алгоритмы»", time: "5 мин назад", type: "success", icon: "CheckCircle" },
  { id: 2, text: "Новое задание добавлено в «Математику»", time: "1 час назад", type: "info", icon: "PlusCircle" },
  { id: 3, text: "Иван Козлов просрочил задание", time: "3 часа назад", type: "warning", icon: "AlertCircle" },
  { id: 4, text: "Полина Орлова получила достижение «Эксперт»", time: "Вчера", type: "achievement", icon: "Trophy" },
];

const history = [
  { id: 1, student: "Алёна Соколова", action: "Сдала задание", subject: "Алгоритмы сортировки", score: 20, date: "24 апр", avatar: "АС" },
  { id: 2, student: "Полина Орлова", action: "Получила достижение", subject: "Эксперт", score: null as number | null, date: "24 апр", avatar: "ПО" },
  { id: 3, student: "Дмитрий Волков", action: "Сдал задание", subject: "Мат. анализ #4", score: 14, date: "23 апр", avatar: "ДВ" },
  { id: 4, student: "Мария Петрова", action: "Выполнила задание", subject: "История реферат", score: 9, date: "23 апр", avatar: "МП" },
  { id: 5, student: "Иван Козлов", action: "Просрочил задание", subject: "Физика лаб. №2", score: 0, date: "22 апр", avatar: "ИК" },
];

const achievements = [
  { id: 1, icon: "🏆", title: "Лучший студент", desc: "Топ-1 по рейтингу", earned: true, color: "from-yellow-500 to-orange-500" },
  { id: 2, icon: "🔥", title: "Серия 7 дней", desc: "Активность 7 дней подряд", earned: true, color: "from-orange-500 to-red-500" },
  { id: 3, icon: "💎", title: "Перфекционист", desc: "100 баллов за задание", earned: true, color: "from-blue-500 to-violet-500" },
  { id: 4, icon: "⚡", title: "Спидран", desc: "Сдать за 1 час", earned: false, color: "from-teal-500 to-green-500" },
  { id: 5, icon: "📚", title: "Книгочей", desc: "50 выполненных заданий", earned: false, color: "from-pink-500 to-rose-500" },
  { id: 6, icon: "🎯", title: "Меткий стрелок", desc: "10 заданий без ошибок", earned: false, color: "from-violet-500 to-purple-500" },
];

const criteria = [
  { name: "Своевременность", weight: 30, color: "gradient-violet" },
  { name: "Качество работы", weight: 40, color: "gradient-teal" },
  { name: "Активность", weight: 20, color: "gradient-orange" },
  { name: "Дополнительные задания", weight: 10, color: "gradient-pink" },
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
  active: "Активно",
  upcoming: "Скоро",
  closed: "Завершено",
};

export default function Index() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background bg-mesh overflow-hidden font-golos">
      {/* Sidebar */}
      <aside
        className={`flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} shrink-0`}
        style={{ background: "hsl(230 25% 6%)", borderRight: "1px solid hsl(var(--border))" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-violet flex items-center justify-center shrink-0 glow-violet">
            <span className="text-white font-rubik font-bold text-lg">E</span>
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <div className="font-rubik font-bold text-lg text-white leading-none">EduRate</div>
              <div className="text-xs text-muted-foreground">Система оценки</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id as Section)}
              className={`nav-item w-full ${active === item.id ? "active" : ""} ${!sidebarOpen ? "justify-center" : ""}`}
            >
              <Icon name={item.icon} size={20} />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border">
          <button
            className="nav-item w-full justify-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={18} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div>
            <h1 className="font-rubik font-bold text-xl text-white">
              {navItems.find(n => n.id === active)?.label}
            </h1>
            <p className="text-sm text-muted-foreground">24 апреля 2026</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-violet-500/30 transition-all"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Icon name="Bell" size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl glass border border-border p-4 z-50 animate-slide-up space-y-3">
                  <div className="font-rubik font-semibold text-sm text-white mb-3">Уведомления</div>
                  {notifications.map(n => (
                    <div key={n.id} className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        n.type === "success" ? "bg-teal-400/15 text-teal-400" :
                        n.type === "warning" ? "bg-orange-400/15 text-orange-400" :
                        n.type === "achievement" ? "bg-yellow-400/15 text-yellow-400" :
                        "bg-violet-400/15 text-violet-400"
                      }`}>
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
            {/* Profile */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass cursor-pointer hover:border-violet-500/30 transition-all">
              <div className="w-7 h-7 rounded-lg gradient-violet flex items-center justify-center">
                <span className="text-white text-xs font-bold">АП</span>
              </div>
              <span className="text-sm font-medium text-foreground">Преподаватель</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {active === "dashboard" && <Dashboard />}
          {active === "profiles" && <Profiles />}
          {active === "tasks" && <Tasks />}
          {active === "rating" && <Rating />}
          {active === "reports" && <Reports />}
          {active === "history" && <HistorySection />}
          {active === "panel" && <Panel />}
        </main>
      </div>
    </div>
  );
}

/* ─── Dashboard ─── */
function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Студентов", value: "24", icon: "Users", color: "gradient-violet", glow: "glow-violet", sub: "+2 на этой неделе" },
          { label: "Заданий активно", value: "8", icon: "ClipboardList", color: "gradient-teal", glow: "glow-teal", sub: "3 завершается скоро" },
          { label: "Средний балл", value: "83", icon: "TrendingUp", color: "gradient-orange", glow: "glow-orange", sub: "▲ +4 к прошлой неделе" },
          { label: "Достижений выдано", value: "47", icon: "Trophy", color: "gradient-pink", glow: "", sub: "12 в этом месяце" },
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
        {/* Top Students */}
        <div className="col-span-2 stat-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-rubik font-semibold text-white">Топ студентов</h3>
            <span className="text-xs text-muted-foreground">По общему баллу</span>
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).sort((a, b) => b.score - a.score).map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <span className={`font-rubik font-bold text-lg w-6 text-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <div className="w-9 h-9 rounded-xl gradient-violet flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{s.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.tasks} заданий</p>
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

        {/* Achievements + Deadlines */}
        <div className="space-y-4">
          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-4">Достижения недели</h3>
            <div className="space-y-3">
              {achievements.filter(a => a.earned).map(a => (
                <div key={a.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-lg`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-3">Скоро дедлайны</h3>
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

/* ─── Profiles ─── */
function Profiles() {
  const [selected, setSelected] = useState<number | null>(null);
  const sel = students.find(s => s.id === selected);

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {students.map((s, i) => (
          <div
            key={s.id}
            className={`stat-card cursor-pointer ${selected === s.id ? "border-violet-500/50 glow-violet" : ""} animate-slide-up`}
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => setSelected(selected === s.id ? null : s.id)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-violet flex items-center justify-center">
                <span className="text-white font-rubik font-bold">{s.avatar}</span>
              </div>
              <div>
                <p className="font-rubik font-semibold text-white">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.level}</p>
              </div>
              <span className="ml-auto text-2xl">{s.badge}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Общий балл</span>
              <span className={`text-xs font-medium ${s.trend.startsWith("+") ? "text-teal-400" : "text-red-400"}`}>{s.trend} этот месяц</span>
            </div>
            <div className="progress-bar mb-1">
              <div className="progress-fill gradient-violet" style={{ width: `${s.score}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-rubik font-bold text-2xl text-white">{s.score}</span>
              <span className={`badge-achievement text-xs ${categoryColors[s.category]}`}>{s.category}</span>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div className="stat-card animate-slide-up border-violet-500/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-violet flex items-center justify-center glow-violet">
              <span className="text-white font-rubik font-bold text-xl">{sel.avatar}</span>
            </div>
            <div>
              <h2 className="font-rubik font-bold text-2xl text-white">{sel.name}</h2>
              <p className="text-muted-foreground">{sel.level} · {sel.badge} · {sel.tasks} заданий выполнено</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Балл", value: sel.score },
              { label: "Заданий", value: sel.tasks },
              { label: "Категория", value: sel.category },
              { label: "Тренд", value: sel.trend },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-white/5">
                <p className="font-rubik font-bold text-2xl text-white">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Tasks ─── */
function Tasks() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">{tasks.length} заданий</p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-violet text-white text-sm font-medium glow-violet hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={15} /> Добавить задание
        </button>
      </div>
      {tasks.map((t, i) => (
        <div key={t.id} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              t.status === "active" ? "gradient-teal" : t.status === "upcoming" ? "gradient-violet" : "bg-muted"
            }`}>
              <Icon name="ClipboardList" size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-rubik font-semibold text-white">{t.title}</p>
                <span className={`badge-achievement text-xs ${statusColors[t.status]}`}>{statusLabels[t.status]}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.category} · Дедлайн: {t.deadline} · {t.submissions} сдали</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-rubik font-bold text-white text-xl">{t.points}</p>
              <p className="text-xs text-muted-foreground">баллов</p>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-violet-400/10 text-violet-400 flex items-center justify-center hover:bg-violet-400/20 transition-all">
                <Icon name="Pencil" size={14} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 flex items-center justify-center hover:bg-red-400/20 transition-all">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          </div>
          {t.status === "active" && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Сдали</span>
                <span>{t.submissions} / {students.length}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill gradient-teal" style={{ width: `${(t.submissions / students.length) * 100}%` }} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Rating ─── */
function Rating() {
  const sorted = [...students].sort((a, b) => b.score - a.score);
  return (
    <div className="animate-fade-in">
      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-8 h-44">
        {[sorted[1], sorted[0], sorted[2]].map((s, pos) => {
          const heights = ["h-28", "h-40", "h-24"];
          const medals = ["🥈", "🥇", "🥉"];
          const places = [2, 1, 3];
          const gradients = ["gradient-blue", "gradient-violet glow-violet", "gradient-orange"];
          return (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{medals[pos]}</span>
              <div className="w-16 h-16 rounded-2xl gradient-violet flex items-center justify-center">
                <span className="text-white font-bold font-rubik">{s.avatar}</span>
              </div>
              <p className="text-xs font-medium text-white text-center w-20 truncate">{s.name.split(" ")[0]}</p>
              <div className={`w-20 ${heights[pos]} rounded-t-2xl ${gradients[pos]} flex items-start justify-center pt-3`}>
                <span className="font-rubik font-bold text-white text-xl">#{places[pos]}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="stat-card space-y-3">
        <h3 className="font-rubik font-semibold text-white mb-4">Полный рейтинг</h3>
        {sorted.map((s, i) => (
          <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
            <span className={`font-rubik font-bold text-xl w-8 text-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-muted-foreground"}`}>
              {i + 1}
            </span>
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
            <span className={`text-sm font-medium ${s.trend.startsWith("+") ? "text-teal-400" : "text-red-400"}`}>{s.trend}</span>
            <span className="text-xl">{s.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Reports ─── */
function Reports() {
  const bars = [65, 80, 72, 90, 84, 76, 88, 95, 83, 79, 91, 87];
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="stat-card">
          <h3 className="font-rubik font-semibold text-white mb-6">Средний балл по месяцам</h3>
          <div className="flex items-end gap-2 h-40">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg gradient-violet transition-all duration-700"
                  style={{ height: `${h}%`, opacity: i === 3 ? 1 : 0.6 }}
                />
                <span className="text-xs text-muted-foreground">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories distribution */}
        <div className="stat-card">
          <h3 className="font-rubik font-semibold text-white mb-6">Распределение категорий</h3>
          <div className="space-y-4">
            {[
              { label: "Отлично (90–100)", pct: 33, color: "gradient-teal" },
              { label: "Хорошо (75–89)", pct: 42, color: "gradient-violet" },
              { label: "Удовлетворительно", pct: 25, color: "gradient-orange" },
            ].map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{c.label}</span>
                  <span className="text-muted-foreground font-medium">{c.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Criteria weights */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-rubik font-semibold text-white">Критерии оценивания</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-teal text-white text-sm font-medium glow-teal hover:opacity-90 transition-opacity">
            <Icon name="Download" size={14} /> Экспорт PDF
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {criteria.map((c, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-white/5 hover:bg-white/8 transition-all">
              <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center mx-auto mb-3`}>
                <span className="font-rubik font-bold text-white text-xl">{c.weight}%</span>
              </div>
              <p className="text-sm font-medium text-white">{c.name}</p>
              <div className="progress-bar mt-3">
                <div className={`progress-fill ${c.color}`} style={{ width: `${c.weight * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── History ─── */
function HistorySection() {
  return (
    <div className="animate-fade-in space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{history.length} событий</p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium hover:border-violet-500/30 transition-all">
          <Icon name="Filter" size={14} /> Фильтр
        </button>
      </div>
      {history.map((h, i) => (
        <div key={h.id} className="stat-card flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="w-10 h-10 rounded-xl gradient-violet flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{h.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">
              <span className="font-semibold">{h.student}</span>
              <span className="text-muted-foreground mx-1">·</span>
              {h.action}
            </p>
            <p className="text-xs text-muted-foreground">{h.subject}</p>
          </div>
          <div className="text-right shrink-0">
            {h.score !== null ? (
              <p className={`font-rubik font-bold text-lg ${h.score > 0 ? "text-teal-400" : "text-red-400"}`}>
                {h.score > 0 ? `+${h.score}` : h.score}
              </p>
            ) : (
              <span className="text-xl">🏆</span>
            )}
            <p className="text-xs text-muted-foreground">{h.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Panel ─── */
function Panel() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="stat-card">
          <h3 className="font-rubik font-semibold text-white mb-5">Система достижений</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`p-4 rounded-2xl text-center transition-all ${a.earned ? `bg-gradient-to-br ${a.color} opacity-100` : "bg-white/5 opacity-40"}`}
              >
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className="text-sm font-semibold text-white">{a.title}</p>
                <p className="text-xs text-white/70 mt-1">{a.desc}</p>
                {!a.earned && <p className="text-xs text-white/50 mt-1">Не получено</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-4">Настройки системы</h3>
            <div className="space-y-3">
              {[
                { label: "Автоматические уведомления", enabled: true },
                { label: "Напоминания о дедлайнах", enabled: true },
                { label: "Публичный рейтинг", enabled: false },
                { label: "Экспорт отчётов", enabled: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">{s.label}</span>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${s.enabled ? "gradient-violet" : "bg-muted"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${s.enabled ? "left-5" : "left-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <h3 className="font-rubik font-semibold text-white mb-4">Категории оценок</h3>
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
