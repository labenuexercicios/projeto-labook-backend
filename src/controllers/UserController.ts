import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenPayload, USER_ROLES } from '../utils/types';
import UserRepository from '../repositories/UserRepository';

const userRepository = new UserRepository();

class UserController {
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
      const user = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: USER_ROLES.NORMAL,
      });

      // Gerar token JWT
      const tokenPayload: TokenPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };
      const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      console.error('Error in signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verificar se o usuário existe
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verificar se a senha está correta
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Gerar token JWT
      const tokenPayload: TokenPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };
      const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
