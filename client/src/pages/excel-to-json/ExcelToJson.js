// Developed by Shripad Dhanshetti

// Parses an uploaded .xlsx / .xls file using the `xlsx` library.
// Returns a Promise that resolves to:
//   {
//     sheetNames: string[],
//     sheets: { [sheetName]: Array<Record<string, any>> }
//   }
//
// Each row becomes a plain object whose keys are the column headers
// from the first row of the sheet.

import * as XLSX from "xlsx";

/**
 * Parse an Excel file into JSON.
 * @param {File} file  - The File object from an <input type="file"> element.
 * @returns {Promise<{ sheetNames: string[], sheets: object }>}
 */
export function ExcelToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target.result;

        // Parse the workbook
        const workbook = XLSX.read(data, { type: "array" });

        const sheetNames = workbook.SheetNames;
        const sheets = {};

        sheetNames.forEach((name) => {
          const worksheet = workbook.Sheets[name];
          // sheet_to_json: first row = headers, empty cells = undefined (omitted)
          sheets[name] = XLSX.utils.sheet_to_json(worksheet, {
            defval: "", // fill empty cells with "" instead of omitting
            raw: false, // convert all values to strings for consistent display
          });
        });

        resolve({ sheetNames, sheets });
      } catch (err) {
        reject(new Error("Failed to parse Excel file: " + err.message));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file."));

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Convert a JSON array to a downloadable .json file and trigger download.
 * @param {Array}  data      - The array to serialise.
 * @param {string} filename  - Desired file name (without extension).
 */
export function downloadJson(data, filename = "output") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
