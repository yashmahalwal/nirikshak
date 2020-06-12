const childProcess: any = jest.genMockFromModule("child_process");
childProcess.execSync = jest.fn();

const send = jest.fn();
const on = jest
    .fn()
    .mockImplementation((event: string, callback: (input: any) => void) => {
        void event;
        setTimeout(() => callback("Ready"), 10);
        setTimeout(() => callback({ clusters: [], noise: [] }), 30);
    });
const child = {
    send,
    on,
};
childProcess.spawn = jest.fn().mockReturnValue(child);
export default childProcess;
