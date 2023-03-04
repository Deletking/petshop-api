/* eslint-disable prettier/prettier */
export class User {
    constructor(
        public username: string,
        public password: string,
        public active: boolean,
        public roles: Array<string>
    ) { }
}