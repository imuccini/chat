export interface BulkGateResponse {
    data: {
        status: string;
        message_id?: string;
        part_id?: string[];
        cost?: number;
        remaining_credit?: number;
    };
    error?: string;
}

export async function sendSMS(to: string, text: string): Promise<{ success: boolean; error?: string }> {
    const appId = process.env.BULKGATE_APPLICATION_ID;
    const appToken = process.env.BULKGATE_APPLICATION_TOKEN;

    if (!appId || !appToken) {
        console.error("BulkGate credentials missing");
        return { success: false, error: "Configuration Error" };
    }

    // Ensure number format (BulkGate usually expects intl format without + or with?)
    // Docs say: "number": "447700900000" (international format without +)
    // But verify based on user input (user input will be +39...)
    // Let's strip the + just in case.
    const cleanNumber = to.replace(/^\+/, '');

    const payload = {
        application_id: appId,
        application_token: appToken,
        number: cleanNumber,
        text: text,
        unicode: true,
        sender_id: "gSystem",
        sender_id_value: "BulkGate",
        country: "it"
    };

    try {
        const response = await fetch('https://portal.bulkgate.com/api/1.0/simple/transactional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("BulkGate API Error:", response.status, errorText);
            return { success: false, error: `API Error: ${response.status}` };
        }

        const data = await response.json();
        /* 
           Success response example:
           {
               "data": {
                   "status": "accepted",
                   "message_id": "...",
                   ...
               }
           }
        */

        if (data.data && data.data.status === 'accepted') {
            return { success: true };
        } else {
            console.error("BulkGate Error Response:", data);
            return { success: false, error: data.error || "Unknown BulkGate Error" };
        }

    } catch (e: any) {
        console.error("BulkGate Network Error:", e);
        return { success: false, error: e.message };
    }
}
