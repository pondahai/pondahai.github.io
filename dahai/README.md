# Pondahai 個人網站

一個結合「數位分身」與「個人品牌」的 GitHub Pages 網站。

## 專案總覽

本網站包含以下主要區塊：

| 區塊 | 說明 |
|------|------|
| **🎯 作品集** | 技術專案展示區 |
| **🛠️ 個人作品集** | 個人業餘專案 |
| **📄 學術履歷** | 博士候選人學經歷 |
| **📰 每日回顧報** | 歷史上的今天（自動從數位分身知識庫生成）|

## 📰 每日回顧報（重點功能）

你的「歷史上的今天」回顧頁面，自動從數位分身知識庫中提取過往紀錄。

### 功能
- **每日自動更新**：Cron 每天 9:00 自動產生
- **歷史上的今天**：根據當天月/日，從知識庫提取過去年份的紀錄
- **AI 改寫**：使用 Cerebras GPT 將原始素材改寫成自然口語
- **多元內容**：支援 FB 貼文、AI 圖片分析、外部連結摘要等
- **時間顯示**：超過 1 年顯示「X年前」

### 資料來源（位於本機 OpenClaw 工作區）

> 以下資料夾位於 `~/.openclaw/workspace/`，不在 GitHub repo 中

1. `memory/YYYY-MM-DD.md` - 日常筆記
2. `cerebras-kb-chat/knowledge/**` - 數位分身知識庫（FB/部落格記錄，約 20,000+ 筆）

### 更新流程
1. 掃描當天月/日的歷史紀錄（從知識庫）
2. 擷取段落級內容（不是只有標題）
3. 透過 Cerebras 改寫成 FB 回顧文風
4. 寫入 `dahai/js/daily-data.js`
5. 自動推送到 GitHub Pages

### 相關檔案
- **生成腳本**：`scripts/generate_dahai_daily.js`
- **資料檔**：`dahai/js/daily-data.js`
- **前端**：`dahai/index.html`

## 🔧 技術架構

```
pondahai.github.io/
├── dahai/
│   ├── index.html    # 主頁面
│   ├── css/          # 樣式
│   ├── js/
│   │   └── daily-data.js   # 每日回顧資料
│   ├── images/       # 圖片
│   └── README.md     # 本說明檔
└── 其他靜態頁面...
```

## 📝 相關腳本（位於本機 OpenClaw 工作區）

> 以下腳本位於 `~/.openclaw/workspace/scripts/`，不在 GitHub repo 中

| 腳本 | 功能 |
|------|------|
| `generate_dahai_daily.js` | 每日回顧報生成器（Cron 自動執行） |
| `enrich_digital_twin_links.js` | 數位分身連結補摘要腳本 |

## 網址

- 主站：https://pondahai.github.io/
- 每日回顧：https://pondahai.github.io/dahai/
