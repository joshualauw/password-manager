import cryptojs from "crypto-js";

export default function decrypt(text: string, privateKey: string) {
    const bytes = cryptojs.AES.decrypt(text, privateKey);
    const plaintext = bytes.toString(cryptojs.enc.Utf8);

    return plaintext.toString();
}
