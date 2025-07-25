/*
 * This UDF provides various number manipulation helper functions.
 * 
 * @param {Object} message - The message containing number fields to manipulate.
 * @param {Object} metadata - The metadata of the message.
 * @returns {Object} The message with manipulated number fields.
 */
function helper_number(message, metadata) {
    // Parse the message
    const data = JSON.parse(message.data);
    
    // Helper function to round to specified decimal places
    const roundToDecimal = (num, places) => {
        return Number(Math.round(num + 'e' + places) + 'e-' + places);
    };
    
    // Helper function to format number with commas
    const formatWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    // Helper function to convert to percentage
    const toPercentage = (num) => {
        return roundToDecimal(num * 100, 2);
    };
    
    // Helper function to clamp number between min and max
    const clamp = (num, min, max) => {
        return Math.min(Math.max(num, min), max);
    };
    
    // Apply transformations to specified fields
    data['field1'] = roundToDecimal(data['field1'], 2);
    data['field2'] = formatWithCommas(data['field2']);
    data['field3'] = toPercentage(data['field3']);
    data['field4'] = clamp(data['field4'], 0, 1000);
    
    // Update the message with transformed data
    message.data = JSON.stringify(data);
    
    return message;
}
