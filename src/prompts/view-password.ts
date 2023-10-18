import { select } from "@inquirer/prompts";
import Password from "../data/models/Password";
import { detailPasswordPrompt } from "./detail-password";

export async function viewPasswordPrompt() {
    const passwords = await Password.findAll();

    console.log("");
    const answer = await select({
        message: "Password List",
        choices: [
            { name: "0. Back", value: "back" },
            ...passwords.map((pass, idx) => ({
                name: idx + 1 + ". " + pass.getDataValue("label"),
                value: pass.getDataValue("label"),
            })),
        ],
    });

    if (answer != "back") {
        await detailPasswordPrompt(answer);
        await viewPasswordPrompt();
    }
}
