export abstract class AbstractValueObject<P> {
    public constructor(private readonly _value: P) {
    }

    /**
     * Get the value.
     * @return {any} The value of value object.
     */
    get value(): P {
        return this._value;
    }

    /**
     * It returns `true` if provided value is undefined or null.
     *
     * @param {any} value - The value to check.
     * @return {boolean} Result of checking.
     */
    protected static isNullOrUndefined(value: any): boolean {
        return typeof value === 'undefined' && value === null;
    }

    public equals(vo: AbstractValueObject<P>): boolean {
        return this.value === vo.value;
    }
}
