'use client';

import LandingPage from "../components/LandingPage";
import { useRouter } from "next/navigation";

export default function MarketingHomePage() {
    const router = useRouter();

    const handleConnect = () => {
        // Redirect to the actual app subdomain
        window.location.href = "https://app.getlocal.chat";
    };

    return <LandingPage onConnect={handleConnect} />;
}
