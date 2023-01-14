/**
 * 让整数自动保留2位小数
 */
// export const returnFloat = value => {
//     let value=Math.round(parseFloat(value)*100)/100;
//     let xsd=value.toString().split(".");
//     if(xsd.length==1){
//         value=value.toString()+".00";
//         return value;
//     }
//     if(xsd.length>1){
//         if(xsd[1].length<2){
//             value=value.toString()+"0";
//         }
//         return value;
//     }
// }
/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
export const formatDate = (date, type) => {
    let year = date.getFullYear(); //年
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //月
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); //时
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); //分
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); //秒
    let milliseconds = date.getMilliseconds() < 10 ? '0' + date.getMilliseconds() : date.getMilliseconds(); //毫秒
    if (type == 1) {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + '.' + milliseconds;
    } else if (type == 2) {
        return year + '' + month + '' + day + '' + hour + '' + minutes + '' + seconds;
    } else if (type == 3) {
        return year + '-' + month + '-' + day;
    } else {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }
};

/*时间戳转换成标准时间*/
export const timeConvert = (timestamp, num) => {
    //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳
    timestamp = timestamp + '';
    timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
    let date = new Date(timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    let h = date.getHours();
    h = h < 10 ? '0' + h : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    if (num == 0) {
        return y + '-' + m + '-' + d;
    } else {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
};

/**
 * 判断空值
 */
export const isEmpty = keys => {
    return [undefined, null, 'undefined', 'null', ''].includes(keys);
};

/**
 * 读取base64
 */
export const readFile = file => {
    //判断是否是图片类型
    if (!/image\/\w+/.test(file.raw.type)) {
        alert('只能选择图片');
        return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        let filedata = {
            filename: file.name,
            filebase64: e.target.result
        };
        alert(e.target.result);
    };
};

/**
 * 动态插入css
 */
export const loadStyle = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};
/**
 * 设置浏览器头部标题
 */
export const setTitle = title => {
    title = title ? `${title}` : 'document';
    window.document.title = title;
};

export const param2Obj = url => {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

//是否为正整数
export const isInteger = s => {
    let re = /^[0-9]+$/;
    return re.test(s);
};

export const setContentHeight = (that, ele, height) => {
    that.$nextTick(() => {
        ele.style.height = document.body.clientHeight - height + 'px';
    });
};

//对象数组的去重
export const uniqueObject = arr => {
    //利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
    let obj = {};
    return arr.reduce(function (item, next) {
        obj[next.key] ? '' : (obj[next.key] = true && item.push(next));
        return item;
    }, []);
};

//json转url参数
export const parseParam = (param, key) => {
    let paramStr = '';
    if (typeof param == 'string' || typeof param == 'number' || typeof param == 'boolean') {
        return '&' + key + '=' + encodeURIComponent(param);
    } else {
        let data = null;
        if (key) {
            data = param ? param[key] : '';
        } else {
            data = param;
        }
        for (let keyTemp in data) {
            let dataTemp = data[keyTemp];
            paramStr += parseParam(dataTemp, keyTemp);
        }
    }
    return paramStr.substr(1);
};

//加
export const floatAdd = (arg1, arg2) => {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
};

//减
export const floatSub = (arg1, arg2) => {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

//乘
export const floatMul = (arg1, arg2) => {
    let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};

//除
export const floatDiv = (arg1, arg2) => {
    let t1 = 0,
        t2 = 0,
        r1,
        r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
};

// 验证重复元素，有重复返回true；否则返回false
export const isRepeat = arr => {
    let hash = {};
    for (let i in arr) {
        if (hash[arr[i]]) {
            return true;
        }
        // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
        hash[arr[i]] = true;
    }
    return false;
};

//根据某个属性值排序
export const compare = prop => {
    return function (a, b) {
        let v1 = a[prop];
        let v2 = b[prop];
        return v1 - v2; //从小到大
        // return v2 - v1; //从大到小
    };
};

//上传文件后缀校验
export const checkUploadFileNameExtWarn = fileName => {
    let testmsg = fileName.substring(fileName.lastIndexOf('.') + 1);
    const extension = testmsg === 'jpg';
    const extension2 = testmsg === 'png';
    const extension3 = testmsg === 'bmp';
    const extension4 = testmsg === 'jpeg';
    const extension5 = testmsg === 'JPG';
    const extension6 = testmsg === 'PNG';
    const extension7 = testmsg === 'BMP';
    const extension8 = testmsg === 'JPEG';
    if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8) {
        return true;
    } else {
        return false;
    }
};

export const convertBase64UrlToBlob = urlData => {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

// 压缩图片
export const compressImage = path => {
    //最大高度
    const maxHeight = 1000;
    //最大宽度
    const maxWidth = 1000;

    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = path;
        img.onload = function () {
            const originHeight = img.height;
            const originWidth = img.width;
            let compressedWidth = img.height;
            let compressedHeight = img.width;
            if (originWidth > maxWidth && originHeight > maxHeight) {
                // 更宽更高，
                if (originHeight / originWidth > maxHeight / maxWidth) {
                    // 更加严重的高窄型，确定最大高，压缩宽度
                    compressedHeight = maxHeight;
                    compressedWidth = maxHeight * (originWidth / originHeight);
                } else {
                    //更加严重的矮宽型, 确定最大宽，压缩高度
                    compressedWidth = maxWidth;
                    compressedHeight = maxWidth * (originHeight / originWidth);
                }
            } else if (originWidth > maxWidth && originHeight <= maxHeight) {
                // 更宽，但比较矮，以maxWidth作为基准
                compressedWidth = maxWidth;
                compressedHeight = maxWidth * (originHeight / originWidth);
            } else if (originWidth <= maxWidth && originHeight > maxHeight) {
                // 比较窄，但很高，取maxHight为基准
                compressedHeight = maxHeight;
                compressedWidth = maxHeight * (originWidth / originHeight);
            } else {
                // 符合宽高限制，不做压缩
            }
            // 生成canvas
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.height = compressedHeight;
            canvas.width = compressedWidth;
            context.clearRect(0, 0, compressedWidth, compressedHeight);
            context.drawImage(img, 0, 0, compressedWidth, compressedHeight);
            let base64 = canvas.toDataURL('image/*');
            let blob = convertBase64UrlToBlob(base64);
            // 回调函数返回blob的值。也可根据自己的需求返回base64的值
            resolve(blob);
        };
    });
};
