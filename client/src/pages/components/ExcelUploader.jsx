/**
 * Responsible for:
 * File input
 * Calling the parser
 * Passing the parsed data to the parent component
 */

import React from 'react';

import * as XLSX from 'xlsx';

// import { parseExcel } from "../utils/excelToJson";

const ExcelUploader = ({ onDataParsed }) => {

    const handleFileUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Validate file extension
        if (!file.name.endsWith(".xlsx")) {
            alert("Please upload a valid .xlsx file.");
            return;
        }

        try {

            const jsonData = await parseExcel(file);

            // Send parsed data to parent
            onDataParsed(jsonData);

        } catch (error) {

            console.error(error);
            alert("Failed to parse Excel file.");

        }

    };

    return (
        <div>
            <input
                className='block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 rounded-md'
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default ExcelUploader;
