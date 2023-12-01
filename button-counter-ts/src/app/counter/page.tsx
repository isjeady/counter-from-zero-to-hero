import Counter from "@/components/Counter";
import Text from "@/components/ui/Text";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Text label={"Counter Page"} />
      <Counter />
    </main>
  );
}
