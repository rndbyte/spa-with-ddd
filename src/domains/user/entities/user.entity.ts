import { Roles } from '@src/domains/user/roles';
import { UserRoleVo } from '@src/domains/user/value-objects/user-role.vo';
import { UserLoginVo } from '@src/domains/user/value-objects/user-login.vo';

export type UserId = string;

export class UserEntity {
    public constructor(
        private readonly _id: UserId,
        private readonly _login: UserLoginVo,
        private readonly _name: string,
        private readonly _role: UserRoleVo,
    ) {}

    get id(): UserId {
        return this._id;
    }

    get login(): UserLoginVo {
        return this._login;
    }

    get name(): string {
        return this._name;
    }

    get role(): UserRoleVo {
        return this._role;
    }

    public isAdmin(): boolean {
        return this.role.value === Roles.ADMIN;
    }

    public isUser(): boolean {
        return this.role.value === Roles.USER;
    }
}
