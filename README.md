# 《反深代詞》專輯敘事網站

React + TypeScript + Vite，採用 CSS Modules。專輯文字的唯一來源是 `source/反深代词 _ 周深.html`。不使用原網頁的腳本、外部連結、封面或音源。

## 安裝與啟動

需要 Node.js 22 以上與 npm。

```sh
npm install
npm run dev
```

開啟終端機顯示的本機網址。正式建置與預覽：

```sh
npm run build
npm run preview
```

## 內容更新

修改來源 HTML 後執行 `npm run content`，將已知三個介紹 section 及 `#songs .song` 轉成 `src/data/album.json`。解析器保留每個 p 的文字、標點、繁簡用字、br 換行及 `.blank` 順序；React 以文字節點呈現，不注入原始 HTML。

`npm run check:content` 重新解析來源並逐字比對資料，檢查 14 個曲目及段落完整性。建置前自動執行此檢查。原始結語屬於第 14 章，完整包含「12首歌曲」與「12個分身」。

## 操作

- 頂端導覽定位各內容區；窄螢幕以「目錄」展開。
- 曲目目錄切換完整故事，並更新章節網址（如 `#track-08`）。
- 上一章／下一章依原序切換，首尾停用超出範圍的按鈕。
- 「曲目清單」返回目錄，第 14 章末可返回首頁。
- Tab 鍵瀏覽所有控制；跳至內容連結與選曲後焦點定位支援鍵盤操作。
- 跟隨系統 reduced motion 設定停用動畫和平滑捲動。

## 檔案結構

```text
source/反深代词 _ 周深.html  原始內容
scripts/import-content.mjs   匯入及逐字一致性檢查
src/data/album.json           結構化原文及留白
src/App.tsx                  導覽、各區塊、故事閱讀器
src/App.module.css           響應式視覺與動態偏好
src/main.tsx                 React 入口
index.html                   語言、標題、頁面描述
dist/                        建置輸出
```

不需要後端、登入或資料庫。正式部署時將 `dist/` 作為靜態網站根目錄。
