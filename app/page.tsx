"use client";

import Image from "next/image";
import checkWhitelist from "@/actions/checkWhitelist";
import csx from "@/util/csx";
import { useState } from "react";

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
      Your wallet is eligible!
    </div>
  );
}

type Eligibility = boolean | null;

export default function Home() {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isOnWhitelist, setIsOnWhitelist] = useState<Eligibility>(null);

  return (
    <main className="flex flex-col h-full items-center justify-center">
      <div className="flex flex-row justify-center align-center">
        <Image
          src="/napejas_mosaic.png"
          height={500}
          width={500}
          alt="Napejas"
        />
        <div className="flex flex-col px-8">
          <div className="text-lg py-2">
            Paste your Injective address below to see if you're on the
            whitelist:
          </div>
          <input
            className={csx(
              "p-3 my-2",
              "rounded-md text-white",
              "bg-transparent",
              "border-borderwhite border"
            )}
            type="text"
            placeholder="Your Address"
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
