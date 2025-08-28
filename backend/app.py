from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash') 

app = Flask(__name__)
CORS(app)

transacoes = []
balanco = 0.0

@app.route('/api/transacoes', methods=['POST'])
def adicionar_transacao():
    global balanco
    dados = request.get_json()
    
    try:
        valor = float(dados.get('valor'))
    except (TypeError, ValueError):
        return jsonify({"erro": "Valor inválido"}), 400

    tipo = dados.get('tipo')
    descricao = dados.get('descricao')

    if not valor or not tipo:
        return jsonify({"erro": "Valor e tipo são obrigatórios"}), 400

    if tipo == 'entrada':
        balanco += valor
    elif tipo == 'saida':
        balanco -= valor
    else:
        return jsonify({"erro": "Tipo de transação inválido"}), 400

    transacao = {
        'id': len(transacoes) + 1,
        'valor': valor,
        'tipo': tipo,
        'descricao': descricao,
        'data': '2025-08-28'
    }
    transacoes.append(transacao)

    return jsonify({"mensagem": "Transação adicionada com sucesso!", "transacao": transacao}), 201

@app.route('/api/transacoes', methods=['GET'])
def listar_transacoes():
    return jsonify(transacoes)

@app.route('/api/balanco', methods=['GET'])
def obter_balanco():
    return jsonify({"balanco": balanco})

@app.route('/api/sugestoes-ia', methods=['GET'])
def obter_sugestoes():
    historico_texto = "Aqui estão minhas transações recentes:\n"
    for t in transacoes:
        historico_texto += f"- {t['tipo']} de R${t['valor']} para {t['descricao']}\n"
    
    try:
        prompt = f"""
Com base no histórico financeiro fictício a seguir, forneça 3 sugestões de otimização de gastos
de forma sucinta e direta. Se não houver transações, sugira formas de começar a economizar.

{historico_texto}
"""
        
        response = model.generate_content(prompt)

        if not response or not response.text:
            return jsonify({"sugestoes": ["Não foi possível gerar sugestões no momento."]}), 200

        sugestoes = [s.strip() for s in response.text.split("\n") if s.strip()]
        return jsonify({"sugestoes": sugestoes}), 200

    except Exception as e:
        print(f"Erro na API da IA: {str(e)}")
        return jsonify({"erro": f"Erro na API da IA: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)