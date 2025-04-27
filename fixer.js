// fixer.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to fix the CSV file
    function fixCSV() {
        Papa.parse('data.csv', {
            download: true,
            header: true,
            complete: function (results) {
                const data = results.data;
                const fixedData = [];
                let hasFixes = false;

                // Fix each row
                data.forEach((row, index) => {
                    const fixedRow = { ...row };

                    // Fix "Do I still love her?" field
                    if (!fixedRow['Do I still love her?']) {
                        fixedRow['Do I still love her?'] = 'Unknown';
                        hasFixes = true;
                    }

                    // Fix "Message" field
                    if (!fixedRow.Message) {
                        fixedRow.Message = 'No message available';
                        hasFixes = true;
                    }

                    // Fix "Date" field
                    if (!fixedRow.Date || isNaN(new Date(fixedRow.Date).getTime())) {
                        fixedRow.Date = 'Unknown date';
                        hasFixes = true;
                    }

                    // Fix "Time" field
                    if (!fixedRow.Time || !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(fixedRow.Time)) {
                        fixedRow.Time = 'Unknown time';
                        hasFixes = true;
                    }

                    // Add the fixed row to the fixed data array
                    fixedData.push(fixedRow);
                });

                // If fixes were made, save the fixed CSV
                if (hasFixes) {
                    console.log("Fixes applied to CSV file.");
                    const fixedCSV = Papa.unparse(fixedData, { header: true });
                    downloadFixedCSV(fixedCSV);
                } else {
                    console.log("No fixes needed: CSV file is already valid.");
                }
            },
            error: function (error) {
                console.error("CSV Parsing Error:", error);
                alert(`Failed to parse CSV file. Please check the file format.\nError: ${error.message}`);
            }
        });
    }

    // Function to download the fixed CSV file
    function downloadFixedCSV(csvContent) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'fixed_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Run the fixer when the page loads
    fixCSV();
});