import { createClientsUseCase } from '../useCases/createClientsUseCase.js'
import { deleteClientsUseCase } from '../useCases/deleteClientsUseCase.js'
import { showClientssUseCase } from '../useCases/showClientssUseCase.js'
import { editClientsUseCase } from '../useCases/editClientsUseCase.js'
import { showClientsUseCase } from '../useCases/showClientsUseCase.js'
import { validatorCpf } from '../utils/validators.js'

export const create = async (req, res, next) => {
    try {
      const { cpf, name, phones, emails } = req.body;    

      if (!cpf || !name || !Array.isArray(phones) || !Array.isArray(emails)) {
        return res.status(400).json({ error: 'Dados inválidos ou incompletos.' });
      }

      //if(validatorCpf(cpf)) return res.status(400).json({ error: 'CPF invalido' });

      const result = await createClientsUseCase({ cpf, name, phones, emails });
      return res.status(201).json({ message: 'Cliente criado com sucesso.', id: result.clientId });
    } catch (error) {
      next(error)
    }
  }
  
  export const index = async (request, response, next) => {
    try {

      const { ddd, namePart } = request.query

      const indexClients = await showClientssUseCase({ ddd, namePart })
      return response.status(200).json(indexClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const show = async (request, response, next) => {
    try {
      
      const showClients = await showClientsUseCase(request.params.id)
      return response.status(200).json(showClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const update = async (req, response, next) => {
    try {

      const { id, cpf, name, phones, emails } = req.body;

      if (!cpf || !name || !Array.isArray(phones) || !Array.isArray(emails)) {
        return res.status(400).json({ error: 'Dados inválidos ou incompletos.' });
      }

      const updateClients = await editClientsUseCase({ id, cpf, name, phones, emails }, params)
      return response.status(200).json(updateClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const destroy = async (req, response, next) => {
    try {
      const destroyClients = await deleteClientsUseCase(req.params.id)
      return response.status(204).json(destroyClients)
    } catch (error) {
      next(error)
    }
  }
  