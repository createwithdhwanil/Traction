import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const encrypt = (text) => {
  if (!text) return "";
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (encryptedText) => {
  if (!encryptedText) return "";

  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
};
