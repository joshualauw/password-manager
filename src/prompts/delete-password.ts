import { confirm } from "@inquirer/prompts";
import Password from "../data/models/Password";
import { createTask } from "../utils/createTask";

export async function deletePassword(id: string) {
    const confirmed = confirm({ message: "are you sure you want to delete this password?" });
    if (confirmed) {
        await createTask(async () => {
            await Password.destroy({ where: { id } });
        });
        console.log("password pair deleted successfully");
    }
}
