const signale: any = jest.genMockFromModule("signale");
signale.fatal = jest.fn();

export default signale;
