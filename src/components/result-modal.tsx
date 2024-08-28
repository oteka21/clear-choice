"use client";
import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { chaoticOrbit } = await import("ldrs");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      chaoticOrbit.register();
    }
    void getLoader();
  }, []);
  return <l-chaotic-orbit size="45" speed="1.75" color="rgb(67,1,255)"></l-chaotic-orbit>;
}

export const ResultModal = ({
  dialogId,
  text,
}: {
  dialogId: string;
  text: string | undefined;
}) => {
  return (
    <dialog id={dialogId} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="mb-4 text-lg font-bold">Result</h3>
        <div className="">
          {text ? (
            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
          ) : (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </dialog>
  );
};
