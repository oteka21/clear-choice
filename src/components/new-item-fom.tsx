import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  value: z.string().min(1, "Pro details are required"),
});

type Schema = z.infer<typeof schema>;

export const NewItemForm = ({
  onSubmit,
  title,
  dialogId,
  placeholder
}: {
  title?: string;
  placeholder?: string;
  onSubmit: (data: Schema) => void;
  dialogId: string;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const internalOnSubmit = (data: Schema) => {
    onSubmit(data);
    setValue("value", "");
  }

  return (
    <dialog id={dialogId} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="">
          <form method="dialog" onSubmit={handleSubmit(internalOnSubmit)}>
            <textarea style={{ resize: "none" }}
              {...register("value")}
              className="textarea textarea-bordered mb-4 w-full"
              placeholder={placeholder}
            ></textarea>
            <div className="flex justify-end">
            <button className="btn btn-ghost mr-2" onClick={
              (e) => {
                e.preventDefault();
                const dialog = document.getElementById(dialogId) as HTMLDialogElement;
                dialog.close();
              }
            }>Cancel</button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
