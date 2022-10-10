import { Roles } from '@src/domains/user/roles';
import { AbstractValueObject } from '@src/domains/abstract-value-object';

type UserRoleValue = Roles.USER | Roles.ADMIN;

export class UserRoleVo extends AbstractValueObject<UserRoleValue> {
    public constructor(value: UserRoleValue) {
        super(value);
    }

    public static create(value: string): UserRoleVo {
        if (this.isNullOrUndefined(value)) {
            throw new Error('Role value is not provided.');
        }

        if (!this.isValidRole(value)) {
            throw new Error('Unknown role value is provided.');
        }

        return new UserRoleVo(value as UserRoleValue);
    }

    protected static isValidRole(value: any): boolean {
        return Object.values(Roles).includes(value);
    }
}
