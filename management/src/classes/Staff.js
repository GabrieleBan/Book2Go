
export default class Staff {
    constructor({ username, roles, userId }) {
        this.username = username;
        this.roles = roles;
        this.userId = userId;
    }

    static fromToken(token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
            return new Staff({
                username: payload.username,
                roles: payload.roles || [],
                userId: payload.userUUID || payload.sub,
            });
        } catch {
            return null;
        }
    }
}