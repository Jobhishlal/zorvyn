import { Router } from 'express';
import { FinancialRecordController } from '../controller/financial-record.controller.js';
import { authenticate, authorize } from '../../infrastructure/security/middleware.js';
import { UserRole } from '../../domain/entity/user.entity.js';

const router = Router();

router.get('/', authenticate, FinancialRecordController.getAll);

router.get('/summary', authenticate, authorize([UserRole.ADMIN, UserRole.ANALYST]), FinancialRecordController.getSummary);


router.post('/', authenticate, authorize([UserRole.ADMIN]), FinancialRecordController.create);
router.patch('/:id', authenticate, authorize([UserRole.ADMIN]), FinancialRecordController.update);
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), FinancialRecordController.delete);

export default router;
