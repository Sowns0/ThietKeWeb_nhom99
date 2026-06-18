CREATE DATABASE IF NOT EXISTS quanlythuvien;
USE quanlythuvien;

CREATE TABLE sach (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_sach VARCHAR(255) NOT NULL,
    tac_gia VARCHAR(255) NOT NULL,
    the_loai VARCHAR(100),
    nam_xuat_ban INT,
    so_luong INT DEFAULT 0
);

CREATE TABLE doc_gia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    so_dien_thoai VARCHAR(20)
);

CREATE TABLE phieu_muon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doc_gia_id INT NOT NULL,
    sach_id INT NOT NULL,
    ngay_muon DATE NOT NULL,
    ngay_tra DATE,
    trang_thai VARCHAR(50),

    CONSTRAINT fk_docgia
        FOREIGN KEY (doc_gia_id)
        REFERENCES doc_gia(id),

    CONSTRAINT fk_sach
        FOREIGN KEY (sach_id)
        REFERENCES sach(id)
);

INSERT INTO sach
(ten_sach, tac_gia, the_loai, nam_xuat_ban, so_luong)
VALUES
('Clean Code', 'Robert C. Martin', 'CNTT', 2008, 5),
('Design Patterns', 'GoF', 'CNTT', 1994, 3);

INSERT INTO doc_gia
(ho_ten, email, so_dien_thoai)
VALUES
('Nguyen Van A', 'a@gmail.com', '0123456789'),
('Tran Thi B', 'b@gmail.com', '0987654321');

INSERT INTO phieu_muon
(doc_gia_id, sach_id, ngay_muon, ngay_tra, trang_thai)
VALUES
(1, 1, '2026-06-18', '2026-06-25', 'Dang muon');