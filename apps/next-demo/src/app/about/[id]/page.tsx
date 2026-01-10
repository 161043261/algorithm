"use client";

import { useParams } from "next/navigation";

export default function AboutIdPage() {
  const params = useParams();
  const { id } = params;
  return <>AboutPage {id}</>;
}
