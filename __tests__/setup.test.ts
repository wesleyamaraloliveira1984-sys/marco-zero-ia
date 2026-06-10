describe('Project Setup', () => {
  it('should have Next.js configured', () => {
    expect(process.env.NODE_ENV).toBeDefined()
  })

  it('should be able to import TypeScript', () => {
    const testValue: string = 'hello'
    expect(testValue).toBe('hello')
  })
})
