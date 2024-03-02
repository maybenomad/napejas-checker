"use server";

type WhitelistEntry = {
  wallet: string;
  mintlimit: number;
};

export default async function checkWhitelist(address: string) {
  const whitelist: WhitelistEntry[] = require("./whitelist.json");
  const cleanedAddress = address.toLowerCase().trim();

  return whitelist.some((x) => x.wallet === cleanedAddress);
}
