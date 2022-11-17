export class calendar extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.template = document.importNode(this.templateComponent, true);
    }

    connectedCallback(){
        let root = this.shadowRoot;
        root.appendChild(this.template);

        let calendarHeader = root.querySelector(".calendarHeader");
        let monthDaysContainer = root.querySelector(".monthDaysContainer");
        
        let showedDate   = calendarHeader.children['showedDate'];
        let datePicker   = calendarHeader.children["datePicker"];
        let btnLastMonth = calendarHeader.children["btnLastMonth"];
        let btnNextMonth = calendarHeader.children["btnNextMonth"];

        let currentDate = new Date(Date.now());
        const getDayName = {
            es:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
            en:["sunday","monday","tuesday","webnesday","thursday","friday","saturday"],
            pt:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","Sexta-feira","sábado"]
        }

        showedDate.addEventListener('click', function(){datePicker.showPicker()});
        datePicker.addEventListener('change', node => printCalendar(new Date(node.target.value + "T00:00:00")));

        btnLastMonth.addEventListener("click", function(event){
            // let date = datePicker.value.split(/-/);
            // printCalendar(new Date(date[0], date[1]-2, date[2]));
            console.log(new Date(new Date(datePicker.value).setMonth(new Date(datePicker.value).getMonth()-1)));
            goToLastMonth(new Date(datePicker.value + "T00:00:00"))
        });
        btnNextMonth.addEventListener("click", function(event){
            let date = datePicker.value.split(/-/);
            printCalendar(new Date(date[0], date[1], date[2]));
        });

        monthDaysContainer.addEventListener("click", function(event){
            selectedDay(event.target);
        });

        function fillMonthDays(dayNode){
            monthDays.appendChild(dayNode)
        }

        function printCalendar(date){
            // console.log(date.getUTCDay())
            showDate(date);
            showDays(date);
        }

        function showDate(date){
            const opciones = {weekday:'long',year:'numeric',month:'long',day:'numeric'};
            showedDate.textContent = date.toLocaleDateString(window.navigator.language, opciones); 
            datePicker.value = date.toISOString().substr(0, 10);
        }

        function showDays(date){
            let año = date.getFullYear()
            let mes = date.getMonth() + 1  ;
            let dia = new Date(año, mes, 0).getDate();
            let monthDays = new DocumentFragment();

            getDayName[window.navigator.language.substring(0,2)].forEach(day => {
                let li = document.createElement("li");
                li.setAttribute("draggable", true)
                li.appendChild(document.createTextNode(day));
                monthDays.appendChild(li);
            });
    
            for(let num = 0; num < dia; num++){
                let li = document.createElement("li");
                if(num === 0){li.classList.add("firstDay");}
                if(new Date(año, date.getMonth(), num + 1).toISOString().slice(0, 10) === new Date(Date.now()).toISOString().slice(0, 10)){
                    li.classList.add("currentDate");
                }
                li.setAttribute("data-date", new Date(año, mes -1, num +1));
                li.appendChild(document.createTextNode(num + 1));
                monthDays.appendChild(li);
            }

            monthDaysContainer.replaceChildren(monthDays);
            
            firstDay(date.getUTCDay());
        }

        function firstDay(day){
            root.querySelector(".firstDay").style.gridColumnStart = day + 1;
        }

        function lastMonthDay(date){
            while(day){
                day--
            }
            return
        }

        function startWeekDay(){}

        let previousDay;
        function selectedDay(newSelectedDay){
            if(previousDay){previousDay.classList.toggle("selectedDay");}
            newSelectedDay.classList.toggle("selectedDay");
            showDate(new Date(newSelectedDay.dataset.date));
            previousDay = newSelectedDay;
        }

        printCalendar(currentDate);
    }

    attributeChangedCallback(attr, oldVal, newVal){}

    get templateComponent(){
        let DOMtemplate = new DOMParser().parseFromString(new Xhr("components/calendar.html").response,"text/html");
        return DOMtemplate.getElementById("calendar-template").content;
    }
}