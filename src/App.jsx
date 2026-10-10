import { useEffect, useState } from 'react'

const BOT_URL = 'https://t.me/TurboDL_Iraq_bot'
const NEWS_URL = 'https://t.me/TurboDL_News'
const LOGO = import.meta.env.BASE_URL + 'logo.png'

/* ---------- data ---------- */

const downloadFeatures = [
  { title: 'يوتيوب وتيك توك وإنستغرام وفيسبوك', body: 'ادز الرابط بالمحادثة، والبوت يرجعلك الملف مباشرة.' },
  { title: 'اختيار الجودة', body: 'أفضل جودة، 720p، 480p، 360p، أو صوت MP3 فقط.' },
  { title: 'وضع المحاضرات', body: 'محاضرة ساعة ونص؟ البوت يستخرج الصوت حتى يوصلك الملف كامل.' },
  { title: 'تقدّم مباشر', body: 'شريط تقدّم بالسرعة والوقت المتبقي داخل نفس الرسالة.' },
]

const studentTools = [
  { tag: 'OCR', title: 'استخراج النص من الصور', body: 'صوّر صفحة الكتاب أو السبورة، ويطلعلك النص جاهز للنسخ.' },
  { tag: 'AI', title: 'تلخيص الملفات', body: 'ادز ملف PDF أو نص طويل، وتستلم ملخص بالنقاط الرئيسية.' },
  { tag: 'STT', title: 'تحويل الصوت لنص', body: 'رسالة صوتية أو تسجيل محاضرة يتحول لنص مكتوب.' },
  { tag: 'PDF', title: 'صور إلى PDF', body: 'اجمع صور الملزمة بملف PDF واحد مرتب.' },
  { tag: 'PDF', title: 'دمج ملفات PDF', body: 'عدة ملفات تصير ملف واحد بنفس الترتيب اللي تختاره.' },
  { tag: '+', title: 'مكافآت وإحالات', body: 'ادعُ أصدقاءك واحصل على استخدام إضافي مجاناً.' },
]

const steps = [
  { title: 'افتح البوت', body: 'اضغط "جرّب البوت" واكتب /start. ما تحتاج تسجيل، بس حساب تيليجرام.' },
  { title: 'اختار الخدمة', body: 'تحميل، أو أداة من الخدمات الطلابية، من القائمة الرئيسية.' },
  { title: 'استلم النتيجة', body: 'ادز الرابط أو الملف، والبوت يرجعلك النتيجة بنفس المحادثة.' },
]

const plans = [
  {
    name: 'مجاني',
    price: '0',
    period: 'دائماً',
    note: 'للتجربة والاستخدام الخفيف',
    perks: ['تحميل يومي محدود', 'أدوات PDF بحدود', 'استخراج النص والتلخيص بعدد محدود'],
  },
  {
    name: 'أسبوع الامتحانات',
    price: '2,000',
    period: '7 أيام',
    note: 'لفترة الامتحانات بالضبط',
    perks: ['كل الأدوات مفتوحة', 'بدون حد يومي', 'وضع المحاضرات'],
  },
  {
    name: 'ستاندرد',
    price: '3,500',
    period: '30 يوم',
    note: 'الأنسب لأغلب الطلاب',
    featured: true,
    perks: ['كل الأدوات مفتوحة', 'بدون حد يومي', 'وضع المحاضرات', 'دمج PDF بلا حدود'],
  },
  {
    name: 'برو',
    price: '6,000',
    period: '30 يوم',
    note: 'للاستخدام اليومي المكثف',
    perks: ['كل مزايا ستاندرد', 'أولوية بأدوات الذكاء الاصطناعي', 'أعلى حدود للملفات'],
  },
]

const faqs = [
  { q: 'هل البوت مجاني؟', a: 'إي. الباقة المجانية تشتغل بدون اشتراك، والباقات المدفوعة ترفع الحدود وتفتح كل الأدوات.' },
  { q: 'شلون أدفع الاشتراك؟', a: 'عن طريق زين كاش أو فاست باي. ترسل صورة الإيصال داخل البوت، والإدارة تفعّل اشتراكك.' },
  { q: 'المحاضرة طويلة، تتحمل؟', a: 'شغّل وضع المحاضرات. البوت يستخرج الصوت فقط، فيصير الملف أصغر بكثير ويوصلك كامل.' },
  { q: 'إذا صارت عندي مشكلة؟', a: 'من قسم المساعدة تفتح تذكرة دعم، وتتابع ردّ الإدارة برقم التذكرة.' },
]

/* ---------- small parts ---------- */

