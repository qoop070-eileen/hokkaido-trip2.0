北海道 6 日遊 Travel Planner PWA 6.5

6.5 收據解析修正：
- 保留 6.4 的 PP-OCRv5、語音與 PWA 功能。
- 修正台灣長條收據：地址門牌（例如 112號）、機號、序號、員工號不再誤判成商品/金額。
- 支援「品名一行 + 下一行商品碼與右側價格」格式，商品碼不再當品名。
- 支援 799TX、359TX、759TX、659TX、0TX 等右側價格格式。
- 合計/總計/信用卡列優先鎖定真正收據總額。
- OCR 看到「信用卡」時自動選擇信用卡付款。
- 店家名稱優先抓公司/商店名稱並排除地址。
- Service Worker 快取升級為 v6.5，部署後重新整理即可取得新版。

部署：把 index.html、manifest.webmanifest、sw.js、README.txt 與原 icons 資料夾放在 GitHub Pages 根目錄。
