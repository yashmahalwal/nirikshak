const signale: any = jest.genMockFromModule("signale");
signale.fatal = jest.fn();
signale.success = jest.fn();

export default signale;
