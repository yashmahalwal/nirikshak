const childProcess: any = jest.genMockFromModule("child_process");
childProcess.execSync = jest.fn();

export default childProcess;
