import { v4 } from 'uuid';

export class IdGenerator {
  // Método responsável por gerar um identificador único (UUID)
  public generate = (): string => {
    return v4();
  }
}
