"use client";

import { useSearchParams } from "next/navigation";

export default function AboutHimPage() {
  const searchParams = useSearchParams();
  return (
    <main className="bg-yellow-300">
      About Him
      <div>name: {searchParams.get("name") ?? "null"}</div>
      <div>
        age: {searchParams.has("age") ? searchParams.get("age") : "null"}
      </div>
    </main>
  );
}
