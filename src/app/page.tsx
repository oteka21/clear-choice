"use client";
import { useEffect, useState } from "react";
import { NewItemForm } from "~/components/new-item-fom";
import { Edit, Plus, Check } from "lucide-react";
import { useCompletion } from "ai/react";
import { ResultModal } from "~/components/result-modal";

const newProFormId = "new_pro_form";
const newConFormId = "new_con_form";

export default function HomePage() {
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { completion, setInput, handleSubmit } = useCompletion();

  useEffect(() => {
    setInput(`
      <title>
      ${title}
      </title>

      <pros>
      ${JSON.stringify(pros)}
      </pros>
      
      <cons>
      ${JSON.stringify(cons)}
      </cons>
      `
    );
  }, [title, pros, cons]);

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="mb-4 flex items-center">
        <div className="flex justify-center items-center w-full">
          {isEditingTitle ? (
            <div className="flex items-center">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))}
                className="input input-bordered mr-2 text-xl font-bold"
                autoFocus
              />
              <button
                className="btn btn-circle btn-sm"
                onClick={() => setIsEditingTitle(false)}
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">
                {title || "Decision Maker Assistant"}
              </h1>
              <button
                className="btn btn-circle btn-sm ml-2"
                onClick={() => setIsEditingTitle(true)}
              >
                <Edit size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full flex-1">
        <div className="card h-auto flex-1 place-items-center rounded-box bg-orange-50 p-2">
          <div className="flex w-full">
            <h2 className="text-xl font-semibold text-green-500">Pros</h2>
            <button
              className="btn btn-primary ml-auto"
              onClick={() => {
                const dialog = document.getElementById(
                  newProFormId,
                ) as HTMLDialogElement;
                dialog.showModal();
              }}
            >
              <Plus />
            </button>
            <NewItemForm
              dialogId={newProFormId}
              title="Enter Pro Details"
              placeholder="Example: Good battery life"
              onSubmit={({ value }) => {
                setPros([
                  ...pros,
                  value.charAt(0).toUpperCase() + value.slice(1),
                ]);
                const dialog = document.getElementById(
                  newProFormId,
                ) as HTMLDialogElement;
                dialog.close();
              }}
            />
          </div>
          <div className="mt-2 flex w-full flex-col">
            {pros.map((pro, index) => (
              <div
                key={index}
                className="mb-2 flex w-full items-center justify-between rounded-box bg-green-100 p-2"
              >
                <p>{pro}</p>
                <button className="btn btn-ghost">
                  <Edit />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="divider divider-horizontal">VS</div>
        <div className="card h-auto flex-1 place-items-center rounded-box bg-orange-50 p-2">
          <div className="flex w-full">
            <h2 className="text-xl font-semibold text-red-600">Cons</h2>
            <button
              className="btn btn-primary ml-auto"
              onClick={() => {
                const dialog = document.getElementById(
                  newConFormId,
                ) as HTMLDialogElement;
                dialog.showModal();
              }}
            >
              <Plus />
            </button>
            <NewItemForm
              dialogId={newConFormId}
              title="Enter Con Details"
              placeholder="example: Bad battery life"
              onSubmit={({ value }) => {
                setCons([
                  ...cons,
                  value.charAt(0).toUpperCase() + value.slice(1),
                ]);
                const dialog = document.getElementById(
                  newConFormId,
                ) as HTMLDialogElement;
                dialog.close();
              }}
            />
          </div>
          <div className="mt-2 flex w-full flex-col">
            {cons.map((con, index) => (
              <div
                key={index}
                className="mb-2 flex w-full items-center justify-between rounded-box bg-red-100 p-2"
              >
                <p>{con}</p>
                <button className="btn btn-ghost">
                  <Edit />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary my-2"
        onClick={async () => {
          void handleSubmit();
          const resultModal = document.getElementById(
            "result_modal",
          ) as HTMLDialogElement;
          resultModal.showModal();
        }}
      >
        Analize
      </button>
      <ResultModal dialogId="result_modal" text={completion} />
    </main>
  );
}
