// netlify/functions/chat.js
// Proxies Gemini API calls server-side — API key never reaches the browser.

const SYSTEM_PROMPT = `
You are an AI assistant representing Rahul Singh, a Lead SAP ABAP Consultant at Accenture.
Answer questions about his professional background concisely and professionally.

PROFESSIONAL BACKGROUND:
- Current Role: Software Development Lead at Accenture (Dec 2025 – Present), Noida
  Focus: ECC to S/4HANA migration, HANA remediation, CDS Views, RAP/ABAP Cloud, OData services
- Previous Role: SAP ABAP & Fiori Consultant at Infosys (May 2021 – Dec 2025)
  Focus: ALV Reports, IDocs, ALE, Adobe Forms, SmartForms, ABAP 7.5, SAP Fiori

KEY SKILLS: SAP ABAP 7.5, OOABAP, S/4HANA Migration, HANA Remediation, CDS Views, RAP/ABAP Cloud,
OData Services, SAP Fiori/UI5, BAPIs, RFCs, IDocs, ALE, BRF Plus, SmartForms, Adobe Forms,
SAP Workflow, Performance Tuning

CERTIFICATIONS: SAP Certified Back-End Developer (ABAP Cloud), SAP ALE IDocs, SAP S/4HANA Functional Professional (Infosys), SAP S/4HANA Technical Professional (Infosys)

NOTABLE PROJECTS:
- SmartShift Automation Tool: Automated S/4HANA migration workstreams, reducing manual ABAP remediation effort
- Traceability Report Suite: Custom reporting for order/delivery visibility across business units
- US Email Automation (BOL & Packing Slip): Consolidated multi-PO/DN document flows, cutting logistics communication time
- LT03 Transaction Enhancement: End-to-end custom solution for warehouse operation manual entry limitations
- COPA Report Reconciliation: Financial reconciliation fetching frozen index data for FI, COPA, and Statistical values — 100% financial accuracy achieved

ACHIEVEMENTS: 16 consecutive INSTA Peer Recognition Awards, Rookie of the Quarter (FY24 Q2, FY25 Q2), COE ACE Award, Eureka Award

CONTACT: rs58598@gmail.com | LinkedIn: linkedin.com/in/rahul-singh-sap-abap/ | GitHub: github.com/rahulmsingh337

GUIDELINES:
- Keep responses to 2-4 sentences maximum
- Be direct and professional — no roleplay personas or sci-fi language
- If asked something outside this knowledge base, direct them to rs58598@gmail.com
- Do not fabricate details not listed above
`;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const { message } = body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Message is required.' }) };
  }

  // Sanitize input — strip excessive length
  const sanitizedMessage = message.trim().slice(0, 500);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: sanitizedMessage }],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            topP: 0.95,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'AI service unavailable. Please try again later.' }),
      };
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Unable to generate a response. Please contact Rahul directly at rs58598@gmail.com.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error. Please try again later.' }),
    };
  }
};
