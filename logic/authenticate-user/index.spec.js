describe('logic - authenticate user', () => {
    let name, surname, email, password

    beforeEach(done => {
        debugger
        name = 'joaquin'
        surname = 'reyes1212'
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST','https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else done()
        })
    })

    it('should succeed on correct credentials', done => {
        authenticateUser(email, password, (error, response) => {
            expect(error).toBeUndefined()

            expect(response).toBeDefined()

            const { id, token } = response

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')
            expect(id.length).toBeGreaterThan(0)

            expect(token).toBeDefined()
            expect(typeof token).toBe('string')
            expect(token.length).toBeGreaterThan(0)

            done()
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => authenticateUser(1)).toThrowError(TypeError, '1 is not a string')
        expect(() => authenticateUser(true)).toThrowError(TypeError, 'true is not a string')
        expect(() => authenticateUser([])).toThrowError(TypeError, ' is not a string')
        expect(() => authenticateUser({})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(null)).toThrowError(TypeError, 'null is not a string')

        expect(() => authenticateUser('')).toThrowError(ContentError, 'e-mail is empty or blank')
        expect(() => authenticateUser(' \t\r')).toThrowError(ContentError, 'e-mail is empty or blank')

        expect(() => authenticateUser(email, 1)).toThrowError(TypeError, '1 is not a string')
        expect(() => authenticateUser(email, true)).toThrowError(TypeError, 'true is not a string')
        expect(() => authenticateUser(email, [])).toThrowError(TypeError, ' is not a string')
        expect(() => authenticateUser(email, {})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(email, undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(email, null)).toThrowError(TypeError, 'null is not a string')

        expect(() => authenticateUser(email, '')).toThrowError(ContentError, 'password is empty or blank')
        expect(() => authenticateUser(email, ' \t\r')).toThrowError(ContentError, 'password is empty or blank')

        expect(() => authenticateUser(email, password, 1)).toThrowError(TypeError, '1 is not a function')
        expect(() => authenticateUser(email, password, true)).toThrowError(TypeError, 'true is not a function')
        expect(() => authenticateUser(email, password, [])).toThrowError(TypeError, ' is not a function')
        expect(() => authenticateUser(email, password, {})).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => authenticateUser(email, password, undefined)).toThrowError(TypeError, 'undefined is not a function')
        expect(() => authenticateUser(email, password, null)).toThrowError(TypeError, 'null is not a function')
    })

})