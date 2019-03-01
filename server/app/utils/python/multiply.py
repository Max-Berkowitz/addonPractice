import sys
import json

def main():
    data = json.loads(sys.argv[1])
    product = data['num1'] * data['num2']
    print json.dumps({ 'product': product })

if __name__ == "__main__":
    main()