function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <img src={LOGO} alt="" width="40" height="40" className="h-10 w-10 rounded-full ring-1 ring-[var(--line)]" />
      <span className="font-[family-name:var(--font-mono)] text-lg font-bold tracking-tight" dir="ltr">
        Turbo<span className="text-[var(--red)]">DL</span>
      </span>
    </a>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="max-w-2xl">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--red)]"><span dir="ltr">{eyebrow}</span></p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-balance sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-[var(--muted)] leading-8">{sub}</p>}
    </div>
  )
}

/* ---------- live chat demo ---------- */

function ChatDemo() {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let p = 100
    let hold = 0
    const id = setInterval(() => {
      if (p >= 100) {
        hold += 1
        if (hold > 30) { p = 0; hold = 0 }
      } else {
        p = Math.min(100, p + 2 + Math.random() * 3)
      }
      setProgress(Math.round(p))
    }, 90)
    return () => clearInterval(id)
  }, [])

  const done = progress >= 100
  const mb = ((progress / 100) * 41.8).toFixed(1)
  const eta = Math.max(0, Math.round((100 - progress) / 9))

  return (
    <div className="relative w-full max-w-sm">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4">
          <img src={LOGO} alt="" width="36" height="36" className="h-9 w-9 rounded-full" />
          <div className="leading-tight">
            <p className="text-sm font-bold" dir="ltr">TurboDL Bot</p>
            <p className="text-xs text-[var(--muted)]">بوت</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-4 py-5 text-sm">
          <div className="self-start max-w-[85%] rounded-2xl rounded-tr-md bg-[var(--bubble-me)] px-4 py-3">
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--fg)] break-all" dir="ltr">youtube.com/watch?v=circuits-L07</p>
            <p className="mt-1 text-[11px] text-[var(--muted)]">محاضرة الدوائر الكهربائية · 1:32:10</p>
          </div>

          <div className="self-end w-[88%] rounded-2xl rounded-tl-md border border-[var(--line)] bg-[var(--bubble-bot)] px-4 py-3">
            <p className="text-xs text-[var(--muted)]">🎧 وضع المحاضرات · استخراج الصوت</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--line)]" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
              <div className="h-full rounded-full bg-[var(--red)] transition-[width] duration-100" style={{ width: progress + '%' }} />
            </div>
            <div className="mt-2 flex justify-between font-[family-name:var(--font-mono)] text-[11px] tabular-nums text-[var(--muted)]" dir="ltr">
              <span>{mb} / 41.8 MB</span>
              <span>{done ? 'done' : `${progress}% · ${eta}s`}</span>
            </div>
          </div>

          <div className={'self-end w-[88%] rounded-2xl rounded-tl-md border border-[var(--line)] bg-[var(--bubble-bot)] px-4 py-3 transition-opacity duration-300 ' + (done ? 'opacity-100' : 'opacity-40')}>
            <p className="font-bold">✅ تم التحميل</p>
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-[var(--bg)] px-3 py-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--red)] font-[family-name:var(--font-mono)] text-[10px] font-bold text-white">MP3</span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-xs" dir="ltr">circuits_lecture_07.mp3</p>
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]" dir="ltr">41.8 MB · 128kbps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- page ---------- */

