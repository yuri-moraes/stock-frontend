import ResultDisplay from "@/components/ResultDisplay";
import TableData from "@/components/TableData";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl mt-[0.2em] ml-[0.56em] mr-[0.56em] mb-5">
        Dashboard
      </h1>
      <ResultDisplay />
      <TableData />
    </>
  );
}
