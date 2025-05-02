import { createClientsUseCase } from '../useCases/createClientsUseCase.js'
import { deleteClientsUseCase } from '../useCases/deleteClientsUseCase.js'
import { showClientssUseCase } from '../useCases/showClientssUseCase.js'
import { editClientsUseCase } from '../useCases/editClientsUseCase.js'
import { showClientsUseCase } from '../useCases/showClientsUseCase.js'

export const create = async (request, response, next) => {
    try {
      const createClients = await createClientsUseCase(body)
      return response.status(200).json(createClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const index = async (request, response, next) => {
    try {
      const indexClients = await showClientsUseCase(querymen)
      return response.status(200).json(indexClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const show = async (request, response, next) => {
    try {
      const showClients = await showClientssUseCase(params.id)
      return response.status(200).json(showClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const update = async (request, response, next) => {
    try {
      const updateClients = await editClientsUseCase(body, params)
      return response.status(200).json(updateClients)
    } catch (error) {
      next(error)
    }
  }
  
  export const destroy = async (request, response, next) => {
    try {
      const destroyClients = await deleteClientsUseCase(params.id)
      return response.status(204).json(destroyClients)
    } catch (error) {
      next(error)
    }
  }
  