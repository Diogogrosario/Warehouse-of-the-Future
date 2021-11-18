# Ata 1 - 2021-11-5

# Ditigal twin do warehouse

Não temos limite de tecnologias exceto:
	- Simulador em Node.JS (código existente é esse)

## Simulador
	- Simular dados (quais?)
	- Número de prateleiras
	- Ligar e desligar
	- Importar layouts de ficheiros CAD
		- Que tipo de ficheiro CAD?
	- Cada prateleira terá sensores para detetar coisas
	- Termos modelos preditivos:
		- Prever failures, especialmetne hardware, tipo uma bateria
	- Otimizar o layout do armazém de acordo com os dados dos manifestos, para meter as peças que são levadas em conjunto perto umas das outras (também ver peso das peças)
		- Se prateleiras forem iguais focar em otimização vertical
	- Chaos engineering: Forçar falhas para ver como o sistema aguenta
	- Possíveis otimizações:
		- Colocar painéis solares nas prateleiras mais usadas para dar save a bateria
	- Componentes a simular
		- Sensor, LED e bateria
		- Eles têm um microprocessador para controlar isto tudo
		- Protocolo de comunicação com o hardware é 868

Os manifestos têm cerca de 1 mês de antecedência
	- Recebem manifestos para cada dia, semana ou mês? A confirmar pela Client
	
O hardware deveria ter chegado em Outubro mas está atrasado
	- Podemos usar breadboards para simular físicamente os componentes
	
A equipa de hardware está a usar um software mesh para os vários componentes estarem aware uns dos outros

Ainda não sabemos que dados contém os manifestos

Os compartimentos têm tamanhos bastante distintos, ver parafuso vs chassis:
	- A cliente vai questionar quais os "ranges" do tamanho das prateleiras
	- Peso das peças? Peças pesadas têm que estar mais acessíveis que as leves para n matar as costas dos operários
	
Como lidar com a verificação das quantidades de cada peça:
	- Cliente e o armazém não sabe como fazer
	- Not our problem

Normalmente™ só vem um carrinho de cada vez
	- Chaos engineering disto será interessante

Como proceder qnd um operário pega na peça errada?
	- Mudar a cor dos LEDs? Still open

Grande foco em o produto ser user friendly

## Perguntas que a client levou

- Nr de manifestos e frequência (por dia, semana ou mês)
- Quais as peças, tipo de peças, ranges de pratelieras (se são todas iguais ou não)
- Tipos de verficaçãoes para qnd alguém tira peças erradas ou a mais/menos
- Reposição em simultâneo com os operadores
- Protocolo de software com o hardware do armazém
- Qual o armazenamento das baterias e o consumo dos componentes
- Tipo de LED: Único, led array, preto e branco, RGB, display


## Comunicação com o cliente

- Segundas, quartas e sextas
- Terças e quintas não existem
- Marcar tudo com 1 semana de antecedência para garantir uma hora favorável
- fbarros@fe.up.pt

## Dicas do Sereno

- Existem fotos do armazém
	- Os carrinhos estão em carris e são fixos
- João Costa tem acesso a manifestos de outras empresas e trará exemplos
- Saber quantas vezes o armazém é reconfigurado, quanto tempo demora, entre outros
- Tem que existir em algum lado/de alguma forma uma ligação entre o layout em uso do armazém e ondes as peças estão (tipo nos manifestos ou nos sistemas)
- Definir a terminologia em uso
	- UML para os memes ou uma tabela de markdown
