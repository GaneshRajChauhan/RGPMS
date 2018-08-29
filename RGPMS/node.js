var checkAuthTimeout = (expirationTime) => {
        setTimeout(() => {
            console.log("hi me execute");
        }, expirationTime * 1000);
};
checkAuthTimeout(5);
console.log("Me Ganesh");