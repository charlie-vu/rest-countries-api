const helper = {
    displayNumber: (num) => {
        if (num) {
            return num.toLocaleString('en-US')
        } else {
            return "--"
        }
    },
}

export default helper;