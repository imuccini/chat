"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrendData {
    day: string;
    count: number;
}

interface KpiDashboardProps {
    trends: {
        messages: TrendData[];
        users: TrendData[];
    };
    split: {
        anonymous: number;
        authenticated: number;
    };
}

export function KpiDashboard({ trends, split }: KpiDashboardProps) {
    const maxMessages = Math.max(...trends.messages.map(t => t.count), 1);
    const totalSplit = split.anonymous + split.authenticated || 1;
    const anonPercent = Math.round((split.anonymous / totalSplit) * 100);
    const authPercent = 100 - anonPercent;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Messages Trend */}
            <Card className="col-span-2 bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Messaggi - Trend 30gg</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px] flex items-end gap-1 px-2">
                        {trends.messages.length === 0 ? (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                                Nessun dato disponibile
                            </div>
                        ) : (
                            trends.messages.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-emerald-500 rounded-t-sm transition-all hover:bg-emerald-600 group relative"
                                    style={{ height: `${(t.count / maxMessages) * 100}%`, minHeight: '4px' }}
                                >
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {t.day}: {t.count} msg
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-medium px-1 uppercase tracking-wider">
                        <span>{trends.messages[0]?.day || ''}</span>
                        <span>{trends.messages[trends.messages.length - 1]?.day || ''}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Split Pie representation (Simplified) */}
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Anonimi vs Registrati</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pt-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                        <div
                            className="absolute inset-0 bg-emerald-500"
                            style={{ clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)` }}
                        />
                        <div
                            className="absolute inset-0 bg-orange-400"
                            style={{ clipPath: `conic-gradient(from 0deg, transparent ${authPercent}%, currentColor ${authPercent}%)` }}
                        />
                        {/* Better approach: CSS Conic gradient */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `conic-gradient(#10b981 ${authPercent}%, #fb923c ${authPercent}%)`
                            }}
                        />
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-semibold text-gray-600">Registrati</span>
                            </div>
                            <div className="text-lg font-bold text-gray-800">{authPercent}%</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-orange-400" />
                                <span className="text-xs font-semibold text-gray-600">Anonimi</span>
                            </div>
                            <div className="text-lg font-bold text-gray-800">{anonPercent}%</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
