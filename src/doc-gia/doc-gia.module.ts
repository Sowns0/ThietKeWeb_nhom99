import { Router } from 'express';
import { DocGiaService, defaultDocGiaService } from './doc-gia.service';
import { createDocGiaController } from './doc-gia.controller';

export function createDocGiaRouter(service: DocGiaService = defaultDocGiaService): Router {
  const ctrl = createDocGiaController(service);
  const router: Router = Router();

  // CRUD Routes
  router.post('/', ctrl.create);           // Create
  router.get('/', ctrl.findAll);           // Read All
  router.put('/:id', ctrl.update);         // Update
  router.delete('/:id', ctrl.remove);      // Delete

  return router;
}

export default createDocGiaRouter;