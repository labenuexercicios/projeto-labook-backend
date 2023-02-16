export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updateAt: string
    ){}

    getId(): string{
        return this.id
    }

    setId(value: string):void {
        this.id = value
    }

    getCreatorId(): string{
        return this.creatorId
    }

    setCreatorId(value: string):void {
        this.creatorId = value
    }

    getContent(): string{
        return this.content
    }

    setContent(value: string):void {
        this.content = value
    }

    getLikes(): number{
        return this.likes
    }

    setLikes(value: number):void {
        this.likes = value
    }

    getDislikes(): number{
        return this.dislikes
    }

    setDislikes(value: number):void {
        this.dislikes = value
    }

    getCreatedAt(): string{
        return this.createdAt
    }

    setCreatedAt(value: string):void {
        this.createdAt = value
    }

    getUpdateAt(): string{
        return this.updateAt
    }

    setUpdateAt(value: string):void {
        this.updateAt = value
    }
}

