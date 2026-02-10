import FeedbackClient from './FeedbackClient';

export const dynamic = 'auto';
export const revalidate = 0;

// Required for static export with dynamic routes
export async function generateStaticParams() {
    return [];
}

export default function FeedbackPage() {
    return <FeedbackClient />;
}
