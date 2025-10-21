// api/proxy.js
export default async function handler(req, res) {
  // build target URL
  const target = "https://taskflow-api.istad.co" + req.url.replace("/api/proxy", "");

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    // copy response body
    const data = await response.text();

    // allow your Vercel domain to access this endpoint
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // handle preflight
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ message: "Proxy request failed", error: err.message });
  }
}
