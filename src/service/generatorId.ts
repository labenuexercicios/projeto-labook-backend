import { v4 } from 'uuid'

export class generatorId {
    public generate = (): string => {
        return v4()
    }
}