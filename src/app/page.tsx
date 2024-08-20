"use client";
import { useState } from "react";
import { NewItemForm } from "~/components/new-item-fom";
import { Edit, Plus } from "lucide-react";

const newProFormId = "new_pro_form";
const newConFormId = "new_con_form";

export default function HomePage() {
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col p-4">
      <h1 className="mb-4 text-3xl font-bold">Decision Maker Assistant</h1>
     
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
                setPros([...pros, value.charAt(0).toUpperCase() + value.slice(1)]);
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
                setCons([...cons, value.charAt(0).toUpperCase() + value.slice(1)]);
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
      >
        Analize
      </button>
    </main>
  );
}
