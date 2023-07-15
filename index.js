const promise = new Promise((resolve, reject) => {
    console.log(0);
    resolve(1);
});

promise
    .then((val) => {
        console.log(val);
        return Promise.resolve(3);
    })
    .then((val) => {
        console.log(val);
        return Promise.reject(6);
    })
    .then(null, (val) => {
        console.log(val);
        return Promise.reject(8);
    })
    .then(null, (val) => {
        console.log(val);
    });

const promise2 = new Promise((resolve, reject) => {
    console.log(0);
    reject(2);
});

promise2
    .then(null, (val) => {
        console.log(val);
        return Promise.resolve(3);
    })
    .then((val) => {
        console.log(val);
        return Promise.reject(6);
    })
    .then(null, (val) => {
        console.log(val);
        return Promise.resolve(7);
    })
    .then((val) => {
        console.log(val);
    });

const promise3 = new Promise((resolve, reject) => {
    console.log(0);
    resolve();
});

promise3
    .then(() => {
        console.log(1);
        return Promise.resolve();
    })
    .then(() => {
        console.log(3);
        return Promise.reject();
    })
    .then(null, () => {
        console.log(5);
        return Promise.reject();
    })
    .then(null, () => {
        console.log(8);
    });

const promise4 = new Promise((resolve, reject) => {
    console.log(0);
    reject();
});

promise4
    .then(null, () => {
        console.log(2);
        return Promise.resolve();
    })
    .then(() => {
        console.log(3);
        return Promise.reject();
    })
    .then(null, () => {
        console.log(6);
        return Promise.resolve();
    })
    .then(() => {
        console.log(7);
    });
