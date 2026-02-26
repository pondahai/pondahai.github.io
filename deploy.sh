#!/bin/bash

# Pondahai GitHub Pages 上傳腳本
# 使用方法: ./deploy.sh

echo "🦐 正在上傳網站到 GitHub..."

# 進入網站目錄
cd "$(dirname "$0")"

# 初始化 git（如果還沒有的話）
if [ ! -d ".git" ]; then
    echo "初始化 Git..."
    git init
    git remote add origin https://github.com/pondahai/pondahai.github.io.git
fi

# 添加所有檔案
echo "添加檔案..."
git add .

# 提交
echo "提交變更..."
git commit -m "Update website - $(date '+%Y-%m-%d %H:%M')"

# 推送
echo "推送到 GitHub..."
git push -u origin main

echo "✅ 上傳完成！"
echo "🌐 網站網址: https://pondahai.github.io"
