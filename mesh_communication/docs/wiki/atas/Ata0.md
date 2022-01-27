---
title: DS Reuniao 1
created: 2021-11-17
tags: DS Ata Classes
---

# DS Reuniao 1

## Objetivos

- [x] Como estruturar git
- [x] Definir goal
- [x] Definir MVP

## Objetivo da Vertical

### Funcionamento Principal

- Queremos aplicação q simula aplicações
  - App tem objetos
  - App define comunicação entre objetos
  - App define manifestos
- Simular comunicacao entre objetos
  - Estes objetos ou nós, são os equipamentos/dispositivos que temos que monotorizar
  - Sempre que nó comunica, nós num raio ouvem
  - Mensagens propagam-se desta forma, msgs repetidas não são reenviadas
- App funciona aos ticks
- Escrita para log a cada tick
  - Tick: Abstrai unidade temporal
- Ex:
  - Neste tick houve 2 nos que comunicaram para outros nos
  - User input para avançar de tick ou 10 ticks para afrente

### Input Recebido

- Em principio recebemos 3 inputs:

#### Manifesto (mais importante) => Parte do mvp

- Manifesto tem lista de objetos, quantidade e posições
  - Assumimos rota mais simples (calcular rota é objetivo de outra vertical)
  - Simular rotas por cada funcionário
  - Cada objeto são nõs

#### Layout da fábrica

- Layout da fábrica - Ficheiro de layout inicial e manifesto de reposicionar dispositivos
- Estratégia de comunicação- Como nós comunicam entre si
  - Assumimos enviar para todos os nós

#### Config file

Ficheiro de configuração para especificar inputs. Especifica parametros para a simulação.

Contém:

- Velocidade e tempo de pegar de um funcionario
- Seed do rand() (para conseguirmos repetir aleatoriadade se necessário)
- Chance de mensagem ser perdidas
- Chance de dispositivo falhar
- Quanto é que luz consome
- Bateria máxima
  - Com taxa de erro extra
- Taxa de erros do utilizador a pegar items
- Possíveis políticas das luzes
  - Elas desligam-se qd a ronda para buscar tds os produtos acabar
  - Elas desligam-se qd o produto para o qual ela aponta é taken
  - Elas ligam-se apenas qd o produto anterior ao para o qual ela aponta é taken
  - Elas ligam-se apenas qd o funcionário for recolher produtos que estão na mesma prateleira que essa luz
- Qt bateria é gasta em enviar mensagem
- Configurar tempo de manutenção
  - Manutenção acontece quando dispositivo ficar sem bateria
- Tentar otimizar numero de falhas (para minimos)
- Tentar otimizar o numero at one time de dispositivos off
- Tentar otimizar clusters que vao embora

### Protocolo 868

Não conseguimos encontrar nada sobre 868, em vez disso assumimos RF433. Em principio vamos trabalhar com equipamentos com:

- Low power
- Muito pouco alcance mais ou menos fixo

## MVP

- Programa no terminal que representa grid 2d de nós:
  - Input:
    - Nivel de bateria de cada dispositivo
    - Bateria gasta no envio de mensagens
  - Geramos manifestos aleatóriamente
- Determinar rota simples a partir dos produtos a recolher
- Criar funcionários aleatórios que seguem rota
- Mostrar visualização 2d de funcionaro a fazer rota e luzes a reagir
- Foco é simular comunicação em mesh

Linguagens:

- Java
- Otimiziação ver depois - Prolog?

## Git

- Development
  - Há 4 branches para cada proj
  - Nossa é t2_development

### Regras

1. Nng dá push para o nosso branch sem ser docks
2. Todos os branches q criamos tem que comecar sempre por t2\_
3. Merges para o development só pull requests
4. Nao aceitas teus proprios pulls
5. PO tem que aceitar todos os pull requests para development
6. Sugerir a pessoa que originou conflitos ajudar a resolver conflitos
7. Todos os merges que fecham U.S. (user stories) têm que ser pull requests
8. Code practises
   - Passar sempre auto formatter antes do commit
   - Evitem deixar duas linhas livres entre código
9. Usar issues
   - Para corrigir bugs
   - Para U.S.
   - Fecham automaticamente na kanban board (github projects)

### Wiki

- Pasta docs na development e dps para master

### Documentação do código

- Usar JavaDoc para documentar código
- Não é necessário documentar todas as funções. Mas cada classe deve ter uma breve descrição.
  - Importante documentar partes mais complexas/menos intuitivas
- Acabar documentaçao ao mesmo tempo que US respetiva
  - Para evitar acumulação de documentação pendente
- Na wiki deve estar documentação de código mais complexo

## Pergunta para o Prof

- Temos que otimizar? Se sim o quê?
- Mostrar MVP
- Mostrar visao do produto
- Qual o range temporal do MVP
- Quais é que estratégias de comunicacao que podemos contar com?
  - Quais os protocolos em mesh mais comuns?
