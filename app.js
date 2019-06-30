function interpret(input) {
	let result = ""

	let lines = input.split('\n\n')

	lines.forEach(line => {
		let lineResult = ""
		let headingLevel = 0

		// Split the line
		let tokens = line.split(' ')

		tokens.forEach(token => {
			// Handle headings
			if(token[0] == '#') {
				headingLevel = token.length
			}
			// Single word bold
			else if(token.slice(0,2) == '**' && token.slice(-2) == '**') {
				lineResult += `<b>${token.slice(2,-2)}</b> `
			}
			// Start bold
			else if(token.slice(0,2) == '**') {
				lineResult += `<b>${token.slice(2)} `
			}
			// End bold
			else if(token.slice(-2) == '**') {
				lineResult += `${token.slice(0,-2)}</b> `
			}
			// Single word italic
			else if(token[0] == '*' && token[token.length-1] == '*') {
				lineResult += `<i>${token.slice(1,-1)}</i> `
			}
			// Start italic
			else if(token[0] == '*') {
				lineResult += `<i>${token.slice(1)} `
			}
			// End italic
			else if(token[token.length-1] == '*') {
				lineResult += `${token.slice(-1)}</i> `
			}
			// Single word strikethrough
			else if(token.slice(0,2) == '__' && token.slice(-2) == '__') {
				lineResult += `<s>${token.slice(2,-2)}</s> `
			}
			// Start strikethrough
			else if(token.slice(0,2) == '__') {
				lineResult += `<s>${token.slice(2)} `
			}
			// End strikethrough
			else if(token.slice(-2) == '__') {
				lineResult += `${token.slice(0,-2)}</s> `
			}
			// Single word underline
			else if(token[0] == '_' && token[token.length-1] == '_') {
				lineResult += `<u>${token.slice(1,-1)}</u> `
			}
			// Start underline
			else if(token[0] == '_') {
				lineResult += `<u>${token.slice(1)} `
			}
			// End underline
			else if(token[token.length-1] == '_') {
				lineResult += `${token.slice(-1)}</u> `
			}
			// Normal token
			else {
				lineResult += `${token} `
			}
		});

		lineResult = lineResult.slice(0,-1)

		if(headingLevel != 0) lineResult = `<h${headingLevel}>${lineResult}</h${headingLevel}>`
		else lineResult = `<p>${lineResult}</p>`

		result += lineResult
	});

	return result
}

module.exports = interpret


const fs = require('fs')
let testFile = fs.readFileSync('test.md', 'utf-8')
let result = interpret(testFile)
fs.writeFileSync('output.html', result)
