import { password, select } from "@inquirer/prompts";
import { getUser } from "../utils/getUser";
import Password from "../data/models/Password";
import decrypt from "../encryption/decrypt";
import dayjs from "dayjs";
import { validate } from "../utils/validate";

export async function detailPasswordPrompt(label: string) {
    const user = await getUser();
    const masterPassword = await password({ message: "master password required:", validate, mask: true });

    if (masterPassword != user.getDataValue("password")) {
        console.log("master password not match!");
        return;
    }

    const _password = await Password.findOne({ where: { label } });
    if (_password == null) console.log("password not found");

    console.log("\nLabel: " + label);
    console.log("Key: " + _password.getDataValue("key"));
    console.log("Value: " + decrypt(_password.getDataValue("value"), masterPassword));
    console.log("Created at: " + dayjs(_password.getDataValue("createdAt")).format("DD-MM-YYYY HH:mm"));
    console.log("Updated at: " + dayjs(_password.getDataValue("createdAt")).format("DD-MM-YYYY HH:mm"));

    console.log("");
    const choice = await select({
        message: "Actions:",
        choices: [
            { name: "0. Back", value: "back" },
            { name: "1. Update", value: "update" },
            { name: "2. Delete", value: "delete" },
        ],
    });

    switch (choice) {
        case "update":
            break;
        case "delete":
            break;
    }
}
