"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocGiaController = createDocGiaController;
function parseId(value) {
    const n = Number(value);
    return Number.isInteger(n) && n > 0 ? n : null;
}
function createDocGiaController(service) {
    return {
        create: (req, res) => {
            const { ho_ten, email, so_dien_thoai } = req.body || {};
            if (!ho_ten?.trim() || !email?.trim()) {
                return res.status(400).json({
                    message: 'ho_ten và email là bắt buộc'
                });
            }
            const created = service.create({ ho_ten, email, so_dien_thoai });
            return res.status(201).json(created);
        },
        findAll: (req, res) => {
            return res.json(service.findAll());
        },
        update: (req, res) => {
            const id = parseId(req.params.id);
            if (!id)
                return res.status(400).json({ message: 'invalid id' });
            const updated = service.update(id, req.body || {});
            if (!updated)
                return res.status(404).json({ message: 'not found' });
            return res.json(updated);
        },
        remove: (req, res) => {
            const id = parseId(req.params.id);
            if (!id)
                return res.status(400).json({ message: 'invalid id' });
            const ok = service.remove(id);
            if (!ok)
                return res.status(404).json({ message: 'not found' });
            return res.status(204).send();
        },
    };
}
//# sourceMappingURL=doc-gia.controller.js.map