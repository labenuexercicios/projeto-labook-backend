import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashManager {
  // Método assíncrono responsável por gerar o hash de uma senha
  public hash = async (plaintext: string): Promise<string> => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(plaintext, salt);

    return hash;
  };

  // Método assíncrono responsável por comparar uma senha em texto plano com um hash
  public compare = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    return bcrypt.compare(plaintext, hash);
  };
}
