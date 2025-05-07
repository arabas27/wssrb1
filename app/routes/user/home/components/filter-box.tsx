import { Form, useSubmit } from "react-router";

export default function FilterBox() {
  const submit = useSubmit();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    submit(formData);
  };

  return (
    <Form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex flex-col border border-gray-300 rounded py-4 px-6 w-full max-w-3xl"
    >
      <h3 className="text-lg font-semibold mb-4">ค้นหา</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="bookNo"
            className="block text-sm font-medium text-gray-700"
          >
            เลขที่หนังสือ:
          </label>
          <input
            type="text"
            id="bookNo"
            name="bookNo"
            placeholder="ระบุเลขที่หนังสือ"
            className="block w-full shadow-sm sm:text-sm border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="bookDate"
            className="block text-sm font-medium text-gray-700"
          >
            ลงวันที่:
          </label>
          <input
            type="date"
            id="bookDate"
            name="bookDate"
            placeholder="ระบุวันที่"
            className="block w-full shadow-sm sm:text-sm border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            เรื่อง:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="ระบุเรื่อง"
            className="block w-full shadow-sm sm:text-sm border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
      >
        ค้นหา
      </button>
    </Form>
  );
}
