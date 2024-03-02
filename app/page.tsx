"use client";

import Image from "next/image";
import checkWhitelist from "@/actions/checkWhitelist";
import csx from "@/util/csx";
import { useState } from "react";

type Eligibility = boolean | null;

function NotEligible() {
  return (
    <div
      className={csx(
        "p-4 my-2 rounded bg-apered border border-apered bg-opacity-50"
      )}
    >
      Sorry, your wallet is not eligible.
    </div>
  );
}

function Eligible() {
  return (
    <div
      className={csx(
        "p-4 my-2 rounded bg-apegreen border border-apegreen bg-opacity-50"
      )}
    >
      Your wallet is eligible! :&#41;
    </div>
  );
}

function MintDetail({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-x-3 text-xl">
      <div className="w-[130px] font-bold">{name}</div>
      <div className="">{children}</div>
    </div>
  );
}

function MintDetails() {
  return (
    <div className={csx("flex flex-col items-center p-4 mb-6")}>
      <h1 className="text-4xl mb-4 finger-paint uppercase text-[#f5eabd]">
        - Mint Details -
      </h1>
      <div className="flex flex-col">
        <MintDetail name="Supply">2900 NFTs</MintDetail>
        <MintDetail name="WL">0.2 $INJ</MintDetail>
        <MintDetail name="Public">0.3 $INJ</MintDetail>
        <MintDetail name="Mint Date">05/03/2024 19.30 UTC</MintDetail>
        <MintDetail name="Marketplace">
          <a href="#">Talis Protocol</a>
        </MintDetail>
      </div>
    </div>
  );
}

export default function Home() {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isOnWhitelist, setIsOnWhitelist] = useState<Eligibility>(null);

  return (
    <main className="flex flex-col h-full items-center justify-center">
      <div className="flex flex-row justify-center align-center">
        <Image
          className="mx-8"
          src="/napejas_mosaic.png"
          height={500}
          width={500}
          alt="Napejas"
          priority
        />
        <div className="flex flex-col px-8 w-[600px]">
          <MintDetails />
          <div className="text-lg py-2">
            Paste your Injective address to see if you&#39;re on the whitelist:
          </div>
          <input
            className={csx(
              "p-3 my-2",
              "rounded-lg text-white",
              "bg-transparent",
              "border-borderwhite border-2"
            )}
            type="text"
            placeholder="Your Injective Address"
            onChange={(e) => {
              if (!e.currentTarget.value) {
                setIsInputEmpty(true);
              } else {
                checkWhitelist(e.currentTarget.value).then((value) => {
                  setIsOnWhitelist(value);
                  setIsInputEmpty(false);
                });
              }
            }}
          />
          {isInputEmpty ? null : isOnWhitelist === false ? (
            <NotEligible />
          ) : isOnWhitelist === true ? (
            <Eligible />
          ) : null}
        </div>
      </div>
    </main>
  );
}
