北海道 6 日遊 Travel Planner PWA 6.0

安裝：將整個資料夾部署到 HTTPS 網站，用 Android Chrome 開啟後選「安裝應用程式／加到主畫面」。

6.0 新增：
- 「語音新增」「語音記帳」名稱與 Android 麥克風預檢。
- Android 功能檢測：HTTPS、PWA、麥克風、Web Speech、相機 API、OCR 引擎。
- 相機拍收據與相簿選收據分開。
- Tesseract.js 台灣繁中 + 日文 + 英文 OCR。第一次 OCR 需網路下載 OCR 引擎/語言模型；之後瀏覽器快取可重用。
- 台灣／日本收據自動判斷、品項/個別金額/總額拆解，結果可人工修正。
- 收據照片先在手機端縮圖、灰階與提高對比，再送入瀏覽器內 OCR。照片不需要上傳到自建伺服器。

注意：Web Speech API 是否由裝置端或瀏覽器服務處理，依 Android/Chrome 版本而異；不能保證完全離線。OCR 辨識準確率受收據平整度、光線、字體與列印品質影響，記帳前請核對。


6.1 修正：content:// / file:// 不視為正式 PWA 麥克風環境；台灣 OCR 改用 chi_tra+eng、收據自動裁切放大、總額不再以最大數字猜測、加入 OCR 原始文字檢視。
