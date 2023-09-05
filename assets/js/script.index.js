function verificarInputs() {
    let nome = document.getElementById("input-nome").value;
    let tell = document.getElementById("input-tell").value;
    let cell = document.getElementById("input-cell").value;
    let linkfoto = document.getElementById("input-linkfoto").value;
    let date = document.getElementById("input-date").value;
    let email = document.getElementById("input-email").value;
    let cep = document.getElementById("input-cep").value;
    let cidade = document.getElementById("input-cidade").value;
    let insta = document.getElementById("input-insta").value;
    let git = document.getElementById("input-git").value;


    if (nome == "" || tell == "" || cell == "" || linkfoto == "" || date == "" || email == "" || cep == "" || cidade == "" || insta == "" || git == "") {
        console.log("os campos estão vazios!");
        envieMsg("Preencha todos os campos!", "erro");
        return true
    } else {
        console.log("os campos não estão em brancos!");
        return false
    }

}
function envieMsg(msg, tipo) {
    let msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    let msgnaTela = `
    <p class='${tipo}'>${msg}<p>
    `
    msgDiv.innerHTML += msgnaTela;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);
}

class Agenda {
    constructor(nome, tell, cell, linkfoto, date, email, cep, cidade, insta, git) {
        this.nome = nome;
        this.tell = tell;
        this.cell = cell;
        this.linkfoto = linkfoto;
        this.date = date;
        this.email = email;
        this.cep = cep;
        this.cidade = cidade;
        this.insta = insta;
        this.git = git;
        this.idade = this.getAge();
        this.signo = this.getZodiacSign();
    }
    getAge() {
        let today = new Date();
        let birthdate = new Date(this.date);
        let age = today.getFullYear() - birthdate.getFullYear();
        let month = today.getMonth() - birthdate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        return age;

    }
    getZodiacSign() {
        let date = new Date(this.date);
        let day = date.getDate();
        let month = date.getMonth() + 1;

        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }

}

const agendaTeste = new Agenda("Raissa", "337453213", "19 99154-8261", "link", "26/07/2005", "raissa.godoy@gmail.com", "14044-000", "Campinas", "rraissa.s2", "raissas2")
console.log(agendaTeste);

function comporAgenda() {
    let nome = document.getElementById("input-nome").value;
    let tell = document.getElementById("input-tell").value;
    let cell = document.getElementById("input-cell").value;
    let linkfoto = document.getElementById("input-linkfoto").value;
    let date = document.getElementById("input-date").value;
    let email = document.getElementById("input-email").value;
    let cep = document.getElementById("input-cep").value;
    let cidade = document.getElementById("input-cidade").value;
    let insta = document.getElementById("input-insta").value;
    let git = document.getElementById("input-git").value;

    const agenda = new Agenda(nome, tell, cell, linkfoto, date, email, cep, cidade, insta, git);
    console.log(agenda);
    bibliotecaagenda.add(agenda);
}

class ListaAgenda {
    constructor() {
        this.listaagenda = [];
    }

    add(parametro) {
        if (verificarInputs()) {
            envieMsg("Preencha todos os campos!", "erro");
        }else if(!isURLValida(parametro.linkfoto)){
            envieMsg("URL Iválida!", "erro")
        }else {
            this.listaagenda.push(parametro);
            limparInputs()
            envieMsg("cadastrado com sucesso!", "sucesso")
            console.log(this.listaagenda);
            this.renderizarconteudo();
        }

    }
    renderizarconteudo() {


        const listaHTML = document.getElementById("conteiner-lista");
        listaHTML.innerHTML = "";
        let array = bibliotecaagenda.listaagenda;
        array.forEach(agenda => {
            const agendaDiv = `
               <div class='agendatelefonica'>
               <h1 ${agenda.nome}</h1>
               <p>Telefone:${(agenda.tell)}</p>
               <p>Celular${(agenda.cell)}</p>
               <img src="${isURLValida(agenda.linkfoto)}" alt="${agenda.nome}"/>
               <p>Data de Nascimento: ${dateinPTBR(agenda.date)}</p>
               <p>Idade: ${agenda.idade}</p>
               <p>Signo: ${agenda.signo}</p>
               <p>E-mail: ${agenda.email}</p>
               <p>CEP: ${agenda.cep}</p>
               <p>Cidade: ${agenda.cidade}</p>
               <p>Instagram: ${agenda.insta}</p
               <p>Github: ${agenda.git}</p
        
           </div>
           `;

            listaHTML.innerHTML += agendaDiv;
            document.getElementById("conteiner-lista").innerHTML = agendaDiv;
        });

        comporAgenda()
    }
}
const bibliotecaagenda = new ListaAgenda()
console.log(bibliotecaagenda);

function isURLValida(url) {
    if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
        return true;
    } else {
        return false;
    }
}

function dateinPTBR(date) {
    console.log("Passou pela funcao dateinPTBR()");

    let dateArray = date.split("-");
    let datePTBR = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    return datePTBR;
}
function limparInputs() {
    let nome = document.getElementById("input-nome").value = "";
    let tell = document.getElementById("input-tell").value = "";
    let cell = document.getElementById("input-cell").value = "";
    let linkfoto = document.getElementById("input-linkfoto").value = "";
    let date = document.getElementById("input-date").value = "";
    let email = document.getElementById("input-email").value = "";
    let cep = document.getElementById("input-cep").value = "";
    let cidade = document.getElementById("input-cidade").value = "";
    let insta = document.getElementById("input-insta").value = "";
    let git = document.getElementById("input-git").value = "";
}