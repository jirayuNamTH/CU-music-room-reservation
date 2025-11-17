"use client";

import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/shared/LoginForm"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-m flex-col gap-6 items-center">
            <a className="flex items-center gap-3 self-center font-medium">
            <div 
                className="flex size-20 items-center justify-center rounded-md cursor-pointer"
                onClick={() => router.push(`/`)}
            >
                <img src="/korkor.svg" />
            </div>
            <div className="text-m font-bold w-auto flex items-center">
            CU Faculty of Science <br/> Music and Performance Club
            </div>
            </a>
            <LoginForm className="w-full max-w-sm"/>
        </div>
        </div>
    )
}
