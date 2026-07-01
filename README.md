# Fantasy Studio - Trang Thành viên & Team

Trang Node.js/Express dùng EJS, CSS và JavaScript thuần.

## Chạy project

```bash
npm install
npm start
```

Mở trình duyệt:

```text
http://localhost:3000/thanh-vien-team
```

## Cấu trúc

```text
server.js                          # Route + data thành viên
views/team.ejs                     # Giao diện chính
views/partials/icon.ejs            # Icon SVG
public/css/style.css               # Style dark neon đồng bộ logo
public/js/team-slider.js           # Hiệu ứng slide thành viên nổi bật
public/assets/members/*.jpg        # Ảnh thành viên
```

## Đổi ảnh thành viên

Thay ảnh trong thư mục:

```text
public/assets/members/
```

Sau đó cập nhật đường dẫn trong mảng `members` tại file `server.js`.
