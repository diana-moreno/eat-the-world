describe('logic - retrieve favs', () => {
    let name, surname, email, password, id, token, restaurantIds = ['16771079', '16765796', '16783355']

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

    it('should succeed on correct user data and return not restaurants on no favs', done => {
        retrieveFavs(id, token, (error, restaurants) => {
            expect(error).toBeUndefined()

            expect(restaurants).toBeDefined()
            expect(restaurants.length).toBe(0)

            done()
        })
    })

    describe('when favs already exists', () => {
        beforeEach(done => {
            call('PUT', `https://skylabcoders.herokuapp.com/api/user/${id}`, token ,{ favs: restaurantIds }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user data', done => {
            retrieveFavs(id, token, (error, restaurants) => {
                expect(error).toBeUndefined()

                expect(restaurants).toBeDefined()
                expect(restaurants.length).toBe(restaurantIds.length)

                restaurants.forEach(restaurant => {
                    expect(restaurant).toBeDefined()
                    expect(typeof restaurant.id).toBe('string')
                    expect(restaurant.id.length).toBeGreaterThan(0)

                    expect(restaurant.average_cost_for_two).toBeDefined()
                    expect(typeof restaurant.average_cost_for_two).toBe('number')
    
                    expect(restaurant.currency).toBeDefined()
                    expect(typeof restaurant.currency).toBe('string')
                    expect(restaurant.currency.length).toBeGreaterThan(0)
    
                    expect(restaurant.cuisines).toBeDefined()
                    expect(typeof restaurant.cuisines).toBe('string')
                    expect(restaurant.cuisines.length).toBeGreaterThan(0)
    
                    expect(restaurant.highlights).toBeDefined()
                    expect(restaurant.highlights).toBeInstanceOf(Array);
    
                    expect(restaurant.location).toBeDefined()
                    expect(restaurant.location).toBeInstanceOf(Object);
    
                    expect(restaurant.name).toBeDefined()
                    expect(typeof restaurant.name).toBe('string')
                    expect(restaurant.name.length).toBeGreaterThan(0)
    
                    expect(restaurant.url).toBeDefined()
                    expect(typeof restaurant.url).toBe('string')
                    expect(restaurant.url.length).toBeGreaterThan(0)
    
                    expect(restaurant.featured_image).toBeDefined()
                    expect(typeof restaurant.featured_image).toBe('string')
                    expect(restaurant.featured_image.length).toBeGreaterThan(0)
    
                    expect(restaurant.timings).toBeDefined()
                    expect(typeof restaurant.timings).toBe('string')
                    expect(restaurant.timings.length).toBeGreaterThan(0)
    
                    expect(restaurant.user_rating).toBeDefined()
                    expect(restaurant.user_rating).toBeInstanceOf(Object);
    
                    expect(restaurant.phone_numbers).toBeDefined()
                    expect(typeof restaurant.phone_numbers).toBe('string')
                    expect(restaurant.phone_numbers.length).toBeGreaterThan(0)
    
                    expect(restaurant.establishment).toBeDefined()
                    expect( restaurant.establishment).toBeInstanceOf(Array)

                    const isFav = restaurantIds.includes(restaurant.id)
                    expect(isFav).toBeTruthy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect id, token and expression types', () => {       
        
        expect(() => { retrieveFavs('') }).toThrowError(ContentError, 'id is empty or blank')
        expect(() => { retrieveFavs(1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveFavs(true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveFavs([]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveFavs({}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveFavs(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveFavs(null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveFavs('id','') }).toThrowError(ContentError, 'token is empty or blank')
        expect(() => { retrieveFavs('id',1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveFavs('id',true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveFavs('id',[]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveFavs('id',{}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveFavs('id',undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveFavs('id',null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveFavs('id','token', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveFavs('id','token', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveFavs('id','token', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveFavs('id','token', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveFavs('id','token', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveFavs('id','token', null) }).toThrowError(TypeError, 'null is not a function')
    })

})