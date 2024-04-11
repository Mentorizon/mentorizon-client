class AuthStorage {
    private static readonly TOKEN_KEY = 'token';
    private static readonly USER_ID_KEY = 'userId';
    private static readonly ROLES_KEY = 'roles';

    static setToken(token: string): void {
        localStorage.setItem(AuthStorage.TOKEN_KEY, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(AuthStorage.TOKEN_KEY);
    }

    static removeToken(): void {
        localStorage.removeItem(AuthStorage.TOKEN_KEY);
    }

    static setUserId(userId: string): void {
        localStorage.setItem(AuthStorage.USER_ID_KEY, userId);
    }

    static getUserId(): string | null {
        return localStorage.getItem(AuthStorage.USER_ID_KEY);
    }

    static removeUserId(): void {
        localStorage.removeItem(AuthStorage.USER_ID_KEY);
    }

    static setRoles(roles: string[]): void {
        localStorage.setItem(AuthStorage.ROLES_KEY, JSON.stringify(roles));
    }

    private static getRoles(): string[] {
        const roles = localStorage.getItem(AuthStorage.ROLES_KEY);
        return roles ? JSON.parse(roles) : [];
    }

    static isMentor(): boolean {
        const roles = AuthStorage.getRoles();
        return roles.includes('ROLE_MENTOR');
    }

    static isMentee(): boolean {
        const roles = AuthStorage.getRoles();
        return roles.includes('ROLE_MENTEE');
    }

    static isAdmin(): boolean {
        const roles = AuthStorage.getRoles();
        return roles.includes('ROLE_ADMIN');
    }

    static removeRoles(): void {
        localStorage.removeItem(AuthStorage.ROLES_KEY);
    }

    static isAuthenticated(): boolean {
        return !!AuthStorage.getToken();
    }
}

export default AuthStorage;
