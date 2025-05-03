import * as express from 'express';
import { create, index, show, update, destroy } from '../controller/index.js'
import authenticateToken from '../../../middlewares/auth.js';

export default express
  .Router()
  .post('/', authenticateToken, create)
  .get('/', authenticateToken, index)
  .get('/:id', authenticateToken, show)
  .delete('/:id', authenticateToken, destroy)
  .put('/', authenticateToken, update);
