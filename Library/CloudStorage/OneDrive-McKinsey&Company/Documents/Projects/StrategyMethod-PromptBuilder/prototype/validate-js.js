// Simple JavaScript syntax validator
const fs = require('fs');

try {
    const jsContent = fs.readFileSync('./components/SectionCardComponent.js', 'utf8');
    
    // Try to create a function with the content to check for syntax errors
    new Function(jsContent);
    
    console.log('✅ JavaScript syntax is valid');
    
    // Also check if sectionConfigs is defined
    if (jsContent.includes('const sectionConfigs = {')) {
        console.log('✅ sectionConfigs object declaration found');
    } else {
        console.log('❌ sectionConfigs object declaration not found');
    }
    
    if (jsContent.includes('function createSectionCard(')) {
        console.log('✅ createSectionCard function declaration found');
    } else {
        console.log('❌ createSectionCard function declaration not found');
    }
    
} catch (error) {
    console.log('❌ JavaScript syntax error:', error.message);
    process.exit(1);
}