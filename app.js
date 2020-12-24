class PromiseByPHD {
    constructor(callBackFunction){
        console.log('hello')
        callBackFunction(this.resolve,this.reject);
    }

    resolve = data =>{
        this.data = data ;
    }

    reject = error => {
        this.error = error ;
    }

    then(callback){
        this.subPromise = new PromiseByPHD((resolve,reject) => {
            resolve(undefined);
        });

        const loopOutner = setInterval(() => {

            if(this.data){

                clearInterval(loopOutner);

                const returnedResult = callback(this.data);

                if(returnedResult === undefined || returnedResult.__proto__ !== this.__proto__){
                    this.subPromise.data = returnedResult;
                }
                else{
                    const loopInner = setInterval(() => {
                        if(returnedResult.data){
                            clearInterval(loopInner);
                            this.subPromise.data = returnedResult.data ;
                            
                        }
                    },1)
                }
                
                
            }

        },1);
        return this.subPromise;
    }

    catch(callback){
        this.subPromise = new PromiseByPHD((resolve,reject) => {
            reject(undefined);
        });

        const loopOutner = setInterval(() => {

            if(this.error){

                clearInterval(loopOutner);

                const returnedResult = callback(this.error);

                if(returnedResult === undefined || returnedResult.__proto__ !== this.__proto__){
                    this.subPromise.error = returnedResult;
                }
                else{
                    const loopInner = setInterval(() => {
                        if(returnedResult.error){
                            clearInterval(loopInner);
                            this.subPromise.error = returnedResult.error ;
                        }
                    },100)
                }
                
                
            }

        },1);
        return this.subPromise;
    }



};


const promise = new PromiseByPHD((resolve,reject) => {
    setTimeout(() => {
        resolve('i am phd');
    },2000)
});

promise.then(data => {
    console.log(data );
    // return undefined;
    // return undefined;
    return new PromiseByPHD((resolve,reject) => {
        setTimeout(() => {
            resolve('hello');
        },4000)
    })
}).then(data => {
    console.log(data);
    return 'hiiiiiiii phd';
}).then(data =>{
    console.log(data);
    return new PromiseByPHD((resolve,reject) => {
      
            reject('event if ....');
       
    }).then(data => "sdfsdfsdfdsf")
}).catch(data => console.log(data)).then(data => console.log(data));

const promise1 = new PromiseByPHD((resolve,reject) => {
    setTimeout(() => {
        resolve('i am phd promise 1 ');
    },2000)
});

promise1.then(data => {
    console.log(data );
    // return undefined;
    // return undefined;
    return new PromiseByPHD((resolve,reject) => {
        setTimeout(() => {
            resolve('hello promise 1 ');
        },4000)
    })
}).then(data => {
    console.log(data);
    return 'hiiiiiiii promise 1 ';
}).then(data =>{
    console.log(data);
    return new PromiseByPHD((resolve,reject) => {
      
            reject('event if ....');
       
    }).then(data => "sdfsdfsdfdsf")
}).catch(data => console.log(data)).then(data => console.log(data));

const promise2 = new PromiseByPHD((resolve,reject) => {
    setTimeout(() => {
        resolve('i am phd 222222');
    },2000)
});

promise2.then(data => {
    console.log(data );
    // return undefined;
    // return undefined;
    return new PromiseByPHD((resolve,reject) => {
        setTimeout(() => {
            resolve('hello 222222');
        },4000)
    })
}).then(data => {
    console.log(data);
    return 'hiiiiiiii 222222';
}).then(data =>{
    console.log(data);
    return new PromiseByPHD((resolve,reject) => {
      
            reject('event if ....2222222');
       
    }).then(data => "sdfsdfsdfdsf 22222")
}).catch(data => console.log(data)).then(data => console.log(data));

console.log(promise,promise1,promise2);