const patchIdentifier = "SomeRandomPatchIdentifier213281927498jsd"

function interpret(input) {
	let result = ""
	let lineResult = ""

	let lines = input.split('\n\n')

	let bold, italic, underline, strike, link = false
	let patch = ""

	lines.forEach(line => {
		lineResult = ""

		if(line[0] == '-') lineResult += handleList(line.split('\n'))
		else lineResult += handleLine(line)

		if(patch != "") {
			lineResult = lineResult.replace(patchIdentifier, patch)
			patch = ""
		}

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
			lineResult += handleToken(token)
			lineResult += " "
		})

		lineResult = lineResult.slice(0,-1)

		if(headingLevel != 0) lineResult = `<h${headingLevel}>${lineResult}</h${headingLevel}>`
		else lineResult = `<p>${lineResult}</p>`

		return lineResult
	}

	function handleList(items) {
		let listResult = "<ul>"

		items.forEach(item => {
			listResult += "<li>" + handleLine(item.slice(1)) + "</li>"
		})

		return listResult + "</ul>"
	}

	function handleToken(token) {
		let tokenResult = ""

		let skip = 0
		let processingUrl = false
		let url = ""

		token.split('').forEach((c, i) => {
			if(skip > 0) { skip -= 1; return }
			
			if(processingUrl) {
				if(c == ")") {
					patch = url

					processingUrl = false
					url = ""
				}
				else url += c
			}
			// Check italic/bold
			else if(c == "*") {
				// bold
				if(token[i+1] == "*") {
					tokenResult += bold ? "</b>" : "<b>"
					bold = !bold
					skip += 1
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
					skip += 1
				}
				// underline
				else {
					tokenResult += underline ? "</u>" : "<u>"
					underline = !underline
				}
			}
			// Check links
			else if(c == "[") {
				tokenResult += `<a href='${patchIdentifier}' target='_blank'>`
				link = true
			} else if(c == "]" && link) {
				tokenResult += "</a>"
				if(token[i+1] == "(") {
					processingUrl = true
					link = false
					skip += 1
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
