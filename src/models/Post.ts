export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
    ){}

    public getId(): string {
        return this.id
    }
    public setId(newValue: string) {
        this.id = newValue
    }

    public getCreatorId(): string {
        return this.creatorId
    }
    public setCreatorId(newValue: string) {
        this.creatorId = newValue
    }

    public getContent(): string {
        return this.content
    }
    public setContent(newValue: string) {
        this.content = newValue
    }

    public getLikes(): number {
        return this.likes
    }
    public setLikes(newValue: number) {
        this.likes = newValue
    }

    public getDislikes(): number {
        return this.dislikes
    }
    public setDislikes(newValue: number) {
        this.dislikes = newValue
    }

    public getCreatedAt(): string {
        return this.createdAt
    }
    public setCreatedAt(newValue: string) {
        this.createdAt = newValue
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }
    public setUpdatedAt(newValue: string) {
        this.updatedAt = newValue
    }
}