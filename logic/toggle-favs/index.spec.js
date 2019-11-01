describe('logic - toggle favs restaurants', () => {
    let name, surname, email, password, id, token, restaurantId = '16771079'

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

    it('should succeed on correct user and restaurant data', done => {
        toggleFavs(id, token, restaurantId, (error, response) => {
            expect(error).toBeUndefined()
            expect(response).toBeDefined()

            call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`,token, undefined, result => {
                if (result.error) return done(new Error(result.error))

                const { data: { favs } } = result

                expect(favs).toBeDefined()
                expect(favs.length).toBe(1)
                expect(favs[0]).toBe(restaurantId)

                done()
            })
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT',  `https://skylabcoders.herokuapp.com/api/user/${id}`, token, { favs: [restaurantId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user and restaurant data', done => {
            toggleFavs(id, token, restaurantId, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                call('GET',  `https://skylabcoders.herokuapp.com/api/user/${id}`, token, undefined, result => {
                    if (result.error) return done(new Error(result.error))

                    const { data: { favs } } = result

                    expect(favs).toBeDefined()
                    expect(favs.length).toBe(0)

                    done()
                })
            })
        })
    })

    it('should fail on incorrect id, token, id and expression types', () => {       
        
        expect(() => { toggleFavs('') }).toThrowError(ContentError, 'id is empty or blank')
        expect(() => { toggleFavs(1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { toggleFavs(true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { toggleFavs([]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { toggleFavs({}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { toggleFavs(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { toggleFavs(null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { toggleFavs('id','') }).toThrowError(ContentError, 'token is empty or blank')
        expect(() => { toggleFavs('id',1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { toggleFavs('id',true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { toggleFavs('id',[]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { toggleFavs('id',{}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { toggleFavs('id',undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { toggleFavs('id',null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { toggleFavs('id','token','') }).toThrowError(ContentError, 'restaurantId id is empty or blank')
        expect(() => { toggleFavs('id','token',1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { toggleFavs('id','token',true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { toggleFavs('id','token',[]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { toggleFavs('id','token',{}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { toggleFavs('id','token',undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { toggleFavs('id','token',null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { toggleFavs('id','token','id', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { toggleFavs('id','token','id', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { toggleFavs('id','token','id', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { toggleFavs('id','token','id', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { toggleFavs('id','token','id', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { toggleFavs('id','token','id', null) }).toThrowError(TypeError, 'null is not a function')
    })
})