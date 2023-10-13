export class UserPost {
    userGuid: any = null;
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string = "";
    password?: string;
    isBlocked: boolean = false;
    createdDate: Date = new Date();
    editedDate: Date = new Date();
}
