function interpret(input) {
	let result = ""
	let lineResult = ""

	let lines = input.split('\n\n')

	let bold, italic, underline, strike = false

	lines.forEach(line => {
		lineResult = ""

		if(line[0] == '-') lineResult += list(line.split('\n'))
		else lineResult += handleLine(line)

		result += lineResult
	})

	return result

	function handleLine(line) {
		let lineResult = ""
		let headingLevel = 0

		// Split the line
		let tokens = line.split(' ')

		tokens.forEach(token => {
			// Handle headings
			if(token[0] == '#') {
				headingLevel = token.length
				return
			}

			// Text decoration
			lineResult += decoration(token)
			lineResult += " "
		})

		lineResult = lineResult.slice(0,-1)

		if(headingLevel != 0) lineResult = `<h${headingLevel}>${lineResult}</h${headingLevel}>`
		else lineResult = `<p>${lineResult}</p>`

		return lineResult
	}

	function list(items) {
		let listResult = "<ul>"

		items.forEach(item => {
			listResult += "<li>" + handleLine(item.slice(1)) + "</li>"
		})

		return listResult + "</ul>"
	}

	function decoration(token) {
		let tokenResult = ""

		let skip = false

		token.split('').forEach((c, i) => {
			if(skip) { skip = false; return }
			
			// Check italic/bold
			if(c == "*") {
				// bold
				if(token[i+1] == "*") {
					tokenResult += bold ? "</b>" : "<b>"
					bold = !bold
					skip = true
				}
				// italic
				else {
					tokenResult += italic ? "</i>" : "<i>"
					italic = !italic
				}
			}
			// Check underline/strikethrough
			else if(c == "_") {
				// strike
				if(token[i+1] == "_") {
					tokenResult += strike ? "</s>" : "<s>"
					strike = !strike
					skip = true
				}
				// underline
				else {
					tokenResult += underline ? "</u>" : "<u>"
					underline = !underline
				}
			}
			// Everything else
			else {
				tokenResult += c
			}
		})

		return tokenResult
	}
}



module.exports = interpret


const fs = require('fs')
let testFile = fs.readFileSync('test.md', 'utf-8')
let result = interpret(testFile)
fs.writeFileSync('output.html', result)
