const promise = new Promise((resolve, reject) => {
    console.log(0);
    const flag = true;
    if (!flag){
        reject(flag);
    }
   resolve(flag)
});

promise
    .then(
        (flag) => {
            console.log(1);
            return Promise.resolve(flag)

        },
        (flag) => {
            console.log(2);
            return Promise.resolve(flag)
        }
    )
    .then(
        (flag) => {
            console.log(3);
            return Promise.reject(flag)
        },
        () => {
            console.log(4);
        }
    )
    .then(
        () => {
            console.log(5);
        },
        (flag) => {
            console.log(6);
            if (flag) {
                return Promise.reject(flag)
            }
            return Promise.resolve(flag)
        }
    )
    .then(
        () => {
            console.log(7);
        },
        () => {
            console.log(8);
        }
    );
