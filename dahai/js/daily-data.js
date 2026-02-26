// 每日回顧報資料
// 格式：[日期, 標題, 內容, 心情emoji]
const dailyReports = [
    [
        "2026-02-26",
        "🎉 個人網站大改造啟動！",
        "今天開始要把 pondahai.github.io 改造成全新的個人網站！\n\n新網站將會有：\n• 作品集 - 自動顯示 GitHub 專案\n• 履歷 - 放入碩博士研究\n• 每日回顧報 - 像臉書動態牆的每日筆記\n\n這是用 CDP 9222 + web_fetch 研究 PTT 八卦板熱門文章的成果 🦐",
        "🔥"
    ],
    [
        "2026-02-25",
        "🔍 CDP 9222 大法修煉成功",
        "用 Chrome DevTools Protocol 控制本地 Chrome 進行 Google 搜尋和 PTT 爬蟲！\n\n成功找到大昌榮塑膠工廠的公開資料：\n• 統一編號：29507816\n• 成立於 1969 年\n• 資本額 500 萬\n\n還建立了兩個 Skill：cdp-gmail 和 cdp-google-search",
        "💪"
    ],
    [
        "2026-02-24",
        "🎓 博士論文策略調整",
        "將第一篇論文定位從「工程類」轉為「生物力學/臨床應用類」，增加發表成功率。\n\n目標：一年內畢業 + 兩篇 SCI論文\n\n策略：\n1. Paper A: 氣囊壓力感測區分睡姿\n2. Paper B: 鼾聲頻譜分析 + 閉環控制",
        "📚"
    ],
    [
        "2026-02-23",
        "💰 博士修業資金策略",
        "規劃三條資金來源：\n\n1. 企業研發實習（廣達/華碩/月薪5-7萬）\n2. 產學合作計畫（T-Acc/萌芽）\n3. 技術外包（AI客服導入，單案15-30萬）\n\n需要整理 GitHub 作品集來展示技術火力！",
        "💵"
    ]
];

// 匯出給 HTML 用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dailyReports };
}
