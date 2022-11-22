class Xhr{
    constructor(path){
        return new Promise((resolve, reject) => {
            try{
                this.xhr = new XMLHttpRequest();
                this.xhr.onreadystatechange = function(){if(this.readyState === 4 && this.status === 200){resolve(this.response);}}
                this.xhr.open("GET", path, true);
                this.xhr.send();
            }catch(error){
                reject(error);
            }
        });
    }
}

class DotEnv{
    constructor(path){
        return new Xhr(path).then(response => {
            let split = response.split(/\r?\n/);
            let env = new Array();
            split.forEach(row => {
                let str = row.split(/=/);
                if(str[0]){
                    env[str[0].trim()] = str[1].trim();
                }
            });
            return env;
        });
    }
}