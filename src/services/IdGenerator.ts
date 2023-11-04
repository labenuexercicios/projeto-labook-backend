import { v4 } from 'uuid'

export class IdGenerator {
    public generateId = (): string => {
        return v4()
    }
}