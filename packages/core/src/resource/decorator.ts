import { mockKey, mockOptionalKey } from "./symbol-keys";
import "reflect-metadata";

export function mockValue<T extends Record<string, any> = Record<string, any>>(
    mockFunction: (instance: T) => any | Promise<any>
) {
    return function (targetObject: Record<string, any>, key: string): any {
        return Reflect.defineMetadata(mockKey, mockFunction, targetObject, key);
    };
}

export function mockClass(targetObject: Record<string, any>, key: string): any {
    const Constructor = Reflect.getMetadata("design:type", targetObject, key);

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
}

export function mockOptional<
    T extends Record<string, any> = Record<string, any>
>(checkFunction: (instance: T) => boolean | Promise<boolean>) {
    return function (targetObject: T, key: string): any {
        return Reflect.defineMetadata(
            mockOptionalKey,
            checkFunction,
            targetObject,
            key
        );
    };
}

export async function populateWithMockData(
    instance: Record<string, any>
): Promise<void> {
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
        if (Reflect.hasMetadata(mockKey, instance, key)) {
            instance[key] = await Reflect.getMetadata(
                mockKey,
                instance,
                key
            )(instance);
        }
    }
}
