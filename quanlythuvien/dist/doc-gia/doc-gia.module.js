"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocGiaRouter = createDocGiaRouter;
const express_1 = require("express");
const doc_gia_service_1 = require("./doc-gia.service");
const doc_gia_controller_1 = require("./doc-gia.controller");
function createDocGiaRouter(service = doc_gia_service_1.defaultDocGiaService) {
    const ctrl = (0, doc_gia_controller_1.createDocGiaController)(service);
    const router = (0, express_1.Router)();
    router.post('/', ctrl.create);
    router.get('/', ctrl.findAll);
    router.put('/:id', ctrl.update);
    router.delete('/:id', ctrl.remove);
    return router;
}
exports.default = createDocGiaRouter;
//# sourceMappingURL=doc-gia.module.js.map