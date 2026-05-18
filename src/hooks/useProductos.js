import { useState, useEffect } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTttWRRK_q7-YSk-oqDajhESX_vvpsjAWU5DmK9QJ-IMcWoPv1Nlwg2rBByO0aKjuBETym9dQBUoJ_E/pub?gid=0&single=true&output=csv";

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += line[i];
      }
    }
    values.push(current.trim());
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i] || "";
      return obj;
    }, {});
  });
}

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el catálogo");
        return res.text();
      })
      .then((text) => {
        const parsed = parseCSV(text);
        setProductos(parsed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { productos, loading, error };
}