export default function App() {
  return (
    <div id="top" className="min-h-full overflow-x-clip bg-[var(--bg)] text-[var(--fg)] font-[family-name:var(--font-body)]" dir="rtl" lang="ar">
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-[var(--line)] bg-[var(--bg-glass)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Wordmark />
          <nav className="hidden items-center gap-7 text-sm text-[var(--muted)] md:flex">
            <a href="#features" className="hover:text-[var(--fg)]">المميزات</a>
            <a href="#student" className="hover:text-[var(--fg)]">الخدمات الطلابية</a>
            <a href="#plans" className="hover:text-[var(--fg)]">الباقات</a>
            <a href="#faq" className="hover:text-[var(--fg)]">الأسئلة</a>
          </nav>
          <a href={BOT_URL} target="_blank" rel="noopener" className="rounded-full bg-[var(--red)] px-4 py-2 text-sm font-bold text-white hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-[var(--bg)] outline-none">
            افتح البوت
          </a>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-24">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
              بوت تيليجرام لطلاب الجامعات بالعراق
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.25] text-balance sm:text-5xl lg:text-6xl">
              محاضراتك وملفاتك،
              <br />
              <span className="text-[var(--red)]">جاهزة بثواني</span> داخل تيليجرام
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[var(--muted)]">
              TurboDL يحمّل الفيديو والصوت من يوتيوب وتيك توك وإنستغرام، ويلخّص ملفاتك، ويستخرج النص من الصور بالذكاء الاصطناعي. كله من محادثة وحدة.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BOT_URL} target="_blank" rel="noopener" className="rounded-full bg-[var(--red)] px-6 py-3 font-bold text-white hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-[var(--bg)] outline-none">
                جرّب البوت مجاناً
              </a>
              <a href={NEWS_URL} target="_blank" rel="noopener" className="rounded-full border border-[var(--line)] px-6 py-3 font-bold hover:border-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--fg)] outline-none">
                قناة التحديثات
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
              <div>
                <dt className="text-xs text-[var(--muted)]">مواقع مدعومة</dt>
                <dd className="mt-1 font-[family-name:var(--font-mono)] text-2xl font-bold tabular-nums" dir="ltr">1800+</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)]">أدوات دراسية</dt>
                <dd className="mt-1 font-[family-name:var(--font-mono)] text-2xl font-bold tabular-nums">5</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)]">يبدأ من</dt>
                <dd className="mt-1 text-2xl font-bold">مجاناً</dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-center md:justify-start">
            <ChatDemo />
          </div>
        </section>

        {/* download */}
        <section id="features" className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <SectionHead eyebrow="Download Hub" title="ادز الرابط، واستلم الملف" sub="بدون تطبيقات ولا مواقع مليانة إعلانات. التحميل يصير داخل تيليجرام نفسه." />
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
              {downloadFeatures.map((f) => (
                <div key={f.title} className="bg-[var(--bg)] p-6 sm:p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 leading-8 text-[var(--muted)]">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* student hub */}
        <section id="student" className="border-t border-[var(--line)] bg-[var(--surface)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <SectionHead eyebrow="Student Hub" title="أدوات الطالب، بمكان واحد" sub="الأدوات اللي تحتاجها أيام الدوام والامتحانات، مدعومة بنماذج Gemini للذكاء الاصطناعي." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studentTools.map((t) => (
                <article key={t.title} className="flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6">
                  <span className="w-fit rounded-md bg-[var(--red-soft)] px-2 py-1 font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--red)]" dir="ltr">{t.tag}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{t.title}</h3>
                  <p className="leading-8 text-[var(--muted)]">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* steps */}
        <section className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <SectionHead eyebrow="How it works" title="ثلاث خطوات وتبدي" />
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--red)] font-[family-name:var(--font-mono)] font-bold text-[var(--red)]">{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 leading-8 text-[var(--muted)]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* plans */}
        <section id="plans" className="border-t border-[var(--line)] bg-[var(--surface)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <SectionHead eyebrow="Plans" title="باقات بالدينار العراقي" sub="الدفع بزين كاش أو فاست باي. ترسل الإيصال داخل البوت، والإدارة تفعّل اشتراكك." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((p) => (
                <article key={p.name} className={'relative flex flex-col rounded-2xl border p-6 ' + (p.featured ? 'border-[var(--red)] bg-[var(--bg)]' : 'border-[var(--line)] bg-[var(--bg)]')}>
                  {p.featured && <span className="absolute -top-3 right-6 rounded-full bg-[var(--red)] px-3 py-0.5 text-xs font-bold text-white">الأكثر طلباً</span>}
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{p.note}</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-mono)] text-4xl font-bold tabular-nums">{p.price}</span>
                    <span className="text-sm text-[var(--muted)]">د.ع / {p.period}</span>
                  </p>
                  <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm">
                    {p.perks.map((k) => (
                      <li key={k} className="flex gap-2">
                        <span aria-hidden="true" className="text-[var(--red)]">✓</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={BOT_URL} target="_blank" rel="noopener" className={'mt-auto block rounded-full px-4 py-2.5 text-center text-sm font-bold ' + (p.featured ? 'bg-[var(--red)] text-white hover:brightness-110' : 'border border-[var(--line)] hover:border-[var(--muted)]')} style={{ marginTop: '1.75rem' }}>
                    {p.price === '0' ? 'ابدأ مجاناً' : 'اشترك من البوت'}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
            <SectionHead eyebrow="FAQ" title="أسئلة تتكرر" />
            <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                    {f.q}
                    <span aria-hidden="true" className="font-[family-name:var(--font-mono)] text-[var(--red)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-8 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* cta */}
        <section className="border-t border-[var(--line)]">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-balance">جرّبه هسه، المجاني ما يحتاج اشتراك.</h2>
            <a href={BOT_URL} target="_blank" rel="noopener" className="shrink-0 rounded-full bg-[var(--red)] px-6 py-3 font-bold text-white hover:brightness-110">
              افتح TurboDL
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--muted)] sm:px-6">
          <Wordmark />
          <div className="flex gap-6">
            <a href={BOT_URL} target="_blank" rel="noopener" className="hover:text-[var(--fg)]" dir="ltr">@TurboDL_Iraq_bot</a>
            <a href={NEWS_URL} target="_blank" rel="noopener" className="hover:text-[var(--fg)]" dir="ltr">@TurboDL_News</a>
          </div>
          <p dir="ltr">© 2026 TurboDL</p>
        </div>
      </footer>
    </div>
  )
}
