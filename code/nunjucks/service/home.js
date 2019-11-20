module.exports = {
    register: async(name, pwd) => {
        let data;
        if(name === 'libo' && pwd === '123456') {
            data = `Hello ${name}`;
        }else {
            data ='Please check your infomation';
        }
        return data;
    }
}