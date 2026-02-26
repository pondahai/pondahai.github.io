# 數位分身每日回顧 - 歷史上的今天

## 概念
從「數位分身」(cerebras-kb-chat/knowledge/merged/) 找出「歷史上的今天」的貼文。

## 資料位置
```
/Users/pondahai/.openclaw/workspace/cerebras-kb-chat/knowledge/merged/
├── ptt_posts/          # PTT 貼文
├── files/raw/          # Facebook 等原始資料
├── HackMD/             # HackMD 筆記
└── github_projects/    # GitHub 專案
```

## 查找方法

### 1. 找出當天（或接近）的貼文
```bash
# 找 PTT 貼文中包含特定日期的
grep -l "Feb 26\|2月26日\|02/26" /Users/pondahai/.openclaw/workspace/cerebras-kb-chat/knowledge/merged/ptt_posts/*.md

# 找特定年份
grep -l "2020\|2019\|2018" /Users/pondahai/.openclaw/workspace/cerebras-kb-chat/knowledge/merged/ptt_posts/*.md
```

### 2. 查看單篇內容
```bash
# 讀取 PTT 貼文
cat /Users/pondahai/.openclaw/workspace/cerebras-kb-chat/knowledge/merged/ptt_posts/[檔名].md

# 讀取 Facebook
cat /Users/pondahai/.openclaw/workspace/cerebras-kb-chat/knowledge/merged/files/raw/facebook-*/your_facebook_activity/*
```

### 3. 自動化腳本思路
```javascript
// 概念：從數位分身随机选取当天/接近的贴文
const kbPath = '/Users/pondahai/.openclaw/workspace/cerebras-kb-chat/knowledge/merged/';

// 1. 找出當月所有貼文
// 2. 過濾出接近今天的日期
// 3. 隨機選取一篇
// 4. 產生成每日回顧格式
```

## 格式範例
```javascript
[
    "2020-02-27",
    "🎮 遊戲機募資問卷",
    "這款掌上型遊戲機不是玩復古遊戲，而是專門用來玩Scratch遊戲的...",
    "🎮"
]
```

## 來源優先順序
1. PTT（最具代表性）
2. Facebook
3. Medium
4. HackMD

## 發布時間
從 2026-02-27 開始每日發布