import { useState } from "react";
import { Form, useNavigate } from "react-router";
import { thaiMonths } from "~/api";
import "./styles.css";
import CustomEditor from "~/routes/public-components/slate-editor/custom-editor";

function generateUID(): number {
  const now = Date.now();
  const timestamp = Math.floor(now);
  const randomNumber = Math.floor(Math.random() * 10000); // Generate a random 5-digit number
  return parseInt(`${timestamp}${randomNumber}`);
}
export default function App() {
  // variables
  const [files, setFiles] = useState<{ uid: number; file: File }[]>([]);
  const navigate = useNavigate();

  // handlers
  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files as FileList;
    if (typeof file[0] !== "undefined") {
      setFiles((prev) => [...prev, { uid: generateUID(), file: file[0] }]);
    }
  };

  const handleRemoveFile = (uid: number) => {
    setFiles((prev) => {
      const newFileSet = prev.filter((el) => el.uid !== uid);
      return newFileSet;
    });
  };

  const handleSubmit = (action: string) => {
    const form = document.getElementById("form");

    const formData = new FormData(form as HTMLFormElement);

    const data: { [key: string]: any } = {};
    for (const entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    if (action === "submit") {
      // Perform submission logic here, using 'data' object
      navigate("/success"); // Example navigation after successful submission
    } else if (action === "saveDraft") {
      // Perform save draft logic here, using 'data' object
      console.log("Saving draft:", data);
    }
  };

  const handlePreview = () => {
    const form = document.getElementById("form");
    const formData = new FormData(form as HTMLFormElement);

    const previewData: { [key: string]: any } = {};

    for (const entry of formData.entries()) {
      previewData[entry[0]] = entry[1];
    }

    if (files.length > 0) {
      const fileName = files.map((el) => el.file.name);

      previewData.files = fileName;
    } else {
      previewData.files = [];
    }

    previewData.author = "นายทรงศักดิ์ ออร่าสว่างไสว";
    previewData.authorPosition = 'ผู้อำนวยการโรงเรียนเบตง "วีระราษฎร์ประสาน"';

    const body = previewData.content;

    console.log(previewData);

    return;
    // reserve data in sessionStorage
    sessionStorage.setItem(
      "previewData",
      JSON.stringify({ id: 1, file: "test" })
    );
    window.open("/create/preview");
  };

  return (
    <main className="flex flex-col gap-10 my-6 items-center">
      <Form
        id="form"
        autoComplete="off"
        className="flex flex-col border border-gray-300 rounded py-4 px-6 max-w-7xl w-full"
      >
        <h3 className="text-2xl font-semibold mb-4">สร้างบันทึก</h3>

        <div className="flex flex-col gap-4">
          {/* origin */}
          <div className="flex flex-col">
            <label
              htmlFor="origin"
              className="block text-base font-medium text-gray-700"
            >
              ค้นหาต้นแบบ
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="origin"
                name="origin"
                placeholder="ระบุเลขที่หนังสือต้นฉบับและกดปุ่มค้นหา"
                className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                ค้นหา
              </button>
            </div>
          </div>
          {/* sector */}
          <div className="flex flex-col">
            <label
              htmlFor="sector"
              className="block text-base font-medium text-gray-700"
            >
              ส่วนราชการ
            </label>
            <input
              type="text"
              id="sector"
              name="sector"
              placeholder="ระบุชื่อส่วนราชการ"
              defaultValue='โรงเรียนเบตง "วีระราษฎร์ประสาน" อำเภอเบตง จังหวัดยะลา'
              className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
            />
          </div>
          {/* bookNo & Date */}
          <div className="flex items-center gap-20">
            {/* bookNo */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="BookNo"
                className="block text-base font-medium text-gray-700"
              >
                เลขที่หนังสือ
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="BookNo"
                  name="BookNo"
                  placeholder="ระบุเลขที่หนังสือ"
                  className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
                />
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  ค้นหา
                </button>
              </div>
            </div>

            {/* date of issue */}
            <div className="flex flex-col w-full">
              <label htmlFor="day">วันที่</label>
              <div className="flex items-center gap-2">
                <select
                  id="day"
                  name="day"
                  defaultValue={new Date().getDate()}
                  className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
                >
                  {/* ... more options up to 31 */}
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {(i + 1).toString()}
                    </option>
                  ))}
                </select>

                <select
                  id="month"
                  name="month"
                  defaultValue={new Date().getMonth()}
                  className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
                >
                  {/* ... more options up to 12 */}
                  {thaiMonths.map((month, i) => (
                    <option key={i} value={i}>
                      {month}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  id="year"
                  name="year"
                  defaultValue={(new Date().getFullYear() + 543).toString()}
                  className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
                />
              </div>
            </div>
          </div>
          {/* title */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700"
            >
              เรื่อง
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="ระบุชื่อเรื่องหนังสือ"
              className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
            />
          </div>
          {/* toWhom */}
          <div className="flex flex-col">
            <label
              htmlFor="toWhom"
              className="block text-base font-medium text-gray-700"
            >
              เรียน
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="toWhom"
                name="toWhom"
                placeholder="กดปุ่มค้นหาด้านข้างเพื่อเลือกผู้รับหนังสือ"
                className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                ค้นหา
              </button>
            </div>
          </div>
          {/* attechments */}
          <div className="flex flex-col items-start border border-gray-300 rounded-lg p-3">
            <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              เพิ่มสิ่งที่แนบมาด้วย
              <input
                type="file"
                name="attechments"
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
                className="invisible w-0"
              />
            </label>
            {files.length > 0 && (
              <ul className="list-disc mt-4 ms-10 space-y-2">
                {files.map((el, i) => (
                  <li key={i} className="list-item space-x-14">
                    <span>{el.file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(el.uid)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
                    >
                      ลบ
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* body */}
          <div className="flex flex-col w-[16cm]">
            ข้อความ
            <CustomEditor />
          </div>
          {/* ending */}
          <div className="flex flex-col">
            <label
              htmlFor="ending"
              className="block text-base font-medium text-gray-700"
            >
              คำลงท้าย
            </label>
            <input
              type="text"
              id="ending"
              name="ending"
              placeholder="จึงเรียนมาเพื่อโปรดทราบ"
              className="block w-full shadow-sm sm:text-base border border-gray-600 rounded-md py-2 px-3 text-base font-medium"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleSubmit("save")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              บันทึก
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              แสดงตัวอย่าง
            </button>
          </div>
        </div>
      </Form>
    </main>
  );
}
