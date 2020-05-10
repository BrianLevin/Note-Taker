function renderLicenseBadge(license) {
    if (license !== "None") {
        return '[![GitHub license ](https://img.shields.io/badge/license-${license}-blue.svg)]';
    }
    return ''

}

function generateMarkdown(data) {
    return `
 # title
 ${data.title} 

 ## Description
 ${data.description}

 ## Test

 \`\`\`
 ${data.tests}
 \`\`\`
 
 \`\`\`
## install
${data.install} 
 \`\`\`

## github
${data.github}

## email
${data.email}

## usage
\`\`\`
${data.usage}
\`\`\`

## contributing

${data.contributing}

## license

${renderLicenseBadge(data.license)}

 
 `;

}

module.exports = generateMarkdown;