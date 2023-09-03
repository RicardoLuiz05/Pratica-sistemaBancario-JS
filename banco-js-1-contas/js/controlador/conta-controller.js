class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoAniversario = document.querySelector('#dataAniversario');
        const elementoTipo = document.querySelector('#contas');
        
        if (elementoTipo.value == 'conta') {
            const conta = new Conta(elementoNumero.value,
                Number(elementoSaldo.value));
            this.repositorioContas.adicionar(conta);
            this.inserirContaNoHTML(conta);

        }else if (elementoTipo.value == 'conta-bonificada'){
            const conta = new ContaBonificada(elementoNumero.value,
                Number(elementoSaldo.value));
            this.repositorioContas.adicionar(conta);
            this.inserirContaNoHTML(conta);

        }else {
            const conta = new Polpanca(elementoNumero.value,
                Number(elementoSaldo.value), elementoAniversario.value);
            this.repositorioContas.adicionar(conta);
            this.inserirPolpancaNoHTML(conta);
        }
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }

    inserirPolpancaNoHTML(Polpanca) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + Polpanca.numero + ': ' + Polpanca.saldo + '; Data que foi criada: ' + Polpanca.dataAniversario;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(Polpanca.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
