export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig()

    try {
        const data = await $fetch(`${apiBase}/auth/register`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json',
            }
        })
      console.log("data" , data);
  
      

        return data.data.user;
    } catch (error) {
        return error
    }
})