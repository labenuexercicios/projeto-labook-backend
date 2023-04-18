import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager {
    public hash = async (plaintext: string) => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(plaintext, salt)

        return hash
    }

    public compare = async (plaintext: string, hash: string) => {
				// aqui não precisa do await porque o return já se comporta como um
        return bcrypt.compare(plaintext, hash)
    }
}