export class CacheHelper {
    static getToken() {
        return localStorage.getItem('userToken') || "{}";
    }

    static setToken(token: string) {
        localStorage.setItem('userToken', token);
    }

    static removeToken() {
        localStorage.removeItem('userName');
        return localStorage.removeItem('userToken');
    }

    static getUsername() {
        return localStorage.getItem('userName');
    }

    static setUsername(username: string) {
        localStorage.setItem('userName', username);
    }
}