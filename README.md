# Password Manager CLI

this CLI Aims to help users manage their passwords. On the first time you need to enter your username and master password. After that, you can do this following:

-   View Password: show a list of created passwords. Select one of them to display password detail (you must enter your master password). Then you can proceed to update or delete it.
-   Create Password: create a new password pair. You must enter label, the key, and the value. Example:

```
 label: Google Account
 key: iloveprogramming@yahoo.com
 value: IL0veProgramm1ng
```

-   Update Profile: change your username and master password, then all your passwords will be re-encrypted.

### Installation and Usage:

```
npm install @joshualauw/password-manager
jpm (run the CLI)
```

### Tools and Libraries used:

-   Inquirer-js
-   nanospinner
-   typescript
-   Figlet
-   Crypto-js
-   SQLite
-   Sequelize

#### Authored By: Joshua William @2023
