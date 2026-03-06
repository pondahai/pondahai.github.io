# 每日回顧報 (Daily Review)

你的個人「歷史上的今天」回顧頁面，自動從數位分身知識庫中提取過往紀錄。

## 功能

- **每日自動更新**：Cron 每天 9:00 自動產生
- **歷史上的今天**：根據當天月/日，從知識庫提取過去年份的紀錄
- **AI 改寫**：使用 Cerebras GPT 將原始素材改寫成自然口語
- **多元內容**：支援 FB 貼文、AI 圖片分析、外部連結摘要等

## 資料來源

1. `memory/YYYY-MM-DD.md` - 日常筆記
2. `cerebras-kb-chat/knowledge/**` - 數位分身知識庫（FB/部落格記錄）

## 更新流程

1. 掃描當天月/日的歷史紀錄（從知識庫）
2. 擷取段落級內容（不是只有標題）
3. 透過 Cerebras 改寫成 FB 回顧文風
4. 寫入 `dahai/js/daily-data.js`
5. 自動推送到 GitHub Pages

## 技術細節

- **生成腳本**：`scripts/generate_dahai_daily.js`
- **時間顯示**：超過 1 年顯示「X年前」
- **資料格式**：`[日期, 標題, 內容, 心情emoji]`

## 網址

https://pondahai.github.io/dahai/
