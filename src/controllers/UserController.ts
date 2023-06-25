import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../utils/types';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';
import USER_ROLES from '../models/User';

const userRepository = new UserRepository();

class UserController {
  static authenticate(authenticate: any) {
      throw new Error('Method not implemented.');
  }
  static login(arg0: string, login: any) {
      throw new Error('Method not implemented.');
  }
  static signup(arg0: string, signup: any) {
      throw new Error('Method not implemented.');
  }
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Verificar se o usuário já está cadastrado
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cadastrar o usuário
      const user: User = {
        id: '',
        name,
        email,
        password: hashedPassword,
        role: USER_ROLES.NORMAL,
      };
      const createdUser = await userRepository.create(user);

      // Gerar token JWT
      const tokenPayload: TokenPayload = {
        userId: createdUser.id,
        // Remova a propriedade 'name' do tokenPayload
      };
      const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      console.error('Error in signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Restante do código...
}

export default UserController;
