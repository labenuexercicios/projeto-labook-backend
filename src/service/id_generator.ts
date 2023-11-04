import { v4 } from 'uuid';

export class IdGenerator {
    public generatorId(): string {
        return v4()
    }
}