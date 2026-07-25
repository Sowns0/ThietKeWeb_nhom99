"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDocGiaService = exports.DocGiaService = void 0;
class DocGiaService {
    items = [];
    nextId = 1;
    create(dto) {
        const item = {
            id: this.nextId++,
            ho_ten: dto.ho_ten,
            email: dto.email,
            so_dien_thoai: dto.so_dien_thoai ?? null,
            created_at: new Date().toISOString(),
        };
        this.items.push(item);
        return item;
    }
    findAll() {
        return [...this.items];
    }
    findOne(id) {
        return this.items.find((i) => i.id === id);
    }
    update(id, dto) {
        const idx = this.items.findIndex((i) => i.id === id);
        if (idx === -1)
            return undefined;
        const existing = this.items[idx];
        const updated = {
            ...existing,
            ho_ten: dto.ho_ten ?? existing.ho_ten,
            email: dto.email ?? existing.email,
            so_dien_thoai: dto.so_dien_thoai ?? existing.so_dien_thoai,
        };
        this.items[idx] = updated;
        return updated;
    }
    remove(id) {
        const idx = this.items.findIndex((i) => i.id === id);
        if (idx === -1)
            return false;
        this.items.splice(idx, 1);
        return true;
    }
}
exports.DocGiaService = DocGiaService;
exports.defaultDocGiaService = new DocGiaService();
//# sourceMappingURL=doc-gia.service.js.map