import {
    mockValue,
    mockClass,
    populateWithMockData,
    mockOptional,
} from "../../src/resource/decorator";
import faker from "faker";

describe("Generating mock resources", () => {
    beforeAll(() => jest.useFakeTimers());

    it(`Populates simple mocks`, async () => {
        function timeoutPromise<T>(value: T, ms: number): Promise<T> {
            return new Promise((resolve) =>
                setTimeout(() => resolve(value), ms)
            );
        }
        const id = faker.random.uuid();
        class TestClass {
            @mockValue(() => timeoutPromise(id, 10000))
            id: string;
            @mockValue(() => id)
            id2: string;
            name: string;
        }

        const instance = new TestClass();
        const promise = populateWithMockData(instance);
        jest.runAllTimers();
        await promise;
        expect(instance.id).toBe(id);
        expect(instance.id2).toBe(id);
        expect(instance.name).toBeUndefined();
    });

    it(`Populates nested objects`, async () => {
        class TestClass3 {
            @mockValue(async () => 3)
            c: number;
        }
        class TestClass2 {
            @mockValue(() => 2)
            b: number;

            @mockClass
            nested: TestClass3;
        }
        class TestClass1 {
            @mockValue(async () => 1)
            a: number;

            @mockClass
            nested: TestClass2;
        }

        const instance = new TestClass1();
        await populateWithMockData(instance);

        expect(instance.a).toBe(1);
        expect(instance.nested.b).toBe(2);
        expect(instance.nested.nested.c).toBe(3);
    });

    it(`Throws error on non class type for class mock`, async () => {
        class Test {
            @mockValue(async () => faker.random.number())
            a: number;
            b: string;
            @mockClass
            c: undefined;
        }
        expect.hasAssertions();
        try {
            await populateWithMockData(new Test());
        } catch (e) {
            expect(e.message).toBe("Expected the type of key c to be a class.");
        }
    });

    it(`Runs decorators in iteration order`, async () => {
        class Test {
            @mockValue(() => 1)
            id: string;
            @mockValue<Test>((instance) => Promise.resolve(instance.id + 2))
            id2: string;
        }
        const instance = new Test();
        await populateWithMockData(instance);
        expect(instance.id2).toBe(instance.id + 2);
    });

    it(`Skips optional fields`, async () => {
        class Test2 {
            @mockValue(faker.random.uuid)
            id: string;
        }

        class Test {
            @mockOptional(async () => true)
            @mockValue(faker.random.uuid)
            id?: string;

            @mockOptional(() => false)
            @mockValue(async () => faker.random.uuid())
            name?: string;

            @mockClass
            @mockOptional(() => true)
            nestedField?: Test2;

            @mockClass
            @mockOptional(async () => false)
            nestedField1?: Test2;

            @mockValue(faker.random.uuid)
            @mockOptional(async (instance) => "id" in instance)
            nextId: string;
        }

        const instance = new Test();
        await populateWithMockData(instance);
        expect("id" in instance).toBe(false);
        expect("name" in instance).toBe(true);
        expect("nestedField" in instance).toBe(false);
        expect("nestedField1" in instance).toBe(true);
        expect("nextId" in instance).toBe(true);
        expect(instance.nestedField1?.id).not.toBeUndefined();
    });
});
