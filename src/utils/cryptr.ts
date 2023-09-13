import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);

export function encrypt(value: string) {
    return cryptr.encrypt(value);
}

export function decrypt(encryptedValue: string) {
    return cryptr.decrypt(encryptedValue);
}
