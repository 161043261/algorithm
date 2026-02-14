"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";

const DynamicComponent = () => {
  const params = useParams();
  const { optionalList } = params;
  return (
    <>
      <div>optionalList</div>
      {Array.isArray(optionalList) &&
        optionalList.map((item) => <div key={item}>{item}</div>)}
    </>
  );
};

export default function AboutIdOptionalListPage() {
  return (
    <Suspense fallback={<div>Loading Dynamic Content...</div>}>
      <DynamicComponent />
    </Suspense>
  );
}
