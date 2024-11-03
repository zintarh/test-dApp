"use client";
import React, { useEffect, useState } from "react";
import { constants, Contract, RpcProvider } from "starknet";
import {
  connect,
  disconnect,
} from "tokenbound-connectkit-test";
import { CounterABi } from "./utils/abi";




const contractAddress = "0x45f8e8b3d6ecf220d78fdc13a523ae8ecaa90581ee68baa958d8ba3181841e9";
const provider = new RpcProvider({
  nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
})



export default function page() {
  const [connection, setConnection] = useState<
    null | undefined
  >(null);

  const [address, setAddress] = useState<string>("");
  const [account, setAccount] = useState();
  const counterContract = new Contract(CounterABi, contractAddress, provider);
  const [count, setCount] = useState<number>(0)





  const connectFn = async () => {
    try {
      const { wallet } = await connect({
        tokenboundOptions: {
          chainId: constants.NetworkName.SN_MAIN,
        },
      });
      setConnection(wallet);
      setAccount(wallet?.account);
      setAddress(wallet?.selectedAddress)
    } catch (e) {
      console.error(e);
      alert((e as any).message);
    }
  };

  const disconnectFn = async () => {
    await disconnect();
    setAddress("")
    setAccount(undefined)
    setConnection(null);
  };



  if (account) {
    counterContract.connect(account)
  }


  const setCounter = async () => {
    const call = counterContract.populate("set_count", [20])
    const res = await counterContract.set_count(call.calldata)
    await provider.waitForTransaction(res?.transaction_hash)
    const newCount = await counterContract.get_count()
    setCount(newCount.toString())

  }


  useEffect(() => {
    const getCounter = async () => {
      const counter = await counterContract.get_count()
      setCount(counter.toString())

    }
    getCounter()
  }, [])


  console.log(account, 'connected account')

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <p className="py-2 text-[25px] font-bold"> Counter dApp &</p>

      {!connection ? (
        <div>
          <button className="button cursor-pointer px-5 pt-5 py-3 text-white bg-[#0C0C4F]" onClick={connectFn}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <button className="" onClick={disconnectFn}>
          Disconnect
        </button> 
      )}

      <header className="">
        {address && (
          <p>
            <b>Address: {address}</b>
          </p>
        )}

        <div className=" py-5">

          <div className=" py-5 flex items-center justify-center">
            <p className="text-[20px]">Count: <span className="font-bold">{count}</span></p>
          </div>

          <div className="">
            <button
              className="px-5  py-3 bg-[#0C0C4F] text-white cursor-pointer"
              onClick={setCounter}
            >Set Count</button>
          </div>

          <hr />
        </div>
      </header>
    </div>
  );
}
