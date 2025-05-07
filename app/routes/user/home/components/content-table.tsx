import type { TContentTableData } from "./type";

export default function ContentTable({ data }: { data: TContentTableData[] }) {
  return (
    <div className="overflow-x-auto w-full px-3">
      <table className="min-w-full divide-y divide-gray-200 w-full border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-black text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
            >
              เลขที่หนังสือ
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-black text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
            >
              ลงวันที่
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-black text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
            >
              เรื่อง
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-black text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
            >
              ผู้ส่ง
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-black text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
            >
              วันเวลาที่ส่ง
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Add table rows here */}
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 border-b border-gray-200"
            >
              <td className="px-6 py-4 text-black text-sm">{row.bookNo}</td>
              <td className="px-6 py-4 text-black text-sm">{row.bookDate}</td>
              <td className="px-6 py-4 text-black text-sm">{row.title}</td>
              <td className="px-6 py-4 text-black text-sm">{row.sender}</td>
              <td className="px-6 py-4 text-black text-sm">{row.sentTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
