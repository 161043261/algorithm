"use client";

import { useParams } from "next/navigation";

export default function AboutIdListPage() {
  const params = useParams();
  const { idList } = params;
  return (
    <>
      {Array.isArray(idList) &&
        idList.map((item) => <div key={item}>{item}</div>)}
    </>
  );
}
