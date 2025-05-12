async function registrar(event) {
    event.preventDefault();

    const nome = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const dados = {
        nome: nome,
        email: email,
        senha: senha,
        nivel: "Iniciante"
    };

    try{
        const resposta = await fetch('http://localhost:5088/registrar',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if(resposta.ok){
            alert('Registro completo!');

        }else{
            const erro = await resposta.text();
            alert('Erro ao registrar!' + erro);
        }
    }
     catch (erro){
        console.error('Erro de requisição:', erro);
        alert('Erro ao conectar com o servidor.')
    }
}