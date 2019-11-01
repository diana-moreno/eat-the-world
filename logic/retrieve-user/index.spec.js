describe('logic - retrieve user', () => {
    let name, surname, email, password, id, token

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', 'https://skylabcoders.herokuapp.com/api/auth', undefined, { username: email, password }, result => {
                    if (result.error) done(new Error(result.error))
                    else {
                        const { data } = result

                        id = data.id
                        token = data.token

                        done()
                    }
                })
            }
        })
    })

    it('should succeed on correct user data', done => {
        retrieveUser(id, token, (error, data) => {
            expect(error).toBeUndefined()

            expect(data).toBeDefined()
            expect(data.name).toBe(name)
            expect(data.surname).toBe(surname)
            expect(data.username).toBe(email)
            expect(data.password).toBeUndefined()

            done()
        })
    })

    it('should fail on incorrect id, token and expression types', () => {       
        
        expect(() => { retrieveUser('') }).toThrowError(ContentError, 'id is empty or blank')
        expect(() => { retrieveUser(1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveUser(true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveUser([]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveUser({}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveUser(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveUser(null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveUser('id','') }).toThrowError(ContentError, 'token is empty or blank')
        expect(() => { retrieveUser('id',1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveUser('id',true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveUser('id',[]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveUser('id',{}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveUser('id',undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveUser('id',null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveUser('id','token', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveUser('id','token', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveUser('id','token', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveUser('id','token', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveUser('id','token', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveUser('id','token', null) }).toThrowError(TypeError, 'null is not a function')
    })

})