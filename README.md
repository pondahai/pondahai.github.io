# pondahai.github.io 新網站

## 📋 部署說明

### 第一步：備份舊網站
在 GitHub 上將 `index.php` 資料夾移動到 `wripix/` 目錄

### 第二步：上傳新檔案
將 `index.html` 上傳到 repo 根目錄

### 第三步：設定 GitHub Pages
1. 進入 repo 設定 (Settings)
2. 點擊 Pages
3. Source 選擇 "Deploy from a branch"
4. Branch 選擇 "main"
5. Folder 選擇 "/ (root)"
6. 儲存

---

## 📁 檔案結構

```
pondahai.github.io/
├── index.html          # 新網站首頁
├── wripix/             # 舊的 Medium 專案（移動過來的）
│   ├── index.php
│   ├── css/
│   ├── js/
│   └── ...
└── 其他專案檔案...
```

---

## 🎨 功能說明

### 1. 作品集 (Portfolio)
- 自動從 GitHub API 抓取最新專案
- 顯示專案名稱、描述、語言

### 2. 履歷 (Resume)
- 學歷（待補充碩士資料）
- 經歷
- 技術專長
- 發表著作

### 3. 每日回顧報 (Daily Report)
- 每日重點
- 學習筆記

---

## ✏️ 如何修改

### 修改履歷
編輯 `index.html` 中的 `<section id="resume">` 區塊

### 修改每日回顧
編輯 `loadDailyReport()` JavaScript 函數

### 修改個人資訊
編輯 `<header>` 區塊中的名字和簡介
