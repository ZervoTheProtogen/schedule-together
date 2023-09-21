// TODO: Rewrite to TypeScript

export async function getStatus(url) {
    try {
        const response = await fetch(url);
        const isSuccessful = response.ok;
    
        if (isSuccessful) {
            if (!isNaN(response.status)) {
                return "error"
            } else return response.status
        }
    } catch (error) {
        console.log(error)
    }
}