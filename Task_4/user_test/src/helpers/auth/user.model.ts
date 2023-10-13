export class User {
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string = "";
    password?: string;
    repassword?: string;
    token?: string;
    isBlocked?: boolean;
    expires?: Date;
    edited?: Date;
}
