import { createClientsUseCase } from '../useCases/createClientsUseCase.js'
import { deleteClientsUseCase } from '../useCases/deleteClientsUseCase.js'
import { showClientssUseCase } from '../useCases/showClientssUseCase.js'
import { editClientsUseCase } from '../useCases/editClientsUseCase.js'
import { showClientsUseCase } from '../useCases/showClientsUseCase.js'
import { isValidCPF, isValidPhone, isValidEmail } from '../utils/validators.js'

export const create = async (req, res, next) => {
    try {
      const { cpf, name, phones, emails } = req.body;    

      if (!cpf || !name || !Array.isArray(phones) || !Array.isArray(emails)) {
        return res.status(400).json({ error: 'Dados inválidos ou incompletos.' });
      }

    const cpfValidation = isValidCPF(cpf);
    if (!cpfValidation) {
      return res.status(400).json({ error: 'CPF invalido' });
    }
    
    for (const phone of phones) {
      const phoneValidation = isValidPhone(phone);
      if (!phoneValidation) {
        return res.status(400).json({ error: 'Telefone invalido' });
      }
    }
    for (const email of emails) {
      const emailValidation = isValidEmail(email);
      if (!emailValidation) {
        return res.status(400).json({ error: 'Email invalido' });
      }
    }

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
  
  export const update = async (req, res, next) => {
    try {

      const { id, cpf, name, phones, emails } = req.body;

      if (!cpf || !name || !Array.isArray(phones) || !Array.isArray(emails)) {
        return res.status(400).json({ error: 'Dados inválidos ou incompletos.' });
      }

      await editClientsUseCase({ id, cpf, name, phones, emails })
      
      return res.status(200).json({ message: 'Cliente alterado com sucesso.'})
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
  