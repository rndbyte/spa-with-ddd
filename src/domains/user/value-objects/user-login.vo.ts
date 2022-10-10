import { AbstractValueObject } from '@src/domains/abstract-value-object';

type UserLoginValue = string;

export class UserLoginVo extends AbstractValueObject<UserLoginValue> {
    public constructor(value: UserLoginValue) {
        super(value);
    }

    public static create(value: UserLoginValue): UserLoginVo {
        if (this.isNullOrUndefined(value)) {
            throw new Error('Login value is not provided.');
        }

        return new UserLoginVo(value);
    }
}
