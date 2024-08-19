import { Router } from 'express';
import { Libro } from './controller.js';

export const router = Router()

router.get('/Libros', Libro.getAll);
router.post('/Libro', Libro.add);
router.delete('/Libro', Libro.delete);
router.put('/Libro', Libro.update);
router.get('/Libro', Libro.getOne)