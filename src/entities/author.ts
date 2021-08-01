import { InvalidAuthorName } from "./errors/invalid-author-name";

export interface AuthorData {
    name: string
}

export class Author {
    public readonly name: string;

    private constructor(name: string) {
        this.name = name;
        Object.freeze(this);
    }

    static create(data: AuthorData) {
        if(data.name.length === 0) {
            throw new InvalidAuthorName(data.name)
        }
        return new Author(data.name)
    }

}