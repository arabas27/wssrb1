import ContentTable from "./components/content-table";
import FilterBox from "./components/filter-box";

export default function App() {
  const sampleData = [
    {
      bookNo: "12345",
      bookDate: "2023-10-26",
      title: "รายงานการประชุมครั้งที่ 1",
      sender: "นายสมชาย ใจดี",
      sentTime: "2023-10-26T10:00:00",
    },
    {
      bookNo: "67890",
      bookDate: "2023-10-25",
      title: "แผนพัฒนาบุคลากร",
      sender: "นางสมศรี มีความรู้",
      sentTime: "2023-10-25T14:30:00",
    },
    {
      bookNo: "13579",
      bookDate: "2023-10-24",
      title: "งบประมาณปี 2567",
      sender: "ดร.วิจารณ์ นักพัฒนา",
      sentTime: "2023-10-24T09:15:00",
    },
  ];

  return (
    <main className="flex flex-col gap-4 my-6 items-center">
      <FilterBox />
      <ContentTable data={sampleData} />
    </main>
  );
}
