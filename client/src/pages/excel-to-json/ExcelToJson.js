import * as XLSX from "xlsx";

export const ExcelToJson = (file) => {
       return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (event) => {
            
            try {
                // Convert the file into binary data
                const data = event.target.result;
                
                // Read the workbook
                const workbook = XLSX.read(data, {
                    type: "array",
                });
            
                // Get the first sheet name
                const sheetName = workbook.SheetNames[0];

                // Get the worksheet
                const worksheet = workbook.Sheets[sheetName];
            
                // Convert worksheet to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                                
                resolve(jsonData);

            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file."));
        };

        // Read the uploaded file
        reader.readAsArrayBuffer(file);
    });
};