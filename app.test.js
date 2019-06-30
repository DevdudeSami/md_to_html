const interpret = require('./app.js')

describe('Paragraphs', () => {
	test('Paragraphs', () => {
		const input = "Paragraph 1\n\nparagraph 2"
		expect(interpret(input)).toBe("<p>Paragraph 1</p><p>paragraph 2</p>")
	})
})

describe('Headings', () => {
	test('Level 1 heading', () => {
		const input = "# Heading"
		expect(interpret(input)).toBe("<h1>Heading</h1>")
	})
	
	test('Level 2 heading', () => {
		const input = "## Heading"
		expect(interpret(input)).toBe("<h2>Heading</h2>")
	})
	
	test('Level 3 heading', () => {
		const input = "### Heading"
		expect(interpret(input)).toBe("<h3>Heading</h3>")
	})
	
	test('Level 4 heading', () => {
		const input = "#### Heading"
		expect(interpret(input)).toBe("<h4>Heading</h4>")
	})
	
	test('Level 5 heading', () => {
		const input = "##### Heading"
		expect(interpret(input)).toBe("<h5>Heading</h5>")
	})
	
	test('Level 6 heading', () => {
		const input = "###### Heading"
		expect(interpret(input)).toBe("<h6>Heading</h6>")
	})	
}) 

describe('Text decoration', () => {
	test('Italics', () => {
		const input = "This paragraph will have *italics* ."
		expect(interpret(input)).toBe("<p>This paragraph will have <i>italics</i> .</p>")
	})

	test('Bold', () => {
		const input = "This paragraph will have **bold** ."
		expect(interpret(input)).toBe("<p>This paragraph will have <b>bold</b> .</p>")
	})

	test('Underline', () => {
		const input = "This paragraph will have _underline_ ."
		expect(interpret(input)).toBe("<p>This paragraph will have <u>underline</u> .</p>")
	})

	test('Struckthrough', () => {
		const input = "This paragraph will have __struckthrough__ ."
		expect(interpret(input)).toBe("<p>This paragraph will have <s>struckthrough</s> .</p>")
	})
})

