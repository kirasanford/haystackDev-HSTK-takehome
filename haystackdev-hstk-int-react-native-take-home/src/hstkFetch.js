function sleepAsync() {
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        }, 1000)
    })
}

export default async function hstkFetch(resource, init) {
    await sleepAsync();
    return await fetch(resource, init);
}