import { Request, Response } from 'express';
import { DocGiaService } from './doc-gia.service';

function parseId(value: unknown): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function createDocGiaController(service: DocGiaService) {
  return {
    create: (req: Request, res: Response) => {
      const { ho_ten, email, so_dien_thoai } = req.body || {};

      if (!ho_ten?.trim() || !email?.trim()) {
        return res.status(400).json({ 
          message: 'ho_ten và email là bắt buộc' 
        });
      }

      const created = service.create({ ho_ten, email, so_dien_thoai });
      return res.status(201).json(created);
    },

    findAll: (req: Request, res: Response) => {
      return res.json(service.findAll());
    },

    update: (req: Request, res: Response) => {
      const id = parseId(req.params.id);
      if (!id) return res.status(400).json({ message: 'invalid id' });

      const updated = service.update(id, req.body || {});
      if (!updated) return res.status(404).json({ message: 'not found' });

      return res.json(updated);
    },

    remove: (req: Request, res: Response) => {
      const id = parseId(req.params.id);
      if (!id) return res.status(400).json({ message: 'invalid id' });

      const ok = service.remove(id);
      if (!ok) return res.status(404).json({ message: 'not found' });

      return res.status(204).send();
    },
  };
}