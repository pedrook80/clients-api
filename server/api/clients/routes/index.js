import * as express from 'express';
import { create, index, show, update, destroy } from '../controller/index.js'

export default express
  .Router()
  .post('/', create)
  .get('/', index)
  .get('/:id', show)
  .delete('/:id', destroy)
  .put('/', update);
