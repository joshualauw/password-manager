import { input, password } from "@inquirer/prompts";
import { validate } from "../utils/validate";
import { getUser } from "../utils/getUser";
import { createTask } from "../utils/createTask";
import User from "../data/models/User";
import Password from "../data/models/Password";
import encrypt from "../encryption/encrpyt";
import decrypt from "../encryption/decrypt";

export async function updateUser() {
    const username = await input({ message: "New Username:", validate });
    const newPassword = await password({ message: "New Master Password:", validate, mask: true });

    const user = await getUser();

    await createTask(async () => {
        const oldPassword = user.getDataValue("password");
        await User.update({ username, password: newPassword }, { where: { id: user.getDataValue("id") } });

        //re-encrypt all password with the new key
        const passwords = await Password.findAll();
        for (let pass of passwords) {
            const oldValue = decrypt(pass.getDataValue("value"), oldPassword);
            await Password.update(
                { value: encrypt(oldValue, newPassword) },
                { where: { id: pass.getDataValue("id") } }
            );
        }
    });
    console.log("user data updated successfully");
}
