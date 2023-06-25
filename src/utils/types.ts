// src/utils/types.ts

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    // Outras propriedades do usuário
  }
  
  export interface TokenPayload {
    userId: string; // Altere o tipo para string
    // Outras propriedades relacionadas ao token
  }
  
  export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  };
  