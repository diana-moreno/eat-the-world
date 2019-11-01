describe('logic - search restaurants', () => {
    let name, surname, email, password, id, token, restaurantId = '16771079'

    beforeEach(done => {
        name = 'Michael'
        surname = 'Jackson'
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`


        call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', 'https://skylabcoders.herokuapp.com/api/auth',undefined, { username: email, password }, result => {
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

    it('should succeed on correct criteria (city and query)', done => {
        const city = 'new york'
        const query = 'pizza'
    

        searchRestaurants(city, query, id, token, (error, restaurants) => {
            expect(error).toBeUndefined()

            expect(restaurants).toBeDefined()
            expect(restaurants.length).toBeGreaterThan(0)

            restaurants.forEach(function (restaurant) {
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
                expect(restaurant.user_rating).toBeInstanceOf(Object)

                expect(restaurant.phone_numbers).toBeDefined()
                expect(typeof restaurant.phone_numbers).toBe('string')
                expect(restaurant.phone_numbers.length).toBeGreaterThan(0)

                expect(restaurant.establishment).toBeDefined()
                expect(restaurant.establishment).toBeInstanceOf(Array)
                // debugger
                // restaurantId = restaurant.id

            })

            done()
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => { 
            call('PUT',  `https://skylabcoders.herokuapp.com/api/user/${id}`, token, { favs: [restaurantId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct criteria (query)', done => {
            const city = 'new york'
            const query = 'pizza'

            searchRestaurants(city, query, id, token, (error, restaurants) => {
                expect(error).toBeUndefined()

                expect(restaurants).toBeDefined()
                expect(restaurants.length).toBeGreaterThan(0)
                 
                const hasFav = restaurants.some(restaurant => restaurant.isFav)

                expect(hasFav).toBeTruthy()

                restaurants.forEach(function (restaurant) {
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

                    restaurant.id === restaurantId ? expect(restaurant.isFav).toBeTruthy() : expect(restaurant.isFav).toBeFalsy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect criteria query', done => {
        const city = 'new york'
        const query = 'pasdasdasdzza'

        searchRestaurants(city, query, id, token, (error, restaurants) => {
            expect(restaurants).toBeInstanceOf(Array)

            done()
        })
    })

    it('should fail on incorrect query or expression types', () => {       
        
        expect(() => { searchRestaurants(1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { searchRestaurants(true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { searchRestaurants([]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { searchRestaurants({}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { searchRestaurants(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { searchRestaurants(null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { searchRestaurants('New york',1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { searchRestaurants('New york',true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { searchRestaurants('New york',[]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { searchRestaurants('New york',{}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { searchRestaurants('New york',undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { searchRestaurants('New york',null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { searchRestaurants('New york','pizza','id','token', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { searchRestaurants('New york','pizza','id','token', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { searchRestaurants('New york','pizza','id','token', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { searchRestaurants('New york','pizza','id','token', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { searchRestaurants('New york','pizza','id','token', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { searchRestaurants('New york','pizza','id','token', null) }).toThrowError(TypeError, 'null is not a function')
    })
})