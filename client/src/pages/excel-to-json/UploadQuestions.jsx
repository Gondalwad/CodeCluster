import React, { useState } from "react";

import ExcelUploader from "./ExcelUploader.jsx";

const UploadQuestions = () => {

    const [questions, setQuestions] = useState([]);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Upload Questions
            </h1>

            {/* Upload Component */}
            <ExcelUploader onDataParsed={setQuestions} />

            {/* Display Questions */}
            <div className="mt-6">

                {questions.length > 0 ? (

                    questions.map((question, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-4 mb-4"
                        >
                            {
                                Object.entries(question).map(([key, value]) => (

                                    <p key={key}>
                                        <strong>{key}:</strong> {value}
                                    </p>

                                ))
                            }
                        </div>

                    ))

                ) : (

                    <p>No questions uploaded.</p>

                )}

            </div>

        </div>
    );
};

export default UploadQuestions;