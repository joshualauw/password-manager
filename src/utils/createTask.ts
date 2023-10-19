import { createSpinner } from "nanospinner";

export async function createTask(task: Function) {
    return new Promise(async (resolve) => {
        const spinner = createSpinner("Loading...").start();
        await task();
        setTimeout(() => {
            spinner.success();
            resolve(true);
        }, 1000);
    });
}
