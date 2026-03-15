import fetch from 'node-fetch';
import https from 'https';
import 'dotenv/config';

const agent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL = process.env.SAP_URL;
const AUTH = Buffer.from(`${process.env.SAP_USER}:${process.env.SAP_PASSWORD}`).toString('base64');
const CLIENT = process.env.SAP_CLIENT;

export async function s4hGet(path) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Basic ${AUTH}`,
      'Accept': 'application/json',
      'sap-client': CLIENT
    },
    agent
  });
  if (!response.ok) {
    throw new Error(`S4H OData error ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

export async function s4hPost(path, body) {
  // Fetch CSRF token first
  const tokenRes = await fetch(`${BASE_URL}/sap/opu/odata4/`, {
    headers: {
      'Authorization': `Basic ${AUTH}`,
      'x-csrf-token': 'fetch',
      'sap-client': CLIENT
    },
    agent
  });
  const csrfToken = tokenRes.headers.get('x-csrf-token');

  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${AUTH}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
      'sap-client': CLIENT
    },
    body: JSON.stringify(body),
    agent
  });
  if (!response.ok) {
    throw new Error(`S4H POST error ${response.status}: ${await response.text()}`);
  }
  return response.json();
}
