import cryptojs from "crypto-js";

export default function encrypt(text: string, privateKey: string) {
    const ciphertext = cryptojs.AES.encrypt(text, privateKey);
    return ciphertext.toString();
}
