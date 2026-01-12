import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div data-flag="flag_{ok-this-one-was-really-easy}" className="text-center">
        <div className="text-4xl font-bold">STACS CTF 2026</div>
        <div className="mt-2">By STACS DEVs</div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-4 w-full px-4 sm:px-0 sm:w-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/teams" className="w-full sm:w-auto">
            <Button className="w-full">Register or Join Team</Button>
          </Link>
          <Link href="/faq" className="w-full sm:w-auto">
            <Button className="w-full">FAQ</Button>
          </Link>
          <Link href="/submit" className="w-full sm:w-auto">
            <Button className="w-full">Submit Flag</Button>
          </Link>
          <Link href="/leaderboard" className="w-full sm:w-auto">
            <Button className="w-full">Leaderboard</Button>
          </Link>
        </div>
        <Link href="/problems" className="w-full">
          <Button className="w-full">Problems</Button>
        </Link>
        <Link href="/archives" className="w-full">
          <Button variant="secondary" className="w-full">Archives</Button>
        </Link>
      </div>
    </div>
  );
}
