POST
https://portal.bulkgate.com/api/1.0/simple/transactional

BODY:

{
    "application_id": "<BULKGATE_APPLICATION_ID>", 
    "application_token": "<BULKGATE_APPLICATION_TOKEN>", 
    "number": "<number>", 
    "text": "<SMS>", 
    "unicode": true,
    "sender_id": "gSystem",
    "sender_id_value": "BulkGate",
    "country": "it"
}


