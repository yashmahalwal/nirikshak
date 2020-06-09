import originalSignale from "signale";

const signale: any = jest.genMockFromModule("signale");
signale.fatal = jest
    .fn()
    .mockImplementation((...args: Parameters<typeof originalSignale.fatal>) => {
        void args;
    });

export default signale;
