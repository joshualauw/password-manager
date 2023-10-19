#! /usr/bin/env node

import figlet from "figlet";
import User from "./data/models/User";
import { input, password, select } from "@inquirer/prompts";
import { connDB } from "./data/db";
import { validate } from "./utils/validate";
import { createPasswordPrompt } from "./prompts/create-password";
import { getUser } from "./utils/getUser";
import { viewPasswordPrompt } from "./prompts/view-password";
import { updateUser } from "./prompts/update-user";

connDB().then(async () => {
    await checkMasterPassword();

    figlet("Password Manager", async function (err, data) {
        if (err) console.error(err.message);
        console.log(data);
        await mainPrompt();
    });
});

async function mainPrompt() {
    const user = await getUser();
    console.log("\nWelcome, " + user.getDataValue("username"));
    const answer = await select({
        message: "What do you want to do?",
        choices: [
            { name: "1. View Password", value: "view" },
            { name: "2. Create Password", value: "create" },
            { name: "3. Update Profile", value: "profile" },
            { name: "0. Exit", value: "exit" },
        ],
    });

    switch (answer) {
        case "view":
            await viewPasswordPrompt();
            break;
        case "create":
            await createPasswordPrompt();
            break;
        case "profile":
            await updateUser();
            break;
        default:
            process.exit(0);
    }

    await mainPrompt();
}

async function checkMasterPassword() {
    const users = await User.findAll();

    if (users.length == 0) {
        const username = await input({ message: "What should we call you?", validate });
        const _password = await password({
            message: "Enter your master password (important):",
            validate,
            mask: true,
        });

        await User.create({ username, password: _password });
    }
}
