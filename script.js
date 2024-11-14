// Chave da API para acessar o serviço de taxas de câmbio
const apiKey = "4ab9f085d4863a80f1d780c0";

// Definindo as moedas disponíveis para conversão
const currencies = [
    { code: 'USD', name: 'Dólar Americano' },
    { code: 'EUR', name: 'Euro' },
    { code: 'BRL', name: 'Real Brasileiro' },
    { code: 'GBP', name: 'Libra Esterlina' },
    { code: 'JPY', name: 'Iene Japonês' },
    { code: 'CAD', name: 'Dólar Canadense' },
    { code: 'AUD', name: 'Dólar Australiano' },
    { code: 'CHF', name: 'Franco Suíço' },
    { code: 'CNY', name: 'Yuan Chinês' },
    { code: 'INR', name: 'Rupia Indiana' },
    { code: 'ARS', name: 'Peso Argentino' },
    { code: 'CLP', name: 'Peso Chileno' },
    { code: 'MXN', name: 'Peso Mexicano' },
    { code: 'ZAR', name: 'Rand Sul-Africano' },
    { code: 'KRW', name: 'Won Sul-Coreano' },
    { code: 'RUB', name: 'Rublo Russo' },
    { code: 'TRY', name: 'Lira Turca' },
    { code: 'SAR', name: 'Riyal Saudita' },
    { code: 'SGD', name: 'Dólar de Singapura' },
    { code: 'HKD', name: 'Dólar de Hong Kong' },
    { code: 'NZD', name: 'Dólar Neozelandês' },
    { code: 'AED', name: 'Dirham dos Emirados Árabes' },
    { code: 'SEK', name: 'Coroa Sueca' },
    { code: 'NOK', name: 'Coroa Norueguesa' },
    { code: 'DKK', name: 'Coroa Dinamarquesa' },
    { code: 'PLN', name: 'Zloti Polonês' },
    { code: 'CZK', name: 'Coroa Tcheca' },
    { code: 'HUF', name: 'Forint Húngaro' },
    { code: 'THB', name: 'Baht Tailandês' },
    { code: 'IDR', name: 'Rupia Indonésia' },
    { code: 'PHP', name: 'Peso Filipino' },
    { code: 'MYR', name: 'Ringgit Malaio' },
    { code: 'PKR', name: 'Rupia Paquistanesa' },
    { code: 'EGP', name: 'Libra Egípcia' },
    { code: 'ILS', name: 'Novo Shekel Israelense' },
    { code: 'VND', name: 'Dong Vietnamita' },
    { code: 'BDT', name: 'Taka de Bangladesh' },
    { code: 'LKR', name: 'Rupia do Sri Lanka' },
    { code: 'MAD', name: 'Dirham Marroquino' },
    { code: 'UAH', name: 'Hryvnia Ucraniano' },
    { code: 'NGN', name: 'Naira Nigeriano' },
];

// Função para preencher os seletores de moeda
function populateSelectors() {
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");

    // Popula os seletores de moeda com as opções definidas
    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency.code;
        optionFrom.textContent = `${currency.code} - ${currency.name}`;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency.code;
        optionTo.textContent = `${currency.code} - ${currency.name}`;
        toCurrencySelect.appendChild(optionTo);
    });
}

// Função assíncrona para realizar a conversão de moedas
async function convertCurrency() {
    let amount = document.getElementById("amount").value;

    // Remover caracteres não numéricos e substitui a vírgula por ponto para formatação
    amount = parseFloat(amount.replace(/[^\d.,-]/g, '').replace(',', '.'));

    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    // Verifica se o valor inserido é válido
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").textContent = "Por favor, insira um valor válido.";
        return;
    }

    // URL para a API de conversão de moedas
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        // Chamada à API de taxas de câmbio
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifica se a resposta da API contém a taxa de câmbio necessária
        if (data && data.conversion_rates && data.conversion_rates[toCurrency]) {
            const rate = data.conversion_rates[toCurrency];
            const result = amount * rate; // Calcula o valor convertido
            const formattedResult = formatNumber(result, toCurrency); // Formata o resultado

            // Exibe o resultado formatado
            document.getElementById("result").textContent = `${formatNumber(amount, fromCurrency)} ${fromCurrency} = ${formattedResult} ${toCurrency}`;
        } else {
            // Caso a conversão não esteja disponível
            document.getElementById("result").textContent = "Conversão não disponível.";
        }
    } catch (error) {
        // Em caso de erro na API
        console.error(error); 
        document.getElementById("result").textContent = "Erro ao obter taxas de câmbio. Tente novamente.";
    }
}

// Função para formatar números de acordo com o padrão monetário
function formatNumber(number, currency) {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: currency });
}

// Função para configurar os eventos de conversão em tempo real
function setupRealTimeConversion() {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");

    // Adiciona eventos de escuta para disparar a conversão
    amountInput.addEventListener("input", convertCurrency);
    fromCurrencySelect.addEventListener("change", convertCurrency);
    toCurrencySelect.addEventListener("change", convertCurrency);
}

// Função para configurar os elementos assim que o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", () => {
    populateSelectors(); // Preenche os seletores com as moedas disponíveis
    setupRealTimeConversion(); // Configura a conversão em tempo real
});

// Função para formatar o valor inserido na entrada como moeda
document.getElementById('amount').addEventListener('input', function (event) {
    let value = event.target.value;

    // Remove caracteres não numéricos
    value = value.replace(/[^\d.,]/g, '');

    // Adiciona o símbolo de moeda 'R$' na entrada, se necessário
    value = value ? '$ ' + value : '';

    // Atualiza o valor no campo de entrada
    event.target.value = value;
});
