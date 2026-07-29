<div align="center">
  <img src="https://cdn.haitrieu.com/wp-content/uploads/2023/10/Icon-CTy-Tap-doan-Phuong-Hoan.png" alt="Phenikaa Logo" width="100"/>
  <h1>Ứng dụng Quản Lý Thư Viện Tiến Hoàng Sơn</h1>
  <p>Đồ án kết thúc học phần: <strong>Lập trình Web Nâng cao</strong> - Đại học Phenikaa</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Phenikaa-University-blue.svg" alt="Phenikaa University">
  <img src="https://img.shields.io/badge/Course-Advanced%20Web%20Programming-orange.svg" alt="Advanced Web">
  <img src="https://img.shields.io/badge/Status-Completed-success.svg" alt="Status">
</p>

---

## 📖 Giới thiệu
Dự án **Quản lý Thư viện Số** là một ứng dụng Web toàn diện được thiết kế để hỗ trợ thủ thư và nhà quản lý thư viện trong việc số hóa quy trình quản lý. Hệ thống cung cấp các nghiệp vụ cốt lõi như Quản lý sách, Quản lý thẻ độc giả, Theo dõi quá trình mượn/trả sách, và các công cụ Thống kê (Quick Analytics) thông minh.

## 👥 Thành viên nhóm (Nhóm 99)

| STT | Họ và tên | MSSV | Vai trò |
| :---: | :--- | :---: | :--- |
| **1** | **Đỗ Công Tiến** | `24100338` | Frontend Developer / UI-UX |
| **2** | **Nguyễn Vũ Trường Sơn** | `24100468` | Backend Developer / Database |
| **3** | **Nguyễn Dương Việt Hoàng** | `24100452` | Fullstack / Integration |

## ✨ Tính năng nổi bật

### 1. Phân hệ Quản lý cốt lõi (CRUD)
- **Quản lý Kho sách**: Thêm, sửa, xóa, tìm kiếm sách. Theo dõi số lượng tồn kho theo thời gian thực. Hỗ trợ tự động lấy ảnh bìa.
- **Quản lý Độc giả**: Cấp thẻ thư viện, cập nhật thông tin cá nhân (Sinh viên/Giảng viên), khóa/mở khóa thẻ vi phạm.
- **Quản lý Mượn/Trả (Phiếu mượn)**: Lập phiếu mượn nhanh gọn qua 3 bước, tự động tính toán trạng thái (Đang mượn / Đã trả / Quá hạn). 

### 2. Trợ lý Thống kê Nhanh (Quick Analytics)
- **Spotlight Search (Ctrl + K)**: Tìm kiếm và điều hướng nhanh toàn hệ thống.
- **Truy vấn Ngôn ngữ tự nhiên**: Gõ không dấu để tra cứu (vd: `qua han`, `tien phat`, `het sach`, `hot`).
- **Dashboard Mini**: Trả về thống kê real-time kèm theo các nút thao tác nhanh (Quick Action Buttons).

### 3. Trải nghiệm & Bảo mật (UX & Security)
- **Persistent Auth**: Lưu phiên đăng nhập an toàn, tự động đăng xuất sau 30 phút không tương tác (Inactivity Timeout).
- **Giao diện Minimalist**: Sidebar hiện đại, responsive, kết hợp hiệu ứng CSS transition mượt mà chuẩn thương hiệu Phenikaa (Màu cam `#f37021`).

## 🛠 Công nghệ sử dụng

- **Frontend:**
  - HTML5, Vanilla JavaScript (ES6+), CSS3 (Custom Variables, Flexbox, Grid).
  - Không sử dụng thư viện cồng kềnh, tối ưu hóa tốc độ tải trang.
- **Backend (API):**
  - Node.js & Express / NestJS (Backend framework).
  - TypeORM cho việc map dữ liệu.
- **Database:**
  - `SQLite` (`synchronize: true`) phục vụ môi trường Development.
  - Sẵn sàng mở rộng tích hợp với MySQL (`quanlythuvien.sql`).

## ⚙️ Hướng dẫn cài đặt và chạy dự án (Local)

**1. Clone dự án về máy:**
```bash
git clone https://github.com/Sowns0/ThietKeWeb_nhom99.git
cd ThietKeWeb_nhom99
```

**2. Khởi chạy Backend:**
```bash
cd quanlythuvien
npm install
npm run start:dev
```
*(Backend sẽ chạy mặc định tại `http://localhost:3000`)*

**3. Mở Frontend:**
- Cài đặt extension **Live Server** trên VS Code.
- Mở thư mục `quanlythuvien/library-ui/`.
- Click chuột phải vào file `index.html` -> Chọn **"Open with Live Server"**.

## 📂 Kiến trúc Thư mục

```text
ThietKeWeb_nhom99/
├── library-ui/             # Mã nguồn Frontend (Giao diện cũ / backup)
├── quanlythuvien/          # Thư mục chính chứa Backend Node.js
│   ├── library-ui/         # Mã nguồn Frontend CHÍNH (HTML, CSS, app.js)
│   ├── src/                # Source code Backend (Controllers, Services)
│   └── ...
├── quanlythuvien.sql       # File SQL chuẩn (MySQL Reference)
└── README.md               # Tài liệu dự án
```

## 📸 Hình ảnh Demo

*(Chèn thêm ảnh screenshot thực tế của dự án vào đây )*
- **Màn hình Đăng nhập:** `![Login](./docs/login.png)`
- **Kho sách:** `![Kho Sach](./docs/kho-sach.png)`
- **Trợ lý Thống kê (Ctrl+K):** `![Quick Analytics](./docs/analytics.png)`

---
<div align="center">
  <i>Đồ án được thực hiện với sự tâm huyết của Nhóm 99. Cảm ơn cô giáo đã hướng dẫn và hỗ trợ!</i>
</div>
