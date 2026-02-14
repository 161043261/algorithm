"use client";

import { useRouter } from "next/navigation";

export default function AboutHerPage() {
  const router = useRouter();
  return (
    <main className="bg-yellow-300">
      About Her
      <button onClick={() => router.push("/about")}>history.pushState</button>
      <button onClick={() => router.replace("/about")}>
        history.replaceState
      </button>
      <button onClick={() => router.back()}>history.back</button>
      <button onClick={() => router.forward()}>history.forward</button>
      <button onClick={() => router.refresh()}>refresh /about/him</button>
      <button onClick={() => router.prefetch("/about/him")}>
        prefetch /about/him
      </button>
    </main>
  );
}
