import { useEffect, useMemo, useState } from "react";

type Step = "home" | "generating" | "result";

type ProgressPhase = {
  title: string;
  description: string;
};

const progressPhases: ProgressPhase[] = [
  {
    title: "研究主题",
    description: "分析需求并抓取高质量来源内容",
  },
  {
    title: "构建大纲",
    description: "生成演示文稿结构与关键要点",
  },
  {
    title: "设计版式",
    description: "匹配主题配色与视觉风格",
  },
  {
    title: "渲染输出",
    description: "生成可编辑的 PPTX 文件",
  },
];

const featureHighlights = [
  {
    title: "结构化研究",
    description: "整合权威来源与最新数据，自动提炼可用结论。",
  },
  {
    title: "智能排版",
    description: "遵循全局设计规范，确保信息层级清晰。",
  },
  {
    title: "快速交付",
    description: "从输入主题到下载成品，只需数分钟。",
  },
];

const sampleSlides = [
  "封面页",
  "议程页",
  "图文分屏",
  "数据洞察",
];

export default function App() {
  const [step, setStep] = useState<Step>("home");
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    if (step !== "generating") {
      return;
    }
    setProgress(12);
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev < 92 ? prev + 4 : prev));
    }, 600);
    return () => window.clearInterval(timer);
  }, [step]);

  const activePhaseIndex = useMemo(
    () => Math.min(Math.floor(progress / 25), progressPhases.length - 1),
    [progress]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-32 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-16 pt-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-lg font-semibold text-white shadow-soft">
              A
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                AutoPPT Agent
              </p>
              <p className="text-sm text-slate-500">
                专业演示文稿生成平台
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-600 shadow-sm">
            {[
              { label: "输入主题", value: "home" },
              { label: "生成中", value: "generating" },
              { label: "结果", value: "result" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setStep(item.value as Step)}
                className={`rounded-full px-4 py-1.5 transition-all duration-200 ${
                  step === item.value
                    ? "bg-blue-500 text-white shadow"
                    : "text-slate-500 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="flex flex-1 flex-col justify-center">
          {step === "home" && (
            <section className="mt-12 grid gap-10 lg:grid-cols-[1.05fr,0.95fr] animate-page-in">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-blue-500">
                    自动生成高质量演示文稿
                  </p>
                  <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
                    用研究驱动的故事线，
                    <span className="block text-blue-600">
                      让演示更有说服力
                    </span>
                  </h1>
                  <p className="text-base leading-relaxed text-slate-600">
                    AutoPPT Agent 将主题研究、内容结构、视觉设计与 PPT 渲染整合为一体，
                    帮你快速输出符合专业规范的演示文稿。
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-md backdrop-blur">
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        输入演示主题
                      </label>
                      <input
                        type="text"
                        placeholder="例如：AI 在金融行业的应用趋势"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          风格偏好
                        </label>
                        <select className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                          <option>商务蓝</option>
                          <option>极简白</option>
                          <option>科技感深色</option>
                          <option>创新渐变</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          交付速度
                        </label>
                        <select className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                          <option>标准模式 (6-8 分钟)</option>
                          <option>极速模式 (3-4 分钟)</option>
                          <option>深度研究 (10+ 分钟)</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("generating")}
                      className="w-full rounded-lg bg-blue-500 px-5 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600"
                    >
                      生成演示文稿
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {featureHighlights.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {feature.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        演示文稿预览
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        新能源行业趋势分析
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-500">
                      16 页
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4">
                    {sampleSlides.map((slide, index) => (
                      <div
                        key={slide}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                            <span className="text-sm font-semibold text-slate-600">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {slide}
                            </p>
                            <p className="text-xs text-slate-500">
                              规范化版式与主题配色
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-blue-500">预览</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 p-6 text-white shadow-soft animate-shimmer">
                  <p className="text-sm font-medium text-blue-100">
                    生成效率
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    平均节省 78% 制作时间
                  </p>
                  <p className="mt-3 text-sm text-blue-100">
                    以规范化信息层级与自动化版式，快速完成高质量内容交付。
                  </p>
                </div>
              </div>
            </section>
          )}

          {step === "generating" && (
            <section className="mt-12 flex flex-col gap-8 animate-page-in">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-blue-500">
                      任务进行中
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                      正在生成你的演示文稿
                    </h2>
                    <p className="mt-3 text-sm text-slate-500">
                      系统正在执行多阶段工作流，预计在 6 分钟内完成。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-600">
                    当前步骤：{progressPhases[activePhaseIndex].title}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>整体进度</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-3 h-3 w-full rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {progressPhases.map((phase, index) => (
                    <div
                      key={phase.title}
                      className={`rounded-2xl border p-5 transition-all duration-300 ${
                        index <= activePhaseIndex
                          ? "border-blue-100 bg-blue-50"
                          : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {phase.title}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("result")}
                    className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600"
                  >
                    查看结果
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("home")}
                    className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-blue-200 hover:text-blue-600"
                  >
                    取消任务
                  </button>
                  <span className="text-xs text-slate-400">
                    支持后台运行，你可以稍后查看。
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">实时日志</p>
                  <ul className="mt-4 space-y-3 text-xs text-slate-500">
                    <li>✓ 已解析主题语义与目标受众</li>
                    <li>✓ 正在抓取 18 个可信来源</li>
                    <li>✓ 已生成 12 条关键数据洞察</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">预计产出</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    14-18 页
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    包含封面、目录、案例与数据分析。
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">视觉风格</p>
                  <div className="mt-4 flex items-center gap-2">
                    {[
                      "bg-blue-500",
                      "bg-slate-400",
                      "bg-cyan-400",
                      "bg-slate-100",
                    ].map((color) => (
                      <span
                        key={color}
                        className={`h-6 w-6 rounded-full ${color}`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    商务蓝 + 中性灰 + 强调青
                  </p>
                </div>
              </div>
            </section>
          )}

          {step === "result" && (
            <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] animate-page-in">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-500">生成完成</p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                      你的演示文稿已就绪
                    </h2>
                    <p className="mt-3 text-sm text-slate-500">
                      下载后即可在 PowerPoint 或 WPS 中继续编辑。
                    </p>
                  </div>
                  <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-600">
                    质量评分 92/100
                  </span>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "页面数量", value: "16" },
                    { label: "可编辑图表", value: "12" },
                    { label: "数据来源", value: "18" },
                    { label: "版式模板", value: "9" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600"
                  >
                    下载 .pptx 文件
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("generating")}
                    className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-blue-200 hover:text-blue-600"
                  >
                    重新生成
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("home")}
                    className="rounded-lg border border-transparent bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-200"
                  >
                    返回首页
                  </button>
                </div>

                <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    生成摘要
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    本次演示围绕行业规模、竞争格局、核心技术与落地案例构建，重点突出
                    "数据驱动" 与 "业务价值" 两条主线，并提供了可直接引用的图表与结论。
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <p className="text-sm font-medium text-slate-500">封面预览</p>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
                    <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
                        2026 行业洞察
                      </p>
                      <p className="mt-3 text-2xl font-semibold">
                        AI 驱动的企业创新趋势
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <span className="h-10 w-10 rounded-full bg-white/20" />
                        <div>
                          <p className="text-xs text-blue-100">AutoPPT Research</p>
                          <p className="text-sm font-medium">企业战略部</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>主题配色：Tech Premium Blue</span>
                    <span>最后更新：刚刚</span>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
                  <p className="text-sm font-medium text-slate-300">
                    下一步建议
                  </p>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      使用编辑器调整品牌配色和 Logo。
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      根据受众选择演讲稿与备注。
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      一键生成配套分享版 PDF。
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
