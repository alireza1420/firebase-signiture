
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-primary">SignLink</span>
      </h1>
      <p className="text-lg mb-8">
        Secure and easy-to-use platform for collecting electronic signatures.
      </p>
      <Link href="/admin">
        <Button>Go to Admin Dashboard</Button>
      </Link>
    </div>
  );
}
