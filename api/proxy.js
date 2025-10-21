// api/proxy.js
export default async function handler(req, res) {
  // ✅ 1. Build the target URL correctly (no double slashes)
  const target = "https://taskflow-api.istad.co" + req.url.replace("/api/proxy", "");

  try {
    // ✅ 2. Handle preflight (must come before fetch)
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(200).end();
    }

    // ✅ 3. Forward the real request
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const text = await response.text();

    // ✅ 4. Allow browser access (CORS)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // ✅ 5. Return backend response to frontend
    res.status(response.status).send(text);
  } catch (err) {
    // ✅ 6. Catch errors clearly
    res.status(500).json({
      message: "Proxy request failed",
      error: err.message,
      hint: "Check if backend API URL is correct or if backend is down.",
    });
  }
}
