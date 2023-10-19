import { input, password } from "@inquirer/prompts";
import { getUser } from "../utils/getUser";
import { createTask } from "../utils/createTask";
import Password from "../data/models/Password";
import encrypt from "../encryption/encrpyt";
import { validate } from "../utils/validate";

export async function updatePassword(id: string) {
    const label = await input({ message: "New label:", validate });
    const key = await input({ message: "New Key:", validate });
    const value = await password({ message: "New Value:", validate, mask: true });

    const user = await getUser();

    await createTask(async () => {
        await Password.update({ label, key, value: encrypt(value, user.getDataValue("password")) }, { where: { id } });
    });
    console.log("password pair updated successfully");
}
