export default async function handler(req, res) {
  const { path } = req.query;
  const subPath = Array.isArray(path) ? path.join("/") : "";
  const target = `https://taskflow-api.istad.co/${subPath}`;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}),
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") return res.status(200).end();

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({
      message: "Proxy request failed",
      error: err.message,
    });
  }
}
