import originalChildProcess from "child_process";

const childProcess: any = jest.genMockFromModule("child_process");
childProcess.execSync = jest
    .fn()
    .mockImplementation(
        (...args: Parameters<typeof originalChildProcess.execSync>) => {
            void args;
        }
    );

export default childProcess;
