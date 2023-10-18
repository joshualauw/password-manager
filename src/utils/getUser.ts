import User from "../data/models/User";

export async function getUser() {
    const user = await User.findOne();
    return user;
}
