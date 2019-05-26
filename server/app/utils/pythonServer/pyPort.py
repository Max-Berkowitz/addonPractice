from flask import Flask, request
import sys
import json
app = Flask(__name__)

portPassword = sys.argv[1]
history = []

@app.route('/store/', methods=['GET'])
def store():
    password = str(request.args.get('password'))
    if (password != portPassword):
        return 'improper authentication'
    equation = str(request.args.get('equation'))
    history.append(equation)
    return 'done'

@app.route('/history/', methods=['GET'])
def getHistory():
    password = str(request.args.get('password'))
    if (password != portPassword):
        return 'improper authentication'
    quantity = int(request.args.get('quantity'))
    return json.dumps(history[-quantity:])

@app.route('/full_history/', methods=['GET'])
def getFullHistory():
    password = str(request.args.get('password'))
    if (password != portPassword):
        return 'improper authentication'
    return json.dumps(history)


@app.route('/shutdown/', methods=['GET'])
def shutdown():
    password = str(request.args.get('password'))
    if (password != portPassword):
        return 'improper authentication'
    request.environ.get('werkzeug.server.shutdown')()
    return 'done'

if __name__ == "__main__":
    app.run()