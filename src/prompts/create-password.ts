import { input, password } from "@inquirer/prompts";
import { validate } from "../utils/validate";
import Password from "../data/models/Password";
import encrypt from "../encryption/encrpyt";
import { getUser } from "../utils/getUser";
import { createTask } from "../utils/createTask";

export async function createPasswordPrompt() {
    const label = await input({ message: "Password label:", validate });
    const key = await input({ message: "Password key:", validate });
    const value = await password({ message: "Password value:", validate, mask: true });

    const user = await getUser();

    await createTask(async () => {
        await Password.create({ label, key, value: encrypt(value, user.getDataValue("password")) });
    });
    console.log("password pair created successfully");
}
