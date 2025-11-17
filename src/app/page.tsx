"use client";

import Homepage from "./homepage/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/homepage");
  }, [router])

}
