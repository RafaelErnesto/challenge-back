import { InvalidAuthorName } from "./errors/invalid-author-name";

interface AuthorData {
    name: string
}

export class Author {
    public readonly name: string;

    private constructor(name: string) {
        this.name = name;
        Object.freeze(this);
    }

    static create(data: AuthorData) {
        return new Author(data.name)
    }

}