/*
 * This UDF is used to extract a field from metadata and add it to the message data.
 * 
 * @param {Object} message - The message to modify.
 * @param {Object} metadata - The metadata containing the field to extract.
 * @returns {Object} The message with the extracted field added to data.
 */
function upgrade_attribute(message, metadata) {
    // Parse the message
    const data = JSON.parse(message.data);
    const attributes = message.attributes;
    
    // Define the field to extract from metadata
    const fieldToExtract = 'city';
    
    // Check if attributes exist and field exists in attributes
    if (attributes && attributes[fieldToExtract] != null) {
        // Add field to data
        data[fieldToExtract] = attributes[fieldToExtract];
        
        // Remove field from attributes
        delete attributes[fieldToExtract];
    }
    
    // Update the message with modified data
    message.data = JSON.stringify(data);
    
    return message;
}
