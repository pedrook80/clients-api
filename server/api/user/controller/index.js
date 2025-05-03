import { createUser } from '../useCases/createUserUseCase.js'
// import { deleteUserUseCase } from '../useCases/deleteUserUseCase.js'
// import { showUsersUseCase } from '../useCases/showUserUseCase.js'
// import { editUserUseCase } from '../useCases/editUserUseCase.js'
// import { showUserUseCase } from '../useCases/showUsersUseCase.js'
import { loginUser } from '../useCases/loginUserUseCase.js'

export const create = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;    

      const result = await createUser({ name, email, password });
      return res.status(201).json({ message: 'Usuario criado com sucesso.',result });
    } catch (error) {
      next(error)
    }
  }
  
  export const login = async (req, response, next) => {
    try {
      const { email, password } = req.body;    

      const loginUsers = await loginUser({ email, password })
      return response.status(200).json(loginUsers)
    } catch (error) {
      next(error)
    }
  }

  // export const index = async (req, response, next) => {
  //   try {

  //     const indexUsers = await showUsersUseCase()
  //     return response.status(200).json(indexUsers)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  
  // export const show = async (req, response, next) => {
  //   try {
      
  //     const showUsers = await showUserUseCase(req.params.id)
  //     return response.status(200).json(showUsers)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  
  // export const update = async (req, response, next) => {
  //   try {

  //     const updateUsers = await editUserUseCase()
  //     return response.status(200).json(updateUsers)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  
  // export const destroy = async (req, response, next) => {
  //   try {
  //     const destroyUsers = await deleteUserUseCase(req.params.id)
  //     return response.status(204).json(destroyUsers)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  