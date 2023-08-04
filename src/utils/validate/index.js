// 以 1 开头，第二位数是 3/4/5/7/8 的 11 位手机号码
const phone = (value) => {
    const regexp = /^1[3,4,5,7,8,9]\d{9}$/
    return regexp.test(value)
};

// 18 位身份证号，尾数是数字或者字母 X
const idcard = (value) => {
    const regexp = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return regexp.test(value);
};

// 邮箱
const email = (value) => {
    const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regexp.test(value);
};

export default {
    phone,
    idcard,
    email,
};
