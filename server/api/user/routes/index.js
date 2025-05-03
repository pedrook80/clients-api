import * as express from 'express';
import { create, login /*index, show, update, destroy*/ } from '../controller/index.js'

export default express
  .Router()
  .post('/', create)
  .post('/login', login)
  // .get('/', index)
  // .get('/:id', show)
  // .delete('/:id', destroy)
  // .put('/', update);
