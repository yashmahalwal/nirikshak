import { mockKey, mockOptionalKey, mockPluralKey } from "./symbol-keys";
import "reflect-metadata";

type ParameterDecorator<T extends Record<string, any> = Record<string, any>> = (
    targetObject: T,
    key: string
) => void;

export function mockValue<T extends Record<string, any> = Record<string, any>>(
    mockFunction: (instance: T) => any | Promise<any>
): ParameterDecorator {
    return function (targetObject: Record<string, any>, key: string): void {
        return Reflect.defineMetadata(mockKey, mockFunction, targetObject, key);
    };
}

export function mockClass(ctor?: {
    new (...args: any[]): any;
}): ParameterDecorator {
    return function (targetObject: Record<string, any>, key: string): void {
        const Constructor =
            ctor ?? Reflect.getMetadata("design:type", targetObject, key);

        return Reflect.defineMetadata(
            mockKey,
            async (instance: Record<string, any>) => {
                try {
                    instance[key] = new Constructor();
                } catch (e) {
                    throw new Error(
                        `Expected the type of key ${key} to be a class.`
                    );
                }
                await populateWithMockData(instance[key]);
                return instance[key];
            },
            targetObject,
            key
        );
    };
}

export function mockOptional<
    T extends Record<string, any> = Record<string, any>
>(
    checkFunction: (instance: T) => boolean | Promise<boolean>
): ParameterDecorator<T> {
    return function (targetObject: T, key: string): any {
        return Reflect.defineMetadata(
            mockOptionalKey,
            checkFunction,
            targetObject,
            key
        );
    };
}

export function mockPlural(): ParameterDecorator;
export function mockPlural(args: {
    min?: number;
    max?: number;
}): ParameterDecorator;
export function mockPlural<T extends Record<string, any> = Record<string, any>>(
    countFunction: (instance: T) => number | Promise<boolean>
): ParameterDecorator<T>;

export function mockPlural<T extends Record<string, any> = Record<string, any>>(
    arg?:
        | {
              min?: number;
              max?: number;
          }
        | ((instance: T) => number | Promise<boolean>)
): ParameterDecorator<T> {
    return function (targetObject: T, key: string): void {
        if (typeof arg === "function") {
            return Reflect.defineMetadata(
                mockPluralKey,
                arg,
                targetObject,
                key
            );
        }
        const min = arg?.min ?? 0;
        const max = arg?.max ?? 100;
        return Reflect.defineMetadata(
            mockPluralKey,
            () => Math.floor(Math.random() * (max - min) + min),
            targetObject,
            key
        );
    };
}

export async function populateWithMockData(
    instance: Record<string, any>
): Promise<void> {
    async function createMockValue(key: string): Promise<any> {
        if (Reflect.hasMetadata(mockKey, instance, key)) {
            return await Reflect.getMetadata(mockKey, instance, key)(instance);
        }
        return undefined;
    }

    for (const key in instance) {
        if (
            Reflect.hasMetadata(mockOptionalKey, instance, key) &&
            (await Reflect.getMetadata(
                mockOptionalKey,
                instance,
                key
            )(instance))
        ) {
            delete instance[key];
            continue;
        }

        if (Reflect.hasMetadata(mockPluralKey, instance, key)) {
            let count = await Reflect.getMetadata(
                mockPluralKey,
                instance,
                key
            )(instance);

            const arr = [];
            while (count--) arr.push(createMockValue(key));
            instance[key] = await Promise.all(arr);
            continue;
        }

        if (Reflect.hasMetadata(mockKey, instance, key)) {
            instance[key] = await createMockValue(key);
        }
    }
}
