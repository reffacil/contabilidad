class Xhr{
    constructor(path){
        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", path, true);
        this.xhr.send();
    }
    // Return the main content HTML response
    get response(){return this.xhr.response;}
}

class DotEnv{
    constructor(path){
        const env = new Xhr(path).response;
        let element = env.split(/\r?\n/);
        let arrayVar = new Array();
        element.forEach(row => {
            let str = row.split(/=/);
            if(str[0]){
                arrayVar[str[0].trim()] = str[1].trim();
            }
        });
        return arrayVar;
    }
}