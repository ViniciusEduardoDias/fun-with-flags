const ApiClient = (baseUrl) => ({
    async get(endpoint){
        try{
            const response = await fetch(`${baseUrl}/${endpoint}`);
            if(!response){
                return [null, `HTTP: error! Status: ${response.status}`]
            }
            const data = await response.json()
            return [data, null]
        }catch (error) {
            console.log("API request failed: ", error)
            return [null, error.message]
        }
    }
})

const api = ApiClient("https://restcountries.com/v3.1")

const apiCountries = {
    getAll: () => api.get("all")
}

export { apiCountries }